import { FiArrowRight } from 'react-icons/fi'
import Section from '@/components/ui/Section.jsx'
import Container from '@/components/ui/Container.jsx'
import SectionHeading from '@/components/ui/SectionHeading.jsx'
import Button from '@/components/ui/Button.jsx'
import ProjectCard from '@/components/cards/ProjectCard.jsx'
import { BentoGrid, BentoCard } from '@/components/ui/Bento.jsx'
import { PROJECTS } from '@/data/projects.js'

export default function FeaturedProjects() {
  return (
    <Section id="portfolio" className="bg-ivory">
      <Container>
        <SectionHeading
          eyebrow="Featured Work"
          title="What we’re building"
          description="Real work for real clients. Here’s a look at what we’ve shipped so far."
        />

        <BentoGrid className="mt-14" cols="grid-cols-2 lg:grid-cols-6">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.slug} project={project} span="col-span-2 lg:col-span-4" coverHeight="h-56" />
          ))}

          <BentoCard span="col-span-2 lg:col-span-2" tone="ink" hover={false} className="justify-center gap-2">
            <p className="font-display text-lg font-semibold text-white">More in the works</p>
            <p className="text-sm text-white/70">
              We’re adding case studies as we finish documenting them, this is just the start.
            </p>
          </BentoCard>
        </BentoGrid>

        <div className="mt-12 flex justify-center">
          <Button to="/portfolio" variant="outline" size="lg">
            View All Projects <FiArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Container>
    </Section>
  )
}
