import { motion } from 'framer-motion'
import { FiCheck, FiClock, FiArrowRight } from 'react-icons/fi'
import Band from '@/components/editorial/Band.jsx'
import Label from '@/components/editorial/Label.jsx'
import Display from '@/components/editorial/Display.jsx'
import Button from '@/components/ui/Button.jsx'
import { useQuoteForm } from '@/components/lead/useQuoteForm.js'
import { PACKAGES, PACKAGES_CONFIRMED, OFFER } from '@/data/offer.js'
import { fadeInUp } from '@/lib/motion.js'
import { cn } from '@/utils/cn.js'

/**
 * Packages as columns divided by rules, not as bordered pricing cards.
 *
 * Gated on PACKAGES_CONFIRMED: until the real figures land in
 * data/offer.js this shows each package's scope with pricing on request,
 * rather than publishing placeholder amounts someone could hold us to.
 */
function Price({ plan }) {
  if (!PACKAGES_CONFIRMED) {
    return (
      <div className="mt-6">
        <p className="font-display text-2xl font-bold tracking-[-0.02em] text-ink">On request</p>
        <p className="mt-1 text-sm text-mute">Fixed quote after a free 15-minute call</p>
      </div>
    )
  }
  return (
    <div className="mt-6">
      <p className="font-display text-4xl font-extrabold tracking-[-0.03em] text-orange-600">
        {plan.price}
        <span className="ml-1.5 text-sm font-medium text-mute">{plan.priceNote}</span>
      </p>
      <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-slate">
        <FiClock className="h-3.5 w-3.5" /> {plan.delivery}
      </p>
    </div>
  )
}

export default function Packages() {
  const { openQuoteForm } = useQuoteForm()

  return (
    <Band id="pricing" tone="canvas">
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] md:items-end">
        <div>
          <Label index="06">Packages</Label>
          <Display className="mt-6 max-w-[15ch]" accent="or ask us to scope one.">
            Pick the package that fits,
          </Display>
        </div>
        <p className="text-slate md:pb-3">
          Every package is a fixed price for a defined scope. Free SSL, mobile optimisation and
          post-launch support are included across all of them.
        </p>
      </div>

      <div className="mt-14 grid border-t border-line sm:mt-20 lg:grid-cols-4">
        {PACKAGES.map((plan) => (
          <motion.div
            key={plan.name}
            variants={fadeInUp}
            className={cn(
              'flex flex-col border-b border-line py-10 lg:border-b-0 lg:px-8 lg:py-12 lg:first:pl-0 lg:last:pr-0',
              'lg:border-l lg:first:border-l-0',
              // The highlighted column is marked by a warm ground and a
              // rule on top, not by a box - it stays part of the row.
              plan.highlighted && 'relative lg:bg-ivory',
            )}
          >
            {plan.highlighted && (
              <>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -top-px hidden h-0.5 bg-orange-500 lg:block"
                />
                <span className="t-label mb-4 text-orange-700">Most popular</span>
              </>
            )}

            <h3 className="font-display text-xl font-bold tracking-[-0.02em] text-ink">
              {plan.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate">{plan.tagline}</p>

            <Price plan={plan} />

            <ul className="mt-8 flex-1 space-y-3 border-t border-line pt-6">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-slate">
                  <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              onClick={openQuoteForm}
              variant={plan.highlighted ? 'primary' : 'secondary'}
              className="mt-8 w-full"
            >
              Get this quote <FiArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        ))}
      </div>

      {OFFER.badge && (
        <motion.p variants={fadeInUp} className="mt-10 border-t border-line pt-6 text-sm text-slate">
          <span className="font-semibold text-orange-700">{OFFER.badge}.</span> Standard pricing
          returns once the current round of projects is filled.
        </motion.p>
      )}
    </Band>
  )
}
