import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, ArrowUpRight, MousePointerClick } from "lucide-react"
import { PageHero, SectionHeader } from "@/components/site/section-header"
import { Faq } from "@/components/site/faq"
import { ContactBand } from "@/components/home/contact-band"
import { buttonVariants } from "@/components/ui/button-variants"
import { SERVICES, serviceBySlug } from "@/content/services"
import { clientBySlug } from "@/content/clients"

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata(props: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await props.params
  const s = serviceBySlug(slug)
  return s ? { title: s.name, description: `${s.headline} ${s.summary}` } : {}
}

// One template for all six services: the outcome, what we build, the working demo, who it's for, who already runs
// it, the honest answers, and the way in.
export default async function ServicePage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params
  const s = serviceBySlug(slug)
  if (!s) notFound()
  const clients = s.clients.map(clientBySlug).filter((c) => !!c)
  const others = SERVICES.filter((o) => o.slug !== s.slug)

  return (
    <>
      <PageHero
        title={s.headline}
        lede={s.lede}
        trail={
          <nav aria-label="Breadcrumb">
            <Link href="/services" className="hover:text-ink">
              Services
            </Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page" className="text-ink">
              {s.name}
            </span>
          </nav>
        }
      >
        <Link href="/contact" className={buttonVariants({ variant: "primary", size: "lg" })}>
          Book a discovery call
          <ArrowRight aria-hidden="true" />
        </Link>
      </PageHero>

      <section className="section band-surface" aria-labelledby="builds-title">
        <div className="container-b">
          <SectionHeader id="builds-title" title="What we build" intro={s.summary} />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-[24px] border hairline bg-line md:grid-cols-2">
            {s.builds.map((b) => (
              <li key={b.title} className="reveal bg-surface p-7 md:p-9 dark:bg-[var(--b-card-bg)]">
                <h3 className="t-h3">{b.title}</h3>
                <p className="t-body mt-2">{b.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section band-ground" aria-labelledby="demo-title">
        <div className="container-b grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-5">
            <h2 id="demo-title" className="t-h2">
              {s.demo.title}
            </h2>
            <p className="t-lede mt-5">{s.demo.text}</p>
          </div>
          <div className="glass grid min-h-[20rem] place-items-center rounded-[28px] p-10 text-center lg:col-span-6 lg:col-start-7">
            <div className="max-w-[30ch]">
              <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-sky-100 text-brand-text" aria-hidden="true">
                <MousePointerClick className="size-6" strokeWidth={1.75} />
              </span>
              <p className="mt-5 text-[15px] font-semibold text-ink">The interactive demo lands here next.</p>
              <p className="t-quiet mt-2">Until then, we&apos;re happy to walk you through it on a call.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section band-surface" aria-labelledby="fit-title">
        <div className="container-b grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 id="fit-title" className="t-h2">
              Who it&apos;s for
            </h2>
            <ul className="mt-8 grid gap-4">
              {s.forWho.map((w) => (
                <li key={w} className="border-t hairline pt-4 text-[1.0625rem] text-body">
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
                      <Link href={`/clients#${c.slug}`} className="font-medium text-ink hover:underline hover:underline-offset-4">
                        {c.name}
                      </Link>
                      <span className="text-slate"> · {c.sector}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="t-h3 mb-2">Questions we get asked</h2>
            <Faq items={s.faqs} />
          </div>
        </div>
      </section>

      <section className="section band-ground" aria-labelledby="others-title">
        <div className="container-b">
          <h2 id="others-title" className="t-h3">
            The other five
          </h2>
          <ul className="mt-6 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-5">
            {others.map((o) => (
              <li key={o.slug} className="border-t hairline">
                <Link href={`/services/${o.slug}`} className="group flex items-center justify-between gap-3 py-4 text-[15px] font-medium text-ink">
                  {o.name}
                  <ArrowUpRight className="size-4 text-slate transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactBand />
    </>
  )
}
