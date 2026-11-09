import { REDUCED_MOTION } from "@/lib/media"

/** further than this many screens down, the way back up is the glide below rather than a scroll through the page */
const FAR = 1.5

/** whether the page is far enough down that going back to its top is the glide (on every page alike) */
export const farDown = () => window.scrollY > window.innerHeight * FAR

// Back to the top of the page you're on (the logo, back to top in the footer), always as one fluid movement, on every
// page alike. Nearby, it's the browser's own smooth scroll. From further down a scroll would have to draw every section
// on the way, a long run of glass, blurs and imagery that no device paints smoothly, so instead the screen you're on
// glides down and away while the top of the page comes down from above it, the two joined edge to edge like one long
// strip: it reads as a scroll up, and it is only two pictures moving, on the compositor (a view transition; styles:
// "back to the top" in styles/depth.css). Under reduced motion it goes straight there.
export function scrollToTop() {
  if (matchMedia(REDUCED_MOTION).matches) return window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  if (location.hash) history.replaceState(history.state, "", location.pathname + location.search)
  const root = document.documentElement
  if (!farDown() || typeof document.startViewTransition !== "function") {
    return window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }
  root.classList.add("vt-glide")
  const glide = document.startViewTransition(() => window.scrollTo({ top: 0, left: 0, behavior: "instant" }))
  glide.finished.finally(() => root.classList.remove("vt-glide"))
}
