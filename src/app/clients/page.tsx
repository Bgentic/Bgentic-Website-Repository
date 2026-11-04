import type { Metadata } from "next"
import { ClientFeedback } from "@/components/clients/client-feedback"
import { ClientsShowcase } from "@/components/home/clients-showcase"
import { ContactSection } from "@/components/home/contact-section"
import { clientsPage } from "@/content/pages"

export const metadata: Metadata = {
  title: "Clients",
  description: "Sydney businesses that run their bookings, inboxes, invoicing and websites on systems Bgentic built and keeps running.",
}

// /clients: the home page's client gallery opens the page (navy, full width), then client feedback (sand), then the
// close (navy).
export default function ClientsPage() {
  return (
    <>
      <ClientsShowcase page intro={clientsPage.intro} />
      <ClientFeedback />
      <ContactSection />
    </>
  )
}
