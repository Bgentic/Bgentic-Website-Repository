// Real clients, as described on the old bgentic.io. No quotes, ratings or results: we don't have any on file yet.
// Their sites, as the home gallery shows them, are screenshots in public/images/clients/<slug>/ (npm run shots:clients).

export type Client = {
  slug: string
  name: string
  sector: string
  about: string
  runs: string
  services: string[]
  url: string
  domain: string
  /** the gallery studio's light: warm (sand) or cool (light blue), alternating so neighbours differ */
  tone: "warm" | "cool"
}

export const CLIENTS: Client[] = [
  {
    slug: "npp-traffic-solutions",
    name: "NPP Traffic Solutions",
    sector: "Traffic management",
    about: "A TfNSW-accredited contractor providing traffic planning, permits, accredited controllers and equipment hire.",
    runs: "Job request forms, invoicing and controller scheduling.",
    services: ["automations", "crm", "websites"],
    url: "https://npptrafficsolutions.com.au/",
    domain: "npptrafficsolutions.com.au",
    tone: "warm",
  },
  {
    slug: "sydney-pink-slips",
    name: "Sydney Pink Slips",
    sector: "Mobile vehicle inspections",
    about: "Licensed mobile e-Safety checks that come to the customer, anywhere in Sydney.",
    runs: "Online booking, text-to-pay on site, and a Google review request after every inspection.",
    services: ["automations", "crm", "websites", "seo-marketing"],
    url: "https://sydneypinkslips.com/",
    domain: "sydneypinkslips.com",
    tone: "cool",
  },
  {
    slug: "we-are-art",
    name: "We Are Art",
    sector: "Sound systems and events",
    about: "Funktion-One sound system set-ups, DJ equipment hire and event management.",
    runs: "Social DMs, event bookings and equipment scheduling in one shared inbox.",
    services: ["websites", "crm", "automations"],
    url: "https://weareart.com.au/",
    domain: "weareart.com.au",
    tone: "warm",
  },
  {
    slug: "sventy8-events",
    name: "Sventy8 Events",
    sector: "Live music events",
    about: "An underground house concert series that also takes venue submissions.",
    runs: "Its website, funnels, social planner and ticket enquiry forms.",
    services: ["websites", "crm", "automations"],
    url: "https://sventy8events.com/",
    domain: "sventy8events.com",
    tone: "cool",
  },
]

export const clientBySlug = (slug: string) => CLIENTS.find((c) => c.slug === slug)
