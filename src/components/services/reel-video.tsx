"use client"

import * as React from "react"
import { Volume2, VolumeX } from "lucide-react"

// how much of the video must be on screen for it to play; below this it pauses
const IN_VIEW = 0.35

type Props = { src: string; description: string; label: string; note: string }

// /services: the showreel. The film sits alone inside the glass bezel, with nothing laid over it; the note and the
// Mute/Unmute toggle sit under the bezel. It plays with sound while at least a third of it is on screen and pauses
// when it scrolls away, looping, with no browser controls. When the browser won't start sound before the visitor has
// touched the page, it starts the film silently and the sound comes on at their first click, tap or key press
// anywhere. A click (or Space/Enter) on the film pauses and plays it; a paused film stays paused when it scrolls
// back into view.
export function ReelVideo({ src, description, label, note }: Props) {
  const ref = React.useRef<HTMLVideoElement>(null)
  const reel = React.useRef<HTMLDivElement>(null)
  const held = React.useRef(false) // paused by the visitor
  const userMuted = React.useRef(false) // muted by the visitor
  const waiting = React.useRef(false) // started silently by the browser; sound comes on at the first interaction
  const release = React.useRef<() => void>(() => {})
  const [sound, setSound] = React.useState(true)

  React.useEffect(() => {
    const v = ref.current
    if (!v) return
    // the toggle follows the element, so it's right whichever side changed it
    const sync = () => setSound(!v.muted)
    v.addEventListener("volumechange", sync)

    // the first interaction anywhere brings the sound in; the film and the toggle handle their own clicks
    const onFirst = (e: Event) => {
      if (e.target instanceof Node && reel.current?.contains(e.target)) return
      release.current()
    }
    const disarm = () => {
      window.removeEventListener("pointerdown", onFirst, true)
      window.removeEventListener("keydown", onFirst, true)
    }
    release.current = () => {
      disarm()
      if (!waiting.current) return
      waiting.current = false
      if (!userMuted.current) v.muted = false
    }

    const play = () => {
      v.muted = userMuted.current
      v.play().catch((err: DOMException) => {
        if (err.name !== "NotAllowedError") return
        v.muted = true
        waiting.current = true
        v.play().catch(() => {})
        window.addEventListener("pointerdown", onFirst, true)
        window.addEventListener("keydown", onFirst, true)
      })
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio >= IN_VIEW) {
          if (!held.current) play()
        } else v.pause()
      },
      { threshold: [0, IN_VIEW] },
    )
    io.observe(v)
    return () => {
      io.disconnect()
      disarm()
      v.removeEventListener("volumechange", sync)
    }
  }, [])

  const togglePlay = () => {
    const v = ref.current
    if (!v) return
    // a first click on a film the browser started silently brings the sound in rather than pausing it
    if (waiting.current) {
      release.current()
      if (v.paused) v.play().catch(() => {})
      return
    }
    if (v.paused) {
      held.current = false
      v.play().catch(() => {})
    } else {
      held.current = true
      v.pause()
    }
  }

  const toggleSound = () => {
    const v = ref.current
    if (!v) return
    if (waiting.current) {
      userMuted.current = false
      release.current()
      return
    }
    v.muted = !v.muted
    userMuted.current = v.muted
    if (!v.muted && v.paused && !held.current) v.play().catch(() => {})
  }

  return (
    <div ref={reel} className="reel">
      <div className="reel-glow" aria-hidden="true" />
      <div className="reel-frame">
        <div className="reel-screen">
          <video
            ref={ref}
            className="reel-video"
            src={src}
            width={1920}
            height={1080}
            loop
            playsInline
            // no browser buttons (picture-in-picture, cast) appear over the film on hover
            disablePictureInPicture
            disableRemotePlayback
            preload="metadata"
            aria-label={`${description} Press to pause or play.`}
            tabIndex={0}
            onClick={togglePlay}
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "Enter") {
                e.preventDefault()
                togglePlay()
              }
            }}
          />
        </div>
      </div>
      <div className="reel-foot">
        <p className="reel-note">
          <i aria-hidden="true" />
          <b>{label}</b>
          <span>{note}</span>
        </p>
        <button type="button" className="reel-sound btn-spring sq" data-sound={sound ? "on" : "off"} onClick={toggleSound}>
          {sound ? <Volume2 aria-hidden="true" strokeWidth={2} /> : <VolumeX aria-hidden="true" strokeWidth={2} />}
          {sound ? "Mute" : "Unmute"}
        </button>
      </div>
    </div>
  )
}
