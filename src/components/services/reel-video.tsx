"use client"

import * as React from "react"
import { Volume2, VolumeX } from "lucide-react"

// how much of the video must be on screen for it to play; below this it pauses
const IN_VIEW = 0.35

// /services: the showreel itself. It plays while at least a third of it is on screen and pauses when it scrolls
// away, looping, with no browser controls. It starts muted, because muting is what lets Safari and Chrome start it
// without a click; it's also set on the element here, because React doesn't reliably write the muted attribute into
// the server's HTML. The Sound toggle in the corner turns the audio on and off.
export function ReelVideo({ src, label }: { src: string; label: string }) {
  const ref = React.useRef<HTMLVideoElement>(null)
  const [sound, setSound] = React.useState(false)

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

  const toggleSound = () => {
    const v = ref.current
    if (!v) return
    v.muted = !v.muted
    // the click also starts a film the browser had held back
    if (!v.muted && v.paused) v.play().catch(() => {})
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
        aria-label={label}
      />
      <button type="button" className="reel-sound btn-spring sq" aria-pressed={sound} onClick={toggleSound}>
        {sound ? <Volume2 aria-hidden="true" strokeWidth={2} /> : <VolumeX aria-hidden="true" strokeWidth={2} />}
        Sound
      </button>
    </>
  )
}
