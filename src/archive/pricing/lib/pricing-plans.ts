// The three plans (content/pricing.ts) shaped for the pricing block (components/blocks/pricing.tsx), shared by the
// home page and /pricing so both show the same thing: users and AI credits first, then everything the plan adds.
// With Annual on, the big number is the year's price over twelve months, to the cent, and the line under it is the
// year's total. Every button goes to the plans on /pricing (and from there to /contact); the configurator's sale
// links come later.
import type { PricingPlan } from "@/components/blocks/pricing"
import { PLANS } from "@/content/pricing"
import { ONBOARDING_HREF } from "@/content/site"

const monthlyOf = (total: number) => Math.round((total / 12) * 100) / 100

/** what annual billing saves, to the whole percent (the same on all three plans) */
export const ANNUAL_SAVING = `Save ${Math.round((1 - PLANS[0].annualTotal / (PLANS[0].price * 12)) * 100)}%`

export const PRICING_PLANS: PricingPlan[] = PLANS.map((p) => ({
  name: p.name,
  price: String(p.price),
  yearlyPrice: String(monthlyOf(p.annualTotal)),
  yearlyTotal: String(p.annualTotal),
  period: "month",
  intro: p.intro,
  features: [p.users, p.credits, ...p.features],
  description: p.tagline,
  buttonText: "Start 14-day free trial",
  href: ONBOARDING_HREF,
  isPopular: Boolean(p.popular),
}))
