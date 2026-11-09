// The six services (build brief, 10 Oct 2026). Capabilities come from the old bgentic.io (home, /services, /onboarding)
// and are described as what Bgentic builds and runs; the software underneath is never named.

export type ServiceSlug = "ai-consultancy" | "automations" | "crm" | "websites" | "ecommerce" | "seo-marketing"

export type Service = {
  slug: ServiceSlug
  name: string
  /** One line for lists. */
  summary: string
  /** Three concrete things a client gets, for the index. */
  highlights: string[]
  /** The service page's headline and lede. */
  headline: string
  lede: string
  builds: { title: string; text: string }[]
  /** What the interactive demo on this page will show (Phase 3). */
  demo: { title: string; text: string }
  forWho: string[]
  clients: string[]
  faqs: { q: string; a: string }[]
}

export const SERVICES: Service[] = [
  {
    slug: "ai-consultancy",
    name: "AI consultancy",
    summary: "Find where the hours go, then decide what to automate first.",
    highlights: ["Process mapping", "AI voice and chat assistants", "A plan you can act on"],
    headline: "Start with where the time goes.",
    lede: "Before we build anything, we map how enquiries, jobs and orders actually move through your business. Then we tell you what's worth automating, what isn't, and in what order.",
    builds: [
      {
        title: "A map of your operation",
        text: "Every step from first enquiry to paid invoice, who touches it, and where it stalls.",
      },
      {
        title: "AI voice and chat assistants",
        text: "Assistants that answer routine questions, take bookings and simple reorders, and hand complex calls to your team with the context attached.",
      },
      {
        title: "A build plan in plain English",
        text: "What to fix first, what it costs, and what it changes for your team on a normal day.",
      },
    ],
    demo: {
      title: "Where are you losing time?",
      text: "Answer four quick questions about your business and see where we'd start. It runs in your browser and sends nothing.",
    },
    forWho: ["Owners who know something's leaking but not where", "Teams outgrowing spreadsheets and sticky notes"],
    clients: [],
    faqs: [
      {
        q: "Do I have to commit to a build after the consultation?",
        a: "No. You get the map and the plan either way. Build it with us, build it yourself, or put it in a drawer.",
      },
      {
        q: "Will an AI assistant sound like a robot to my customers?",
        a: "It answers routine questions and books jobs. Anything it can't handle goes to a person, with the conversation so far attached.",
      },
    ],
  },
  {
    slug: "automations",
    name: "Automations",
    summary: "Reminders, follow-ups, order updates and ERP sync that run on their own.",
    highlights: ["Missed-call text back", "No-show recovery", "SAP, Xero and MYOB sync"],
    headline: "The follow-up nobody has to remember.",
    lede: "Workflows that do the repetitive work, on time, every time: confirmations, reminders, backorder alerts, review requests, and the sync between your CRM and your ERP.",
    builds: [
      {
        title: "Lead and booking workflows",
        text: "Missed-call text back, instant replies, 24-hour confirmations and no-show recovery.",
      },
      {
        title: "Order workflows",
        text: "Backorder flags with a firm ETA by SMS, dispatch tracking links, proof of delivery and reorder reminders.",
      },
      {
        title: "ERP integration",
        text: "SAP, Xero or MYOB stays home for stock and invoices. Orders, customer pricing and invoices stay in sync, with no rekeying.",
      },
      {
        title: "Escalations",
        text: "When something stalls, the right person hears about it before the customer does.",
      },
    ],
    demo: {
      title: "Every step mapped",
      text: "Follow a lead from first call to paid invoice, and a trade order from portal to proof of delivery, branch by branch.",
    },
    forWho: ["Service businesses living on bookings", "Wholesalers and trade suppliers living on orders"],
    clients: ["npp-traffic-solutions", "sydney-pink-slips", "we-are-art", "sventy8-events"],
    faqs: [
      {
        q: "We already use Xero. Do we have to change?",
        a: "No. Your ERP stays where it is. We automate everything around it.",
      },
      {
        q: "What happens when an automation can't decide?",
        a: "It hands over to a person with the details attached, rather than guessing.",
      },
    ],
  },
  {
    slug: "crm",
    name: "CRM",
    summary: "Every call, message and deal in one place your whole team can see.",
    highlights: ["Two-way inbox", "Pipelines and bookings", "Text-to-pay invoicing"],
    headline: "One inbox. One pipeline. One calendar.",
    lede: "Calls, SMS, email, Google Business messages and Facebook DMs land in one shared inbox, next to every customer's history, bookings and invoices. We set it up around your team, move your data across, and keep it tidy.",
    builds: [
      {
        title: "A shared two-way inbox",
        text: "Every call, SMS, email and DM in one thread per customer, with missed-call text back built in.",
      },
      {
        title: "Pipelines and opportunities",
        text: "Every deal at a glance, from new lead to won, with the value and the next step on each card.",
      },
      {
        title: "Calendars and online booking",
        text: "One calendar for the whole team, online booking for customers, and reminders that go out on their own.",
      },
      {
        title: "Payments and reviews",
        text: "Text-to-pay invoices on the spot, and a Google review request after every job.",
      },
      {
        title: "Tools for BDMs",
        text: "Orders, calls, emails and visits on one timeline per account, visit notes from a phone, and alerts when an account goes quiet.",
      },
    ],
    demo: {
      title: "Click through it",
      text: "A working CRM with an example business loaded: open the inbox, move a deal, book a job.",
    },
    forWho: ["Teams answering the same customer in three apps", "Sales teams and BDMs who need one view of each account"],
    clients: ["npp-traffic-solutions", "sydney-pink-slips", "we-are-art", "sventy8-events"],
    faqs: [
      {
        q: "Can we move our existing contacts across?",
        a: "Yes. We do the setup and move your data across; you just log in.",
      },
      {
        q: "Does it work on a phone?",
        a: "Yes. Your team can run it from a desk, a tablet or a phone, each with their own login.",
      },
    ],
  },
  {
    slug: "websites",
    name: "Websites",
    summary: "Fast sites that send every enquiry straight into your CRM.",
    highlights: ["Built around your business", "Enquiries straight to the pipeline", "Trade account applications"],
    headline: "A website that earns the call.",
    lede: "Modern, fast websites built for your business, connected to your CRM from day one. Every form, booking and trade account application lands where your team works.",
    builds: [
      {
        title: "A site built for your business",
        text: "Designed and built for you, not a template with your logo on it.",
      },
      {
        title: "Enquiries that go somewhere",
        text: "Contact forms, bookings and quote requests flow straight into your pipeline, with an instant reply to the customer.",
      },
      {
        title: "Trade account applications",
        text: "Applications arrive in your sales pipeline, ready for approval and account pricing.",
      },
    ],
    demo: {
      title: "Send a test enquiry",
      text: "Fill in a sample form and watch it arrive in the pipeline, with the reply the customer would get.",
    },
    forWho: ["Businesses whose site looks fine but never rings", "Trade suppliers taking account applications by email"],
    clients: ["npp-traffic-solutions", "sydney-pink-slips", "we-are-art", "sventy8-events"],
    faqs: [
      {
        q: "Is a website included in the monthly plans?",
        a: "Every plan includes a website builder. A custom website designed and built by us is quoted separately.",
      },
    ],
  },
  {
    slug: "ecommerce",
    name: "Ecommerce",
    summary: "Online stores and trade portals your customers will actually use.",
    highlights: ["Reorder from saved lists", "Account pricing", "Live order status"],
    headline: "Orders without the phone calls.",
    lede: "A portal your trade customers use instead of phoning or emailing orders in. They reorder, track and find what they need themselves, and every order goes straight into your ERP with their account pricing attached.",
    builds: [
      {
        title: "Reorder in two clicks",
        text: "From order history or saved lists, at the customer's own account pricing and credit terms.",
      },
      {
        title: "Live order status",
        text: "From confirmed to delivered, so nobody has to ring to ask.",
      },
      {
        title: "Everything in one place",
        text: "Invoices, statements, proof of delivery, technical data sheets and SDS on demand.",
      },
      {
        title: "Their BDM, one tap away",
        text: "Each customer sees their account manager's details and a direct message line.",
      },
    ],
    demo: {
      title: "Place a trade order",
      text: "Reorder from a saved list as an example customer, and follow the order from the portal to proof of delivery.",
    },
    forWho: ["Wholesalers and trade suppliers", "Businesses whose orders arrive by phone, email and text"],
    clients: [],
    faqs: [
      {
        q: "Does it replace our ERP?",
        a: "No. SAP, Xero or MYOB stays your home for stock. The portal sits in front of it.",
      },
    ],
  },
  {
    slug: "seo-marketing",
    name: "SEO marketing",
    summary: "Pages that keep improving, so customers find you on Google and in AI search.",
    highlights: ["Google and AI search", "Pages that improve weekly", "Plain-English reports"],
    headline: "Get found, then keep getting found.",
    lede: "Search changes every week, and so does what people ask ChatGPT, Perplexity and Google's AI answers. We keep your pages current so you show up when customers look.",
    builds: [
      {
        title: "Pages written for how people search",
        text: "Service and location pages that answer real questions, for Google and for AI search.",
      },
      {
        title: "Continuous improvement",
        text: "Your pages are checked and improved on a schedule, not once at launch.",
      },
      {
        title: "Reports you can read",
        text: "What changed, why, and what it did, in plain English.",
      },
    ],
    demo: {
      title: "A sample daily report",
      text: "We're running this on bgentic.io first. Its daily report will appear here once it's live.",
    },
    forWho: ["Businesses that rely on being found locally", "Anyone whose site hasn't changed since launch"],
    clients: [],
    faqs: [
      {
        q: "Is this available now?",
        a: "We're proving it on our own site first, then offering it to clients. Ask us where it's up to.",
      },
    ],
  },
]

export const serviceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug)

/** Every service lives on the one /services page: four in its showcase (picked by the hash), consultancy and ecommerce
 *  on the path band. A link to a service goes there. */
export const serviceHref = (slug: ServiceSlug) => `/services#${slug}`
