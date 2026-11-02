import { ContactForm } from "@/components/site/contact-form"
import { contact } from "@/content/home"
import { CONTACT_EMAIL } from "@/content/site"

// 07 · The close, on the second navy band: one decision, made in place.
export function ContactBand() {
  return (
    <section className="section band-navy dark" data-band="navy" aria-labelledby="contact-title">
      <div className="container-b grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <h2 id="contact-title" className="t-h2">
            {contact.title}
          </h2>
          <p className="t-lede mt-6 max-w-[44ch]">{contact.intro}</p>
          <p className="t-quiet mt-8 text-[15px]">{contact.promise}</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="link-quiet mt-2 inline-block text-[15px]">
            {CONTACT_EMAIL}
          </a>
        </div>
        <div className="glass rounded-[28px] p-6 md:p-9 lg:col-span-6 lg:col-start-7">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
