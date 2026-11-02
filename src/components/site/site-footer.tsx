import Image from "next/image"
import Link from "next/link"
import { SERVICES } from "@/content/services"
import { CONTACT_EMAIL, LEGAL, LOGIN_HREF, ONBOARDING_HREF } from "@/content/site"

const COLUMNS = [
  { title: "Services", links: SERVICES.map((s) => ({ label: s.name, href: `/services/${s.slug}` })) },
  {
    title: "Company",
    links: [
      { label: "Clients", href: "/clients" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Log in", href: LOGIN_HREF },
      { label: "Start a free trial", href: ONBOARDING_HREF },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t hairline bg-ground">
      <div className="container-b grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Image src="/brand/bgentic-logo-on-light.svg" alt="Bgentic" width={74} height={28} unoptimized className="logo-on-light h-7 w-auto" />
          <Image src="/brand/bgentic-logo-on-dark.svg" alt="Bgentic" width={74} height={28} unoptimized className="logo-on-dark h-7 w-auto" />
          <p className="mt-4 max-w-[26ch] text-[15px] text-body">AI built systems, managed. From Sydney, for Australian businesses.</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="link-quiet mt-4 inline-block text-[15px]">
            {CONTACT_EMAIL}
          </a>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-8">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h2 className="text-sm font-semibold text-ink">{col.title}</h2>
              <ul className="mt-4 grid gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith("http") ? (
                      <a href={l.href} className="text-[15px] text-body transition-colors hover:text-ink">
                        {l.label}
                      </a>
                    ) : (
                      <Link href={l.href} className="text-[15px] text-body transition-colors hover:text-ink">
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="border-t hairline">
        <div className="container-b flex flex-col gap-3 py-6 text-[13px] text-slate sm:flex-row sm:items-center sm:justify-between">
          <p className="t-num">
            {LEGAL.name} · ACN {LEGAL.acn} · ABN {LEGAL.abn} · {LEGAL.city}
          </p>
          <p className="flex gap-5">
            <a href={LEGAL.terms} className="hover:text-ink">
              Terms of Service
            </a>
            <a href={LEGAL.privacy} className="hover:text-ink">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
