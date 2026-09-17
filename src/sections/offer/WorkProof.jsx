import { FiArrowRight, FiStar } from 'react-icons/fi'
import Section from '@/components/ui/Section.jsx'
import Container from '@/components/ui/Container.jsx'
import SectionHeading from '@/components/ui/SectionHeading.jsx'
import Button from '@/components/ui/Button.jsx'
import ProjectCard from '@/components/cards/ProjectCard.jsx'
import { BentoGrid, BentoCard } from '@/components/ui/Bento.jsx'
import { PROJECTS } from '@/data/projects.js'
import { TESTIMONIALS } from '@/data/offer.js'

/**
 * Work and (when we have them) client quotes.
 *
 * TESTIMONIALS ships empty and this renders nothing in its place - the
 * reference site this page is modelled on leans hard on five-star quotes,
 * but inventing them is not on the table. The block below appears by
 * itself the moment a real, signed-off quote is added to data/offer.js.
 */
export default function WorkProof() {
  return (
    <Section id="work" className="bg-ivory">
      <Container>
        <SectionHeading
          eyebrow="Our work"
          title="Real sites, real businesses"
          description="Every project below is live and running. We would rather show you a handful of things we actually shipped than a wall of stock mockups."
        />

        <BentoGrid className="mt-14" cols="grid-cols-2 lg:grid-cols-6">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              span="col-span-2 lg:col-span-4"
              coverHeight="h-56"
            />
          ))}

          <BentoCard
            span="col-span-2 lg:col-span-2"
            tone="ink"
            hover={false}
            className="justify-center gap-3"
          >
            <p className="font-display text-lg font-semibold text-white">Yours could be next</p>
            <p className="text-sm text-white/70">
              We take on a limited number of local projects at a time so each one gets proper
              attention.
            </p>
            <Button
              to="/#quote"
              variant="secondary"
              className="mt-2 w-fit border-white/20 bg-white/10 text-white hover:bg-white/15"
            >
              Start a project <FiArrowRight className="h-4 w-4" />
            </Button>
          </BentoCard>

          {TESTIMONIALS.map(({ quote, name, company, role }) => (
            <BentoCard key={`${name}-${company}`} span="col-span-2 lg:col-span-3" tone="surface">
              <div className="flex gap-1 text-orange-500">
                {Array.from({ length: 5 }, (_, i) => (
                  <FiStar key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-slate">“{quote}”</blockquote>
              <footer className="mt-5 border-t border-line pt-4">
                <p className="font-semibold text-ink">{name}</p>
                <p className="text-sm text-mute">
                  {role ? `${role}, ` : ''}
                  {company}
                </p>
              </footer>
            </BentoCard>
          ))}
        </BentoGrid>

        <div className="mt-12 flex justify-center">
          <Button to="/portfolio" variant="outline" size="lg">
            View all work <FiArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Container>
    </Section>
  )
}
