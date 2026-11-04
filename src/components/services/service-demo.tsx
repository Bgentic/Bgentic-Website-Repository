import Link from "next/link"
import { ArrowRight, MousePointerClick } from "lucide-react"
import { CrmApp } from "@/components/crm/crm-app"
import { ClientsShowcase } from "@/components/home/clients-showcase"
import { OrderJourney } from "@/components/home/order-journey"
import { SeeItWorking } from "@/components/home/see-it-working"
import { SectionHeader } from "@/components/site/section-header"
import { buttonVariants } from "@/components/ui/button-variants"
import type { Service } from "@/content/services"

// A service page's navy band: the service working. Where the site already has the real thing, it's that: the live app
// for CRM, the film of an ordinary Tuesday for automations, an order followed from portal to delivery for ecommerce,
// and the clients' own sites for websites. Where the demo isn't built yet (consultancy, SEO), the band says so plainly
// and offers the call instead.
export function ServiceDemo({ service }: { service: Service }) {
  switch (service.slug) {
    case "automations":
      return <SeeItWorking />
    case "ecommerce":
      return <OrderJourney />
    case "websites":
      return <ClientsShowcase />
    case "crm":
      return (
        <section className="section lit-b edge" aria-labelledby="demo-title">
          <div className="container-b">
            <SectionHeader id="demo-title" title={service.demo.title} intro={service.demo.text} />
            <div className="cs-frame mx-auto mt-14 w-full p-2 md:p-3.5">
              <div className="cs-screen">
                <CrmApp />
              </div>
            </div>
          </div>
        </section>
      )
    default:
      return (
        <section className="section lit-b edge" aria-labelledby="demo-title">
          <div className="container-b grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
            <div className="lg:col-span-5">
              <h2 id="demo-title" className="t-h2">
                {service.demo.title}
              </h2>
              <p className="t-lede mt-6 max-w-[42ch]">{service.demo.text}</p>
            </div>
            <div className="triage lg:col-span-6 lg:col-start-7">
              <div className="grid min-h-[18rem] place-items-center px-8 py-12 text-center">
                <div className="max-w-[32ch]">
                  <span className="tile mx-auto size-12 rounded-[0.875rem]" aria-hidden="true">
                    <MousePointerClick className="size-5" />
                  </span>
                  <p className="mt-5 text-[1.0625rem] font-semibold text-ink">The interactive demo lands here next.</p>
                  <p className="t-body mt-2 text-[15px]">Until then, we&apos;ll walk you through it on a call.</p>
                  <Link href="/contact" className={`${buttonVariants({ variant: "glass", size: "md" })} mt-7`}>
                    Book a call
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )
  }
}
