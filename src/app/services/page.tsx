import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ServicesBento } from "@/components/home/services-bento"
import { ContactSection } from "@/components/home/contact-section"
import { ServicePath } from "@/components/services/service-path"
import { TriagePanel } from "@/components/services/triage-panel"
import { Faq } from "@/components/site/faq"
import { SectionHeader } from "@/components/site/section-header"
import { buttonVariants } from "@/components/ui/button-variants"
import { servicesIntro } from "@/content/home"
import { servicesPage } from "@/content/pages"

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI consultancy, automations, CRM, websites, ecommerce and SEO marketing, built for your business and kept running by our team in Sydney.",
}

// /services, in the home page's bands: the promise beside the four leaks, each pointed at its service (navy); the six
// as the bento (sand); how they hand off to each other (navy); common questions (cream); the close (navy).
export default function ServicesPage() {
  const { faq } = servicesPage
  return (
    <>
      <section className="hero" aria-labelledby="services-page-title">
        <div className="container-b grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <h1 id="services-page-title" className="t-h1 max-w-[14ch]">
              {servicesPage.title}
            </h1>
            <p className="t-lede mt-6 max-w-[46ch]">{servicesPage.lede}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/contact" className={buttonVariants({ variant: "primary", size: "lg" })}>
                Book a discovery call
                <ArrowRight aria-hidden="true" />
              </Link>
              <Link href="/pricing" className={buttonVariants({ variant: "glass", size: "lg" })}>
                See pricing
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6 xl:col-span-5 xl:col-start-8">
            <TriagePanel />
          </div>
        </div>
      </section>

      <section id="all-services" className="section paper paper-sand" aria-labelledby="services-title">
        <div className="container-b">
          <SectionHeader id="services-title" title={servicesIntro.title} intro={servicesIntro.intro} />
          <div className="mt-14">
            <ServicesBento />
          </div>
        </div>
      </section>

      <ServicePath />

      <section className="section paper" aria-labelledby="services-faq-title">
        <div className="container-b grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <h2 id="services-faq-title" className="t-h2">
              {faq.title}
            </h2>
            <p className="t-lede mt-6 max-w-[36ch]">{faq.intro}</p>
            <Link href="/contact" className={`${buttonVariants({ variant: "glass", size: "md" })} mt-8`}>
              Book a discovery call
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Faq items={faq.items} />
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  )
}
