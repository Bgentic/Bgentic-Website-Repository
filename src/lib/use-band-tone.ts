"use client"
import * as React from "react"

export type Tone = "light" | "navy"

/**
 * Whether a navy band (`[data-band="navy"]`) sits under a horizontal line `offset` px from the top of the screen,
 * so fixed chrome over it (the header) can switch to its dark treatment.
 */
export function useBandTone(offset: number): Tone {
  const [tone, setTone] = React.useState<Tone>("light")
  React.useEffect(() => {
    const bands = Array.from(document.querySelectorAll('[data-band="navy"]'))
    if (!bands.length) return
    const under = new Set<Element>()
    let io: IntersectionObserver | null = null
    const observe = () => {
      io?.disconnect()
      under.clear()
      const bottom = Math.max(0, window.innerHeight - offset - 1)
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) under.add(e.target)
            else under.delete(e.target)
          }
          setTone(under.size ? "navy" : "light")
        },
        { rootMargin: `-${offset}px 0px -${bottom}px 0px` },
      )
      bands.forEach((b) => io!.observe(b))
    }
    observe()
    window.addEventListener("resize", observe)
    return () => {
      io?.disconnect()
      window.removeEventListener("resize", observe)
    }
  }, [offset])
  return tone
}
