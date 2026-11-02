"use client"
// 03 · See it working: one tab per service over a single viewer. The tabs are a segmented control, its pill gliding
// to the chosen tab on a spring (a shared layoutId); the viewer is a glass app window whose content cross-fades the
// moment a tab is chosen. Every panel stays in the page, stacked, so the window never changes height between them.
// Keyboard: arrows move between tabs and choose as they go, Home and End jump to the ends. Styles: the demos section of
// styles/depth.css; the wireframes standing in for each demo: demo-wireframes.tsx.
import * as React from "react"
import Link from "next/link"
import { LayoutGroup, MotionConfig, motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { DemoWireframe } from "@/components/home/demo-wireframes"
import { SectionHeader } from "@/components/site/section-header"
import { ServiceIcon } from "@/components/site/service-icons"
import { buttonVariants } from "@/components/ui/button-variants"
import { demos } from "@/content/home"
import { SERVICES } from "@/content/services"

const PILL_SPRING = { type: "spring", bounce: 0.18, duration: 0.5 } as const

export function SeeItWorking() {
  const [active, setActive] = React.useState(0)
  const tabs = React.useRef<(HTMLButtonElement | null)[]>([])
  const id = React.useId()

  const choose = (i: number, focus = false) => {
    const next = (i + SERVICES.length) % SERVICES.length
    setActive(next)
    const tab = tabs.current[next]
    if (focus) tab?.focus()
    // on narrow screens the control scrolls sideways: bring the chosen tab into view without moving the page
    tab?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" })
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    const moves: Record<string, number> = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: SERVICES.length - 1 }
    if (!(e.key in moves)) return
    e.preventDefault()
    choose(moves[e.key], true)
  }

  return (
    <section className="section demos edge" aria-labelledby="demos-title">
      <div className="container-b">
        <SectionHeader id="demos-title" title={demos.title} intro={demos.intro} />

        <MotionConfig reducedMotion="user">
          <div className="seg-scroll mt-12">
            <LayoutGroup id={id}>
              <div className="seg" role="tablist" aria-label="Services" onKeyDown={onKeyDown}>
                {SERVICES.map((s, i) => {
                  const on = i === active
                  return (
                    <button
                      key={s.slug}
                      ref={(el) => {
                        tabs.current[i] = el
                      }}
                      type="button"
                      role="tab"
                      id={`${id}-tab-${i}`}
                      aria-selected={on}
                      aria-controls={`${id}-panel-${i}`}
                      tabIndex={on ? 0 : -1}
                      className="seg-tab"
                      onClick={() => choose(i)}
                    >
                      {on && <motion.span layoutId="seg-pill" className="seg-pill" transition={PILL_SPRING} />}
                      <ServiceIcon slug={s.slug} className="seg-icon" aria-hidden="true" />
                      <span className="seg-text">{s.name}</span>
                    </button>
                  )
                })}
              </div>
            </LayoutGroup>
          </div>
        </MotionConfig>

        <div className="demo-stack mt-8">
          {SERVICES.map((s, i) => (
            <div
              key={s.slug}
              role="tabpanel"
              id={`${id}-panel-${i}`}
              aria-labelledby={`${id}-tab-${i}`}
              className="demo-panel"
              data-active={i === active || undefined}
              tabIndex={i === active ? 0 : -1}
            >
              <div className="mac">
                <div className="mac-bar">
                  <span className="mac-lights" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="mac-title">app.bgentic.io · {s.name}</span>
                  <span className="mac-tag">Wireframe</span>
                </div>
                <div className="mac-body" aria-hidden="true">
                  <DemoWireframe slug={s.slug} />
                </div>
              </div>
              <div className="demo-caption">
                <div>
                  <h3 className="demo-title">{s.demo.title}</h3>
                  <p className="demo-text">{s.demo.text}</p>
                </div>
                <Link href={`/services/${s.slug}`} className={buttonVariants({ variant: "glass", size: "md" })}>
                  {s.name}, in full
                  <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
