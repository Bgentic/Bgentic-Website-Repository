import { ArrowRight, Check, Minus } from "lucide-react"
import { SectionHeader } from "@/components/site/section-header"
import { leaks } from "@/content/home"

// 01 · Name the problem before selling the fix. Read as a two-column ledger: what happens now, what we build instead.
export function Leaks() {
  return (
    <section className="section lit-b edge" aria-labelledby="leaks-title">
      <div className="container-b">
        <SectionHeader id="leaks-title" title={leaks.title} intro={leaks.intro} />
        <div className="mt-16 border-t hairline">
          <div className="hidden grid-cols-12 gap-8 py-4 text-sm text-slate md:grid" aria-hidden="true">
            <span className="col-span-5">What happens now</span>
            <span className="col-span-6 col-start-7">What we build instead</span>
          </div>
          <ol>
            {leaks.rows.map((row) => (
              <li key={row.problem} className="reveal grid gap-6 border-t hairline py-9 md:grid-cols-12 md:gap-8">
                <div className="flex gap-4 md:col-span-5">
                  <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-fill text-slate" aria-hidden="true">
                    <Minus className="size-3.5" strokeWidth={2} />
                  </span>
                  <div>
                    <h3 className="t-h3">
                      <span className="sr-only">Now: </span>
                      {row.problem}
                    </h3>
                    <p className="t-body mt-2 max-w-[40ch]">{row.detail}</p>
                  </div>
                </div>
                <ArrowRight
                  className="mt-1.5 hidden size-5 justify-self-center text-faint md:col-span-2 md:col-start-6 md:block"
                  aria-hidden="true"
                  strokeWidth={1.5}
                />
                <div className="flex gap-4 md:col-span-5 md:col-start-8">
                  <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-success-tint text-success-ink" aria-hidden="true">
                    <Check className="size-3.5" strokeWidth={2.25} />
                  </span>
                  <div>
                    <h3 className="t-h3">
                      <span className="sr-only">With Bgentic: </span>
                      {row.fix}
                    </h3>
                    <p className="t-body mt-2 max-w-[44ch]">{row.how}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
