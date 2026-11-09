"use client"
// The navigation: a floating glass pill. Two layers sit behind the items: a frosted capsule on the page you're on, and a
// fainter highlight that follows the pointer. Clicking an item sends the capsule gliding to it at once, before the new
// page has arrived (the page then lifts in: app/template.tsx), and an item gives a little under the press. Every item is
// a plain link (Services goes straight to the one /services page, no menu); on phones the pill opens a glass sheet.
// The page's one filled action belongs to the content, so "Book a call" here stays outlined.
import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { buttonVariants } from "@/components/ui/button-variants"
import { BOOK_CALL_HREF, LOGIN_HREF, NAV } from "@/content/site"
import { REDUCED_MOTION } from "@/lib/media"
import { farDown, scrollToTop } from "@/lib/scroll-to-top"
import { cn } from "@/lib/utils"

/** the capsule's glide: the site's settle spring (tokens.css), read once; a plain strong ease-out where linear() isn't supported */
let settle: string | null = null
const SETTLE_FALLBACK = "cubic-bezier(0.23, 1, 0.32, 1)"
const GLIDE_MS = 340

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = React.useState(false)
  const [sheet, setSheet] = React.useState(false)
  const [hl, setHl] = React.useState({ x: 0, w: 0, on: false, instant: true })
  const listRef = React.useRef<HTMLUListElement>(null)
  const itemRefs = React.useRef(new Map<string, HTMLAnchorElement>())
  const sheetId = React.useId()
  // the item just clicked, ahead of its page arriving, so the capsule moves the moment you click
  const [target, setTarget] = React.useState<string | null>(null)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // close the sheet on navigation
  const [lastPath, setLastPath] = React.useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setSheet(false)
    // the click is answered once its own page is the one that arrived (a page passed through on the way, after a
    // second click, leaves the capsule heading for the latest)
    if (target && (pathname === target || pathname.startsWith(target + "/"))) setTarget(null)
  }

  React.useEffect(() => {
    if (!sheet) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSheet(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [sheet])

  // the gliding highlight: measured from the hovered item, positioned on the first hover without a slide
  const glideTo = (el: HTMLElement) => {
    const list = listRef.current
    if (!list) return
    const a = el.getBoundingClientRect()
    const b = list.getBoundingClientRect()
    setHl((h) => ({ x: a.left - b.left, w: a.width, on: true, instant: !h.on }))
  }
  React.useEffect(() => {
    if (!hl.instant || !hl.on) return
    const id = requestAnimationFrame(() => setHl((h) => ({ ...h, instant: false })))
    return () => cancelAnimationFrame(id)
  }, [hl.instant, hl.on])

  const current = (href: string) => (pathname === href || pathname.startsWith(href + "/") ? "page" : undefined)

  // The capsule: on the clicked item while its page is on the way, then on the current page's item; on the home page
  // there's none, so it fades away where it was. It's moved by hand rather than through React state: its glide is a
  // compositor animation of transform alone (the new width is set at once, and a scaleX carries it from the old width,
  // FLIP-style), so it stays smooth while the next page is being built on the main thread. Its first placing is still,
  // so nothing moves as a page loads; arriving from nowhere it fades and grows in where it lands (CSS); between items it
  // glides, and a second click mid-glide carries on from wherever it is on screen.
  const activeHref = target ?? NAV.find((item) => current(item.href))?.href ?? null
  const selRef = React.useRef<HTMLSpanElement>(null)
  const placed = React.useRef<{ x: number; w: number; on: boolean } | null>(null)
  const slide = React.useRef<Animation | null>(null)
  React.useLayoutEffect(() => {
    const cap = selRef.current
    const list = listRef.current
    if (!cap || !list) return
    const place = (glide: boolean) => {
      const was = placed.current
      const el = activeHref ? itemRefs.current.get(activeHref) : undefined
      if (!el) {
        if (was?.on) cap.removeAttribute("data-on")
        placed.current = was ? { ...was, on: false } : { x: 0, w: 0, on: false }
        return
      }
      const x = el.offsetLeft
      const w = el.offsetWidth
      if (was?.on && was.x === x && was.w === w) return
      // where it shows now: at rest, or part way through a glide
      let fromX = was?.x ?? x
      let fromW = was?.w ?? w
      if (was?.on && slide.current) {
        // the transform scales about the capsule's centre, so its left edge sits half the lost width further in
        const m = new DOMMatrix(getComputedStyle(cap).transform)
        fromX = m.m41 + (was.w / 2) * (1 - m.a)
        fromW = m.a * was.w
      }
      slide.current?.cancel()
      slide.current = null
      cap.style.width = `${w}px`
      cap.style.transform = `translateX(${x}px)`
      if (was?.on && glide && !matchMedia(REDUCED_MOTION).matches && (Math.abs(fromX - x) > 0.5 || Math.abs(fromW - w) > 0.5)) {
        settle ??= getComputedStyle(document.documentElement).getPropertyValue("--ease-settle").trim() || SETTLE_FALLBACK
        // FLIP: start drawn exactly where it was (the old left edge and width), scaling about its centre, and let go
        const from = `translateX(${fromX + fromW / 2 - w / 2}px) scaleX(${fromW / w})`
        const frames = [{ transform: from }, { transform: `translateX(${x}px) scaleX(1)` }]
        try {
          slide.current = cap.animate(frames, { duration: GLIDE_MS, easing: settle })
        } catch {
          settle = SETTLE_FALLBACK
          slide.current = cap.animate(frames, { duration: GLIDE_MS, easing: settle })
        }
        const run = slide.current
        run.onfinish = () => {
          if (slide.current === run) slide.current = null
        }
      }
      if (!was?.on) {
        // the first placing is still; after that, appearing fades and grows in (the CSS transitions)
        if (!was) {
          cap.setAttribute("data-still", "")
          requestAnimationFrame(() => cap.removeAttribute("data-still"))
        }
        cap.setAttribute("data-on", "")
      }
      placed.current = { x, w, on: true }
    }
    place(true)
    const ro = new ResizeObserver(() => place(false))
    ro.observe(list)
    return () => ro.disconnect()
  }, [activeHref])
  // if the page never arrives (offline, or the navigation was cancelled), the capsule goes back to where you are
  React.useEffect(() => {
    if (!target) return
    const t = window.setTimeout(() => setTarget(null), 5000)
    return () => window.clearTimeout(t)
  }, [target])
  // A click on a page's link in the bar. The page you're already on: back to its top in the same one movement as the
  // logo (the glide from far down, a smooth scroll nearer the top, lib/scroll-to-top), rather than asking for the page
  // again, which would snap. Another page: the capsule sets off for it at once. A modified click opens a new tab.
  const choose = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    if (pathname === href) {
      e.preventDefault()
      setSheet(false)
      scrollToTop()
      return
    }
    if (!current(href)) setTarget(href)
  }

  // The logo. Far down any page (past a screen and a half), it takes you back to that page's top in one fluid
  // movement, the same glide on every page (lib/scroll-to-top; at once under reduced motion). Nearer the top it's the
  // way home: from another page the link does that itself (the home page slides up as a sheet); on the home page it
  // scrolls smoothly back up to the hero. It closes the phone menu either way. A modified click still opens a new tab.
  const toHero = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    if (pathname !== "/" && !farDown()) return
    e.preventDefault()
    setSheet(false)
    scrollToTop()
  }

  return (
    <div className="nav-shell">
      <header className="nav-pill" data-scrolled={scrolled || undefined}>
        <Link href="/" onClick={toHero} className="-m-1 mr-3 shrink-0 rounded-full p-1" aria-label="Bgentic home">
          <Image src="/brand/bgentic-logo-on-dark.svg" alt="" width={68} height={26} priority unoptimized className="h-6.5 w-auto" />
        </Link>

        <nav aria-label="Main" className="relative hidden md:block" onPointerLeave={() => setHl((h) => ({ ...h, on: false }))}>
          <span ref={selRef} aria-hidden="true" className="nav-sel" />
          <span
            aria-hidden="true"
            className="nav-hl"
            data-instant={hl.instant || undefined}
            style={{ transform: `translateX(${hl.x}px)`, width: hl.w, opacity: hl.on ? 1 : 0 }}
          />
          <ul ref={listRef} className="nav-list">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  ref={(el) => {
                    if (el) itemRefs.current.set(item.href, el)
                    else itemRefs.current.delete(item.href)
                  }}
                  href={item.href}
                  className="nav-item"
                  aria-current={current(item.href)}
                  data-active={activeHref === item.href || undefined}
                  onClick={choose(item.href)}
                  onPointerEnter={(e) => glideTo(e.currentTarget)}
                  onFocus={(e) => glideTo(e.currentTarget)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <a href={LOGIN_HREF} className="nav-item hidden md:inline-flex">
            Log in
          </a>
          <Link
            href={BOOK_CALL_HREF}
            onClick={choose(BOOK_CALL_HREF)}
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "hidden sm:inline-flex")}
          >
            Book a call
          </Link>
          <button
            type="button"
            className={cn(buttonVariants({ variant: "quiet", size: "icon" }), "md:hidden")}
            aria-expanded={sheet}
            aria-controls={sheetId}
            aria-label={sheet ? "Close menu" : "Open menu"}
            onClick={() => setSheet((o) => !o)}
          >
            {sheet ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>

        {/* Phone sheet */}
        {sheet && (
          <div id={sheetId} className="nav-sheet md:hidden">
            <ul className="grid">
              {[...NAV, { label: "Log in", href: LOGIN_HREF }].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={item.href.startsWith("/") ? choose(item.href) : undefined}
                    aria-current={current(item.href)}
                    className="block rounded-xl px-4 py-3 text-[15px] font-medium text-ink hover:bg-fill aria-[current=page]:bg-fill"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="p-2">
                <Link
                  href={BOOK_CALL_HREF}
                  onClick={choose(BOOK_CALL_HREF)}
                  className={cn(buttonVariants({ variant: "primary", size: "lg" }), "w-full")}
                >
                  Book a discovery call
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>
    </div>
  )
}
