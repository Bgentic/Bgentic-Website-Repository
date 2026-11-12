"use client"

import * as React from "react"
import Image from "next/image"
import { Maximize2, RotateCcw, Volume2, VolumeX, X } from "lucide-react"

// how much of the video must be on screen for it to play; below this it pauses
const IN_VIEW = 0.35
// full screen: how long the controls stay once the pointer has stopped, while the film plays
const IDLE_MS = 2600
// seconds: the skip buttons and J/L, then the arrow keys
const SKIP = 10
const NUDGE = 5

type Props = { src: string; poster: string; description: string; label: string; note: string }

type FsDocument = Document & { webkitFullscreenElement?: Element | null; webkitExitFullscreen?: () => void }
type FsElement = HTMLDivElement & { webkitRequestFullscreen?: () => void }
type IosVideo = HTMLVideoElement & { webkitEnterFullscreen?: () => void }
type Orientation = ScreenOrientation & { lock?: (o: "landscape") => Promise<void>; unlock?: () => void }

const fullscreenElement = () => {
  const d = document as FsDocument
  return d.fullscreenElement ?? d.webkitFullscreenElement ?? null
}
const exitFullscreen = () => {
  const d = document as FsDocument
  if (d.fullscreenElement) d.exitFullscreen().catch(() => {})
  else if (d.webkitFullscreenElement) d.webkitExitFullscreen?.()
}
// the share of an element's height inside the viewport
const visibleShare = (el: Element) => {
  const r = el.getBoundingClientRect()
  if (!r.height) return 0
  return Math.max(0, Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0)) / r.height
}
const clock = (s: number) => {
  const t = Number.isFinite(s) && s > 0 ? Math.floor(s) : 0
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`
}

// /services: the showreel. On the page the film plays inside the glass bezel with nothing laid over it: it plays (with
// sound where the browser allows, else silently until the visitor's first click, tap or key press) while at least a
// third of it is on screen, pauses when it scrolls away, when the visitor leaves for another page or tab, and loops.
// A poster holds the frame until the first frame plays, then dissolves into it; where the browser won't autoplay at
// all (iOS Low Power Mode, data saver) the poster stays with a "Watch the film" pill. Under the bezel: pause/play
// (a film that moves for a minute needs one), Mute/Unmute, and Full screen.
//
// A click or tap on the film, or Full screen, opens it full screen with sound, from the top unless the visitor has
// already been listening, with its own controls: a frosted top bar (close, the title, volume) and a floating dock
// (back 10 s, play/pause, forward 10 s, and a scrubber that thickens under the pointer and shows the time it would jump
// to). The controls and the cursor fade away while the film plays untouched and come back the moment the pointer moves
// or a key is pressed. Keys: Space or K play/pause, arrows step 5 s and the volume, J/L 10 s, M mute, F or Esc leave.
// Touch screens get the iOS layout (the transport large in the middle, the scrubber along the foot), a tap shows or
// hides the controls, and Android turns the film sideways. iPhone, which can't put a page element full screen, hands
// the film to the system's own player. Leaving full screen, the film carries on in the bezel where it was.
export function ReelVideo({ src, poster, description, label, note }: Props) {
  const ref = React.useRef<HTMLVideoElement>(null)
  const reel = React.useRef<HTMLDivElement>(null)
  const player = React.useRef<FsElement>(null)
  const opener = React.useRef<HTMLElement | null>(null) // what opened full screen, focused again on the way out
  const held = React.useRef(false) // paused by the visitor
  const userMuted = React.useRef(false) // muted by the visitor
  const waiting = React.useRef(false) // started silently by the browser; sound comes on at the first interaction
  const inView = React.useRef(false) // enough of the film is on screen to play
  const heard = React.useRef(false) // it has played with sound, so full screen carries on rather than restarting
  const full = React.useRef(false)
  const release = React.useRef<() => void>(() => {})
  const resume = React.useRef<() => void>(() => {})
  const [sound, setSound] = React.useState(true)
  const [volume, setVolume] = React.useState(1)
  const [playing, setPlaying] = React.useState(false)
  const [started, setStarted] = React.useState(false) // the first frame has played: the poster dissolves
  const [blocked, setBlocked] = React.useState(false) // the browser won't autoplay at all
  const [ended, setEnded] = React.useState(false) // full screen plays once through, then offers to play again
  const [duration, setDuration] = React.useState(0)
  const [fs, setFs] = React.useState(false)

  // a layout effect, so the cleanup pauses the film the moment Next hides this page on navigation (it keeps the page
  // you leave in the document, hidden, rather than removing it, so the film would otherwise play on, sound and all)
  React.useLayoutEffect(() => {
    const v = ref.current
    const el = player.current
    if (!v || !el) return
    // the controls follow the element, so they're right whichever side changed it
    const sync = () => {
      setSound(!v.muted)
      setVolume(v.volume)
      if (!v.muted && !v.paused) heard.current = true
    }
    const onPlaying = () => {
      setPlaying(true)
      setStarted(true)
      setBlocked(false)
      setEnded(false)
      if (!v.muted) heard.current = true
    }
    const onPause = () => setPlaying(false)
    const onEnded = () => {
      setPlaying(false)
      setEnded(true)
    }
    const onDuration = () => setDuration(v.duration)
    v.addEventListener("volumechange", sync)
    v.addEventListener("playing", onPlaying)
    v.addEventListener("pause", onPause)
    v.addEventListener("ended", onEnded)
    v.addEventListener("durationchange", onDuration)
    if (v.readyState >= 1) onDuration()

    // the first interaction anywhere brings the sound in; the player handles its own clicks
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

    const start = () => {
      waiting.current = false
      v.muted = userMuted.current
      v.play().catch((err: DOMException) => {
        if (err.name !== "NotAllowedError") return
        v.muted = true
        waiting.current = true
        v.play().catch((e: DOMException) => {
          // not even silently: autoplay is off, so the poster asks instead
          if (e.name !== "NotAllowedError") return
          waiting.current = false
          setBlocked(true)
        })
        window.addEventListener("pointerdown", onFirst, true)
        window.addEventListener("keydown", onFirst, true)
      })
    }
    // back in the bezel after full screen: carry on if it's in view and the visitor didn't pause it
    resume.current = () => {
      inView.current = visibleShare(v) >= IN_VIEW
      if (v.ended) v.currentTime = 0
      if (inView.current && !held.current && !document.hidden) {
        if (v.paused) start()
      } else v.pause()
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (full.current) return
        inView.current = e.intersectionRatio >= IN_VIEW
        if (inView.current) {
          if (!held.current && !document.hidden) start()
        } else v.pause()
      },
      { threshold: [0, IN_VIEW] },
    )
    io.observe(v)

    // another browser tab or a minimised window
    const onVisibility = () => {
      if (document.hidden) v.pause()
      else if ((inView.current || full.current) && !held.current) start()
    }
    document.addEventListener("visibilitychange", onVisibility)

    const onFullscreen = () => {
      const on = fullscreenElement() === el
      if (on === full.current) return
      full.current = on
      setFs(on)
      if (on) return
      v.loop = true
      setEnded(false)
      try {
        ;(screen.orientation as Orientation | undefined)?.unlock?.()
      } catch {}
      // once React has taken the full-screen state off (until then the film's own button is still hidden)
      requestAnimationFrame(() => opener.current?.focus({ preventScroll: true }))
      resume.current()
    }
    document.addEventListener("fullscreenchange", onFullscreen)
    document.addEventListener("webkitfullscreenchange", onFullscreen)
    // iPhone: the system's own player
    const onIosBegin = () => {
      full.current = true
    }
    const onIosEnd = () => {
      full.current = false
      resume.current()
    }
    v.addEventListener("webkitbeginfullscreen", onIosBegin)
    v.addEventListener("webkitendfullscreen", onIosEnd)

    return () => {
      io.disconnect()
      disarm()
      document.removeEventListener("visibilitychange", onVisibility)
      document.removeEventListener("fullscreenchange", onFullscreen)
      document.removeEventListener("webkitfullscreenchange", onFullscreen)
      v.removeEventListener("volumechange", sync)
      v.removeEventListener("playing", onPlaying)
      v.removeEventListener("pause", onPause)
      v.removeEventListener("ended", onEnded)
      v.removeEventListener("durationchange", onDuration)
      v.removeEventListener("webkitbeginfullscreen", onIosBegin)
      v.removeEventListener("webkitendfullscreen", onIosEnd)
      inView.current = false
      if (fullscreenElement() === el) exitFullscreen()
      v.pause()
    }
  }, [])

  // Full screen, with sound: a click is permission to play it properly
  const open = (from: HTMLElement) => {
    const v = ref.current as IosVideo | null
    const el = player.current
    if (!v || !el) return
    opener.current = from
    release.current()
    userMuted.current = false
    held.current = false
    if (!heard.current || v.ended) v.currentTime = 0
    v.muted = false
    v.play().catch(() => {})
    if (el.requestFullscreen && document.fullscreenEnabled) {
      v.loop = false
      el.requestFullscreen({ navigationUI: "hide" }).then(
        () => {
          if (window.matchMedia("(pointer: coarse)").matches)
            (screen.orientation as Orientation | undefined)?.lock?.("landscape").catch(() => {})
        },
        () => {
          v.loop = true
        },
      )
    } else if (el.webkitRequestFullscreen) {
      v.loop = false
      el.webkitRequestFullscreen()
    } else v.webkitEnterFullscreen?.()
  }

  const togglePlay = () => {
    const v = ref.current
    if (!v) return
    if (v.paused || v.ended) {
      held.current = false
      if (v.ended) v.currentTime = 0
      release.current()
      v.muted = userMuted.current
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
    if (v.muted && v.volume === 0) v.volume = 1
    v.muted = !v.muted
    userMuted.current = v.muted
    if (!v.muted && v.paused && !held.current && !full.current) v.play().catch(() => {})
  }

  const setLevel = (x: number) => {
    const v = ref.current
    if (!v) return
    v.volume = Math.min(1, Math.max(0, x))
    v.muted = v.volume === 0
    userMuted.current = v.muted
  }

  // the full-screen controls read the film through this and change it only through the handlers here
  const media = React.useCallback(() => ref.current, [])
  const seek = (to: number, fast = false) => {
    const v = ref.current
    if (!v || !Number.isFinite(v.duration)) return
    const t = Math.min(v.duration, Math.max(0, to))
    if (fast && typeof v.fastSeek === "function") v.fastSeek(t)
    else v.currentTime = t
  }
  // scrubbing holds the film still, then carries on if it was playing
  const scrubStart = () => {
    const v = ref.current
    if (!v) return false
    const was = !v.paused && !v.ended
    v.pause()
    return was
  }
  const scrubEnd = (resume: boolean) => {
    if (resume) ref.current?.play().catch(() => {})
  }

  const audible = sound && volume > 0
  return (
    <div ref={reel} className="reel">
      <div className="reel-glow" aria-hidden="true" />
      <div className="reel-frame">
        <div className="reel-screen">
          <div ref={player} className="rp" data-fs={fs || undefined} data-started={started || undefined}>
            <video
              ref={ref}
              className="rp-video"
              src={src}
              width={1920}
              height={1080}
              loop
              playsInline
              // no browser buttons (picture-in-picture, cast) appear over the film on hover
              disablePictureInPicture
              disableRemotePlayback
              preload="metadata"
              aria-label={description}
            />
            <Image
              className="rp-poster"
              src={poster}
              alt=""
              fill
              sizes="(min-width: 1520px) 90rem, 100vw"
              loading="eager"
            />
            {/* on the page, the whole film is one button: it opens it full screen */}
            <button
              type="button"
              className="rp-open"
              data-blocked={blocked || undefined}
              aria-label={`Watch the ${label.toLowerCase()} full screen`}
              onClick={(e) => open(e.currentTarget)}
            >
              <span className="rp-cue">
                <span className="rp-cue-disc">{blocked ? <IconPlay /> : <Maximize2 strokeWidth={2.25} />}</span>
                {blocked ? "Watch the film" : "Watch full screen"}
                {blocked && duration > 0 && <span className="rp-cue-len">{clock(duration)}</span>}
              </span>
            </button>
            {fs && (
              <FullscreenControls
                media={media}
                label={label}
                note={note}
                playing={playing}
                ended={ended}
                audible={audible}
                volume={sound ? volume : 0}
                duration={duration}
                onToggle={togglePlay}
                onSound={toggleSound}
                onVolume={setLevel}
                onSeek={seek}
                onScrubStart={scrubStart}
                onScrubEnd={scrubEnd}
                onClose={exitFullscreen}
              />
            )}
          </div>
        </div>
      </div>
      <div className="reel-foot">
        <p className="reel-note">
          <i aria-hidden="true" />
          <b>{label}</b>
          <span>{note}</span>
        </p>
        <div className="reel-actions">
          <button
            type="button"
            className="reel-ctl reel-icon btn-spring sq"
            aria-label={playing ? `Pause the ${label.toLowerCase()}` : `Play the ${label.toLowerCase()}`}
            onClick={togglePlay}
          >
            {playing ? <IconPause /> : <IconPlay />}
          </button>
          <button
            type="button"
            className="reel-ctl reel-sound btn-spring sq"
            data-sound={sound ? "on" : "off"}
            onClick={toggleSound}
          >
            {sound ? <Volume2 aria-hidden="true" strokeWidth={2} /> : <VolumeX aria-hidden="true" strokeWidth={2} />}
            {sound ? "Mute" : "Unmute"}
          </button>
          <button type="button" className="reel-ctl btn-spring sq" onClick={(e) => open(e.currentTarget)}>
            <Maximize2 aria-hidden="true" strokeWidth={2} />
            Full screen
          </button>
        </div>
      </div>
    </div>
  )
}

type ControlsProps = {
  media: () => HTMLVideoElement | null
  label: string
  note: string
  playing: boolean
  ended: boolean
  audible: boolean
  volume: number
  duration: number
  onToggle: () => void
  onSound: () => void
  onVolume: (x: number) => void
  onSeek: (to: number, fast?: boolean) => void
  onScrubStart: () => boolean
  onScrubEnd: (resume: boolean) => void
  onClose: () => void
}

// Full screen: the controls over the film. The time, the scrubber's fill, its buffer and its thumb follow the film
// every frame by writing to the elements directly, so playback never re-renders React. They only read the film;
// every change to it goes through the player's handlers.
function FullscreenControls(p: ControlsProps) {
  const { media, playing, ended, audible, onToggle, onSeek, onClose } = p
  const root = React.useRef<HTMLDivElement>(null)
  const scrub = React.useRef<HTMLDivElement>(null)
  const fill = React.useRef<HTMLElement>(null)
  const buf = React.useRef<HTMLElement>(null)
  const thumb = React.useRef<HTMLElement>(null)
  const tip = React.useRef<HTMLSpanElement>(null)
  const elapsed = React.useRef<HTMLSpanElement>(null)
  const left = React.useRef<HTMLSpanElement>(null)
  const timer = React.useRef(0)
  const resting = React.useRef(false) // the pointer rests on a control, so they stay
  const drag = React.useRef<{ id: number; resume: boolean } | null>(null)
  const pointer = React.useRef("mouse")
  const [idle, setIdle] = React.useState(false)
  const [scrubbing, setScrubbing] = React.useState(false)

  // the controls fade once the film has played on untouched for a while; paused, they always show
  const schedule = React.useCallback(() => {
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      const v = media()
      if (v && !v.paused && !resting.current && !drag.current) setIdle(true)
    }, IDLE_MS)
  }, [media])
  const wake = () => {
    setIdle(false)
    schedule()
  }
  React.useEffect(() => {
    schedule()
    return () => window.clearTimeout(timer.current)
  }, [playing, schedule])
  const hidden = idle && playing

  // keys work from the moment it opens
  React.useLayoutEffect(() => {
    root.current?.focus({ preventScroll: true })
  }, [])

  React.useLayoutEffect(() => {
    let raf = 0
    let shown = -1
    let shownP = -1
    let shownB = -1
    let shownW = -1
    const paint = () => {
      const v = media()
      const s = scrub.current
      if (!v || !s) return
      const d = Number.isFinite(v.duration) ? v.duration : 0
      const t = v.currentTime
      const w = s.clientWidth
      const at = d ? Math.min(1, t / d) : 0
      if (at !== shownP || w !== shownW) {
        fill.current!.style.transform = `scaleX(${at})`
        thumb.current!.style.transform = `translateX(${at * w}px)`
        shownP = at
        shownW = w
      }
      let b = 0
      for (let i = 0; i < v.buffered.length; i++) if (v.buffered.start(i) <= t + 1) b = Math.max(b, v.buffered.end(i))
      const bp = d ? Math.min(1, b / d) : 0
      if (bp !== shownB) {
        buf.current!.style.transform = `scaleX(${bp})`
        shownB = bp
      }
      const sec = Math.floor(t)
      if (sec !== shown) {
        elapsed.current!.textContent = clock(t)
        left.current!.textContent = `−${clock(Math.ceil(d - t))}`
        s.setAttribute("aria-valuenow", String(sec))
        s.setAttribute("aria-valuetext", `${clock(t)} of ${clock(d)}`)
        shown = sec
      }
    }
    const frame = () => {
      paint()
      raf = requestAnimationFrame(frame)
    }
    frame()
    return () => cancelAnimationFrame(raf)
  }, [media])

  const seekBy = (by: number) => {
    const v = media()
    if (v) onSeek(v.currentTime + by)
  }
  const at = (x: number) => {
    const r = scrub.current!.getBoundingClientRect()
    return Math.min(1, Math.max(0, (x - r.left) / r.width))
  }
  const showTip = (f: number) => {
    const s = scrub.current
    const el = tip.current
    if (!s || !el) return
    el.textContent = clock(f * (media()?.duration || 0))
    el.style.transform = `translateX(${f * s.clientWidth}px) translateX(-50%)`
  }

  // the scrubber: press anywhere on it to jump there, drag to scrub (the film holds still while you do)
  const onScrubDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const v = media()
    if (!v || e.button !== 0) return
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { id: e.pointerId, resume: p.onScrubStart() }
    setScrubbing(true)
    const f = at(e.clientX)
    showTip(f)
    onSeek(f * v.duration)
  }
  const onScrubMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const f = at(e.clientX)
    showTip(f)
    if (drag.current?.id === e.pointerId) onSeek(f * (media()?.duration || 0), true)
  }
  const onScrubEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    drag.current = null
    setScrubbing(false)
    onSeek(at(e.clientX) * (media()?.duration || 0))
    p.onScrubEnd(d.resume)
    wake()
  }
  const onScrubKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const v = media()
    if (!v) return
    const step: Record<string, number> = { ArrowLeft: -NUDGE, ArrowDown: -NUDGE, ArrowRight: NUDGE, ArrowUp: NUDGE, PageDown: -SKIP, PageUp: SKIP }
    if (e.key in step) onSeek(v.currentTime + step[e.key])
    else if (e.key === "Home") onSeek(0)
    else if (e.key === "End") onSeek(v.duration)
    else return
    e.preventDefault()
    e.stopPropagation()
    wake()
  }

  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const v = media()
    if (!v || e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return
    wake()
    const target = e.target as HTMLElement
    // the volume slider keeps its own arrows; a focused button keeps Space and Enter
    if (target.matches("input") && /^(Arrow|Page|Home|End)/.test(e.key)) return
    const level = v.muted ? 0 : v.volume
    switch (e.key) {
      case " ":
      case "Enter":
        if (target.closest("button")) return
        onToggle()
        break
      case "k":
      case "K":
        onToggle()
        break
      case "ArrowLeft":
        seekBy(-NUDGE)
        break
      case "ArrowRight":
        seekBy(NUDGE)
        break
      case "j":
      case "J":
        seekBy(-SKIP)
        break
      case "l":
      case "L":
        seekBy(SKIP)
        break
      case "ArrowUp":
        p.onVolume(level + 0.1)
        break
      case "ArrowDown":
        p.onVolume(level - 0.1)
        break
      case "m":
      case "M":
        p.onSound()
        break
      case "f":
      case "F":
        onClose()
        break
      default:
        return
    }
    e.preventDefault()
  }

  // a click on the film plays or pauses it (a double click leaves full screen); a tap shows or hides the controls
  const onStage = () => {
    if (pointer.current === "mouse") {
      onToggle()
      wake()
    } else if (hidden || !playing) wake()
    else {
      window.clearTimeout(timer.current)
      setIdle(true)
    }
  }
  const rest = {
    onPointerEnter: (e: React.PointerEvent) => {
      if (e.pointerType === "mouse") resting.current = true
    },
    onPointerLeave: () => {
      resting.current = false
      wake()
    },
  }
  const playLabel = playing ? "Pause" : ended ? "Play again" : "Play"

  return (
    <div
      ref={root}
      className="rp-ui"
      role="group"
      aria-label={`${p.label} player`}
      tabIndex={-1}
      data-idle={hidden || undefined}
      onPointerMove={wake}
      onPointerDown={(e) => {
        pointer.current = e.pointerType
      }}
      onKeyDown={onKey}
    >
      <div className="rp-stage" onClick={onStage} onDoubleClick={() => pointer.current === "mouse" && onClose()} />
      <div className="rp-shade" aria-hidden="true" />

      <div className="rp-top">
        <button type="button" className="rp-btn rp-round rp-glass" aria-label="Exit full screen" onClick={onClose} {...rest}>
          <X aria-hidden="true" strokeWidth={2.25} />
        </button>
        <p className="rp-title">
          <b>{p.label}</b>
          <span>{p.note}</span>
        </p>
        <div className="rp-vol rp-glass" {...rest}>
          <button type="button" className="rp-btn rp-round" aria-label={audible ? "Mute" : "Unmute"} onClick={p.onSound}>
            {audible ? <Volume2 aria-hidden="true" strokeWidth={2} /> : <VolumeX aria-hidden="true" strokeWidth={2} />}
          </button>
          <input
            type="range"
            className="rp-range"
            min={0}
            max={1}
            step={0.05}
            value={p.volume}
            aria-label="Volume"
            onChange={(e) => p.onVolume(Number(e.target.value))}
            style={{ "--level": `${p.volume * 100}%` } as React.CSSProperties}
          />
        </div>
      </div>

      {!playing && !scrubbing && (
        <button type="button" className="rp-center rp-glass" aria-label={playLabel} onClick={onToggle}>
          {ended ? <RotateCcw aria-hidden="true" strokeWidth={2.25} /> : <IconPlay />}
        </button>
      )}

      <div className="rp-dock" {...rest}>
        <div className="rp-transport">
          <button type="button" className="rp-btn rp-skip" aria-label="Back 10 seconds" onClick={() => seekBy(-SKIP)}>
            <IconSkip back />
          </button>
          <button type="button" className="rp-btn rp-play" aria-label={playLabel} onClick={onToggle}>
            {playing ? <IconPause /> : ended ? <RotateCcw aria-hidden="true" strokeWidth={2.25} /> : <IconPlay />}
          </button>
          <button type="button" className="rp-btn rp-skip" aria-label="Forward 10 seconds" onClick={() => seekBy(SKIP)}>
            <IconSkip />
          </button>
        </div>
        <div className="rp-seek">
          <span ref={elapsed} className="rp-time" aria-hidden="true" />
          <div
            ref={scrub}
            className="rp-scrub"
            role="slider"
            tabIndex={0}
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={Math.round(p.duration)}
            // kept current by the frame loop above
            aria-valuenow={0}
            data-drag={scrubbing || undefined}
            onPointerDown={onScrubDown}
            onPointerMove={onScrubMove}
            onPointerUp={onScrubEnd}
            onPointerCancel={onScrubEnd}
            onKeyDown={onScrubKey}
          >
            <span className="rp-track">
              <i ref={buf} className="rp-buf" />
              <i ref={fill} className="rp-fill" />
            </span>
            <i ref={thumb} className="rp-thumb" />
            <span ref={tip} className="rp-tip" aria-hidden="true" />
          </div>
          <span ref={left} className="rp-time" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}

// The transport glyphs, filled like the system's own; lucide carries the rest.
function IconPlay() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="rp-glyph-play">
      <path d="M7.5 5.32v13.36c0 .96 1.05 1.54 1.86 1.03l10.55-6.68a1.22 1.22 0 0 0 0-2.06L9.36 4.29C8.55 3.78 7.5 4.36 7.5 5.32Z" />
    </svg>
  )
}

function IconPause() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="6" y="4.75" width="4.25" height="14.5" rx="1.4" />
      <rect x="13.75" y="4.75" width="4.25" height="14.5" rx="1.4" />
    </svg>
  )
}

// a circular arrow with the seconds inside it: back turns anticlockwise, forward is its mirror
function IconSkip({ back }: { back?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <g
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        transform={back ? undefined : "matrix(-1 0 0 1 24 0)"}
      >
        <path d="M12 4.25A8.5 8.5 0 1 1 5.99 6.74" />
        <path d="M14.5 1.75 12 4.25l2.5 2.5" />
      </g>
      <text x="12" y="16.1" textAnchor="middle" fontSize="8.75" fontWeight="700" letterSpacing="-0.04em" fill="currentColor">
        10
      </text>
    </svg>
  )
}
