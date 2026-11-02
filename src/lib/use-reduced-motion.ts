import * as React from "react"
import { REDUCED_MOTION } from "@/lib/media"

// prefers-reduced-motion as a live value; false on the server, so the first paint is the full design.
function subscribe(onChange: () => void) {
  const q = window.matchMedia(REDUCED_MOTION)
  q.addEventListener("change", onChange)
  return () => q.removeEventListener("change", onChange)
}

export function useReducedMotion() {
  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  )
}
