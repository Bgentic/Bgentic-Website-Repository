"use client"
// The hero's stage: the copy on the left, the ink orb floating on the right, a kinetic grid behind both. The orb
// beats every 1.6s (a shockwave and a small swell) and takes a new shape on every third beat; each beat sends a
// soft ripple through the grid from the orb's centre, so the two read as one system. The orb also lights the grid
// and leans toward a mouse. It all stops off screen, and reduced motion shows a still orb on a still grid.
import * as React from "react"
import dynamic from "next/dynamic"
import { KineticGrid, type KineticGridHandle } from "@/components/ui/kinetic-grid"
import type { OrbHandle } from "@/components/ui/ink-orbit-sculpture"
import { FINE_POINTER } from "@/lib/media"
import { useReducedMotion } from "@/lib/use-reduced-motion"

const InkOrbitSculpture = dynamic(
  () => import("@/components/ui/ink-orbit-sculpture").then((m) => m.InkOrbitSculpture),
  { ssr: false },
)

const INK = "#c9ddfd" // sky-200: the ink
const ACCENT = "#7fb0f7" // sky-400: its light, shockwaves and glass
const SEEDS = [7, 4211, 1306, 9001, 2718]
const BEAT_MS = 1600
const REFORGE_EVERY = 3
const PULSE_STRENGTH = 0.75 // an ordinary beat's shockwave, against a reforge's full one
const RIPPLE = { pulse: 0.35, reforge: 0.6 } // how hard each kind of beat moves the grid

/** an element's centre and width, in viewport coordinates */
function centreOf(el: Element) {
  const r = el.getBoundingClientRect()
  return { x: r.left + r.width / 2, y: r.top + r.height / 2, width: r.width }
}

export function HeroScene({ children }: { children: React.ReactNode }) {
  const sectionRef = React.useRef<HTMLElement>(null)
  const stageRef = React.useRef<HTMLDivElement>(null)
  const orb = React.useRef<OrbHandle | null>(null)
  const grid = React.useRef<KineticGridHandle | null>(null)
  const seedAt = React.useRef(0)
  const [ready, setReady] = React.useState(false)
  const [inView, setInView] = React.useState(true)
  const reduced = useReducedMotion()

  React.useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // render the orb only while it's on screen
  React.useEffect(() => {
    orb.current?.send({ type: "paused", value: !inView })
  }, [ready, inView])

  // the beat: a pulse, or every third time a new shape; either way a ripple through the grid
  React.useEffect(() => {
    if (!ready || !inView || reduced) return
    let n = 0
    const t = window.setInterval(() => {
      n++
      const reforge = n % REFORGE_EVERY === 0
      if (reforge) {
        seedAt.current = (seedAt.current + 1) % SEEDS.length
        orb.current?.send({ type: "reforge", seed: SEEDS[seedAt.current] })
        orb.current?.send({ type: "prewarm", seed: SEEDS[(seedAt.current + 1) % SEEDS.length] })
      } else {
        orb.current?.send({ type: "pulse", strength: PULSE_STRENGTH })
      }
      const stage = stageRef.current
      if (stage) {
        const c = centreOf(stage)
        grid.current?.ripple(c.x, c.y, reforge ? RIPPLE.reforge : RIPPLE.pulse)
      }
    }, BEAT_MS)
    return () => window.clearInterval(t)
  }, [ready, inView, reduced])

  // the orb is the scene's light: the grid is lit around it and falls into shadow toward the edges
  React.useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const place = () => {
      const c = centreOf(stage)
      grid.current?.light(c.x, c.y, Math.max(420, c.width * 1.2))
    }
    const ro = new ResizeObserver(place)
    ro.observe(stage)
    return () => ro.disconnect()
  }, [])

  // the orb leans a little toward a mouse pointer
  React.useEffect(() => {
    if (!ready || reduced || !window.matchMedia(FINE_POINTER).matches) return
    const onMove = (e: PointerEvent) => {
      const stage = stageRef.current
      if (!stage) return
      const c = centreOf(stage)
      const yaw = ((e.clientX - c.x) / window.innerWidth) * 0.7
      const pitch = ((e.clientY - c.y) / window.innerHeight) * 0.45
      orb.current?.send({ type: "lean", yaw, pitch })
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [ready, reduced])

  return (
    <section ref={sectionRef} className="hero-x" aria-labelledby="hero-title">
      <div className="hero-backdrop" aria-hidden="true">
        <KineticGrid onReady={(h) => (grid.current = h)} />
      </div>
      <div className="hero-veil" aria-hidden="true" />
      <div className="container-b hero-grid">
        <div className="hero-copy">{children}</div>
        <div ref={stageRef} className="hero-stage" aria-hidden="true">
          <div className="hero-halo" />
          <div className="hero-orb">
            <InkOrbitSculpture
              ink={INK}
              accent={ACCENT}
              seed={SEEDS[0]}
              onReady={(h) => {
                orb.current = h
                h.send({ type: "prewarm", seed: SEEDS[1] })
                setReady(true)
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
