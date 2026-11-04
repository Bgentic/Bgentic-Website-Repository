import Link from "next/link"
import { ArrowRight, CalendarDays, Mail } from "lucide-react"
import { ContactForm } from "@/components/site/contact-form"
import { buttonVariants } from "@/components/ui/button-variants"
import { contact } from "@/content/home"
import { CONTACT_EMAIL } from "@/content/site"

// 07 · The close: one next step. The promise and what happens after you send on the left, the form in a lit glass
// panel on the right, and the other way in under the form: a call booked straight on the calendar (/contact). The
// page's strongest light sits here, still faint. Styles: the 07 section of depth.css.
// (/contact opens on its own booking section instead: components/contact/booking-section.tsx.)
export function ContactSection() {
  return (
    <section className="section contact-x edge" aria-labelledby="contact-title">
      <div className="container-b grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <h2 id="contact-title" className="t-h2">
            {contact.title}
          </h2>
          <p className="t-lede mt-6 max-w-[44ch]">{contact.intro}</p>
          <ol className="next mt-10">
            {contact.next.map((step, i) => (
              <li key={step}>
                <span className="next-num" aria-hidden="true">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <div className="mt-10 grid gap-3">
            <p className="contact-promise">{contact.promise}</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="link-quiet inline-flex items-center gap-2 text-[15px]">
              <Mail className="size-4" aria-hidden="true" />
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
        <div className="lg:col-span-7">
          <div className="contact-card">
            <ContactForm />
          </div>
          {/* the other way in, under the form: straight to the calendar */}
          <div className="eng mt-5">
            <span className="tile size-11 rounded-[0.875rem]" aria-hidden="true">
              <CalendarDays className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="eng-title">{contact.book.title}</h3>
              <p className="eng-text">{contact.book.text}</p>
            </div>
            <Link href="/contact" className={buttonVariants({ variant: "glass", size: "md" })}>
              {contact.book.action}
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
