import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SERVICES } from "@/content/services"

// The six services as an index, not a grid of icon cards: one ruled row each, the whole row a link.
export function ServicesList({ detailed = false }: { detailed?: boolean }) {
  return (
    <ul className="border-t hairline">
      {SERVICES.map((s) => (
        <li key={s.slug} className="reveal border-b hairline">
          <Link
            href={`/services/${s.slug}`}
            className="group grid gap-3 rounded-2xl py-8 transition-colors md:-mx-5 md:grid-cols-12 md:items-baseline md:gap-8 md:px-5 md:hover:bg-surface dark:md:hover:bg-[var(--b-card-bg)]"
          >
            <h3 className="text-[1.5rem] leading-tight font-semibold tracking-[-0.025em] md:col-span-4 md:text-[1.75rem]">
              {s.name}
            </h3>
            <p className="t-body md:col-span-4">{s.summary}</p>
            <ul className={"flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-slate md:col-span-3 md:block " + (detailed ? "" : "md:hidden lg:block")}>
              {s.highlights.map((h) => (
                <li key={h} className="md:leading-6">
                  {h}
                </li>
              ))}
            </ul>
            <span className="hidden justify-self-end md:col-span-1 md:block" aria-hidden="true">
              <ArrowRight className="size-5 text-slate transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:text-ink" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
