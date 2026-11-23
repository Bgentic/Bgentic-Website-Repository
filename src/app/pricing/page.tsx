import type { Metadata } from "next"
import { ContactSection } from "@/components/home/contact-section"
import { PlanCard } from "@/components/pricing/plan-card"
import { Faq } from "@/components/site/faq"
import { PRICING_FAQ } from "@/content/pricing"

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "One plan with every tool your business runs on, set up and supported by our team in Sydney. It starts with a 14-day free trial. Contact us for a quote.",
}

// /pricing (2026-11-23): one plan, quoted. The plan opens the page on navy, then the questions on cream, then the
// close. No prices, user limits or AI credits anywhere (content/pricing.ts). The three priced plans this page used
// to show are archived in src/archive/pricing.
export default function PricingPage() {
  return (
    <>
      <section className="plan-hero" aria-labelledby="plan-title">
        <div className="container-b">
          <PlanCard />
        </div>
      </section>

      <section className="section paper" aria-labelledby="faq-title">
        <div className="container-b grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <h2 id="faq-title" className="t-h2">
              Questions
            </h2>
            <p className="t-lede mt-6 max-w-[34ch]">How quoting works, and how the free trial starts.</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Faq items={PRICING_FAQ} />
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  )
}
