import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"
import "./globals.css"

// One family at every size, as on the Deal Desk and the proposals. The optical-size axis gives the display cut at
// headline sizes and the text cut at body sizes.
const inter = Inter({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-inter",
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
  colorScheme: "light dark",
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f6fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1217" },
  ],
}

// Dark by default (the site is designed dark-first); a visitor who picks light keeps it. Runs before anything
// renders, so the page never flashes the wrong theme.
const themeScript = `try{var t=localStorage.getItem("b-theme")||"dark";if(t==="dark")document.documentElement.dataset.theme="dark"}catch(e){}`

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-AU" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
