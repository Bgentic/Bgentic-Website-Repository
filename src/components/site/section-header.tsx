import * as React from "react"
import { cn } from "@/lib/utils"

// The editorial section header: the heading holds the left of the grid, its intro answers it on the right and
// sits on the heading's baseline (`align="center"` centres the intro on the heading instead). Stacks on narrow
// screens.
export function SectionHeader({
  id,
  title,
  intro,
  children,
  className,
  align = "end",
}: {
  id: string
  title: string
  intro?: string
  children?: React.ReactNode
  className?: string
  align?: "end" | "center"
}) {
  return (
    <div
      className={cn(
        "grid gap-6 md:grid-cols-12 md:gap-8",
        align === "center" ? "md:items-center" : "md:items-end",
        className,
      )}
    >
      <h2 id={id} className="t-h2 md:col-span-6">
        {title}
      </h2>
      {(intro || children) && (
        <div className="md:col-span-5 md:col-start-8">
          {intro && <p className="t-lede">{intro}</p>}
          {children}
        </div>
      )}
    </div>
  )
}

export function PageHero({
  title,
  lede,
  trail,
  children,
}: {
  title: string
  lede: string
  trail?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <section className="hero">
      <div className="container-b">
        {trail && <div className="mb-8 text-sm text-slate">{trail}</div>}
        <h1 className="t-h1 max-w-[18ch]">{title}</h1>
        <p className="t-lede mt-6 max-w-[56ch]">{lede}</p>
        {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  )
}
