"use client"
// Whether a media query matches, kept in step with the browser. False on the server and on the first render, so the
// server's HTML and the first client render agree.
import * as React from "react"

export function useMediaQuery(query: string) {
  const subscribe = React.useCallback(
    (onChange: () => void) => {
      const q = window.matchMedia(query)
      q.addEventListener("change", onChange)
      return () => q.removeEventListener("change", onChange)
    },
    [query],
  )
  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  )
}
