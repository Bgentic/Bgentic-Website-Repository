import { ArrowUpRight } from "lucide-react"
import { SectionHeader } from "@/components/site/section-header"
import { CLIENTS } from "@/content/clients"
import { clientsIntro } from "@/content/home"
import { SERVICES } from "@/content/services"

// 05 · Clients: the four real businesses, two by two, in glass. Each card: a monogram (no logos are on file), what
// they do, what runs on Bgentic and the services behind it, and their own site. No quotes, ratings or results: none
// are on file. Styles: the 05 section of depth.css.
const serviceName = (slug: string) => SERVICES.find((s) => s.slug === slug)?.name ?? slug

/** two letters for the monogram: an acronym's first two (NPP), a name with a digit keeps it (Sventy8), otherwise the
 *  first letters of the first two words */
function monogram(name: string) {
  const words = name.split(" ")
  const first = words[0]
  if (first.length > 1 && first === first.toUpperCase()) return first.slice(0, 2)
  const digit = first.match(/\d/)
  return (first[0] + (digit ? digit[0] : (words[1]?.[0] ?? ""))).toUpperCase()
}

export function ClientsShowcase() {
  return (
    <section className="section lit-a edge" aria-labelledby="clients-title">
      <div className="container-b">
        <SectionHeader id="clients-title" title={clientsIntro.title} intro={clientsIntro.intro} />
        <ul className="clients mt-14">
          {CLIENTS.map((c) => (
            <li key={c.slug} className="reveal flex">
              <article className="client">
                <div className="flex items-center gap-4">
                  <span className="client-mark" aria-hidden="true">
                    {monogram(c.name)}
                  </span>
                  <div className="min-w-0">
                    <p className="client-sector">{c.sector} · Sydney</p>
                    <h3 className="client-name">{c.name}</h3>
                  </div>
                </div>
                <p className="client-about">{c.about}</p>
                <div className="client-runs">
                  <p className="client-runs-label">Runs on Bgentic</p>
                  <p className="client-runs-text">{c.runs}</p>
                </div>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-7">
                  <ul className="flex flex-wrap gap-1.5">
                    {c.services.map((s) => (
                      <li key={s} className="svc-chip">
                        {serviceName(s)}
                      </li>
                    ))}
                  </ul>
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="client-site">
                    {c.domain}
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
