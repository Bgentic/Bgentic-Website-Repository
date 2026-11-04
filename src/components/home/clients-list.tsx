"use client"
// The client gallery's list. It marks itself seen (data-seen) the first time it's well on screen, so each card's
// "hover to scroll" hint pulses then, a few times, instead of off screen at load. Styles: the 05 section of depth.css.
import * as React from "react"

export function ClientsList({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = React.useRef<HTMLUListElement>(null)
  const [seen, setSeen] = React.useState(false)
  React.useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [seen])
  return (
    <ul ref={ref} className={className} data-seen={seen || undefined}>
      {children}
    </ul>
  )
}
