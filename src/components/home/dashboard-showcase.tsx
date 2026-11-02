import {
  BarChart3,
  CalendarDays,
  CreditCard,
  Inbox,
  KanbanSquare,
  Search,
  Star,
  Workflow,
} from "lucide-react"
import { LiveDesk } from "@/components/ui/live-desk"
import { desk, deskEvents } from "@/content/home"

// The hero's product shot: one connected app, shown as a glowing frosted-glass window with the pipeline open, and
// the live desk floating in front of it as a second depth layer. Example data throughout (the businesses are the
// fictional ones from the old site's CRM preview), labelled as such.
const NAV = [
  { icon: Inbox, label: "Inbox", count: 4 },
  { icon: CalendarDays, label: "Calendar" },
  { icon: KanbanSquare, label: "Pipeline", active: true },
  { icon: CreditCard, label: "Payments" },
  { icon: Star, label: "Reviews" },
  { icon: Workflow, label: "Automations" },
  { icon: BarChart3, label: "Reports" },
]

type Deal = { name: string; what: string; value: string; who: string; hot?: boolean }
const COLUMNS: { stage: string; total: string; deals: Deal[] }[] = [
  {
    stage: "New lead",
    total: "$4,200",
    deals: [
      { name: "Brightwater Plumbing", what: "Service plan", value: "$1,200", who: "HB" },
      { name: "Northgate Legal", what: "CRM set-up", value: "$3,000", who: "MN" },
    ],
  },
  {
    stage: "Contacted",
    total: "$6,500",
    deals: [
      { name: "Summit Fitouts", what: "Monthly plan", value: "$3,500", who: "ER" },
      { name: "Harbour Dental Group", what: "Bookings", value: "$3,000", who: "JO" },
    ],
  },
  {
    stage: "Qualified",
    total: "$12,000",
    deals: [{ name: "Coastal Brew Supply", what: "Trade portal", value: "$12,000", who: "PN", hot: true }],
  },
  {
    stage: "Proposal sent",
    total: "$8,400",
    deals: [{ name: "Evergreen Landscapes", what: "Automations", value: "$8,400", who: "TB" }],
  },
]

const STATS = [
  { label: "Open deals", value: "6" },
  { label: "Booked this week", value: "14" },
  { label: "Paid this week", value: "$6,480" },
  { label: "Follow-ups due", value: "3" },
]

export function DashboardShowcase() {
  return (
    <div className="dash-wrap mx-auto mt-16 max-w-[68rem] md:mt-20 xl:mb-16">
      <div className="dash-glow" aria-hidden="true" />
      <figure className="dash" aria-label="Example: the Bgentic app with the sales pipeline open">
        <div className="dash-line flex items-center gap-3 border-b px-4 py-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-[color:var(--b-line-strong)]" />
            <span className="size-2.5 rounded-full bg-[color:var(--b-line-strong)]" />
            <span className="size-2.5 rounded-full bg-[color:var(--b-line-strong)]" />
          </span>
          <span className="mx-auto hidden items-center gap-2 rounded-full border border-[color:var(--b-line)] px-3 py-1 text-[12px] text-slate sm:flex">
            <Search className="size-3" aria-hidden="true" />
            app.bgentic.io
          </span>
          <span className="ml-auto rounded-full border border-[color:var(--b-line)] px-2 py-0.5 text-[11px] font-medium text-slate sm:ml-0">
            Example
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[13rem_1fr]">
          <aside className="dash-line hidden border-r p-3 md:block" aria-hidden="true">
            <p className="px-2 pt-1 pb-3 text-[13px] font-semibold text-ink">Bgentic</p>
            <ul className="grid gap-0.5">
              {NAV.map(({ icon: Icon, label, count, active }) => (
                <li
                  key={label}
                  className={
                    "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-[13px] " +
                    (active ? "bg-[color:var(--b-sky-100)] font-medium text-ink" : "text-slate")
                  }
                >
                  <Icon className="size-4" strokeWidth={1.75} />
                  {label}
                  {count && (
                    <span className="ml-auto rounded-full bg-brand px-1.5 text-[10px] font-semibold leading-4 text-white">{count}</span>
                  )}
                </li>
              ))}
            </ul>
          </aside>
          <div className="min-w-0 p-4 md:p-5" aria-hidden="true">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-[15px] font-semibold tracking-[-0.01em] text-ink">Sales pipeline</p>
              <p className="text-[12px] text-slate">6 opportunities · $31,100</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="dash-card px-3 py-2.5">
                  <p className="text-[11px] text-slate">{s.label}</p>
                  <p className="t-num mt-0.5 text-[17px] font-semibold tracking-[-0.02em] text-ink">{s.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
              {COLUMNS.map((col, ci) => (
                <div key={col.stage} className={ci > 1 ? "hidden lg:block" : ""}>
                  <div className="flex items-baseline justify-between px-1">
                    <p className="text-[12px] font-semibold text-ink">{col.stage}</p>
                    <p className="t-num text-[11px] text-slate">{col.total}</p>
                  </div>
                  <ul className="mt-2 grid gap-2">
                    {col.deals.map((d) => (
                      <li key={d.name} className="dash-card p-3">
                        <p className="truncate text-[12.5px] font-semibold text-ink">{d.name}</p>
                        <p className="mt-0.5 text-[11.5px] text-slate">{d.what}</p>
                        <div className="mt-2.5 flex items-center justify-between">
                          <span className="t-num text-[12px] font-semibold text-ink">{d.value}</span>
                          <span
                            className={
                              "grid size-5 place-items-center rounded-full text-[9px] font-semibold " +
                              (d.hot ? "bg-brand text-white" : "bg-[color:var(--b-fill)] text-slate")
                            }
                          >
                            {d.who}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </figure>
      {/* The live desk floats in front of the window on wide screens: the app at work, a layer nearer the eye. It hangs
          off the window's corner, below the stats row, so the pipeline it covers is only the last column. */}
      <div className="absolute -right-16 -bottom-24 hidden w-[21rem] xl:block 2xl:-right-24">
        <LiveDesk events={deskEvents} business={desk.business} day={desk.day} height="17rem" />
      </div>
    </div>
  )
}
