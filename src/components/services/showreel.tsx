import { Play } from "lucide-react"
import { servicesPage } from "@/content/pages"

// /services: the showreel's place, a 16:9 screen in a dark frosted-glass bezel with a faint blue glow behind it. Until
// the one-minute reel is cut it's a placeholder that looks the part: a quiet grid and light on the screen, a glass play
// mark at the centre, and a small note saying the reel is on its way. Nothing here is clickable yet. When the reel
// arrives, a <video> takes the screen's place. Styles: the services page section of depth.css.
export function Showreel() {
  const { label, note } = servicesPage.showreel
  return (
    <figure className="reel" aria-label={`${label}: ${note}`}>
      <div className="reel-glow" aria-hidden="true" />
      <div className="reel-frame">
        <div className="reel-screen" aria-hidden="true">
          <span className="reel-play">
            <Play className="size-7 translate-x-0.5" fill="currentColor" strokeWidth={0} />
          </span>
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
