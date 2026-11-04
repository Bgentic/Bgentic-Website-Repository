import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, LogIn, Mail, Rocket, type LucideIcon } from "lucide-react"
import { BookingSection } from "@/components/contact/booking-section"
import { Faq } from "@/components/site/faq"
import { SectionHeader } from "@/components/site/section-header"
import { contactPage } from "@/content/pages"
import { CONTACT_EMAIL, LOGIN_HREF } from "@/content/site"

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a discovery call with Bgentic. Tell us where the time goes and we'll reply within one business day.",
}

// /contact: booking first, the calendar then the form, over the hero's grid (navy); then the other ways in and the
// questions people ask before their first call, on cream paper. Styles: the contact page section of depth.css.
export default function ContactPage() {
  const { ways, faq } = contactPage
  const cards: { icon: LucideIcon; title: string; text: string; action: string; href: string; external?: boolean }[] = [
    { icon: Mail, ...ways.email, action: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
    { icon: LogIn, ...ways.login, href: LOGIN_HREF, external: true },
    { icon: Rocket, ...ways.plans, href: "/pricing" },
  ]
  return (
    <>
      <BookingSection />

      <section className="section paper" aria-labelledby="ways-title">
        <div className="container-b">
          <SectionHeader id="ways-title" title={ways.title} />
          <ul className="reach-grid mt-12">
            {cards.map(({ icon: Icon, title, text, action, href, external }) => {
              const body = (
                <>
                  <span className="tile size-11 rounded-[0.875rem]" aria-hidden="true">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="reach-title">{title}</h3>
                  <p className="reach-text">{text}</p>
                  <span className="reach-action">
                    {action}
                    {external ? (
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    ) : (
                      <ArrowRight className="size-4" aria-hidden="true" />
                    )}
                    {external && <span className="sr-only">(opens in a new tab)</span>}
                  </span>
                </>
              )
              return (
                <li key={title} className="reveal flex">
                  {href.startsWith("/") ? (
                    <Link href={href} className="reach">
                      {body}
                    </Link>
                  ) : (
                    <a href={href} className="reach" {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                      {body}
                    </a>
                  )}
                </li>
              )
            })}
          </ul>

          <div className="mt-24 grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <h2 className="t-h2" id="contact-faq-title">
                {faq.title}
              </h2>
              <p className="t-lede mt-6 max-w-[36ch]">{faq.intro}</p>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <Faq items={faq.items} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
