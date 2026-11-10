"use client"
// The generative ink sculpture from 21st.dev `kedhareswer/ink-orbit-hero` (InkOrbitSculpture), adapted for Bgentic.
// The cloud geometry (ink-orbit-geometry.ts) is the original, so seeds draw the same shapes. Around it:
//  - decorative: no click or keyboard handlers; the page drives it through a small message handle (onReady)
//  - drawn on black for a `screen`-blended layer, so it glows over any dark ground
//  - the ink, and at its heart a glowing glass ball (the original design, restored 2026-11-10 in place of a B)
//  - two quality tiers (desktop, touch), a frame-rate cap, cached clouds and reversible morphs
//  - a pulse (a shockwave ring and a small swell) separate from the reforge morph, so it can beat faster
//  - loose dust that drifts on its own, rides each shockwave outward, and moves aside for a mouse
//  - it stays where it is placed: no scroll physics
import * as React from "react"
import { clamp, hexToRgb } from "@/lib/canvas"
import { FINE_POINTER, REDUCED_MOTION } from "@/lib/media"
import {
  CORE_N,
  DUST_N,
  GRAIN_N,
  buildDust,
  getCloud,
  type Cloud,
} from "@/components/ui/ink-orbit-geometry"

export type OrbCommand =
  | { type: "reforge"; seed: number }
  | { type: "pulse"; strength?: number }
  | { type: "prewarm"; seed: number }
  | { type: "paused"; value: boolean }
  | { type: "lean"; yaw: number; pitch: number }
export type OrbHandle = { send: (cmd: OrbCommand) => void }

type Props = {
  ink: string
  accent: string
  seed: number
  onReady?: (handle: OrbHandle) => void
  className?: string
}

function easeInOutCubic(t: number) {
  const c = clamp(t, 0, 1)
  return c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2
}
/** `a` faded toward black by `t`; on a `screen` layer black is clear, so this is light falling off. */
function fade(a: string, t: number, alpha = 1) {
  const k = 1 - clamp(t, 0, 1)
  const [r, g, b] = hexToRgb(a)
  return `rgba(${Math.round(r * k)},${Math.round(g * k)},${Math.round(b * k)},${alpha})`
}

const CLOUD_SCALE = 0.34 // the cloud's radius, as a share of the canvas's shorter side
const PERSPECTIVE = 3.4 // camera distance, in cloud radii
const SPIN = 0.16 // the cloud's turn, radians per second
const NB = 7 // depth bins: the cloud draws back to front in this many passes, the glass core between the halves
const SPHERE_R = 0.3 // the glass core's radius, as a share of the cloud's

// How the dust and grain answer each shockwave, and how the dust answers a mouse.
const DUST_PUSH = 0.2 // how far a wave carries a mote, in cloud units
const GRAIN_PUSH = 0.07 // the ribbons' own grain moves less: the ink holds its shape
const WAVE_WIDTH = 0.24 // the band behind a wavefront where things are pushed
const DUST_REACH = 0.2 // the cursor's reach, as a share of the canvas
const DUST_SHOVE = 0.12 // how hard the cursor pushes, as a share of the canvas held against the spring
const DUST_SPRING = 16 // pull back home, per second squared
const DUST_DAMP = 4.5 // a little under critical, so motes float back with a soft settle

const TIERS = {
  desktop: { stride: 1, grains: GRAIN_N, dust: DUST_N, lens: true, dpr: 2, fps: 60 },
  touch: { stride: 2, grains: 5600, dust: 480, lens: false, dpr: 1.5, fps: 30 },
} as const

/** the depth bin a projected z falls in */
const depthBin = (z: number) => clamp(Math.floor(((z + 1.25) / 2.5) * NB), 0, NB - 1)

type Projection = (x: number, y: number, z: number) => readonly [number, number, number, number]
/** this frame's camera: the canvas centre, the cloud's scale in canvas pixels, and the projection */
type View = { cx: number; cy: number; scale: number; proj: Projection }
/** a running wave's outward push on a point, as a factor of its position */
type Outward = (x: number, y: number, z: number, amp: number) => number

export function InkOrbitSculpture({ ink, accent, seed, onReady, className = "" }: Props) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)
  const onReadyRef = React.useRef(onReady)
  React.useEffect(() => {
    onReadyRef.current = onReady
  }, [onReady])

  React.useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    const fine = matchMedia(FINE_POINTER).matches
    const reduced = matchMedia(REDUCED_MOTION).matches
    const tier = TIERS[fine ? "desktop" : "touch"]
    // offscreen helper: the lens, the ink seen through the glass
    const lens = document.createElement("canvas")
    const lctx = lens.getContext("2d")

    const s = {
      yaw: 0.6,
      clock: 0,
      pitch: 0.18,
      leanYaw: 0,
      leanPitch: 0,
      tLeanYaw: 0,
      tLeanPitch: 0,
      from: null as Cloud | null,
      to: getCloud(seed),
      fromSeed: NaN,
      toSeed: seed,
      morphT: 1,
      rings: [] as { t: number; k: number }[],
      beat: 0,
      paused: false,
      dirty: true,
      lastT: 0,
      dt: 0.016,
    }
    // the dust's field, and each mote's push from the cursor (in canvas pixels) with its velocity: a spring per mote
    const dust = buildDust()
    const dox = new Float32Array(DUST_N)
    const doy = new Float32Array(DUST_N)
    const dvx = new Float32Array(DUST_N)
    const dvy = new Float32Array(DUST_N)
    const cursor = { x: 0, y: 0, target: 0, on: 0 }
    // every point's place this frame: screen position, depth bin and kind, then an order sorted by bin
    const N = CORE_N + GRAIN_N + DUST_N
    const px = new Float32Array(N)
    const py = new Float32Array(N)
    const pr = new Float32Array(CORE_N) // ink dot radius
    const bin = new Uint8Array(N)
    const order = new Uint32Array(N)
    const binStart = new Uint32Array(NB + 1)
    const binFill = new Uint32Array(NB)
    const isCore = new Uint8Array(N)
    const mote = new Uint8Array(N) // 0 for ink, else a dust mote's size
    // the fills per depth bin: nearer is brighter
    const coreFill: string[] = []
    const grainFill: string[] = []
    for (let b = 0; b < NB; b++) {
      const f = 0.62 * (1 - b / (NB - 1))
      coreFill.push(fade(ink, f))
      grainFill.push(fade(ink, Math.min(0.85, f + 0.12)))
    }

    /* ----------------------------------------------------------- size and loop */

    let W = 0
    let H = 0
    let dpr = 1
    const resize = () => {
      dpr = clamp(window.devicePixelRatio || 1, 1, tier.dpr)
      W = Math.max(1, Math.round(canvas.clientWidth * dpr))
      H = Math.max(1, Math.round(canvas.clientHeight * dpr))
      canvas.width = W
      canvas.height = H
      s.dirty = true
      schedule()
    }
    const ro = new ResizeObserver(resize)

    const deltas: number[] = []
    let refreshHz = 0
    let frameNo = 0
    let lastRaf = 0
    let raf = 0
    // While the page is in a view transition (moving to another page, or gliding back to the top), the orb holds its
    // last frame: its thousands of grains would otherwise compete with the screen-sized transition for the GPU and
    // stutter it, and nobody follows its slow drift during a move that's over in under a second. Its clock isn't
    // advanced meanwhile, so it carries on from where it was. It always draws its first frame, so it's never blank.
    let drawn = false
    const transitioning = (() => {
      try {
        document.documentElement.matches(":active-view-transition")
        return () => document.documentElement.matches(":active-view-transition")
      } catch {
        return () => false
      }
    })()
    const schedule = () => {
      if (!raf && !s.paused) raf = requestAnimationFrame(frame)
    }

    const frame = (now: number) => {
      raf = 0
      if (s.paused) return
      raf = requestAnimationFrame(frame)
      // measure the display's refresh rate once, then draw every nth frame to hold the tier's frame-rate cap
      if (lastRaf) {
        if (deltas.length < 24) deltas.push(now - lastRaf)
        else if (!refreshHz) refreshHz = 1000 / [...deltas].sort((a, b) => a - b)[12]
      }
      lastRaf = now
      if (drawn && transitioning()) {
        s.lastT = 0
        return
      }
      frameNo++
      const div = refreshHz ? Math.max(1, Math.round(refreshHz / tier.fps)) : 1
      if (frameNo % div) return
      const dt = s.lastT ? Math.min(0.05, (now - s.lastT) / 1000) : 0.016
      s.lastT = now
      if (!reduced) {
        s.yaw += SPIN * dt
        s.clock += dt
      }
      s.dt = dt
      cursor.on += (cursor.target - cursor.on) * Math.min(1, dt * 8)
      s.pitch += (0.18 - s.pitch) * Math.min(1, dt * 0.9)
      s.leanYaw += (s.tLeanYaw - s.leanYaw) * Math.min(1, dt * 3)
      s.leanPitch += (s.tLeanPitch - s.leanPitch) * Math.min(1, dt * 3)
      if (s.morphT < 1) s.morphT = Math.min(1, s.morphT + dt / 1.3)
      for (const r of s.rings) r.t -= dt / 1.1
      s.rings = s.rings.filter((r) => r.t > 0)
      if (s.beat > 0) s.beat = Math.max(0, s.beat - dt / 0.7)
      const moving =
        !reduced || s.morphT < 1 || s.rings.length > 0 || s.beat > 0 || Math.abs(s.tLeanYaw - s.leanYaw) > 0.001 || Math.abs(s.tLeanPitch - s.leanPitch) > 0.001
      if (!moving && !s.dirty) {
        cancelAnimationFrame(raf)
        raf = 0
        return
      }
      s.dirty = false
      draw()
      drawn = true
    }

    /* ----------------------------------------------------------- a frame, in stages */

    // shockwaves: a soft wide glow under a crisp line, both thinning and fading as they travel out
    const drawShockwaves = ({ cx, cy, scale }: View) => {
      for (const r of s.rings) {
        const k = 1 - r.t
        const rad = scale * (0.32 + k * 1.25)
        ctx.strokeStyle = fade(accent, 0.45 + 0.5 * k, r.t * 0.35 * r.k)
        ctx.lineWidth = Math.max(2, dpr * (3 + 7 * r.t))
        ctx.beginPath()
        ctx.arc(cx, cy, rad, 0, Math.PI * 2)
        ctx.stroke()
        ctx.strokeStyle = fade(accent, 0.15 + 0.7 * k, r.t * 0.85 * r.k)
        ctx.lineWidth = Math.max(1, dpr * (1 + 2 * r.t))
        ctx.beginPath()
        ctx.arc(cx, cy, rad, 0, Math.PI * 2)
        ctx.stroke()
      }
    }

    // Each ring is a wavefront travelling out through the cloud: it pushes what it passes outward, most just behind
    // the front, and lets go as it moves on and fades. Null when no wave is running.
    const wavefronts = (): Outward | null => {
      const waves = s.rings.map((r) => ({ at: 0.32 + (1 - r.t) * 1.25, k: r.t * r.k }))
      if (!waves.length) return null
      return (x, y, z, amp) => {
        const d = Math.hypot(x, y, z) || 1
        let push = 0
        for (const w of waves) {
          const gap = w.at - d // how far behind this front the point is
          if (gap > 0 && gap < WAVE_WIDTH * 5) push += w.k * (gap / WAVE_WIDTH) * Math.exp(1 - gap / WAVE_WIDTH)
        }
        return (push * amp) / d
      }
    }

    // the ink: ribbon dots and their loose grain, mid-morph between two clouds when reforging; the grain rides the wave
    const placeInk = ({ cx, cy, scale, proj }: View, outward: Outward | null) => {
      const B = s.to
      const A = s.from && s.morphT < 1 ? s.from : null
      const m = A ? easeInOutCubic(s.morphT) : 1
      let n = 0
      const bc = B.core
      const ac = A?.core
      const boost = tier.stride > 1 ? 1.18 : 1
      for (let i = 0; i < CORE_N; i += tier.stride) {
        const o = i * 4
        let x = bc[o]
        let y = bc[o + 1]
        let z = bc[o + 2]
        let w = bc[o + 3]
        if (ac) {
          x = ac[o] + (x - ac[o]) * m
          y = ac[o + 1] + (y - ac[o + 1]) * m
          z = ac[o + 2] + (z - ac[o + 2]) * m
          w = ac[o + 3] + (w - ac[o + 3]) * m
        }
        const [x1, y2, z2, sc] = proj(x, y, z)
        px[n] = cx + x1 * sc * scale
        py[n] = cy + y2 * sc * scale
        pr[n] = w * scale * sc * 0.78 * boost
        bin[n] = depthBin(z2)
        isCore[n] = 1
        n++
      }
      const bg = B.grain
      const ag = A?.grain
      for (let g = 0; g < tier.grains; g++) {
        const o = g * 3
        let x = bg[o]
        let y = bg[o + 1]
        let z = bg[o + 2]
        if (ag) {
          x = ag[o] + (x - ag[o]) * m
          y = ag[o + 1] + (y - ag[o + 1]) * m
          z = ag[o + 2] + (z - ag[o + 2]) * m
        }
        if (outward) {
          const k = outward(x, y, z, GRAIN_PUSH)
          x += x * k
          y += y * k
          z += z * k
        }
        const [x1, y2, z2, sc] = proj(x, y, z)
        px[n] = cx + x1 * sc * scale
        py[n] = cy + y2 * sc * scale
        bin[n] = depthBin(z2)
        isCore[n] = 0
        mote[n] = 0
        n++
      }
      return n
    }

    // the dust: its own slow orbits and bob, then the wave, then the same projection as the ink, then the cursor's
    // push in screen space
    const placeDust = ({ cx, cy, scale, proj }: View, outward: Outward | null, n: number) => {
      const t = s.clock
      const field = Math.min(W, H)
      const reach = field * DUST_REACH
      const shove = DUST_SPRING * field * DUST_SHOVE
      const damp = Math.exp(-DUST_DAMP * s.dt)
      let mx = 0
      let my = 0
      if (cursor.on > 0.001) {
        const r = canvas.getBoundingClientRect()
        mx = (cursor.x - r.left) * (W / (r.width || 1))
        my = (cursor.y - r.top) * (H / (r.height || 1))
      }
      for (let i = 0; i < tier.dust; i++) {
        const o = i * 6
        const a = dust[o + 3] * t
        const ca = Math.cos(a)
        const sa = Math.sin(a)
        let x = dust[o] * ca + dust[o + 2] * sa
        let z = -dust[o] * sa + dust[o + 2] * ca
        let y = dust[o + 1] + 0.03 * Math.sin(t * 0.6 + dust[o + 4])
        if (outward) {
          const k = outward(x, y, z, DUST_PUSH)
          x += x * k
          y += y * k
          z += z * k
        }
        const [x1, y2, z2, sc] = proj(x, y, z)
        const sx = cx + x1 * sc * scale
        const sy = cy + y2 * sc * scale
        // pushed away from the cursor while it's near, always pulled back home, and damped so it settles
        let ax = -DUST_SPRING * dox[i]
        let ay = -DUST_SPRING * doy[i]
        if (cursor.on > 0.001) {
          const ex = sx + dox[i] - mx
          const ey = sy + doy[i] - my
          const d = Math.hypot(ex, ey)
          if (d < reach && d > 0.5) {
            const f = 1 - d / reach
            const k = (f * f * shove * cursor.on) / d
            ax += ex * k
            ay += ey * k
          }
        }
        dvx[i] = (dvx[i] + ax * s.dt) * damp
        dvy[i] = (dvy[i] + ay * s.dt) * damp
        dox[i] += dvx[i] * s.dt
        doy[i] += dvy[i] * s.dt
        px[n] = sx + dox[i]
        py[n] = sy + doy[i]
        bin[n] = depthBin(z2)
        isCore[n] = 0
        mote[n] = dust[o + 5]
        n++
      }
      return n
    }

    // a counting sort of the n placed points into depth bins
    const sortByDepth = (n: number) => {
      binFill.fill(0)
      for (let i = 0; i < n; i++) binFill[bin[i]]++
      binStart[0] = 0
      for (let b = 0; b < NB; b++) binStart[b + 1] = binStart[b] + binFill[b]
      binFill.fill(0)
      for (let i = 0; i < n; i++) order[binStart[bin[i]] + binFill[bin[i]]++] = i
    }

    // one depth bin: ink dots as one path, then grain and dust as squares (larger motes a little larger)
    const pass = (b: number, gs: number) => {
      ctx.fillStyle = coreFill[b]
      ctx.beginPath()
      for (let j = binStart[b]; j < binStart[b + 1]; j++) {
        const i = order[j]
        if (!isCore[i]) continue
        ctx.moveTo(px[i] + pr[i], py[i])
        ctx.arc(px[i], py[i], pr[i], 0, Math.PI * 2)
      }
      ctx.fill()
      ctx.fillStyle = grainFill[b]
      for (let j = binStart[b]; j < binStart[b + 1]; j++) {
        const i = order[j]
        if (isCore[i]) continue
        const size = mote[i] === 2 ? gs * 1.9 : mote[i] ? gs * 1.1 : gs
        ctx.fillRect(px[i], py[i], size, size)
      }
    }

    // The glass core: a glowing glass ball at the heart of the cloud (the original design). A soft glow of light round
    // it that brightens on each beat, so the ink never buries it; then, clipped to the ball, the black backing (clear on
    // the screen layer), the inverted lens of the ink behind it, the rim shading and the highlight.
    const drawGlassCore = ({ cx, cy, scale }: View, yaw: number, lift: number) => {
      const rs = SPHERE_R * scale
      const glow = ctx.createRadialGradient(cx, cy, rs * 0.9, cx, cy, rs * 1.7)
      glow.addColorStop(0, fade(accent, 0.2, 0.22 + 0.2 * lift))
      glow.addColorStop(1, fade(accent, 1, 0))
      ctx.fillStyle = glow
      ctx.fillRect(cx - rs * 1.7, cy - rs * 1.7, rs * 3.4, rs * 3.4)

      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, rs, 0, Math.PI * 2)
      ctx.clip()
      ctx.fillStyle = "#000"
      ctx.fillRect(cx - rs, cy - rs, rs * 2, rs * 2)
      if (tier.lens && lctx) {
        const span = rs * 3.1
        const ls = Math.max(1, Math.ceil(rs * 2))
        if (lens.width !== ls) {
          lens.width = ls
          lens.height = ls
        }
        lctx.fillStyle = "#000"
        lctx.fillRect(0, 0, ls, ls)
        lctx.drawImage(canvas, cx - span, cy - span, span * 2, span * 2, 0, 0, ls, ls)
        ctx.translate(cx, cy)
        ctx.rotate(Math.PI + yaw * 0.15)
        ctx.globalAlpha = 0.85
        ctx.drawImage(lens, -rs, -rs, rs * 2, rs * 2)
        ctx.globalAlpha = 1
        ctx.setTransform(1, 0, 0, 1, 0, 0)
      }
      const rim = ctx.createRadialGradient(cx - rs * 0.25, cy - rs * 0.3, rs * 0.1, cx, cy, rs)
      rim.addColorStop(0, "rgba(255,255,255,.42)")
      rim.addColorStop(0.55, "rgba(255,255,255,.08)")
      rim.addColorStop(0.86, fade(accent, 0.75, 0.25))
      rim.addColorStop(1, fade(accent, 0.25, 0.55))
      ctx.fillStyle = rim
      ctx.fillRect(cx - rs, cy - rs, rs * 2, rs * 2)
      const hl = ctx.createRadialGradient(cx - rs * 0.38, cy - rs * 0.42, 0, cx - rs * 0.38, cy - rs * 0.42, rs * 0.42)
      hl.addColorStop(0, "rgba(255,255,255,.85)")
      hl.addColorStop(1, "rgba(255,255,255,0)")
      ctx.fillStyle = hl
      ctx.fillRect(cx - rs, cy - rs, rs * 2, rs * 2)
      ctx.restore()
    }

    const draw = () => {
      const yaw = s.yaw + s.leanYaw
      const pitch = s.pitch + s.leanPitch
      const cyw = Math.cos(yaw)
      const syw = Math.sin(yaw)
      const cpt = Math.cos(pitch)
      const spt = Math.sin(pitch)
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, W, H)
      // the heartbeat: a quick swell and settle on every pulse
      const swell = s.beat > 0 ? Math.sin(Math.PI * (1 - s.beat)) * 0.035 : 0
      const view: View = {
        cx: W / 2,
        cy: H / 2,
        scale: Math.min(W, H) * CLOUD_SCALE * (1 + swell),
        proj: (x, y, z) => {
          const x1 = x * cyw + z * syw
          const z1 = -x * syw + z * cyw
          const y2 = y * cpt - z1 * spt
          const z2 = y * spt + z1 * cpt
          return [x1, y2, z2, PERSPECTIVE / (PERSPECTIVE - z2)] as const
        },
      }
      drawShockwaves(view)
      const outward = wavefronts()
      sortByDepth(placeDust(view, outward, placeInk(view, outward)))
      const gs = Math.max(1, 1.15 * dpr)
      // the back half of the cloud, the glass core, then the front half over it
      for (let b = 0; b <= Math.floor(NB / 2); b++) pass(b, gs)
      const lift = s.beat > 0 ? Math.sin(Math.PI * (1 - s.beat)) : 0
      drawGlassCore(view, yaw, lift)
      for (let b = Math.floor(NB / 2) + 1; b < NB; b++) pass(b, gs)
    }

    /* ----------------------------------------------------------- the handle */

    // reforge: morph every grain to the new shape; crossing back mid-morph reverses it exactly
    const reforge = (seed: number) => {
      if (seed === s.toSeed) return
      if (s.morphT < 1 && seed === s.fromSeed && s.from) {
        ;[s.from, s.to] = [s.to, s.from]
        ;[s.fromSeed, s.toSeed] = [s.toSeed, s.fromSeed]
        s.morphT = 1 - s.morphT
      } else {
        const next = getCloud(seed)
        s.from = reduced ? null : s.to
        s.to = next
        s.fromSeed = s.toSeed
        s.toSeed = seed
        s.morphT = reduced ? 1 : 0
        if (!reduced) {
          s.rings.push({ t: 1, k: 1 })
          s.beat = 1
        }
      }
      s.dirty = true
      schedule()
    }

    const handle: OrbHandle = {
      send(cmd) {
        switch (cmd.type) {
          case "prewarm": {
            const run = () => getCloud(cmd.seed)
            if ("requestIdleCallback" in window) window.requestIdleCallback(run, { timeout: 2000 })
            else setTimeout(run, 300)
            return
          }
          case "paused": {
            if (cmd.value === s.paused) return
            s.paused = cmd.value
            if (s.paused) {
              cancelAnimationFrame(raf)
              raf = 0
            } else {
              s.lastT = 0
              s.dirty = true
              schedule()
            }
            return
          }
          case "pulse": {
            if (reduced) return
            s.rings.push({ t: 1, k: clamp(cmd.strength ?? 1, 0, 1) })
            if (s.rings.length > 4) s.rings.shift()
            s.beat = 1
            schedule()
            return
          }
          case "lean": {
            if (reduced) return
            s.tLeanYaw = clamp(cmd.yaw, -0.5, 0.5)
            s.tLeanPitch = clamp(cmd.pitch, -0.5, 0.5)
            schedule()
            return
          }
          case "reforge":
            reforge(cmd.seed)
        }
      },
    }

    /* ----------------------------------------------------------- the cursor, for the dust alone */

    // the cloud's lean comes through the handle, untouched by this
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      cursor.x = e.clientX
      cursor.y = e.clientY
      const r = canvas.getBoundingClientRect()
      cursor.target = e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom ? 1 : 0
    }
    const onLeave = () => {
      cursor.target = 0
    }
    if (!reduced && fine) {
      window.addEventListener("pointermove", onMove, { passive: true })
      document.documentElement.addEventListener("pointerleave", onLeave)
    }

    ro.observe(canvas)
    resize()
    onReadyRef.current?.(handle)
    return () => {
      cancelAnimationFrame(raf)
      raf = 0
      ro.disconnect()
      window.removeEventListener("pointermove", onMove)
      document.documentElement.removeEventListener("pointerleave", onLeave)
    }
    // The canvas is set up once; later shapes arrive through the handle.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" tabIndex={-1} className={"block size-full " + className} />
}
