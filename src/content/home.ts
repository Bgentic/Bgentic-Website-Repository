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
    "Most businesses we meet aren't short of work. They're short of the hours that disappear between the work. Four leaks come up again and again.",
  // Each leak's two images: the problem, a person living it (Unsplash, free under the Unsplash License, photographers
  // credited alongside), and the fix (a Bgentic UI in /public/images/leaks, or a photograph).
  rows: [
    {
      problem: "Calls ring out after five.",
      detail: "Enquiries wait until someone is free, and by then they've called the next business on Google.",
      fix: "Every call answered, day or night.",
      how: "An AI receptionist replies by voice or SMS, asks the right questions and books the job into your calendar.",
      images: {
        problem: "https://images.unsplash.com/photo-1507099985932-87a4520ed1d5", // a man on a call, Andreas Klassen
        solution: "/images/leaks/call-booked.png", // the AI receptionist's call, booked
      },
    },
    {
      problem: "Orders typed in twice.",
      detail: "The job lives in the inbox, the spreadsheet and Xero, and someone rekeys it into each one.",
      fix: "One pipeline, synced for you.",
      how: "Enquiries, quotes and orders sit in one CRM and flow into SAP, Xero or MYOB without anyone retyping them.",
      images: {
        problem: "https://images.unsplash.com/photo-1759752393975-7ca7b302fcc6", // typing into a spreadsheet, Bluestonex
        solution: "https://images.unsplash.com/photo-1551288049-bebda4e38f71", // a dark analytics dashboard, Luke Chesser
      },
    },
    {
      problem: "Follow-up lives in someone's head.",
      detail: "Reminders, backorder updates and no-show calls happen when someone remembers.",
      fix: "Follow-up that runs on time.",
      how: "Confirmations, ETA alerts, no-show recovery and review requests go out on their own, on schedule.",
      images: {
        problem: "https://images.unsplash.com/photo-1758874572670-63042c5448c6", // swamped, head in hands at a laptop, Vitaly Gariev
        solution: "/images/leaks/follow-up-autopilot.png", // follow-ups sending on their own
      },
    },
    {
      problem: "Five apps, none of them talking.",
      detail: "Calls, emails, DMs, bookings and invoices each live somewhere different.",
      fix: "One place for all of it.",
      how: "A shared inbox, calendar, pipeline and payments, set up around how your team already works.",
      images: {
        problem: "https://images.unsplash.com/photo-1758520144705-b39e11ff32e3", // head in hands at a desk at night, Vitaly Gariev
        solution: "/images/leaks/image_2f09a9.png", // the Bgentic CRM, every channel in one pipeline (supplied)
      },
    },
  ],
}

// The engine: the transition into the services. Scattered tools drawn into one hub.
export const engine = {
  title: "Every tool you juggle, pulled into one system.",
  intro:
    "Phones, inboxes, calendars, invoices, Xero and your website usually live in separate apps. The Bgentic engine connects them, and our team keeps it running.",
  tools: ["Phone calls", "Shared inbox", "Calendar", "Online bookings", "Invoices", "Xero", "Website", "Google reviews", "Facebook DMs", "Trade orders"],
}

export const servicesIntro = {
  title: "Six services, one system.",
  intro: "Start with the one that hurts most. Each is built to plug into the others, and we keep all of it running.",
}

// 03 · See it working: one tab per service, each with its demo (the demo copy lives in services.ts).
export const demos = {
  title: "See it working",
  intro: "Every service comes with a demo. Pick one to see what it does on an ordinary day.",
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
  title: "Prefer to run it yourself?",
  intro:
    "Every service above starts with a conversation. If you'd rather set up the platform yourself, these are our monthly plans.",
}

export const contact = {
  title: "Tell us where the time goes.",
  intro:
    "Book a discovery call. We'll ask how enquiries, jobs and orders move through your business, then tell you plainly what we'd automate first, and what we wouldn't.",
  promise: "We reply within one business day.",
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
