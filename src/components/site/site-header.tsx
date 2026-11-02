"use client"
// The navigation: a floating glass pill. A soft highlight glides between items on a spring; Services opens a
// mega-menu by hover intent, click or keyboard; on phones the pill opens a glass sheet. The page's one filled
// action belongs to the content, so "Book a call" here stays outlined.
import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react"
import { buttonVariants } from "@/components/ui/button-variants"
import { ThemeToggle } from "@/components/site/theme-toggle"
import { ServiceIcon } from "@/components/site/service-icons"
import { SERVICES } from "@/content/services"
import { BOOK_CALL_HREF, LOGIN_HREF, NAV } from "@/content/site"
import { cn } from "@/lib/utils"

const OPEN_DELAY = 70
const CLOSE_DELAY = 140

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = React.useState(false)
  const [menu, setMenu] = React.useState(false)
  const [sheet, setSheet] = React.useState(false)
  const [hl, setHl] = React.useState({ x: 0, w: 0, on: false, instant: true })
  const listRef = React.useRef<HTMLUListElement>(null)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const megaRef = React.useRef<HTMLDivElement>(null)
  const timer = React.useRef(0)
  const megaId = React.useId()
  const sheetId = React.useId()

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // close everything on navigation
  const [lastPath, setLastPath] = React.useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setMenu(false)
    setSheet(false)
  }

  React.useEffect(() => {
    if (!menu && !sheet) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return
      if (menu) triggerRef.current?.focus()
      setMenu(false)
      setSheet(false)
    }
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node
      if (menu && !megaRef.current?.contains(t) && !triggerRef.current?.contains(t)) setMenu(false)
    }
    window.addEventListener("keydown", onKey)
    window.addEventListener("pointerdown", onDown)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("pointerdown", onDown)
    }
  }, [menu, sheet])

  const later = (fn: () => void, ms: number) => {
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(fn, ms)
  }

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
  const pages = NAV.filter((n) => n.href !== "/services")

  return (
    <div className="nav-shell">
      <header className="nav-pill" data-scrolled={scrolled || undefined}>
        <Link href="/" className="-m-1 mr-3 shrink-0 rounded-full p-1" aria-label="Bgentic home">
          <Image src="/brand/bgentic-logo-on-light.svg" alt="" width={70} height={26} priority unoptimized className="logo-on-light h-[26px] w-auto" />
          <Image src="/brand/bgentic-logo-on-dark.svg" alt="" width={70} height={26} unoptimized className="logo-on-dark h-[26px] w-auto" />
        </Link>

        <nav aria-label="Main" className="relative hidden md:block" onPointerLeave={() => setHl((h) => ({ ...h, on: false }))}>
          <span
            aria-hidden="true"
            className="nav-hl"
            data-instant={hl.instant || undefined}
            style={{ transform: `translateX(${hl.x}px)`, width: hl.w, opacity: hl.on ? 1 : 0 }}
          />
          <ul ref={listRef} className="nav-list">
            <li>
              <button
                ref={triggerRef}
                type="button"
                className="nav-item"
                aria-expanded={menu}
                aria-controls={megaId}
                aria-current={current("/services")}
                onPointerEnter={(e) => {
                  glideTo(e.currentTarget)
                  if (e.pointerType === "mouse") later(() => setMenu(true), OPEN_DELAY)
                }}
                onPointerLeave={(e) => e.pointerType === "mouse" && later(() => setMenu(false), CLOSE_DELAY)}
                onFocus={(e) => glideTo(e.currentTarget)}
                onClick={() => setMenu((m) => !m)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault()
                    setMenu(true)
                    requestAnimationFrame(() => megaRef.current?.querySelector<HTMLElement>("a")?.focus())
                  }
                }}
              >
                Services
                <ChevronDown className="chev size-3.5 opacity-70" aria-hidden="true" />
              </button>
            </li>
            {pages.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="nav-item"
                  aria-current={current(item.href)}
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
          <ThemeToggle />
          <Link href={BOOK_CALL_HREF} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "hidden sm:inline-flex")}>
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

        {/* Services mega-menu */}
        <div
          ref={megaRef}
          id={megaId}
          className="mega hidden md:block"
          data-open={menu || undefined}
          onPointerEnter={() => later(() => setMenu(true), 0)}
          onPointerLeave={() => later(() => setMenu(false), CLOSE_DELAY)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null) && e.relatedTarget !== triggerRef.current) setMenu(false)
          }}
        >
          <div className="grid gap-2 md:grid-cols-[1.55fr_1fr]">
            <ul className="grid sm:grid-cols-2">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="mega-link" tabIndex={menu ? 0 : -1}>
                    <span className="tile">
                      <ServiceIcon slug={s.slug} className="size-[18px]" />
                    </span>
                    <span>
                      <span className="block text-[14.5px] font-semibold tracking-[-0.01em] text-ink">{s.name}</span>
                      <span className="mt-0.5 block text-[13px] leading-snug text-slate">{s.summary}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={BOOK_CALL_HREF}
              tabIndex={menu ? 0 : -1}
              className="group relative flex flex-col justify-end overflow-hidden rounded-2xl p-6 text-white"
              style={{
                background:
                  "radial-gradient(18rem 14rem at 80% 10%, rgb(43 111 230 / 0.55), transparent 70%), linear-gradient(180deg, #1b3160, #0f1e3a)",
                boxShadow: "inset 0 1px 0 rgb(255 255 255 / 0.12), inset 0 0 0 1px rgb(127 176 247 / 0.14)",
              }}
            >
              {/* the card is navy in both themes, so its text uses the fixed light tints, not theme tokens */}
              <span className="text-[13px] font-medium text-[#7fb0f7]">Not sure where to start?</span>
              <span className="mt-2 text-[1.25rem] leading-tight font-semibold tracking-[-0.02em]">
                Tell us where the time goes.
              </span>
              <span className="mt-2 text-[13.5px] leading-snug text-[#c9ddfd]/85">
                A discovery call maps your enquiries, jobs and orders, then shows what to automate first.
              </span>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold">
                Book a discovery call
                <ArrowRight className="size-4 transition-transform duration-300 ease-(--ease-spring) group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>

        {/* Phone sheet */}
        {sheet && (
          <div id={sheetId} className="nav-sheet md:hidden">
            <ul className="grid">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="mega-link items-center py-2.5">
                    <span className="tile size-8">
                      <ServiceIcon slug={s.slug} className="size-4" />
                    </span>
                    <span className="text-[15px] font-medium text-ink">{s.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="my-2 h-px bg-line" />
            <ul className="grid">
              {[...pages, { label: "Log in", href: LOGIN_HREF }].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="block rounded-xl px-4 py-3 text-[15px] font-medium text-ink hover:bg-fill">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="p-2">
                <Link href={BOOK_CALL_HREF} className={cn(buttonVariants({ variant: "primary", size: "lg" }), "w-full")}>
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
