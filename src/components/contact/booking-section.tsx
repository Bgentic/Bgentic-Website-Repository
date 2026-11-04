import Script from "next/script"
import { Mail } from "lucide-react"
import { BookingGrid } from "@/components/contact/booking-grid"
import { ContactForm } from "@/components/site/contact-form"
import { contact } from "@/content/home"
import { contactPage } from "@/content/pages"
import { CONTACT_EMAIL } from "@/content/site"

// /contact opens on booking: the visitor picks a time for the discovery call on the calendar (step 1), then tells us
// about the business on the form (step 2), so the call starts with answers. Over the hero's kinetic grid, lit from
// behind the calendar. The calendar is Bgentic's own booking widget, embedded as given; its script sizes the iframe
// to fit what it shows. Styles: the booking section of depth.css.
const CALENDAR = {
  src: "https://link.bgentic.io/widget/booking/YZiyZa8uDc04m87hig31",
  id: "YZiyZa8uDc04m87hig31_1793771871926",
  script: "https://link.bgentic.io/js/form_embed.js",
}

export function BookingSection() {
  const { steps } = contactPage.booking
  return (
    <section className="booking" aria-labelledby="contact-title">
      <BookingGrid />
      <div className="hero-veil" aria-hidden="true" />
      <div className="container-b">
        <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-8">
          <h1 id="contact-title" className="t-h1 md:col-span-7">
            {contact.title}
          </h1>
          <div className="md:col-span-5">
            <p className="t-lede">{contactPage.booking.intro}</p>
          </div>
        </div>

        <div className="booking-grid mt-12">
          <div className="booking-step" data-lamp="">
            <p className="booking-step-head">
              <span className="next-num" aria-hidden="true">
                1
              </span>
              <span>
                <span className="sr-only">Step 1: </span>
                <b>{steps[0].title}</b>
                {steps[0].text}
              </span>
            </p>
            <div className="booking-frame">
              <iframe
                src={CALENDAR.src}
                id={CALENDAR.id}
                title="Book a discovery call with Bgentic"
                allow="payment"
                scrolling="no"
                className="booking-iframe"
              />
            </div>
          </div>
          <div className="booking-step">
            <p className="booking-step-head">
              <span className="next-num" aria-hidden="true">
                2
              </span>
              <span>
                <span className="sr-only">Step 2: </span>
                <b>{steps[1].title}</b>
                {steps[1].text}
              </span>
            </p>
            <div className="contact-card">
              <ContactForm />
            </div>
            <div className="mt-6 grid gap-3">
              <p className="contact-promise">{contact.promise}</p>
              <a href={`mailto:${CONTACT_EMAIL}`} className="link-quiet inline-flex items-center gap-2 text-[15px]">
                <Mail className="size-4" aria-hidden="true" />
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </div>
      </div>
      <Script src={CALENDAR.script} strategy="afterInteractive" />
    </section>
  )
}
