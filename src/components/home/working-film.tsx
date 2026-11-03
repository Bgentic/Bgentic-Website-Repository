"use client"
// 03 · See it working: one window, one film. An ordinary Tuesday at an example plumbing business, moving through six
// screens of the app (overview, inbox, pipeline, automations, website, reports), the sidebar steady as each changes. It's
// rendered by scripts/demo-film.mjs (npm run film); this is its player. It autoplays muted and looped from the moment
// the page loads, starting where its poster is so the first frame doesn't jump. Under reduced motion it stays on the
// poster.
//
// What runs it floats either side: Claude as a terminal working through a request (lower left) and the engineering
// team as a shared code editor (upper right): two engineers' live cursors in the file, the team's activity beneath it,
// each panel overlapping the window's edge for depth and plugged into it by two cables. The cables are Bezier curves
// that sag under their own weight, and each has two lanes, so light runs in to the window on one and back out on the
// other. From 1200px the window is 70vw (Attio's measured window, 75vw, stepped down to make room) and the panels
// float; below that they sit in a row under it without cables. The panels and cables rest while the section is off
// screen. Styles: the "see it working" section of styles/depth.css.
import * as React from "react"
import { Asterisk, Check, ChevronsRight, FileCode2, LoaderCircle } from "lucide-react"
import { demos } from "@/content/home"
import { useReducedMotion } from "@/lib/use-reduced-motion"

const FILM = "/video/see-it-working.mp4"
const POSTER = "/video/see-it-working-poster.jpg"
/** the film's time the poster is taken from (scripts/demo-film.mjs), so playback picks up from the poster */
const POSTER_AT = 3.2
/** the panels' clock: everything in them moves on this beat */
const TICK = 400

/* ---------------------------------------------------------------- Claude's terminal */

const PROMPTS = [
  {
    ask: "Hannah missed our call. Book her in.",
    steps: ["Read Hannah's messages", "Found Wed 8:00 am free", "Booked her, texted the time"],
    done: "Done · booked for Wed 8:00 am",
  },
  {
    ask: "Who still owes us this week?",
    steps: ["Checked this week's invoices", "Found 2 overdue", "Sent pay-by-text links"],
    done: "Done · 2 reminders sent",
  },
  {
    ask: "Sum up today for the owner.",
    steps: ["Read today's calls and jobs", "Wrote the summary", "Queued it for 6 pm"],
    done: "Done · summary queued",
  },
]
const CLAUDE_CYCLE = 24 // ticks: steps land at 3, 6 and 9, done at 12, the next request at 24

function Claude({ tick, still }: { tick: number; still: boolean }) {
  const p = PROMPTS[Math.floor(tick / CLAUDE_CYCLE) % PROMPTS.length]
  const t = still ? CLAUDE_CYCLE - 1 : tick % CLAUDE_CYCLE
  const shown = t >= 9 ? 3 : t >= 6 ? 2 : t >= 3 ? 1 : 0
  const done = t >= 12
  return (
    <div className="side-panel term">
      <div className="sp-bar">
        <span className="sp-lights">
          <i />
          <i />
          <i />
        </span>
        <span className="sp-title">claude</span>
      </div>
      <div className="term-body">
        <p className="term-prompt">&gt; {p.ask}</p>
        <ul className="term-steps">
          {p.steps.slice(0, shown).map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <p className="term-status" data-done={done || undefined}>
          {done ? (
            <>
              <Check className="size-3" strokeWidth={2.5} />
              {p.done}
            </>
          ) : (
            <>
              <Asterisk className="term-spin size-3" strokeWidth={2.5} />
              Thinking… ({Math.max(1, Math.round((t * TICK) / 1000))}s)
            </>
          )}
        </p>
        <p className="term-input">
          &gt;<span className="term-caret" />
        </p>
      </div>
      <p className="term-foot">
        <ChevronsRight className="size-3" strokeWidth={2.5} />
        auto · Claude · Bgentic
      </p>
    </div>
  )
}

/* ---------------------------------------------------------------- the engineers' shared editor */

// Three of our engineers. Christian writes a line, John's cursor moves over to
// review it, Bayan deploys it; the feed under the file logs each as it happens.
const TEAM = {
  christian: { name: "Christian", initial: "C" },
  john: { name: "John", initial: "J" },
  bayan: { name: "Bayan", initial: "B" },
} as const
type Who = keyof typeof TEAM

type Tok = [cls: "k" | "f" | "s" | "p" | "v", text: string]
const CODE: Tok[][] = [
  [["k", "export async function "], ["f", "sync"], ["p", "(job) {"]],
  [["k", "  const "], ["v", "inv "], ["p", "= "], ["k", "await "], ["v", "xero"], ["p", "."], ["f", "invoice"], ["p", "({"]],
  [["v", "    contact"], ["p", ": "], ["v", "job.customer"], ["p", ","]],
  [["v", "    reference"], ["p", ": "], ["s", "`JOB-${job.id}`"], ["p", ","]],
  [["p", "  })"]],
  [["k", "  await "], ["v", "pipeline"], ["p", "."], ["f", "move"], ["p", "(job, "], ["s", '"Paid"'], ["p", ")"]],
  [["p", "}"]],
]
const ADDED = 3 // the line Christian is writing
const ADDED_LEN = CODE[ADDED].reduce((n, [, t]) => n + t.length, 0)
const CODE_CYCLE = 24 // ticks: Christian types over 1..11 and pushes at 12, John approves at 15, Bayan ships at 18

/** where John is looking: [line, token] he has selected, by moment in the cycle */
const johnAt = (t: number): [number, number] => (t >= 18 ? [1, 4] : t >= 13 ? [ADDED, 0] : [5, 1])

const EVENTS: { at: number; who: Who; text: string }[] = [
  { at: 12, who: "christian", text: "pushed the job reference" },
  { at: 15, who: "john", text: "reviewed and approved" },
  { at: 18, who: "bayan", text: "deployed to Brightwater" },
]
const AGO = ["now", "2m", "4m"]

/** a line of tokens cut to its first n characters */
function cut(line: Tok[], n: number): Tok[] {
  const out: Tok[] = []
  for (const [c, t] of line) {
    if (n <= 0) break
    out.push([c, t.slice(0, n)])
    n -= t.length
  }
  return out
}

const Avatar = ({ who, size = "sm" }: { who: Who; size?: "sm" | "xs" }) => (
  <span className={`mp-av mp-av-${size}`} data-who={who}>
    {TEAM[who].initial}
  </span>
)

function Engineers({ tick, still }: { tick: number; still: boolean }) {
  const cycle = Math.floor((tick + 6) / CODE_CYCLE)
  const t = still ? CODE_CYCLE - 1 : (tick + 6) % CODE_CYCLE
  const typed = still ? ADDED_LEN : Math.min(ADDED_LEN, Math.max(0, t - 1) * 3)
  const christianHere = !still && t < 12
  const [johnLine, johnTok] = johnAt(t)
  const state = t >= 18 ? "live" : t >= 15 ? "deploying" : "editing"

  // the last three events, this cycle's that have happened and then the previous cycle's
  const feed = [...EVENTS.filter((e) => t >= e.at).map((e) => ({ ...e, cycle })), ...EVENTS.map((e) => ({ ...e, cycle: cycle - 1 }))]
    .sort((a, b) => b.cycle - a.cycle || b.at - a.at)
    .slice(0, 3)

  return (
    <div className="side-panel code">
      <div className="sp-bar">
        <span className="sp-lights">
          <i />
          <i />
          <i />
        </span>
        <span className="sp-tab">
          <FileCode2 className="size-3" strokeWidth={2} />
          xero-sync.ts
        </span>
        <span className="mp-stack">
          {(Object.keys(TEAM) as Who[]).map((w) => (
            <Avatar key={w} who={w} />
          ))}
        </span>
      </div>
      <div className="code-body">
        {CODE.map((line, i) => {
          const toks = i === ADDED ? cut(line, typed) : line
          return (
            <p key={i} className="code-line" data-add={i === ADDED || undefined}>
              <span className="code-ln">{i === ADDED ? "+" : i + 12}</span>
              <span className="code-src">
                {toks.map(([c, text], j) => {
                  const john = i === johnLine && j === johnTok
                  return (
                    <span key={j} className={`tk-${c}${john ? " mp-sel" : ""}`}>
                      {text}
                      {john && (
                        <span className="mp-cursor" data-who="john">
                          <span className="mp-flag">{TEAM.john.name}</span>
                        </span>
                      )}
                    </span>
                  )
                })}
                {i === ADDED && christianHere && (
                  <span className="mp-cursor" data-who="christian">
                    <span className="mp-flag">{TEAM.christian.name}</span>
                  </span>
                )}
              </span>
            </p>
          )
        })}
      </div>
      <ul className="team-feed">
        {feed.map((e, i) => (
          <li key={`${e.cycle}-${e.at}`}>
            <Avatar who={e.who} size="xs" />
            <span className="team-x">
              <b>{TEAM[e.who].name}</b> {e.text}
            </span>
            <span className="team-t">{AGO[i]}</span>
          </li>
        ))}
      </ul>
      <p className="code-status" data-done={state === "live" || undefined}>
        {state === "live" ? (
          <>
            <Check className="size-3" strokeWidth={2.5} />
            Live for Brightwater · just now
          </>
        ) : state === "deploying" ? (
          <>
            <LoaderCircle className="term-spin size-3" strokeWidth={2.5} />
            Deploying…
          </>
        ) : (
          <>
            <span className="code-dot" />3 engineers online · Sydney
          </>
        )}
      </p>
    </div>
  )
}

/* ---------------------------------------------------------------- the cables */

type V = [number, number]
type Lane = { d: string; len: number; delay: number; dir: "in" | "out" }
type Plug = { x: number; y: number; vertical: boolean }
type Cable = { sheath: string; lanes: Lane[]; plugs: Plug[]; flashes: { x: number; y: number; delay: number }[] }

const CYCLE = 5 // seconds; a run takes its first 30%
const RUN = CYCLE * 0.3
const LANE = 2.5 // each lane sits this far either side of the cable's centre
const SAMPLES = 48 // points along each curve, for the lanes that follow it

const f = (n: number) => n.toFixed(1)

/**
 * A wire from a panel to the window: it leaves the panel along `ds`, arrives travelling along `de`, and sags by `sag`
 * px under its own weight; `give` is how far it bows out, as a share of the distance it spans. The sheath is the true
 * cubic; its two lanes are traced along the curve's normals.
 */
function wire(s: V, ds: V, e: V, de: V, sag: number, start: number, give = 0.45): Cable {
  const reach = Math.max(48, Math.hypot(e[0] - s[0], e[1] - s[1]) * give)
  const c1: V = [s[0] + ds[0] * reach, s[1] + ds[1] * reach + sag]
  const c2: V = [e[0] - de[0] * reach, e[1] - de[1] * reach + sag]
  const at = (t: number): V => {
    const u = 1 - t
    return [
      u * u * u * s[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * e[0],
      u * u * u * s[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * e[1],
    ]
  }
  const tangent = (t: number): V => {
    const u = 1 - t
    return [
      3 * u * u * (c1[0] - s[0]) + 6 * u * t * (c2[0] - c1[0]) + 3 * t * t * (e[0] - c2[0]),
      3 * u * u * (c1[1] - s[1]) + 6 * u * t * (c2[1] - c1[1]) + 3 * t * t * (e[1] - c2[1]),
    ]
  }
  const pts: V[] = []
  const normals: V[] = []
  for (let i = 0; i <= SAMPLES; i++) {
    const t = i / SAMPLES
    const [tx, ty] = tangent(t)
    const l = Math.hypot(tx, ty) || 1
    pts.push(at(t))
    normals.push([-ty / l, tx / l])
  }
  const lane = (o: number) => pts.map((p, i): V => [p[0] + normals[i][0] * o, p[1] + normals[i][1] * o])
  const poly = (ps: V[]) => `M ${ps.map((p) => `${f(p[0])} ${f(p[1])}`).join(" L ")}`
  const len = (ps: V[]) => ps.slice(1).reduce((n, p, i) => n + Math.hypot(p[0] - ps[i][0], p[1] - ps[i][1]), 0)
  const inner = lane(LANE)
  const outer = lane(-LANE).reverse()
  return {
    sheath: `M ${f(s[0])} ${f(s[1])} C ${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(e[0])} ${f(e[1])}`,
    lanes: [
      { d: poly(inner), len: len(inner), delay: start, dir: "in" },
      { d: poly(outer), len: len(outer), delay: start + CYCLE / 2, dir: "out" },
    ],
    plugs: [
      { x: e[0], y: e[1], vertical: Math.abs(de[0]) > 0.5 },
      { x: s[0], y: s[1], vertical: Math.abs(ds[0]) > 0.5 },
    ],
    flashes: [
      { x: e[0], y: e[1], delay: start + RUN },
      { x: s[0], y: s[1], delay: start + CYCLE / 2 + RUN },
    ],
  }
}

type Box = { l: number; t: number; r: number; b: number; w: number }

function wireUp(win: Box, c: Box, e: Box): Cable[] {
  const cx = (c.l + win.l) / 2 // the middle of the part of each panel that's outside the window
  const ex = (e.r + win.r) / 2
  return [
    // Claude: up out of its top and round into the window's left edge
    wire([cx, c.t], [0, -1], [win.l, c.t - 84], [1, 0], 14, 0),
    // ...and out of its side, hanging in a loop under the window and up into its base
    wire([c.r, (win.b + c.b) / 2], [1, 0], [win.l + win.w * 0.2, win.b], [0, -1], 46, 1.25),
    // the engineers: down out of the panel and round into the window's right edge
    wire([ex, e.b], [0, 1], [win.r, e.b + 84], [-1, 0], 22, 0.6),
    // ...and up, arching low over the window's top (so it stays clear of the heading) and down into it
    wire([ex, e.t], [0, -1], [win.r - win.w * 0.2, win.t], [0, 1], 10, 1.85, 0.2),
  ]
}

function Cables({ stage }: { stage: React.RefObject<HTMLDivElement | null> }) {
  const host = React.useRef<HTMLDivElement>(null)
  const [geo, setGeo] = React.useState<{ w: number; h: number; cables: Cable[] } | null>(null)

  React.useEffect(() => {
    const el = host.current
    const root = stage.current
    if (!el || !root) return
    const measure = () => {
      if (getComputedStyle(el).display === "none") return setGeo(null)
      const o = el.getBoundingClientRect()
      const box = (node: Element | null): Box | null => {
        if (!node) return null
        const r = node.getBoundingClientRect()
        return { l: r.left - o.left, t: r.top - o.top, r: r.right - o.left, b: r.bottom - o.top, w: r.width }
      }
      const win = box(root.querySelector(".film"))
      const c = box(root.querySelector(".term"))
      const e = box(root.querySelector(".code"))
      setGeo(win && c && e ? { w: o.width, h: o.height, cables: wireUp(win, c, e) } : null)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(root)
    root.querySelectorAll(".film, .side-panel").forEach((node) => ro.observe(node))
    return () => ro.disconnect()
  }, [stage])

  return (
    <div ref={host} className="cables" aria-hidden="true">
      {geo && (
        <svg width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`}>
          {geo.cables.map((c, i) => (
            <g key={i}>
              <path d={c.sheath} className="cb-rim" />
              <path d={c.sheath} className="cb-sheath" />
              {c.lanes.map((l) => (
                <path key={l.dir} d={l.d} className="cb-lane" />
              ))}
              {c.lanes.map((l) => (
                // every lane is 100 units long, so the keyframes run 0 to -100 on any of them; the light is ~26px
                <path
                  key={`${l.dir}-spark`}
                  d={l.d}
                  pathLength={100}
                  className={`cb-spark cb-${l.dir}`}
                  style={{
                    strokeDasharray: `${((Math.min(26, l.len * 0.4) / Math.max(1, l.len)) * 100).toFixed(2)} 1000`,
                    animationDelay: `${l.delay}s`,
                  }}
                />
              ))}
              {c.plugs.map((p, j) => (
                <rect
                  key={j}
                  x={p.x - (p.vertical ? 3 : 6)}
                  y={p.y - (p.vertical ? 6 : 3)}
                  width={p.vertical ? 6 : 12}
                  height={p.vertical ? 12 : 6}
                  rx="2"
                  className="cb-plug"
                />
              ))}
              {c.flashes.map((fl, j) => (
                <circle key={j} cx={fl.x} cy={fl.y} r="2.5" className="cb-flash" style={{ animationDelay: `${fl.delay}s` }} />
              ))}
            </g>
          ))}
        </svg>
      )}
    </div>
  )
}

/* ---------------------------------------------------------------- the player */

export function WorkingFilm() {
  const wrap = React.useRef<HTMLElement>(null)
  const stage = React.useRef<HTMLDivElement>(null)
  const video = React.useRef<HTMLVideoElement>(null)
  const still = useReducedMotion()
  const [onScreen, setOnScreen] = React.useState(false)
  const [tick, setTick] = React.useState(0)
  const running = onScreen && !still

  React.useEffect(() => {
    const el = wrap.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // the film autoplays from the HTML; this only holds it on the poster under reduced motion, and nudges it to play
  // if the browser held it back before the page was interactive
  React.useEffect(() => {
    const v = video.current
    if (!v) return
    if (still) v.pause()
    else if (v.paused) v.play().catch(() => {})
  }, [still])

  // the panels' clock runs only while the section is on screen
  React.useEffect(() => {
    if (!running) return
    const t = window.setInterval(() => setTick((n) => n + 1), TICK)
    return () => window.clearInterval(t)
  }, [running])

  return (
    <figure ref={wrap} className="film-wrap" data-paused={!running || undefined}>
      <div ref={stage} className="film-stage">
        <div className="film mac">
          <div className="mac-bar">
            <span className="mac-lights" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="mac-title film-title">
              <svg viewBox="9.17 10.06 20.34 28.28" width="10" height="14" aria-hidden="true">
                <path
                  fill="#fff"
                  d="M24.45,20.88c.75-1.07,1.2-2.36,1.2-3.77,0-3.6-2.9-6.51-6.49-6.55h0s-7.45,0-7.45,0c-1.13,0-2.04.91-2.04,2.04v16.19l8.99,9.05h.5s.51,0,.51,0c4.87,0,9.06-3.72,9.33-8.58.2-3.58-1.69-6.74-4.55-8.39Z"
                />
                <path fill="#3b82f6" d="M16.74,28.79h-7.07s8.99,9.05,8.99,9.05v-7.14c0-1.06-.86-1.92-1.92-1.92Z" />
              </svg>
              app.bgentic.io
            </span>
            <span className="mac-tag">Example</span>
          </div>
          <video
            ref={video}
            className="film-video"
            src={`${FILM}#t=${POSTER_AT}`}
            poster={POSTER}
            width={2070}
            height={1128}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label={demos.film}
          />
        </div>
        <Cables stage={stage} />
        <p className="sr-only">
          Bgentic runs on Claude, with a team of software engineers in Sydney building and running it.
        </p>
        <div className="sides" aria-hidden="true">
          <Claude tick={tick} still={still} />
          <Engineers tick={tick} still={still} />
        </div>
      </div>
      <figcaption className="scene-foot">
        <span className="scene-caption">{demos.caption}</span>
      </figcaption>
    </figure>
  )
}
