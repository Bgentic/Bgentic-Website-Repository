import { CrmApp } from "@/components/crm/crm-app"
import { ContainerScroll } from "@/components/ui/container-scroll-animation"
import { LiveDesk } from "@/components/ui/live-desk"
import { desk, deskEvents, engine } from "@/content/home"

// Every tool you juggle, pulled into one system. One headline, then the app itself in a glass window that lies back
// and lifts upright over the headline's last line as the section scrolls; on desktop the two then hold together for a
// moment, the whole headline readable over the flat app (components/ui/container-scroll-animation). Inside is the app, live: every sidebar tab opens its view
// (components/crm). The live desk floats nearer, at the window's lower right: the app at work. Beneath the window,
// on the centre line where the eye lands once it settles, the caption rises in (the problem in slate, the answer in
// white) and the tools it replaces sit in one frosted dock, the way a dock sits under a screen.
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
          <CrmApp />
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
