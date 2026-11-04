import { SectionHeader } from "@/components/site/section-header"
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials"
import { CLIENT_CARDS } from "@/content/testimonials"

// /clients: the four clients as the staggered carousel, on the sand band between the gallery and the close. One card
// per client, with their logo: what we run for them, in our words, until a client approves a quote of their own
// (content/testimonials.ts). The band re-points the carousel's tokens to paper (.stagger-paper, depth.css): cream
// cards with navy type, the centre card light blue.
export function ClientFeedback() {
  const quotes = CLIENT_CARDS.some((c) => c.quote)
  return (
    <section className="section paper paper-sand stagger-paper" aria-labelledby="feedback-title">
      <div className="container-b">
        <SectionHeader
          id="feedback-title"
          title={quotes ? "In their words." : "What we run for them."}
          intro={
            quotes
              ? "What our clients say about the systems we built and keep running for them."
              : "Four Sydney businesses, each running on a system we built and keep running for them."
          }
        />
      </div>
      <div className="mt-12">
        <StaggerTestimonials items={CLIENT_CARDS} label="Our clients" />
      </div>
    </section>
  )
}
