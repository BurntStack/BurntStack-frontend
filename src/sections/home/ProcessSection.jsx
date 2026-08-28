import Section from '@/components/ui/Section.jsx'
import Container from '@/components/ui/Container.jsx'
import SectionHeading from '@/components/ui/SectionHeading.jsx'
import { BentoGrid, BentoCard } from '@/components/ui/Bento.jsx'
import { PROCESS } from '@/data/misc.js'

export default function ProcessSection() {
  const steps = PROCESS.slice(0, -1)
  const last = PROCESS.at(-1)

  return (
    <Section className="bg-ivory">
      <Container>
        <SectionHeading
          eyebrow="How We Work"
          title="A proven path to launch"
          description="A transparent, repeatable process that de-risks delivery and keeps you in the loop at every step."
        />

        <BentoGrid className="mt-14" cols="grid-cols-2 lg:grid-cols-6">
          {steps.map(({ step, title, description }) => (
            <BentoCard key={step} span="col-span-2 sm:col-span-2 lg:col-span-2" tone="surface" size="sm">
              <span className="font-display text-3xl font-extrabold text-orange-500/25 transition-colors duration-300 group-hover:text-orange-500/60">
                {step}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-ink">{title}</h3>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate">{description}</p>
            </BentoCard>
          ))}

          <BentoCard
            span="col-span-2 lg:col-span-6"
            tone="ink"
            hover={false}
            className="items-start gap-4 sm:flex-row sm:items-center sm:gap-6"
          >
            <span className="font-display text-3xl font-extrabold text-orange-400">{last.step}</span>
            <div>
              <h3 className="font-display text-lg font-semibold text-white">{last.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-white/70">{last.description}</p>
            </div>
          </BentoCard>
        </BentoGrid>
      </Container>
    </Section>
  )
}
