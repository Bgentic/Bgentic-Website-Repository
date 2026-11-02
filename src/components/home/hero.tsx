import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button-variants"
import { DashboardShowcase } from "@/components/home/dashboard-showcase"
import { hero } from "@/content/home"

// 00 · The original promise, set large and centred, then the product in depth beneath it.
export function Hero() {
  return (
    <section className="hero-x" aria-labelledby="hero-title">
      <div className="container-b text-center">
        <h1 id="hero-title" className="t-hero mx-auto max-w-[14ch]">
          {hero.title[0]} <span className="accent-ink block">{hero.title[1]}</span>
        </h1>
        <p className="t-lede mx-auto mt-7 max-w-[58ch]">{hero.lede}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href={hero.primary.href} className={buttonVariants({ variant: "primary", size: "lg" })}>
            {hero.primary.label}
            <ArrowRight aria-hidden="true" className="transition-transform duration-300 ease-(--ease-spring) group-hover/button:translate-x-0.5" />
          </Link>
          <Link href={hero.secondary.href} className={buttonVariants({ variant: "outline", size: "lg" })}>
            {hero.secondary.label}
          </Link>
        </div>
        <p className="mt-7 text-[15px] text-slate">
          {hero.aside.text}{" "}
          <Link href={hero.aside.link.href} className="link-quiet">
            {hero.aside.link.label}
          </Link>
        </p>
      </div>
      <div className="container-b">
        <DashboardShowcase />
      </div>
    </section>
  )
}
