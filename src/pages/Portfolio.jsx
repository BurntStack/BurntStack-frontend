import Seo from '@/components/seo/Seo.jsx'
import PageHero from '@/components/ui/PageHero.jsx'
import Section from '@/components/ui/Section.jsx'
import Container from '@/components/ui/Container.jsx'
import ProjectCard from '@/components/cards/ProjectCard.jsx'
import { BentoGrid } from '@/components/ui/Bento.jsx'
import CtaBanner from '@/sections/home/CtaBanner.jsx'
import { PROJECTS } from '@/data/projects.js'

const SPANS = ['col-span-2 lg:col-span-4', 'col-span-2 lg:col-span-2', 'col-span-2 lg:col-span-3', 'col-span-2 lg:col-span-3']
const COVERS = ['h-56', 'h-56', 'h-44', 'h-44']

export default function Portfolio() {
  return (
    <>
      <Seo
        title="Portfolio"
        path="/portfolio"
        description="A selection of the products and platforms we’ve designed and engineered for our clients."
      />
      <PageHero
        eyebrow="Portfolio"
        title="Work we’re proud of"
        description="Every project below started as a business problem — and shipped as measurable results."
      />
      <Section className="pt-0">
        <Container>
          <BentoGrid cols="grid-cols-2 lg:grid-cols-6">
            {PROJECTS.map((project, i) => (
              <ProjectCard key={project.slug} project={project} span={SPANS[i % SPANS.length]} coverHeight={COVERS[i % COVERS.length]} />
            ))}
          </BentoGrid>
        </Container>
      </Section>
      <CtaBanner />
    </>
  )
}
