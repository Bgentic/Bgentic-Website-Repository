import * as React from "react"

// prefers-reduced-motion as a live value; false on the server, so the first paint is the full design.
const QUERY = "(prefers-reduced-motion: reduce)"

function subscribe(onChange: () => void) {
  const q = window.matchMedia(QUERY)
  q.addEventListener("change", onChange)
  return () => q.removeEventListener("change", onChange)
}

export function useReducedMotion() {
  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  )
}
