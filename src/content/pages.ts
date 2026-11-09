// Copy for the subpages' own sections: /services and /contact. Copy lives here, not in components, so the SEO agent
// can edit it. Every line is drawn from what's already on file (the services, the clients, the plans and the
// contact promise); nothing here is a new claim.
import type { ServiceSlug } from "@/content/services"

export const servicesPage = {
  title: "Six services, one team.",
  lede: "Start with the one that hurts most. Each service is built to plug into the others, and we keep all of it running, so you're never left holding a system nobody understands.",
  // the showreel's place at the top of the page, until the reel itself is cut
  showreel: { label: "Showreel", note: "One minute of the systems at work. Coming soon." },
  // the connected showcase: one slide per service, each with a screen of it at work
  showcase: {
    title: "See each one at work.",
    intro: "Pick a service to see the screen your team would use. Every one plugs into the others.",
    items: [
      {
        service: "crm",
        tab: "CRM",
        image: "/images/services/crm.webp",
        imageAlt: "A sales pipeline in the Bgentic CRM, with deals in each stage",
      },
      {
        service: "automations",
        tab: "Automations",
        image: "/images/services/automations.webp",
        imageAlt: "An appointment confirmation workflow: every branch of messages, reminders and updates it runs",
      },
      {
        service: "websites",
        tab: "Websites",
        image: "/images/services/websites.jpg",
        imageAlt: "npptrafficsolutions.com.au, a site Bgentic built and runs",
      },
      {
        service: "seo-marketing",
        tab: "SEO",
        image: "/images/services/seo-sample.svg",
        imageAlt: "A sample of the SEO agent's daily report",
        // the only screen that isn't real yet, so it says so
        tag: "Sample",
      },
    ] satisfies { service: ServiceSlug; tab: string; image: string; imageAlt: string; tag?: string }[],
  },
  path: {
    title: "How the six fit together.",
    intro: "Each one hands its work to the next. Here's one customer's path, from a search to a reorder.",
    stops: [
      {
        service: "seo-marketing",
        title: "They find you.",
        text: "A customer searches Google or asks an AI assistant, and one of your pages answers.",
      },
      {
        service: "websites",
        title: "They get in touch.",
        text: "Your site sends the enquiry straight into your pipeline, with where it came from.",
      },
      {
        service: "crm",
        title: "It lands in one place.",
        text: "Calls, texts, emails and the deal sit on one record your whole team can see.",
      },
      {
        service: "automations",
        title: "Nobody has to remember.",
        text: "Confirmations, reminders, invoices and the sync to Xero, SAP or MYOB go out on time.",
      },
      {
        service: "ecommerce",
        title: "They order again.",
        text: "Trade customers reorder from saved lists at their own pricing, without a phone call.",
      },
    ] satisfies { service: ServiceSlug; title: string; text: string }[],
    consultancy: {
      title: "AI consultancy sits behind all five",
      text: "We map where your time goes before we build anything, then build only the parts you need, the one that hurts most first.",
      action: "Start with the map",
    },
  },
  faq: {
    title: "Common questions.",
    intro: "Still deciding where to start? A discovery call is the quickest way to find out.",
    items: [
      {
        q: "Do I have to commit to a build after the consultation?",
        a: "No. You get the map and the plan either way. Build it with us, build it yourself, or put it in a drawer.",
      },
      { q: "We already use Xero. Do we have to change?", a: "No. Your ERP stays where it is. We automate everything around it." },
      { q: "Can we move our existing contacts across?", a: "Yes. We do the setup and move your data across; you just log in." },
      {
        q: "Does it work on a phone?",
        a: "Yes. Your team can run it from a desk, a tablet or a phone, each with their own login.",
      },
      {
        q: "What happens when an automation can't decide?",
        a: "It hands over to a person with the details attached, rather than guessing.",
      },
    ],
  },
}

export const clientsPage = {
  // the gallery's title is the home page's (clientsIntro in home.ts); the page gives it a longer intro
  intro:
    "Traffic management, mobile inspections, sound systems and live music. Four different trades, the same outcome: the admin runs itself, and the team gets on with the work.",
}

export const contactPage = {
  // the page opens on booking: the heading is the home page's close (contact.title in home.ts)
  booking: {
    intro:
      "Pick a time for a 30-minute discovery call, then tell us a little about the business, so the call starts with answers instead of questions.",
    steps: [
      { title: "Book your call. ", text: "Choose a time that suits you." },
      { title: "Tell us where the time goes. ", text: "A few lines is plenty; we'll ask the rest on the call." },
    ],
  },
  ways: {
    title: "Other ways to reach us.",
    email: { title: "Email us", text: "Write to us any time. We reply within one business day." },
    login: { title: "Already a client?", text: "Log in to your Bgentic workspace: your inbox, pipeline and reports.", action: "Log in" },
    plans: {
      title: "Rather start on your own?",
      text: "Every plan has a 14-day free trial, card required. Pay monthly with no lock-in, or annually and save about 9%.",
      action: "See the plans",
    },
  },
  faq: {
    title: "Before you write.",
    intro: "A few things people ask before their first call.",
    items: [
      { q: "How quickly will you reply?", a: "Within one business day." },
      {
        q: "What should I put in the message?",
        a: "A short note is enough: calls you miss, orders you retype, follow-ups that slip. We'll ask the rest on the call.",
      },
      {
        q: "Do I have to commit to a build after the call?",
        a: "No. You get the map and the plan either way. Build it with us, build it yourself, or put it in a drawer.",
      },
      {
        q: "Can I start without a call?",
        a: "Yes. Every plan starts with a 14-day free trial, card required. Pay monthly with no lock-in, or annually and save about 9%.",
      },
    ],
  },
}
