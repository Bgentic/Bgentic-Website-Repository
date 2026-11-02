import { cva, type VariantProps } from "class-variance-authority"

// Bgentic buttons: a pill, one filled accent action per view, a quiet glass partner for the navy stage, and a press
// that answers in 120ms. Links use `buttonVariants` directly on <a>; it carries no client code, so server components
// can import it.
export const buttonVariants = cva(
  // `btn-spring` (styles/depth.css): a spring lift on hover, a 120ms press to 0.97, and a smooth release.
  "btn-spring group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-[550] whitespace-nowrap select-none tracking-[-0.006em] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary:
          "bg-brand text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.22),0_1px_2px_rgb(15_30_58/0.3),0_10px_28px_-10px_rgb(43_111_230/0.75)] hover:bg-brand-hover hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.22),0_1px_2px_rgb(15_30_58/0.3),0_16px_36px_-10px_rgb(43_111_230/0.85)]",
        glass:
          "border border-white/15 bg-white/[0.04] text-current shadow-[inset_0_1px_0_rgb(127_176_247/0.28)] hover:border-white/25 hover:bg-white/[0.08]",
        outline: "border border-line-strong bg-surface text-ink hover:border-slate/40 hover:bg-fill",
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
