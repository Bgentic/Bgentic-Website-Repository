import { Handshake, LifeBuoy, Megaphone, MessagesSquare, PanelsTopLeft, Workflow, type LucideIcon } from "lucide-react"
import type { PlanGroupIcon } from "@/content/pricing"

// One drawn icon per group of the plan (content/pricing.ts), shared by /pricing's card and the home page's summary.
export const PLAN_ICONS: Record<PlanGroupIcon, LucideIcon> = {
  sales: Handshake,
  conversations: MessagesSquare,
  automation: Workflow,
  marketing: Megaphone,
  websites: PanelsTopLeft,
  support: LifeBuoy,
}
