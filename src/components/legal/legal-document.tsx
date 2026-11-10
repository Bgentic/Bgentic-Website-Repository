import * as React from "react"
import Link from "next/link"
import { COMPANY_LINE, type LegalDoc } from "@/content/legal"

// /terms and /privacy: one layout for both. A navy opening with the title, the company and the version, the intro and
// (for the terms) the clauses people look for; then the document on cream, set for reading, with its contents
// alongside from desktop (sticky, so any clause is a click away) and folded above it on phones. Every section has
// an anchor (#s-07, #schedule-1), so a clause can be linked to directly. The text is content/legal.ts, word for word;
// its light markdown is read here. Styles: "legal" in styles/depth.css.

type Block =
  | { t: "h3"; text: string }
  | { t: "p"; text: string }
  | { t: "ul"; items: string[]; lettered: boolean }
  | { t: "ol"; items: string[] }
  | { t: "table"; rows: string[][] }
  | { t: "note"; text: string }
type Section = { id: string; num: string; title: string; blocks: Block[] }

function parse(body: string): Section[] {
  const sections: Section[] = []
  for (const chunk of body.trim().split(/\n\s*\n/)) {
    const lines = chunk.split("\n").map((l) => l.trim())
    const first = lines[0]
    const heading = /^## (Schedule \d+|\d+[A-Z]?)\. (.+)$/.exec(first)
    if (heading) {
      const num = heading[1]
      const id = num.startsWith("Schedule") ? `schedule-${num.split(" ")[1]}` : `s-${num.toLowerCase()}`
      sections.push({ id, num, title: heading[2], blocks: [] })
      continue
    }
    const section = sections.at(-1)
    if (!section) continue
    if (first.startsWith("### ")) section.blocks.push({ t: "h3", text: first.slice(4) })
    else if (first.startsWith("> ")) section.blocks.push({ t: "note", text: lines.map((l) => l.replace(/^> ?/, "")).join(" ") })
    else if (lines.every((l) => l.startsWith("- "))) {
      const items = lines.map((l) => l.slice(2))
      section.blocks.push({ t: "ul", items, lettered: /^\([a-z]\) /.test(items[0]) })
    } else if (lines.every((l) => /^\d+\. /.test(l))) section.blocks.push({ t: "ol", items: lines.map((l) => l.replace(/^\d+\. /, "")) })
    else if (lines.every((l) => l.startsWith("|"))) {
      section.blocks.push({ t: "table", rows: lines.map((l) => l.split("|").slice(1, -1).map((c) => c.trim())) })
    } else section.blocks.push({ t: "p", text: lines.join(" ") })
  }
  return sections
}

const PHONES: Record<string, string> = { "0422 246 085": "tel:+61422246085", "1300 363 992": "tel:1300363992" }
const INLINE = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)|([\w.+-]+@[\w-]+(?:\.[\w-]+)+)|(0422 246 085|1300 363 992)/g

function DocLink({ href, children }: { href: string; children: React.ReactNode }) {
  if (href.startsWith("/") || href.startsWith("#")) return <Link href={href}>{children}</Link>
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
      {children}
    </a>
  )
}

/** a line of text: **bold**, [links](href), and email addresses and phone numbers as links */
function Inline({ text }: { text: string }) {
  const out: React.ReactNode[] = []
  let last = 0
  for (const m of text.matchAll(INLINE)) {
    if (m.index > last) out.push(text.slice(last, m.index))
    const k = m.index
    if (m[1] !== undefined) out.push(<strong key={k}><Inline text={m[1]} /></strong>)
    else if (m[2] !== undefined) out.push(<DocLink key={k} href={m[3]}>{m[2]}</DocLink>)
    else if (m[4] !== undefined) out.push(<a key={k} href={`mailto:${m[4]}`}>{m[4]}</a>)
    else out.push(<a key={k} href={PHONES[m[5]]}>{m[5]}</a>)
    last = k + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return <>{out}</>
}

function Blocks({ blocks }: { blocks: Block[] }) {
  return blocks.map((b, i) => {
    switch (b.t) {
      case "h3":
        return <h3 key={i}>{b.text}</h3>
      case "p":
        return (
          <p key={i}>
            <Inline text={b.text} />
          </p>
        )
      case "note":
        return (
          <p key={i} className="legal-note">
            <Inline text={b.text} />
          </p>
        )
      case "ul":
        return (
          <ul key={i} className={b.lettered ? "legal-list legal-list-lettered" : "legal-list"}>
            {b.items.map((item, j) => (
              <li key={j}>
                <Inline text={item} />
              </li>
            ))}
          </ul>
        )
      case "ol":
        return (
          <ol key={i} className="legal-steps">
            {b.items.map((item, j) => (
              <li key={j}>
                <Inline text={item} />
              </li>
            ))}
          </ol>
        )
      case "table": {
        const [head, ...rows] = b.rows
        return (
          <div key={i} className="legal-table-wrap">
            <table className="legal-table">
              <thead>
                <tr>
                  {head.map((h) => (
                    <th key={h} scope="col">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, j) => (
                  <tr key={j}>
                    {r.map((c, n) => (
                      <td key={n}>{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      }
    }
  })
}

function Contents({ sections }: { sections: Section[] }) {
  return (
    <ol>
      {sections.map((s) => (
        <li key={s.id}>
          <a href={`#${s.id}`}>
            <span className="legal-toc-num">{s.num.replace("Schedule ", "S")}</span>
            <span>{s.title}</span>
          </a>
        </li>
      ))}
    </ol>
  )
}

export function LegalDocument({ doc }: { doc: LegalDoc }) {
  const sections = parse(doc.body)
  return (
    <>
      <section className="hero legal-hero" aria-labelledby="legal-title">
        <div className="container-b">
          <h1 id="legal-title" className="t-h1">
            {doc.title}
          </h1>
          <p className="legal-meta">
            <span>{COMPANY_LINE}</span>
            <span>{doc.version}</span>
          </p>
          <p className="t-lede legal-intro">{doc.intro}</p>
          {doc.keySections && (
            <nav aria-label="Key sections">
              <ul className="legal-keys">
                {doc.keySections.map((k) => (
                  <li key={k.href}>
                    {k.href.startsWith("/") ? (
                      <Link href={k.href} className="legal-key">
                        {k.label}
                      </Link>
                    ) : (
                      <a href={k.href} className="legal-key">
                        {k.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </section>

      <section className="section paper legal-body" aria-label={doc.title}>
        <div className="container-b legal-grid">
          <aside className="legal-aside">
            <nav aria-label="Contents" className="legal-toc">
              <p className="legal-toc-title">Contents</p>
              <Contents sections={sections} />
            </nav>
          </aside>
          <div className="min-w-0">
            <details className="legal-toc-mobile">
              <summary>Contents</summary>
              <nav aria-label="Contents" className="legal-toc-list">
                <Contents sections={sections} />
              </nav>
            </details>
            <article className="legal-doc">
              {sections.map((s) => (
                <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="legal-section">
                  <h2 id={`${s.id}-title`}>
                    <span className="legal-num">{s.num}.</span>
                    <span>{s.title}</span>
                  </h2>
                  <Blocks blocks={s.blocks} />
                </section>
              ))}
              <footer className="legal-closing">
                {doc.closing.map((line) => (
                  <p key={line}>
                    <Inline text={line} />
                  </p>
                ))}
                <p className="legal-see-also">
                  See also our <Link href={doc.seeAlso.href}>{doc.seeAlso.label}</Link>.
                </p>
              </footer>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
