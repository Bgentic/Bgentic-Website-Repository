"use client"
// The hero's stage: the copy on the left, the ink orb floating on the right, a kinetic grid behind both. The orb
// beats every 1.6s (a shockwave and a small swell) and takes a new shape on every third beat; each beat sends a
// soft ripple through the grid from the orb's centre, so the two read as one system. Nothing is drawn round the
// orb. It all stops off screen, and reduced motion shows a still orb on a still grid.
import * as React from "react"
import dynamic from "next/dynamic"
import { KineticGrid, type KineticGridHandle } from "@/components/ui/kinetic-grid"
import type { OrbHandle } from "@/components/ui/ink-orbit-sculpture"
import { useReducedMotion } from "@/lib/use-reduced-motion"

const InkOrbitSculpture = dynamic(
  () => import("@/components/ui/ink-orbit-sculpture").then((m) => m.InkOrbitSculpture),
  { ssr: false },
)

const SEEDS = [7, 4211, 1306, 9001, 2718]
const BEAT_MS = 1600
const REFORGE_EVERY = 3

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

  // the beat
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
        orb.current?.send({ type: "pulse", strength: 0.75 })
      }
      const r = stageRef.current?.getBoundingClientRect()
      if (r) grid.current?.ripple(r.left + r.width / 2, r.top + r.height / 2, reforge ? 0.9 : 0.5)
    }, BEAT_MS)
    return () => window.clearInterval(t)
  }, [ready, inView, reduced])

  // the orb leans a little toward a mouse pointer
  React.useEffect(() => {
    if (!ready || reduced || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return
    const onMove = (e: PointerEvent) => {
      const r = stageRef.current?.getBoundingClientRect()
      if (!r) return
      const yaw = ((e.clientX - (r.left + r.width / 2)) / window.innerWidth) * 0.7
      const pitch = ((e.clientY - (r.top + r.height / 2)) / window.innerHeight) * 0.45
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
              ink="#c9ddfd"
              accent="#7fb0f7"
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
