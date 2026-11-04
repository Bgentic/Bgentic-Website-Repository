// Screenshots of the four clients' own sites for the client showcase (home 05): each site as it is today on a desktop,
// a tablet and a phone. The desktop capture is three screens tall, so the monitor in the card can scroll through it.
//
//   npm run shots:clients               capture every client into public/images/clients/<slug>/ (needs Edge)
//   npm run shots:clients -- sventy8    just the clients whose slug contains "sventy8"
//
// Chat bubbles and pop-ups are hidden before the shot; the sites are otherwise untouched.
import path from "node:path"
import fs from "node:fs"
import { fileURLToPath } from "node:url"
import { chromium } from "playwright-core"

const HERE = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.join(HERE, "..", "public", "images", "clients")
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
const SITES = [
  ["npp-traffic-solutions", "https://npptrafficsolutions.com.au/"],
  ["sydney-pink-slips", "https://sydneypinkslips.com/"],
  ["we-are-art", "https://weareart.com.au/"],
  ["sventy8-events", "https://sventy8events.com/"],
]
// the devices, and the size each is captured at; the desktop is DESKTOP_TALL high
const DEVICES = {
  desktop: { viewport: { width: 1440, height: 900 } },
  tablet: { viewport: { width: 1180, height: 820 }, hasTouch: true },
  phone: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
}
const DESKTOP_TALL = 2700
const HIDE = `
  chat-widget, [id*="chat-widget" i], [class*="chat-widget" i], [class*="lc_text-widget" i], iframe[title*="chat" i],
  iframe[src*="widget" i], [id*="cookie" i], [class*="cookie" i], [aria-modal="true"], .grecaptcha-badge
  { display: none !important; visibility: hidden !important; }
  html { scroll-behavior: auto !important; }
`
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

const only = process.argv.slice(2).filter((a) => !a.startsWith("-"))
const browser = await chromium.launch({ executablePath: EDGE })
for (const [slug, url] of SITES.filter(([s]) => !only.length || only.some((o) => s.includes(o)))) {
  fs.mkdirSync(path.join(OUT, slug), { recursive: true })
  for (const [device, opts] of Object.entries(DEVICES)) {
    const ctx = await browser.newContext({ ...opts, reducedMotion: "reduce" })
    const page = await ctx.newPage()
    await page.goto(url, { waitUntil: "load", timeout: 60_000 })
    await page.addStyleTag({ content: HIDE })
    // walk down the page so lazy images load, then come back to the top
    const tall = device === "desktop" ? DESKTOP_TALL : opts.viewport.height
    for (let y = 0; y <= tall; y += 400) {
      await page.evaluate((v) => window.scrollTo(0, v), y)
      await wait(250)
    }
    await page.evaluate(() => window.scrollTo(0, 0))
    await wait(2500)
    await page.keyboard.press("Escape")
    await page.addStyleTag({ content: HIDE })
    const file = path.join(OUT, slug, `${device}.jpg`)
    const { width } = opts.viewport
    const height = Math.min(tall, await page.evaluate(() => document.documentElement.scrollHeight))
    await page.screenshot({ path: file, type: "jpeg", quality: 82, fullPage: device === "desktop", clip: { x: 0, y: 0, width, height } })
    console.log(slug, device, `${width}x${height}`, `${Math.round(fs.statSync(file).size / 1024)} KB`)
    await ctx.close()
  }
}
await browser.close()
