import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SectionHeader } from "@/components/site/section-header"
import { ServiceIcon } from "@/components/site/service-icons"
import { buttonVariants } from "@/components/ui/button-variants"
import { servicesPage } from "@/content/pages"
import { serviceBySlug, serviceHref, type ServiceSlug } from "@/content/services"

// /services: how the six fit together, as one customer's path from a search to a reorder. Five glass stops in a row,
// joined by a fine light-blue line through their icons. A stop whose service is in the showcase above links back up to
// it (/services#slug picks it there); ecommerce isn't in the showcase, so its stop is the place a link to it lands.
// AI consultancy closes the band as the strip behind all five, and lands links to it. Styles: the services page
// section of depth.css.
const IN_SHOWCASE = new Set<ServiceSlug>(servicesPage.showcase.items.map((i) => i.service))

export function ServicePath() {
  const { title, intro, stops, consultancy } = servicesPage.path
  return (
    <section className="section lit-b edge" aria-labelledby="path-title">
      <div className="container-b">
        <SectionHeader id="path-title" title={title} intro={intro} />
        {/* `stack`: on phones the stops stack as you scroll (the phones section of depth.css) */}
        <ol className="path stack mt-14">
          {stops.map((stop, i) => {
            const service = serviceBySlug(stop.service)!
            const linked = IN_SHOWCASE.has(stop.service)
            const body = (
              <>
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
                  {linked && <ArrowRight className="size-3.5" aria-hidden="true" />}
                </span>
              </>
            )
            return (
              <li key={stop.service} className="reveal flex">
                {linked ? (
                  <Link href={serviceHref(stop.service)} className="path-stop">
                    {body}
                  </Link>
                ) : (
                  <div id={stop.service} className="path-stop path-stop-static">
                    {body}
                  </div>
                )}
              </li>
            )
          })}
        </ol>
        <div id="ai-consultancy" className="eng reveal mt-5">
          <span className="tile size-12 rounded-[0.875rem]" aria-hidden="true">
            <ServiceIcon slug="ai-consultancy" className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="eng-title">{consultancy.title}</h3>
            <p className="eng-text">{consultancy.text}</p>
          </div>
          <Link href="/contact" className={buttonVariants({ variant: "glass", size: "md" })}>
            {consultancy.action}
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
