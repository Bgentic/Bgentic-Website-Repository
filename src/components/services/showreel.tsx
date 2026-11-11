import { servicesPage } from "@/content/pages"
import { ReelVideo } from "@/components/services/reel-video"

// /services: the showreel, the film in a dark frosted-glass bezel with a faint blue glow behind it, and a small note
// and the sound toggle under it. Playback and layout: reel-video.tsx. Styles: the services page section of depth.css.
export function Showreel() {
  const { label, note, src, description } = servicesPage.showreel
  return <ReelVideo src={src} description={description} label={label} note={note} />
}
