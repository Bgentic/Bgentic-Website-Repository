import type { Metadata } from "next"
import Link from "next/link"
import { Pricing } from "@/components/blocks/pricing"
import { ContactSection } from "@/components/home/contact-section"
import { Faq } from "@/components/site/faq"
import { SectionHeader } from "@/components/site/section-header"
import { AI_CREDITS, CUSTOM_WORK, PLAN_TERMS, PRICING_FAQ } from "@/content/pricing"
import { ANNUAL_SAVING, PRICING_PLANS } from "@/lib/pricing-plans"

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Basic $199, Standard $349 and Premium $499 a month, including GST, or billed annually for about 9% less. A 14-day free trial on every plan.",
}

// /pricing: the plans open the page (navy), then what sits outside them and the questions (cream), then the close.
// The plans are the home page's (lib/pricing-plans.ts). Their buttons go to the plans everywhere else; here, already
// on the plans, they go to /contact to book a call (there's no sign-up flow on this site).
export default function PricingPage() {
  return (
    <>
      <section className="hero" aria-label="Plans">
        <Pricing
          as="h1"
          className="py-0"
          plans={PRICING_PLANS.map((p) => ({ ...p, href: "/contact" }))}
          title="Three plans. No lock-in."
          description={
            "Run the platform yourself, get set up properly, or have us build and run it.\nEvery plan starts with a 14-day free trial."
          }
          note={PLAN_TERMS.join(" ")}
          saving={ANNUAL_SAVING}
        />
      </section>

      <section className="section paper" aria-labelledby="extras-title">
        <div className="container-b">
          <SectionHeader id="extras-title" title="What sits outside the plans" />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {/* `lift`: on phones each card rises upright as it scrolls in (the phones section of depth.css) */}
            <div className="step-card lift">
              <h3 className="text-[1.3125rem] font-semibold tracking-[-0.02em] text-ink">AI is billed on usage</h3>
              <p className="t-body mt-2">{AI_CREDITS}</p>
            </div>
            <div className="step-card lift">
              <h3 className="text-[1.3125rem] font-semibold tracking-[-0.02em] text-ink">Custom work is quoted</h3>
              <p className="t-body mt-2">
                {CUSTOM_WORK}{" "}
                <Link href="/contact" className="link-quiet">
                  Book a discovery call
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-24 grid gap-10 lg:grid-cols-12 lg:gap-8">
            <h2 id="faq-title" className="t-h2 lg:col-span-4">
              Questions
            </h2>
            <div className="lg:col-span-7 lg:col-start-6">
              <Faq items={PRICING_FAQ} />
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  )
}
