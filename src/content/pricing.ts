// Monthly plans, copied from bgentic.io/onboarding (2 Nov 2026). The brief: "Pricing stays exactly as it is now."
// Only typography is tidied (hyphens, capitals). Never change a price, an inclusion or a limit here without sign-off.

export type Plan = {
  name: string
  tagline: string
  price: number
  users: string
  credits: string
  intro?: string
  features: string[]
  popular?: boolean
}

export const PLANS: Plan[] = [
  {
    name: "Basic",
    tagline: "Do it yourself. Full platform, you drive.",
    price: 199,
    users: "Up to 3 users",
    credits: "$10 AI credits a month",
    features: [
      "CRM and opportunities",
      "Two-way text and email",
      "Google Business Profile messaging and call tracking",
      "Facebook Messenger",
      "Missed-call text back",
      "Reputation management",
      "Text-to-pay and invoicing",
      "Calendar and online booking",
      "Email marketing",
      "Form builder",
      "Website builder",
      "Workflows and triggers",
      "Documents and contracts",
      "Self-serve setup, documentation access",
    ],
  },
  {
    name: "Standard",
    tagline: "Get set up properly, then run it yourself.",
    price: 349,
    users: "Unlimited users",
    credits: "$15 AI credits a month",
    intro: "Everything in Basic, plus:",
    popular: true,
    features: [
      "Funnels",
      "Web chat",
      "Blogs",
      "Survey builder",
      "QR codes",
      "Certificates",
      "Trigger links",
      "SMS and email templates",
      "Guided onboarding session",
      "One workflow and one form built for you",
      "Standard support",
    ],
  },
  {
    name: "Premium",
    tagline: "We build it, we run it, you sell.",
    price: 499,
    users: "Unlimited users",
    credits: "$20 AI credits a month",
    intro: "Everything in Standard, plus:",
    features: [
      "Full reporting suite",
      "Campaigns",
      "Social planner",
      "Launch pad",
      "Custom workflow and form build-outs",
      "Industry snapshot loaded and configured",
      "In-depth walkthrough and training",
      "Priority support",
    ],
  },
]

export const PLAN_TERMS = [
  "All plans are month to month, no lock-in.",
  "Prices are in AUD and include GST.",
  "14-day free trial on every plan, card required.",
]

export const AI_CREDITS =
  "AI tools like conversation AI and AI voice agents are charged on usage. Plans include $10 to $20 a month of free credits depending on your tier. You only pay if you go beyond that."

export const CUSTOM_WORK =
  "Custom websites, integrations and builds are quoted separately, after a discovery call."

export const PRICING_FAQ = [
  {
    q: "Do I need a card for the free trial?",
    a: "Yes. Every plan has a 14-day free trial, and a card is required to start it.",
  },
  {
    q: "Is there a lock-in contract?",
    a: "No. All plans are month to month. Cancel any time.",
  },
  {
    q: "Do prices include GST?",
    a: "Yes. All prices are in Australian dollars and include GST.",
  },
  {
    q: "How are AI features charged?",
    a: AI_CREDITS,
  },
  {
    q: "How do I get my login?",
    a: "Complete payment and your Bgentic account is created automatically. Your login details arrive by email.",
  },
  {
    q: "What if I want you to build it for me?",
    a: "That's Premium, or a custom build. Book a discovery call and we'll tell you which one fits.",
  },
]
