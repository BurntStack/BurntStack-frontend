import Seo from '@/components/seo/Seo.jsx'
import PageHero from '@/components/ui/PageHero.jsx'
import Section from '@/components/ui/Section.jsx'
import Container from '@/components/ui/Container.jsx'
import ProjectCard from '@/components/cards/ProjectCard.jsx'
import { BentoGrid, BentoCard } from '@/components/ui/Bento.jsx'
import CtaBanner from '@/sections/home/CtaBanner.jsx'
import { PROJECTS } from '@/data/projects.js'

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
        description="A look at what we’ve shipped so far, with more case studies on the way as we finish them."
      />
      <Section className="pt-0">
        <Container>
          <BentoGrid cols="grid-cols-2 lg:grid-cols-6">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.slug} project={project} span="col-span-2 lg:col-span-4" coverHeight="h-56" />
            ))}
            <BentoCard span="col-span-2 lg:col-span-2" tone="ink" hover={false} className="justify-center gap-2">
              <p className="font-display text-lg font-semibold text-white">More in the works</p>
              <p className="text-sm text-white/70">
                We’re adding case studies as we finish documenting them.
              </p>
            </BentoCard>
          </BentoGrid>
        </Container>
      </Section>
      <CtaBanner />
    </>
  )
}
