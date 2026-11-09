"use client"

import * as React from "react"
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion"
import { PHONE } from "@/lib/media"
import { useReducedMotion } from "@/lib/use-reduced-motion"

// 21st.dev container-scroll-animation (Aceternity), made bolder: the window starts lying back 45° and lifts upright
// as the section scrolls, hinged at its bottom edge like a laptop lid opening, its top edge cutting across the
// headline's last line all the way up. It lands flat just as the headline and the window reach their place on screen;
// then, on desktop, the two hold there together (a short sticky pin) while the headline lifts clear of the window,
// so the whole sentence reads beside the flat app for a moment before both scroll on. The lift eases in and out along
// the scroll (it starts gently and settles flat gently rather than stopping dead), and a quick, critically damped spring
// rounds off the steps of a mouse wheel without trailing the page. While it tilts, the window has its own compositor
// layer, so a scroll frame only moves it and never repaints it; a moment after it lands flat it gives the layer up, so
// the flat app is drawn crisp. Phones and tablets get the same lift without the hold; reduced motion shows it settled.
//
// Changed from the original: real props (it passed "{titleComponent}" and "{translate}" as string literals), a glass
// bezel (styles/depth.css .cs-frame), the screen keeps its content's aspect, the hold and the spring, the hinge at the
// bottom, one transform string (none once flat, so text stays crisp), and an optional overlay that floats at the
// window's lower right and rises on its own, nearer path. The overlap: the window's slot is pulled up under the title
// by md:-mt-44 (176px), a shift keeps the tilted window's visible top edge through the middle of the title's last
// line (shiftAt, below), and the title climbs in step with that edge, so they overlap by half a line all the way up.
const PIN = "(min-width: 1024px) and (hover: hover) and (prefers-reduced-motion: no-preference)"
const NAV = 88 // the floating header and its gap
const TOP = 8 // from the header to the headline while it holds
const GAP = 12 // from the headline to the window once the headline has lifted clear
const BOTTOM = 16 // under the window while it holds
const HOLD = 300 // px of scroll the pair holds for: the headline lifts clear over the first CLEAR, then it rests
const CLEAR = 110
const SETTLE = 0.15 // without the hold, where the headline lands: this share of the screen lower, so it's on screen a while
const TILT = 45
const PERSPECTIVE = 1100
const BEZEL = 28 // the frame's padding, both sides (md:p-3.5)
const WIDEST = 1152 // 72rem
const ASPECT = 1.6 // the app is drawn at 1600 x 1000

function subscribe(query: string) {
  return (onChange: () => void) => {
    const q = window.matchMedia(query)
    q.addEventListener("change", onChange)
    return () => q.removeEventListener("change", onChange)
  }
}
function useMedia(query: string) {
  return React.useSyncExternalStore(
    React.useMemo(() => subscribe(query), [query]),
    () => window.matchMedia(query).matches,
    () => false,
  )
}

const clamp = (v: number) => Math.min(1, Math.max(0, v))
/** ease in and out (smoothstep): no jolt as the lift begins, and a soft landing as the window comes flat */
const easeInOut = (v: number) => v * v * (3 - 2 * v)
/** responsive with no overshoot: critically damped, trailing the scroll by under a tenth of a second and settling in
 * about 0.15 s (the original 170 / 34 / 0.6 was overdamped, trailing by 0.2 s and drifting on for over half a second) */
const SPRING = { stiffness: 900, damping: 60, mass: 1, restDelta: 0.0005 }
/** how long the window keeps its own layer after landing flat, so a scroll that pauses there doesn't repaint it */
const LAYER_GRACE = 250

/**
 * True from the moment the window first lands flat on screen (or, under reduced motion, first comes into view), and
 * true from then on. What's in the window reads it to cue that it can be used now.
 */
const Landed = React.createContext(false)
export const useLanded = () => React.useContext(Landed)
const easeOut = (v: number) => 1 - (1 - v) ** 3

/**
 * Measured from layout (offset*), so the transforms never skew it. h: the window's height. reach: how far below the
 * slot's top the window's visible top edge sits at the start, through the middle of the headline's last line. clear:
 * how far the headline lifts once the window is flat, to sit GAP above it. stick: where the pair's top (the
 * headline's place in the layout) is when the window lands flat. start: the scroll, from the headline entering the
 * bottom of the screen, at which the window's edge does too. track, vh: the scroll range's length. maxW: the window's
 * widest while it holds, so the headline and the flat window fit on screen together.
 */
type Geo = { h: number; reach: number; clear: number; stick: number; start: number; track: number; vh: number; maxW: number | null }

export function ContainerScroll({
  titleComponent,
  overlay,
  children,
}: {
  titleComponent: React.ReactNode
  /** a second, nearer window at the lower right, over the screen; in the flow beneath it on phones */
  overlay?: React.ReactNode
  children: React.ReactNode
}) {
  const head = React.useRef<HTMLDivElement>(null)
  const track = React.useRef<HTMLDivElement>(null)
  const slot = React.useRef<HTMLDivElement>(null)
  const card = React.useRef<HTMLDivElement>(null)
  const pinned = useMedia(PIN)
  const phone = useMedia(PHONE)
  const still = useReducedMotion()
  const hold = pinned && !still

  const [geo, setGeo] = React.useState<Geo>({ h: 0, reach: 0, clear: 0, stick: 400, start: 0, track: 1, vh: 900, maxW: null })
  const geoRef = React.useRef(geo)
  React.useEffect(() => {
    const measure = () => {
      const hd = head.current
      const sl = slot.current
      const c = card.current
      const t = track.current
      if (!hd || !sl || !c || !t) return
      const vh = window.innerHeight
      const H = hd.offsetHeight
      const line = hd.firstElementChild ? parseFloat(getComputedStyle(hd.firstElementChild).lineHeight) || 0 : 0
      const under = sl.offsetTop // the slot's top, from the headline's (negative margin: it's tucked under it)
      const reach = Math.max(0, H - line * 0.55 - under)
      const clear = Math.max(0, H - under - reach) + GAP
      const stick = NAV + TOP + reach + clear + (hold ? 0 : SETTLE * vh)
      const fit = (vh - (stick + under) - BOTTOM - BEZEL) * ASPECT + BEZEL
      const next: Geo = {
        h: c.offsetHeight,
        reach,
        clear,
        stick,
        start: Math.max(0, H - line * 0.55),
        track: t.offsetHeight,
        vh,
        maxW: hold ? Math.round(Math.min(WIDEST, Math.max(560, fit))) : null,
      }
      geoRef.current = next
      setGeo(next)
    }
    measure()
    const ro = new ResizeObserver(measure)
    for (const el of [head.current, card.current, track.current]) if (el) ro.observe(el)
    window.addEventListener("resize", measure)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [hold])

  // from the pair's top at the bottom of the screen to its end at the top: track + vh px of scroll
  const { scrollYProgress } = useScroll({ target: track, offset: ["start end", "end start"] })
  const progress = useSpring(scrollYProgress, SPRING)

  const scrolled = (q: number) => q * (geoRef.current.track + geoRef.current.vh)
  // the lift: from the window's edge entering the screen to the pair reaching its place, eased in and out (everything
  // below reads it, so the headline still climbs in step with the window's edge)
  const riseAt = (q: number) => {
    const { vh, stick, start } = geoRef.current
    return easeInOut(clamp((scrolled(q) - start) / Math.max(1, vh - stick - start)))
  }
  // the headline lifting clear of the flat window: over the start of the hold, or (no hold) the end of the lift
  const clearAt = (q: number) => {
    const { vh, stick } = geoRef.current
    return easeOut(hold ? clamp((scrolled(q) - (vh - stick)) / CLEAR) : clamp((riseAt(q) - 0.8) / 0.2))
  }
  const tiltAt = (q: number) => TILT * (1 - riseAt(q))
  const scaleAt = (q: number) => 0.9 + 0.1 * riseAt(q)

  // Lying back on its bottom hinge, the window's visible top edge drops far below its slot (at 45° it's a little over
  // half its height). This shift lifts the whole window so that edge cuts through the headline's last line, as in
  // Aceternity's original, and climbs with the headline as it rises; once it's flat there's no shift at all. The
  // visible height is the projection of the tilted, scaled window through the perspective, whose vanishing point is
  // the hinge.
  const shiftAt = (q: number) => {
    const { h, reach } = geoRef.current
    if (!h) return 0
    const r = (tiltAt(q) * Math.PI) / 180
    const s = scaleAt(q)
    const seen = (s * h * Math.cos(r) * PERSPECTIVE) / (PERSPECTIVE + s * h * Math.sin(r))
    return reach * (1 - riseAt(q)) - (h - seen)
  }

  const transform = useTransform(progress, (q) => {
    const r = tiltAt(q)
    const s = scaleAt(q)
    const dy = shiftAt(q)
    return r < 0.05 && s > 0.9995 && Math.abs(dy) < 0.5
      ? "none"
      : `translateY(${dy.toFixed(1)}px) perspective(${PERSPECTIVE}px) rotateX(${r.toFixed(2)}deg) scale(${s.toFixed(4)})`
  })
  // the headline climbs exactly as far as the window's visible top edge does, so the two overlap by the same half
  // line all the way up; once the window is flat it lifts clear by that half line and a gap
  const translate = useTransform(progress, (q) => {
    const { reach, clear } = geoRef.current
    return -(reach * riseAt(q) + clear * clearAt(q))
  })
  // the overlay rides with the window's hinge, rising on its own nearer path as it goes
  const lift = useTransform(progress, (q) => (1 - riseAt(q)) * (phone ? 32 : 140) + shiftAt(q))

  // the window's own layer: on while it tilts, off a moment after it's flat (set on the element, not through React,
  // so it costs no render)
  React.useEffect(() => {
    if (still) return
    let timer = 0
    const set = (v: string) => {
      const c = card.current
      if (c && c.style.willChange !== v) c.style.willChange = v
    }
    const follow = (t: string) => {
      window.clearTimeout(timer)
      if (t === "none") timer = window.setTimeout(() => set("auto"), LAYER_GRACE)
      else set("transform")
    }
    follow(transform.get())
    const off = transform.on("change", follow)
    return () => {
      off()
      window.clearTimeout(timer)
      // give the layer back: under reduced motion this runs once before the preference is read, and the still window
      // must not keep a layer it never moves on
      set("auto")
    }
  }, [transform, still])

  // landed: the tilt has all but gone and the lift is done, so the window is flat and in its place on screen
  const [landed, setLanded] = React.useState(false)
  useMotionValueEvent(progress, "change", (q) => {
    if (!landed && !still && riseAt(q) >= 1 && tiltAt(q) < 0.3) setLanded(true)
  })
  React.useEffect(() => {
    const c = card.current
    if (!still || landed || !c) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setLanded(true), { threshold: 0.6 })
    io.observe(c)
    return () => io.disconnect()
  }, [still, landed])

  return (
    <Landed.Provider value={landed}>
      <div className="relative pt-16 md:pt-40">
        <div ref={track} className="relative">
          {/* the headline and the window hold together; under reduced motion everything is set settled explicitly */}
          <div className="relative" style={hold ? { position: "sticky", top: geo.stick } : undefined}>
            <Header ref={head} translate={still ? -(geo.reach + geo.clear) : translate} titleComponent={titleComponent} />
            <div ref={slot} className="relative z-10 -mt-16 md:-mt-44">
              <Card ref={card} transform={still ? undefined : transform} maxWidth={geo.maxW ?? undefined}>
                {children}
              </Card>
              {overlay && (
                <motion.div
                  style={{ y: still ? 0 : lift }}
                  className="relative z-20 mx-auto -mt-10 w-full max-w-[22rem] md:absolute md:right-4 md:-bottom-16 md:mt-0 md:w-[20rem] md:max-w-none xl:-right-16 xl:-bottom-24 xl:w-[21rem] 2xl:-right-24"
                >
                  {overlay}
                </motion.div>
              )}
            </div>
          </div>
          {hold && <div aria-hidden="true" style={{ height: HOLD }} />}
        </div>
      </div>
    </Landed.Provider>
  )
}

export function Header({
  ref,
  translate,
  titleComponent,
}: {
  ref?: React.Ref<HTMLDivElement>
  translate?: MotionValue<number> | number
  titleComponent: React.ReactNode
}) {
  return (
    <motion.div ref={ref} style={{ translateY: translate }} className="relative z-0 mx-auto max-w-6xl text-center">
      {titleComponent}
    </motion.div>
  )
}

export function Card({
  ref,
  transform,
  maxWidth,
  children,
}: {
  ref?: React.Ref<HTMLDivElement>
  transform?: MotionValue<string>
  /** while the window holds on desktop, its widest; the CSS cap on .cs-frame stands in until it's measured */
  maxWidth?: number
  children: React.ReactNode
}) {
  return (
    <motion.div
      ref={ref}
      style={{ ...(transform ? { transform, transformOrigin: "50% 100%" } : { transform: "none" }), maxWidth }}
      className="cs-frame mx-auto w-full p-2 md:p-3.5"
    >
      <div className="cs-screen">{children}</div>
    </motion.div>
  )
}
