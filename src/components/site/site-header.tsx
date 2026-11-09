"use client"
// The navigation: a floating glass pill. A soft highlight glides between items on a spring; every item is a plain
// link (Services goes straight to the one /services page, no menu); on phones the pill opens a glass sheet. The
// page's one filled action belongs to the content, so "Book a call" here stays outlined.
import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { buttonVariants } from "@/components/ui/button-variants"
import { BOOK_CALL_HREF, LOGIN_HREF, NAV } from "@/content/site"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = React.useState(false)
  const [sheet, setSheet] = React.useState(false)
  const [hl, setHl] = React.useState({ x: 0, w: 0, on: false, instant: true })
  const listRef = React.useRef<HTMLUListElement>(null)
  const sheetId = React.useId()

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

  return (
    <div className="nav-shell">
      <header className="nav-pill" data-scrolled={scrolled || undefined}>
        <Link href="/" className="-m-1 mr-3 shrink-0 rounded-full p-1" aria-label="Bgentic home">
          <Image src="/brand/bgentic-logo-on-dark.svg" alt="" width={68} height={26} priority unoptimized className="h-6.5 w-auto" />
        </Link>

        <nav aria-label="Main" className="relative hidden md:block" onPointerLeave={() => setHl((h) => ({ ...h, on: false }))}>
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

        {/* Phone sheet */}
        {sheet && (
          <div id={sheetId} className="nav-sheet md:hidden">
            <ul className="grid">
              {[...NAV, { label: "Log in", href: LOGIN_HREF }].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current(item.href)}
                    className="block rounded-xl px-4 py-3 text-[15px] font-medium text-ink hover:bg-fill"
                  >
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
