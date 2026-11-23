import Link from "next/link"
import { ArrowRight, Blocks, CalendarCheck, Check, MapPin, Receipt } from "lucide-react"
import { PLAN_ICONS } from "@/components/pricing/plan-icons"
import { buttonVariants } from "@/components/ui/button-variants"
import { plan } from "@/content/pricing"
import { cn } from "@/lib/utils"

const FACT_ICONS = [MapPin, Receipt]

// /pricing · the plan (2026-11-23, replacing the three priced cards, archived in src/archive/pricing). One wide slab
// of navy glass opens the page:
// - the offer, left: the free trial as a badge on the slab's top edge (it catches the light once as the page lands),
//   the page's h1, the quote line, the one filled action and the reply promise, how quoting works in three steps on
//   a fine rail, and two facts. On a desk-sized screen the offer stays in view beside the list as it scrolls.
// - everything in the plan, right: six groups in two columns, read in rows, each under a hairline with a lit icon
// - a strip across the foot for custom work, with its own glass action; on phones it repeats the quote action first,
//   since the list above it runs several screens
// Below 1024px it stacks, the offer first. No prices, user limits or credits (content/pricing.ts has the rules).
// Styles: the "/pricing · the plan" section of depth.css.
export function PlanCard() {
  const quote = buttonVariants({ variant: "primary", size: "lg" })
  return (
    <div className="plan plan-glass">
      <p className="plan-trial">
        <CalendarCheck aria-hidden="true" strokeWidth={2} />
        {plan.trial}
      </p>

      <div className="plan-offer">
        <div className="plan-offer-inner">
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
            <Link href={plan.cta.href} className={cn(quote, "plan-cta")}>
              {plan.cta.label}
              <ArrowRight aria-hidden="true" />
            </Link>
            <p className="plan-promise">{plan.promise}</p>
          </div>

          <div className="plan-steps">
            <h2 className="plan-subtitle">{plan.steps.title}</h2>
            <ol className="plan-steps-list">
              {plan.steps.items.map((step, i) => (
                <li key={step.title}>
                  <span className="plan-step-num" aria-hidden="true">
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
                  <span className="plan-icon" aria-hidden="true">
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
        <Link href={plan.cta.href} className={cn(quote, "plan-cta lg:hidden")}>
          {plan.cta.label}
          <ArrowRight aria-hidden="true" />
        </Link>
        <div className="plan-custom">
          <span className="plan-icon" aria-hidden="true">
            <Blocks strokeWidth={1.75} />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="plan-custom-title">{plan.custom.title}</h2>
            <p className="plan-custom-text">{plan.custom.text}</p>
          </div>
          <Link
            href={plan.custom.action.href}
            className={cn(buttonVariants({ variant: "glass", size: "md" }), "plan-custom-action")}
          >
            {plan.custom.action.label}
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  )
}
