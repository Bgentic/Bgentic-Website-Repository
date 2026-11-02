"use client"
// Light or dark. The layout's pre-paint script applies the saved (or system) theme before anything renders; this
// switches it afterwards and remembers the choice. Both icons are rendered and CSS shows the right one, so the
// server and the first client render always agree.
import { Moon, Sun } from "lucide-react"
import { buttonVariants } from "@/components/ui/button-variants"
import { cn } from "@/lib/utils"

const KEY = "b-theme"

export function ThemeToggle({ className }: { className?: string }) {
  const toggle = () => {
    const root = document.documentElement
    const next = root.dataset.theme === "dark" ? "light" : "dark"
    try {
      localStorage.setItem(KEY, next)
    } catch {
      // private mode: the switch still works for this visit
    }
    const apply = () => {
      if (next === "dark") root.dataset.theme = "dark"
      else delete root.dataset.theme
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (typeof document.startViewTransition === "function" && !reduce) document.startViewTransition(apply)
    else apply()
  }
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark"
      className={cn(buttonVariants({ variant: "quiet", size: "icon" }), "theme-toggle", className)}
    >
      <Moon aria-hidden="true" className="icon-moon" strokeWidth={1.75} />
      <Sun aria-hidden="true" className="icon-sun" strokeWidth={1.75} />
    </button>
  )
}
