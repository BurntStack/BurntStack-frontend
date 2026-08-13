import { motion } from 'framer-motion'
import Section from '@/components/ui/Section.jsx'
import Container from '@/components/ui/Container.jsx'
import SectionHeading from '@/components/ui/SectionHeading.jsx'
import { INDUSTRIES } from '@/data/misc.js'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion.js'

export default function IndustriesSection() {
  return (
    <Section id="industries">
      <Container>
        <SectionHeading
          eyebrow="Industries"
          title="Deep expertise across sectors"
          description="We speak the language of your industry — and we know what it takes to ship software that fits it."
        />

        <motion.div
          variants={staggerContainer(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
        >
          {INDUSTRIES.map(({ icon: Icon, name, blurb }) => (
            <motion.div
              key={name}
              variants={fadeInUp}
              className="group bg-white p-7 transition-colors duration-300 hover:bg-ivory"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-sand text-xl text-ink transition-colors duration-300 group-hover:bg-orange-500 group-hover:text-white">
                <Icon />
              </span>
              <h3 className="mt-5 font-display text-base font-semibold text-ink">{name}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate">{blurb}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  )
}
