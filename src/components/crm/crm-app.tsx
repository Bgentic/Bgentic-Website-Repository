"use client"
// The app in "Every tool you juggle": Bgentic's CRM rebuilt in Bgentic tokens (dark, glass), every sidebar tab live.
// Picking a tab swaps the main view, which rises in; the highlight glides to it on a spring and a toast confirms it.
// The sidebar is a vertical tablist (arrow keys, Home and End move and choose); only the tabs take focus. It's drawn
// at 1600 x 1000 and scaled to fit its window, so it stays sharp at any size. Example data: content/crm-demo.ts.
// Styles: styles/crm.css.
import * as React from "react"
import {
  Award,
  Bell,
  Bot,
  CalendarDays,
  ChartLine,
  CreditCard,
  Globe,
  HardDrive,
  LayoutGrid,
  Lock,
  Megaphone,
  MessageSquare,
  Phone,
  Rocket,
  Search,
  Settings,
  Sparkles,
  SquareKanban,
  Star,
  Users,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react"
import { VIEWS, type ViewId } from "@/components/crm/crm-views"
import { crmDemo } from "@/content/crm-demo"

const W = 1600 // the drawing's width; it's 1000 tall (styles/crm.css)
const ROW = 41 // a tab's height and the gap under it, for the highlight's glide

const NAV: { id: ViewId; label: string; icon: LucideIcon; beta?: boolean }[] = [
  { id: "launchpad", label: "Launchpad", icon: Rocket },
  { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { id: "conversations", label: "Conversations", icon: MessageSquare },
  { id: "calendars", label: "Calendars", icon: CalendarDays },
  { id: "contacts", label: "Contacts", icon: Users },
  { id: "opportunities", label: "Opportunities", icon: SquareKanban },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "ai-studio", label: "AI Studio", icon: Sparkles, beta: true },
  { id: "ai-agents", label: "AI Agents", icon: Bot },
  { id: "marketing", label: "Marketing", icon: Megaphone },
  { id: "automation", label: "Automation", icon: Workflow },
  { id: "sites", label: "Sites", icon: Globe },
  { id: "memberships", label: "Memberships", icon: Award },
  { id: "media-storage", label: "Media Storage", icon: HardDrive },
  { id: "reputation", label: "Reputation", icon: Star },
  { id: "reporting", label: "Reporting", icon: ChartLine },
]
const ALL: { id: ViewId; label: string; icon: LucideIcon }[] = [...NAV, { id: "settings", label: "Settings", icon: Settings }]

const BRAND = (
  <svg viewBox="9.17 10.06 20.34 28.28" width="18" height="25" aria-hidden="true">
    <path
      fill="#fff"
      d="M24.45,20.88c.75-1.07,1.2-2.36,1.2-3.77,0-3.6-2.9-6.51-6.49-6.55h0s-7.45,0-7.45,0c-1.13,0-2.04.91-2.04,2.04v16.19l8.99,9.05h.5s.51,0,.51,0c4.87,0,9.06-3.72,9.33-8.58.2-3.58-1.69-6.74-4.55-8.39Z"
    />
    <path fill="#7fb0f7" d="M16.74,28.79h-7.07s8.99,9.05,8.99,9.05v-7.14c0-1.06-.86-1.92-1.92-1.92Z" />
  </svg>
)

/** the scale that fits the 1600px drawing to its box */
function useFit(ref: React.RefObject<HTMLDivElement | null>) {
  const [k, setK] = React.useState(0.7)
  React.useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setK(e.contentRect.width / W))
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref])
  return k
}

export function CrmApp() {
  const box = React.useRef<HTMLDivElement>(null)
  const k = useFit(box)
  const [active, setActive] = React.useState<ViewId>("opportunities")
  const [toast, setToast] = React.useState(0)
  const tabs = React.useRef<Partial<Record<ViewId, HTMLButtonElement | null>>>({})
  const uid = React.useId()

  const choose = (id: ViewId, focus = false) => {
    if (id !== active) setToast((n) => n + 1)
    setActive(id)
    if (focus) tabs.current[id]?.focus()
  }
  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = ALL.findIndex((t) => t.id === active)
    const to = { ArrowDown: i + 1, ArrowUp: i - 1, Home: 0, End: ALL.length - 1 }[e.key]
    if (to === undefined) return
    e.preventDefault()
    choose(ALL[(to + ALL.length) % ALL.length].id, true)
  }

  const view = VIEWS[active]
  const { View } = view
  const index = NAV.findIndex((t) => t.id === active)
  const label = ALL.find((t) => t.id === active)!.label
  const Icon = ALL.find((t) => t.id === active)!.icon

  const tab = ({ id, label, icon: TabIcon, beta }: { id: ViewId; label: string; icon: LucideIcon; beta?: boolean }) => (
    <button
      key={id}
      ref={(el) => {
        tabs.current[id] = el
      }}
      type="button"
      role="tab"
      id={`${uid}-${id}`}
      aria-selected={id === active}
      aria-controls={`${uid}-panel`}
      tabIndex={id === active ? 0 : -1}
      className="c-tab"
      data-foot={id === "settings" || undefined}
      onClick={() => choose(id)}
    >
      <TabIcon size={17} strokeWidth={1.75} aria-hidden="true" />
      <span>{label}</span>
      {beta && <em className="c-beta">Beta</em>}
    </button>
  )

  return (
    <div ref={box} className="crm" role="group" aria-label="Example: the Bgentic app. Pick a section in its sidebar to see it.">
      <div className="crm-canvas" style={{ transform: `scale(${k})` }}>
        <div className="c-bar" aria-hidden="true">
          <span className="c-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="c-url">
            <Lock size={12} strokeWidth={2} />
            app.bgentic.io
          </span>
          <span className="c-hint">
            <i />
            Example workspace
            <span className="c-sep" />
            Pick any tab to explore
          </span>
        </div>
        <div className="c-app">
          <aside className="c-side">
            <div className="c-brand">
              <span className="c-mark">{BRAND}</span>
              <span>
                <b>{crmDemo.workspace.name}</b>
                <small>{crmDemo.workspace.place}</small>
              </span>
            </div>
            <div className="c-search" aria-hidden="true">
              <Search size={15} strokeWidth={1.75} />
              <span>Search</span>
              <kbd>ctrl K</kbd>
              <Zap size={14} strokeWidth={2} className="c-zap" />
            </div>
            <div role="tablist" aria-orientation="vertical" aria-label="App sections" onKeyDown={onKeyDown} className="c-tabbox">
              <div className="c-nav">
                <span className="c-hl" style={{ transform: `translateY(${Math.max(0, index) * ROW}px)`, opacity: index < 0 ? 0 : 1 }} />
                {NAV.map(tab)}
              </div>
              <div className="c-side-foot">{tab(ALL[ALL.length - 1])}</div>
            </div>
          </aside>
          <main className="c-main">
            <header className="c-top">
              <span className="c-top-ic" aria-hidden="true">
                <Icon size={18} strokeWidth={1.75} />
              </span>
              <div>
                <h3>{view.title}</h3>
                {"sub" in view && <p>{view.sub}</p>}
              </div>
              {"tabs" in view && (
                <>
                  <span className="c-vr" />
                  <nav className="c-tabs" aria-hidden="true">
                    {view.tabs.map((t, i) => (
                      <span key={t} className={i === 0 ? "on" : undefined}>
                        {t}
                      </span>
                    ))}
                  </nav>
                </>
              )}
              <div className="c-acts" aria-hidden="true">
                <span className="c-act c-act-call">
                  <Phone size={16} />
                </span>
                <span className="c-act">
                  <Sparkles size={16} />
                </span>
                <span className="c-act c-act-ping">
                  <Bell size={16} />
                </span>
                <span className="c-act c-act-me">{crmDemo.workspace.me}</span>
              </div>
            </header>
            <div key={active} id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-${active}`} className="c-view">
              <View />
            </div>
            {toast > 0 && (
              <p key={toast} className="c-toast" aria-hidden="true">
                <i />
                Opened {label}
              </p>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
