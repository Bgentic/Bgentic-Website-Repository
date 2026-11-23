import { Pricing } from "@/components/blocks/pricing"
import { pricingIntro } from "@/content/home"
import { PLAN_TERMS } from "@/content/pricing"
import { ANNUAL_SAVING, PRICING_PLANS } from "@/lib/pricing-plans"

// 06 · Pricing: the same interactive block as /pricing (the annual switch, the rolling prices, the 3D fan of cards),
// set on the cream band between the clients and the close. `.pricing-paper` re-points the block's tokens to paper.
// Styles: the pricing block section of depth.css.
export function PricingSection() {
  return (
    <section className="section paper pricing-paper" aria-labelledby="pricing-title">
      <Pricing
        id="pricing-title"
        className="py-0"
        plans={PRICING_PLANS}
        title={pricingIntro.title}
        description={pricingIntro.intro}
        note={PLAN_TERMS.join(" ")}
        saving={ANNUAL_SAVING}
      />
    </section>
  )
}
