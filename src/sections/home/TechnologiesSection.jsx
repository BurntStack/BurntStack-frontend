import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Section from '@/components/ui/Section.jsx'
import Container from '@/components/ui/Container.jsx'
import SectionHeading from '@/components/ui/SectionHeading.jsx'
import { TECH_CATEGORIES } from '@/data/technologies.js'
import { cn } from '@/utils/cn.js'
import { fadeInUp, staggerContainer } from '@/lib/motion.js'

export default function TechnologiesSection() {
  const [active, setActive] = useState(TECH_CATEGORIES[0].category)
  const current = TECH_CATEGORIES.find((c) => c.category === active)

  return (
    <Section id="technologies">
      <Container>
        <SectionHeading
          eyebrow="Our Stack"
          title="Technologies we master"
          description="A modern, battle-tested toolkit — chosen for performance, reliability and long-term maintainability."
        />

        {/* Category tabs */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {TECH_CATEGORIES.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setActive(cat.category)}
              className={cn(
                'rounded-full px-5 py-2 text-sm font-semibold transition-all',
                active === cat.category
                  ? 'bg-ember-500 text-white shadow-[0_8px_24px_-8px_rgba(255,90,31,0.6)]'
                  : 'border border-border-strong bg-surface text-muted hover:text-foreground',
              )}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Tech cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            variants={staggerContainer(0.05)}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: 10 }}
            className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
          >
            {current.items.map(({ name, icon: Icon, color }) => (
              <motion.div
                key={name}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-border-base bg-surface p-6 transition-colors hover:border-ember-400/40"
              >
                <span
                  className="text-4xl transition-transform duration-300 group-hover:scale-110"
                  style={{ color }}
                >
                  <Icon />
                </span>
                <span className="text-sm font-medium text-foreground">{name}</span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </Container>
    </Section>
  )
}
