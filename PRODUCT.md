# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16 (App Router, statically rendered) with TypeScript, Tailwind CSS v4 and shadcn/ui (Base UI), hosted on Vercel. The user chose it on 2026-11-02. Motion uses no animation library: CSS scroll-driven animations and transitions, plus a small canvas controller for the hero sculpture.

## Users

Owners and operators of Australian small and medium businesses. Two kinds:

- **Service businesses** that live on bookings, calls, follow-ups, payments and reviews.
- **Trade and wholesale businesses** that live on orders, client portals, BDMs and their ERP (SAP, Xero, MYOB).

Both lose time to missed calls, follow-ups left to memory, rekeying between systems and scattered tools. They want one team to design, build and run their systems for them.

## Product Purpose

bgentic.io presents Bgentic Pty Ltd, an AI consultancy in Sydney. It explains what Bgentic builds and runs, shows each service working, and turns a qualified visitor into a discovery call. Success is a booked discovery call. Starting a plan through the existing `/onboarding` flow is the secondary path.

## Positioning

"AI built systems, managed." Two claims set Bgentic apart:

- **It stays.** Bgentic builds the system and keeps running it, instead of handing it over and leaving.
- **It engineers.** Consultants and software engineers in Sydney take on custom ERP connectors, trade portals and AI assistants that off-the-shelf setup can't.

Bgentic is an AI consultancy, not a SaaS. The CRM software it works with is a tool, never the pitch. It is never named, and never claimed as Bgentic's own or "proprietary".

## Operating Context

- **Six services,** each shown with an interactive demo built into the page: AI consultancy, automations, CRM, websites, ecommerce and SEO marketing.
- **How Bgentic works:** five steps, Map, Design, Build, Launch, Support.
- **Monthly plans** are bought through the existing `/onboarding` flow, which stays on the legacy site and is proxied. The app login is `app.bgentic.io`.
- **SEO agent:** a Claude-based agent will edit site content daily in a later phase. Copy therefore lives in content files, separate from components.

## Capabilities and Constraints

- **Pricing must match `/onboarding` exactly:**
  - Basic $199, Standard $349, Premium $499 a month, AUD, including GST.
  - 14-day free trial, card required. Month to month, no lock-in.
  - Included AI credits of $10, $15 and $20 a month; AI features are billed on usage.
  - Never change, round or reword these.
- **Routes that must keep working:** `/onboarding`, `/terms`, `/privacy` and `app.bgentic.io`.
- **Quality bar:**
  - WCAG 2.2 AA.
  - Mobile Core Web Vitals: LCP under 2.5 s, INP under 200 ms, CLS under 0.1.
  - Light and dark themes, from the brand tokens.
- **Copy:** plain, specific Australian English, with no hype words.

## Brand Commitments

- **Name and tagline:** Bgentic; "AI built systems, managed".
- **Logo:**
  - The logo suite (2026-10-26) keeps its own colours, #0F172A and #3B82F6.
  - Trimmed copies are in `public/brand/`; favicons are in `public/`.
- **Palette:**
  - The Bgentic token sheet, ported verbatim to `src/styles/tokens.css` from the Deal Desk.
  - Pinned by the user: light blue, dark navy, dark slate/grey-blue and white. Don't invent colours.
- **Type:** Inter Variable, one family at every size, as on the Deal Desk and the proposals.
- **Feel:** elegant, restrained and expensive, at an Apple standard. Sharp, structured and highly readable: light-first pages, with navy reserved for one or two feature bands. Never neon.
- **Restraint (user, 2026-11-02):**
  - No scroll-jacking, parallax travel or pinned scroll gimmicks; motion only explains.
  - The travelling 3D orb was rejected as "over-engineered AI slop" and removed.
  - Use world-class Inter typography, deliberate whitespace, 1px specular borders and frosted glass.
- **Hero object:** a live desk panel (built on 21st.dev `dhxwhy/live-notification-feed`). It shows an example business day being handled; the user chose it on 2026-11-02.

## Evidence on Hand

- **Real clients,** shown by name with a link to their site:
  - NPP Traffic Solutions (npptrafficsolutions.com.au)
  - Sydney Pink Slips (sydneypinkslips.com)
  - We Are Art (weareart.com.au)
  - Sventy8 Events (sventy8events.com)
- **No testimonials, quotes, ratings, metrics or "loved by" counts exist.** Never fabricate them.
- **Legal and contact:**
  - Bgentic Pty Ltd, ACN 699 335 754, ABN 27 699 335 754.
  - hello@bgentic.io, Sydney NSW.
  - No phone number or street address is on file.
- **Illustrative demo data must be labelled "Example".** This covers the Order Journey (7:42 am reorder to 2:24 pm delivery) and the "Southside Collision Repairs" trade portal.

## Product Principles

1. **Prove by demonstration, never by claim.** Show the system working; don't assert results.
2. **Consultancy first.** The people and the method are the offer; the software is a tool.
3. **Specific beats general.** Real times, real steps, real prices.
4. **Restraint is the luxury.** One idea per viewport.
5. **Nothing invented.** Every fact on the page is true today.

## Accessibility & Inclusion

- WCAG 2.2 AA, complete by keyboard and by screen reader.
- The full story stays readable under `prefers-reduced-motion`.
- `prefers-reduced-transparency` swaps glass for solid fills.
- No motion that starts automatically runs longer than 5 seconds (WCAG 2.2.2).
