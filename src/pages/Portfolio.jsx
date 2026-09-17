import Seo from '@/components/seo/Seo.jsx'
import { buildBreadcrumbSchema } from '@/lib/schema.js'
import PageHero from '@/components/ui/PageHero.jsx'
import Band from '@/components/editorial/Band.jsx'
import ProjectCard from '@/components/cards/ProjectCard.jsx'
import QuoteCta from '@/sections/offer/QuoteCta.jsx'
import { PROJECTS } from '@/data/projects.js'

export default function Portfolio() {
  return (
    <>
      <Seo
        title="Portfolio"
        path="/portfolio"
        description="A selection of the products and platforms we’ve designed and engineered for our clients."
        jsonLd={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Portfolio', path: '/portfolio' },
        ])}
      />
      <PageHero
        eyebrow="Portfolio"
        title="Work we’re"
        accent="proud of."
        description="A look at what we’ve shipped so far, with more case studies on the way as we finish them."
      />

      <Band tone="canvas" spacing="tight" containerClassName="pt-0">
        <div className="border-t border-line">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
          <div className="py-12">
            <p className="font-display text-xl font-semibold text-ink">More in the works</p>
            <p className="mt-2 max-w-md text-slate">
              We’re adding case studies as we finish documenting them.
            </p>
          </div>
        </div>
      </Band>

      <QuoteCta />
    </>
  )
}
