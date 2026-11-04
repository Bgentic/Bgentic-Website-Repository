"use client"
// The 21st.dev "cinematic" motion footer, for Bgentic. It sits fixed under the page and is revealed like a curtain
// as the last section scrolls away (a clip-path on its wrapper shows it only within the wrapper's box). A giant
// BGENTIC rises in behind, the heading and links rise in on the scroll (GSAP ScrollTrigger, scrubbed), the pills
// lean toward the pointer, and a tilted marquee of the services runs across the top.
//
// Changed from the original: Bgentic's words, links and legal line; the site's fonts (Inter, and Geist for display)
// instead of a third face from Google Fonts; dots in the brand's light blue instead of glyphs; a pulsing dot in place
// of the heart, and the developer's credit at the right of the bottom bar. The curtain only where the screen is tall
// and wide enough to hold the whole footer (elsewhere it sits in the flow); the marquee pauses under the pointer; and
// under reduced motion nothing moves: no scrubbed reveals, no magnetic pills, no marquee, no breathing light.
import * as React from "react"
import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUp, CalendarDays, LogIn, Rocket } from "lucide-react"
import { SERVICES } from "@/content/services"
import { CONTACT_EMAIL, LEGAL, LOGIN_HREF, ONBOARDING_HREF } from "@/content/site"
import { FINE_POINTER, REDUCED_MOTION } from "@/lib/media"
import { cn } from "@/lib/utils"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE INLINE STYLES
// -------------------------------------------------------------------------
const STYLES = `
.cinematic-footer-wrapper {
  font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;

  --pill-bg-1: color-mix(in oklch, var(--foreground) 3%, transparent);
  --pill-bg-2: color-mix(in oklch, var(--foreground) 1%, transparent);
  --pill-shadow: color-mix(in oklch, var(--background) 50%, transparent);
  --pill-highlight: color-mix(in oklch, var(--foreground) 10%, transparent);
  --pill-inset-shadow: color-mix(in oklch, var(--background) 80%, transparent);
  --pill-border: color-mix(in oklch, var(--foreground) 8%, transparent);

  --pill-bg-1-hover: color-mix(in oklch, var(--foreground) 8%, transparent);
  --pill-bg-2-hover: color-mix(in oklch, var(--foreground) 2%, transparent);
  --pill-border-hover: color-mix(in oklch, var(--foreground) 20%, transparent);
  --pill-shadow-hover: color-mix(in oklch, var(--background) 70%, transparent);
  --pill-highlight-hover: color-mix(in oklch, var(--foreground) 20%, transparent);
}

/* the curtain: only where the whole footer fits on one screen; elsewhere it sits in the flow */
.cinematic-curtain { position: relative; width: 100%; }
.cinematic-footer { position: relative; min-height: 100svh; }
@media (min-width: 768px) and (min-height: 700px) {
  .cinematic-curtain { height: 100vh; }
  .cinematic-footer { position: fixed; bottom: 0; left: 0; height: 100vh; min-height: 0; }
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-pulse {
  0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 color-mix(in oklch, var(--primary) 50%, transparent); }
  50% { transform: scale(1.15); box-shadow: 0 0 0 5px color-mix(in oklch, var(--primary) 0%, transparent); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 40s linear infinite;
}
.footer-marquee:hover .animate-footer-scroll-marquee {
  animation-play-state: paused;
}

.animate-footer-pulse {
  animation: footer-pulse 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

@media (prefers-reduced-motion: reduce) {
  .animate-footer-breathe,
  .animate-footer-scroll-marquee,
  .animate-footer-pulse {
    animation: none;
  }
  .animate-footer-breathe { transform: translate(-50%, -50%); }
}

/* Theme-adaptive Grid Background */
.footer-bg-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, color-mix(in oklch, var(--foreground) 3%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 3%, transparent) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

/* Theme-adaptive Aurora Glow */
.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%,
    color-mix(in oklch, var(--primary) 15%, transparent) 0%,
    color-mix(in oklch, var(--secondary) 15%, transparent) 40%,
    transparent 70%
  );
}

/* Glass Pill Theming */
.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow:
      0 10px 30px -10px var(--pill-shadow),
      inset 0 1px 1px var(--pill-highlight),
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow:
      0 20px 40px -10px var(--pill-shadow-hover),
      inset 0 1px 1px var(--pill-highlight-hover);
  color: var(--foreground);
}
.footer-glass-pill:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 3px;
}

/* Giant Background Text Masking */
.footer-giant-bg-text {
  font-family: var(--font-geist), var(--font-inter), sans-serif;
  font-size: 22vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in oklch, var(--foreground) 5%, transparent);
  background: linear-gradient(180deg, color-mix(in oklch, var(--foreground) 10%, transparent) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}

/* Metallic Text Glow */
.footer-text-glow {
  font-family: var(--font-geist), var(--font-inter), sans-serif;
  background: linear-gradient(180deg, var(--foreground) 0%, color-mix(in oklch, var(--foreground) 40%, transparent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 20px color-mix(in oklch, var(--foreground) 15%, transparent));
}
`

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType
  }

/** leans toward the pointer and springs back when it leaves; still on touch screens and under reduced motion */
function MagneticButton({ className, children, as: Component = "button", ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || !matchMedia(FINE_POINTER).matches || matchMedia(REDUCED_MOTION).matches) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      gsap.to(element, {
        x: x * 0.4,
        y: y * 0.4,
        rotationX: -y * 0.15,
        rotationY: x * 0.15,
        scale: 1.05,
        ease: "power2.out",
        duration: 0.4,
      })
    }
    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        ease: "elastic.out(1, 0.3)",
        duration: 1.2,
      })
    }

    element.addEventListener("mousemove", handleMouseMove)
    element.addEventListener("mouseleave", handleMouseLeave)
    return () => {
      element.removeEventListener("mousemove", handleMouseMove)
      element.removeEventListener("mouseleave", handleMouseLeave)
      gsap.killTweensOf(element)
      gsap.set(element, { clearProps: "transform" })
    }
  }, [])

  return (
    <Component ref={ref} className={cn("cursor-pointer", className)} {...props}>
      {children}
    </Component>
  )
}

// -------------------------------------------------------------------------
// 3. MAIN COMPONENT
// -------------------------------------------------------------------------
const MARQUEE = ["AI built systems, managed", ...SERVICES.map((s) => s.name), "Built and run in Sydney"]

const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    {MARQUEE.map((word, i) => (
      <React.Fragment key={word}>
        <span>{word}</span>
        <span className={cn("size-1.5 rounded-full", i % 2 ? "bg-secondary-foreground/40" : "bg-primary/70")} />
      </React.Fragment>
    ))}
  </div>
)

const PILL = "footer-glass-pill rounded-full text-muted-foreground font-medium text-xs md:text-sm hover:text-foreground"

const DEVELOPER = { name: "Christian Padilla", href: "https://christianpadilla.online" }

export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const giantTextRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!wrapperRef.current || matchMedia(REDUCED_MOTION).matches) return

    const ctx = gsap.context(() => {
      // the giant word rises and grows in behind
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.8, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1,
          },
        },
      )

      // the heading, then the links, rise in
      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 40%",
            end: "bottom bottom",
            scrub: 1,
          },
        },
      )
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: matchMedia(REDUCED_MOTION).matches ? "auto" : "smooth" })
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* The curtain: in the flow, clipped to its own box, so the fixed footer inside shows only through it. */}
      <div ref={wrapperRef} className="cinematic-curtain" style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}>
        <footer className="cinematic-footer cinematic-footer-wrapper flex w-full flex-col justify-between overflow-hidden bg-background text-foreground">
          {/* Ambient Light & Grid Background */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[80px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Giant background text */}
          <div
            ref={giantTextRef}
            aria-hidden="true"
            className="footer-giant-bg-text absolute -bottom-[5vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none"
          >
            BGENTIC
          </div>

          {/* 1. Diagonal marquee of the services (the same names are links below, so it's hidden from screen readers) */}
          <div
            aria-hidden="true"
            className="footer-marquee absolute top-24 md:top-28 left-0 w-full overflow-hidden border-y border-border/50 bg-background/60 backdrop-blur-md py-4 z-10 -rotate-2 scale-110 shadow-2xl"
          >
            <div className="flex w-max animate-footer-scroll-marquee text-xs md:text-sm font-bold tracking-[0.3em] text-muted-foreground uppercase">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* 2. Main Center Content */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mt-48 mb-10 md:mt-32 md:mb-0 w-full max-w-5xl mx-auto">
            <h2 ref={headingRef} className="text-5xl md:text-8xl font-black footer-text-glow tracking-tighter mb-12 text-center">
              Get your hours back.
            </h2>

            <nav ref={linksRef} aria-label="Footer" className="flex flex-col items-center gap-6 w-full">
              {/* the two ways to start */}
              <div className="flex flex-wrap justify-center gap-4 w-full">
                <MagneticButton
                  as={Link}
                  href="/contact"
                  className="footer-glass-pill px-10 py-5 rounded-full text-foreground font-bold text-sm md:text-base flex items-center gap-3 group"
                >
                  <CalendarDays className="w-6 h-6 text-primary transition-colors" aria-hidden="true" />
                  Book a discovery call
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href={ONBOARDING_HREF}
                  className="footer-glass-pill px-10 py-5 rounded-full text-foreground font-bold text-sm md:text-base flex items-center gap-3 group"
                >
                  <Rocket className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" aria-hidden="true" />
                  Start a free trial
                </MagneticButton>
              </div>

              {/* the six services */}
              <ul className="flex flex-wrap justify-center gap-3 md:gap-4 w-full mt-2">
                {SERVICES.map((s) => (
                  <li key={s.slug}>
                    <MagneticButton as={Link} href={`/services/${s.slug}`} className={cn(PILL, "inline-block px-6 py-3")}>
                      {s.name}
                    </MagneticButton>
                  </li>
                ))}
              </ul>

              {/* the rest of the site, the inbox, the app and the legal pages */}
              <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs md:text-sm text-muted-foreground">
                <li>
                  <Link href="/clients" className="transition-colors hover:text-foreground">
                    Clients
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="transition-colors hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-foreground">
                    {CONTACT_EMAIL}
                  </a>
                </li>
                <li>
                  <a href={LOGIN_HREF} className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
                    <LogIn className="size-3.5" aria-hidden="true" />
                    Log in
                  </a>
                </li>
                <li>
                  <a href={LEGAL.terms} className="transition-colors hover:text-foreground">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href={LEGAL.privacy} className="transition-colors hover:text-foreground">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* 3. Bottom Bar */}
          {/* three columns from 768px, so the badge sits truly centred: the company on the left, the developer's
              credit and back to top on the right */}
          <div className="relative z-20 w-full pb-8 px-6 md:px-12 flex flex-col items-center gap-6 md:grid md:grid-cols-[1fr_auto_1fr]">
            <p className="order-2 md:order-1 md:justify-self-start text-muted-foreground text-[10px] md:text-xs font-semibold tracking-widest uppercase text-center md:text-left tabular-nums">
              © {LEGAL.name} · ACN {LEGAL.acn} · ABN {LEGAL.abn}
            </p>

            <div className="footer-glass-pill px-6 py-3 rounded-full flex items-center gap-2.5 order-1 md:order-2 cursor-default border-border/50">
              <span className="animate-footer-pulse size-2 rounded-full bg-primary" aria-hidden="true" />
              <span className="text-muted-foreground text-[10px] md:text-xs font-bold uppercase tracking-widest">Built and run in</span>
              <span className="text-foreground font-black text-xs md:text-sm tracking-normal">{LEGAL.city}</span>
            </div>

            <div className="order-3 md:justify-self-end flex items-center gap-5">
              {/* the developer's credit: his monogram and his name, to his portfolio */}
              <a
                href={DEVELOPER.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/credit inline-flex items-center gap-2 text-[11px] md:text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <Image
                  src="/brand/cp-logo.webp"
                  alt=""
                  width={114}
                  height={96}
                  className="h-5 w-auto opacity-80 transition-opacity group-hover/credit:opacity-100"
                />
                <span>
                  Designed &amp; developed by{" "}
                  <span className="font-semibold text-foreground underline-offset-4 group-hover/credit:underline">
                    {DEVELOPER.name}
                  </span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </span>
              </a>
              <MagneticButton
                as="button"
                type="button"
                onClick={scrollToTop}
                aria-label="Back to top"
                className="w-12 h-12 shrink-0 rounded-full footer-glass-pill flex items-center justify-center text-muted-foreground hover:text-foreground group"
              >
                <ArrowUp className="w-5 h-5 transform group-hover:-translate-y-1.5 transition-transform duration-300" aria-hidden="true" />
              </MagneticButton>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
