import Script from "next/script"
import { CalendarDays, MessageSquareText, type LucideIcon } from "lucide-react"
import { BookingGrid } from "@/components/contact/booking-grid"
import { ContactForm } from "@/components/site/contact-form"
import { contact } from "@/content/home"
import { contactPage } from "@/content/pages"

// /contact opens on the two ways in, side by side and clearly one or the other: book a discovery call on the calendar
// (left), or send a quick message on the form (right), with "or" standing between them. Each has its own heading: an
// icon, a name and what to expect. Over the hero's kinetic grid, lit from behind the calendar. The calendar is
// Bgentic's own booking widget, embedded as given; its script sizes the iframe to fit what it shows. Styles: the
// booking section of depth.css.
const CALENDAR = {
  src: "https://link.bgentic.io/widget/booking/YZiyZa8uDc04m87hig31",
  id: "YZiyZa8uDc04m87hig31_1793771871926",
  script: "https://link.bgentic.io/js/form_embed.js",
}

function OptionHead({ id, icon: Icon, title, text }: { id: string; icon: LucideIcon; title: string; text: string }) {
  return (
    <div className="booking-head">
      <span className="tile size-11 rounded-[0.875rem]" aria-hidden="true">
        <Icon className="size-5" />
      </span>
      <div className="min-w-0">
        <h2 id={id} className="booking-title">
          {title}
        </h2>
        <p className="booking-text">{text}</p>
      </div>
    </div>
  )
}

export function BookingSection() {
  const { intro, call, message } = contactPage.booking
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
            <p className="t-lede">{intro}</p>
          </div>
        </div>

        <div className="booking-grid mt-12">
          <section className="booking-option" aria-labelledby="book-call-title" data-lamp="">
            <OptionHead id="book-call-title" icon={CalendarDays} title={call.title} text={call.text} />
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
          </section>
          <div className="booking-or" aria-hidden="true">
            <span>or</span>
          </div>
          <section className="booking-option" aria-labelledby="send-message-title">
            <OptionHead id="send-message-title" icon={MessageSquareText} title={message.title} text={message.text} />
            <div className="contact-card">
              <ContactForm submitLabel={message.action} />
            </div>
          </section>
        </div>
      </div>
      <Script src={CALENDAR.script} strategy="afterInteractive" />
    </section>
  )
}
