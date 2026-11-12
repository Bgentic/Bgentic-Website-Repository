import { CalendarDays, Inbox, Receipt, Repeat, type LucideIcon } from "lucide-react"
import { SectionHeader } from "@/components/site/section-header"
import { WEEK_SCENES } from "@/components/home/week-scenes"
import { leaks } from "@/content/home"

const ICON: Record<(typeof leaks.rows)[number]["key"], LucideIcon> = {
  leads: Inbox,
  calendars: CalendarDays,
  payments: Receipt,
  nurture: Repeat,
}

// 01 · Where the week goes: name the problem before selling the fix. Four places the hours go (leads, calendars,
// payments and invoicing, nurture sequences), each a cream paper card: an icon, the name and the problem, then at its
// foot a faded glimpse of that problem on a real screen (components/home/week-scenes). Static: nothing to hover, turn
// or wait for. Styles: the 01 section of styles/depth.css.
export function Leaks() {
  return (
    <section className="section paper" aria-labelledby="leaks-title">
      <div className="container-b">
        <SectionHeader id="leaks-title" title={leaks.title} intro={leaks.intro} align="center" />
        {/* `stack`: on phones the cards stack as you scroll (the phones section of depth.css) */}
        <ul className="week stack mt-12">
          {leaks.rows.map((row) => {
            const Icon = ICON[row.key]
            const Scene = WEEK_SCENES[row.key]
            return (
              <li key={row.key}>
                <article className="week-card">
                  <div className="week-head">
                    <span className="tile" aria-hidden="true">
                      <Icon className="size-[1.125rem]" />
                    </span>
                    <h3 className="week-name">{row.name}</h3>
                  </div>
                  <p className="week-problem">{row.problem}</p>
                  <div className="week-scene" aria-hidden="true">
                    <Scene />
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
