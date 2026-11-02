---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: []
---

Scope: the home page (`/`), all 8 sections. Subpages share its sections and system.
Mode: Persuade.

- **Audience and job:** Australian SMB owners and operators (PRODUCT.md).
- **Action:** book a discovery call (`/contact`).
- **Proof:** demonstration. The live desk and the order record show the system working, and real clients are shown with links.
- **Constraints:**
  - No testimonials or metrics.
  - The CRM vendor is never named.
  - Pricing is copied word for word.
  - No scroll-jacking, parallax or pins (user, 2026-11-02).
- **Memorable moment:** the hero desk handles a plumber's day while the visitor reads: a missed call answered, a job booked, an invoice paid by text, the sync to Xero, a review requested.
- **Unresolved:**
  - The interactive service demos.
  - The CRM webhook for the form.
  - Final sign-off on the copy.

## Direction contract

THESIS: A consultancy that shows its work. The page reads like a well-run operation: calm, ruled, specific. It refuses the AI-startup template: a dark neon hero, glowing objects and a centred headline over a grid of equal feature cards.

OWN-WORLD: Light-first editorial.
- Ground and paper: #F4F6FA and #FFFFFF.
- Type: ink #0F1E3A in Inter set tight, with the second headline line in slate.
- Hairline rules: 1px #E3E8EF dividing lists and ledgers.
- Materials: specular cards (a 1px edge plus a white top sheen) and frosted glass only where something floats (the desk, the form).
- Navy (#1B3160 → #0F1E3A) in exactly two bands: How we work, and the close.
- One accent-blue action per view.

STORY: The visitor reads the promise and sees it working on the desk. They recognise four leaks, scan six services as an index, and follow one order minute by minute. Then they meet the team and its five steps, see real clients, check honest prices, and book a call.

FIRST VIEWPORT:
- Desktop: a frosted header. A two-line full-measure headline, "Run the business. / We'll run the systems." (second line slate). Beneath it, five columns of lede, a primary "Book a discovery call", an outline "See what we build" and a pricing aside. On the right, seven columns hold the live desk (a glass panel, Example label, pause control).
- Mobile: headline, lede, full-width actions, then the desk.

FORM:
- Position: pinned by the user's pivot, position 1 of 1. Hero panel A, "Live desk", chosen from three 21st directions.
- Signature interaction: the desk's events arrive and act out their story (a reply typing, digits rolling, a booking dropping in, steps filling). It pauses on hover and focus, and pauses itself off screen.
- Motion grammar: native scroll, a single once-only rise-in on entry, and no pins.
- seed:bc0f9e488ad9af72 (the roll ran for the record; the user-pinned direction governs).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
