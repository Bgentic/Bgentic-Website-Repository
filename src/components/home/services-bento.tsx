"use client"
// 02 · Six services, one system: an asymmetric bento of frosted-glass cards, the two wide ones at opposite corners
// (consultancy, where every engagement starts; SEO, which keeps working after launch). Over a card, a soft light
// follows the pointer inside it and along its edge, and the card swells by 1% on a spring. Each card links to its
// service page. Styles: the services section of styles/depth.css.
import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ServiceIcon } from "@/components/site/service-icons"
import { SERVICES } from "@/content/services"
import { leaks } from "@/content/home"
import { cn } from "@/lib/utils"

const WIDE = new Set(["ai-consultancy", "seo-marketing"])

/** a small example panel for a wide card, shown where there's room for it */
function Panel({ title, rows }: { title: string; rows: { text: string; tag: string; lead?: boolean }[] }) {
  return (
    <div className="dash-card hidden w-[18rem] shrink-0 self-start xl:block" aria-hidden="true">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
        <span className="text-[12.5px] font-semibold text-ink">{title}</span>
        <span className="sq rounded-[7px] border border-white/10 px-2 py-0.5 text-[10.5px] font-medium text-slate">
          Example
        </span>
      </div>
      <ol className="px-4 py-1">
        {rows.map((row, i) => (
          <li key={row.text} className="plan-row flex items-center gap-3 py-2.5">
            <span className="t-num w-3 text-[11px] text-faint">{i + 1}</span>
            <span className="flex-1 truncate text-[12.5px] text-body">{row.text}</span>
            <span className="plan-chip" data-first={row.lead || undefined}>
              {row.tag}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}

// Consultancy: what a discovery call hands back, the four leaks put in order. SEO: a morning's check by the agent.
const PANELS: Record<string, React.ReactNode> = {
  "ai-consultancy": (
    <Panel
      title="Where we'd start"
      rows={leaks.rows.map((row, i) => ({ text: row.problem, tag: ["Fix first", "Next", "Next", "Then"][i], lead: i === 0 }))}
    />
  ),
  "seo-marketing": (
    <Panel
      title="This morning's check"
      rows={[
        { text: "Every page crawled and checked", tag: "Done" },
        { text: "Titles rewritten where they slipped", tag: "Done" },
        { text: "New questions customers are asking", tag: "Drafted" },
        { text: "Summary sent to your phone", tag: "6:00 am", lead: true },
      ]}
    />
  ),
}

export function ServicesBento() {
  // one listener for the grid: the light follows the pointer inside whichever card it's over
  const onPointerMove = (e: React.PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse") return
    const card = (e.target as HTMLElement).closest<HTMLElement>(".svc")
    if (!card) return
    const r = card.getBoundingClientRect()
    card.style.setProperty("--mx", `${e.clientX - r.left}px`)
    card.style.setProperty("--my", `${e.clientY - r.top}px`)
  }

  return (
    <ul className="bento" onPointerMove={onPointerMove}>
      {SERVICES.map((s) => {
        const wide = WIDE.has(s.slug)
        return (
          <li key={s.slug} className={cn("reveal", wide && "bento-wide")}>
            <Link href={`/services/${s.slug}`} className="svc">
              <span className="svc-glow" aria-hidden="true" />
              <div className="flex flex-1 gap-8">
                <div className="flex flex-1 flex-col">
                  <span className="tile size-11 rounded-[0.875rem]">
                    <ServiceIcon slug={s.slug} className="size-5" />
                  </span>
                  <h3 className="svc-name mt-6">{s.name}</h3>
                  <p className="svc-text mt-2">{s.summary}</p>
                </div>
                {PANELS[s.slug]}
              </div>
              <div className="mt-7 flex items-end justify-between gap-4">
                <ul className="flex flex-wrap gap-1.5">
                  {s.highlights.map((h) => (
                    <li key={h} className="svc-chip">
                      {h}
                    </li>
                  ))}
                </ul>
                <ArrowRight className="go size-5 shrink-0 text-[color:var(--b-accent-text)]" aria-hidden="true" />
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
