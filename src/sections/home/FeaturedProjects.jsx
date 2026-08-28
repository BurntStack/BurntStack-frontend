import { FiArrowRight } from 'react-icons/fi'
import Section from '@/components/ui/Section.jsx'
import Container from '@/components/ui/Container.jsx'
import SectionHeading from '@/components/ui/SectionHeading.jsx'
import Button from '@/components/ui/Button.jsx'
import ProjectCard from '@/components/cards/ProjectCard.jsx'
import { BentoGrid } from '@/components/ui/Bento.jsx'
import { PROJECTS } from '@/data/projects.js'

const SPANS = ['col-span-2 lg:col-span-4', 'col-span-2 lg:col-span-2', 'col-span-2 lg:col-span-3', 'col-span-2 lg:col-span-3']
const COVERS = ['h-56', 'h-56', 'h-44', 'h-44']

export default function FeaturedProjects() {
  return (
    <Section id="portfolio" className="bg-ivory">
      <Container>
        <SectionHeading
          eyebrow="Featured Work"
          title="Projects that moved the needle"
          description="Real problems, real results. Here is a look at how we have helped businesses ship and scale."
        />

        <BentoGrid className="mt-14" cols="grid-cols-2 lg:grid-cols-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.slug} project={project} span={SPANS[i]} coverHeight={COVERS[i]} />
          ))}
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
