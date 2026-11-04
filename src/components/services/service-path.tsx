import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SectionHeader } from "@/components/site/section-header"
import { ServiceIcon } from "@/components/site/service-icons"
import { buttonVariants } from "@/components/ui/button-variants"
import { servicesPage } from "@/content/pages"
import { serviceBySlug } from "@/content/services"

// /services: how the six fit together, as one customer's path from a search to a reorder. Five glass stops in a row,
// joined by a fine light-blue line through their icons; each stop is a link to its service. AI consultancy closes the
// band as the strip behind all five. Styles: the services page section of depth.css.
export function ServicePath() {
  const { title, intro, stops, consultancy } = servicesPage.path
  return (
    <section className="section lit-b edge" aria-labelledby="path-title">
      <div className="container-b">
        <SectionHeader id="path-title" title={title} intro={intro} />
        <ol className="path mt-14">
          {stops.map((stop, i) => {
            const service = serviceBySlug(stop.service)!
            return (
              <li key={stop.service} className="reveal flex">
                <Link href={`/services/${stop.service}`} className="path-stop">
                  <span className="tile size-11 rounded-[0.875rem]">
                    <ServiceIcon slug={stop.service} className="size-5" />
                  </span>
                  <h3 className="path-title">
                    <span className="sr-only">Step {i + 1}: </span>
                    {stop.title}
                  </h3>
                  <p className="path-text">{stop.text}</p>
                  <span className="path-service">
                    {service.name}
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            )
          })}
        </ol>
        <div className="eng reveal mt-5">
          <span className="tile size-12 rounded-[0.875rem]" aria-hidden="true">
            <ServiceIcon slug="ai-consultancy" className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="eng-title">{consultancy.title}</h3>
            <p className="eng-text">{consultancy.text}</p>
          </div>
          <Link href="/services/ai-consultancy" className={buttonVariants({ variant: "glass", size: "md" })}>
            {consultancy.action}
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
