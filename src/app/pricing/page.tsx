import type { Metadata } from "next"
import Link from "next/link"
import { PageHero, SectionHeader } from "@/components/site/section-header"
import { PlanCards } from "@/components/home/plan-cards"
import { Faq } from "@/components/site/faq"
import { ContactBand } from "@/components/home/contact-band"
import { AI_CREDITS, CUSTOM_WORK, PLAN_TERMS, PRICING_FAQ } from "@/content/pricing"

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Basic $199, Standard $349 and Premium $499 a month, including GST. Month to month, no lock-in, with a 14-day free trial on every plan.",
}

export default function PricingPage() {
  return (
    <>
      <PageHero
        title="Three plans. No lock-in."
        lede="Run the platform yourself, get set up properly, or have us build and run it. Every plan is month to month and starts with a 14-day free trial."
      />
      <section className="section band-ground pt-0" aria-label="Plans">
        <div className="container-b">
          <PlanCards full />
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-[14px] text-slate">
            {PLAN_TERMS.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section band-surface" aria-labelledby="extras-title">
        <div className="container-b">
          <SectionHeader id="extras-title" title="What sits outside the plans" />
          <div className="mt-12 grid gap-px overflow-hidden rounded-[24px] border hairline bg-line md:grid-cols-2">
            <div className="bg-surface p-7 md:p-9 dark:bg-[var(--b-card-bg)]">
              <h3 className="t-h3">AI is billed on usage</h3>
              <p className="t-body mt-2">{AI_CREDITS}</p>
            </div>
            <div className="bg-surface p-7 md:p-9 dark:bg-[var(--b-card-bg)]">
              <h3 className="t-h3">Custom work is quoted</h3>
              <p className="t-body mt-2">
                {CUSTOM_WORK}{" "}
                <Link href="/contact" className="link-quiet">
                  Book a discovery call
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section band-ground" aria-labelledby="faq-title">
        <div className="container-b grid gap-10 lg:grid-cols-12 lg:gap-8">
          <h2 id="faq-title" className="t-h2 lg:col-span-4">
            Questions
          </h2>
          <div className="lg:col-span-7 lg:col-start-6">
            <Faq items={PRICING_FAQ} />
          </div>
        </div>
      </section>

      <ContactBand />
    </>
  )
}
