import fs from "node:fs"
import path from "node:path"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { ClientsList } from "@/components/home/clients-list"
import { SectionHeader } from "@/components/site/section-header"
import { buttonVariants } from "@/components/ui/button-variants"
import { CLIENTS } from "@/content/clients"
import { clientsIntro } from "@/content/home"
import { SERVICES } from "@/content/services"
import { cn } from "@/lib/utils"

// 05 · Clients: the four real businesses as a gallery, like a product shoot. Each card is dark glass holding a lit
// studio, and in it the client's own site as it is today (scripts/client-shots.mjs) on a monitor, a tablet and a
// phone, as large as the studio allows. Hovering a card lights it and scrolls the site down the monitor, and the
// studio opens the live site; one hint under the section's heading says so, once for all four. Under each studio:
// the trade, what runs on Bgentic, the services behind it and their site. No quotes, ratings or results: none are on
// file. Styles: the 05 section of depth.css.
//
// The studio is a second, pointer-only way to the site: out of the tab order and hidden from screen readers, since
// "Visit site" is the same link for them.
//
// A portrait for a card is a drop-in: a cut-out (transparent) person.webp, .avif or .png in the client's folder
// stands at the right of the devices, and the devices move over to make room. Without one they compose alone.
const DIR = "/images/clients"
const serviceName = (slug: string) => SERVICES.find((s) => s.slug === slug)?.name ?? slug

/** the client's portrait, if one has been dropped into public/images/clients/<slug>/ */
function portrait(slug: string) {
  for (const ext of ["webp", "avif", "png"]) {
    const src = `${DIR}/${slug}/person.${ext}`
    if (fs.existsSync(path.join(process.cwd(), "public", src))) return src
  }
}

// each device's capture, at the size scripts/client-shots.mjs takes it, and the width it's drawn at in a card
const DEVICES = [
  {
    id: "monitor",
    file: "desktop",
    w: 1440,
    h: 2700,
    sizes: "(min-width: 1280px) 23vw, (min-width: 1024px) 420px, (min-width: 640px) 62vw, 92vw",
  },
  {
    id: "tablet",
    file: "tablet",
    w: 1180,
    h: 820,
    sizes: "(min-width: 1280px) 17vw, (min-width: 1024px) 250px, (min-width: 640px) 38vw, 72vw",
  },
  {
    id: "phone",
    file: "phone",
    w: 780,
    h: 1688,
    sizes: "(min-width: 1280px) 6vw, (min-width: 1024px) 100px, (min-width: 640px) 15vw, 24vw",
  },
] as const

/** `page`: the gallery opens /clients, so its title is the h1, it clears the floating header, and it takes the
 *  page's own intro */
export function ClientsShowcase({ page = false, intro = clientsIntro.intro }: { page?: boolean; intro?: string }) {
  return (
    <section className={cn("section lit-a edge clients-x", page && "clients-page")} aria-labelledby="clients-title">
      {/* the words keep the page's margins; the gallery under them breaks out to the screen's edges on desktop */}
      <div className="container-b">
        <SectionHeader id="clients-title" as={page ? "h1" : "h2"} title={clientsIntro.title} intro={intro} />
        <p className="clients-hint" aria-hidden="true">
          <i />
          <span className="cue-hover">Hover a card to scroll through its site · Click to view it live</span>
          <span className="cue-touch">Tap a card to view the site live</span>
        </p>
      </div>
      <div className="clients-wrap mt-6">
        <ClientsList className="clients">
          {CLIENTS.map((c) => {
            const person = portrait(c.slug)
            return (
              <li key={c.slug} className="reveal flex">
                <article className="client" aria-labelledby={`client-${c.slug}`}>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="client-stage"
                    data-tone={c.tone}
                    data-person={person ? "" : undefined}
                  >
                    {DEVICES.map((d) => (
                      <div key={d.id} className={`dv dv-${d.id}`}>
                        <div className="dv-screen">
                          <Image
                            src={`${DIR}/${c.slug}/${d.file}.jpg`}
                            alt=""
                            width={d.w}
                            height={d.h}
                            sizes={d.sizes}
                            className={d.id === "monitor" ? "dv-scroll" : undefined}
                          />
                        </div>
                      </div>
                    ))}
                    {person && (
                      <div className="client-person">
                        <Image src={person} alt="" fill sizes="(min-width: 1280px) 220px, (min-width: 640px) 32vw, 64vw" />
                      </div>
                    )}
                  </a>

                  <div className="client-body">
                    <div className="client-head">
                      <div className="min-w-0">
                        <h3 id={`client-${c.slug}`} className="client-name">
                          {c.name}
                        </h3>
                        <p className="client-trade">{c.sector}</p>
                      </div>
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(buttonVariants({ variant: "glass", size: "sm" }), "client-visit xl:w-9 xl:px-0")}
                      >
                        <span className="visit-label">Visit site</span>
                        <ArrowUpRight className="size-3.5" aria-hidden="true" />
                        <span className="sr-only">: {c.domain} (opens in a new tab)</span>
                      </a>
                    </div>
                    <dl className="client-facts">
                      <div className="fact-runs">
                        <dt>Runs on Bgentic</dt>
                        <dd>{c.runs}</dd>
                      </div>
                      <div className="fact-services">
                        <dt>Services</dt>
                        <dd>
                          <ul className="flex flex-wrap gap-1.5 pt-1">
                            {c.services.map((s) => (
                              <li key={s}>
                                <Link href={`/services/${s}`} className="svc-chip client-chip">
                                  {serviceName(s)}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </article>
              </li>
            )
          })}
        </ClientsList>
      </div>
    </section>
  )
}
