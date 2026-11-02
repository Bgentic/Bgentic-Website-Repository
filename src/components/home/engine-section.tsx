"use client"
// The engine: the transition into the six services. The tools a business juggles start scattered round the edge
// and settle into one ring as the section arrives, and at the centre the ink sculpture reforges every few
// seconds, one system taking new shape. It stays where it is: no scroll physics. A pause control stops the
// reforging (WCAG 2.2.2); reduced motion shows the gathered ring and a still sculpture.
import * as React from "react"
import dynamic from "next/dynamic"
import { Pause, Play } from "lucide-react"
import type { OrbHandle } from "@/components/ui/ink-orbit-sculpture"
import { engine } from "@/content/home"

const InkOrbitSculpture = dynamic(
  () => import("@/components/ui/ink-orbit-sculpture").then((m) => m.InkOrbitSculpture),
  { ssr: false },
)

const SEEDS = [7, 4211, 1306, 9001, 2718]
const REFORGE_MS = 5200

export function EngineSection() {
  const ref = React.useRef<HTMLElement>(null)
  const handle = React.useRef<OrbHandle | null>(null)
  const [gathered, setGathered] = React.useState(false)
  const [inView, setInView] = React.useState(false)
  const [paused, setPaused] = React.useState(false)
  const [reduced, setReduced] = React.useState(false)

  React.useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReduced(q.matches)
    sync()
    q.addEventListener("change", sync)
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        setInView(e.isIntersecting)
        if (e.intersectionRatio > 0.3) setGathered(true)
      },
      { threshold: [0, 0.3] },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      q.removeEventListener("change", sync)
    }
  }, [])

  // render only while on screen and not paused
  React.useEffect(() => {
    handle.current?.send({ type: "paused", value: !inView || paused })
  }, [inView, paused])

  // reforge on a slow beat once the tools have gathered
  React.useEffect(() => {
    if (!gathered || !inView || paused || reduced) return
    let i = 0
    const t = window.setInterval(() => {
      i = (i + 1) % SEEDS.length
      handle.current?.send({ type: "reforge", seed: SEEDS[i] })
      handle.current?.send({ type: "prewarm", seed: SEEDS[(i + 1) % SEEDS.length] })
    }, REFORGE_MS)
    return () => window.clearInterval(t)
  }, [gathered, inView, paused, reduced])

  const onReady = React.useCallback(
    (h: OrbHandle) => {
      handle.current = h
      h.send({ type: "prewarm", seed: SEEDS[1] })
      h.send({ type: "paused", value: !inView || paused })
    },
    // the first state only; later changes travel through the effects above
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return
    const r = e.currentTarget.getBoundingClientRect()
    handle.current?.send({
      type: "lean",
      yaw: ((e.clientX - r.left) / r.width - 0.5) * 0.5,
      pitch: ((e.clientY - r.top) / r.height - 0.5) * 0.4,
    })
  }

  const n = engine.tools.length
  return (
    <section
      ref={ref}
      className="engine dark section"
      data-gathered={gathered || undefined}
      data-band="navy"
      aria-labelledby="engine-title"
    >
      <div className="container-b text-center">
        <h2 id="engine-title" className="t-h2 mx-auto max-w-[20ch]">
          {engine.title}
        </h2>
        <p className="t-lede mx-auto mt-6 max-w-[56ch]">{engine.intro}</p>
      </div>
      <div
        className="engine-stage mt-10 md:mt-6"
        onPointerMove={onPointerMove}
        onPointerLeave={() => handle.current?.send({ type: "lean", yaw: 0, pitch: 0 })}
      >
        <div className="engine-ring" aria-hidden="true" />
        <div className="engine-orb" aria-hidden="true">
          <InkOrbitSculpture ink="#c9ddfd" accent="#7fb0f7" seed={SEEDS[0]} onReady={onReady} />
        </div>
        <ul aria-label="The tools it connects">
          {engine.tools.map((t, i) => {
            const a = (i / n) * Math.PI * 2 - Math.PI / 2
            const style = {
              "--x": `${(Math.cos(a) * 44).toFixed(2)}cqi`,
              "--y": `${(Math.sin(a) * 44).toFixed(2)}cqi`,
              "--r": `${((i % 2 ? 1 : -1) * (6 + (i % 3) * 5)).toFixed(0)}deg`,
              "--d": `${i * 45}ms`,
            } as React.CSSProperties
            return (
              <li key={t} className="tool" style={style}>
                {t}
              </li>
            )
          })}
        </ul>
        {!reduced && (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            aria-label={paused ? "Play the animation" : "Pause the animation"}
            className="absolute bottom-[3%] left-1/2 grid size-9 -translate-x-1/2 place-items-center rounded-full border border-white/10 bg-white/5 text-[color:var(--b-sky-200)] backdrop-blur-md transition-colors hover:bg-white/10"
          >
            {paused ? <Play className="size-3.5" aria-hidden="true" /> : <Pause className="size-3.5" aria-hidden="true" />}
          </button>
        )}
      </div>
      {/* On phones the ring folds into a simple list under the sculpture. */}
      <ul className="container-b mt-6 flex flex-wrap justify-center gap-2 sm:hidden" aria-hidden="true">
        {engine.tools.map((t) => (
          <li key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[13px] text-[#caced4]">
            {t}
          </li>
        ))}
      </ul>
    </section>
  )
}
