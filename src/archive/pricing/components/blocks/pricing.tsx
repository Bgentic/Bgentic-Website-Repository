"use client"
// The 21st.dev pricing block, kept as designed: the monthly/annual switch with its confetti, the prices rolling with
// NumberFlow, and the three cards springing into a 3D fan as they come into view (the outer two lean back and in,
// the popular one rises). It takes the site's shadcn tokens, so it sits on the navy with the light blue as primary.
//
// Changed from the original: our Base UI switch and label, the site's button variants, the container, AUD prices
// (en-AU), a heading level for use as a page's h1, an optional line above a plan's features ("Everything in Basic,
// plus:"), a fine print line under the switch, the annual total under the price, and confetti in the brand's
// colours (canvas-confetti takes hex colours, not CSS variables). On a cream band, `.pricing-paper` (depth.css)
// re-points the tokens it reads, so the same block reads navy on paper.
import { buttonVariants } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Check, Star } from "lucide-react"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import NumberFlow from "@number-flow/react"
import { onIdle } from "@/lib/idle"

export interface PricingPlan {
  name: string
  price: string
  /** billed annually, the price a month: what the big number shows when Annual is on */
  yearlyPrice: string
  /** billed annually, the year's total: shown under the big number as "Billed annually at …" */
  yearlyTotal?: string
  period: string
  /** a line above the features, such as "Everything in Basic, plus:" */
  intro?: string
  features: string[]
  description: string
  buttonText: string
  href: string
  isPopular: boolean
}

interface PricingProps {
  plans: PricingPlan[]
  title?: string
  description?: string
  /** under the switch: terms that hold for every plan */
  note?: string
  /** what annual billing saves, beside the switch */
  saving?: string
  /** "h1" where the block opens the page */
  as?: "h1" | "h2"
  /** the heading's id, for the section's aria-labelledby */
  id?: string
  className?: string
}

// light blue, its lifted step, cream and sand
const CONFETTI = ["#3b82f6", "#5692f6", "#fbf7f3", "#d7cfc5"]
// whole dollars where the price is whole, cents where it isn't (a year's price over twelve months)
const AUD = {
  style: "currency",
  currency: "AUD",
  currencyDisplay: "narrowSymbol",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
} as const satisfies Intl.NumberFormatOptions
const aud = new Intl.NumberFormat("en-AU", AUD)

// The confetti only ever fires from the annual switch, so its library isn't part of the page's bundle: it's fetched
// once the page has loaded and is idle (or on the first flip, if that comes sooner), and fires as soon as it's in hand.
const importConfetti = () => import("canvas-confetti").then((m) => m.default)
let confettiLoad: ReturnType<typeof importConfetti> | null = null
const loadConfetti = () => (confettiLoad ??= importConfetti())

export function Pricing({
  plans,
  title = "Simple, Transparent Pricing",
  description = "Choose the plan that works for you\nAll plans include access to our platform, lead generation tools, and dedicated support.",
  note,
  saving = "Save 20%",
  as: Heading = "h2",
  id,
  className,
}: PricingProps) {
  const [isMonthly, setIsMonthly] = useState(true)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const switchRef = useRef<HTMLButtonElement>(null)

  useEffect(() => onIdle(() => void loadConfetti()), [])

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked)
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2

      loadConfetti().then((confetti) =>
        confetti({
          particleCount: 50,
          spread: 60,
          origin: {
            x: x / window.innerWidth,
            y: y / window.innerHeight,
          },
          colors: CONFETTI,
          ticks: 200,
          gravity: 1.2,
          decay: 0.94,
          startVelocity: 30,
          shapes: ["circle"],
          disableForReducedMotion: true,
        }),
      )
    }
  }

  return (
    <div className={cn("container-b py-20", className)}>
      <div className="text-center space-y-4 mb-12">
        <Heading id={id} className="text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </Heading>
        <p className="text-muted-foreground text-lg whitespace-pre-line">{description}</p>
      </div>

      <div className="flex justify-center mb-10">
        {/* a span, not the original's second <label>: a label can't hold another */}
        {/* reaching for the switch fetches the confetti, in case it comes before the idle moment does */}
        <span
          className="relative inline-flex items-center cursor-pointer"
          onPointerEnter={() => void loadConfetti()}
          onPointerDown={() => void loadConfetti()}
          onFocusCapture={() => void loadConfetti()}
        >
          <Label>
            <Switch
              ref={switchRef}
              checked={!isMonthly}
              onCheckedChange={handleToggle}
              className="relative"
              aria-label="Annual billing"
            />
          </Label>
        </span>
        <span className="ml-2 font-semibold">
          Annual billing{" "}
          {/* light blue on navy; on a paper band (--pricing-accent-text) it turns navy, as light blue isn't text there */}
          <span className="text-[color:var(--pricing-accent-text,var(--primary))]">({saving})</span>
        </span>
      </div>
      {note && <p className="-mt-6 mb-10 text-center text-sm text-muted-foreground">{note}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 sm:2 gap-4">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 1 }}
            whileInView={
              isDesktop
                ? {
                    y: plan.isPopular ? -20 : 0,
                    opacity: 1,
                    x: index === 2 ? -30 : index === 0 ? 30 : 0,
                    scale: index === 0 || index === 2 ? 0.94 : 1.0,
                  }
                : {}
            }
            viewport={{ once: true }}
            transition={{
              duration: 1.6,
              type: "spring",
              stiffness: 100,
              damping: 30,
              delay: 0.4,
              opacity: { duration: 0.5 },
            }}
            className={cn(
              `pricing-card rounded-2xl border-[1px] p-6 bg-background text-center lg:flex lg:flex-col lg:justify-center relative`,
              plan.isPopular ? "border-primary border-2" : "border-border",
              "flex flex-col",
              !plan.isPopular && "mt-5",
              index === 0 || index === 2
                ? "z-0 transform translate-x-0 translate-y-0 -translate-z-[50px] rotate-y-[10deg]"
                : "z-10",
              index === 0 && "origin-right",
              index === 2 && "origin-left",
            )}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-0 bg-primary py-0.5 px-2 rounded-bl-xl rounded-tr-xl flex items-center">
                <Star className="text-primary-foreground h-4 w-4 fill-current" />
                <span className="text-primary-foreground ml-1 font-sans font-semibold">Popular</span>
              </div>
            )}
            <div className="flex-1 flex flex-col">
              <p className="text-base font-semibold text-muted-foreground">{plan.name}</p>
              <div className="mt-6 flex items-center justify-center gap-x-2">
                <span className="text-5xl font-bold tracking-tight text-foreground">
                  <NumberFlow
                    value={isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)}
                    locales="en-AU"
                    format={AUD}
                    transformTiming={{
                      duration: 500,
                      easing: "ease-out",
                    }}
                    willChange
                    className="tabular-nums"
                  />
                </span>
                {plan.period !== "Next 3 months" && (
                  <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
                    / {plan.period}
                  </span>
                )}
              </div>

              <p className="text-xs leading-5 text-muted-foreground">
                {isMonthly
                  ? "billed monthly"
                  : plan.yearlyTotal
                    ? `Billed annually at ${aud.format(Number(plan.yearlyTotal))}`
                    : "billed annually"}
              </p>

              {plan.intro && <p className="mt-5 text-left text-sm font-semibold text-foreground">{plan.intro}</p>}
              <ul className={cn("gap-2 flex flex-col", plan.intro ? "mt-3" : "mt-5")}>
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span className="text-left">{feature}</span>
                  </li>
                ))}
              </ul>

              <hr className="w-full my-4" />

              <Link
                href={plan.href}
                className={cn(
                  buttonVariants({
                    variant: "outline",
                  }),
                  "group relative w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter",
                  "transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-1 hover:bg-primary hover:text-primary-foreground",
                  plan.isPopular ? "bg-primary text-primary-foreground" : "bg-background text-foreground",
                )}
              >
                {plan.buttonText}
              </Link>
              <p className="mt-6 text-xs leading-5 text-muted-foreground">{plan.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
