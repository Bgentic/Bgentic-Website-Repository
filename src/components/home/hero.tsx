import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button-variants"
import { HeroScene } from "@/components/home/hero-scene"
import { hero } from "@/content/home"

// 00 · The original promise on the left, the beating orb on the right, a kinetic grid underneath. The column runs
// on one rhythm: a short step from the eyebrow to the headline, a longer one to the lede, the longest to the
// actions, and the pricing note set off below a hairline.
export function Hero() {
  return (
    <HeroScene>
      <p className="hero-eyebrow">
        <span className="hero-eyebrow-dot" aria-hidden="true" />
        {hero.eyebrow}
      </p>
      <h1 id="hero-title" className="t-hero mt-7">
        {hero.title[0]} <span className="t-glow block">{hero.title[1]}</span>
      </h1>
      <p className="t-lede hero-lede mt-8">{hero.lede}</p>
      <div className="mt-11 flex flex-wrap gap-3.5">
        <Link href={hero.primary.href} className={buttonVariants({ variant: "primary", size: "lg" })}>
          {hero.primary.label}
          <ArrowRight aria-hidden="true" className="transition-transform duration-300 ease-(--ease-spring) group-hover/button:translate-x-0.5" />
        </Link>
        <Link href={hero.secondary.href} className={buttonVariants({ variant: "glass", size: "lg" })}>
          {hero.secondary.label}
        </Link>
      </div>
      <p className="hero-aside mt-10">
        {hero.aside.text}{" "}
        <Link href={hero.aside.link.href} className="link-quiet">
          {hero.aside.link.label}
        </Link>
      </p>
    </HeroScene>
  )
}
