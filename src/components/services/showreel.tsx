import { servicesPage } from "@/content/pages"
import { ReelVideo } from "@/components/services/reel-video"

// /services: the showreel, the film in a dark frosted-glass bezel with a faint blue glow behind it, the note and its
// controls under it, and a full-screen player behind a click. Playback and layout: reel-video.tsx. Styles: the
// services page section of depth.css.
export function Showreel() {
  const { label, note, src, poster, description } = servicesPage.showreel
  return <ReelVideo src={src} poster={poster} description={description} label={label} note={note} />
}
