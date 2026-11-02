import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { process } from "@/content/home"

// 04 · How we work, on the first navy band: the turn from "what" to "who". The five steps are a real sequence, so
// they carry their numbers.
export function ProcessBand() {
  return (
    <section className="section band-navy dark" data-band="navy" aria-labelledby="process-title">
      <div className="container-b">
        <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-8">
          <h2 id="process-title" className="t-h2 md:col-span-5">
            {process.title}
          </h2>
          <p className="t-lede md:col-span-6 md:col-start-7">{process.intro}</p>
        </div>
        <ol className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {process.steps.map((s, i) => (
            <li key={s.name} className="reveal border-t hairline pt-6">
              <p className="t-quiet t-num">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 text-[1.375rem] font-semibold tracking-[-0.02em]">{s.name}</h3>
              <p className="t-body mt-2 text-[15px]">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="reveal glass mt-16 flex flex-col gap-6 rounded-[24px] p-7 md:flex-row md:items-center md:justify-between md:p-9">
          <div>
            <h3 className="text-[1.25rem] font-semibold tracking-[-0.015em]">{process.engineering.title}</h3>
            <p className="t-body mt-2 max-w-[60ch]">{process.engineering.text}</p>
          </div>
          <Link href="/contact" className="link-quiet inline-flex shrink-0 items-center gap-1.5 font-medium">
            Talk to an engineer <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
