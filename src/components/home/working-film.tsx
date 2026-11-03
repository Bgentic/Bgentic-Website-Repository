"use client"
// 03 · See it working: one window, one film. An ordinary Tuesday at an example plumbing business, moving through six
// screens of the app (overview, inbox, pipeline, automations, website, reports), the sidebar steady as each changes. It's
// rendered by scripts/demo-film.mjs (npm run film); this is its player. It plays muted and looped only while it's
// on screen, starts where its poster is so the first frame doesn't jump, and has a visible pause control (WCAG 2.2.2).
// Under reduced motion it waits on the poster until the visitor presses play. Styles: the "see it working" section of
// styles/depth.css.
import * as React from "react"
import { Pause, Play } from "lucide-react"
import { demos } from "@/content/home"
import { useReducedMotion } from "@/lib/use-reduced-motion"

const FILM = "/video/see-it-working.mp4"
const POSTER = "/video/see-it-working-poster.jpg"
/** the film's time the poster is taken from (scripts/demo-film.mjs), so playback picks up from the poster */
const POSTER_AT = 3.2

export function WorkingFilm() {
  const wrap = React.useRef<HTMLElement>(null)
  const video = React.useRef<HTMLVideoElement>(null)
  const still = useReducedMotion()
  const [choice, setChoice] = React.useState<"auto" | "play" | "pause">("auto")
  const [onScreen, setOnScreen] = React.useState(false)
  const playing = choice === "play" || (choice === "auto" && !still)

  React.useEffect(() => {
    const el = wrap.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  React.useEffect(() => {
    const v = video.current
    if (!v) return
    if (playing && onScreen) v.play().catch(() => {})
    else v.pause()
  }, [playing, onScreen])

  return (
    <figure ref={wrap} className="film-wrap">
      <div className="film mac">
        <div className="mac-bar">
          <span className="mac-lights" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="mac-title film-title">
            <svg viewBox="9.17 10.06 20.34 28.28" width="10" height="14" aria-hidden="true">
              <path
                fill="#fff"
                d="M24.45,20.88c.75-1.07,1.2-2.36,1.2-3.77,0-3.6-2.9-6.51-6.49-6.55h0s-7.45,0-7.45,0c-1.13,0-2.04.91-2.04,2.04v16.19l8.99,9.05h.5s.51,0,.51,0c4.87,0,9.06-3.72,9.33-8.58.2-3.58-1.69-6.74-4.55-8.39Z"
              />
              <path fill="#7fb0f7" d="M16.74,28.79h-7.07s8.99,9.05,8.99,9.05v-7.14c0-1.06-.86-1.92-1.92-1.92Z" />
            </svg>
            app.bgentic.io
          </span>
          <span className="mac-tag">Example</span>
        </div>
        <video
          ref={video}
          className="film-video"
          src={`${FILM}#t=${POSTER_AT}`}
          poster={POSTER}
          width={1920}
          height={1200}
          muted
          loop
          playsInline
          preload="none"
          aria-label={demos.film}
        />
      </div>
      <figcaption className="scene-foot">
        <span className="scene-caption">{demos.caption}</span>
        <button
          type="button"
          className="scene-toggle"
          onClick={() => setChoice(playing ? "pause" : "play")}
          aria-pressed={!playing}
          aria-label={playing ? "Pause the video" : "Play the video"}
        >
          {playing ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
        </button>
      </figcaption>
    </figure>
  )
}
