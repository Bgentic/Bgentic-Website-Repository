"use client"

import * as React from "react"
import { Play, Volume2, VolumeX } from "lucide-react"

// how much of the video must be on screen for it to play; below this it pauses
const IN_VIEW = 0.35

// /services: the showreel itself. It plays while at least a third of it is on screen and pauses when it scrolls
// away, looping, with no browser controls. It always starts muted, because muting is what lets Safari and Chrome
// start it without a click; it's also set on the element here, because React doesn't reliably write the muted
// attribute into the server's HTML. A click (or Space/Enter) on the film pauses and plays it, and a paused film stays
// paused when it scrolls back into view. The Unmute/Mute toggle in the corner turns the audio on and off.
export function ReelVideo({ src, label }: { src: string; label: string }) {
  const ref = React.useRef<HTMLVideoElement>(null)
  const held = React.useRef(false)
  const [sound, setSound] = React.useState(false)
  const [paused, setPaused] = React.useState(false)

  React.useEffect(() => {
    const v = ref.current
    if (!v) return
    v.muted = true
    // the toggle follows the element, so it's right whichever side changed it
    const sync = () => setSound(!v.muted)
    v.addEventListener("volumechange", sync)
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio >= IN_VIEW) {
          if (held.current) return
          v.play().catch((err: DOMException) => {
            // a browser that won't play it with sound plays it muted instead; any other refusal (a pause that lands
            // first, a power-saving mode) just leaves the frame held
            if (err.name === "NotAllowedError" && !v.muted) {
              v.muted = true
              v.play().catch(() => {})
            }
          })
        } else v.pause()
      },
      { threshold: [0, IN_VIEW] },
    )
    io.observe(v)
    return () => {
      io.disconnect()
      v.removeEventListener("volumechange", sync)
    }
  }, [])

  const togglePlay = () => {
    const v = ref.current
    if (!v) return
    if (v.paused) {
      held.current = false
      setPaused(false)
      v.play().catch(() => {})
    } else {
      held.current = true
      setPaused(true)
      v.pause()
    }
  }

  const toggleSound = () => {
    const v = ref.current
    if (!v) return
    v.muted = !v.muted
    // unmuting also starts a film the browser had held back
    if (!v.muted && v.paused && !held.current) v.play().catch(() => {})
  }

  return (
    <>
      <video
        ref={ref}
        className="reel-video"
        src={src}
        width={1920}
        height={1080}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={`${label} Press to pause or play.`}
        tabIndex={0}
        onClick={togglePlay}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault()
            togglePlay()
          }
        }}
      />
      {paused && (
        <div className="reel-paused" aria-hidden="true">
          <span>
            <Play className="size-7 translate-x-0.5" fill="currentColor" strokeWidth={0} />
          </span>
        </div>
      )}
      <button type="button" className="reel-sound btn-spring sq" data-sound={sound ? "on" : "off"} onClick={toggleSound}>
        {sound ? <Volume2 aria-hidden="true" strokeWidth={2} /> : <VolumeX aria-hidden="true" strokeWidth={2} />}
        {sound ? "Mute" : "Unmute"}
      </button>
    </>
  )
}
