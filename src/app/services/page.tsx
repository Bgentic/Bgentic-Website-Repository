import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PageHero } from "@/components/site/section-header"
import { ServicesList } from "@/components/home/services-list"
import { ProcessBand } from "@/components/home/process-band"
import { ContactBand } from "@/components/home/contact-band"
import { buttonVariants } from "@/components/ui/button-variants"

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI consultancy, automations, CRM, websites, ecommerce and SEO marketing, built for your business and kept running by our team in Sydney.",
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Six services, one team."
        lede="Start with the one that hurts most. Each service is built to plug into the others, and we keep all of it running, so you're never left holding a system nobody understands."
      >
        <Link href="/contact" className={buttonVariants({ variant: "primary", size: "lg" })}>
          Book a discovery call
          <ArrowRight aria-hidden="true" />
        </Link>
      </PageHero>
      <section className="section band-ground pt-0" aria-label="All services">
        <div className="container-b">
          <ServicesList detailed />
        </div>
      </section>
      <ProcessBand />
      <ContactBand />
    </>
  )
}
