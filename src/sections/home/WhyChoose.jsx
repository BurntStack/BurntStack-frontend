import { FiArrowRight } from 'react-icons/fi'
import Section from '@/components/ui/Section.jsx'
import Container from '@/components/ui/Container.jsx'
import Button from '@/components/ui/Button.jsx'
import { BentoGrid, BentoCard, BentoIcon, BentoHeading } from '@/components/ui/Bento.jsx'
import { FEATURES } from '@/data/features.js'

export default function WhyChoose() {
  return (
    <Section className="bg-ivory">
      <Container>
        <BentoGrid cols="grid-cols-2 lg:grid-cols-6">
          {/* Intro banner tile */}
          <BentoCard
            span="col-span-2 lg:col-span-6"
            tone="ink"
            hover={false}
            className="items-start justify-between gap-8 lg:flex-row lg:items-center"
          >
            <BentoHeading
              eyebrow="Why BurntStack"
              title="A partner you can build on for the long run"
              description="Senior engineers, careful design and real ownership — software that holds up as you grow."
              tone="onDark"
              className="max-w-lg"
            />
            <Button to="/about" variant="secondary" className="shrink-0 border-white/20 bg-white/10 text-white hover:bg-white/15">
              More about us <FiArrowRight className="h-4 w-4" />
            </Button>
          </BentoCard>

          {FEATURES.map(({ icon: Icon, title, description }) => (
            <BentoCard key={title} span="col-span-1 sm:col-span-2 lg:col-span-2" tone="surface" size="sm">
              <BentoIcon icon={Icon} />
              <h3 className="mt-4 font-display text-base font-semibold text-ink">{title}</h3>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate">{description}</p>
            </BentoCard>
          ))}
        </BentoGrid>
      </Container>
    </Section>
  )
}
