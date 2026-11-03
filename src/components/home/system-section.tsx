import { ContainerScroll } from "@/components/ui/container-scroll-animation"
import { LiveDesk } from "@/components/ui/live-desk"
import { desk, deskEvents, engine } from "@/content/home"

// Every tool you juggle, pulled into one system. One headline, then the app itself in a glass window that leans back
// and swings up over the headline's last line as the section scrolls (components/ui/container-scroll-animation). The
// live desk floats nearer, at the window's lower right: the app at work. Beneath the window, on the centre line where
// the eye lands once it settles, the caption rises in (the problem in slate, the answer in white) and the tools it
// replaces sit in one frosted dock, the way a dock sits under a screen.
//
// The screen is the Opportunities board from app.bgentic.io, rebuilt in Bgentic tokens and rendered natively at each
// screen density (1124px is the window's widest on screen), then served as lossless PNGs so text stays on the pixel
// grid: the image optimiser's WebP re-encode blurs small UI text. The deals are example data.
const SCREEN = "/images/system/crm-opportunities"
const WIDTHS = [1124, 1405, 1686, 2248, 3372]

export function SystemSection() {
  return (
    <section className="system section" aria-labelledby="system-title">
      <div className="container-b">
        <ContainerScroll
          titleComponent={
            <h2 id="system-title" className="sys-title mx-auto">
              {engine.title}
            </h2>
          }
          overlay={<LiveDesk events={deskEvents} business={desk.business} day={desk.day} height="17rem" />}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- pre-rendered per density; see the note above */}
          <img
            src={`${SCREEN}-1124.png`}
            srcSet={WIDTHS.map((w) => `${SCREEN}-${w}.png ${w}w`).join(", ")}
            sizes="(min-width: 1232px) 1124px, calc(100vw - 4rem)"
            width={1124}
            height={702}
            loading="eager"
            decoding="async"
            alt="Example: the Bgentic app with the Opportunities board open, six deals across New Lead, Contacted, Qualified and Proposal Sent in the marketing pipeline."
            className="block h-auto w-full"
          />
        </ContainerScroll>

        <p className="sys-caption reveal mx-auto mt-16 max-w-[40rem] text-center md:mt-32">
          {engine.intro} <span className="text-ink">{engine.answer}</span>
        </p>
        <ul className="tool-dock reveal mt-10" aria-label="Tools it connects">
          {engine.tools.map((tool) => (
            <li key={tool} className="tool-dock-item">
              {tool}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
