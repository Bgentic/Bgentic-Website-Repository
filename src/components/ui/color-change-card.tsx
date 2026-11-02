"use client"
// Colour-change cards, after 21st.dev's hover-reveal "ColorChangeCards", rebuilt for Bgentic. At rest a card shows a
// problem over a photograph of it, a person in the middle of it. Turned on (mouse hover, keyboard focus, or a tap on
// touch) a second image, the solution, cross-fades in, the headline rolls letter by letter from the problem to the
// solution, the text cross-fades, and the arrow turns. Purely a visual reveal: the cards don't link anywhere.
//
// From the original: the letter roll (now between two different headlines) and the image that changes on hover (now
// two images). Changed: react-icons -> lucide, slate -> Bgentic tokens, Geist and Inter, keyboard and touch states,
// screen-reader text, and reduced motion. Styles: the cards section of styles/depth.css.
import * as React from "react"
import Image, { type ImageLoader } from "next/image"
import { MotionConfig, motion, stagger, type Variants } from "framer-motion"
import { ArrowRight, Check } from "lucide-react"

type Face = { heading: string; text: string }

export type ColorChangeCardProps = {
  /** shown as 01, 02… on the card */
  index: number
  /** the problem's image at rest and the solution's when turned: Unsplash URLs or files in /public; decorative */
  images: { problem: string; solution: string }
  problem: Face
  solution: Face
}

// Unsplash photographs are sized by Unsplash's own image CDN (an imgix endpoint); files in /public go through Next's.
const unsplash: ImageLoader = ({ src, width, quality }) =>
  `${src}?auto=format&fit=crop&w=${width}&q=${quality ?? 70}`
const loaderFor = (src: string) => (src.startsWith("https://images.unsplash.com/") ? unsplash : undefined)
const SIZES = "(min-width: 768px) 36rem, 100vw"

const EASE_OUT = [0.23, 1, 0.32, 1] as const

// The headline: the problem's letters roll up and out while the solution's roll up into place, one after another.
const headline: Variants = {
  rest: { transition: { delayChildren: stagger(0.008, { from: "last" }) } },
  turned: { transition: { delayChildren: stagger(0.012, { startDelay: 0.02 }) } },
}
const leaving: Variants = {
  rest: { y: "0%", transition: { duration: 0.42, ease: EASE_OUT } },
  turned: { y: "-110%", transition: { duration: 0.5, ease: EASE_OUT } },
}
const arriving: Variants = {
  rest: { y: "110%", transition: { duration: 0.42, ease: EASE_OUT } },
  turned: { y: "0%", transition: { duration: 0.55, ease: EASE_OUT } },
}

// The supporting text and labels cross-fade with a touch of blur, so the swap reads as one surface changing.
const fadeOut: Variants = {
  rest: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.35, ease: EASE_OUT, delay: 0.1 } },
  turned: { opacity: 0, y: -6, filter: "blur(4px)", transition: { duration: 0.25, ease: EASE_OUT } },
}
const fadeIn: Variants = {
  rest: { opacity: 0, y: 6, filter: "blur(4px)", transition: { duration: 0.2, ease: EASE_OUT } },
  turned: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.45, ease: EASE_OUT, delay: 0.14 } },
}

/** a line split into letters for the roll; words stay whole so lines wrap between words */
function Letters({ text, variants }: { text: string; variants: Variants }) {
  const words = text.split(" ")
  return words.map((word, w) => (
    <React.Fragment key={w}>
      <span className="cc-word">
        {Array.from(word).map((ch, i) => (
          <span key={i} className="cc-letter">
            <motion.span className="cc-glyph" variants={variants}>
              {ch}
            </motion.span>
          </span>
        ))}
      </span>
      {w < words.length - 1 && " "}
    </React.Fragment>
  ))
}

export function ColorChangeCard({ index, images, problem, solution }: ColorChangeCardProps) {
  const [turned, setTurned] = React.useState(false)
  const num = String(index).padStart(2, "0")

  return (
    // turned by a mouse hovering, by keyboard focus, or by a tap on touch (a tap toggles it); nothing navigates
    <motion.article
      className="cc-card"
      tabIndex={0}
      data-turned={turned || undefined}
      initial={false}
      animate={turned ? "turned" : "rest"}
      onPointerEnter={(e) => e.pointerType === "mouse" && setTurned(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setTurned(false)}
      onPointerUp={(e) => e.pointerType !== "mouse" && setTurned((t) => !t)}
      onFocus={(e) => e.currentTarget.matches(":focus-visible") && setTurned(true)}
      onBlur={() => setTurned(false)}
    >
      <div className="cc-media" aria-hidden="true">
        <div className="cc-photo cc-photo-problem">
          <Image loader={loaderFor(images.problem)} src={images.problem} alt="" fill sizes={SIZES} />
        </div>
        <div className="cc-photo cc-photo-solution">
          <Image loader={loaderFor(images.solution)} src={images.solution} alt="" fill sizes={SIZES} />
        </div>
      </div>
      <div className="cc-scrim" aria-hidden="true" />

      {/* what a sighted visitor sees; screen readers get the plain version below */}
      <div className="cc-body" aria-hidden="true">
        <div className="cc-top">
          <span className="cc-swap">
            <motion.span className="cc-label" variants={fadeOut}>
              <span className="cc-num">{num}</span>
              The leak
            </motion.span>
            <motion.span className="cc-label cc-label-on" variants={fadeIn}>
              <Check className="size-3.5" strokeWidth={2.25} />
              With Bgentic
            </motion.span>
          </span>
          <span className="cc-arrow">
            <ArrowRight className="size-4" strokeWidth={2} />
          </span>
        </div>
        <div>
          <motion.p className="cc-heading" variants={headline}>
            <span className="cc-line">
              <Letters text={problem.heading} variants={leaving} />
            </span>
            <span className="cc-line">
              <Letters text={solution.heading} variants={arriving} />
            </span>
          </motion.p>
          <div className="cc-swap mt-3">
            <motion.p className="cc-text" variants={fadeOut}>
              {problem.text}
            </motion.p>
            <motion.p className="cc-text cc-text-on" variants={fadeIn}>
              {solution.text}
            </motion.p>
          </div>
        </div>
      </div>

      <div className="sr-only">
        <h3>{problem.heading}</h3>
        <p>{problem.text}</p>
        <p>
          With Bgentic: {solution.heading} {solution.text}
        </p>
      </div>
    </motion.article>
  )
}

/** the grid the cards sit in; also where motion learns to respect reduced-motion settings */
export function ColorChangeCards({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ul className="cc-grid">{children}</ul>
    </MotionConfig>
  )
}
