import type { Metadata } from "next"
import { ContactForm } from "@/components/site/contact-form"
import { contact } from "@/content/home"
import { CONTACT_EMAIL, LEGAL, LOGIN_HREF } from "@/content/site"

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a discovery call with Bgentic. Tell us where the time goes and we'll reply within one business day.",
}

const NEXT_STEPS = [
  { title: "You tell us where the time goes", text: "A short note is enough. Calls you miss, orders you retype, follow-ups that slip." },
  { title: "We book a discovery call", text: "We'll ask how enquiries, jobs and orders move through your business today." },
  { title: "You get a plain answer", text: "What we'd automate first, what we wouldn't, and what it would change on a normal day." },
]

export default function ContactPage() {
  return (
    <section className="hero" aria-labelledby="contact-page-title">
      <div className="container-b grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <h1 id="contact-page-title" className="t-h1">
            {contact.title}
          </h1>
          <p className="t-lede mt-6">{contact.intro}</p>
          <ol className="mt-12 grid gap-6">
            {NEXT_STEPS.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[2rem_1fr] gap-x-3 border-t hairline pt-5">
                <span className="t-quiet t-num pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="text-[1.0625rem] font-semibold text-ink">{s.title}</h2>
                  <p className="t-body mt-1 text-[15px]">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <dl className="mt-12 grid gap-4 text-[15px]">
            <div>
              <dt className="text-slate">Email</dt>
              <dd>
                <a href={`mailto:${CONTACT_EMAIL}`} className="link-quiet">
                  {CONTACT_EMAIL}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-slate">Already a client?</dt>
              <dd>
                <a href={LOGIN_HREF} className="link-quiet">
                  Log in to Bgentic
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-slate">Where we are</dt>
              <dd className="text-body">{LEGAL.city}</dd>
            </div>
          </dl>
        </div>
        <div className="card-spec h-fit rounded-[28px] p-6 md:p-9 lg:col-span-6 lg:col-start-7">
          <p className="t-quiet mb-6">{contact.promise}</p>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
