// Site-wide facts: navigation, contact and legal. Everything here is true today (PRODUCT.md, "Evidence on hand").

export const CONTACT_EMAIL = "hello@bgentic.io"
export const LOGIN_HREF = "https://app.bgentic.io/"
// Where "start a free trial" goes: the plans (2026-11-10). The old sign-up flow on the previous site is gone, so the
// links that pointed there (bgentic.io/onboarding) returned a 404.
export const ONBOARDING_HREF = "/pricing"
export const BOOK_CALL_HREF = "/contact"

export const LEGAL = {
  name: "Bgentic Pty Ltd",
  acn: "699 335 754",
  abn: "27 699 335 754",
  city: "Sydney, NSW",
  terms: "/terms",
  privacy: "/privacy",
}

export const NAV = [
  { label: "Services", href: "/services" },
  { label: "Clients", href: "/clients" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
]
