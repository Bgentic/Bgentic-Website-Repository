"use client"
// /services: the services as a connected carousel, a replica of 21st.dev @arunachalam/connected-carousel. A large
// navy card holds the active service: a big headline at the top, its one line in the middle, two small chips at the
// foot (its name, then its highlights), and on the right a screen of it at work. Either side, the services before
// and after it sit as vertical pill cards, a taller one beside the card and a shorter one beyond it, each joined to
// the next by a curved neck, so the five read as one connected object.
//
// Changed from the original: our content and colours (navy on the sand band); the service names as tabs underneath
// in place of the dots, the active one underlined by a line that fills while the carousel waits; a taller card,
// with each screen shown whole (contained, never cropped) over a blurred wash of itself so the space around it isn't
// empty; the outer pills from 1440px, the inner from 1024px, and on smaller screens the card alone, its screen over
// its words. Picking a service (a tab, a pill, or a /services#slug link) swaps the card: the words rise in and the
// new screen opens over the old one through an expanding aperture. It moves on by itself every 6 seconds while it's
// on screen, whether or not anyone clicks: picking a service only restarts the count from there. It holds only while
// keyboard focus is inside it, so someone tabbing through can read. Under reduced motion it never moves by itself and
// changes without the aperture.
import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import type { ServiceSlug } from "@/content/services"
import { cn } from "@/lib/utils"

export type ShowcaseItem = {
  service: ServiceSlug
  tab: string
  name: string
  headline: string
  summary: string
  highlights: string[]
  image: string
  imageAlt: string
  tag?: string
}

const AUTOPLAY_MS = 6000
const OPEN = { duration: 0.7, ease: [0.32, 0.72, 0, 1] as const }
const RISE = { duration: 0.35, ease: [0.23, 1, 0.32, 1] as const }

/** the curved neck that joins two neighbours: full height at both ends, narrowing to its middle */
function Neck({ className }: { className?: string }) {
  return (
    <svg className={cn("showcase-neck", className)} viewBox="0 0 16 64" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 0 Q8 22 16 0 L16 64 Q8 42 0 64 Z" />
    </svg>
  )
}

/** a neighbour, as a vertical pill: its screen inside a navy frame */
function Pill({ item, size, onPick }: { item: ShowcaseItem; size: "inner" | "outer"; onPick: () => void }) {
  return (
    <button type="button" tabIndex={-1} aria-hidden="true" onClick={onPick} className={cn("showcase-pill", `showcase-pill-${size}`)}>
      <span className="showcase-pill-screen">
        <AnimatePresence initial={false}>
          <motion.img
            key={item.service}
            src={item.image}
            alt=""
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="showcase-pill-img"
          />
        </AnimatePresence>
      </span>
    </button>
  )
}

export function ConnectedShowcase({ items }: { items: ShowcaseItem[] }) {
  const n = items.length
  const reduced = useReducedMotion()
  const root = React.useRef<HTMLDivElement>(null)
  const tabs = React.useRef<(HTMLButtonElement | null)[]>([])
  const [active, setActive] = React.useState(0)
  const [held, setHeld] = React.useState(false) // keyboard focus is inside: hold while they read
  const [onScreen, setOnScreen] = React.useState(false)
  const uid = React.useId()

  const at = (i: number) => ((i % n) + n) % n
  // picking a service restarts the count from it (the progress line is keyed to the active one)
  const pick = (i: number) => setActive(at(i))

  // A /services#slug link picks that service; the anchors below (ids = the slugs) bring the showcase into view. On
  // arrival from another page the hash is read once; on this page Next changes the hash without a hashchange event,
  // so a click on any link to one of these hashes picks it too.
  React.useEffect(() => {
    const pickHash = (hash: string) => {
      const i = items.findIndex((it) => `#${it.service}` === hash)
      if (i >= 0) setActive(i)
    }
    pickHash(window.location.hash)
    const onHash = () => pickHash(window.location.hash)
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href*='#']")
      if (!a) return
      const url = new URL((a as HTMLAnchorElement).href)
      if (url.pathname === window.location.pathname) pickHash(url.hash)
    }
    window.addEventListener("hashchange", onHash)
    document.addEventListener("click", onClick)
    return () => {
      window.removeEventListener("hashchange", onHash)
      document.removeEventListener("click", onClick)
    }
  }, [items])

  React.useEffect(() => {
    const el = root.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const playing = !reduced && !held && onScreen
  const item = items[active]

  const onKeyDown = (e: React.KeyboardEvent) => {
    const to = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: n - 1 }[e.key]
    if (to === undefined) return
    e.preventDefault()
    pick(to)
    tabs.current[at(to)]?.focus()
  }

  return (
    <div
      ref={root}
      className="showcase"
      onFocus={(e) => setHeld(e.target.matches(":focus-visible"))}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHeld(false)}
    >
      {/* where a /services#slug link lands: the top of the showcase */}
      {items.map((it) => (
        <span key={it.service} id={it.service} className="showcase-anchor" aria-hidden="true" />
      ))}

      <div className="showcase-row">
        <div className="showcase-side showcase-side-outer">
          <Pill item={items[at(active - 2)]} size="outer" onPick={() => pick(active - 2)} />
          <Neck />
        </div>
        <div className="showcase-side showcase-side-inner">
          <Pill item={items[at(active - 1)]} size="inner" onPick={() => pick(active - 1)} />
          <Neck />
        </div>

        <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${active}`} className="showcase-card">
          <div className="showcase-words">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={item.service}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={reduced ? { duration: 0.15 } : RISE}
                className="flex h-full flex-col"
              >
                <h3 className="showcase-headline">{item.headline}</h3>
                <p className="showcase-summary">{item.summary}</p>
                <div className="showcase-chips">
                  <span className="showcase-chip showcase-chip-name">{item.name}</span>
                  <span className="showcase-chip">{item.highlights.join(" · ")}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="showcase-screen">
            <AnimatePresence initial={false}>
              <motion.div
                key={item.service}
                className="showcase-shot"
                initial={reduced ? { opacity: 0 } : { clipPath: "inset(10% 42% 10% 42% round 48px)" }}
                animate={reduced ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0% round 0px)" }}
                exit={{ opacity: 1, transition: { duration: OPEN.duration } }}
                transition={reduced ? { duration: 0.2 } : OPEN}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- swapped with the slide, opened by clip-path */}
                <img src={item.image} alt="" aria-hidden="true" className="showcase-img-wash" />
                {/* eslint-disable-next-line @next/next/no-img-element -- as above */}
                <img src={item.image} alt={item.imageAlt} className="showcase-img" />
              </motion.div>
            </AnimatePresence>
            {item.tag && <span className="showcase-tag">{item.tag}</span>}
          </div>
        </div>

        <div className="showcase-side showcase-side-inner">
          <Neck className="-scale-x-100" />
          <Pill item={items[at(active + 1)]} size="inner" onPick={() => pick(active + 1)} />
        </div>
        <div className="showcase-side showcase-side-outer">
          <Neck className="-scale-x-100" />
          <Pill item={items[at(active + 2)]} size="outer" onPick={() => pick(active + 2)} />
        </div>
      </div>

      <div role="tablist" aria-label="Services" className="showcase-tabs" onKeyDown={onKeyDown}>
        {items.map((it, i) => (
          <button
            key={it.service}
            ref={(el) => {
              tabs.current[i] = el
            }}
            id={`${uid}-tab-${i}`}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls={`${uid}-panel`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => pick(i)}
            className="showcase-tab"
          >
            {it.tab}
            <span className="showcase-progress" aria-hidden="true">
              {i === active && (
                <motion.span
                  key={`${active}-${playing}`}
                  className="showcase-progress-fill"
                  initial={{ scaleX: playing ? 0 : 1 }}
                  animate={{ scaleX: 1 }}
                  transition={playing ? { duration: AUTOPLAY_MS / 1000, ease: "linear" } : { duration: 0 }}
                  onAnimationComplete={() => playing && pick(active + 1)}
                />
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
