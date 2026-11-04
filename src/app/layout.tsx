import type { Metadata, Viewport } from "next"
import { Geist, Inter } from "next/font/google"
import { SiteHeader } from "@/components/site/site-header"
import { CinematicFooter } from "@/components/ui/motion-footer"
import "./globals.css"

// Inter carries the text, as on the Deal Desk and the proposals. Geist sets the display: a lighter, more engineered
// cut for headlines, the nearest open match to SF Pro Display.
const inter = Inter({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-inter",
  display: "swap",
})
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Bgentic · AI built systems, managed",
    template: "%s · Bgentic",
  },
  description:
    "Bgentic is an AI consultancy in Sydney. We build and run the automations, CRM, websites, online stores and SEO that give your business its hours back.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
}

export const viewport: Viewport = {
  colorScheme: "dark",
  viewportFit: "cover",
  themeColor: "#0f1217",
}

// The site is dark only: the theme is set in the markup, so there is nothing to detect and nothing to flash.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-AU" data-theme="dark" className={`${inter.variable} ${geist.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <CinematicFooter />
      </body>
    </html>
  )
}
