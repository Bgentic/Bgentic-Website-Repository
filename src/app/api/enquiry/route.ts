import { SERVICES } from "@/content/services"

// The contact form's endpoint (components/site/contact-form.tsx). It checks an enquiry and hands it to the CRM's
// inbound webhook. The webhook's address stays on the server, in ENQUIRY_WEBHOOK_URL (.env.local here, and the
// project's environment variables on Vercel). Treat it as a secret: anyone holding it can write contacts into the
// CRM and set off its automations, and this repository is public. The page never sees it.
//
// What the CRM receives, one flat JSON object (map these in the workflow's inbound webhook trigger):
//   first_name, last_name, full_name, email, company_name, interested_in, message, source, page, submitted_at

const LIMIT = { name: 120, email: 254, business: 160, message: 5000, page: 200, hp: 200 }
const SERVICE_NAMES = new Set<string>(SERVICES.map((s) => s.name))
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const text = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "")
const reply = (status: number, error?: string) => Response.json(error ? { ok: false, error } : { ok: true }, { status })

export async function POST(request: Request) {
  // only the site's own pages post here
  const origin = request.headers.get("origin")
  const host = request.headers.get("host")
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return reply(403, "forbidden")
    } catch {
      return reply(403, "forbidden")
    }
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return reply(400, "bad-request")
  }
  if (!body || typeof body !== "object") return reply(400, "bad-request")

  // a field people never see, so only bots fill it in: they're told it went, and nothing is sent
  if (text(body.hp, LIMIT.hp)) return reply(200)

  const name = text(body.name, LIMIT.name)
  const email = text(body.email, LIMIT.email)
  const business = text(body.business, LIMIT.business)
  const service = typeof body.service === "string" && SERVICE_NAMES.has(body.service) ? body.service : ""
  const message = text(body.message, LIMIT.message)
  const page = text(body.page, LIMIT.page)
  if (!name || !EMAIL.test(email) || !message) return reply(422, "invalid")

  const url = process.env.ENQUIRY_WEBHOOK_URL
  if (!url) {
    console.error("enquiry: ENQUIRY_WEBHOOK_URL is not set, so the enquiry was not sent")
    return reply(503, "unavailable")
  }

  const [first, ...rest] = name.split(/\s+/)
  const payload = {
    first_name: first,
    last_name: rest.join(" "),
    full_name: name,
    email,
    company_name: business,
    interested_in: service || "Not sure yet",
    message,
    source: "bgentic.io contact form",
    page,
    submitted_at: new Date().toISOString(),
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    })
    if (!res.ok) {
      console.error(`enquiry: the webhook answered ${res.status}`)
      return reply(502, "upstream")
    }
  } catch (err) {
    console.error("enquiry: the webhook could not be reached", err instanceof Error ? err.message : err)
    return reply(502, "upstream")
  }
  return reply(200)
}
