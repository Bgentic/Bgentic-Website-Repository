"use client"

import * as React from "react"
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"
import { PHONE } from "@/lib/media"
import { useReducedMotion } from "@/lib/use-reduced-motion"

// 21st.dev container-scroll-animation (Aceternity): a window that leans back 40° and swings up flat as the section
// scrolls, rising over the bottom of its title while the title climbs clear of it. Changed: real props (the original
// passed "{titleComponent}" and "{translate}" as string literals), the grey plastic bezel is Bgentic glass
// (styles/depth.css .cs-frame), the screen keeps its image's aspect instead of a fixed height, the scroll is measured
// on the window's own slot so the swing plays out in view, the perspective lives on the window itself so the title
// and the floating overlay stay flat layers either side of it, an optional overlay floats at the window's lower
// right and rises on its own, nearer, path, phones come from a media query, and reduced motion shows it settled.
//
// The overlap is arithmetic: the window's slot is pulled up under the title by `md:-mt-44` (176px) and the title
// climbs 210px over the scroll, so the window covers the title's last line while it leans and the title has cleared
// it by the time it's flat. Phones: 64px and 88px. The top padding gives the title room to climb before it meets the
// section above.
function subscribe(onChange: () => void) {
  const q = window.matchMedia(PHONE)
  q.addEventListener("change", onChange)
  return () => q.removeEventListener("change", onChange)
}

function usePhone() {
  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(PHONE).matches,
    () => false,
  )
}

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
  // the window's slot, never transformed, so the measured box is the settled one
  const slotRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: slotRef, offset: ["start end", "center center"] })
  const phone = usePhone()
  const still = useReducedMotion()

  const rotate = useTransform(scrollYProgress, [0, 1], [40, 0])
  const scale = useTransform(scrollYProgress, [0, 1], phone ? [0.9, 1] : [1.05, 1])
  const translate = useTransform(scrollYProgress, [0, 1], [0, phone ? -88 : -210])
  const lift = useTransform(scrollYProgress, [0, 1], [phone ? 32 : 120, 0])

  return (
    <div className="relative pt-16 md:pt-40">
      <Header translate={still ? undefined : translate} titleComponent={titleComponent} />
      <div className="relative z-10 -mt-16 md:-mt-44">
        <div ref={slotRef}>
          <Card rotate={still ? undefined : rotate} scale={still ? undefined : scale}>
            {children}
          </Card>
        </div>
        {overlay && (
          <motion.div
            style={{ y: still ? undefined : lift }}
            className="relative z-20 mx-auto -mt-10 w-full max-w-[22rem] md:absolute md:right-4 md:-bottom-16 md:mt-0 md:w-[20rem] md:max-w-none xl:-right-16 xl:-bottom-24 xl:w-[21rem] 2xl:-right-24"
          >
            {overlay}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export function Header({
  translate,
  titleComponent,
}: {
  translate?: MotionValue<number>
  titleComponent: React.ReactNode
}) {
  return (
    <motion.div style={{ translateY: translate }} className="relative z-0 mx-auto max-w-6xl text-center">
      {titleComponent}
    </motion.div>
  )
}

export function Card({
  rotate,
  scale,
  children,
}: {
  rotate?: MotionValue<number>
  scale?: MotionValue<number>
  children: React.ReactNode
}) {
  return (
    <motion.div
      style={rotate ? { rotateX: rotate, scale, transformPerspective: 1000 } : undefined}
      className="cs-frame mx-auto w-full max-w-6xl p-2 md:p-3.5"
    >
      <div className="cs-screen">{children}</div>
    </motion.div>
  )
}
