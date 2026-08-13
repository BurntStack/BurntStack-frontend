import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import Section from '@/components/ui/Section.jsx'
import Container from '@/components/ui/Container.jsx'
import SectionHeading from '@/components/ui/SectionHeading.jsx'
import Button from '@/components/ui/Button.jsx'
import ProjectCard from '@/components/cards/ProjectCard.jsx'
import { PROJECTS } from '@/data/projects.js'
import { staggerContainer, viewportOnce } from '@/lib/motion.js'

export default function FeaturedProjects() {
  return (
    <Section id="portfolio" className="bg-background-secondary">
      <Container>
        <SectionHeading
          eyebrow="Featured Work"
          title="Projects that moved the needle"
          description="Real problems, real results. Here is a look at how we have helped businesses ship and scale."
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid gap-6 md:grid-cols-2"
        >
          {PROJECTS.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </motion.div>

        <div className="mt-12 flex justify-center">
          <Button to="/portfolio" variant="outline" size="lg">
            View All Projects <FiArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Container>
    </Section>
  )
}
