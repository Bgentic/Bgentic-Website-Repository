"use client"
// 02 · Six services, one system: an asymmetric bento of frosted-glass cards, the two wide ones at opposite corners
// (consultancy, where every engagement starts; SEO, which keeps working after launch). Each card is only its icon,
// name and one line; the two wide ones add a three-row example. Over a card, a soft light follows the pointer inside
// it and along its edge, and the card swells by 1% on a spring. Each card links to its service page.
// Styles: the services section of styles/depth.css.
import * as React from "react"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { ServiceIcon } from "@/components/site/service-icons"
import { SERVICES, serviceHref } from "@/content/services"
import { leaks } from "@/content/home"
import { cn } from "@/lib/utils"

const WIDE = new Set(["ai-consultancy", "seo-marketing"])

type Row = { text: string; done?: boolean; tag?: string }

/** a small example panel for a wide card, shown where there's room for it: three rows, one of them called out */
function Panel({ title, rows }: { title: string; rows: Row[] }) {
  return (
    <div className="dash-card hidden w-[18rem] shrink-0 self-start xl:block" aria-hidden="true">
      <div className="flex items-center justify-between px-4 pt-3.5 pb-1.5">
        <span className="text-[12.5px] font-semibold text-ink">{title}</span>
        <span className="sq rounded-[7px] border border-white/10 px-2 py-0.5 text-[10.5px] font-medium text-slate">
          Example
        </span>
      </div>
      <ul className="px-4 pb-2">
        {rows.map((row) => (
          <li key={row.text} className="plan-row flex items-center gap-2.5 py-2.5">
            {row.done ? (
              <Check className="size-3.5 shrink-0 text-[color:var(--b-accent-text)]" strokeWidth={2.25} />
            ) : (
              <span className="plan-dot" data-lead={row.tag ? "" : undefined} />
            )}
            <span className="flex-1 truncate text-[12.5px] text-body">{row.text}</span>
            {row.tag && (
              <span className="plan-chip" data-first="">
                {row.tag}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

// Consultancy: what a discovery call hands back, the leaks put in order. SEO: a morning's check by the agent.
const PANELS: Record<string, React.ReactNode> = {
  "ai-consultancy": (
    <Panel
      title="Where we'd start"
      rows={leaks.rows.slice(0, 3).map((row, i) => ({ text: row.problem, tag: i === 0 ? "Fix first" : undefined }))}
    />
  ),
  "seo-marketing": (
    <Panel
      title="This morning's check"
      rows={[
        { text: "Every page crawled and checked", done: true },
        { text: "Titles rewritten where they slipped", done: true },
        { text: "Summary on your phone", tag: "6:00 am" },
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
            <Link href={serviceHref(s.slug)} className="svc">
              <span className="svc-glow" aria-hidden="true" />
              <div className="flex flex-1 gap-8">
                <div className="flex flex-1 flex-col">
                  <span className="tile size-11 rounded-[0.875rem]">
                    <ServiceIcon slug={s.slug} className="size-5" />
                  </span>
                  <h3 className="svc-name mt-auto pt-10">{s.name}</h3>
                  <p className="svc-text mt-2">{s.summary}</p>
                </div>
                {PANELS[s.slug]}
              </div>
              <ArrowRight className="go size-5 text-[color:var(--b-accent-text)]" aria-hidden="true" />
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
