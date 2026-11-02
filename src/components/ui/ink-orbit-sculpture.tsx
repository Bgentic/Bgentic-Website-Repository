"use client"
// The generative ink sculpture from 21st.dev `kedhareswer/ink-orbit-hero` (InkOrbitSculpture), adapted for Bgentic.
// The cloud geometry (buildCloud) is the original, so seeds draw the same shapes. Around it:
//  - decorative: no pointer or keyboard handlers; the page drives it through a small message handle (onReady)
//  - drawn on black for a `screen`-blended layer, so it glows over any dark ground
//  - two quality tiers (desktop, touch), a frame-rate cap, cached clouds and reversible morphs
//  - it stays where it is placed: no scroll physics
import * as React from "react"

export type OrbCommand =
  | { type: "reforge"; seed: number }
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

function clamp(v: number, a: number, b: number) {
  return Math.min(b, Math.max(a, v))
}
function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
function easeInOutCubic(t: number) {
  const c = clamp(t, 0, 1)
  return c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2
}
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "")
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
/** `a` faded toward black by `t`; on a `screen` layer black is clear, so this is light falling off. */
function fade(a: string, t: number, alpha = 1) {
  const k = 1 - clamp(t, 0, 1)
  const [r, g, b] = hexToRgb(a)
  return `rgba(${Math.round(r * k)},${Math.round(g * k)},${Math.round(b * k)},${alpha})`
}

type Cloud = { core: Float32Array; grain: Float32Array; spikes: Float32Array }
const CORE_N = 2800
const GRAIN_N = 16000
const SPIKE_N = 16
const SPHERE_R = 0.3
const NB = 7

// ink loops + bridges, sampled to a fixed-size point cloud so any two seeds morph grain-for-grain (original)
function buildCloud(seed: number): Cloud {
  const rand = mulberry32(seed * 2654435761 + 1)
  const unit = (): [number, number, number] => {
    const z = rand() * 2 - 1
    const a = rand() * Math.PI * 2
    const r = Math.sqrt(1 - z * z)
    return [r * Math.cos(a), r * Math.sin(a), z]
  }
  const cross = (a: number[], b: number[]): [number, number, number] => [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ]
  const norm = (v: number[]): [number, number, number] => {
    const l = Math.hypot(v[0], v[1], v[2]) || 1
    return [v[0] / l, v[1] / l, v[2] / l]
  }
  const curves: number[][] = []
  const loops = 3 + Math.floor(rand() * 2)
  const W = 0.092
  for (let k = 0; k < loops; k++) {
    const n = unit()
    const u = norm(cross(n, Math.abs(n[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0]))
    const v = cross(n, u)
    const p = Array.from({ length: 8 }, () => rand() * Math.PI * 2)
    const R = 0.9 + rand() * 0.16
    const pts: number[] = []
    for (let i = 0; i <= 220; i++) {
      const t = (i / 220) * Math.PI * 2
      const r = R * (1 + 0.15 * Math.sin(2 * t + p[0]) + 0.07 * Math.sin(3 * t + p[1]) + 0.04 * Math.sin(5 * t + p[2]))
      const h = R * (0.24 * Math.sin(2 * t + p[3]) + 0.08 * Math.sin(3 * t + p[4]))
      const c = Math.cos(t) * r
      const s = Math.sin(t) * r
      const w = W * (0.3 + 0.7 * Math.pow(0.5 + 0.5 * Math.sin(3 * t + p[5]), 1.5)) * (0.72 + 0.28 * Math.sin(7 * t + p[6]))
      pts.push(u[0] * c + v[0] * s + n[0] * h, u[1] * c + v[1] * s + n[1] * h, u[2] * c + v[2] * s + n[2] * h, Math.max(0.018, w))
    }
    curves.push(pts)
  }
  for (let b = 0; b < 3; b++) {
    const A = curves[Math.floor(rand() * loops)]
    const B = curves[Math.floor(rand() * loops)]
    const ia = Math.floor(rand() * (A.length / 4)) * 4
    const ib = Math.floor(rand() * (B.length / 4)) * 4
    const a = [A[ia], A[ia + 1], A[ia + 2]]
    const c = [B[ib], B[ib + 1], B[ib + 2]]
    const mid = norm([(a[0] + c[0]) / 2, (a[1] + c[1]) / 2, (a[2] + c[2]) / 2])
    const lift = 1.08 + rand() * 0.18
    const m = [mid[0] * lift, mid[1] * lift, mid[2] * lift]
    const pts: number[] = []
    for (let i = 0; i <= 40; i++) {
      const t = i / 40
      const q = 1 - t
      pts.push(
        q * q * a[0] + 2 * q * t * m[0] + t * t * c[0],
        q * q * a[1] + 2 * q * t * m[1] + t * t * c[1],
        q * q * a[2] + 2 * q * t * m[2] + t * t * c[2],
        W * (0.16 + 0.42 * Math.sin(Math.PI * t)),
      )
    }
    curves.push(pts)
  }
  const segs: { c: number[]; i: number; len: number }[] = []
  let total = 0
  for (const c of curves) {
    for (let i = 0; i + 4 < c.length; i += 4) {
      const len = Math.hypot(c[i + 4] - c[i], c[i + 5] - c[i + 1], c[i + 6] - c[i + 2])
      segs.push({ c, i, len })
      total += len
    }
  }
  const core = new Float32Array(CORE_N * 4)
  const tan = new Float32Array(CORE_N * 3)
  let si = 0
  let acc = 0
  for (let k = 0; k < CORE_N; k++) {
    const target = ((k + 0.5) / CORE_N) * total
    while (si < segs.length - 1 && acc + segs[si].len < target) acc += segs[si++].len
    const { c, i, len } = segs[si]
    const f = len ? clamp((target - acc) / len, 0, 1) : 0
    for (let d = 0; d < 4; d++) core[k * 4 + d] = c[i + d] + (c[i + 4 + d] - c[i + d]) * f
    tan.set(norm([c[i + 4] - c[i], c[i + 5] - c[i + 1], c[i + 6] - c[i + 2]]), k * 3)
  }
  const grain = new Float32Array(GRAIN_N * 3)
  for (let g = 0; g < GRAIN_N; g++) {
    const k = Math.floor(rand() * CORE_N)
    const T = [tan[k * 3], tan[k * 3 + 1], tan[k * 3 + 2]]
    const d = unit()
    const dot = d[0] * T[0] + d[1] * T[1] + d[2] * T[2]
    const o = norm([d[0] - dot * T[0], d[1] - dot * T[1], d[2] - dot * T[2]])
    const w = core[k * 4 + 3]
    const r = rand() < 0.05 ? w * (1.3 + rand() * 1.6) : w * (0.35 + 0.82 * Math.sqrt(rand()))
    for (let a = 0; a < 3; a++) grain[g * 3 + a] = core[k * 4 + a] + o[a] * r
  }
  const spikes = new Float32Array(SPIKE_N * 6)
  for (let s = 0; s < SPIKE_N; s++) {
    const k = Math.floor(rand() * CORE_N)
    const p = [core[k * 4], core[k * 4 + 1], core[k * 4 + 2]]
    const j = unit()
    const dir = norm([p[0] + j[0] * 0.45, p[1] + j[1] * 0.45, p[2] + j[2] * 0.45])
    const len = 0.18 + rand() * 0.42
    spikes.set([p[0], p[1], p[2], p[0] + dir[0] * len, p[1] + dir[1] * len, p[2] + dir[2] * len], s * 6)
  }
  return { core, grain, spikes }
}

const clouds = new Map<number, Cloud>()
function getCloud(seed: number) {
  let c = clouds.get(seed)
  if (!c) clouds.set(seed, (c = buildCloud(seed)))
  return c
}

const TIERS = {
  desktop: { stride: 1, grains: GRAIN_N, lens: true, dpr: 2, fps: 60 },
  touch: { stride: 2, grains: 5600, lens: false, dpr: 1.5, fps: 30 },
} as const
const SPIN = 0.16

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
    const lens = document.createElement("canvas")
    const lctx = lens.getContext("2d")
    const tier = TIERS[matchMedia("(hover: hover) and (pointer: fine)").matches ? "desktop" : "touch"]
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches
    const s = {
      yaw: 0.6,
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
      ring: 0,
      paused: false,
      dirty: true,
      lastT: 0,
    }
    const N = CORE_N + GRAIN_N
    const px = new Float32Array(N)
    const py = new Float32Array(N)
    const pr = new Float32Array(CORE_N)
    const bin = new Uint8Array(N)
    const order = new Uint32Array(N)
    const binStart = new Uint32Array(NB + 1)
    const binFill = new Uint32Array(NB)
    const isCore = new Uint8Array(N)
    const coreFill: string[] = []
    const grainFill: string[] = []
    for (let b = 0; b < NB; b++) {
      const f = 0.62 * (1 - b / (NB - 1))
      coreFill.push(fade(ink, f))
      grainFill.push(fade(ink, Math.min(0.85, f + 0.12)))
    }

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
    const schedule = () => {
      if (!raf && !s.paused) raf = requestAnimationFrame(frame)
    }

    const frame = (now: number) => {
      raf = 0
      if (s.paused) return
      raf = requestAnimationFrame(frame)
      if (lastRaf) {
        if (deltas.length < 24) deltas.push(now - lastRaf)
        else if (!refreshHz) refreshHz = 1000 / [...deltas].sort((a, b) => a - b)[12]
      }
      lastRaf = now
      frameNo++
      const div = refreshHz ? Math.max(1, Math.round(refreshHz / tier.fps)) : 1
      if (frameNo % div) return
      const dt = s.lastT ? Math.min(0.05, (now - s.lastT) / 1000) : 0.016
      s.lastT = now
      if (!reduced) s.yaw += SPIN * dt
      s.pitch += (0.18 - s.pitch) * Math.min(1, dt * 0.9)
      s.leanYaw += (s.tLeanYaw - s.leanYaw) * Math.min(1, dt * 3)
      s.leanPitch += (s.tLeanPitch - s.leanPitch) * Math.min(1, dt * 3)
      if (s.morphT < 1) s.morphT = Math.min(1, s.morphT + dt / 1.3)
      if (s.ring > 0) s.ring = Math.max(0, s.ring - dt / 1.1)
      const moving =
        !reduced || s.morphT < 1 || s.ring > 0 || Math.abs(s.tLeanYaw - s.leanYaw) > 0.001 || Math.abs(s.tLeanPitch - s.leanPitch) > 0.001
      if (!moving && !s.dirty) {
        cancelAnimationFrame(raf)
        raf = 0
        return
      }
      s.dirty = false
      draw()
    }

    const draw = () => {
      const B = s.to
      const A = s.from && s.morphT < 1 ? s.from : null
      const m = A ? easeInOutCubic(s.morphT) : 1
      const yaw = s.yaw + s.leanYaw
      const pitch = s.pitch + s.leanPitch
      const cyw = Math.cos(yaw)
      const syw = Math.sin(yaw)
      const cpt = Math.cos(pitch)
      const spt = Math.sin(pitch)
      const f = 3.4
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, W, H)
      const cx = W / 2
      const cy = H / 2
      const scale = Math.min(W, H) * 0.34
      const zbin = (z: number) => clamp(Math.floor(((z + 1.25) / 2.5) * NB), 0, NB - 1)
      if (s.ring > 0) {
        const k = 1 - s.ring
        ctx.strokeStyle = fade(accent, 0.2 + 0.7 * k, s.ring * 0.8)
        ctx.lineWidth = Math.max(1, dpr * (1 + 2 * s.ring))
        ctx.beginPath()
        ctx.arc(cx, cy, scale * (0.32 + k * 1.25), 0, Math.PI * 2)
        ctx.stroke()
      }
      let n = 0
      const proj = (x: number, y: number, z: number) => {
        const x1 = x * cyw + z * syw
        const z1 = -x * syw + z * cyw
        const y2 = y * cpt - z1 * spt
        const z2 = y * spt + z1 * cpt
        return [x1, y2, z2, f / (f - z2)] as const
      }
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
        bin[n] = zbin(z2)
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
        const [x1, y2, z2, sc] = proj(x, y, z)
        px[n] = cx + x1 * sc * scale
        py[n] = cy + y2 * sc * scale
        bin[n] = zbin(z2)
        isCore[n] = 0
        n++
      }
      binFill.fill(0)
      for (let i = 0; i < n; i++) binFill[bin[i]]++
      binStart[0] = 0
      for (let b = 0; b < NB; b++) binStart[b + 1] = binStart[b] + binFill[b]
      binFill.fill(0)
      for (let i = 0; i < n; i++) order[binStart[bin[i]] + binFill[bin[i]]++] = i
      const gs = Math.max(1, 1.15 * dpr)
      const pass = (b: number) => {
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
          if (!isCore[i]) ctx.fillRect(px[i], py[i], gs, gs)
        }
      }
      const spikes = (front: boolean) => {
        ctx.lineWidth = Math.max(0.75, 0.8 * dpr)
        for (let k = 0; k < SPIKE_N; k++) {
          const o = k * 6
          const sp = (q: number) => {
            const arrA = A?.spikes
            let x = B.spikes[o + q]
            let y = B.spikes[o + q + 1]
            let z = B.spikes[o + q + 2]
            if (arrA) {
              x = arrA[o + q] + (x - arrA[o + q]) * m
              y = arrA[o + q + 1] + (y - arrA[o + q + 1]) * m
              z = arrA[o + q + 2] + (z - arrA[o + q + 2]) * m
            }
            const [x1, y2, z2, sc] = proj(x, y, z)
            return [cx + x1 * sc * scale, cy + y2 * sc * scale, z2]
          }
          const a = sp(0)
          if (a[2] >= 0 !== front) continue
          const e = sp(3)
          const g = ctx.createLinearGradient(a[0], a[1], e[0], e[1])
          g.addColorStop(0, fade(accent, front ? 0.1 : 0.5))
          g.addColorStop(1, "rgba(0,0,0,1)")
          ctx.strokeStyle = g
          ctx.beginPath()
          ctx.moveTo(a[0], a[1])
          ctx.lineTo(e[0], e[1])
          ctx.stroke()
        }
      }
      spikes(false)
      for (let b = 0; b <= Math.floor(NB / 2); b++) pass(b)
      const rs = SPHERE_R * scale
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
      ctx.strokeStyle = fade(accent, 0.45)
      ctx.lineWidth = Math.max(1, dpr)
      ctx.beginPath()
      ctx.arc(cx, cy, rs, 0, Math.PI * 2)
      ctx.stroke()
      for (let b = Math.floor(NB / 2) + 1; b < NB; b++) pass(b)
      spikes(true)
    }

    const handle: OrbHandle = {
      send(cmd) {
        if (cmd.type === "prewarm") {
          const run = () => getCloud(cmd.seed)
          if ("requestIdleCallback" in window) window.requestIdleCallback(run, { timeout: 2000 })
          else setTimeout(run, 300)
          return
        }
        if (cmd.type === "paused") {
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
        if (cmd.type === "lean") {
          if (reduced) return
          s.tLeanYaw = clamp(cmd.yaw, -0.5, 0.5)
          s.tLeanPitch = clamp(cmd.pitch, -0.5, 0.5)
          schedule()
          return
        }
        // reforge: morph every grain to the new shape; crossing back mid-morph reverses it exactly
        if (cmd.seed === s.toSeed) return
        if (s.morphT < 1 && cmd.seed === s.fromSeed && s.from) {
          ;[s.from, s.to] = [s.to, s.from]
          ;[s.fromSeed, s.toSeed] = [s.toSeed, s.fromSeed]
          s.morphT = 1 - s.morphT
        } else {
          const next = getCloud(cmd.seed)
          s.from = reduced ? null : s.to
          s.to = next
          s.fromSeed = s.toSeed
          s.toSeed = cmd.seed
          s.morphT = reduced ? 1 : 0
          s.ring = reduced ? 0 : 1
        }
        s.dirty = true
        schedule()
      },
    }

    ro.observe(canvas)
    resize()
    onReadyRef.current?.(handle)
    return () => {
      cancelAnimationFrame(raf)
      raf = 0
      ro.disconnect()
    }
    // The canvas is set up once; later shapes arrive through the handle.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" tabIndex={-1} className={"block size-full " + className} />
}
