import { FiCheck, FiClock, FiArrowRight } from 'react-icons/fi'
import Section from '@/components/ui/Section.jsx'
import Container from '@/components/ui/Container.jsx'
import SectionHeading from '@/components/ui/SectionHeading.jsx'
import Button from '@/components/ui/Button.jsx'
import { BentoGrid, BentoCard } from '@/components/ui/Bento.jsx'
import { PACKAGES, PACKAGES_CONFIRMED, OFFER } from '@/data/offer.js'

/**
 * Hard-priced packages, replacing the old "Custom / project" cards that
 * asked a visitor to enquire before learning anything about cost - the
 * single biggest drop-off on an offer page aimed at local businesses.
 *
 * Gated on PACKAGES_CONFIRMED: until the real figures land in data/offer.js
 * this renders the scope of each package with pricing on request, rather
 * than publishing placeholder amounts that someone could hold us to.
 */
function PriceBlock({ plan }) {
  if (!PACKAGES_CONFIRMED) {
    return (
      <div className={`my-5 ${plan.highlighted ? 'text-white' : 'text-ink'}`}>
        <span className="font-display text-2xl font-extrabold">On request</span>
        <p className={`mt-1 text-sm ${plan.highlighted ? 'text-white/70' : 'text-mute'}`}>
          Fixed quote after a free 15-minute call
        </p>
      </div>
    )
  }

  return (
    <div className="my-5">
      <div className={`flex items-baseline gap-1.5 ${plan.highlighted ? 'text-white' : 'text-orange-600'}`}>
        <span className="font-display text-3xl font-extrabold">{plan.price}</span>
        <span className={`text-sm ${plan.highlighted ? 'text-white/70' : 'text-mute'}`}>
          {plan.priceNote}
        </span>
      </div>
      <p
        className={`mt-2 inline-flex items-center gap-1.5 text-sm ${
          plan.highlighted ? 'text-white/75' : 'text-slate'
        }`}
      >
        <FiClock className="h-3.5 w-3.5" /> {plan.delivery}
      </p>
    </div>
  )
}

export default function Packages() {
  return (
    <Section id="pricing">
      <Container>
        <SectionHeading
          eyebrow="Packages"
          title="Pick the package that fits, or ask us to scope one"
          description="Every package is a fixed price for a defined scope. Free SSL, mobile optimisation and post-launch support are included across all of them."
        />

        <BentoGrid className="mt-14" align="start" cols="grid-cols-2 lg:grid-cols-8">
          {PACKAGES.map((plan) => (
            <BentoCard
              key={plan.name}
              span="col-span-2 lg:col-span-2"
              tone={plan.highlighted ? 'brand' : 'surface'}
              hover={!plan.highlighted}
              size="sm"
              className={plan.highlighted ? 'lg:-mt-4 lg:shadow-[var(--shadow-glow)]' : ''}
            >
              {plan.highlighted && (
                <span className="mb-4 w-fit rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  Most popular
                </span>
              )}

              <h3
                className={`font-display text-xl font-bold ${
                  plan.highlighted ? 'text-white' : 'text-ink'
                }`}
              >
                {plan.name}
              </h3>
              <p className={`mt-1 text-sm ${plan.highlighted ? 'text-white/75' : 'text-slate'}`}>
                {plan.tagline}
              </p>

              <PriceBlock plan={plan} />

              <ul
                className={`flex-1 space-y-3 border-t pt-5 ${
                  plan.highlighted ? 'border-white/20' : 'border-line'
                }`}
              >
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className={`flex items-start gap-2.5 text-sm ${
                      plan.highlighted ? 'text-white/85' : 'text-slate'
                    }`}
                  >
                    <FiCheck
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        plan.highlighted ? 'text-amber-300' : 'text-orange-500'
                      }`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                to="/#quote"
                variant={plan.highlighted ? 'secondary' : 'primary'}
                className={
                  plan.highlighted
                    ? 'mt-7 w-full border-transparent bg-white text-ink hover:bg-white/90'
                    : 'mt-7 w-full'
                }
              >
                Get this quote <FiArrowRight className="h-4 w-4" />
              </Button>
            </BentoCard>
          ))}
        </BentoGrid>

        {OFFER.badge && (
          <p className="mt-8 text-center text-sm text-slate">
            <span className="font-semibold text-orange-600">{OFFER.badge}.</span>{' '}
            Standard pricing returns once the current round of local projects is filled.
          </p>
        )}
      </Container>
    </Section>
  )
}
