import { Check } from "lucide-react"
import { buttonVariants } from "@/components/ui/button-variants"
import { PLANS } from "@/content/pricing"
import { ONBOARDING_HREF } from "@/content/site"
import { cn } from "@/lib/utils"

// The three plans exactly as /onboarding sells them. On the home page each lists its first few inclusions; the
// pricing page shows them all. The popular plan carries the one filled action.
export function PlanCards({ full = false }: { full?: boolean }) {
  return (
    <ul className="grid gap-5 lg:grid-cols-3">
      {PLANS.map((p) => {
        const features = full ? p.features : p.features.slice(0, 5)
        const more = p.features.length - features.length
        return (
          <li
            key={p.name}
            className={cn(
              "reveal card-spec relative flex flex-col rounded-[24px] p-7 md:p-8",
              p.popular && "border-[color:var(--b-accent)] shadow-[0_0_0_1px_var(--b-accent),var(--b-shadow-lift)]",
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-[1.375rem] font-semibold tracking-[-0.02em]">{p.name}</h3>
              {p.popular && (
                <span className="rounded-full bg-sky-100 px-2.5 py-1 text-[12px] font-semibold text-brand-text">Most popular</span>
              )}
            </div>
            <p className="t-body mt-2 text-[15px]">{p.tagline}</p>
            <p className="mt-7 flex items-baseline gap-2">
              <span className="t-num text-[2.75rem] leading-none font-semibold tracking-[-0.035em]">${p.price}</span>
              <span className="text-[14px] text-slate">a month, inc GST</span>
            </p>
            <p className="mt-3 text-[14px] text-body">
              {p.users} · {p.credits}
            </p>
            <a
              href={ONBOARDING_HREF}
              className={cn(buttonVariants({ variant: p.popular ? "primary" : "outline", size: "md" }), "mt-7 w-full")}
            >
              Start 14-day free trial
            </a>
            <div className="mt-7 border-t hairline pt-6">
              {p.intro && <p className="mb-3 text-[14px] font-semibold text-ink">{p.intro}</p>}
              <ul className="grid gap-2.5">
                {features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-[14px] leading-snug text-body">
                    <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" strokeWidth={2} />
                    {f}
                  </li>
                ))}
              </ul>
              {more > 0 && <p className="mt-3 text-[13px] text-slate">and {more} more</p>}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
