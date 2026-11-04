"use client"
// Staggered client cards, recreated from 21st.dev @vaib215/stagger-testimonials. A row of square cards fanned across
// the band, each with its top-right corner cut (and a hairline along the cut). The active card sits in the centre,
// lifted and shadowed; the others alternate a little up and down with a slight tilt. Click a card, or the arrows, and
// the row glides (500ms) until that card is in the centre; the list rotates, so it never ends.
//
// Changed from the original: the active card's colours come from tokens (--stagger-active-*, navy with cream type on
// the sand band) instead of the primary colour; the client's logo on its own tile in place of a headshot; quotation
// marks and a "said by" line only for an approved quote, otherwise a small "Runs on Bgentic" label; real buttons for
// the arrows; 320px cards with tighter padding on phones; and for screen readers one live line with the active card
// (the fanned row itself is hidden from them). Under reduced motion the cards move without the glide.
import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { ClientCard } from "@/content/testimonials"
import { cn } from "@/lib/utils"

const SQRT_5000 = Math.sqrt(5000)

type Item = ClientCard & { key: number }

function Card({
  item,
  position,
  size,
  onMove,
}: {
  item: Item
  position: number
  size: number
  onMove: (steps: number) => void
}) {
  const active = position === 0
  return (
    <div
      onClick={() => onMove(position)}
      className={cn(
        "stagger-card absolute top-1/2 left-1/2 cursor-pointer border-2 p-6 transition-all duration-500 ease-in-out sm:p-8",
        active ? "stagger-card-active z-10" : "z-0 border-border bg-card text-card-foreground hover:border-[color:var(--stagger-active-bg)]",
      )}
      style={{
        width: size,
        height: size,
        clipPath: "polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)",
        transform: `translate(-50%, -50%) translateX(${(size / 1.5) * position}px) translateY(${active ? -65 : position % 2 ? 15 : -15}px) rotate(${active ? 0 : position % 2 ? 2.5 : -2.5}deg)`,
        boxShadow: active ? "0px 8px 0px 4px var(--border)" : "0px 0px 0px 0px transparent",
      }}
    >
      {/* the hairline along the cut corner */}
      <span
        className="absolute block origin-top-right rotate-45 bg-border"
        style={{ right: -2, top: 48, width: SQRT_5000, height: 2 }}
      />
      {/* the client's logo on its own tile, in place of the original's headshot */}
      <span
        className={cn(
          "stagger-logo mb-4 flex h-12 w-28 items-center justify-center px-3 sm:mb-5 sm:h-14 sm:w-32",
          item.logoOn === "dark" ? "bg-[#060b17]" : "bg-[#fbf7f3]",
          active && item.logoOn === "dark" && "ring-1 ring-[#fbf7f3]/15",
        )}
        style={{ boxShadow: "3px 3px 0px var(--background)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- a small logo, moved with its card */}
        <img src={item.logo} alt="" className="max-h-9 w-auto max-w-full object-contain" />
      </span>
      {!item.quote && (
        <p className={cn("mb-2 text-xs font-semibold tracking-[0.08em] uppercase", active ? "stagger-active-muted" : "text-muted-foreground")}>
          Runs on Bgentic
        </p>
      )}
      <h3 className="font-heading text-base font-medium tracking-[-0.01em] sm:text-xl">
        {item.quote ? <>&ldquo;{item.text}&rdquo;</> : item.text}
      </h3>
      <p
        className={cn(
          "absolute right-6 bottom-6 left-6 mt-2 text-sm sm:right-8 sm:bottom-8 sm:left-8",
          item.quote && "italic",
          active ? "stagger-active-muted" : "text-muted-foreground",
        )}
      >
        {item.quote ? `- ${item.by}` : item.by}
      </p>
    </div>
  )
}

export function StaggerTestimonials({ items, label = "Client feedback" }: { items: ClientCard[]; label?: string }) {
  const [size, setSize] = React.useState(365)
  const [list, setList] = React.useState<Item[]>(() => items.map((t, i) => ({ ...t, key: i })))
  const next = React.useRef(items.length)

  // rotate the list so the card `steps` away lands in the centre
  const move = (steps: number) => {
    setList((current) => {
      const out = [...current]
      if (steps > 0) {
        for (let i = steps; i > 0; i--) {
          const item = out.shift()
          if (!item) return current
          out.push({ ...item, key: next.current++ })
        }
      } else {
        for (let i = steps; i < 0; i++) {
          const item = out.pop()
          if (!item) return current
          out.unshift({ ...item, key: next.current++ })
        }
      }
      return out
    })
  }

  React.useEffect(() => {
    const update = () => setSize(window.matchMedia("(min-width: 640px)").matches ? 365 : 320)
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const centerIndex = list.length % 2 ? (list.length + 1) / 2 : list.length / 2
  const current = list[centerIndex]

  return (
    <div className="stagger relative w-full overflow-hidden" style={{ height: 600 }} role="region" aria-roledescription="carousel" aria-label={label}>
      <div aria-hidden="true">
        {list.map((item, index) => (
          <Card key={item.key} item={item} position={index - centerIndex} size={size} onMove={move} />
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {current && (current.quote ? `“${current.text}” ${current.by}` : `${current.by}. Runs on Bgentic: ${current.text}`)}
      </p>
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        <button type="button" onClick={() => move(-1)} className="stagger-arrow" aria-label="Previous">
          <ChevronLeft aria-hidden="true" />
        </button>
        <button type="button" onClick={() => move(1)} className="stagger-arrow" aria-label="Next">
          <ChevronRight aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
