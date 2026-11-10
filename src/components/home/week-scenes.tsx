import type * as React from "react"
import { Check, Clock, Mail, MessageCircle, PhoneMissed } from "lucide-react"

// The week cards' scenes: each problem as it looks on a real screen, at the foot of its card. Decorative and static
// (the card's words carry the meaning, so they're hidden from screen readers), faded in from above, and bleeding off
// the card's edges. Brand blue for what's active, soft greys for surfaces and edges, and the danger red for what went
// wrong. Names, numbers and times are illustrative. Styles: the 01 section of styles/depth.css (.scene-*).

/** Leads: the notifications nobody got to, more of them than fit */
function LeadsScene() {
  const rows = [
    { icon: <PhoneMissed />, alert: true, title: "Missed call", sub: "0412 ··· 318", meta: "2:14 pm" },
    { icon: <Mail />, unread: true, title: "Website enquiry", sub: "Bathroom reno quote?", meta: "1:52 pm" },
    { icon: <MessageCircle />, unread: true, title: "Facebook DM", sub: "Are you free Thursday?", meta: "1:30 pm" },
    { icon: <PhoneMissed />, alert: true, title: "Missed call", sub: "0433 ··· 902", meta: "11:52 am" },
  ]
  return (
    <div className="scene-notes">
      {rows.map((r, i) => (
        <div key={i} className="scene-note" data-alert={r.alert ? "" : undefined} data-unread={r.unread ? "" : undefined}>
          <span className="scene-ico">{r.icon}</span>
          <span className="scene-lines">
            <b>{r.title}</b>
            <span>{r.sub}</span>
          </span>
          <span className="scene-end">
            <span className="scene-meta">{r.meta}</span>
            {r.unread && <span className="scene-dot" />}
          </span>
        </div>
      ))}
    </div>
  )
}

/** Calendars: a morning where two bookings land on each other and a third never turns up */
function CalendarsScene() {
  return (
    <div className="scene-cal">
      {["9 am", "10", "11"].map((h, i) => (
        <span key={h} className="cal-hour" style={{ "--row": i } as React.CSSProperties}>
          <span>{h}</span>
        </span>
      ))}
      <span className="cal-ev cal-a">
        <b>Site visit</b>
        <small>Kim · 9:15</small>
      </span>
      <span className="cal-ev cal-b">
        <b>Quote call</b>
        <small>Raj · 9:45</small>
        <em className="scene-chip" data-solid="">
          Clash
        </em>
      </span>
      <span className="cal-ev cal-c">
        <b>Consult</b>
        <em className="scene-chip" data-alert="">
          No-show
        </em>
      </span>
    </div>
  )
}

/** Payments and invoicing: a pile of invoices that should have been paid by now, chased one reminder at a time */
function PaymentsScene() {
  return (
    <div className="scene-inv">
      <span className="inv inv-3" />
      <span className="inv inv-2" />
      <span className="inv inv-1">
        <span className="inv-top">
          <b>INV-1042</b>
          <em className="scene-chip" data-solid="">
            Overdue 14 days
          </em>
        </span>
        <span className="inv-body">
          <span className="inv-who">Brightwater Plumbing</span>
          <span className="inv-amt">$1,280.00</span>
          <span className="inv-due">Due 27 Oct</span>
          <span className="inv-btn">Send reminder</span>
        </span>
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
      <span className="chat-meta">
        <Check aria-hidden="true" />
        Delivered · 3 weeks ago
      </span>
      <span className="bubble-none">
        <Clock aria-hidden="true" />
        No reply
      </span>
    </div>
  )
}

export const WEEK_SCENES = {
  leads: LeadsScene,
  calendars: CalendarsScene,
  payments: PaymentsScene,
  nurture: NurtureScene,
} as const
