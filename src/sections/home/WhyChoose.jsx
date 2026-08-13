import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import Section from '@/components/ui/Section.jsx'
import Container from '@/components/ui/Container.jsx'
import Badge from '@/components/ui/Badge.jsx'
import Button from '@/components/ui/Button.jsx'
import { FEATURES } from '@/data/features.js'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion.js'

export default function WhyChoose() {
  return (
    <Section className="bg-ivory">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Sticky intro */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <motion.div
              variants={staggerContainer(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
            >
              <motion.div variants={fadeInUp}>
                <Badge>Why BurntStack</Badge>
              </motion.div>
              <motion.h2 variants={fadeInUp} className="t-h2 mt-5 font-bold text-ink">
                A partner you can build on for the long run
              </motion.h2>
              <motion.p variants={fadeInUp} className="t-lead mt-5 text-slate">
                Senior engineers, careful design and real ownership. We build software that holds up
                as you grow, and we stay on to support it after launch.
              </motion.p>
              <motion.div variants={fadeInUp} className="mt-8">
                <Button to="/about" variant="secondary">
                  More about us <FiArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Feature rows */}
          <motion.div
            variants={staggerContainer(0.06)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid gap-x-8 sm:grid-cols-2"
          >
            {FEATURES.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                variants={fadeInUp}
                className="group flex gap-4 border-t border-line py-6 first:border-t-0 sm:[&:nth-child(2)]:border-t-0"
              >
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-lg text-orange-600 shadow-xs ring-1 ring-line transition-colors group-hover:bg-orange-500 group-hover:text-white group-hover:ring-orange-500">
                  <Icon />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-ink">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate">{description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
