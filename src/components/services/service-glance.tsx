import Link from "next/link"
import { Check } from "lucide-react"
import { ServiceIcon } from "@/components/site/service-icons"
import type { Client } from "@/content/clients"
import type { Service } from "@/content/services"

// A service page's hero panel: the service at a glance, in the dark glass of the /services triage panel. Its name and
// one line, the three things a client gets, and the real clients already running it. Styles: .triage (depth.css).
export function ServiceGlance({ service, clients }: { service: Service; clients: Client[] }) {
  return (
    <div className="triage">
      <div className="flex items-center gap-4 px-5 pt-5 pb-4">
        <span className="tile size-11 rounded-[0.875rem]" aria-hidden="true">
          <ServiceIcon slug={service.slug} className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="triage-title">{service.name}</p>
          <p className="triage-fix">{service.summary}</p>
        </div>
      </div>
      <ul className="border-t border-white/[0.06] px-5 py-4">
        {service.highlights.map((h) => (
          <li key={h} className="flex items-center gap-3 py-1.5 text-[15px] text-ink">
            <Check className="size-4 shrink-0 text-[color:var(--b-accent-text)]" strokeWidth={2.25} aria-hidden="true" />
            {h}
          </li>
        ))}
      </ul>
      {clients.length > 0 && (
        <div className="border-t border-white/[0.06] px-5 pt-4 pb-5">
          <p className="triage-note">Running it today</p>
          <ul className="mt-2.5 flex flex-wrap gap-1.5">
            {clients.map((c) => (
              <li key={c.slug}>
                <Link href="/clients" className="svc-chip client-chip">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
