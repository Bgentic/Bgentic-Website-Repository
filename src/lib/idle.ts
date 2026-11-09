// Run something once the page has loaded and the browser is idle, so work the first screen doesn't need (fetching and
// starting a library used only further down the page, or after a click) stays off the critical path: it waits for the
// load event, so it never competes with the page's own scripts, styles, fonts and images, then for an idle moment.
// It waits at most half a second for that moment (the hero orb keeps a busy page from ever quite idling), so the work
// is done soon after load rather than drifting into the first scroll. Falls back to a short timeout where
// requestIdleCallback isn't supported. Returns a cancel function for effect cleanups.
export function onIdle(fn: () => void, timeout = 500): () => void {
  let cancel = () => {}
  const schedule = () => {
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(fn, { timeout })
      cancel = () => window.cancelIdleCallback(id)
    } else {
      const id = window.setTimeout(fn, 200)
      cancel = () => window.clearTimeout(id)
    }
  }
  if (document.readyState === "complete") schedule()
  else {
    window.addEventListener("load", schedule, { once: true })
    cancel = () => window.removeEventListener("load", schedule)
  }
  return () => cancel()
}
