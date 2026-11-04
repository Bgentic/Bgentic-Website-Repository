import Link from "next/link"
import { ArrowDown, ArrowRight } from "lucide-react"
import { ServiceIcon } from "@/components/site/service-icons"
import { servicesPage } from "@/content/pages"
import { serviceBySlug } from "@/content/services"

// /services hero: the four leaks from the home page, each a row that leads to the service that closes it. A visitor
// who recognises their problem is one click from the right page. Styles: the services page section of depth.css.
export function TriagePanel() {
  const { title, note, rows, more } = servicesPage.triage
  return (
    <div className="triage">
      <div className="triage-head">
        <h2 className="triage-title">{title}</h2>
        <span className="triage-note" aria-hidden="true">
          {note}
        </span>
      </div>
      <ul>
        {rows.map((row) => {
          const service = serviceBySlug(row.service)!
          return (
            <li key={row.problem}>
              <Link href={`/services/${row.service}`} className="triage-row">
                <span className="min-w-0">
                  <span className="triage-problem">{row.problem}</span>
                  <span className="triage-fix">{row.fix}</span>
                </span>
                <span className="triage-chip">
                  <span className="sr-only">Start with </span>
                  <ServiceIcon slug={row.service} className="size-4" />
                  {service.name}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
      <a href="#all-services" className="triage-more">
        {more}
        <ArrowDown className="size-3.5" aria-hidden="true" />
      </a>
    </div>
  )
}
