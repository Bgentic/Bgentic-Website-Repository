import Link from "next/link"
import { ArrowRight, CodeXml } from "lucide-react"
import { SectionHeader } from "@/components/site/section-header"
import { buttonVariants } from "@/components/ui/button-variants"
import { process } from "@/content/home"

// 04 · How we work: five steps on one rail. The rail fills with light as the section scrolls into view (CSS scroll
// timeline; full and still where unsupported or when motion is reduced), and each step is a glass card under its
// node. The engineering panel closes the section: the people behind the builds. Styles: the 04 section of depth.css.
export function HowWeWork() {
  return (
    <section className="section lit-b edge" aria-labelledby="how-title">
      <div className="container-b">
        <SectionHeader id="how-title" title={process.title} intro={process.intro} />
        <ol className="steps mt-14">
          {process.steps.map((s, i) => (
            <li key={s.name} className="step reveal">
              <span className="step-node" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="step-card">
                <h3 className="step-name">
                  <span className="sr-only">Step {i + 1}: </span>
                  {s.name}
                </h3>
                <p className="step-text">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="eng reveal mt-5">
          <span className="tile size-12 rounded-[0.875rem]" aria-hidden="true">
            <CodeXml className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="eng-title">{process.engineering.title}</h3>
            <p className="eng-text">{process.engineering.text}</p>
          </div>
          <Link href="/contact" className={buttonVariants({ variant: "glass", size: "md" })}>
            Talk to an engineer
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
