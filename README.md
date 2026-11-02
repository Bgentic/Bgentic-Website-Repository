# bgentic.io

The Bgentic marketing site: Next.js 16 (App Router, statically rendered), TypeScript, Tailwind CSS v4 and shadcn/ui.
The plan is in [docs/redesign-plan.md](docs/redesign-plan.md). Product context is in [PRODUCT.md](PRODUCT.md).

**Status:** the full initial structure.
- The home page has 8 sections.
- Services has an index plus six service pages.
- Clients, Pricing and Contact are built.
- The service demos, the CRM webhook and the redirects for legacy routes come next.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm run start   # production build
npm run lint
```

## Where things are

| Path | What it is |
|---|---|
| `src/content/*.ts` | All copy: `site`, `home`, `services`, `clients`, `pricing`. Edit words here, not in components. |
| `src/styles/tokens.css` | Brand tokens, ported verbatim from the Deal Desk (`--dd-` → `--b-`). Never edit values here. |
| `src/app/globals.css` | Theme mapping, the band system (ground / surface / navy), type scale, glass and specular materials, forms. |
| `src/components/ui/live-desk.tsx` | The hero's live desk, built on 21st.dev `dhxwhy/live-notification-feed`. |
| `src/components/home/*` | The home sections, shared with the subpages. |
| `src/components/site/*` | Header, footer, section headers, FAQ, contact form. |
| `src/app/{services,clients,pricing,contact}` | The subpages. `services/[slug]` renders all six from one template. |

## Rules the build keeps

- **Content:**
  - Pricing comes word for word from `/onboarding`.
  - No testimonials, metrics or invented claims.
  - The CRM vendor is never named.
- **Interaction:**
  - One filled action per view.
  - No scroll-jacking, parallax or pinned scroll stories.
  - Sections fade in once, where the browser supports scroll-driven animation, and are always visible otherwise.
- **Hero desk:** it pauses on hover and focus, pauses itself off screen, has a visible pause button, and shows the
  whole day as a still list under reduced motion.
- **Contact form:** until the CRM webhook is wired, it opens a pre-written email to hello@bgentic.io.
