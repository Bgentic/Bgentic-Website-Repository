import { ViewTransition } from "react"

// Every page arrives with the same transition: the one you're leaving recedes into a dimmed card and the new one rides
// up from the bottom of the screen as a sheet (styles: "page transitions" in styles/depth.css). A template, unlike the layout, is made afresh for each page, so the
// marker below leaves with the old page and enters with the new one in the same navigation, which is what has React
// run the transition. The marker is all it names: the animation itself is on the screen's root snapshot, which is only
// ever the size of the screen, so changing page costs the same however long the page is (naming the page itself would
// have it captured whole, all 11,000px of the home page). default="none" keeps every other update still.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ViewTransition enter="page-mark" exit="page-mark" default="none">
        <span className="page-mark" aria-hidden="true" />
      </ViewTransition>
      {children}
    </>
  )
}
