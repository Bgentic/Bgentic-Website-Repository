import { Plus } from "lucide-react"

// Native <details>: keyboard and screen-reader behaviour for free, a height transition where the browser supports
// animating ::details-content, and an instant open everywhere else.
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="border-t hairline">
      {items.map((item) => (
        <details key={item.q} className="faq-item border-b hairline">
          <summary className="flex items-start justify-between gap-6 py-6 text-[1.0625rem] font-semibold tracking-[-0.01em]">
            {item.q}
            <Plus className="faq-mark mt-0.5 size-5 shrink-0 text-slate" aria-hidden="true" strokeWidth={1.75} />
          </summary>
          <p className="t-body max-w-[64ch] pb-6">{item.a}</p>
        </details>
      ))}
    </div>
  )
}
