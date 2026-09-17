import { motion } from 'framer-motion'
import Section from '@/components/ui/Section.jsx'
import Container from '@/components/ui/Container.jsx'
import Badge from '@/components/ui/Badge.jsx'
import { BentoGrid, BentoCard, BentoIcon } from '@/components/ui/Bento.jsx'
import { OFFER_SERVICES } from '@/data/offer.js'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion.js'

/**
 * Six offers, not the twelve-service catalogue the old /services page
 * carried. A landing page that lists everything sells nothing - these are
 * the things someone can actually buy from the pricing section below.
 *
 * The first tile runs double-width so hierarchy comes from size rather
 * than from a uniform grid of identical cards.
 */
export default function OfferServices() {
  return (
    <Section id="services">
      <Container>
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid gap-6 border-b border-line pb-10 md:grid-cols-[1fr_auto] md:items-end"
        >
          <div className="max-w-2xl">
            <motion.div variants={fadeInUp}>
              <Badge>What you get</Badge>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="t-h2 mt-5 font-bold text-ink">
              Everything handled, from the first sketch to the day it goes live
            </motion.h2>
          </div>
          <motion.p variants={fadeInUp} className="max-w-sm text-slate md:pb-2">
            You describe the business. We handle design, copy, build, hosting, the domain and
            everything after.
          </motion.p>
        </motion.div>

        <BentoGrid className="mt-10" cols="grid-cols-2 lg:grid-cols-6">
          {OFFER_SERVICES.map(({ icon: Icon, title, description }, i) => (
            <BentoCard
              key={title}
              span={i === 0 ? 'col-span-2 lg:col-span-4' : 'col-span-2 lg:col-span-2'}
              tone={i === 0 ? 'ink' : 'surface'}
              size={i === 0 ? 'md' : 'sm'}
            >
              <BentoIcon icon={Icon} tone={i === 0 ? 'onDark' : 'default'} />
              <h3
                className={`mt-5 font-display font-semibold ${
                  i === 0 ? 'text-xl text-white' : 'text-base text-ink'
                }`}
              >
                {title}
              </h3>
              <p
                className={`mt-2 flex-1 text-sm leading-relaxed ${
                  i === 0 ? 'text-white/70' : 'text-slate'
                }`}
              >
                {description}
              </p>
            </BentoCard>
          ))}
        </BentoGrid>
      </Container>
    </Section>
  )
}
