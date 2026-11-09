"use client"
// Kinetic grid: a canvas of hairlines and dots that bends toward the pointer and ripples outward on a click.
// Rebuilt from 21st.dev `satoriui/kinetic-grid` (its published description and preview; the source itself was not
// retrievable at build time). Adapted to sit behind a hero as texture:
//  - it never takes pointer events: it listens on the window and reacts only while the pointer is over it
//  - it draws only while something moves (the pointer settling, a ripple travelling) and stops off screen
//  - ripples can also be sent from code, so other parts of the page can move through it
//  - it can be lit: a point light (the hero's orb) brightens the lines near it, falling off into shadow
//  - reduced motion draws one still grid
import * as React from "react"
import { clamp, hexToRgb } from "@/lib/canvas"
import { REDUCED_MOTION } from "@/lib/media"

export type KineticGridHandle = {
  ripple: (clientX: number, clientY: number, strength?: number) => void
  /** a point light in viewport coordinates; the grid is brightest under it and dark beyond its reach */
  light: (clientX: number, clientY: number, reach: number) => void
}

type Props = {
  /** grid spacing, CSS px */
  cell?: number
  /** how far the pointer's pull reaches, CSS px */
  radius?: number
  /** how far a point under the pointer travels toward it, 0 to 1 */
  pull?: number
  /** resting lines and dots */
  line?: string
  /** what the pointer or a ripple lights up */
  glow?: string
  onReady?: (handle: KineticGridHandle) => void
  className?: string
}

const SPEED = 520 // ripple front, px/s
const LIFE = 1.7 // s
const BAND = 44 // ripple thickness, px
const AMP = 14 // ripple push at full strength, px
const LEVELS = 5 // heat buckets, so hot lines and dots draw in a handful of paths

export function KineticGrid({
  cell = 56,
  radius = 220,
  pull = 0.3,
  line = "#c9ddfd",
  glow = "#7fb0f7",
  onReady,
  className = "",
}: Props) {
  const ref = React.useRef<HTMLCanvasElement>(null)
  const onReadyRef = React.useRef(onReady)
  React.useEffect(() => {
    onReadyRef.current = onReady
  }, [onReady])

  React.useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    const reduced = matchMedia(REDUCED_MOTION).matches
    // colours as "r,g,b", ready for rgba() at any alpha
    const L = hexToRgb(line).join(",")
    const G = hexToRgb(glow).join(",")

    let W = 0
    let H = 0
    let dpr = 1
    let cols = 0
    let rows = 0
    let bx = new Float32Array(0)
    let by = new Float32Array(0)
    let x = new Float32Array(0)
    let y = new Float32Array(0)
    let heat = new Float32Array(0)
    const ripples: { x: number; y: number; age: number; k: number }[] = []
    const ptr = { cx: 0, cy: 0, tx: 0, ty: 0, x: 0, y: 0, on: 0, target: 0, seen: false }
    let visible = true
    let lamp: { x: number; y: number; r: number } | null = null
    let raf = 0
    let last = 0

    const layout = () => {
      const r = canvas.getBoundingClientRect()
      dpr = Math.min(2, window.devicePixelRatio || 1)
      W = r.width
      H = r.height
      canvas.width = Math.max(1, Math.round(W * dpr))
      canvas.height = Math.max(1, Math.round(H * dpr))
      // a margin of cells past every edge, so warped points never pull the grid's border into view
      cols = Math.ceil(W / cell) + 3
      rows = Math.ceil(H / cell) + 3
      const ox = (W - (cols - 1) * cell) / 2
      const oy = (H - (rows - 1) * cell) / 2
      const n = cols * rows
      bx = new Float32Array(n)
      by = new Float32Array(n)
      x = new Float32Array(n)
      y = new Float32Array(n)
      heat = new Float32Array(n)
      for (let j = 0; j < rows; j++)
        for (let i = 0; i < cols; i++) {
          const k = j * cols + i
          bx[k] = x[k] = ox + i * cell
          by[k] = y[k] = oy + j * cell
        }
    }

    // advance the pointer and ripples, place every point; returns whether anything is still moving
    const step = (dt: number) => {
      const ease = 1 - Math.exp(-dt * 14)
      ptr.x += (ptr.tx - ptr.x) * ease
      ptr.y += (ptr.ty - ptr.y) * ease
      ptr.on += (ptr.target - ptr.on) * (1 - Math.exp(-dt * 6))
      for (const r of ripples) r.age += dt
      for (let i = ripples.length - 1; i >= 0; i--) if (ripples[i].age > LIFE) ripples.splice(i, 1)
      const R = radius
      const R2 = R * R
      const n = bx.length
      for (let k = 0; k < n; k++) {
        const px = bx[k]
        const py = by[k]
        let dx = 0
        let dy = 0
        let h = 0
        if (ptr.on > 0.002) {
          const ex = ptr.x - px
          const ey = ptr.y - py
          const d2 = ex * ex + ey * ey
          if (d2 < R2) {
            const t = 1 - Math.sqrt(d2) / R
            const f = t * t * (3 - 2 * t) * ptr.on
            dx += ex * f * pull
            dy += ey * f * pull
            h = f
          }
        }
        for (const r of ripples) {
          const ex = px - r.x
          const ey = py - r.y
          const d = Math.sqrt(ex * ex + ey * ey) || 1
          const off = d - r.age * SPEED
          if (off > BAND * 3 || off < -BAND * 3) continue
          const g = Math.exp(-(off * off) / (2 * BAND * BAND))
          const life = 1 - r.age / LIFE
          const push = AMP * r.k * life * life * g
          dx += (ex / d) * push
          dy += (ey / d) * push
          h = Math.max(h, g * life * r.k * 0.85)
        }
        x[k] = px + dx
        y[k] = py + dy
        heat[k] = h
      }
      return (
        ripples.length > 0 ||
        Math.abs(ptr.target - ptr.on) > 0.002 ||
        Math.abs(ptr.tx - ptr.x) > 0.3 ||
        Math.abs(ptr.ty - ptr.y) > 0.3
      )
    }

    const bucket = (h: number) => (h < 0.04 ? -1 : Math.min(LEVELS - 1, Math.floor(h * LEVELS)))

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, W, H)
      // resting lines and dots, built once and drawn twice: faint everywhere, then lit by the lamp
      const lines = new Path2D()
      for (let j = 0; j < rows; j++) {
        const o = j * cols
        lines.moveTo(x[o], y[o])
        for (let i = 1; i < cols; i++) lines.lineTo(x[o + i], y[o + i])
      }
      for (let i = 0; i < cols; i++) {
        lines.moveTo(x[i], y[i])
        for (let j = 1; j < rows; j++) lines.lineTo(x[j * cols + i], y[j * cols + i])
      }
      const dots = new Path2D()
      for (let k = 0; k < x.length; k++) dots.rect(x[k] - 0.75, y[k] - 0.75, 1.5, 1.5)
      ctx.lineWidth = 1
      ctx.strokeStyle = `rgba(${L},0.045)`
      ctx.stroke(lines)
      ctx.fillStyle = `rgba(${L},0.14)`
      ctx.fill(dots)
      if (lamp) {
        const { x: lx, y: ly, r: lr } = lamp
        const lit = (a: number) => {
          const g = ctx.createRadialGradient(lx, ly, 0, lx, ly, lr)
          g.addColorStop(0, `rgba(${L},${a})`)
          g.addColorStop(0.45, `rgba(${L},${a * 0.4})`)
          g.addColorStop(1, `rgba(${L},0)`)
          return g
        }
        ctx.strokeStyle = lit(0.13)
        ctx.stroke(lines)
        ctx.fillStyle = lit(0.32)
        ctx.fill(dots)
      }
      // lit lines and dots, hottest last
      for (let b = 0; b < LEVELS; b++) {
        const a = (b + 1) / LEVELS
        ctx.strokeStyle = `rgba(${G},${0.06 + 0.38 * a})`
        ctx.beginPath()
        for (let j = 0; j < rows; j++)
          for (let i = 0; i < cols; i++) {
            const k = j * cols + i
            if (i + 1 < cols && bucket((heat[k] + heat[k + 1]) / 2) === b) {
              ctx.moveTo(x[k], y[k])
              ctx.lineTo(x[k + 1], y[k + 1])
            }
            if (j + 1 < rows && bucket((heat[k] + heat[k + cols]) / 2) === b) {
              ctx.moveTo(x[k], y[k])
              ctx.lineTo(x[k + cols], y[k + cols])
            }
          }
        ctx.stroke()
        ctx.fillStyle = `rgba(${G},${0.2 + 0.5 * a})`
        ctx.shadowColor = `rgba(${G},0.6)`
        ctx.shadowBlur = 4 * a
        ctx.beginPath()
        for (let k = 0; k < x.length; k++) {
          if (bucket(heat[k]) !== b) continue
          const s = 1 + 1.1 * a
          ctx.moveTo(x[k] + s, y[k])
          ctx.arc(x[k], y[k], s, 0, Math.PI * 2)
        }
        ctx.fill()
        ctx.shadowBlur = 0
      }
    }

    const frame = (now: number) => {
      raf = 0
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60
      last = now
      const moving = step(dt)
      draw()
      if (moving && visible) raf = requestAnimationFrame(frame)
      else last = 0
    }
    const kick = () => {
      if (!raf && visible) raf = requestAnimationFrame(frame)
    }

    const aim = () => {
      const r = canvas.getBoundingClientRect()
      const lx = ptr.cx - r.left
      const ly = ptr.cy - r.top
      const inside = lx >= 0 && ly >= 0 && lx <= r.width && ly <= r.height
      ptr.tx = lx
      ptr.ty = ly
      // the first time in, start under the pointer rather than sliding in from a corner
      if (inside && ptr.on < 0.01) {
        ptr.x = lx
        ptr.y = ly
      }
      ptr.target = inside ? 1 : 0
      kick()
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      ptr.cx = e.clientX
      ptr.cy = e.clientY
      ptr.seen = true
      aim()
    }
    // re-aimed on scroll only while the grid is on screen (aiming measures the canvas, which would otherwise make every
    // scroll down the page wait on a layout); it aims afresh as it comes back into view
    const onScroll = () => {
      if (ptr.seen && visible) aim()
    }
    const onLeave = () => {
      ptr.target = 0
      kick()
    }
    const handle: KineticGridHandle = {
      ripple(clientX, clientY, strength = 1) {
        if (reduced) return
        const r = canvas.getBoundingClientRect()
        ripples.push({ x: clientX - r.left, y: clientY - r.top, age: 0, k: clamp(strength, 0, 1) })
        if (ripples.length > 6) ripples.shift()
        kick()
      },
      light(clientX, clientY, reach) {
        const r = canvas.getBoundingClientRect()
        lamp = { x: clientX - r.left, y: clientY - r.top, r: reach }
        step(0)
        draw()
      },
    }
    const onDown = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) return
      handle.ripple(e.clientX, e.clientY, 1)
    }

    const ro = new ResizeObserver(() => {
      layout()
      step(0)
      draw()
    })
    ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible) {
        if (ptr.seen) aim()
        kick()
      } else {
        cancelAnimationFrame(raf)
        raf = 0
        last = 0
      }
    })
    io.observe(canvas)
    if (!reduced) {
      window.addEventListener("pointermove", onMove, { passive: true })
      window.addEventListener("pointerdown", onDown, { passive: true })
      window.addEventListener("scroll", onScroll, { passive: true })
      document.documentElement.addEventListener("pointerleave", onLeave)
    }
    onReadyRef.current?.(handle)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerdown", onDown)
      window.removeEventListener("scroll", onScroll)
      document.documentElement.removeEventListener("pointerleave", onLeave)
    }
  }, [cell, radius, pull, line, glow])

  return <canvas ref={ref} aria-hidden="true" tabIndex={-1} className={"block size-full " + className} />
}
