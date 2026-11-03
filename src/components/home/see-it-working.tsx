// 03 · See it working: an ordinary day for an example business, run from one system, shown as a film in one window
// (working-film.tsx); the section is its heading and the film.
import { WorkingFilm } from "@/components/home/working-film"
import { SectionHeader } from "@/components/site/section-header"
import { demos } from "@/content/home"

export function SeeItWorking() {
  return (
    <section className="section demos edge" aria-labelledby="demos-title">
      <div className="container-b">
        <SectionHeader id="demos-title" title={demos.title} intro={demos.intro} />
        <WorkingFilm />
      </div>
    </section>
  )
}
