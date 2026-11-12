import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button-variants"
import { HeroScene } from "@/components/home/hero-scene"
import { hero } from "@/content/home"

// 00 · The original promise on the left, the beating orb on the right, a kinetic grid underneath. Space inside the
// column is tight where things belong together (eyebrow and headline, headline and lede, the two actions) and wide
// where they don't (the actions, then the pricing note below a hairline).
export function Hero() {
  return (
    <HeroScene>
      <p className="hero-eyebrow">
        <span className="hero-eyebrow-rule" aria-hidden="true" />
        {hero.eyebrow}
      </p>
      <h1 id="hero-title" className="t-hero mt-5">
        {hero.title[0]} <span className="t-glow block">{hero.title[1]}</span>
      </h1>
      <p className="hero-lede mt-7">{hero.lede}</p>
      {/* on phones the pair stacks at full width, the same size: one big target each, read as one decision */}
      <div className="mt-10 flex flex-wrap gap-3 max-sm:flex-col max-sm:items-stretch">
        <Link href={hero.primary.href} className={buttonVariants({ variant: "primary", size: "lg" })}>
          {hero.primary.label}
          <ArrowRight aria-hidden="true" className="transition-transform duration-300 ease-(--ease-spring) group-hover/button:translate-x-0.5" />
        </Link>
        <Link href={hero.secondary.href} className={buttonVariants({ variant: "glass", size: "lg" })}>
          {hero.secondary.label}
        </Link>
      </div>
      <p className="hero-aside mt-16">
        {hero.aside.text}{" "}
        <Link href={hero.aside.link.href} className="link-quiet">
          {hero.aside.link.label}
        </Link>
      </p>
    </HeroScene>
  )
}
