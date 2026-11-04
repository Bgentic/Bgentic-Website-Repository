// The /clients carousel: one card per real client, with the client's own logo (from their site). Until a client has
// approved a quote, the card says in our own voice what Bgentic built and runs for them (SAYS, below), grounded in
// clients.ts, so every claim on it is a fact. Never put words in a client's mouth: a quote goes in APPROVED only once
// that client has signed off its exact wording in writing (drafts to send them: docs/client-testimonial-drafts.md).
import { CLIENTS } from "@/content/clients"

export type ClientCard = {
  id: string
  /** the card's main line: the approved quote, or what we run for them */
  text: string
  /** true only for an approved quote: it's set in quotation marks and credited to the person who said it */
  quote: boolean
  /** "Name, role at business" for a quote; "Business · trade" otherwise */
  by: string
  logo: string
  logoAlt: string
  /** the logo's own background: most of these logos are made for a dark header */
  logoOn: "dark" | "light"
}

/** approved quotes, by client slug: empty until a client signs one off */
const APPROVED: Partial<Record<string, { text: string; by: string }>> = {}

/** what each card says until then: Bgentic's voice, the facts from clients.ts, said with conviction */
const SAYS: Record<string, string> = {
  "npp-traffic-solutions": "Job requests, invoicing and controller scheduling in one system that runs itself. Built and run by us.",
  "sydney-pink-slips": "Online booking, text-to-pay on site and a Google review request after every inspection. All automatic.",
  "we-are-art": "Every DM, booking and equipment request in one shared inbox, so nothing slips on a busy weekend.",
  "sventy8-events": "Website, funnels, social planner and ticket enquiries, on one system we built and look after.",
}

const LOGO_ON: Record<string, "dark" | "light"> = {
  "npp-traffic-solutions": "dark",
  "sydney-pink-slips": "light",
  "we-are-art": "dark",
  "sventy8-events": "dark",
}

export const CLIENT_CARDS: ClientCard[] = CLIENTS.map((c) => {
  const approved = APPROVED[c.slug]
  return {
    id: c.slug,
    text: approved ? approved.text : (SAYS[c.slug] ?? c.runs),
    quote: !!approved,
    by: approved ? approved.by : `${c.name} · ${c.sector}`,
    logo: `/images/clients/${c.slug}/logo.png`,
    logoAlt: c.name,
    logoOn: LOGO_ON[c.slug] ?? "dark",
  }
})
