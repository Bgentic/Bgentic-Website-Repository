// Home: the original promise and the product in depth; the four leaks; the engine pulling every tool into one
// system; six services; one order start to finish; how we work; real clients; honest prices; one place to start.
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Hero } from "@/components/home/hero"
import { Leaks } from "@/components/home/leaks"
import { EngineSection } from "@/components/home/engine-section"
import { ServicesBento } from "@/components/home/services-bento"
import { OrderJourney } from "@/components/home/order-journey"
import { ProcessBand } from "@/components/home/process-band"
import { ClientsGrid } from "@/components/home/clients-grid"
import { PlanCards } from "@/components/home/plan-cards"
import { ContactBand } from "@/components/home/contact-band"
import { SectionHeader } from "@/components/site/section-header"
import { clientsIntro, pricingIntro, servicesIntro } from "@/content/home"
import { PLAN_TERMS } from "@/content/pricing"

export default function Home() {
  return (
    <>
      <Hero />
      <Leaks />
      <EngineSection />

      <section className="section lit-a edge" aria-labelledby="services-title">
        <div className="container-b">
          <SectionHeader id="services-title" title={servicesIntro.title} intro={servicesIntro.intro} />
          <div className="mt-14">
            <ServicesBento />
          </div>
        </div>
      </section>

      <OrderJourney />
      <ProcessBand />

      <section className="section lit-a edge" aria-labelledby="clients-title">
        <div className="container-b">
          <SectionHeader id="clients-title" title={clientsIntro.title} intro={clientsIntro.intro} />
          <div className="mt-14">
            <ClientsGrid />
          </div>
        </div>
      </section>

      <section className="section lit-b edge" aria-labelledby="pricing-title">
        <div className="container-b">
          <SectionHeader id="pricing-title" title={pricingIntro.title} intro={pricingIntro.intro} />
          <div className="mt-14">
            <PlanCards />
          </div>
          <div className="mt-8 flex flex-col gap-3 text-[14px] text-slate md:flex-row md:items-center md:justify-between">
            <p>{PLAN_TERMS.join(" ")}</p>
            <Link href="/pricing" className="link-quiet inline-flex items-center gap-1.5 font-medium">
              Compare every feature <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <ContactBand />
    </>
  )
}
