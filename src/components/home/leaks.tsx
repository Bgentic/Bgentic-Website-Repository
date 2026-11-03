import { ColorChangeCard, ColorChangeCards, ColorChangeHint } from "@/components/ui/color-change-card"
import { SectionHeader } from "@/components/site/section-header"
import { leaks } from "@/content/home"

// 01 · Name the problem before selling the fix. Four leaks as colour-change cards: each names a problem at rest over
// a photograph of someone living it, and turned on shows what we build instead over an image of the fix.
export function Leaks() {
  return (
    <section className="section lit-b edge" aria-labelledby="leaks-title">
      <div className="container-b">
        <SectionHeader id="leaks-title" title={leaks.title} intro={leaks.intro} align="center" />
        <div className="mt-12">
          <ColorChangeHint />
          <ColorChangeCards>
            {leaks.rows.map((row, i) => (
              <li key={row.problem} className="reveal">
                <ColorChangeCard
                  index={i + 1}
                  images={row.images}
                  problem={{ heading: row.problem, text: row.detail }}
                  solution={{ heading: row.fix, text: row.how }}
                />
              </li>
            ))}
          </ColorChangeCards>
        </div>
      </div>
    </section>
  )
}
