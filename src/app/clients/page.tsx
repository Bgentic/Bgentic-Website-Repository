import type { Metadata } from "next"
import { PageHero } from "@/components/site/section-header"
import { ClientsGrid } from "@/components/home/clients-grid"
import { ContactSection } from "@/components/home/contact-section"

export const metadata: Metadata = {
  title: "Clients",
  description: "Sydney businesses that run their bookings, inboxes, invoicing and websites on systems Bgentic built and keeps running.",
}

export default function ClientsPage() {
  return (
    <>
      <PageHero
        title="Sydney businesses we run systems for."
        lede="Traffic management, mobile inspections, sound systems and live music. Four different trades, the same outcome: the admin runs itself, and the team gets on with the work."
      />
      <section className="section band-ground pt-0" aria-label="Clients">
        <div className="container-b">
          <ClientsGrid />
        </div>
      </section>
      <ContactSection />
    </>
  )
}
