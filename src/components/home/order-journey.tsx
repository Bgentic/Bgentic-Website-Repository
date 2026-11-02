import { SectionHeader } from "@/components/site/section-header"
import { journey } from "@/content/home"

// 03 · See it working: one trade order, minute by minute, set as the order record it would be in the system.
export function OrderJourney() {
  const last = journey.steps[journey.steps.length - 1]
  return (
    <section className="section lit-b edge" aria-labelledby="journey-title">
      <div className="container-b">
        <SectionHeader id="journey-title" title={journey.title} intro={journey.intro} />
        <div className="reveal card-spec mt-16 overflow-hidden rounded-[24px]">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b hairline px-6 py-4 md:px-8">
            <p className="text-sm">
              <span className="font-semibold text-ink">Order SO-48211</span>
              <span className="text-slate"> · {journey.customer}</span>
            </p>
            <span className="rounded-full border border-line px-2 py-0.5 text-[11px] font-medium text-slate">Example</span>
            <span className="status-chip ml-auto" data-tone={last.tone}>
              {last.status}
            </span>
          </div>
          <ol className="relative">
            {journey.steps.map((s, i) => (
              <li
                key={s.time}
                className="grid grid-cols-[4.75rem_1fr] gap-x-5 gap-y-1 px-6 py-6 md:grid-cols-[7.5rem_14rem_1fr_auto] md:items-baseline md:gap-x-8 md:px-8"
                style={{ borderTop: i ? "1px solid var(--b-line)" : undefined }}
              >
                <p className="t-num text-[15px] font-semibold text-ink">{s.time}</p>
                <p className="text-[13px] text-slate md:order-none">{s.who}</p>
                <div className="col-start-2 md:col-start-auto">
                  <h3 className="text-[15px] font-semibold text-ink">{s.title}</h3>
                  <p className="t-body mt-1 text-[15px]">{s.text}</p>
                </div>
                <span className="status-chip col-start-2 mt-2 justify-self-start md:col-start-auto md:mt-0" data-tone={s.tone}>
                  {s.status}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
