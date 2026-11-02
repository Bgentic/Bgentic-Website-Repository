"use client"
// Six services, one system: a bento of spotlight cards. Each card lifts on a spring and carries a soft light that
// follows the pointer; the whole card is the link to its service page.
import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ServiceIcon } from "@/components/site/service-icons"
import { SERVICES } from "@/content/services"
import { leaks } from "@/content/home"
import { cn } from "@/lib/utils"

// Bento placement: consultancy leads (it's where every engagement starts), SEO closes as a wide band.
const SPAN: Record<string, string> = {
  "ai-consultancy": "md:col-span-2",
  "seo-marketing": "md:col-span-3",
}

// The consultancy card's wide slot shows what a discovery call hands back: the four leaks, put in order.
const ORDER = ["Fix first", "Next", "Next", "Then"]

function PlanPreview() {
  return (
    <div className="dash-card hidden w-[21rem] shrink-0 self-start xl:block" aria-hidden="true">
      <div className="flex items-center justify-between border-b border-[color:var(--b-line)] px-4 py-3 dark:border-white/[0.06]">
        <span className="text-[12.5px] font-semibold text-ink">Where we&apos;d start</span>
        <span className="rounded-full border border-[color:var(--b-line)] px-2 py-0.5 text-[10.5px] font-medium text-slate dark:border-white/10">
          Example
        </span>
      </div>
      <ol className="px-4 py-1">
        {leaks.rows.map((row, i) => (
          <li key={row.problem} className="plan-row flex items-center gap-3 py-2.5">
            <span className="t-num w-3 text-[11px] text-faint">{i + 1}</span>
            <span className="flex-1 truncate text-[12.5px] text-body">{row.problem}</span>
            <span className="plan-chip" data-first={i === 0 || undefined}>
              {ORDER[i]}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}

export function ServicesBento() {
  // one listener for the grid: the light follows the pointer inside whichever card it's over
  const onPointerMove = (e: React.PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse") return
    const card = (e.target as HTMLElement).closest<HTMLElement>(".spot")
    if (!card) return
    const r = card.getBoundingClientRect()
    card.style.setProperty("--mx", `${e.clientX - r.left}px`)
    card.style.setProperty("--my", `${e.clientY - r.top}px`)
  }

  return (
    <ul className="grid gap-4 md:grid-cols-3" onPointerMove={onPointerMove}>
      {SERVICES.map((s) => {
        const wide = s.slug === "seo-marketing"
        const lead = s.slug === "ai-consultancy"
        return (
          <li key={s.slug} className={cn("reveal", SPAN[s.slug])}>
            <Link
              href={`/services/${s.slug}`}
              className={cn("spot flex h-full flex-col p-7 md:p-8", wide && "md:flex-row md:items-center md:gap-10")}
            >
              <div className={cn("flex flex-1 gap-8", wide && "md:contents")}>
                <div className={cn("flex-1", wide && "md:contents")}>
                  <span className="tile size-11 rounded-[0.875rem]">
                    <ServiceIcon slug={s.slug} className="size-5" />
                  </span>
                  <div className={cn("mt-6 flex-1", wide && "md:mt-0")}>
                    <h3 className="text-[1.375rem] font-semibold tracking-[-0.025em] text-ink">{s.name}</h3>
                    <p className="t-body mt-2 max-w-[46ch]">{s.summary}</p>
                  </div>
                </div>
                {lead && <PlanPreview />}
              </div>
              <div className={cn("mt-6 flex items-end justify-between gap-4", wide && "md:mt-0 md:shrink-0 md:gap-8")}>
                <ul className="flex flex-wrap gap-1.5">
                  {s.highlights.map((h) => (
                    <li
                      key={h}
                      className="rounded-full border border-[color:var(--b-line)] px-2.5 py-1 text-[12px] text-slate dark:border-white/10"
                    >
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
