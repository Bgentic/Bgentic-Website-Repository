import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { ContactSection } from "@/components/home/contact-section"
import { ServiceDemo } from "@/components/services/service-demo"
import { ServiceGlance } from "@/components/services/service-glance"
import { Faq } from "@/components/site/faq"
import { SectionHeader } from "@/components/site/section-header"
import { buttonVariants } from "@/components/ui/button-variants"
import { SERVICES, serviceBySlug } from "@/content/services"
import { clientBySlug } from "@/content/clients"
import { cn } from "@/lib/utils"

// Six public pages, nothing personal on them: each is prerendered whole at build (generateStaticParams), and
// ensureStatic keeps navigation to them instant, with no request-time rendering (Next's "keeping pages static").
export const ensureStatic = "navigation"

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata(props: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await props.params
  const s = serviceBySlug(slug)
  return s ? { title: s.name, description: `${s.headline} ${s.summary}` } : {}
}

// One template for all six services, in the home page's bands: the outcome beside the service at a glance (navy);
// what we build, as paper sheets (sand); the service working (navy, components/services/service-demo); who it's for,
// who already runs it, the honest answers and the other five (cream); the close (navy).
//
// The page itself reads no URL data: the shell every link to /services/[slug] shares stays the same for all six,
// and the service is read from `params` inside Suspense (Next's "move URL data behind Suspense"). Each page is still
// prerendered whole, so a page load gets the full HTML; on a client navigation the navy hero band holds the space
// for the instant it takes to arrive.
export default function ServicePage(props: PageProps<"/services/[slug]">) {
  return (
    <Suspense fallback={<section className="hero min-h-[38rem]" aria-busy="true" />}>
      <Service params={props.params} />
    </Suspense>
  )
}

async function Service({ params }: { params: PageProps<"/services/[slug]">["params"] }) {
  const { slug } = await params
  const s = serviceBySlug(slug)
  if (!s) notFound()
  const clients = s.clients.map(clientBySlug).filter((c) => !!c)
  const others = SERVICES.filter((o) => o.slug !== s.slug)

  return (
    <>
      <section className="hero" aria-labelledby="service-title">
        <div className="container-b grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate">
              <Link href="/services" className="transition-colors hover:text-ink">
                Services
              </Link>
              <span aria-hidden="true"> / </span>
              <span aria-current="page" className="text-ink">
                {s.name}
              </span>
            </nav>
            <h1 id="service-title" className="t-h1 max-w-[16ch]">
              {s.headline}
            </h1>
            <p className="t-lede mt-6 max-w-[46ch]">{s.lede}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/contact" className={buttonVariants({ variant: "primary", size: "lg" })}>
                Book a discovery call
                <ArrowRight aria-hidden="true" />
              </Link>
              <Link href="/pricing" className={buttonVariants({ variant: "glass", size: "lg" })}>
                See pricing
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6 xl:col-span-5 xl:col-start-8">
            <ServiceGlance service={s} clients={clients} />
          </div>
        </div>
      </section>

      <section className="section paper paper-sand" aria-labelledby="builds-title">
        <div className="container-b">
          <SectionHeader id="builds-title" title="What we build" intro={s.summary} />
          <ul className={cn("mt-14 grid gap-4 md:grid-cols-2", s.builds.length % 3 === 0 && "lg:grid-cols-3")}>
            {s.builds.map((b) => (
              <li key={b.title} className="reveal flex">
                <div className="step-card w-full">
                  <h3 className="text-[1.1875rem] font-semibold tracking-[-0.016em] text-ink">{b.title}</h3>
                  <p className="t-body mt-2 text-[15px]">{b.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ServiceDemo service={s} />

      <section className="section paper" aria-labelledby="fit-title">
        <div className="container-b">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <h2 id="fit-title" className="t-h2">
                Who it&apos;s for
              </h2>
              <ul className="mt-8 grid gap-4">
                {s.forWho.map((w) => (
                  <li key={w} className="border-t border-[color:var(--b-line)] pt-4 text-[1.0625rem] text-body">
                    {w}
                  </li>
                ))}
              </ul>
              {clients.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-sm font-semibold text-ink">Already running it</h3>
                  <ul className="mt-4 grid gap-3">
                    {clients.map((c) => (
                      <li key={c.slug} className="text-[15px] text-body">
                        <Link href="/clients" className="font-medium text-ink underline-offset-4 hover:underline">
                          {c.name}
                        </Link>
                        <span> · {c.sector}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <h2 className="mb-2 text-[1.3125rem] font-semibold tracking-[-0.02em] text-ink">Questions we get asked</h2>
              <Faq items={s.faqs} />
            </div>
          </div>

          <div className="mt-24">
            <h2 id="others-title" className="text-[1.3125rem] font-semibold tracking-[-0.02em] text-ink">
              The other five
            </h2>
            <ul className="mt-6 flex flex-wrap gap-3" aria-labelledby="others-title">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/services/${o.slug}`} className={buttonVariants({ variant: "glass", size: "md" })}>
                    {o.name}
                    <ArrowUpRight aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  )
}
