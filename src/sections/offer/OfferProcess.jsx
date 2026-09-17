import Section from '@/components/ui/Section.jsx'
import Container from '@/components/ui/Container.jsx'
import SectionHeading from '@/components/ui/SectionHeading.jsx'
import { BentoGrid, BentoCard } from '@/components/ui/Bento.jsx'
import { OFFER_STEPS } from '@/data/offer.js'

/**
 * Five steps, down from the seven-stage agency process the old homepage
 * ran. The point here is to remove the "what am I signing up for?" doubt
 * right before the pricing section, not to document a methodology.
 */
export default function OfferProcess() {
  const steps = OFFER_STEPS.slice(0, -1)
  const last = OFFER_STEPS.at(-1)

  return (
    <Section id="process" className="bg-ivory">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="Five steps, no surprises"
          description="You know the price before we start and you see the design before we build. That is the whole process."
          align="left"
        />

        <BentoGrid className="mt-12" cols="grid-cols-2 lg:grid-cols-8">
          {steps.map(({ step, title, description }) => (
            <BentoCard key={step} span="col-span-2 lg:col-span-2" tone="surface" size="sm">
              <span className="font-display text-3xl font-extrabold text-orange-500/25 transition-colors duration-300 group-hover:text-orange-500/60">
                {step}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-ink">{title}</h3>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate">{description}</p>
            </BentoCard>
          ))}

          <BentoCard
            span="col-span-2 lg:col-span-8"
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
