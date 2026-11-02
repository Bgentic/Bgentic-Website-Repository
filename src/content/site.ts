// Site-wide facts: navigation, contact and legal. Everything here is true today (PRODUCT.md, "Evidence on hand").

export const CONTACT_EMAIL = "hello@bgentic.io"
export const LOGIN_HREF = "https://app.bgentic.io/"
// The sign-up and checkout flow stays on the existing site; after launch the same URL is proxied, so links don't change.
export const ONBOARDING_HREF = "https://bgentic.io/onboarding"
export const BOOK_CALL_HREF = "/contact"

export const LEGAL = {
  name: "Bgentic Pty Ltd",
  acn: "699 335 754",
  abn: "27 699 335 754",
  city: "Sydney, NSW",
  terms: "https://bgentic.io/terms",
  privacy: "https://bgentic.io/privacy",
}

export const NAV = [
  { label: "Services", href: "/services" },
  { label: "Clients", href: "/clients" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
]
