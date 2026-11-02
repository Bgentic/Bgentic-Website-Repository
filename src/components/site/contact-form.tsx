"use client"
// A short enquiry form. Until the CRM webhook is wired (Phase 3), sending opens the visitor's email app with the
// enquiry already written, addressed to hello@bgentic.io, so it works today and nothing is lost.
import * as React from "react"
import { Send } from "lucide-react"
import { buttonVariants } from "@/components/ui/button-variants"
import { CONTACT_EMAIL } from "@/content/site"
import { SERVICES } from "@/content/services"
import { cn } from "@/lib/utils"

type Errors = Partial<Record<"name" | "email" | "message", string>>

export function ContactForm({ className }: { className?: string }) {
  const [errors, setErrors] = React.useState<Errors>({})
  const [sent, setSent] = React.useState(false)
  const id = React.useId()

  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const data = new FormData(ev.currentTarget)
    const name = String(data.get("name") ?? "").trim()
    const email = String(data.get("email") ?? "").trim()
    const business = String(data.get("business") ?? "").trim()
    const service = String(data.get("service") ?? "")
    const message = String(data.get("message") ?? "").trim()
    const next: Errors = {}
    if (!name) next.name = "Tell us your name."
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter an email we can reply to."
    if (!message) next.message = "Tell us a little about what you need."
    setErrors(next)
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0]
      ev.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    const subject = `Discovery call: ${business || name}`
    const details = [
      `Name: ${name}`,
      `Email: ${email}`,
      business ? `Business: ${business}` : null,
      service ? `Interested in: ${service}` : null,
    ].filter((l): l is string => l !== null)
    const body = `${details.join("\n")}\n\n${message}`
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
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

  return (
    <form noValidate onSubmit={onSubmit} className={cn("grid gap-5", className)}>
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
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
        <button type="submit" className={buttonVariants({ variant: "primary", size: "lg" })}>
          Send enquiry
          <Send aria-hidden="true" />
        </button>
        <p className="field-hint text-[13px]" role="status">
          {sent ? "Your email app should open with the enquiry written. Send it from there." : `Or email ${CONTACT_EMAIL}`}
        </p>
      </div>
    </form>
  )
}
