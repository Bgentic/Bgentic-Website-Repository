"use client"
// The hero's live desk: a business running itself, one event at a time. Built on the orchestration of 21st.dev
// `dhxwhy/live-notification-feed` (arrivals, the loop, pause on hover and focus, enter and leave transitions, the
// reduced-motion fallback), with Bgentic's own event stories and three changes for a landing page:
//  - a visible Pause control, and it pauses itself off screen (WCAG 2.2.2: nothing moves on its own unchecked)
//  - no live-region announcements: it's a demonstration, read as a list, not a stream of interruptions
//  - semantic colour from the brand: violet for AI and ERP work, green for done, amber for triggers
// Every event is an example, and the panel says so.
import * as React from "react"
import {
  CalendarCheck,
  CreditCard,
  MessageSquareText,
  Pause,
  Play,
  RefreshCw,
  Star,
  BellRing,
} from "lucide-react"

type Tone = "ai" | "done" | "trigger"
type Base = { id: string; app: string; time: string; title: string; tone: Tone }
export type DeskEvent =
  | (Base & { kind: "reply"; from: string; text: string })
  | (Base & { kind: "booking"; day: string; slot: string; detail: string })
  | (Base & { kind: "payment"; amount: number; detail: string })
  | (Base & { kind: "steps"; steps: string[]; step: number; detail: string })
  | (Base & { kind: "note"; detail: string; icon: "review" | "reminder" })

type Entry = { id: string; key: string; fresh: boolean; leaving: boolean; delay: number }

const ENTER_MS = 460
const LEAVE_MS = 340
const SWEEP_MS = 60
const STORY_DELAY_MS = 260
const TYPING_MS = 1000
// The brand's strong ease-out (tokens.css --ease-out): arrivals land, they don't bounce.
const SPRING = "cubic-bezier(0.23, 1, 0.32, 1)"
const SETTLE = "cubic-bezier(0.2, 0.8, 0.2, 1)"
const EXIT = "cubic-bezier(0.4, 0, 0.2, 1)"

const TONE_COLOR: Record<Tone, string> = {
  ai: "var(--b-violet)",
  done: "var(--b-success)",
  trigger: "var(--b-warn-ink)",
}

function EventIcon({ e }: { e: DeskEvent }) {
  const props = { className: "size-[18px]", strokeWidth: 1.75 }
  switch (e.kind) {
    case "reply":
      return <MessageSquareText {...props} />
    case "booking":
      return <CalendarCheck {...props} />
    case "payment":
      return <CreditCard {...props} />
    case "steps":
      return <RefreshCw {...props} />
    case "note":
      return e.icon === "review" ? <Star {...props} /> : <BellRing {...props} />
  }
}

function useReducedMotion() {
  const [reduced, setReduced] = React.useState(false)
  React.useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(q.matches)
    update()
    q.addEventListener("change", update)
    return () => q.removeEventListener("change", update)
  }, [])
  return reduced
}

/** Runs `fn` after `ms` while `active`; cleans itself up. */
function useLater(active: boolean, ms: number, fn: () => void) {
  const fnRef = React.useRef(fn)
  React.useEffect(() => {
    fnRef.current = fn
  })
  React.useEffect(() => {
    if (!active) return
    const t = window.setTimeout(() => fnRef.current(), ms)
    return () => window.clearTimeout(t)
  }, [active, ms])
}

/* ---------------------------------------------------------------- stories */

function Reply({ e, play, reduced }: { e: Extract<DeskEvent, { kind: "reply" }>; play: boolean; reduced: boolean }) {
  const [typed, setTyped] = React.useState(!play || reduced)
  useLater(!typed, STORY_DELAY_MS + TYPING_MS, () => setTyped(true))
  return (
    <div className="mt-2.5 rounded-2xl rounded-tl-md bg-fill px-3 py-2 text-[13px] leading-snug text-body">
      {typed ? (
        <p className="animate-in fade-in-0 duration-300">{e.text}</p>
      ) : (
        <span className="flex h-5 items-center gap-1" aria-label="Typing">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="size-1.5 rounded-full bg-slate/60 motion-safe:animate-pulse"
              style={{ animationDelay: `${i * 160}ms` }}
            />
          ))}
        </span>
      )}
    </div>
  )
}

const REEL = Array.from({ length: 10 }, (_, i) => i)
function Payment({ e, play, reduced }: { e: Extract<DeskEvent, { kind: "payment" }>; play: boolean; reduced: boolean }) {
  const [rolled, setRolled] = React.useState(!play || reduced)
  useLater(!rolled, STORY_DELAY_MS, () => setRolled(true))
  const text = e.amount.toLocaleString("en-AU", { style: "currency", currency: "AUD" })
  let digitIndex = 0
  return (
    <div className="mt-2 flex items-baseline gap-2">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="flex text-[1.375rem] leading-none font-semibold tracking-[-0.02em] text-ink tabular-nums">
        {text.split("").map((ch, i) => {
          if (!/\d/.test(ch)) return <span key={i}>{ch}</span>
          const d = Number(ch)
          const order = digitIndex++
          return (
            <span key={i} className="relative inline-block h-[1em] overflow-hidden">
              <span
                className="flex flex-col"
                style={{
                  transform: `translateY(-${rolled ? d : 0}em)`,
                  transition: reduced ? "none" : `transform 900ms ${SETTLE} ${order * 45}ms`,
                }}
              >
                {REEL.map((n) => (
                  <span key={n} className="h-[1em]">
                    {n}
                  </span>
                ))}
              </span>
            </span>
          )
        })}
      </span>
      <span className="text-xs text-slate">{e.detail}</span>
    </div>
  )
}

function Booking({ e, play, reduced }: { e: Extract<DeskEvent, { kind: "booking" }>; play: boolean; reduced: boolean }) {
  const [shown, setShown] = React.useState(!play || reduced)
  useLater(!shown, STORY_DELAY_MS, () => setShown(true))
  return (
    <div className="mt-2.5 flex items-center gap-3">
      <span
        className="grid w-12 shrink-0 overflow-hidden rounded-lg border border-line bg-surface text-center"
        style={{
          transform: shown ? "none" : "translateY(-6px) rotateX(40deg)",
          opacity: shown ? 1 : 0,
          transition: reduced ? "none" : `transform 420ms ${SPRING}, opacity 240ms ease`,
        }}
      >
        <span className="bg-brand py-0.5 text-[10px] font-semibold tracking-wide text-white uppercase">{e.day}</span>
        <span className="py-1 text-[11px] font-semibold text-ink tabular-nums">{e.slot}</span>
      </span>
      <span className="text-[13px] leading-snug text-body">{e.detail}</span>
    </div>
  )
}

function Steps({ e, play, reduced }: { e: Extract<DeskEvent, { kind: "steps" }>; play: boolean; reduced: boolean }) {
  const [reached, setReached] = React.useState(!play || reduced ? e.step : -1)
  React.useEffect(() => {
    if (reached >= e.step) return
    const t = window.setTimeout(() => setReached((r) => r + 1), reached < 0 ? STORY_DELAY_MS : 320)
    return () => window.clearTimeout(t)
  }, [reached, e.step])
  return (
    <div className="mt-2.5">
      <ol className="flex items-center gap-1.5" aria-label={`${e.steps[e.step]}, step ${e.step + 1} of ${e.steps.length}`}>
        {e.steps.map((s, i) => (
          <li key={s} className="flex flex-1 flex-col gap-1.5">
            <span
              className="h-1 rounded-full"
              style={{
                background: i <= reached ? "currentColor" : "var(--b-fill)",
                transition: reduced ? "none" : "background-color 240ms ease",
              }}
            />
            <span className={"text-[11px] leading-none " + (i <= reached ? "text-ink" : "text-slate")}>{s}</span>
          </li>
        ))}
      </ol>
      <p className="mt-2 text-xs text-slate">{e.detail}</p>
    </div>
  )
}

/* ------------------------------------------------------------------ card */

function DeskCard({ e, entry, reduced }: { e: DeskEvent; entry: Entry; reduced: boolean }) {
  const [entered, setEntered] = React.useState(!entry.fresh || reduced)
  React.useEffect(() => {
    if (entered) return
    let second = 0
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setEntered(true))
    })
    return () => {
      cancelAnimationFrame(first)
      cancelAnimationFrame(second)
    }
  }, [entered])

  const shown = entered && !entry.leaving
  const dur = entry.leaving ? LEAVE_MS : ENTER_MS
  const lag = entry.delay
  const play = entry.fresh

  return (
    <li
      className="grid"
      style={{
        gridTemplateRows: shown ? "1fr" : "0fr",
        transition: reduced ? "none" : `grid-template-rows ${dur}ms ${entry.leaving ? EXIT : SETTLE} ${lag}ms`,
      }}
    >
      <div className="min-h-0 overflow-hidden">
        <div className="px-1 pt-0.5 pb-2">
          <article
            className="desk-card rounded-[18px] p-3.5"
            style={{
              transform: shown ? "none" : entry.leaving ? "translateX(14%) scale(0.98)" : "translateY(-14px) scale(0.97)",
              opacity: shown ? 1 : 0,
              transition: reduced
                ? "none"
                : `transform ${dur}ms ${entry.leaving ? EXIT : SPRING} ${lag}ms, opacity ${Math.round(dur * 0.7)}ms ease ${lag}ms`,
            }}
          >
            <div className="flex gap-3">
              <span
                className="desk-tile grid size-9 shrink-0 place-items-center rounded-xl"
                style={{ color: TONE_COLOR[e.tone] }}
                aria-hidden="true"
              >
                <EventIcon e={e} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 text-xs text-slate">
                  <span className="truncate font-medium">{e.app}</span>
                  <span aria-hidden="true">·</span>
                  <span className="shrink-0 tabular-nums">{e.time}</span>
                </p>
                <h3 className="mt-0.5 text-[14px] leading-snug font-semibold text-ink">{e.title}</h3>
                <div style={{ color: TONE_COLOR[e.tone] }}>
                  {e.kind === "reply" && <Reply e={e} play={play} reduced={reduced} />}
                  {e.kind === "payment" && <Payment e={e} play={play} reduced={reduced} />}
                  {e.kind === "booking" && <Booking e={e} play={play} reduced={reduced} />}
                  {e.kind === "steps" && <Steps e={e} play={play} reduced={reduced} />}
                  {e.kind === "note" && <p className="mt-1 text-[13px] leading-snug text-body">{e.detail}</p>}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </li>
  )
}

/* ------------------------------------------------------------- the desk */

type Props = {
  events: DeskEvent[]
  business: string
  day: string
  /** How many events are already on the desk when it starts. */
  initial?: number
  interval?: number
  /** Height of the event list, any CSS length. */
  height?: string
  className?: string
}

export function LiveDesk({ events, business, day, initial = 2, interval = 2600, height = "25.5rem", className = "" }: Props) {
  const reduced = useReducedMotion()
  const rootRef = React.useRef<HTMLDivElement>(null)
  const [entries, setEntries] = React.useState<Entry[]>(() =>
    events.slice(0, initial).map((e) => ({ id: e.id, key: `${e.id}:0`, fresh: false, leaving: false, delay: 0 })),
  )
  const [userPaused, setUserPaused] = React.useState(false)
  const [hovering, setHovering] = React.useState(false)
  const [offscreen, setOffscreen] = React.useState(false)
  const cursor = React.useRef(initial)
  const generation = React.useRef(0)
  const byId = React.useMemo(() => new Map(events.map((e) => [e.id, e])), [events])
  const running = !reduced && !userPaused && !hovering && !offscreen

  // pause itself whenever it isn't on screen
  React.useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setOffscreen(!e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // reduced motion: the whole day, still
  const stillDay = React.useMemo(
    () => events.map((e) => ({ id: e.id, key: `${e.id}:static`, fresh: false, leaving: false, delay: 0 })),
    [events],
  )

  React.useEffect(() => {
    if (!running) return
    const timers: number[] = []
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms))
    const step = () => {
      if (cursor.current < events.length) {
        const e = events[cursor.current]
        cursor.current += 1
        generation.current += 1
        const entry: Entry = { id: e.id, key: `${e.id}:${generation.current}`, fresh: true, leaving: false, delay: 0 }
        setEntries((prev) => [...prev.filter((p) => p.id !== e.id), entry])
        later(step, interval)
        return
      }
      // the day is done: sweep the desk, then start the day again
      setEntries((prev) => prev.map((p, i, all) => ({ ...p, leaving: true, delay: (all.length - 1 - i) * SWEEP_MS })))
      later(() => {
        generation.current += 1
        cursor.current = initial
        setEntries(
          events.slice(0, initial).map((e, i) => ({
            id: e.id,
            key: `${e.id}:${generation.current}`,
            fresh: true,
            leaving: false,
            delay: (initial - 1 - i) * 90,
          })),
        )
        later(step, interval)
      }, LEAVE_MS + entries.length * SWEEP_MS + 600)
    }
    later(step, interval)
    return () => timers.forEach((t) => window.clearTimeout(t))
    // `entries.length` only sizes the sweep; restarting on it would reset the timer every arrival
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, events, interval, initial])

  const ordered = [...(reduced ? stillDay : entries)].reverse()

  return (
    <div
      ref={rootRef}
      className={"glass rounded-[28px] p-2 " + className}
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
      onFocusCapture={() => setHovering(true)}
      onBlurCapture={(ev) => {
        if (!ev.currentTarget.contains(ev.relatedTarget as Node | null)) setHovering(false)
      }}
    >
      <div className="flex items-center gap-2.5 px-3 pt-2.5 pb-3">
        <span className="relative grid size-2 place-items-center" aria-hidden="true">
          <span className="absolute size-2 rounded-full bg-success" />
          {running && <span className="absolute size-2 rounded-full bg-success motion-safe:animate-ping" />}
        </span>
        <p className="min-w-0 text-sm">
          <span className="font-semibold text-ink">{business}</span>
          <span className="text-slate"> · {day}</span>
        </p>
        <span className="ml-auto rounded-full border border-line px-2 py-0.5 text-[11px] font-medium text-slate">
          Example
        </span>
        {!reduced && (
          <button
            type="button"
            onClick={() => setUserPaused((p) => !p)}
            aria-pressed={userPaused}
            aria-label={userPaused ? "Play the example" : "Pause the example"}
            className="grid size-7 place-items-center rounded-full text-slate transition-colors hover:bg-fill hover:text-ink"
          >
            {userPaused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
          </button>
        )}
      </div>
      <ol
        aria-label={`Example: a ${day} at ${business}, handled by Bgentic`}
        className="overflow-hidden px-0.5"
        style={{
          height,
          maskImage: "linear-gradient(to bottom, black calc(100% - 3rem), transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, black calc(100% - 3rem), transparent)",
        }}
      >
        {ordered.map((entry) => {
          const e = byId.get(entry.id)
          return e ? <DeskCard key={entry.key} e={e} entry={entry} reduced={reduced} /> : null
        })}
      </ol>
    </div>
  )
}
