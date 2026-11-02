import { Blocks, Compass, Globe, ShoppingBag, TrendingUp, Workflow, type LucideProps } from "lucide-react"
import type { ServiceSlug } from "@/content/services"

// One icon per service, shared by the navigation, the home page and the service pages.
export function ServiceIcon({ slug, ...props }: { slug: ServiceSlug } & LucideProps) {
  const p = { strokeWidth: 1.75, "aria-hidden": true as const, ...props }
  switch (slug) {
    case "ai-consultancy":
      return <Compass {...p} />
    case "automations":
      return <Workflow {...p} />
    case "crm":
      return <Blocks {...p} />
    case "websites":
      return <Globe {...p} />
    case "ecommerce":
      return <ShoppingBag {...p} />
    case "seo-marketing":
      return <TrendingUp {...p} />
  }
}
