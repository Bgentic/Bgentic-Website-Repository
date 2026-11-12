import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ContactSection } from "@/components/home/contact-section"
import { ConnectedShowcase, type ShowcaseItem } from "@/components/services/connected-showcase"
import { ServicePath } from "@/components/services/service-path"
import { Showreel } from "@/components/services/showreel"
import { Faq } from "@/components/site/faq"
import { SectionHeader } from "@/components/site/section-header"
import { buttonVariants } from "@/components/ui/button-variants"
import { servicesPage } from "@/content/pages"
import { serviceBySlug } from "@/content/services"

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI consultancy, automations, CRM, websites, ecommerce and SEO marketing, built for your business and kept running by our team in Sydney.",
}

// The one services page (the per-service pages are folded into it), in the home page's bands: the promise and the
// showreel (navy); the four services in the connected showcase (sand); how all six fit together, where consultancy
// and ecommerce live (navy); common questions (cream); the close (navy). Links to a service land here at
// /services#slug (serviceHref).
const showcase: ShowcaseItem[] = servicesPage.showcase.items.map((it) => {
  const s = serviceBySlug(it.service)!
  return { ...it, name: s.name, headline: s.headline, summary: s.summary, highlights: s.highlights }
})

export default function ServicesPage() {
  const { faq, showcase: copy } = servicesPage
  return (
    <>
      <section className="hero services-hero" aria-labelledby="services-page-title">
        <div className="container-b">
          <div className="mx-auto max-w-[52rem] text-center">
            <h1 id="services-page-title" className="t-h1">
              {servicesPage.title}
            </h1>
            <p className="t-lede mx-auto mt-6 max-w-[48ch]">{servicesPage.lede}</p>
            {/* on phones the pair stacks at full width, the same size */}
            <div className="mt-9 flex flex-wrap justify-center gap-3 max-sm:flex-col max-sm:items-stretch">
              <Link href="/contact" className={buttonVariants({ variant: "primary", size: "lg" })}>
                Book a discovery call
                <ArrowRight aria-hidden="true" />
              </Link>
              <Link href="/pricing" className={buttonVariants({ variant: "glass", size: "lg" })}>
                See pricing
              </Link>
            </div>
          </div>
          <div className="mt-14 md:mt-16">
            <Showreel />
          </div>
        </div>
      </section>

      <section className="section paper paper-sand" aria-labelledby="showcase-title">
        <div className="container-b">
          <SectionHeader id="showcase-title" title={copy.title} intro={copy.intro} />
        </div>
        {/* the carousel is wider than the page's text, so the card and its screen have room */}
        <div className="showcase-wrap mt-14">
          <ConnectedShowcase items={showcase} />
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
