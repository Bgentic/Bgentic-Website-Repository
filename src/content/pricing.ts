// The plan: one plan, quoted to each business (2026-11-23, replacing the three priced tiers, which are archived in
// src/archive/pricing). It's shown in full on /pricing (components/pricing/plan-card.tsx) and summed up on the home
// page's cream band (components/home/plan-section.tsx).
//
// Rules for this copy, from the user:
// - no prices, monthly rates, tiers or billing periods, anywhere on the site
// - never mention user limits, seats or AI credits
// - every other capability the three plans listed stays listed (merged where two tiers said the same thing twice),
//   plus the free trial
// - the way in is a quote, through /contact
// The facts it does state are on file: the 14-day free trial with a card, AUD with GST (the Terms, clause 06), the
// 30-minute discovery call, the reply within one business day, the team in Sydney.

export type PlanGroupIcon = "sales" | "conversations" | "automation" | "marketing" | "websites" | "support"

export type PlanGroup = {
  id: string
  icon: PlanGroupIcon
  name: string
  /** one line for the home page's summary of the plan */
  summary: string
  /** a short qualifier beside the group's name */
  note?: string
  items: string[]
}

const QUOTE_HREF = "/contact"

export const plan = {
  trial: "14-day free trial",
  title: ["One plan.", "Everything in it."],
  lede: "Every tool your business runs on, set up and supported by our team in Sydney. We quote it around what you need us to build, connect and run.",
  cta: { label: "Contact us for a quote", href: QUOTE_HREF },
  promise: "We reply within one business day.",
  // with no price on the page, the offer says how the price comes about
  steps: {
    title: "How quoting works",
    items: [
      { title: "Tell us about your business", text: "On a 30-minute discovery call, or in a quick message." },
      { title: "Get your quote", text: "Priced to what we build, connect and run for you." },
      { title: "Start with 14 days free", text: "Your plan starts with a free trial. A card is required to start it." },
    ],
  },
  facts:["Set up and supported from Sydney", "Quotes in Australian dollars, GST included"],
  includedTitle: "Everything in the plan",
  // two columns from 640px, read in rows: sales beside conversations, automation beside marketing, then websites
  // beside setup and support. Pairs are kept close in length so each row's hairline sits under both.
  groups: [
    {
      id: "sales",
      icon: "sales",
      name: "Sales and customers",
      summary: "CRM, booking, invoicing, contracts and reporting.",
      items: [
        "CRM and opportunities",
        "Calendar and online booking",
        "Text-to-pay and invoicing",
        "Documents and contracts",
        "Full reporting suite",
      ],
    },
    {
      id: "conversations",
      icon: "conversations",
      name: "Conversations",
      summary: "Text, email, web chat, Messenger and Google Business Profile.",
      items: [
        "Two-way text and email",
        "Web chat",
        "Facebook Messenger",
        "Google Business Profile messaging and call tracking",
      ],
    },
    {
      id: "automation",
      icon: "automation",
      name: "Automation",
      summary: "Workflows, missed-call text back, trigger links and templates.",
      items: ["Workflows and triggers", "Missed-call text back", "Trigger links", "SMS and email templates"],
    },
    {
      id: "marketing",
      icon: "marketing",
      name: "Marketing",
      summary: "Email, campaigns, social planning, reviews and QR codes.",
      items: ["Email marketing", "Campaigns", "Social planner", "Reputation management", "QR codes"],
    },
    {
      id: "websites",
      icon: "websites",
      name: "Websites and funnels",
      summary: "Websites, funnels, blogs, forms, surveys and certificates.",
      items: ["Website builder", "Funnels", "Blogs", "Form builder", "Survey builder", "Certificates"],
    },
    {
      id: "support",
      icon: "support",
      name: "Setup and support",
      summary: "Onboarding, training and builds by our team, scoped in your quote.",
      note: "Scoped in your quote",
      items: [
        "Guided onboarding, walkthrough and training",
        "Industry snapshot loaded and configured",
        "Custom workflows and forms built for you",
        "Launch pad",
        "Documentation access",
        "Priority support",
      ],
    },
  ] satisfies PlanGroup[],
  custom: {
    title: "Need something the plan doesn't cover?",
    text: "We also scope and quote custom ERP connectors, trade portals and AI assistants.",
    action: { label: "See our services", href: "/services" },
  },
}

// /pricing's questions, on the cream band under the plan
export const PRICING_FAQ = [
  {
    q: "Why isn't there a price on this page?",
    a: "Because no two businesses need the same setup. Every tool comes with the plan, and your quote reflects how much we build, connect and run for you.",
  },
  {
    q: "How do I get a quote?",
    a: "Book a 30-minute discovery call, or send us a quick message about your business. We reply within one business day.",
  },
  {
    q: "How does the free trial work?",
    a: "Your plan starts with a 14-day free trial. A card is required to start it.",
  },
  {
    q: "Do quotes include GST?",
    a: "Yes. Quotes are in Australian dollars and include GST.",
  },
  {
    q: "Can you build things the plan doesn't cover?",
    a: "Yes. Custom websites, integrations and builds, such as an ERP connector, a trade portal or an AI assistant, are quoted separately, after a discovery call.",
  },
]

// Home 06: the plan, summed up on the cream band between the clients and the close
export const planIntro = {
  // two lines, set like /pricing's: the first in ink, the second a step quieter
  title: ["One plan.", "Quoted to fit."],
  sheetTitle: "Everything in the plan",
  intro:
    "Every tool your business runs on, set up and supported by our team. We quote it around what you need, and it starts with a 14-day free trial.",
  primary: { label: "Contact us for a quote", href: QUOTE_HREF },
  secondary: { label: "See what's included", href: "/pricing" },
}
