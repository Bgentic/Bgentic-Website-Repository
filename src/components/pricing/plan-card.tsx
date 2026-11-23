import Link from "next/link"
import { ArrowRight, CalendarCheck, Check, MapPin, Receipt } from "lucide-react"
import { PLAN_ICONS } from "@/components/pricing/plan-icons"
import { buttonVariants } from "@/components/ui/button-variants"
import { plan } from "@/content/pricing"
import { cn } from "@/lib/utils"

const FACT_ICONS = [MapPin, Receipt]

// /pricing · the plan (2026-11-23, replacing the three priced cards, archived in src/archive/pricing). One wide
// frosted-glass card opens the page on navy:
// - the offer, left: the free trial as a badge on the card's top edge, the page's h1, the quote line, the one filled
//   action and the reply promise, how quoting works in three steps, then two facts at its foot
// - everything in the plan, right: six groups in two columns, read in rows, each with its drawn icon and checks
// - a strip across the foot for custom work the plan doesn't cover; on phones it repeats the action too, since the
//   list above it runs several screens
// Below 1024px it stacks, the offer first. No prices, user limits or credits (content/pricing.ts has the rules).
// Styles: the "/pricing · the plan" section of depth.css.
export function PlanCard() {
  const quote = cn(buttonVariants({ variant: "primary", size: "lg" }), "plan-cta")
  return (
    <div className="plan">
      <p className="plan-trial">
        <CalendarCheck aria-hidden="true" strokeWidth={2} />
        {plan.trial}
      </p>

      <div className="plan-offer">
        <h1 id="plan-title" className="plan-title">
          {/* a space between the two lines, so the heading reads as two sentences, not "plan.Everything" */}
          {plan.title.map((line, i) => (
            <span key={line}>
              {i > 0 && " "}
              {line}
            </span>
          ))}
        </h1>
        <p className="plan-lede">{plan.lede}</p>
        <div className="plan-actions">
          <Link href={plan.cta.href} className={quote}>
            {plan.cta.label}
            <ArrowRight aria-hidden="true" />
          </Link>
          <p className="plan-promise">{plan.promise}</p>
        </div>
        <div className="plan-steps">
          <h2 className="plan-subtitle">{plan.steps.title}</h2>
          {/* the numbers are the close's (`.next-num`): a sequence the reader needs, so they're kept */}
          <ol className="plan-steps-list">
            {plan.steps.items.map((step, i) => (
              <li key={step.title}>
                <span className="next-num" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3 className="plan-step-title">{step.title}</h3>
                  <p className="plan-step-text">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <ul className="plan-facts">
          {plan.facts.map((fact, i) => {
            const Icon = FACT_ICONS[i % FACT_ICONS.length]
            return (
              <li key={fact}>
                <Icon aria-hidden="true" strokeWidth={1.75} />
                {fact}
              </li>
            )
          })}
        </ul>
      </div>

      <div className="plan-included">
        <h2 id="plan-included-title" className="plan-subtitle">
          {plan.includedTitle}
        </h2>
        <div className="plan-groups">
          {plan.groups.map((group) => {
            const Icon = PLAN_ICONS[group.icon]
            return (
              <section key={group.id} className="plan-group" aria-labelledby={`plan-${group.id}`}>
                <div className="plan-group-head">
                  <span className="tile plan-group-icon" aria-hidden="true">
                    <Icon strokeWidth={1.75} />
                  </span>
                  <h3 id={`plan-${group.id}`} className="plan-group-name">
                    {group.name}
                  </h3>
                </div>
                <ul className="plan-list">
                  {group.items.map((item) => (
                    <li key={item}>
                      <Check aria-hidden="true" strokeWidth={2.25} />
                      {item}
                    </li>
                  ))}
                </ul>
                {group.note && <p className="plan-group-note">{group.note}.</p>}
              </section>
            )
          })}
        </div>
      </div>

      <div className="plan-foot">
        {/* phones and tablets only: from 1024px the offer's action sits beside the list (a utility, so it outranks
            the button's own inline-flex) */}
        <Link href={plan.cta.href} className={cn(quote, "lg:hidden")}>
          {plan.cta.label}
          <ArrowRight aria-hidden="true" />
        </Link>
        <p className="plan-custom">
          {plan.custom.text}{" "}
          <Link href={plan.custom.link.href} className="link-quiet whitespace-nowrap">
            {plan.custom.link.label}
          </Link>
        </p>
      </div>
    </div>
  )
}
