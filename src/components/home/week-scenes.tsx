import type * as React from "react"
import { Mail, MessageCircle, PhoneMissed } from "lucide-react"

// The week cards' scenes: each problem as it looks on a real screen, glimpsed at the foot of its card. Decorative and
// static (the card's words carry the meaning), faded in from above so they never meet the words, and bleeding off the
// card's edges. Names, numbers and times are illustrative. Styles: the 01 section of styles/depth.css (.scene-*).

/** Leads: the notifications nobody got to, more of them than fit */
function LeadsScene() {
  const rows = [
    { icon: <PhoneMissed />, alert: true, title: "Missed call", sub: "0412 ··· 318", meta: "2:14 pm" },
    { icon: <Mail />, title: "Website enquiry", sub: "Quote for a bathroom reno?" },
    { icon: <MessageCircle />, title: "Facebook DM", sub: "Are you free Thursday?" },
    { icon: <PhoneMissed />, alert: true, title: "Missed call", sub: "0433 ··· 902", meta: "11:52 am" },
  ]
  return (
    <div className="scene-notes">
      {rows.map((r, i) => (
        <div key={i} className="scene-note scene-surface" data-alert={r.alert ? "" : undefined}>
          <span className="scene-ico">{r.icon}</span>
          <span className="scene-lines">
            <b>{r.title}</b>
            <span>{r.sub}</span>
          </span>
          {r.meta ? <span className="scene-meta">{r.meta}</span> : <span className="scene-dot" />}
        </div>
      ))}
    </div>
  )
}

/** Calendars: a morning where two bookings land on each other and a third never turns up */
function CalendarsScene() {
  return (
    <div className="scene-cal">
      {["9", "10", "11"].map((h, i) => (
        <span key={h} className="cal-hour" style={{ "--row": i } as React.CSSProperties}>
          <span>{h}</span>
        </span>
      ))}
      <span className="cal-ev cal-a">
        Site visit
        <small>Kim · 9:15</small>
      </span>
      <span className="cal-ev cal-b" data-alert="">
        Quote call
        <small>Raj · 9:45</small>
        <em className="scene-chip" data-alert="">
          Clash
        </em>
      </span>
      <span className="cal-ev cal-c">
        Consult
        <em className="scene-chip">No-show</em>
      </span>
    </div>
  )
}

/** Payments and invoicing: a pile of invoices that should have been paid by now */
function PaymentsScene() {
  return (
    <div className="scene-inv">
      <span className="inv inv-3 scene-surface" />
      <span className="inv inv-2 scene-surface" />
      <span className="inv inv-1 scene-surface">
        <span className="inv-top">
          <b>INV-1042</b>
          <em className="scene-chip" data-alert="">
            Overdue 14 days
          </em>
        </span>
        <span className="inv-amt">$1,280.00</span>
        <span className="inv-due">Due 27 Oct</span>
        <span className="skel" style={{ width: "72%" }} />
        <span className="skel" style={{ width: "48%" }} />
      </span>
    </div>
  )
}

/** Nurture sequences: one follow-up, then nothing */
function NurtureScene() {
  return (
    <div className="scene-chat">
      <span className="bubble bubble-in">Could you send me a quote?</span>
      <span className="bubble bubble-out">Just following up on your quote, Sam.</span>
      <span className="chat-meta">Delivered · 3 weeks ago</span>
      <span className="bubble bubble-none">No reply</span>
    </div>
  )
}

export const WEEK_SCENES = {
  leads: LeadsScene,
  calendars: CalendarsScene,
  payments: PaymentsScene,
  nurture: NurtureScene,
} as const
