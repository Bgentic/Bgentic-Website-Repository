import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PLAN_ICONS } from "@/components/pricing/plan-icons"
import { buttonVariants } from "@/components/ui/button-variants"
import { plan, planIntro } from "@/content/pricing"

// 06 · The plan (2026-11-23, in place of the three priced plans, archived in src/archive/pricing): one plan, quoted,
// on the cream band between the clients and the close, so the bands still alternate. The pitch and the way in on the
// left; on the right, a paper sheet sums up the six groups of /pricing's card, a line each. No prices, user limits or
// AI credits. Styles: the "/pricing · the plan" section of depth.css (`.plan-index`).
export function PlanSection() {
  return (
    <section className="section paper" aria-labelledby="plan-band-title">
      <div className="container-b grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-5">
          <h2 id="plan-band-title" className="t-h2">
            {planIntro.title}
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

        {/* `lift`: on phones the sheet rises upright as it scrolls in (the phones section of depth.css) */}
        <ul className="plan-index lift lg:col-span-7 lg:col-start-6" aria-label="What the plan covers">
          {plan.groups.map((group) => {
            const Icon = PLAN_ICONS[group.icon]
            return (
              <li key={group.id}>
                <span className="tile" aria-hidden="true">
                  <Icon className="size-[1.125rem]" strokeWidth={1.75} />
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
    </section>
  )
}
