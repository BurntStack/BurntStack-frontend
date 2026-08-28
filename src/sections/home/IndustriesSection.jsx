import Section from '@/components/ui/Section.jsx'
import Container from '@/components/ui/Container.jsx'
import SectionHeading from '@/components/ui/SectionHeading.jsx'
import { BentoGrid, BentoCard, BentoIcon } from '@/components/ui/Bento.jsx'
import { INDUSTRIES } from '@/data/misc.js'

export default function IndustriesSection() {
  return (
    <Section id="industries">
      <Container>
        <SectionHeading
          eyebrow="Industries"
          title="Deep expertise across sectors"
          description="We speak the language of your industry, and we know what it takes to ship software that fits it."
        />

        <BentoGrid className="mt-14" cols="grid-cols-2 sm:grid-cols-4 lg:grid-cols-6">
          {INDUSTRIES.map(({ icon: Icon, name, blurb }) => (
            <BentoCard key={name} span="col-span-1 sm:col-span-2 lg:col-span-2" tone="surface" size="sm">
              <BentoIcon icon={Icon} />
              <h3 className="mt-5 font-display text-base font-semibold text-ink">{name}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate">{blurb}</p>
            </BentoCard>
          ))}
        </BentoGrid>
      </Container>
    </Section>
  )
}
