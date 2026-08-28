import { FiCheck } from 'react-icons/fi'
import Section from '@/components/ui/Section.jsx'
import Container from '@/components/ui/Container.jsx'
import SectionHeading from '@/components/ui/SectionHeading.jsx'
import Button from '@/components/ui/Button.jsx'
import { BentoGrid, BentoCard } from '@/components/ui/Bento.jsx'
import { PRICING } from '@/data/misc.js'

export default function PricingSection() {
  return (
    <Section className="bg-ivory">
      <Container>
        <SectionHeading
          eyebrow="Engagements"
          title="Flexible plans, tailored to you"
          description="Every project is unique, so we scope and quote to fit. Pick the engagement that matches your goals."
        />

        <BentoGrid className="mt-14" cols="grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          {PRICING.map((plan) => (
            <BentoCard
              key={plan.name}
              span="col-span-2 sm:col-span-1 lg:col-span-1"
              tone={plan.highlighted ? 'brand' : 'surface'}
              hover={!plan.highlighted}
              className="gap-0"
            >
              {plan.highlighted && (
                <span className="mb-4 w-fit rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  Most Popular
                </span>
              )}
              <h3 className={`font-display text-xl font-bold ${plan.highlighted ? 'text-white' : 'text-ink'}`}>{plan.name}</h3>
              <p className={`mt-1 text-sm ${plan.highlighted ? 'text-white/75' : 'text-slate'}`}>{plan.tagline}</p>

              <div className={`my-6 flex items-baseline gap-1 ${plan.highlighted ? 'text-white' : 'text-orange-600'}`}>
                <span className="font-display text-3xl font-extrabold">Custom</span>
                <span className={`text-sm ${plan.highlighted ? 'text-white/70' : 'text-mute'}`}>/ project</span>
              </div>

              <ul className="flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className={`flex items-start gap-2.5 text-sm ${plan.highlighted ? 'text-white/85' : 'text-slate'}`}>
                    <FiCheck className={`mt-0.5 h-4 w-4 shrink-0 ${plan.highlighted ? 'text-white' : 'text-orange-500'}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                to="/contact"
                variant={plan.highlighted ? 'secondary' : 'primary'}
                className={plan.highlighted ? 'mt-7 w-full border-transparent bg-white text-ink hover:bg-white/90' : 'mt-7 w-full'}
              >
                Request a Quote
              </Button>
            </BentoCard>
          ))}
        </BentoGrid>
      </Container>
    </Section>
  )
}
