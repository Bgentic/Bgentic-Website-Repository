# Bgentic website redesign — phased plan (v2)

**v2, 2 Nov 2026:** aligned to the **Bgentic Build Brief: Website + SEO Agent** (10 Oct 2026). Where the
brief and Christian's master brief disagree, the build brief wins.

What changed from v1:
- **Positioning:** Bgentic is presented as an AI consultancy, not a SaaS.
- **Structure:** six service pages, each with an interactive demo, replace the four audience pages.
- **Clients:** blurbs with a link, no testimonials.
- **Contact:** a simple contact form.
- **Pricing:** copied exactly from today's site.
- **Home:** 8 sections instead of 10.
- **SEO agent:** the content is set up so the agent can edit it from day one.

## Context

The brief: a sharp, simple new bgentic.io on the new branding.
- **Positioning:** "we are an AI consultancy, not a SaaS. GoHighLevel is a tool we use, not the pitch."
- **Six services,** each with a demo product: AI consultancy, automations, CRM, websites, ecommerce, SEO
  marketing.
- **Client showcase:** NPP Traffic Solutions, Sydney Pink Slips, We Are Art, Sventy8 Events. A blurb and a link
  each; no testimonials.
- **Also:** a login to the app, a simple contact form, and pricing exactly as it is now, presented cleanly.
- **Stack and domain:** a fast static stack; keep bgentic.io.
- **SEO agent:** built on Claude in parallel. It checks and updates the site every day, so the site must be easy
  for it to edit safely.
- **Order of work:** the website comes first, and client work takes priority once it's live.

`/onboarding`, `/terms`, `/privacy` and `app.bgentic.io` keep working untouched. The first build is the
`InkOrbitHero` spike: an orb that travels from the hero and docks as the hub of the six services.

**No code until you say "go".**

---

## 1. What I found (repo and live site)

1. **This folder is empty.** The live site's source is not on this machine, so we build fresh.
2. Live bgentic.io is a **prerendered React SPA from GoHighLevel's AI site builder**, behind Cloudflare. You own
   DNS.
3. Live routes: `/`, `/services`, `/onboarding` (2 steps: plan → payment), `/terms`, `/privacy`. The contact
   forms post via JS, probably to GHL.
4. **Brand (confirmed):**
   - The **logo suite** is in `Deal Desk Project/Logo/` (26 Oct). Its colours are #0F172A and #3B82F6, and the
     logo keeps them.
   - The site palette is the **Deal Desk tokens**: `src/index.css` L14–180, easing at L214–312, glass at
     L658–725.
   - The tagline is "AI built systems, managed" (Deal Desk PRODUCT.md L49).
   - Logos to use: `public/brand/bgentic-{logo,icon}-on-{light,dark}.svg` and the favicons.
5. **Business facts:**
   - Bgentic Pty Ltd, ACN 699 335 754, ABN 27 699 335 754.
   - hello@bgentic.io, Sydney NSW.
   - No phone number or street address is on file.
6. Deal Desk proposals link to `bgentic.io/terms`, so it must stay live.
7. **Stack: Next.js App Router, statically rendered (the brief's "fast static stack"), + TypeScript + Tailwind v4
   + shadcn/ui on Vercel.**
   - Layout: `src/`, with `@/*` → `./src/*`.
   - The only server code is the contact form endpoint and the legacy-route proxy.

## 2. Brief check: how this plan meets each line

| Brief | How the plan meets it |
|---|---|
| New branding throughout | The logo suite plus the token palette (§1.4), on every page. Rolling the brand out to invoices, emails, GHL, social and documents is a **separate task**. That includes the Deal Desk proposals and emails. |
| AI consultancy, not a SaaS; GHL a tool, not the pitch | The hero leads with "AI built systems, managed." and the main action is **Book a discovery call**. The free trial appears only on Pricing. **GoHighLevel is never named and never claimed as ours**: no "proprietary", no "our platform"; the copy says "we set up and run it". The CRM demo uses plain labels, not GHL's menu names. |
| Six services, each with a demo | `/services` plus six service pages, each with an **interactive demo built into the page** (§8) |
| Client showcase (4), blurb + link | `/clients` and a home section, one card each: what they do, what we run for them, a link to their site. Use "We Are Art", not Advanced Rave Technologies. |
| Login to our app | Header and footer: Login → `app.bgentic.io` |
| Simple contact form | `/contact`: name, email, message, and an optional "which service?" field |
| Pricing exactly as now, cleanly | `/pricing` and a home section copy `/onboarding` word for word: Basic $199 / Standard $349 / Premium $499 a month, inc GST; users; $10/$15/$20 AI credits; inclusions; 14-day trial, card required; month to month, no lock-in; AI billed on usage; custom websites at additional cost. No new tiers. **The pricing file is locked**, so nobody (including the SEO agent) changes it without sign-off. |
| No testimonials | No quotes, ratings, metrics or "loved by" rows anywhere. `proof={null}` in the hero. |
| Fast static stack, keep bgentic.io | Statically rendered pages. Mobile targets: LCP < 2.5 s, INP < 200 ms, CLS < 0.1. The domain stays; the legacy routes are proxied (§6). |
| Sharp and simple | Home has 8 sections. The scroll stories move to the service pages. About, the integrations list and the FAQ are folded in, not separate pages. |
| SEO agent updates pages daily | **The content is set up for the agent from day one (§6.2).** Building the agent itself is outside this plan. |
| Website first | Phases 0 and 1 are merged now that the brief is in hand |

**Remaining tensions:**
1. DESIGN.md says "nothing animates on page load". The h1 is static; only the orb canvas fades in. The cycling
   accent line is removed entirely, which is simpler and gives no WCAG 2.2.2 or CLS risk.
2. DESIGN.md bans eyebrow kickers. The spine uses sentence case and tabular numerals: `01 · Where businesses
   lose time`.
3. DESIGN.md says no motion library. None is used (§4).
4. DESIGN.md says one type family. Inter Variable only.
5. Live `/terms` says "v1.0, effective 11 Aug 2026", but Deal Desk `legal.js` says `2026-10-19`. Out of scope;
   flag it to the boss.

## 3. Skills and MCPs (all installed)

| Tool | What we use |
|---|---|
| **impeccable** v4.8.0 | `init` (PRODUCT.md), `shape`, `critique`, `audit`, `document` (DESIGN.md + `.impeccable/design.json`), `typeset`, `layout`, `clarify`, `adapt`, `optimize`, `polish`, `harden` |
| **ui-ux-pro-max** | `python ~/.claude/skills/ui-ux-pro-max/scripts/search.py "<q>" --domain style\|typography\|landing\|ux\|web`, `--stack nextjs` |
| **emil-design-eng** (+ `animate`, `apple-design`) | Curves `--ease-out (.23,1,.32,1)`, `--ease-in-out (.77,0,.175,1)`, `--ease-drawer (.32,.72,0,1)`; UI ≤ 300 ms; reduced motion means fewer, gentler animations |
| **21st.dev** | MCP (`search`, `get_component`) for starting points (nav, pricing, cards, tabs); `21st-ui-build`, `21st-ui-review`; CLI via `npx @21st-dev/cli` |

## 4. Reference board, typeface, motion stack

1. **Apple product pages:** one idea per viewport, and sticky media with scrubbed progress. Model for the
   services hub and the Order Journey.
2. **Linear:** restraint, 1px specular borders, numbered sections. Model for the `00–07` spine.
3. **Vercel:** fine grid lines and node-and-edge diagrams. Model for the Automations flowchart.
4. **Stripe:** live product demos embedded in the page. Model for the service-page demos.
5. **Attio:** a CRM shown as real, clickable UI. Model for the CRM demo.
6. **Mercury / Ramp:** plain, public pricing tables and FAQs. Model for Pricing.
7. **Raycast:** glass panels with top-edge highlights on dark bands. Model for the glass cards.
8. **Resend:** one sculptural object plus quiet type. Model for the orb's role.

**Typeface: Inter Variable** (SIL OFL 1.1), self-hosted via `next/font` with the `opsz` axis. Display: 600–700
weight, −0.03em tracking, fluid `clamp()`. Tabular figures for prices.

**Motion stack: no animation library.** Every piece runs on native scroll, never hijacked:

| Piece | How |
|---|---|
| Pins | CSS `position: sticky` |
| Scrubbed choreography | CSS scroll-driven animations (`view-timeline` / `animation-timeline`), compositor-run on transform and opacity. Gated by `@supports` and `prefers-reduced-motion: no-preference`, with a static end state as the fallback. |
| Discrete state | IntersectionObserver sentinels |
| The orb | A bespoke ~150-line controller in the canvas's rAF: a critically damped spring in pixel space, plus velocity-fed spin |
| Micro-interactions | CSS transitions with the Deal Desk `--ease-*` and `linear()` spring tokens |

- **Cost:** about 0 KB of library JavaScript.
- **Lenis:** not planned.
- **Escape hatch:** Motion's vanilla `scroll()` (~5 KB) if Firefox parity is needed.

---

## 5. Starter: the ink orbit hero and the travelling orb (built first)

### 5.1 Integration steps
1. Scaffold with `create-next-app` (TS, ESLint, Tailwind v4, App Router, `src/`, `@/*`), then `npx shadcn init`
   (`src/components/ui`).
2. Port the tokens into `src/styles/tokens.css`: values verbatim, `--dd-` → `--b-`, with a source-lines header.
   Map them into `@theme inline` and onto shadcn's variables.
3. Load Inter via `next/font`. Add the theme pre-paint script (Deal Desk `index.html:17-22` pattern): follow the
   system setting, with a toggle.
4. Split the 21st file into `ink-orbit-hero.tsx` and `ink-orbit-sculpture.tsx` (exported), both in
   `src/components/ui`. Delete `DemoDialog`, `Portrait`, `Brackets`, the word cycler, and the hatch and panel
   CSS.
5. Build `src/components/home/orb-stage.tsx` (client) and `src/lib/orb-controller.ts`.
6. Greybox 01 (the real four pairs) and 02 (six service nodes). Deploy a protected Vercel preview.

### 5.2 Adaptations
- **Colours:**
  - The stage is a navy band in both themes. Light: `linear-gradient(180deg, #1B3160, #0F1E3A 60%)`. Dark:
    `#0F1217` with a `#182B4D` glow.
  - Grid lines: `#7FB0F7` at 6% alpha.
  - Orb: `ink #C9DDFD`, `accent #7FB0F7`.
  - The canvas draws on `bg #000`, and the layer gets `mix-blend-mode: screen` inside `isolation: isolate`.
    Fallback: an alpha-based depth fade.
  - Expose `ink`, `background`, `accent`, `density`, `maxDpr`, `hud`.
- **Look:**
  - Remove the hatch, the bordered panel, the art-panel gradient and `overflow:hidden`, the brackets, the HUD,
    the crosshair and the faces.
  - Primary button: accent `#2B6FE6` with white text (4.65:1).
  - Secondary button: glass with a 1px border and a sky-400 top highlight.
  - The header overlays the stage with no blur, and becomes frosted after it.
- **Copy (draft; final in 2B), consultancy first:**
  - h1: **"AI built systems, managed."** One static line, no cycling.
  - Lede: "Bgentic is an AI consultancy in Sydney. We find where your business loses time, then build and run the
    automations, CRM, website, online store and SEO that fix it."
  - Main action: **Book a discovery call** → `/contact`. Second: **See our services** → `#services`. Login stays
    in the header.
  - No trial button in the hero.
- **Removed:** the proof row (`proof={null}`); the demo dialog (`demoSteps={[]}`); the Manrope, Newsreader and
  JetBrains Mono references; the component's own theme detection (colours are passed in).
- **Accessibility:**
  - The canvas is decorative: `aria-hidden`, no `role`, `tabIndex -1`, `pointer-events: none`.
  - No drag, click or keyboard handlers (WCAG 2.1.1). A passive mouse lean stays on `pointer: fine`.
  - The stage has `class="dark"`.

### 5.3 Approach: a sticky stage that docks as the services hub
One canvas sits in a sticky layer across 00–02.
- **00:** it sits in the hero's right column.
- **01:** it glides to the centre spine of the problem/fix grid. The orb is "the consultancy": broken states go
  in on the left, fixes come out on the right.
- **02:** it docks as the **hub of the six services**.
  - It reforges once at the dock (the existing 1.3 s grain morph + shock ring).
  - AI consultancy, Automations, CRM, Websites, Ecommerce and SEO marketing light up around it, one at a time.
  - It then recedes as the six service cards settle into links.
- No frosted glass ever sits over the live canvas.

```css
.orb-stage  { display:grid; isolation:isolate; overflow:clip }       /* never overflow:hidden on ancestors */
.orb-stage > * { grid-column:1 }
.orb-layer  { grid-row:1 / 4; align-self:start; position:sticky; top:0; height:100svh;
              pointer-events:none; mix-blend-mode:screen; z-index:0 }
/* sections 00, 01, 02 in rows 1-3 at z-index 1; 02 is a 200svh track with an inner sticky viewport */
@media not ((min-width:1024px) and (hover:hover) and (prefers-reduced-motion:no-preference)) {
  .orb-layer { position:relative; grid-row:1; height:auto }          /* static orb in the hero slot */
}
```
- Travel vs static is CSS only.
- The canvas box is fixed: `S = min(42vw, 80svh, 640px)`. CSS does translate and opacity only. The size changes
  through a `zoom` drawn on the canvas, which avoids grain shimmer.
- Anchors are `[data-orb-anchor="hero|spine|dock"]`, measured on resize, font load and orientation change. On
  touch devices, ignore height-only changes under 150 px (URL bar).

### 5.4 Coordinates by breakpoint (orb centre; `S` = canvas box)

| Viewport | Mode | K0 hero | K1 spine of 01 | K2 hub of 02 | K3 cards settle |
|---|---|---|---|---|---|
| **375** | Static | x 188, below the copy (page y ≈ 700); S ≈ 322 px | — | — | — |
| **768** | Static | x 384, below the copy (page y ≈ 715); S = 440 px | — | — | — |
| **1280** (×800) | Travel | (940 px, 54%); S = 538 px; zoom 1 | (640 px, 52% → 46%); zoom 0.42; opacity 0.9 | (640 px, 48%); zoom 0.8 | (640 px, 44%); zoom 0.62; opacity 0.22 → 0 |
| **1920** (×1080) | Travel | (1280 px, 54%); S = 640 px; zoom 1 | (960 px, 52% → 46%); zoom 0.42 | (960 px, 48%); zoom 0.85 | (960 px, 44%); zoom 0.62; opacity 0.22 → 0 |

- Travel runs only at `(min-width:1024px) and (hover:hover)`. Phones and tablets show a static hero orb, and 02
  becomes a plain grid of six service cards.
- 01 reserves a centre spine column `minmax(240px, 22vw)`. The six hub nodes sit on a ring of radius ≈ 0.75 S
  around K2.

### 5.5 Scroll ranges and orb physics

| Segment | Range | Animated | Easing |
|---|---|---|---|
| S1 K0 → K1 | 01 top: viewport bottom → 25% | translate, opacity 1 → 0.9, zoom 1 → 0.42 | Position `(.77,0,.175,1)`, zoom `(.23,1,.32,1)` |
| S2 hold | 01: top 25% → bottom 75% | y drift 52% → 46% | Linear |
| S3 K1 → K2 | 02 top: viewport bottom → top | translate, zoom → 0.8, opacity → 1 | `(.77,0,.175,1)` |
| S4 pin (02, 200svh) | Progress 0 → 1 over 100svh | 0–0.04 reforge. 0.08–0.70 the six nodes light in turn (CSS timeline). 0.70–0.88 zoom → 0.62, opacity → 0.22, cards settle. 0.90–1.0 opacity → 0, rAF cancelled | `(.77,0,.175,1)` |

- **Spring:** stiffness 130, damping 23, mass 1, ≈ 0.35 s to settle, no overshoot. A jump of more than 0.2 in
  progress in one frame teleports.
- **Reforge:** forward at S4 ≥ 0.04; back at S3 < 0.6. Crossing back mid-morph reverses it (swap from/to,
  `morphT = 1 − morphT`). A reload inside 02 shows the hub seed directly.
- **Spin:** `ω = clamp(v·0.0009, −4, 4)` rad/s, decaying `×0.15^dt`. Lean: `clamp(v·0.00012, −0.22, 0.22)`. The
  idle spin comes to rest 5 s after the last input (WCAG 2.2.2).
- **API:** `onReady(handle)` and `handle.send({type:'impulse'|'lean'|'reforge'|'paused'|'zoom'|'tier'|'jump'})`.
  The render gate belongs to the controller: stage in view, opacity > 0.02, tab visible.

### 5.6 Performance

| Tier | Cores | Grains | Lens | DPR | FPS |
|---|---|---|---|---|---|
| Desktop (travel) | 2800 | 16k × zoom² | on | 2 | ≈ 60 (refresh ÷ n) |
| Touch / phone (static) | 1400 | 5.6k | off | 1.5 | ≈ 30; stops off screen |

- **Free gains:** inline projection, sort into depth bins once, pre-built colours, skip the morph mix when idle.
- **Clouds:** build each cloud once at maximum counts and draw a prefix. Both seeds are precomputed in idle time
  and cached.
- **Governor:** drops a tier when p95 draw time goes over 6 ms (desktop) or 8 ms (touch).
- **Escalation:** OffscreenCanvas in a worker, then WebGL2.
- **LCP:** the h1 is the LCP element; the orb mounts after idle into a reserved box.

### 5.7 Starter acceptance criteria
- Lighthouse mobile: LCP < 2.5 s, CLS < 0.05.
- At 1280 and 1920 the orb glides K0 → K3 without snapping. It reverses exactly, reforges once, and jumps
  teleport.
- Spin follows scroll speed and rests within 5 s.
- p95 draw ≤ 4 ms on desktop and ≤ 8 ms on a mid-range Android. No orb task > 50 ms after LCP. INP p75 < 200 ms.
- No orb frames once it's off screen or faded out.
- Reduced motion, 375 and 768: static orb, no travel or spin, same layout height.
- Canvas `aria-hidden`; axe 0 serious; the h1 is read once.
- The orb never covers text or blocks a click. Both themes signed off at 375, 768, 1280 and 1920.
- **Positioning check:** the first screen reads as a consultancy (the boss signs off at Gate C).

---

## 6. Site structure

**Nav:**
- **Services** (menu: AI consultancy · Automations · CRM · Websites · Ecommerce · SEO marketing) · Clients ·
  Pricing · Contact
- Right side: Login (`app.bgentic.io`) · **Book a call** (primary)

**Footer:**
- The six services, Clients, Pricing, Contact, Login, Terms, Privacy.
- "Bgentic Pty Ltd · ACN 699 335 754 · ABN 27 699 335 754" and hello@bgentic.io.

| URL | Page | Notes |
|---|---|---|
| `/` | Home | 8 sections (§7) |
| `/services` | Services index | **Keeps the live URL.** Legacy hashes map client-side: `#proof` → `/clients`, `#contact` → `/contact`, `#why` → `/#how-we-work`, `#engage`/`#grow`/`#manage` → `/services/crm`; `/#mobile` → `/services/crm#mobile` |
| `/services/ai-consultancy`, `/automations`, `/crm`, `/websites`, `/ecommerce`, `/seo-marketing` | Service pages | One template, one demo each (§8) |
| `/clients` | Client showcase | 4 cards, no testimonials |
| `/pricing` | Pricing | Copied exactly from `/onboarding`, plus FAQ → `/onboarding` |
| `/contact` | Contact | Simple form |
| `/onboarding*`, `/terms`, `/privacy` | **Legacy, proxied** | Next `rewrites` to the GHL site on a hidden, noindexed domain (plus `/assets/:path*`). The URLs never change. Fallback: 308 `/onboarding` → `join.bgentic.io/onboarding`. |
| `/resources` | Reserved | For pages the SEO agent writes later; not built now |

- **DNS cut-over:** only the apex and `www` move. `app.`, MX, SPF, DKIM and DMARC stay untouched.
- **Form:** `src/app/api/enquiry/route.ts` (zod validation, honeypot plus a minimum fill time) → a GHL inbound
  webhook (`GHL_ENQUIRY_WEBHOOK_URL`) → contact, opportunity and staff alert in Bgentic's own account.
- **Analytics:** Vercel Web Analytics + Speed Insights.
  - Main conversions: `contact_submit` and `book_click`.
  - Also tracked: `trial_click`, `login_click`, `demo_interact`, `client_site_click`.

### 6.2 Making the site easy for the SEO agent to edit (built in from day one)

| Item | Detail |
|---|---|
| Content as files the agent can edit | Page copy lives in `content/**/*.mdx` with typed frontmatter: title, description, h1, summary, FAQ items, schema type. It's validated by zod at build, so a bad edit fails the build instead of reaching production. Components render the content and never hold copy. |
| Edit allowlist | The agent may edit `content/services/*.mdx`, `content/home.mdx` (copy fields), `content/faq/*.mdx`, metadata, and new `content/resources/**` pages. **Locked:** `content/pricing.json`, legal, contact details, components, styles and config (CODEOWNERS + a CI check). |
| How changes land | The agent opens a pull request → Vercel preview → checks (build, schema validation, link check, Lighthouse budget) → merge. Small copy edits merge automatically; flagged changes wait for the WhatsApp approval described in the brief. |
| Search foundations | JSON-LD (Organization, ProfessionalService, Service ×6, FAQPage, BreadcrumbList); `sitemap.ts` with lastmod; `robots.ts` that allows AI crawlers (GPTBot, PerplexityBot, Google-Extended); `llms.txt`; canonicals; per-page OG images; a clean heading hierarchy; Search Console and Bing Webmaster verification |
| Out of scope | The agent itself (Claude, the daily check, WhatsApp, its knowledge base and system prompt) |

## 7. Home: 8 sections (theme band in brackets)

| # | Section | Story job | Content and motion |
|---|---|---|---|
| 00 | Hero [navy stage] | Say who we are: an AI consultancy | "AI built systems, managed.", the lede, Book a discovery call / See our services; orb at K0 |
| 01 | Where businesses lose time [navy stage] | Name the problems we fix | 4 pairs (DOM pairs each problem with its fix): leads and orders go cold → instant AI voice, SMS and portal triage · scattered pipelines and rekeying into Xero/SAP → one pipeline, synced automatically · follow-up left to memory → automatic reminders, ETA alerts, no-show recovery · disconnected tools → one connected system. Icon + text, not colour alone. Orb at K1 |
| 02 | Six services, one system [navy stage, short pin] | What we do | The orb docks as the hub; the six services light up; each card links to its page. Mobile: a plain grid |
| 03 | See it working [light] | Proof by demo, not by testimonial | Tabs, one per service. Each loads a compact demo when its tab is picked (§8). No pin |
| 04 | How we work [surface] | Consultancy process plus the people | Map, Design, Build, Launch, Support, and a short "who we are": a Sydney team of consultants and software engineers |
| 05 | Clients [light] | Real businesses we run systems for | NPP Traffic Solutions, Sydney Pink Slips, We Are Art, Sventy8 Events. Blurb, what we run for them, link. No quotes |
| 06 | Pricing [light] | Clear, unchanged prices | The three plans exactly as now; trial, GST and no-lock-in notes; link to `/pricing` (the trial action lives here) |
| 07 | Contact [navy] | One next step | The simple form, "We reply within one business day", hello@bgentic.io, and a Login link |

## 8. Service pages and their demos

Every service page uses the same template:
1. Outcome line.
2. The problem it fixes.
3. What we build (3–5 points).
4. **The demo.**
5. Clients who use it (real ones, with a link).
6. How we work (short).
7. FAQ (3–5).
8. Book a call.

| Service | Interactive demo (in the page) | Comes from |
|---|---|---|
| **AI consultancy** | "Where are you losing time?": 4 quick questions that point to a suggested starting point. It runs in the browser and sends nothing unless the visitor chooses to. AI voice and chat assistants are covered here. | The 01 problem/fix pairs |
| **Automations** | A Yes/No flowchart with a two-track toggle. Leads: call or form → AI receptionist → booked? → reminders → showed? → text-to-pay + review, or no-show recovery. Orders: reorder → ERP sync → in stock? → pick list + scan, or backorder SMS → proof of delivery + invoice. Integrations list: SAP, Xero, MYOB… | The master brief's flowchart |
| **CRM** | The clickable CRM preview with plain labels (Inbox, Calendar, Contacts, Pipeline, Payments, Automations, Reviews, Reports, AI assistant, Mobile app). `#mobile` section; BDM workflows | The live site's CRM preview, rebuilt |
| **Websites** | Client sites we built: live previews with links, plus "a form that lands in your CRM" mini demo | Client sites (confirm which ones we built) |
| **Ecommerce** | A trade portal reorder in 60 seconds (labelled *Example*), plus the **pinned Order Journey**: 7:42 placed → 7:43 synced to ERP → 8:10 backorder alert → 9:15 picked and scanned → 11:02 dispatched → 2:24 delivered | The live `/services` page |
| **SEO marketing** | The SEO agent's daily report: a WhatsApp-style summary, page changes and rankings for bgentic.io. Labelled *Sample* until the agent is live, then real data. | The SEO agent (dogfooding) |

- **Clients:** 4 cards, each with what they do, what we run for them (linking to those services) and a link to
  their site. Blurbs are rewritten from the live site in plain terms, with no tool names.
- **Pricing:**
  - The plans table and full comparison, copied exactly from `/onboarding`.
  - The AI credits note.
  - "Custom websites and builds are quoted separately" (today's wording).
  - FAQ: trial, card, lock-in, GST, credits, users, cancelling.
  - CTAs → `/onboarding`.
- **Contact:**
  - Form fields: name, email, which service (optional), message.
  - The reply promise, hello@bgentic.io, Login, and the legal identifiers.
  - A calendar link only if you give me one.
- **404:** links to Services, Clients and Contact.

## 9. Component inventory

| Component | Source | Used on |
|---|---|---|
| `SiteHeader`, `ServicesMenu`, `MobileNav` | shadcn NavigationMenu + Sheet; 21st starting point | All |
| `SiteFooter`, `ThemeToggle` (from Deal Desk `theme.js`) | Custom | All |
| `SectionSpine` (`00 · …`), `Button` (primary, glass, text) | Custom / shadcn | All |
| `GlassPanel`, `SpecularCard`, `GridBackdrop`, `NavyBand` | Custom (Deal Desk glass) | All |
| `InkOrbitHero`, `InkOrbitSculpture`, `OrbStage` + `orb-controller` | 21st, adapted + custom | Home |
| `LossMatrix` (01) | Custom | Home, AI consultancy |
| `ServicesHub` (02), `ServiceCard` | Custom | Home, `/services` |
| `DemoTabs` (03) | shadcn Tabs, lazy panels | Home |
| `ServiceTemplate` (MDX-driven) | Custom | 6 service pages |
| Demos: `LossFinder`, `SystemFlowchart`, `CrmPreview`, `WebsiteShowcase`, `TradePortalDemo`, `OrderJourney` (pinned), `SeoReportDemo` | Custom | Service pages, Home 03 |
| `ProcessSteps` (5 steps) | Custom | Home, service pages |
| `ClientCard` | Custom | Home, `/clients`, service pages |
| `PricingTable`, `PlanComparison`, `CreditsNote` | 21st pricing starting point → tokens | Pricing, Home |
| `FAQ` | shadcn Accordion | Pricing, service pages |
| `ContactForm` (react-hook-form + zod) | shadcn Form | Contact, Home 07 |
| `JsonLd`, `MdxContent`, `LegacyHashRedirect` | Custom | All / Services |

## 10. Motion spec

| Element | Trigger | Property | Duration | Easing | Reduced motion |
|---|---|---|---|---|---|
| Orb travel K0 → K3 | Scroll (controller) | translate3d, opacity, canvas zoom | Scrubbed, spring ≈ 0.35 s | `(.77,0,.175,1)` / `(.23,1,.32,1)` | Static in the hero |
| Orb reforge | Threshold with hysteresis | Grain morph + ring | 1.3 s / 1.1 s | easeInOutCubic | Instant, no ring |
| Orb spin and lean | Scroll velocity, mouse | Yaw, pitch | τ ≈ 0.5 s; rest after 5 s | Exponential | Off |
| Orb mount | After idle | opacity | 400 ms | `(.23,1,.32,1)` | Instant |
| 01 rows and hairlines | `view()` per row | opacity, translateY 12 px; `scaleX` | Scrubbed (entry) | Linear | Static |
| 02 service nodes | 02 timeline 8–70% | Glow-layer opacity (text never below 4.5:1) | Scrubbed | Linear | All lit |
| 02 cards settle | 02 timeline 70–88% | translateY 24 → 0, opacity | Scrubbed | Linear | Static grid |
| 03 demo tab switch | Click | Panel opacity cross-fade | 200 ms | `(.23,1,.32,1)` | Instant |
| Service and client card hover | `:hover` (`hover:hover`) | translateY −2 px, border opacity | 200 ms | `(.23,1,.32,1)` | Border only |
| Flowchart track toggle (Automations) | Click | Path `scaleX` reveal, node opacity | 300 ms | `(.77,0,.175,1)` | 150 ms fade |
| Order Journey line (Ecommerce) | `--journey` timeline | `scaleY` | Scrubbed | Linear | Static list |
| Order Journey stops | IntersectionObserver sentinel | opacity, translateY 16 px; `aria-current` | 300 ms | `(.23,1,.32,1)` | All visible |
| Section entries | `view()` entry | opacity, translateY 12 px, 60 ms stagger | 400 ms | `(.23,1,.32,1)` | Opacity 200 ms |
| Buttons | `:active` | scale 0.97 | 120 ms | `(.23,1,.32,1)` | None |
| Services menu | Open | opacity, scale 0.98 → 1 | 200 ms | `(.23,1,.32,1)` | Opacity 150 ms |
| FAQ | Click | grid-rows 0fr → 1fr | 250 ms | `(.32,.72,0,1)` | Instant |
| Theme switch | Click | View-transition circle | 400 ms | `(.77,0,.175,1)` | Instant |

**Pinned sections and keyboard focus:**
- `:focus-within` forces the revealed state.
- `focusin` scrolls the track to that stop.
- `scroll-padding-top` matches the header height.

---

## 11. Phases and gates

### Starter: ink orbit hero spike (M)
- **Goal:** judge the look, feel and consultancy positioning on real scrolling code.
- **Tasks:** §5.
- **Files:** `package.json`, `next.config.ts`, `src/app/{layout,page}.tsx`, `src/styles/*`,
  `src/components/ui/ink-orbit-*.tsx`, `src/components/home/{orb-stage,hero}.tsx`, `src/lib/orb-controller.ts`,
  `public/brand/*`.
- **Skills:** emil-design-eng, animate, impeccable `shape` and `critique`, 21st, ui-ux-pro-max.
- **Deliverables:** a protected preview URL, a 30-second recording, a performance summary.
- **Risks:**
  - Android frame budget. Mitigation: tiers, then worker, then WebGL2.
  - Safari blend mode. Mitigation: alpha mode.
  - The boss finds the orb too much for "sharp and simple". Mitigation: fall back to a static hero orb, which is
    a CSS-only switch.

### Phase 0+1: Discover and structure (M) → **Gate A+B: scope, sitemap, messaging, wireframes approved**
- **Tasks:**
  - Crawl the live site: URLs, form submissions (HAR), onboarding calls.
  - DNS and hosting audit.
  - **Proxy spike** for `/onboarding` (GHL test-mode payment), `/terms` and `/privacy`.
  - `impeccable init` → website `PRODUCT.md` (consultancy positioning, banned claims: no testimonials, no
    vendor naming, no "proprietary").
  - `impeccable critique` and `audit` of the live site.
  - Messaging per service, sitemap (§6), coded grey-box wireframes at 375 and 1280.
  - The content set-up for the agent (§6.2) agreed with the SEO agent's design.
- **Files:** `docs/`, `PRODUCT.md`, `.impeccable/`, greybox `src/app/**`, `content/` skeleton.

### Phase 2A: Design system and home slice (L) ‖ Phase 2B: Content (M) → **Gate C: look, feel and copy approved**
- **2A:**
  - Tokens → theme, fluid type scale, glass and elevation.
  - Finish home 00–03 in both themes.
  - The `ServiceTemplate` with one finished demo (CRM).
  - `impeccable document` → `DESIGN.md`.
- **2B:**
  - Copy for every page in plain Australian English (consultancy voice, no hype, no tool names).
  - Six service pages and their FAQs.
  - Client blurbs (sent to each client for a fact check).
  - Pricing copied exactly from `/onboarding`.
  - Skill: impeccable `clarify`.

### Phase 3: Build (L) → **Gate D: feature complete on staging**
- All pages and six demos.
- Responsive at 375, 768, 1280 and 1920, in light and dark.
- Contact → GHL webhook.
- Rewrites and redirects, legacy hash map.
- §6.2 search foundations and edit locks.
- Analytics, 404.

### Phase 4: Polish and QA (M) → **Gate E: launch checklist passes**
- impeccable `audit`, `polish`, `harden`, `optimize`; `21st-ui-review`.
- axe, keyboard and screen reader.
- Reduced motion and reduced transparency.
- Core Web Vitals on real devices.
- Proofreading.

### Phase 5: Launch and hand over (S)
- DNS cut-over runbook (TTL lowered 24 h ahead; rollback = repoint the apex).
- Watch enquiries and field data.
- **Connect the SEO agent** to the repo through the §6.2 pull-request flow.
- Then client work takes priority, as the brief says.

**Separate from this plan:** brand rollout to invoices, emails, signatures, GHL, social and documents (including
the Deal Desk proposals and emails), and the SEO agent build.

## 12. Launch checklist
- [ ] `/onboarding` end-to-end through the proxy (GHL test mode). `/terms` and `/privacy` render.
      `app.bgentic.io` login works.
- [ ] Every legacy URL resolves. `/services` legacy hashes map. 404 works.
- [ ] DNS: zone exported. MX, SPF, DKIM, DMARC and `app.` untouched. TLS valid. `www` → apex.
- [ ] **Brief compliance:**
  - Consultancy positioning on every page.
  - GoHighLevel never named and never claimed as ours.
  - No testimonials, ratings or metrics.
  - Pricing identical to `/onboarding` (an automated check compares the values).
  - All six services have a working demo.
  - All four clients are shown with working links.
- [ ] axe 0 serious at 375 and 1280. Keyboard and screen reader passes. Contrast per the token table.
- [ ] Reduced motion: complete static story.
- [ ] Mobile CWV: LCP < 2.5 s, INP < 200 ms, CLS < 0.1. Orb budgets met.
- [ ] Safari macOS and iOS, Android Chrome, Firefox, Edge; both themes.
- [ ] Contact reaches GHL (contact, opportunity, alert). Spam traps and error states work.
- [ ] Agent foundations:
  - JSON-LD validates (Rich Results Test).
  - Sitemap, robots (AI crawlers allowed), `llms.txt`, canonicals and OG images are in place.
  - Pricing and legal edit locks are tested.
- [ ] Analytics events fire; no stray `noindex`. Footer shows ACN and ABN. Rollback rehearsed.

## 13. Open questions (defaults in brackets)
1. Which client websites did Bgentic build, for the Websites demo? [Only those you confirm.]
2. Where will the code live (GitHub org or repo)? The SEO agent's pull-request flow needs it. [A new private
   GitHub repo under Bgentic.]
3. Discovery-call calendar link? [Contact form only.]
4. Existing analytics (GA4, Meta pixel)? [Vercel Analytics only.]
5. Mobile app facts for `/services/crm#mobile`. [A short section, no store badges.]
6. Integrations and AI capabilities we can truthfully claim. [Only those on today's site: SAP, Xero, MYOB,
   Google Business Profile, Facebook Messenger.]
7. Does `/onboarding` accept `?plan=standard`? [Plain link.]
8. Launch date, and who signs off each gate. [The boss signs off Gates A+B to E.]

## 14. Verification
- `npm run lint`, `tsc --noEmit`, `npm run build`. The build validates all MDX frontmatter with zod.
- **Vitest:**
  - Orb controller maths.
  - `pricing.json` matches the onboarding prices.
  - Content schema checks.
  - A banned-words check: "GoHighLevel", "GHL", "proprietary", "testimonial".
- **Playwright:**
  - Routes return 200.
  - Proxied `/onboarding` shows "Choose your plan".
  - Legacy hashes map.
  - Every demo mounts.
  - Axe at 375 and 1280.
  - Reduced-motion screenshots.
- Lighthouse CI on previews. Chrome traces with 4× CPU throttle.
- **Real devices:** iPhone, Pixel 7a or Galaxy A55, iPad.
- **Manual:**
  - A test-mode checkout through the proxy.
  - A test enquiry reaching GHL.
  - A dry-run agent pull request that edits a service page (passes) and `pricing.json` (blocked).
