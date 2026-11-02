import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { CLIENTS } from "@/content/clients"
import { SERVICES } from "@/content/services"

const serviceName = (slug: string) => SERVICES.find((s) => s.slug === slug)?.name ?? slug

// The client showcase as a ruled sheet: four businesses, what they do, what runs on Bgentic, and their site.
// No logos, quotes or numbers: none are on file.
export function ClientsGrid() {
  return (
    <ul className="grid gap-px overflow-hidden rounded-[24px] border hairline bg-line md:grid-cols-2">
      {CLIENTS.map((c) => (
        <li key={c.slug} id={c.slug} className="reveal flex flex-col bg-surface p-7 md:p-9 dark:bg-[var(--b-card-bg)]">
          <p className="text-[13px] text-slate">{c.sector} · Sydney</p>
          <h3 className="mt-2 text-[1.5rem] font-semibold tracking-[-0.025em]">{c.name}</h3>
          <p className="t-body mt-3">{c.about}</p>
          <p className="mt-5 text-[15px] text-body">
            <span className="font-semibold text-ink">Runs on Bgentic: </span>
            {c.runs}
          </p>
          <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-7 text-[13px]">
            <a href={c.url} target="_blank" rel="noopener noreferrer" className="link-quiet inline-flex items-center gap-1 text-[14px] font-medium">
              {c.domain}
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <span className="text-slate">
              {c.services.map((s, i) => (
                <span key={s}>
                  {i > 0 && " · "}
                  <Link href={`/services/${s}`} className="hover:text-ink">
                    {serviceName(s)}
                  </Link>
                </span>
              ))}
            </span>
          </div>
        </li>
      ))}
    </ul>
  )
}
