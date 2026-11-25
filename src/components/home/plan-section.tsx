import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PLAN_ICONS } from "@/components/pricing/plan-icons"
import { buttonVariants } from "@/components/ui/button-variants"
import { plan, planIntro } from "@/content/pricing"

// 06 · The plan (2026-11-23, in place of the three priced plans, archived in src/archive/pricing): one plan, quoted,
// on the cream band between the clients and the close, so the bands still alternate. The pitch and the way in on the
// left, in /pricing's two-tone lockup; on the right the plan itself shows through the paper: a small slab of the same
// navy glass as /pricing's card (a navy island, as the popular plan was), with the six groups a line each. No prices,
// user limits or AI credits. Styles: the "/pricing · the plan" section of depth.css.
export function PlanSection() {
  return (
    <section className="section paper" aria-labelledby="plan-band-title">
      <div className="container-b grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-5">
          <h2 id="plan-band-title" className="t-h2 plan-lockup">
            {planIntro.title.map((line, i) => (
              <span key={line}>
                {i > 0 && " "}
                {line}
              </span>
            ))}
          </h2>
          <p className="t-lede mt-6 max-w-[40ch]">{planIntro.intro}</p>
          {/* on phones the pair stacks at full width, the same size */}
          <div className="mt-9 flex flex-wrap gap-3 max-sm:flex-col max-sm:items-stretch">
            <Link href={planIntro.primary.href} className={buttonVariants({ variant: "primary", size: "lg" })}>
              {planIntro.primary.label}
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link href={planIntro.secondary.href} className={buttonVariants({ variant: "glass", size: "lg" })}>
              {planIntro.secondary.label}
            </Link>
          </div>
        </div>

        {/* `lift`: on phones the slab rises upright as it scrolls in (the phones section of depth.css) */}
        <div className="plan-glass plan-island lift lg:col-span-7 lg:col-start-6">
          <p className="plan-subtitle">{planIntro.sheetTitle}</p>
          <ul className="plan-index">
            {plan.groups.map((group) => {
              const Icon = PLAN_ICONS[group.icon]
              return (
                <li key={group.id}>
                  <span className="plan-icon" aria-hidden="true">
                    <Icon strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="plan-index-name">{group.name}</p>
                    <p className="plan-index-text">{group.summary}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
