import { motion } from 'framer-motion'
import { FiCheck } from 'react-icons/fi'
import Section from '@/components/ui/Section.jsx'
import Container from '@/components/ui/Container.jsx'
import SectionHeading from '@/components/ui/SectionHeading.jsx'
import Button from '@/components/ui/Button.jsx'
import { PRICING } from '@/data/misc.js'
import { cn } from '@/utils/cn.js'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion.js'

export default function PricingSection() {
  return (
    <Section className="bg-background-secondary">
      <Container>
        <SectionHeading
          eyebrow="Engagements"
          title="Flexible plans, tailored to you"
          description="Every project is unique, so we scope and quote to fit. Pick the engagement that matches your goals."
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {PRICING.map((plan) => (
            <motion.div
              key={plan.name}
              variants={fadeInUp}
              className={cn(
                'relative flex flex-col rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1.5',
                plan.highlighted
                  ? 'border-ember-500/50 bg-surface ring-1 ring-ember-500/30'
                  : 'border-border-base bg-surface hover:border-ember-400/40',
              )}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-ember-500 to-ember-400 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  Most Popular
                </span>
              )}
              <h3 className="font-display text-xl font-bold text-foreground">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted">{plan.tagline}</p>

              <div className="my-6 flex items-baseline gap-1">
                <span className="font-display text-3xl font-extrabold text-gradient">Custom</span>
                <span className="text-sm text-muted">/ project</span>
              </div>

              <ul className="flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-muted">
                    <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-ember-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                to="/contact"
                variant={plan.highlighted ? 'primary' : 'secondary'}
                className="mt-7 w-full"
              >
                Request a Quote
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  )
}
