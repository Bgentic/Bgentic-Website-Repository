// Home: the original promise beside the beating orb; the four leaks; every tool pulled into one system, shown as
// the app itself; six services; each one working; how we work; real clients; honest prices; one place to start.
import { Hero } from "@/components/home/hero"
import { Leaks } from "@/components/home/leaks"
import { SystemSection } from "@/components/home/system-section"
import { ServicesBento } from "@/components/home/services-bento"
import { SeeItWorking } from "@/components/home/see-it-working"
import { HowWeWork } from "@/components/home/how-we-work"
import { ClientsShowcase } from "@/components/home/clients-showcase"
import { PricingSection } from "@/components/home/pricing-section"
import { ContactSection } from "@/components/home/contact-section"
import { SectionHeader } from "@/components/site/section-header"
import { servicesIntro } from "@/content/home"

export default function Home() {
  return (
    <>
      <Hero />
      <Leaks />
      <SystemSection />

      <section className="section paper paper-sand" aria-labelledby="services-title">
        <div className="container-b">
          <SectionHeader id="services-title" title={servicesIntro.title} intro={servicesIntro.intro} />
          <div className="mt-14">
            <ServicesBento />
          </div>
        </div>
      </section>

      <SeeItWorking />
      <HowWeWork />
      <ClientsShowcase />
      <PricingSection />
      <ContactSection />
    </>
  )
}
