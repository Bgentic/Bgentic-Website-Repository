"use client"
// The hero's kinetic grid behind the /contact booking section: the same hairlines and dots, bending toward the pointer
// and rippling on a click, lit from behind the calendar (the element marked data-lamp) the way the hero's orb lights
// it, so the light falls where the visitor should look first. Reduced motion draws one still, lit grid.
import * as React from "react"
import { KineticGrid, type KineticGridHandle } from "@/components/ui/kinetic-grid"

export function BookingGrid() {
  const ref = React.useRef<HTMLDivElement>(null)
  const grid = React.useRef<KineticGridHandle | null>(null)
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    const lamp = ref.current?.parentElement?.querySelector<HTMLElement>("[data-lamp]")
    if (!ready || !lamp) return
    const place = () => {
      const r = lamp.getBoundingClientRect()
      grid.current?.light(r.left + r.width / 2, r.top + r.height * 0.4, Math.max(460, r.width * 1.1))
    }
    place()
    const ro = new ResizeObserver(place)
    ro.observe(lamp)
    return () => ro.disconnect()
  }, [ready])

  return (
    <div ref={ref} className="hero-backdrop" aria-hidden="true">
      <KineticGrid
        onReady={(h) => {
          grid.current = h
          setReady(true)
        }}
      />
    </div>
  )
}
