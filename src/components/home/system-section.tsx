import type { CSSProperties } from "react"
import { DashboardShowcase } from "@/components/home/dashboard-showcase"
import { engine } from "@/content/home"

// Every tool you juggle, pulled into one system: the tools a business runs on drift in from scattered and settle
// into one row as the section arrives, a beam of light drops from them into the app, and the app sits beneath with
// the live desk at work in front of it. The drift and the beam are scroll-driven CSS (styles/depth.css): no
// script, never autoplaying, and static where unsupported or when motion is reduced.
function scatter(i: number): CSSProperties {
  const angle = i * 2.39996 // the golden angle spreads them evenly without a visible pattern
  const reach = 90 + (i % 3) * 45
  return {
    "--sx": `${Math.round(Math.cos(angle) * reach * 1.8)}px`,
    "--sy": `${Math.round(Math.sin(angle) * reach - 40)}px`,
    "--r": `${((i * 37) % 24) - 12}deg`,
  } as CSSProperties
}

export function SystemSection() {
  return (
    <section className="system section" aria-labelledby="system-title">
      <div className="container-b">
        <div className="mx-auto max-w-[46rem] text-center">
          <h2 id="system-title" className="t-h2">
            {engine.title}
          </h2>
          <p className="t-lede mx-auto mt-6 max-w-[40rem]">{engine.intro}</p>
        </div>
        <ul className="tool-row mt-14" aria-label="Tools it connects">
          {engine.tools.map((tool, i) => (
            <li key={tool} className="tool" style={scatter(i)}>
              {tool}
            </li>
          ))}
        </ul>
        <div className="beam" aria-hidden="true" />
        <DashboardShowcase />
      </div>
    </section>
  )
}
