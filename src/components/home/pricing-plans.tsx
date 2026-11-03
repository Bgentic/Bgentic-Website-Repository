import Link from "next/link"
import { ArrowRight, Check, Sparkles, Users } from "lucide-react"
import { SectionHeader } from "@/components/site/section-header"
import { buttonVariants } from "@/components/ui/button-variants"
import { pricingIntro } from "@/content/home"
import { PLANS, PLAN_TERMS } from "@/content/pricing"
import { ONBOARDING_HREF } from "@/content/site"
import { cn } from "@/lib/utils"

// 06 · Pricing: the three plans exactly as /onboarding sells them (content/pricing.ts is locked), as glass cards. The
// popular plan is lit: a sky edge, a soft glow, and the one filled action. Each lists its first five inclusions; the
// pricing page has the rest. Styles: the 06 section of depth.css.
const SHOWN = 5

export function PricingPlans() {
  return (
    <section className="section paper" aria-labelledby="pricing-title">
      <div className="container-b">
        <SectionHeader id="pricing-title" title={pricingIntro.title} intro={pricingIntro.intro} />
        <ul className="plans mt-14">
          {PLANS.map((p) => {
            const more = p.features.length - SHOWN
            return (
              <li key={p.name} className="reveal flex">
                <article className={cn("plan", p.popular && "plan-pop")}>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="plan-name">{p.name}</h3>
                    {p.popular && <span className="plan-badge">Most popular</span>}
                  </div>
                  <p className="plan-tagline">{p.tagline}</p>
                  <p className="plan-price">
                    <span className="plan-amount">${p.price}</span>
                    <span className="plan-per">a month, inc GST</span>
                  </p>
                  <ul className="plan-meta">
                    <li>
                      <Users aria-hidden="true" />
                      {p.users}
                    </li>
                    <li>
                      <Sparkles aria-hidden="true" />
                      {p.credits}
                    </li>
                  </ul>
                  <a
                    href={ONBOARDING_HREF}
                    className={cn(buttonVariants({ variant: p.popular ? "primary" : "glass", size: "md" }), "mt-7 w-full")}
                  >
                    Start 14-day free trial
                  </a>
                  <div className="plan-features">
                    {/* the base plan has no "Everything in…" line; a plain label keeps the three lists level */}
                    <p className="plan-intro">{p.intro ?? "Includes:"}</p>
                    <ul className="grid gap-2.5">
                      {p.features.slice(0, SHOWN).map((f) => (
                        <li key={f} className="plan-feature">
                          <Check aria-hidden="true" strokeWidth={2.25} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    {more > 0 && <p className="plan-more">and {more} more</p>}
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
        <div className="plan-terms">
          <p>{PLAN_TERMS.join(" ")}</p>
          <Link href="/pricing" className="link-quiet inline-flex shrink-0 items-center gap-1.5 font-medium">
            Compare every feature <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
