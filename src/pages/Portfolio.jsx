import { motion } from 'framer-motion'
import Seo from '@/components/seo/Seo.jsx'
import PageHero from '@/components/ui/PageHero.jsx'
import Section from '@/components/ui/Section.jsx'
import Container from '@/components/ui/Container.jsx'
import ProjectCard from '@/components/cards/ProjectCard.jsx'
import CtaBanner from '@/sections/home/CtaBanner.jsx'
import { PROJECTS } from '@/data/projects.js'
import { staggerContainer, viewportOnce } from '@/lib/motion.js'

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
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid gap-6 md:grid-cols-2"
          >
            {PROJECTS.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </motion.div>
        </Container>
      </Section>
      <CtaBanner />
    </>
  )
}
