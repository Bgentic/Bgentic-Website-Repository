---
name: Bgentic
description: AI built systems, managed. A navy observatory with one luminous system at its centre.
colors:
  # the brand palette (Bgentic brand guidelines, 2026-11): navy the most, light blue the least
  navy: "#060b17" # deepened from the guidelines' #0f172a: same hue and chroma ratio, OKLCH 0.150 / 0.029 / 266
  light-blue: "#3b82f6"
  cream: "#fbf7f3"
  slate: "#5d5a63"
  sand: "#d7cfc5"
  # mixes of it, each with one job
  navy-raised: "#0c101c"
  navy-raised-2: "#0f141f"
  navy-glow: "#152c55"
  navy-glow-deep: "#112344"
  text-on-navy: "#938f8c"
  quiet-on-navy: "#82807f"
  slate-on-sand: "#474650"
  blue-hover: "#5692f6"
  # semantic status only, never decoration
  signal-success: "#45cf92"
  signal-warn: "#f2b544"
  signal-danger: "#f0787c"
typography:
  display:
    fontFamily: "Inter Variable, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2.75rem, 1.55rem + 4.1vw, 5rem)"
    fontWeight: 640
    lineHeight: 1.02
    letterSpacing: "-0.035em"
    fontVariation: "'opsz' auto"
  headline:
    fontFamily: "Inter Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.25rem + 2.5vw, 3.5rem)"
    fontWeight: 640
    lineHeight: 1.06
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Inter Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.012em"
  lede:
    fontFamily: "Inter Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 0.98rem + 0.35vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Inter Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "-0.006em"
  label:
    fontFamily: "Inter Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1.3
  index:
    fontFamily: "Inter Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0em"
    fontFeature: "'tnum'"
rounded:
  sm: "7.2px"
  md: "9.6px"
  lg: "12px"
  xl: "16.8px"
  pill: "999px"
spacing:
  gutter: "clamp(1rem, 4vw, 2.5rem)"
  container: "72rem"
  container-wide: "80rem"
  header: "4rem"
  grid-cell: "64px"
  stack-sm: "0.75rem"
  stack-md: "1.5rem"
  stack-lg: "2.5rem"
components:
  button-primary:
    backgroundColor: "{colors.light-blue}"
    textColor: "{colors.navy}"
    rounded: "{rounded.lg}"
    height: "44px"
    padding: "0 20px"
  button-primary-hover:
    backgroundColor: "{colors.blue-hover}"
    textColor: "{colors.navy}"
  button-glass-on-navy:
    backgroundColor: "rgba(255, 255, 255, 0.05)"
    textColor: "{colors.cream}"
    rounded: "{rounded.lg}"
    height: "44px"
    padding: "0 20px"
  button-glass-on-paper:
    backgroundColor: "rgba(255, 255, 255, 0.55)"
    textColor: "{colors.navy}"
    rounded: "{rounded.lg}"
    height: "44px"
    padding: "0 20px"
  card-on-navy:
    backgroundColor: "{colors.navy-raised}"
    textColor: "{colors.text-on-navy}"
  card-on-paper:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.slate}"
  icon-tile-on-paper:
    backgroundColor: "rgba(59, 130, 246, 0.07)"
    textColor: "{colors.light-blue}"
---

# Design System: Bgentic

## Overview

**Creative North Star: "The Navy Observatory"**

The site is a dark instrument room lit from one source. A deep navy field holds a single luminous point cloud, the ink orb, which stands for Bgentic's system and is carried through the opening of the page: it sits in the hero, takes the spine between each problem and its fix, then docks as the hub of the six services. Everything else on the stage is quiet so the light has somewhere to fall: white display type set tight, pale sky body copy, 1px hairlines, a faint technical grid that fades out from the orb.

Below the hero the page alternates between two materials (2026-11, from the brand guidelines). Navy carries the product: the app, the film, the clients and the close. Warm paper carries the story between them: cream for the four leaks, how we work and pricing, sand for the services. Each band is one material, so the change between them reads as turning a page rather than a change of site. Depth comes from light (a radial glow, a lit top edge, a navy shadow under paper), never from neon or saturated colour. The palette is pinned by the brand: navy, light blue, cream, slate and sand. Do not invent colours; mix these.

Density is low and rhythmic: one idea per viewport on the stage, generous fluid padding, measures held to 34–46ch.

**Key Characteristics:**
- Navy bands for the product, cream and sand bands for the story, alternating down the page.
- One luminous object (the ink orb) as the only illustration.
- Inter Variable at every size, optical sizing on, display weights at 640 with negative tracking.
- Pill buttons; exactly one filled accent action per view.
- Motion is native scroll, sticky pins, CSS scroll timelines and one critically damped spring. No animation library.
- Light and dark themes switch by token, not by second stylesheet.

## Colors

The Bgentic brand palette, exactly as the brand guidelines give it (2026-11). Navy is used the most and light blue the least; cream, slate and sand support them. Every other colour on the site is a mix of these five, named below with the one job it does. The palette lives in `src/styles/depth.css` (`:root`) and re-points the inherited tokens for the navy bands (`:root[data-theme="dark"]`) and the paper bands (`.paper`, `.paper-sand`).

### The palette
- **Navy #060B17** (navy): the primary. The ground of every navy band, the ink of every paper band, and the label on the filled action. The guidelines give #0F172A; the site deepens it to a near-black navy for depth (2026-11-03), keeping its hue (266°) and its chroma for its lightness so it still reads as navy beside cream, not black.
- **Light Blue #3B82F6** (light-blue): the accent, used least. The one filled action per view, the focus ring, the selected tab, the rail's fill, links and icons on navy, and small graphic marks on paper. Never text on paper: it's 3.5:1 on cream.
- **Cream #FBF7F3** (cream): headings on navy (18.5:1), the paper bands' ground, and paper cards.
- **Slate #5D5A63** (slate): body copy and notes on cream (6.3:1).
- **Sand #D7CFC5** (sand): the services band's ground, and the warm base of the grey text on navy.

### Mixes, each with one job
- **Navy raised** (navy-raised #0c101c, navy-raised-2 #0f141f): navy lifted toward cream for surfaces on navy: cards, windows, panels.
- **The inherited dark sheet** (cards #20242f, fills #2e313b, lines #32363f, glass, sky tints #102141 to #204685): the Deal Desk's dark tokens, which the subpages' components still use, moved onto navy at the lightness each had, so their elevation steps hold. They're re-pointed in `depth.css`; `tokens.css` is untouched.
- **Navy glow** (navy-glow #152c55, navy-glow-deep #112344): navy tinted with blue for the faint light behind a navy band's content.
- **Text on navy** (text-on-navy #938f8c, quiet-on-navy #82807f): sand dimmed into navy for body copy (6.1:1) and notes (5.0:1).
- **Slate on sand** (slate-on-sand #474650): slate deepened with navy for body copy on sand (6.0:1); plain slate on sand is 4.4:1.
- **Blue hover** (blue-hover #5692f6): the filled action's hover, the blue lifted toward cream.
- White and black appear only as alphas for light and shadow: a lit top edge, a gloss, a shadow.

### Signal colours
- **Success, warning, danger** (signal-success, signal-warn, signal-danger): the only colours outside the palette, and only ever a status, such as Paid, Overdue or Live, as a small mark or pill beside its words. Never decoration.

### Named Rules
**The Band Rule.** A band is one material. Navy carries the product (hero, the app, the film, clients, the close); paper carries the story (the leaks, how we work and pricing on cream, the services on sand). Bands alternate, so two navy bands never touch. Inside a paper band a few things stay navy, the product showing through: photographs, the example panels on the service cards, the step numbers, the engineering strip and the popular plan. They re-point their own tokens back to navy (`.paper :is(...)`).

**The Pairing Rule.** Only the brand's approved pairings carry text: cream or sand on navy, navy or slate on cream, navy or deep slate on sand, navy on light blue. White on light blue is 3.7:1 and is not used; the filled action's label is navy.

**The Least Rule.** Light blue is rare by design: one filled action per view, and otherwise only state (selected, focused, live) and fine graphic marks. If a view has two blue fills, one of them is wrong.

**The Verbatim Sheet Rule.** `src/styles/tokens.css` is the Deal Desk's sheet, ported verbatim. Never edit a value in place; the brand palette re-points its tokens from `depth.css`.

## Typography

**Display Font:** Inter Variable (with ui-sans-serif, system-ui, -apple-system, Segoe UI)
**Body Font:** Inter Variable, the same family
**Label/Mono Font:** none; indices use Inter's tabular figures

**Character:** one family at every size, as on the Deal Desk and the proposals. The optical-size axis gives the display cut at headline sizes and the text cut at body sizes; hierarchy comes from weight and tracking, not from a second face.

### Hierarchy
- **Display** (640, 44px to 80px fluid, 84px at 1600px and up, 1.02): the hero h1 only, a two-line lockup that never wraps a line at 1024px and up. The second line takes the stage accent. It never animates on load.
- **Headline** (640, 32px to 56px fluid, 1.06, -0.03em): section titles on the stage and the light page.
- **Title** (600, 19px, 1.3, -0.012em): problem, fix and service names.
- **Lede** (400, 17px to 20px fluid, 1.55): the hero lede (max 40ch) and section intros (17px to 19px, max 46ch).
- **Body** (400, 16px, 1.55 to 1.6, -0.006em): row and node text, held to 34–38ch.
- **Label** (500, 15px): navigation links (86% opacity, full on hover) and medium buttons (550). The 01 column legend is 14px at 500.
- **Index** (500, 12px, 0 tracking, tabular figures): the spine rail's section numbers; 600 for the current section.

### Named Rules
**The Weight-Not-Face Rule.** Display and headline sit at 640, titles at 600, actions at 550, labels at 500. Contrast between levels comes from these steps and tightening tracking (-0.006em body to -0.035em display), never from a second typeface.

**The Balanced Lines Rule.** Headings use balanced wrapping and paragraphs pretty wrapping; measures stay between 34ch and 46ch.

## Layout

A single centred container, `min(100% - 2 * gutter, container)`, with a fluid gutter (16px to 40px) and a 72rem container that widens to 80rem at 1600px and up. The fixed header is 4rem tall, and anchors scroll-pad by the header plus 1rem.

The hero is a full viewport (at least 40rem) on a 12-column grid at 1024px and up: copy in columns 1–6, the orb's anchor in 7–12, 24px column gap. Below 1024px it is one column, copy first and the orb under it, and below 640px the hero actions go full width.

Section 01 is a three-column matrix at 1024px and up: problems right-aligned on the left, an empty spine (15rem to 22vw) in the middle where the orb sits, fixes on the right. Below that each row stacks, with the fix indented behind a hairline. Section 02 is a two-column list from 640px; at 1024px and up the six services alternate left and right of a central column sized to 70% of the orb, the outer rows leaning 24px toward the core. Vertical padding is fluid and viewport-aware (for example 96px to 144px on 01), so the stage breathes on tall screens.

The orb's canvas box is `min(86vw, 27.5rem)` static and `min(42vw, 80svh, 40rem)` at 1024px and up; it is sized once at its largest and only ever drawn smaller.

The spine rail sits fixed in the left gutter, vertically centred, from 1280px; below 1536px its current label shows only while the rail is hovered or focused, so it never sits over hero copy.

### Named Rules
**The Brief-Pinned Grid Rule.** The 64px technical grid behind the hero belongs to the stage, pinned by the brief: 1px lines at 7% sky-400, masked by a radial fade centred on the orb (centred under the copy below 1024px). It is not a general background texture for other sections.

## Elevation & Depth

Depth is light, not lift. On the stage it comes from the navy gradient, a 48rem by 36rem radial glow behind the orb, the `screen`-blended canvas, and frosted glass where the header crosses the stage. On the light page it is the Deal Desk's layered shadows (a tight contact shadow under a soft ambient one) and, in the dark theme, lightness steps rather than shadow.

### Shadow Vocabulary
- **Action halo** (`inset 0 1px 0 rgb(255 255 255 / 0.18), 0 1px 2px rgb(15 30 58 / 0.3), 0 10px 28px -10px rgb(43 111 230 / 0.7)`): the filled primary button only; the blue halo is what makes it the one lit thing in the view.
- **Glass sheen** (`inset 0 1px 0 rgb(127 176 247 / 0.28)`): the glass button's top edge on the stage.
- **Node glow** (`0 0 1.5rem -0.25rem rgb(43 111 230 / 0.55)` with a 1px sky-400 ring at 55%): a service icon once it is lit in 02.
- **Card, lift, float, glass** (`--b-shadow-card`, `--b-shadow-lift`, `--b-shadow-float`, `--b-glass-shadow`): the inherited Deal Desk depth set for light-page surfaces.
- **Frosted header** (`blur(16px) saturate(180%)` on the light page; navy at 74% with `blur(16px) saturate(160%)` over the stage): replaced by solid fills under reduced transparency.

### Named Rules
**The One Light Rule.** On the stage, glow belongs to the orb, the primary action and lit service icons. Nothing else emits light.

## Shapes

Round where the hand touches, square where the eye reads. Every action is a full pill (999px), and service icons sit in 44px circles with a 1px hairline. Sections, rows and the stage itself are unboxed: no cards on the stage, structure is carried by 1px hairlines (stage rules at 16% sky-400), the grid and alignment. The base radius for shadcn surfaces is 12px with a 7.2px, 9.6px and 16.8px scale around it. Focus is a 2px outline offset 3px: accent-blue on light, sky-400 inside the stage.

## Components

### Buttons
Pills that press: the press answers in 120ms at 97% scale, hover and colour changes run 160ms on the ease-out curve.
- **Shape:** full pill (999px); weight 550, -0.006em tracking; sizes sm (36px, 16px padding, 14px), md (44px, 20px, 15px), lg (48px, 24px, 16px), icon (36px square).
- **Primary:** light blue fill with a navy label (the brand pairing, 5.35:1), a cream-lit top and a soft blue halo; hover lifts the blue toward cream. The one filled action in a view.
- **Glass on navy:** a 5% white fill, a 1px white edge and a lit top, cream label. The partner action on navy bands, and inside the navy islands on paper.
- **Glass on paper:** a white-lit cream fill, a 1px navy edge at 14% and a navy shadow, navy label. The partner action on cream and sand bands.
- **Quiet:** no fill, current colour; hover to a 6% current-colour wash. The theme toggle.

### Navigation
- **Header:** fixed, transparent at rest. Over the stage the type is white and the logo is the on-dark version; once anything scrolls under it the header takes the stage's navy, frosted. Over the light page it frosts in the toolbar white with a hairline. Links are 15px at 500, 86% opacity rising to full on hover. Colour and fill transitions run 220ms.
- **Spine rail:** the page's numbered index, in the left gutter from 1280px. Each entry is a tabular two-digit number, a 12px tick and a label that slides in 4px. The current section steps up in colour and weight (sky-400 to white on the stage, slate to ink on light) and its tick lengthens; the others never fade below 4.5:1.

### Problem / Fix Row (01)
A recognised leak paired with the system that closes it. Each cell is an 18px outline mark (danger or success) beside a title and a 38ch text. At 1024px and up the problem mirrors to the right edge of its column and both rules draw toward the orb in the spine. Visually hidden "Problem" and "Fix" labels carry the pairing for screen readers and in monochrome.

### Service Node (02)
A 44px icon circle (20px outline icon in sky-400, 6% sky fill, 1px stage hairline) beside a title and 34ch text. Where the orb travels, each node's glow fades in and a 1px rule draws toward the core, in reading order, as the pinned section scrolls.

### Client Gallery (05)
The four real clients as a product shoot.
- **Grid:** from 1280px, one row of four across the full width of the screen. The cards are the one part of the page that drops the container, with a slim margin of `clamp(1rem, 2.2vw, 2.5rem)` each side. The heading, intro and hint above them keep the page's container, so they line up with every other section. From 1024px to 1279px it's a 2 × 2 grid; below that, one column.
- **Studio shape:**
  - **Row (1280px and up):** square. The monitor spans the top with a 16:10 screen. A smaller tablet (52%) and phone (18%) are grouped in front of its foot and overlap only its bottom edge, so almost all of the screen shows.
  - **640px to 1279px:** wide (16:9). The monitor stands centred on its stand and foot, and the tablet and phone stand in front of its lower corners.
  - **Phones:** tall (4:5).
- **Card body:**
  - **Head:** the name with the trade under it, and "Visit site" beside them. In the row, "Visit site" folds to its arrow; its words stay in the accessible name.
  - **Facts:** under a hairline, Runs on Bgentic and the Services chips. They sit side by side on wide cards and stack in the row.
- **Card:** dark glass (raised navy, grain, the 1px edge, a deep navy shadow) with an 8px inset studio at 4:5.
- **Studio:** palette light. Cream falls from above onto a wall and settles into a navy floor. Warm cards use a sand wall; cool cards use cream mixed with light blue over navy-glow-deep. Neighbours alternate.
- **Devices:** a monitor, a tablet and a phone, each a raised-navy bezel lit along its top, showing the client's live site. The screenshots come from `npm run shots:clients`. Everything inside is sized in container units, so the composition holds at any card width.
- **Portrait:** a cut-out portrait dropped into `public/images/clients/<slug>/` stands at the right, and the devices close up to the left. See `docs/client-portraits.md`.
- **Device scale:** the devices take the studio nearly edge to edge. The monitor is 94% of its width with a 4:3 screen, and starts at the studio's top. The tablet (73%) runs right up to the phone (23%), which overlaps its edge, so they read as one cluster.
- **Card in hand (hover, or keyboard focus):** a light-blue 1px edge, a faint blue light under the card and a 4px lift, all in 260ms. The other cards step back to 62% opacity.
- **Scroll:** the card in hand scrolls its site down the monitor over 7s and returns in 0.9s. Reduced motion keeps it still.
- **Hint:** one quiet glass pill for the whole gallery, under the section heading. It reads "Hover a card to scroll through its site · Click to view it live" ("Tap a card to view the site live" on touch). Its light-blue dot pulses three times when the gallery comes into view.
- **Services:** the services each client uses show as chips that link to the service pages.
- **Studio click:** clicking the studio opens the live site. It's a pointer-only twin of "Visit site": out of the tab order and hidden from screen readers.
- **Below the studio:** the name (21px, 600), then a hairline and two facts: Trade and Runs on Bgentic, with 11px tracked labels. Then the glass "Visit site" action and the service chips, which link to their pages.
- **No proof claims:** no quotes, logos or results.

### Service pages (/services/[slug])
One template for all six services, in bands:
1. **Navy hero:** breadcrumb, headline, lede and the two actions, beside a dark glass "at a glance" panel (`service-glance.tsx`). It shows the icon, name, summary and the three highlights with checks, plus the clients running it.
2. **Sand:** "What we build", as paper sheets.
3. **Navy:** the service working (`service-demo.tsx`).
   - **CRM:** the live app in its glass window.
   - **Automations:** the "See it working" film.
   - **Ecommerce:** the order journey (Example).
   - **Websites:** the client gallery.
   - **Consultancy and SEO:** a plain "the interactive demo lands here next" panel that offers a call.
4. **Cream:** who it's for, who's running it, the questions, and the other five as glass buttons.
5. **Navy:** the close.

### Subpages (/services, /contact)
Built from the home page's bands and parts. Copy lives in `src/content/pages.ts`.
- **/services, in bands:**
  1. **Navy hero:** the promise, beside a triage panel ("Where it hurts").
  2. **Sand:** the services bento.
  3. **Navy:** the path ("How the six fit together").
  4. **Cream:** common questions.
  5. **Navy:** the close.
- **/contact, in bands:**
  1. **Navy:** the close, set as the page's h1 and clearing the header (`.contact-page`).
  2. **Cream:** three "other ways in" paper sheets (email, log in, the plans), then common questions.
- **Triage panel:** dark glass. Each of the four leaks is a row linking to the service that closes it, with a glass chip naming the service. The chip's edge turns light blue on hover. Below 480px the chip drops under the text.
- **Path:** five dark glass stops, one customer's path from search to reorder. From 1280px they sit in one row, joined by a fine light-blue line through their icons. Each stop links to its service and lifts 3px with a light-blue edge on hover. The engineering strip closes the band as "AI consultancy sits behind all five".
- **Reach sheet:** a cream paper card: a tile, a 21px title, a body line and an action naming its target. It lifts 3px on hover.

### Pricing block (home 06 and /pricing)
The 21st.dev pricing block (`src/components/blocks/pricing.tsx`), on the shadcn tokens, with one set of plans for both pages (`src/lib/pricing-plans.ts`).
- **On /pricing:** it opens the page on navy, with light blue as primary; `--primary-foreground` is navy, the brand pairing.
- **On the home page:** it holds the cream band between the clients and the close, under "Serious systems. Predictable pricing." There, `.pricing-paper` re-points its tokens to paper:
  - **Type:** navy text, slate notes and navy hairlines.
  - **Light blue:** only on the popular border, the badge, the switch, the checks and the popular button. The "Save 9%" text turns navy.
  - **Cards:** cream paper sheets lit from above.
- **Kept as designed:** the monthly/annual switch, which fires confetti in light blue, blue-hover, cream and sand. NumberFlow rolls the AUD prices. On entry the three cards spring into a 3D fan: the outer two lean back and in at 94%, and the popular one rises 20px with a light-blue 2px border and badge.
- **Prices and features:** the real plans from `content/pricing.ts`. Each card shows its users and AI credits, then its features in full. The terms sit under the switch.
- **Annual on:** the big number is the year's price over twelve months, to the cent, with "Billed annually at $X" (the year's total) under it. The switch's saving is computed from the totals ("Save 9%").
- **Bands:** the plans in navy; then, on cream, what sits outside the plans and the questions; then the close.

### Booking (/contact)
/contact opens on booking, over the hero's kinetic grid (`booking-grid.tsx`), which is lit from behind the calendar.
- **Two numbered steps:** they sit side by side from 1024px and stack below that.
  1. Book your call: Bgentic's own booking widget, embedded as given in a dark glass frame. Its script sizes the iframe.
  2. Tell us where the time goes: the enquiry form in the contact card.
- **Below:** the other ways in and the questions, on cream.

### Footer (site-wide)
The 21st.dev "cinematic" motion footer (`src/components/ui/motion-footer.tsx`), in the site's fonts and tokens.
- **Curtain reveal:** from 768px wide and 700px tall, it sits fixed under the page, and the last section scrolls away to reveal it. Smaller screens get it in the normal flow.
- **Motion:** a giant BGENTIC and the heading ("Get your hours back.") rise in on a scrubbed GSAP ScrollTrigger. The pills lean toward a fine pointer.
- **Content:** the two ways to start (book a call, free trial), the six services, the other pages, the inbox, log in, the legal pages, and the company line with ACN and ABN.
- **Bottom bar:** three columns from 768px, so the "Built and run in Sydney, NSW" badge is truly centred. The company line is on the left, and the developer's credit and back to top are on the right. Phones stack them.
- **Developer credit:** the CP monogram (`public/brand/cp-logo.webp`, 20px, at 80%) with "Designed & developed by Christian Padilla", the name in cream. It's a link to christianpadilla.online that opens in a new tab and underlines the name on hover.

### The close (home 07, and /services and /pricing)
The enquiry form, and under it the other way in: an engineering-strip card, "Rather talk it through?", whose glass "Book a call" goes to the calendar on /contact.
- **Marquee:** a tilted marquee of the services runs across the top. It pauses under the pointer and is hidden from screen readers.
- **Reduced motion:** nothing moves.
- **GSAP:** the footer is the one place it's used, added at the user's request (2026-11-04).

### Ink Orb (signature)
The InkOrbit sculpture: a fixed-size point cloud (2,800 core points and 16,000 grains on desktop) of ink loops and bridges in pale sky with a sky-400 accent and a glass core, drawn on black and `screen`-blended over the stage. Any two seeds morph grain for grain, so the orb can reforge from the hero form to the hub form once, at the dock. Touch and narrow devices draw a lighter tier (5,600 grains, 30fps). Its idle spin comes to rest after 3.2s, and it fades out over any text block it would cover.

**Travel.** Only at 1024px and up with hover and motion allowed, decided by one CSS media query that the controller reads; there is no JS-only mode. The orb's layer goes sticky for the stage and a scroll position maps to four keyframes measured from the layout: K0 the hero's right column, K1 the spine of 01 (90% opacity, drifting up as rows pass), K2 docked at the hub of 02 (pinned), K3 receding to 86% of the dock size as the services settle, then fading out. A critically damped spring (stiffness 130, damping 23; about 0.35s, no overshoot) carries position, zoom and opacity between them, with the ease-in-out curve on movement and the ease-out curve on arrivals. Low-passed scroll velocity adds spin and tilt.

**Static.** Everywhere else, including reduced motion, the orb sits still in the hero slot and only renders while the hero is on screen; 01 and 02 read as plain, fully lit lists.

### Motion system
- **Curves:** ease-out `cubic-bezier(0.23, 1, 0.32, 1)` for arrivals and state changes; ease-in-out `cubic-bezier(0.77, 0, 0.175, 1)` for on-screen travel; the drawer curve `cubic-bezier(0.32, 0.72, 0, 1)`; and three springs sampled into `linear()` (spring, settle, pop) that fall back to ease-out where `linear()` is unsupported.
- **Durations:** press 120ms, quick 160ms, sheet 220ms, spring and travel 280ms, panel 320ms.
- **Scroll-driven reveals:** pure CSS `view()` and named view timelines, inside `@supports (animation-timeline: view())`. 01 rows rise 12px and fade in from entry 0% to cover 28%, and their rules draw from entry 40% to cover 42%. In 02 the section pins for one viewport (a 200svh track); each node lights across an 8% slice of the pin, staggered 10% apart from 8% to 66%, and the close rises in from 70% to 84%.
- **Reduced motion:** no orb fade-in, no travel or pin, no scroll reveals, and no transitions on the header, rail or skip link. Everything is shown in its final state. Print shows every reveal finished and hides the orb, rail and header.

## Do's and Don'ts

### Do:
- **Do** keep exactly one filled light-blue action per view; its partner is glass, on navy or on paper.
- **Do** alternate the bands (navy, then cream or sand) and keep each band one material; mark a new light band `.paper` (cream) or `.paper .paper-sand`.
- **Do** verify every text pair at WCAG 2.2 AA: cream on navy 18.5:1, text-on-navy 6.1:1, light blue on navy 5.35:1, slate on cream 6.3:1, slate-on-sand 6.0:1, navy on light blue 5.35:1.
- **Do** gate any travelling or pinned motion on `(min-width: 1024px) and (hover: hover) and (prefers-reduced-motion: no-preference)`, in CSS first.
- **Do** use native scroll, sticky pins, CSS scroll timelines and the one critically damped spring for motion.
- **Do** use the spine rail's numbers as the page's section index; that is where numbering lives.
- **Do** keep danger and success to small marks and fading 1px rules beside text.

### Don't:
- **Don't** add an animation library; the orb controller is plain DOM and the reveals are CSS.
- **Don't** put eyebrow or kicker labels over headings, numbered or otherwise; the numbered spine is a navigation rail, not a heading ornament.
- **Don't** reuse the technical grid outside the hero stage; it is pinned by the brief to the orb.
- **Don't** invent colours outside the brand palette and its named mixes, or edit `tokens.css` values in place.
- **Don't** set light blue text on cream or sand (3.5:1 and 2.4:1), or white text on light blue (3.7:1).
- **Don't** animate the h1 on load, or let anything that starts on its own move for more than 5 seconds.
- **Don't** set display type in a second face; Inter Variable carries every level.
