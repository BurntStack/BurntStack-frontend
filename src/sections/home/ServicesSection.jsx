import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import Section from '@/components/ui/Section.jsx'
import Container from '@/components/ui/Container.jsx'
import Badge from '@/components/ui/Badge.jsx'
import Button from '@/components/ui/Button.jsx'
import ServiceCard from '@/components/cards/ServiceCard.jsx'
import { BentoGrid } from '@/components/ui/Bento.jsx'
import { SERVICES } from '@/data/services.js'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion.js'

// Every 6th service runs wide — hierarchy from size, not extra chrome.
function spanFor(i) {
  return i % 6 === 0 ? 'col-span-2 lg:col-span-4' : 'col-span-2 sm:col-span-2 lg:col-span-2'
}

export default function ServicesSection() {
  return (
    <Section id="services">
      <Container>
        {/* Asymmetric header — breaks the always-centered rhythm */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid gap-6 border-b border-line pb-10 md:grid-cols-[1fr_auto] md:items-end"
        >
          <div className="max-w-2xl">
            <motion.div variants={fadeInUp}>
              <Badge>What we do</Badge>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="t-h2 mt-5 font-bold text-ink">
              One team for design, build and everything after
            </motion.h2>
          </div>
          <motion.p variants={fadeInUp} className="max-w-sm text-slate md:pb-2">
            From a first landing page to a company-wide platform, we cover design, engineering and
            everything in between.
          </motion.p>
        </motion.div>

        <BentoGrid className="mt-10" cols="grid-cols-2 lg:grid-cols-6">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} index={i + 1} span={spanFor(i)} featured={i % 6 === 0} {...service} />
          ))}
        </BentoGrid>

        <div className="mt-12 flex justify-center">
          <Button to="/services" variant="secondary" size="lg">
            Explore all services <FiArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Container>
    </Section>
  )
}
