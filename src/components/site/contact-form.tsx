"use client"
// The short enquiry form. Sending posts it to the site's own endpoint (app/api/enquiry), which passes it to the CRM;
// once it's there the form gives way to a thank-you. If it can't be sent (offline, or the CRM doesn't answer), the
// visitor keeps what they wrote and can send it by email instead, written out and addressed to hello@bgentic.io, so
// an enquiry is never lost.
import * as React from "react"
import { Check, Loader2, Send } from "lucide-react"
import { buttonVariants } from "@/components/ui/button-variants"
import { CONTACT_EMAIL } from "@/content/site"
import { SERVICES } from "@/content/services"
import { cn } from "@/lib/utils"

type Errors = Partial<Record<"name" | "email" | "message", string>>
type Enquiry = { name: string; email: string; business: string; service: string; message: string }
type Status = "idle" | "sending" | "sent" | "failed"

const mailto = ({ name, email, business, service, message }: Enquiry) => {
  const subject = `Discovery call: ${business || name}`
  const details = [
    `Name: ${name}`,
    `Email: ${email}`,
    business ? `Business: ${business}` : null,
    service ? `Interested in: ${service}` : null,
  ].filter((l): l is string => l !== null)
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${details.join("\n")}\n\n${message}`)}`
}

/** `submitLabel`: the button's words ("Send message" on /contact, where the form is the quick-message option) */
export function ContactForm({ className, submitLabel = "Send enquiry" }: { className?: string; submitLabel?: string }) {
  const [errors, setErrors] = React.useState<Errors>({})
  const [status, setStatus] = React.useState<Status>("idle")
  const [enquiry, setEnquiry] = React.useState<Enquiry | null>(null)
  const done = React.useRef<HTMLHeadingElement>(null)
  const submit = React.useRef<HTMLButtonElement>(null)
  const id = React.useId()

  // the thank-you takes focus, so a screen reader announces it and the keyboard carries on from there; after a
  // failed send, focus goes back to the button (it was disabled while sending, which drops focus to the page)
  React.useEffect(() => {
    if (status === "sent") done.current?.focus()
    if (status === "failed") submit.current?.focus()
  }, [status])

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    if (status === "sending") return
    const form = ev.currentTarget
    const data = new FormData(form)
    const next: Enquiry = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      business: String(data.get("business") ?? "").trim(),
      service: String(data.get("service") ?? ""),
      message: String(data.get("message") ?? "").trim(),
    }
    const problems: Errors = {}
    if (!next.name) problems.name = "Tell us your name."
    if (!/^\S+@\S+\.\S+$/.test(next.email)) problems.email = "Enter an email we can reply to."
    if (!next.message) problems.message = "Tell us a little about what you need."
    setErrors(problems)
    if (Object.keys(problems).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(problems)[0]}"]`)?.focus()
      return
    }

    setEnquiry(next)
    setStatus("sending")
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...next, page: window.location.pathname, hp: String(data.get("bg_hp") ?? "") }),
      })
      setStatus(res.ok ? "sent" : "failed")
      if (res.ok) form.reset()
    } catch {
      setStatus("failed")
    }
  }

  if (status === "sent" && enquiry) {
    const first = enquiry.name.split(/\s+/)[0]
    return (
      <div className={cn("form-done grid justify-items-start gap-4 py-2", className)} role="status">
        <span className="tile size-11 rounded-[0.875rem]" aria-hidden="true">
          <Check className="size-5" strokeWidth={2.25} />
        </span>
        <div>
          <h3 ref={done} tabIndex={-1} className="text-[1.3125rem] font-semibold tracking-[-0.02em] text-ink outline-none">
            Thanks, {first}. It&apos;s with us.
          </h3>
          <p className="t-body mt-2 max-w-[44ch]">
            We&apos;ll reply to <span className="text-ink">{enquiry.email}</span> within one business day, usually
            sooner.
          </p>
        </div>
        <button
          type="button"
          className={buttonVariants({ variant: "glass", size: "md" })}
          onClick={() => {
            setStatus("idle")
            setEnquiry(null)
          }}
        >
          Send another enquiry
        </button>
      </div>
    )
  }

  const field = (name: keyof Errors | "business", label: string, input: React.ReactNode, optional = false) => {
    const err = name in errors ? errors[name as keyof Errors] : undefined
    return (
      <div className="grid gap-2">
        <label htmlFor={`${id}-${name}`} className="text-[14px] font-medium">
          {label}
          {optional && <span className="field-hint font-normal"> (optional)</span>}
        </label>
        {input}
        {err && (
          <p id={`${id}-${name}-error`} className="field-error text-[13px]">
            {err}
          </p>
        )}
      </div>
    )
  }
  const describe = (name: keyof Errors) => (errors[name] ? `${id}-${name}-error` : undefined)
  const sending = status === "sending"

  return (
    <form noValidate onSubmit={onSubmit} className={cn("relative grid gap-5", className)} aria-busy={sending}>
      <div className="grid gap-5 sm:grid-cols-2">
        {field(
          "name",
          "Your name",
          <input id={`${id}-name`} name="name" autoComplete="name" className="field" aria-invalid={!!errors.name} aria-describedby={describe("name")} />,
        )}
        {field(
          "email",
          "Email",
          <input id={`${id}-email`} name="email" type="email" autoComplete="email" className="field" aria-invalid={!!errors.email} aria-describedby={describe("email")} />,
        )}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {field("business", "Business", <input id={`${id}-business`} name="business" autoComplete="organization" className="field" />, true)}
        <div className="grid gap-2">
          <label htmlFor={`${id}-service`} className="text-[14px] font-medium">
            Interested in <span className="field-hint font-normal">(optional)</span>
          </label>
          <select id={`${id}-service`} name="service" className="field" defaultValue="">
            <option value="">Not sure yet</option>
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {field(
        "message",
        "Where does the time go?",
        <textarea
          id={`${id}-message`}
          name="message"
          rows={4}
          className="field resize-y"
          placeholder="Calls we miss after hours, orders we retype into Xero…"
          aria-invalid={!!errors.message}
          aria-describedby={describe("message")}
        />,
      )}
      {/* people never see or reach this field; bots fill in every field they find, and give themselves away */}
      <div aria-hidden="true" className="pointer-events-none absolute left-[-9999px] h-px w-px overflow-hidden">
        <label>
          Leave this empty
          <input name="bg_hp" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
        <button ref={submit} type="submit" disabled={sending} className={buttonVariants({ variant: "primary", size: "lg" })}>
          {sending ? "Sending…" : submitLabel}
          {sending ? <Loader2 aria-hidden="true" className="motion-safe:animate-spin" /> : <Send aria-hidden="true" />}
        </button>
        <p className="field-hint text-[13px]" role="status">
          {status === "failed" && enquiry ? (
            <>
              That didn&apos;t send. Try again, or{" "}
              <a href={mailto(enquiry)} className="link-quiet">
                email it to us instead
              </a>
              .
            </>
          ) : sending ? (
            "Sending your enquiry…"
          ) : (
            `Or email ${CONTACT_EMAIL}`
          )}
        </p>
      </div>
    </form>
  )
}
