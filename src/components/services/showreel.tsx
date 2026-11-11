import { servicesPage } from "@/content/pages"
import { ReelVideo } from "@/components/services/reel-video"

// /services: the showreel, a 16:9 screen in a dark frosted-glass bezel with a faint blue glow behind it, and a small
// note under it. The film plays on the screen while it's in view (reel-video.tsx). Styles: the services page section
// of depth.css.
export function Showreel() {
  const { label, note, src, description } = servicesPage.showreel
  return (
    <figure className="reel">
      <div className="reel-glow" aria-hidden="true" />
      <div className="reel-frame">
        <div className="reel-screen">
          <ReelVideo src={src} label={description} />
        </div>
      </div>
      <figcaption className="reel-note">
        <i aria-hidden="true" />
        <b>{label}</b>
        <span>{note}</span>
      </figcaption>
    </figure>
  )
}
