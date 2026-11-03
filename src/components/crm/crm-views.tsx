// The views behind each tab of the example CRM (crm-app.tsx). Drawn at 1600 x 1000 and scaled to fit the window, so
// sizes here are design pixels. Only the sidebar tabs are controls; everything in a view is a picture of the app,
// not a working form, so none of it takes focus. Data: content/crm-demo.ts. Styles: styles/crm.css.
import * as React from "react"
import {
  ArrowUpDown,
  BookOpen,
  Bot,
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  CircleDashed,
  Clock,
  FileText,
  Folder,
  Globe,
  Image as ImageIcon,
  LayoutGrid,
  List,
  Mail,
  MessageCircle,
  MessageSquare,
  Mic,
  Paperclip,
  Phone,
  PhoneMissed,
  Plus,
  Search,
  Send,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  SquareCheck,
  Tag,
  Upload,
  Video,
  Zap,
} from "lucide-react"
import { crmDemo as d, type Tone } from "@/content/crm-demo"
import { cn } from "@/lib/utils"

/* ---------------------------------------------------------------- pieces */

const Pill = ({ tone, children }: { tone: Tone; children: React.ReactNode }) => (
  <span className="c-pill" data-tone={tone}>
    {children}
  </span>
)
const Av = ({ i, size }: { i: string; size?: "sm" | "lg" }) => <span className={cn("c-av", size && `c-av-${size}`)}>{i}</span>
const Btn = ({ kind = "ghost", children }: { kind?: "primary" | "ghost"; children: React.ReactNode }) => (
  <span className="c-btn" data-kind={kind}>
    {children}
  </span>
)
const Card = ({ title, aside, className, children }: { title?: string; aside?: React.ReactNode; className?: string; children: React.ReactNode }) => (
  <div className={cn("c-card", className)}>
    {title && (
      <div className="c-card-h">
        <span>{title}</span>
        {aside}
      </div>
    )}
    {children}
  </div>
)
const Stat = ({ label, value, note }: { label: string; value: string; note?: string }) => (
  <div className="c-card c-stat">
    <p>{label}</p>
    <b>{value}</b>
    {note && <small>{note}</small>}
  </div>
)
const Find = ({ text, w = 300 }: { text: string; w?: number }) => (
  <span className="c-find" style={{ width: w }}>
    <Search size={15} strokeWidth={1.75} />
    {text}
  </span>
)
const Track = ({ value }: { value: number }) => (
  <span className="c-track">
    <i style={{ width: `${Math.round(value * 100)}%` }} />
  </span>
)

const STATUS: Record<string, Tone> = {
  Paid: "green",
  Sent: "blue",
  Overdue: "red",
  Draft: "grey",
  Active: "green",
  Scheduled: "violet",
  Published: "green",
  "In review": "amber",
  Opened: "blue",
  "Clicked through": "green",
}

/* ---------------------------------------------------------------- the views */

function Launchpad() {
  const done = d.launchpad.steps.filter((s) => s.done).length
  return (
    <div className="grid h-full grid-cols-[1fr_400px] gap-4">
      <Card title="Get your workspace ready" aside={<span className="c-muted text-[13px]">{done} of {d.launchpad.steps.length} done</span>} className="p-6">
        <div className="mt-4">
          <Track value={done / d.launchpad.steps.length} />
        </div>
        <ul className="mt-6 grid gap-2.5">
          {d.launchpad.steps.map((s) => (
            <li key={s.text} className="c-step" data-done={s.done || undefined} data-now={s.now || undefined}>
              <span className="c-step-mark">{s.done ? <Check size={14} strokeWidth={2.5} /> : null}</span>
              <span className="flex-1">{s.text}</span>
              {s.now ? <Btn kind="primary">Continue</Btn> : s.done ? <span className="c-muted text-[12.5px]">Done</span> : <Btn>Start</Btn>}
            </li>
          ))}
        </ul>
      </Card>
      <div className="grid content-start gap-4">
        <Card className="p-6">
          <span className="c-tile">
            <BookOpen size={18} strokeWidth={1.75} />
          </span>
          <p className="mt-4 text-[16px] font-semibold">{d.launchpad.training.title}</p>
          <p className="c-body mt-1 text-[13.5px]">
            {d.launchpad.training.when} with {d.launchpad.training.with}. We&rsquo;ll walk your team through the pipeline,
            the inbox and the mobile app.
          </p>
          <div className="mt-5 flex gap-2">
            <Btn kind="primary">
              <Calendar size={15} /> Add to calendar
            </Btn>
            <Btn>Reschedule</Btn>
          </div>
        </Card>
        <Card className="p-6">
          <span className="c-tile">
            <Smartphone size={18} strokeWidth={1.75} />
          </span>
          <p className="mt-4 text-[16px] font-semibold">Get the mobile app</p>
          <p className="c-body mt-1 text-[13.5px]">Reply to customers, take payments and see your day from your phone.</p>
          <div className="mt-5">
            <Btn>
              <Send size={15} /> Text me the link
            </Btn>
          </div>
        </Card>
      </div>
    </div>
  )
}

function Dashboard() {
  const max = Math.max(...d.lanes.map((l) => Number(l.total.replace(/[^\d.]/g, ""))))
  return (
    <div className="grid content-start gap-4">
      <div className="grid grid-cols-4 gap-4">
        {d.dashboard.stats.map((s) => (
          <Stat key={s.label} {...s} />
        ))}
      </div>
      <div className="grid grid-cols-[1.15fr_1fr] gap-4">
        <Card title="Pipeline by stage" aside={<Pill tone="grey">Marketing pipeline</Pill>} className="p-5">
          <ul className="mt-5 grid gap-4">
            {d.lanes.map((l) => {
              const v = Number(l.total.replace(/[^\d.]/g, ""))
              return (
                <li key={l.stage} className="grid grid-cols-[120px_1fr_110px] items-center gap-4 text-[13.5px]">
                  <span className="c-body">{l.stage}</span>
                  <Track value={Math.max(0.03, v / max)} />
                  <span className="text-right font-semibold tabular-nums">{l.total}</span>
                </li>
              )
            })}
          </ul>
        </Card>
        <Card title="Tasks" aside={<Pill tone="blue">2 due today</Pill>} className="p-5">
          <ul className="mt-3">
            {d.dashboard.tasks.map((t) => (
              <li key={t.text} className="c-row" data-done={t.done || undefined}>
                <span className="c-check">{t.done && <Check size={12} strokeWidth={3} />}</span>
                <span className="flex-1">{t.text}</span>
                <span className="c-muted text-[12px]">{t.due}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
      <Card title="Recent activity" className="p-5">
        <ul className="mt-2">
          {d.dashboard.activity.map((a) => (
            <li key={a.text} className="c-row">
              <Av i={a.who} size="sm" />
              <span className="flex-1">{a.text}</span>
              <span className="c-muted text-[12px]">{a.when}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}

const CHANNEL: Record<string, React.ReactNode> = {
  SMS: <MessageSquare size={12} strokeWidth={2} />,
  Email: <Mail size={12} strokeWidth={2} />,
  Messenger: <MessageCircle size={12} strokeWidth={2} />,
  Call: <Phone size={12} strokeWidth={2} />,
}

function Conversations() {
  return (
    <div className="grid h-full grid-cols-[380px_1fr] gap-4">
      <Card className="flex flex-col p-3">
        <div className="flex items-center gap-2 p-2">
          <Find text="Search conversations" w={250} />
          <span className="c-chip">
            <SlidersHorizontal size={14} /> Unread
          </span>
        </div>
        <ul className="mt-1 grid gap-0.5">
          {d.threads.map((t, i) => (
            <li key={t.name} className="c-thread" data-on={i === 0 || undefined}>
              <Av i={t.initials} />
              <span className="min-w-0 flex-1">
                <b>{t.name}</b>
                <small>
                  <span className="c-chan">{CHANNEL[t.channel]}</span>
                  {t.last}
                </small>
              </span>
              <span className="c-thread-t">
                {t.when}
                {t.unread && <i />}
              </span>
            </li>
          ))}
        </ul>
      </Card>
      <Card className="flex flex-col">
        <div className="flex items-center gap-3 border-b border-white/[0.06] px-6 py-4">
          <Av i="HB" />
          <div>
            <p className="text-[15px] font-semibold">{d.thread.name}</p>
            <p className="c-muted text-[12.5px]">{d.thread.detail}</p>
          </div>
          <span className="ml-auto flex gap-2">
            <Pill tone="blue">
              <Sparkles size={12} /> AI agent on
            </Pill>
            <span className="c-act">
              <Phone size={15} />
            </span>
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-3 px-7 py-6">
          {d.thread.messages.map((m, i) =>
            m.kind === "system" ? (
              <p key={i} className="c-sys">
                {i === 0 ? <PhoneMissed size={13} /> : <Calendar size={13} />}
                {m.text}
              </p>
            ) : (
              <div key={i} className="c-msg" data-kind={m.kind}>
                {m.kind === "ai" && (
                  <span className="c-msg-mk">
                    <Sparkles size={12} strokeWidth={2} />
                  </span>
                )}
                <p>{m.text}</p>
              </div>
            ),
          )}
        </div>
        <div className="flex items-center gap-3 border-t border-white/[0.06] px-5 py-4">
          <span className="c-chip">
            <MessageSquare size={14} /> SMS <ChevronDown size={13} />
          </span>
          <span className="c-find flex-1">Type a message…</span>
          <Btn kind="primary">
            <Send size={15} /> Send
          </Btn>
        </div>
      </Card>
    </div>
  )
}

const HOUR = 72
function Calendars() {
  const { days, events, week, now } = d.calendar
  const hours = Array.from({ length: 10 }, (_, i) => 8 + i)
  const label = (h: number) => `${h > 12 ? h - 12 : h}${h >= 12 ? " pm" : " am"}`
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center gap-3">
        <Btn>Today</Btn>
        <span className="c-act">
          <ChevronLeft size={16} />
        </span>
        <span className="c-act">
          <ChevronRight size={16} />
        </span>
        <p className="ml-2 text-[16px] font-semibold">{week}</p>
        <span className="c-seg ml-auto">
          <span>Day</span>
          <span className="on">Week</span>
          <span>Month</span>
        </span>
        <Btn kind="primary">
          <Plus size={15} strokeWidth={2.25} /> New booking
        </Btn>
      </div>
      <Card className="flex-1 overflow-hidden">
        <div className="c-cal-head">
          <span />
          {days.map((dy) => (
            <span key={dy.name} data-today={dy.today || undefined}>
              {dy.name} <b>{dy.date}</b>
            </span>
          ))}
        </div>
        <div className="c-cal" style={{ height: hours.length * HOUR }}>
          <div className="c-cal-times">
            {hours.map((h) => (
              <span key={h} style={{ top: (h - 8) * HOUR }}>
                {label(h)}
              </span>
            ))}
          </div>
          {days.map((dy, di) => (
            <div key={dy.name} className="c-cal-day" style={{ backgroundSize: `100% ${HOUR}px` }}>
              {events
                .filter((e) => e.day === di)
                .map((e) => (
                  <div
                    key={e.title + e.start}
                    className="c-evt"
                    data-tone={e.tone}
                    style={{ top: (e.start - 8) * HOUR + 2, height: (e.end - e.start) * HOUR - 4 }}
                  >
                    <b>{e.title}</b>
                    <span>{e.who}</span>
                  </div>
                ))}
              {dy.today && <span className="c-now" style={{ top: (now - 8) * HOUR }} />}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

function Contacts() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2.5">
        <span className="c-chip on">All contacts · 248</span>
        <span className="c-chip">Clients</span>
        <span className="c-chip">Leads</span>
        <span className="c-chip">
          <SlidersHorizontal size={14} /> Filters
        </span>
        <span className="ml-auto flex gap-2.5">
          <Find text="Search contacts" />
          <Btn kind="primary">
            <Plus size={15} strokeWidth={2.25} /> Add contact
          </Btn>
        </span>
      </div>
      <Card className="overflow-hidden">
        <table className="c-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Business</th>
              <th>Phone</th>
              <th>Tags</th>
              <th>Last activity</th>
              <th className="text-right">When</th>
            </tr>
          </thead>
          <tbody>
            {d.contacts.map((c) => (
              <tr key={c.name}>
                <td>
                  <span className="flex items-center gap-3 font-semibold">
                    <Av i={c.initials} size="sm" />
                    {c.name}
                  </span>
                </td>
                <td className="c-body">{c.company}</td>
                <td className="c-body tabular-nums">{c.phone}</td>
                <td>
                  <span className="flex gap-1.5">
                    {c.tags.map((t) => (
                      <Pill key={t} tone={t === "Client" ? "green" : t === "Lead" ? "blue" : "grey"}>
                        {t}
                      </Pill>
                    ))}
                  </span>
                </td>
                <td className="c-body">{c.last}</td>
                <td className="c-muted text-right">{c.when}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

function Opportunities() {
  return (
    <div className="-mx-[26px] -my-[22px] flex flex-col">
      <div className="c-tool">
        <span className="c-sel">
          Marketing Pipeline
          <ChevronDown size={16} />
        </span>
        <Pill tone="blue">6 opportunities</Pill>
        <span className="ml-auto flex items-center gap-2.5">
          <span className="c-seg">
            <span className="on">
              <LayoutGrid size={16} />
            </span>
            <span>
              <List size={16} />
            </span>
          </span>
          <Btn kind="primary">
            <Plus size={16} strokeWidth={2.25} />
            Add opportunity
          </Btn>
        </span>
      </div>
      <div className="c-filters">
        <span className="c-chip on">
          <SlidersHorizontal size={14} />
          Advanced filters (1)
        </span>
        <span className="c-chip">
          <ArrowUpDown size={14} />
          Sort (1)
        </span>
        <span className="ml-auto">
          <Find text="Search opportunities" w={290} />
        </span>
      </div>
      <div className="c-board">
        {d.lanes.map((l) => (
          <section key={l.stage} className="c-lane">
            <div className="c-lane-h">
              <div>
                <h4>{l.stage}</h4>
                <p>
                  {l.deals.length} {l.deals.length === 1 ? "opportunity" : "opportunities"} <b>{l.total}</b>
                </p>
              </div>
              <ChevronRight size={18} />
            </div>
            <div className="grid gap-3 pt-3.5">
              {l.deals.map((k) => (
                <article key={k.title} className="c-deal">
                  <header>
                    <h5>{k.title}</h5>
                    <Av i={k.ini} size="sm" />
                  </header>
                  <dl>
                    <div>
                      <dt>Business:</dt>
                      <dd>{k.biz}</dd>
                    </div>
                    <div>
                      <dt>Value:</dt>
                      <dd className="c-val">{k.value}</dd>
                    </div>
                    <div>
                      <dt>Contact:</dt>
                      <dd>{k.who}</dd>
                    </div>
                  </dl>
                  <footer>
                    <MessageSquare size={15} />
                    <Tag size={15} />
                    <Paperclip size={15} />
                    <span className="c-cnt">{k.n}</span>
                    <SquareCheck size={15} />
                    <Calendar size={15} className="ml-auto" />
                  </footer>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

function Payments() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-4 gap-4">
        {d.payments.stats.map((s) => (
          <Stat key={s.label} {...s} />
        ))}
      </div>
      <div className="flex items-center gap-2.5">
        <span className="c-chip on">All invoices</span>
        <span className="c-chip">Paid</span>
        <span className="c-chip">Outstanding</span>
        <span className="ml-auto flex gap-2.5">
          <Find text="Search invoices" w={260} />
          <Btn kind="primary">
            <Plus size={15} strokeWidth={2.25} /> New invoice
          </Btn>
        </span>
      </div>
      <Card className="overflow-hidden">
        <table className="c-table">
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Client</th>
              <th>For</th>
              <th>Status</th>
              <th>Date</th>
              <th className="text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {d.payments.invoices.map((v) => (
              <tr key={v.no}>
                <td className="font-semibold tabular-nums">{v.no}</td>
                <td>{v.who}</td>
                <td className="c-body">{v.what}</td>
                <td>
                  <Pill tone={STATUS[v.status]}>{v.status}</Pill>
                </td>
                <td className="c-muted">{v.when}</td>
                <td className="text-right font-semibold tabular-nums">{v.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

function AiStudio() {
  return (
    <div className="grid h-full grid-cols-[1fr_440px] gap-4">
      <div className="flex flex-col gap-4">
        <Card className="c-prompt p-6">
          <p className="text-[20px] font-semibold tracking-[-0.01em]">What do you want to build?</p>
          <div className="c-prompt-box mt-4">
            <p>{d.studio.prompt}</p>
            <div className="mt-6 flex items-center gap-2">
              <span className="c-chip">
                <Zap size={14} /> Workflow
              </span>
              <span className="c-chip">
                <Mail size={14} /> Email
              </span>
              <span className="c-chip">
                <MessageSquare size={14} /> SMS
              </span>
              <span className="ml-auto">
                <Btn kind="primary">
                  <Sparkles size={15} /> Generate
                </Btn>
              </span>
            </div>
          </div>
        </Card>
        <p className="c-muted px-1 text-[13px] font-semibold">Start from an idea</p>
        <div className="grid grid-cols-3 gap-3">
          {d.studio.ideas.map((x) => (
            <Card key={x.title} className="p-4">
              <span className="c-tile c-tile-sm">
                <Sparkles size={15} strokeWidth={1.75} />
              </span>
              <p className="mt-3 text-[14px] font-semibold">{x.title}</p>
              <p className="c-body mt-0.5 text-[12.5px]">{x.text}</p>
            </Card>
          ))}
        </div>
      </div>
      <Card title="Generated just now" aside={<Pill tone="violet">Draft</Pill>} className="p-5">
        <ol className="c-seq mt-4">
          {d.studio.result.map((r) => (
            <li key={r.when}>
              <span className="c-seq-dot" />
              <p className="flex items-center gap-2 text-[12.5px] font-semibold">
                {r.when} <Pill tone="grey">{r.channel}</Pill>
              </p>
              <p className="c-body mt-1.5 text-[13.5px]">{r.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-5 flex gap-2">
          <Btn kind="primary">Use this sequence</Btn>
          <Btn>Edit</Btn>
        </div>
      </Card>
    </div>
  )
}

function AiAgents() {
  const KIND: Record<string, React.ReactNode> = {
    Voice: <Mic size={16} strokeWidth={1.75} />,
    Chat: <MessageCircle size={16} strokeWidth={1.75} />,
    SMS: <MessageSquare size={16} strokeWidth={1.75} />,
    Reviews: <Bot size={16} strokeWidth={1.75} />,
  }
  return (
    <div className="grid h-full grid-cols-[1fr_480px] gap-4">
      <div className="grid content-start grid-cols-2 gap-4">
        {d.agents.map((a, i) => (
          <Card key={a.name} className={cn("p-5", i === 0 && "c-card-on")}>
            <div className="flex items-center gap-3">
              <span className="c-tile">{KIND[a.kind]}</span>
              <div className="flex-1">
                <p className="text-[15px] font-semibold">{a.name}</p>
                <p className="c-muted text-[12.5px]">{a.kind}</p>
              </div>
              <span className="c-toggle" data-on={a.on || undefined} />
            </div>
            <p className="c-body mt-4 text-[13.5px]">{a.text}</p>
            <p className="c-muted mt-4 text-[12.5px]">{a.count}</p>
          </Card>
        ))}
      </div>
      <Card title="Receptionist · latest call" aside={<Pill tone="green">Live</Pill>} className="p-5">
        <p className="c-muted mt-1 text-[12.5px]">{d.call.caller}</p>
        <ul className="mt-5 grid gap-3">
          {d.call.lines.map((l, i) => (
            <li key={i} className="c-line" data-who={l.who}>
              <span>{l.who}</span>
              <p>{l.text}</p>
            </li>
          ))}
        </ul>
        <p className="c-sys mt-6">
          <CircleCheck size={13} />
          {d.call.outcome}
        </p>
      </Card>
    </div>
  )
}

function Marketing() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-4">
        {d.marketing.stats.map((s) => (
          <Stat key={s.label} {...s} />
        ))}
      </div>
      <Card className="overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4">
          <p className="text-[14px] font-semibold">Campaigns</p>
          <span className="ml-auto">
            <Btn kind="primary">
              <Plus size={15} strokeWidth={2.25} /> New campaign
            </Btn>
          </span>
        </div>
        <table className="c-table">
          <thead>
            <tr>
              <th>Campaign</th>
              <th>Channel</th>
              <th>Status</th>
              <th className="text-right">Sent</th>
              <th className="text-right">Opened</th>
              <th className="text-right">Clicked</th>
              <th className="text-right">When</th>
            </tr>
          </thead>
          <tbody>
            {d.marketing.campaigns.map((c) => (
              <tr key={c.name}>
                <td className="font-semibold">{c.name}</td>
                <td>
                  <span className="c-body flex items-center gap-2">
                    {c.channel === "Email" ? <Mail size={14} /> : <MessageSquare size={14} />}
                    {c.channel}
                  </span>
                </td>
                <td>
                  <Pill tone={c.status === "Sent" ? "blue" : STATUS[c.status]}>{c.status}</Pill>
                </td>
                <td className="text-right tabular-nums">{c.sent}</td>
                <td className="text-right tabular-nums">{c.opened}</td>
                <td className="text-right tabular-nums">{c.clicked}</td>
                <td className="c-muted text-right">{c.when}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

function Automation() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2.5">
        <span className="c-chip on">All workflows · 7</span>
        <span className="c-chip">
          <Folder size={14} /> Leads
        </span>
        <span className="c-chip">
          <Folder size={14} /> Billing
        </span>
        <span className="ml-auto flex gap-2.5">
          <Find text="Search workflows" w={260} />
          <Btn kind="primary">
            <Plus size={15} strokeWidth={2.25} /> Create workflow
          </Btn>
        </span>
      </div>
      <Card className="overflow-hidden">
        <table className="c-table">
          <thead>
            <tr>
              <th>Workflow</th>
              <th>Starts when</th>
              <th>Status</th>
              <th className="text-right">Runs</th>
              <th className="text-right">Last run</th>
              <th className="w-[80px] text-right">On</th>
            </tr>
          </thead>
          <tbody>
            {d.workflows.map((w) => (
              <tr key={w.name}>
                <td>
                  <span className="flex items-center gap-3 font-semibold">
                    <span className="c-tile c-tile-sm">
                      <Zap size={14} strokeWidth={1.75} />
                    </span>
                    {w.name}
                  </span>
                </td>
                <td className="c-body">{w.trigger}</td>
                <td>
                  <Pill tone={w.on ? "green" : "grey"}>{w.on ? "Active" : "Draft"}</Pill>
                </td>
                <td className="text-right tabular-nums">{w.runs}</td>
                <td className="c-muted text-right">{w.last}</td>
                <td className="text-right">
                  <span className="c-toggle ml-auto" data-on={w.on || undefined} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

function Sites() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2.5">
        <span className="c-chip on">All</span>
        <span className="c-chip">Websites</span>
        <span className="c-chip">Funnels</span>
        <span className="c-chip">Forms</span>
        <span className="ml-auto">
          <Btn kind="primary">
            <Plus size={15} strokeWidth={2.25} /> New site
          </Btn>
        </span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {d.sites.map((s, i) => (
          <Card key={s.name} className="overflow-hidden">
            <div className="c-thumb" data-v={i % 3}>
              <span className="c-thumb-bar">
                <i />
                <i />
                <i />
              </span>
              <span className="c-thumb-hero" />
              <span className="c-thumb-l1" />
              <span className="c-thumb-l2" />
              <span className="c-thumb-cta" />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2">
                <p className="flex-1 truncate text-[14.5px] font-semibold">{s.name}</p>
                <Pill tone={STATUS[s.status] ?? "grey"}>{s.status}</Pill>
              </div>
              <p className="c-muted mt-1 text-[12.5px]">
                {s.kind} · {s.pages} · {s.updated}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function Memberships() {
  return (
    <div className="grid h-full grid-cols-[1fr_400px] gap-4">
      <div className="grid content-start grid-cols-2 gap-4">
        {d.courses.map((c, i) => (
          <Card key={c.title} className="overflow-hidden">
            <div className="c-cover" data-v={i % 4}>
              <BookOpen size={26} strokeWidth={1.5} />
            </div>
            <div className="p-5">
              <p className="text-[15px] font-semibold">{c.title}</p>
              <p className="c-muted mt-1 text-[12.5px]">
                {c.lessons} lessons · {c.members} members
              </p>
              <div className="mt-4 flex items-center gap-3">
                <Track value={c.done} />
                <span className="c-muted text-[12px] tabular-nums">{Math.round(c.done * 100)}%</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <Card title="Recent progress" className="p-5">
        <ul className="mt-2">
          {d.learning.map((a) => (
            <li key={a.text} className="c-row">
              <Av i={a.who} size="sm" />
              <span className="flex-1">{a.text}</span>
              <span className="c-muted text-[12px]">{a.when}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}

function MediaStorage() {
  const FILE: Record<string, React.ReactNode> = {
    image: <ImageIcon size={22} strokeWidth={1.5} />,
    doc: <FileText size={22} strokeWidth={1.5} />,
    video: <Video size={22} strokeWidth={1.5} />,
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="w-[320px]">
          <p className="c-body text-[12.5px]">
            {d.media.used} GB of {d.media.total} GB used
          </p>
          <div className="mt-2">
            <Track value={d.media.used / d.media.total} />
          </div>
        </div>
        <span className="ml-auto flex gap-2.5">
          <Find text="Search files" w={240} />
          <Btn kind="primary">
            <Upload size={15} /> Upload
          </Btn>
        </span>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {d.media.folders.map((f) => (
          <Card key={f.name} className="flex items-center gap-3 p-4">
            <span className="c-tile">
              <Folder size={18} strokeWidth={1.75} />
            </span>
            <span>
              <p className="text-[14px] font-semibold">{f.name}</p>
              <p className="c-muted text-[12px]">{f.files} files</p>
            </span>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-4">
        {d.media.files.map((f) => (
          <Card key={f.name} className="overflow-hidden">
            <div className="c-file" data-kind={f.kind}>
              {FILE[f.kind]}
            </div>
            <div className="px-4 py-3">
              <p className="truncate text-[13.5px] font-semibold">{f.name}</p>
              <p className="c-muted text-[12px]">{f.size}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function Reputation() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-4">
        {d.reputation.stats.map((s) => (
          <Stat key={s.label} {...s} />
        ))}
      </div>
      <div className="grid grid-cols-[1fr_400px] gap-4">
        <Card title="Recent requests" className="overflow-hidden pt-5">
          <table className="c-table mt-3">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Sent by</th>
                <th>Sent</th>
                <th className="text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {d.reputation.requests.map((r) => (
                <tr key={r.name}>
                  <td>
                    <span className="flex items-center gap-3 font-semibold">
                      <Av i={r.initials} size="sm" />
                      {r.name}
                    </span>
                  </td>
                  <td className="c-body">{r.channel}</td>
                  <td className="c-muted">{r.sent}</td>
                  <td className="text-right">
                    <Pill tone={STATUS[r.status]}>{r.status}</Pill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <div className="grid content-start gap-4">
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <span className="c-tile">
                <Clock size={17} strokeWidth={1.75} />
              </span>
              <p className="flex-1 text-[14.5px] font-semibold">Automatic requests</p>
              <span className="c-toggle" data-on />
            </div>
            <p className="c-body mt-4 text-[13.5px]">Sent by SMS two hours after an invoice is paid, with one reminder three days later.</p>
          </Card>
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <span className="c-tile">
                <Globe size={17} strokeWidth={1.75} />
              </span>
              <p className="flex-1 text-[14.5px] font-semibold">Google Business Profile</p>
              <Pill tone="green">Connected</Pill>
            </div>
            <p className="c-body mt-4 text-[13.5px]">Requests link straight to your profile, so leaving a review takes one tap.</p>
          </Card>
        </div>
      </div>
    </div>
  )
}

function Reporting() {
  const { weeks, calls, sources } = d.reporting
  const maxLeads = Math.max(...weeks.map((w) => w.leads))
  const maxCalls = Math.max(...calls.map((c) => c.answered + c.missed))
  return (
    <div className="grid content-start gap-4">
      <div className="grid grid-cols-[1.3fr_1fr] gap-4">
        <Card title="New leads, last 8 weeks" aside={<Pill tone="grey">By week</Pill>} className="p-5">
          <div className="c-chart mt-5">
            {weeks.map((w, i) => (
              <span key={w.label} className="c-col">
                <b>{w.leads}</b>
                <i data-now={i === weeks.length - 1 || undefined} style={{ height: `${(w.leads / maxLeads) * 100}%` }} />
                <small>{w.label}</small>
              </span>
            ))}
          </div>
        </Card>
        <Card title="Leads by source" className="p-5">
          <ul className="mt-6 grid gap-5">
            {sources.map((s) => (
              <li key={s.label} className="grid grid-cols-[90px_1fr_44px] items-center gap-4 text-[13.5px]">
                <span className="c-body">{s.label}</span>
                <Track value={s.share / 100} />
                <span className="text-right font-semibold tabular-nums">{s.share}%</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
      <Card
        title="Calls this week"
        aside={
          <span className="c-muted flex items-center gap-4 text-[12px]">
            <span className="flex items-center gap-1.5">
              <i className="c-key" /> Answered
            </span>
            <span className="flex items-center gap-1.5">
              <i className="c-key" data-missed /> Missed, texted back
            </span>
          </span>
        }
        className="p-5"
      >
        <div className="c-chart c-chart-sm mt-5">
          {calls.map((c) => (
            <span key={c.day} className="c-col">
              <b>{c.answered + c.missed}</b>
              <span className="c-stack" style={{ height: `${((c.answered + c.missed) / maxCalls) * 100}%` }}>
                <i data-missed style={{ flex: c.missed }} />
                <i style={{ flex: c.answered }} />
              </span>
              <small>{c.day}</small>
            </span>
          ))}
        </div>
      </Card>
    </div>
  )
}

function Settings() {
  return (
    <div className="grid h-full grid-cols-[1fr_440px] gap-4">
      <Card title="Business profile" className="p-6">
        <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4">
          {d.settings.profile.map((f) => (
            <label key={f.label} className="grid gap-1.5">
              <span className="c-muted text-[12.5px] font-medium">{f.label}</span>
              <span className="c-field">{f.value}</span>
            </label>
          ))}
        </div>
        <p className="mt-8 text-[14px] font-semibold">Integrations</p>
        <ul className="mt-3 grid grid-cols-2 gap-3">
          {d.settings.integrations.map((x) => (
            <li key={x.name} className="c-integ">
              <span className="c-tile c-tile-sm">
                <Zap size={14} strokeWidth={1.75} />
              </span>
              <span className="flex-1 text-[13.5px] font-semibold">{x.name}</span>
              {x.on ? <Pill tone="green">Connected</Pill> : <Btn>Connect</Btn>}
            </li>
          ))}
        </ul>
      </Card>
      <Card title="Team" aside={<Btn>Invite</Btn>} className="p-6">
        <ul className="mt-4">
          {d.settings.team.map((m) => (
            <li key={m.name} className="c-row">
              <Av i={m.initials} />
              <span className="flex-1">
                <span className="block font-semibold">{m.name}</span>
                <span className="c-muted block text-[12.5px]">{m.role}</span>
              </span>
              <Pill tone="green">
                <CircleDashed size={11} /> Online
              </Pill>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}

export const VIEWS = {
  launchpad: { title: "Launchpad", sub: "Everything to get your workspace running", View: Launchpad },
  dashboard: { title: "Dashboard", sub: "How the business is doing this week", View: Dashboard },
  conversations: { title: "Conversations", sub: "Calls, texts, email and Messenger in one inbox", View: Conversations },
  calendars: { title: "Calendars", sub: "Bookings and availability", View: Calendars },
  contacts: { title: "Contacts", sub: "Everyone you've dealt with, and what happened last", View: Contacts },
  opportunities: { title: "Opportunities", tabs: ["Opportunities", "Forecast", "Pipelines", "Bulk Actions"], View: Opportunities },
  payments: { title: "Payments", sub: "Invoices, plans and text-to-pay", View: Payments },
  "ai-studio": { title: "AI Studio", sub: "Describe it, and Bgentic AI drafts it", View: AiStudio },
  "ai-agents": { title: "AI Agents", sub: "Assistants that answer, book and follow up", View: AiAgents },
  marketing: { title: "Marketing", tabs: ["Campaigns", "Social planner", "Templates"], View: Marketing },
  automation: { title: "Automation", sub: "Workflows that run on their own", View: Automation },
  sites: { title: "Sites", sub: "Websites, funnels and forms", View: Sites },
  memberships: { title: "Memberships", sub: "Training for your team and your clients", View: Memberships },
  "media-storage": { title: "Media Storage", sub: "Every file the business uses", View: MediaStorage },
  reputation: { title: "Reputation", sub: "Review requests, sent at the right moment", View: Reputation },
  reporting: { title: "Reporting", tabs: ["Overview", "Calls", "Attribution", "Appointments"], View: Reporting },
  settings: { title: "Settings", sub: "Your business, your team and your connections", View: Settings },
} satisfies Record<string, { title: string; sub?: string; tabs?: string[]; View: () => React.ReactNode }>

export type ViewId = keyof typeof VIEWS
