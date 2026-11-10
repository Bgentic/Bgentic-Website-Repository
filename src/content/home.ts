// Home page copy. Plain, specific Australian English: what we do, for whom, and what changes on a Tuesday.
// Rules (PRODUCT.md): consultancy first, nothing invented, no testimonials or metrics, the CRM vendor is never named.
import type { DeskEvent } from "@/components/ui/live-desk"


export const hero = {
  // The original bgentic.io hero, restored word for word at the user's request (2026-11-02). The eyebrow keeps the
  // consultancy positioning in the first line read.
  eyebrow: "AI consultancy · Sydney",
  title: ["Your whole business,", "in one place."],
  lede: "Calendars, calls and messages, your CRM, website, ads, trade portals, and AI chat. Bgentic brings every part of your business together so you can run it all from one connected app.",
  primary: { label: "Book a discovery call", href: "/contact" },
  secondary: { label: "Explore capabilities", href: "/services" },
  aside: { text: "Rather set it up yourself? Plans start at $199 a month.", link: { label: "See pricing", href: "/pricing" } },
}

// The hero panel's demonstration. A fictional plumbing business; every card is labelled as an example.
export const desk = {
  business: "Brightwater Plumbing",
  day: "Tuesday",
}

export const leaks = {
  title: "Where the week goes",
  intro:
    "Most businesses we meet aren't short of work. They're short of the hours that slip away between it, and those hours go to the same four places.",
  // The four pain points, each a light card with its name and the problem (2026-11-10, the boss's revisions: no fixes,
  // nothing that moves). The icon is chosen by key in components/home/leaks.tsx; the consultancy card in the services
  // bento lists the first three names.
  rows: [
    {
      key: "leads",
      name: "Leads",
      problem: "Enquiries arrive by phone, web form, email and DM, and the ones nobody answers in time call the next business.",
    },
    {
      key: "calendars",
      name: "Calendars",
      problem: "Bookings bounce back and forth by text, clash with each other, or don't show up.",
    },
    {
      key: "payments",
      name: "Payments and invoicing",
      problem: "Invoices go out late, get chased by hand and get keyed into Xero twice.",
    },
    {
      key: "nurture",
      name: "Nurture sequences",
      problem: "Leads who aren't ready to buy yet get one follow-up, then silence.",
    },
  ],
} as const

// The engine: the transition into the services. Scattered tools drawn into one hub. The intro is the problem, then the
// answer, which is set brighter.
export const engine = {
  title: "Every tool you juggle, pulled into one system.",
  intro: "Phones, inboxes, calendars, invoices, Xero and your website usually live in separate apps.",
  answer: "The Bgentic engine connects them, and our team keeps it running.",
  tools: ["Phone calls", "Shared inbox", "Calendar", "Online bookings", "Invoices", "Xero", "Website", "Google reviews", "Facebook DMs", "Trade orders"],
}

export const servicesIntro = {
  title: "Six services, one system.",
  intro: "Start with the one that hurts most. Each is built to plug into the others, and we keep all of it running.",
}

// 03 · See it working: a film of the app on an ordinary day at an example business (scripts/demo-film.mjs).
export const demos = {
  title: "See it working",
  intro: "An ordinary Tuesday at a plumbing business, run from one system.",
  caption: "Example: Brightwater Plumbing's Tuesday. The business, its customers and every number here are made up.",
  /** what the film shows, for anyone who can't watch it */
  film:
    "Example video of the Bgentic app on a Tuesday at Brightwater Plumbing. The overview counts the day's calls, bookings and payments. In the inbox, the AI receptionist texts back a missed call and books the job. On the pipeline, that job moves from new lead to booked. The missed-call automation runs step by step. A quote form on the business's website lands in the pipeline. The search report shows visits from Google rising and rankings climbing.",
}

// The best operational story from the old site, kept nearly word for word. Fictional customer, labelled Example.
export const journey = {
  title: "One order, start to finish.",
  intro:
    "A trade customer reorders on a Tuesday morning. Here's what happens next, and who has to lift a finger.",
  customer: "Southside Collision Repairs",
  steps: [
    {
      time: "7:42 am",
      who: "Customer",
      title: "Order placed",
      text: "Reorders clear coat and hardener from a saved list in the trade portal.",
      status: "Placed",
      tone: "neutral",
    },
    {
      time: "7:43 am",
      who: "Customer service",
      title: "Confirmed and sent to the ERP",
      text: "The order appears in the shared inbox and syncs to SAP. Nobody rekeys it.",
      status: "Confirmed",
      tone: "neutral",
    },
    {
      time: "8:10 am",
      who: "Automatic",
      title: "Backorder flagged",
      text: "One item is short. The customer gets an SMS with a firm ETA, and their BDM is told.",
      status: "Backorder",
      tone: "warn",
    },
    {
      time: "9:15 am",
      who: "Warehouse",
      title: "Picked and scanned",
      text: "The pick list lands on the floor tablet. Every line is scanned before it's packed.",
      status: "Picked",
      tone: "neutral",
    },
    {
      time: "11:02 am",
      who: "Dispatch",
      title: "On its way",
      text: "Courier booked, and a live tracking link goes to the customer by SMS.",
      status: "In transit",
      tone: "neutral",
    },
    {
      time: "2:24 pm",
      who: "Delivered",
      title: "Proof of delivery",
      text: "POD is uploaded to the portal, and a reorder reminder is scheduled.",
      status: "Delivered",
      tone: "success",
    },
  ],
}

export const process = {
  title: "How we work.",
  intro:
    "We're consultants and software engineers in Sydney. We don't hand over a login and leave: we map it, build it, launch it with your team, and keep it running.",
  steps: [
    { name: "Map", text: "We learn how enquiries, orders and jobs move through your business before we build anything." },
    { name: "Design", text: "We design the CRM, portal and workflows around how your team works today, not a template." },
    { name: "Build", text: "We build and connect it: automations, forms, portals and custom ERP integrations." },
    { name: "Launch", text: "We train your front desk, sales and warehouse teams so the switch-over is quiet." },
    { name: "Support", text: "We stay on. As your products, team and volume change, the system changes with them." },
  ],
  engineering: {
    title: "Engineers behind every build",
    text: "When off-the-shelf won't do it (a custom SAP connector, a trade pricing engine, a BDM tablet app) we scope it, build it and maintain it.",
  },
}

export const clientsIntro = {
  title: "Sydney businesses we run systems for.",
  intro: "Four different trades, one thing in common: the admin runs itself now.",
}

export const pricingIntro = {
  title: "Serious systems. Predictable pricing.",
  intro:
    "Three plans in Australian dollars, GST included.\nPay monthly with no lock-in, or annually and save. Every plan starts with a 14-day free trial.",
}

export const contact = {
  title: "Tell us where the time goes.",
  intro:
    "Book a discovery call. We'll ask how enquiries, jobs and orders move through your business, then tell you plainly what we'd automate first, and what we wouldn't.",
  promise: "We reply within one business day.",
  // the other way in: straight to the calendar on /contact
  book: {
    title: "Rather talk it through?",
    text: "Pick a time for a 30-minute discovery call on our calendar.",
    action: "Book a call",
  },
  // what happens after a visitor sends the form, in order
  next: [
    "Tell us how enquiries, jobs and orders move through your business today.",
    "We map where the time goes with you on a discovery call.",
    "You get a plan in plain English: what to automate first, and what not to.",
  ],
}

// The hero desk's day. Fictional business, every card labelled Example in the panel.

export const deskEvents: DeskEvent[] = [
  {
    id: "call",
    kind: "reply",
    tone: "ai",
    app: "AI receptionist",
    time: "7:12 pm",
    title: "Missed call answered",
    from: "Sam",
    text: "Hi Sam, it's Brightwater Plumbing. We can be there Wednesday at 8 am for the blocked drain. Want me to book it?",
  },
  {
    id: "booked",
    kind: "booking",
    tone: "done",
    app: "Calendar",
    time: "7:14 pm",
    title: "Job booked",
    day: "Wed",
    slot: "8:00",
    detail: "Blocked drain · Sam P. · Paddington. Confirmation sent by SMS.",
  },
  {
    id: "reminders",
    kind: "note",
    icon: "reminder",
    tone: "trigger",
    app: "Reminders",
    time: "8:00 am",
    title: "Tomorrow's jobs confirmed",
    detail: "Four customers confirmed by SMS. One moved to Thursday, and the calendar updated itself.",
  },
  {
    id: "paid",
    kind: "payment",
    tone: "done",
    app: "Payments",
    time: "11:36 am",
    title: "Invoice paid by text",
    amount: 480,
    detail: "INV-2041 · hot water service",
  },
  {
    id: "xero",
    kind: "steps",
    tone: "ai",
    app: "Xero",
    time: "11:37 am",
    title: "Synced to Xero",
    steps: ["Job done", "Invoiced", "Paid", "In Xero"],
    step: 3,
    detail: "Nobody typed it in twice.",
  },
  {
    id: "review",
    kind: "note",
    icon: "review",
    tone: "trigger",
    app: "Reviews",
    time: "1:36 pm",
    title: "Google review requested",
    detail: "Sent to the customer two hours after the job, as it is after every job.",
  },
]
