import { cva, type VariantProps } from "class-variance-authority"

// Bgentic buttons: a pill, one filled accent action per view, a lit glass partner, and a press
// that answers in 120ms. Links use `buttonVariants` directly on <a>; it carries no client code, so server components
// can import it.
export const buttonVariants = cva(
  // `btn-spring` (styles/depth.css): a spring lift on hover, a 120ms press to 0.97, and a smooth release.
  "btn-spring group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-[550] whitespace-nowrap select-none tracking-[-0.006em] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // primary and glass are drawn in styles/depth.css: lit gradients and edges read better as CSS than as classes
        primary: "btn-primary",
        glass: "btn-glass",
        outline: "border border-white/12 bg-white/[0.03] text-ink hover:border-[rgb(127_176_247/0.32)] hover:bg-white/[0.07]",
        quiet: "text-current hover:bg-current/[0.06]",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-[0.9375rem]",
        lg: "h-12 px-6 text-base",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
)

export type ButtonVariantProps = VariantProps<typeof buttonVariants>
