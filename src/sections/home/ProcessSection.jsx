import { motion } from 'framer-motion'
import Section from '@/components/ui/Section.jsx'
import Container from '@/components/ui/Container.jsx'
import SectionHeading from '@/components/ui/SectionHeading.jsx'
import { PROCESS } from '@/data/misc.js'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion.js'

export default function ProcessSection() {
  return (
    <Section className="bg-background-secondary">
      <Container>
        <SectionHeading
          eyebrow="How We Work"
          title="A proven path to launch"
          description="A transparent, repeatable process that de-risks delivery and keeps you in the loop at every step."
        />

        <div className="relative mt-16">
          {/* Animated connecting line */}
          <motion.div
            aria-hidden
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute left-[26px] top-2 hidden h-[calc(100%-1rem)] w-0.5 origin-top bg-gradient-to-b from-ember-500 via-ember-400 to-transparent md:block"
          />

          <motion.ol
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="space-y-5"
          >
            {PROCESS.map(({ step, title, description }) => (
              <motion.li
                key={step}
                variants={fadeInUp}
                className="group relative flex items-start gap-5 rounded-3xl border border-border-base bg-surface p-6 transition-colors hover:border-ember-400/40 md:pl-20"
              >
                <span className="absolute left-0 top-6 hidden h-14 w-14 items-center justify-center rounded-2xl border border-ember-500/30 bg-background font-display text-lg font-bold text-ember-500 transition-colors group-hover:bg-ember-500 group-hover:text-white md:flex">
                  {step}
                </span>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ember-500/10 font-display font-bold text-ember-500 md:hidden">
                  {step}
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground">{title}</h3>
                  <p className="mt-1 text-muted">{description}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </Container>
    </Section>
  )
}
