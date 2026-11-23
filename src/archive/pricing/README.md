# Archived: the three priced plans (Basic, Standard, Premium)

Archived 2026-11-23, when Bgentic moved from public pricing tiers to one plan quoted to each business. Nothing in
this folder is live: no route or component imports it, and it's excluded from type-checking (`tsconfig.json`),
linting (`eslint.config.mjs`) and Tailwind's class scan (`@source not` in `src/app/globals.css`).

The files are byte-for-byte what was live in commit `58291fb`. The folders mirror where each file lived under `src/`,
so restoring is mostly moving them back.

| Archived file | Lived at | What it is |
| --- | --- | --- |
| `app/pricing/page.tsx` | `src/app/pricing/page.tsx` | The old /pricing page: the plans (navy), "What sits outside the plans" and the questions (cream), the close |
| `components/blocks/pricing.tsx` | `src/components/blocks/pricing.tsx` | The 21st.dev pricing block: the monthly/annual switch with confetti, NumberFlow prices, the 3D fan of three cards |
| `components/home/pricing-section.tsx` | `src/components/home/pricing-section.tsx` | Home 06, the same block on the cream band |
| `lib/pricing-plans.ts` | `src/lib/pricing-plans.ts` | The plans shaped for the block, with annual prices and the saving |
| `content/pricing.ts` | `src/content/pricing.ts` | The tier data: prices, annual totals, users, AI credits, features, terms and the FAQ |
| `content/home-pricing-intro.ts` | `pricingIntro` in `src/content/home.ts` | The home band's title and intro |
| `styles/pricing-paper.css` | `src/styles/depth.css` | The block's paper re-pointing for the cream band, and the phones' lift selector |

## Restoring

1. `src/content/pricing.ts` now holds the quote-based plan. Rename it (or merge it), then move each archived file back
   to the path in the table.
2. Move `pricingIntro` back into `src/content/home.ts`.
3. Paste `styles/pricing-paper.css` back into `src/styles/depth.css`, as its header says.
4. In `src/app/page.tsx`, swap `PlanSection` back for `PricingSection` (home 06).
5. Undo the copy that was rewritten for quotes, in `git diff 58291fb`: the home hero's aside, the contact page's
   third "way in" and its last question, the website FAQ in `content/services.ts`, and the CRM demo's three plan
   invoices in `content/crm-demo.ts`.
6. Remove `src/archive` from the three exclusions above, or delete this folder once it's all back.

The block's dependencies are still installed and unused by the live site, so a restore needs no install:
`@number-flow/react`, `canvas-confetti` (+ `@types/canvas-confetti`), `src/hooks/use-media-query.ts`,
`src/components/ui/switch.tsx` and `src/components/ui/label.tsx`. Remove them if the archive is ever deleted.
