import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Section from '@/components/ui/Section.jsx'
import Container from '@/components/ui/Container.jsx'
import SectionHeading from '@/components/ui/SectionHeading.jsx'
import { BentoGrid, BentoCard } from '@/components/ui/Bento.jsx'
import { TECH_CATEGORIES } from '@/data/technologies.js'
import { cn } from '@/utils/cn.js'

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
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'border border-line-strong bg-white text-slate hover:text-ink',
              )}
            >
              {cat.category}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <BentoGrid
            key={active}
            className="mt-10"
            cols="grid-cols-2 sm:grid-cols-4 lg:grid-cols-6"
          >
            {current.items.map(({ name, icon: Icon, color }) => (
              <BentoCard key={name} span="col-span-1" size="sm" tone="surface" hover className="items-center gap-3 text-center">
                <span
                  className="text-4xl transition-transform duration-300 group-hover:scale-110"
                  style={{ color }}
                >
                  <Icon />
                </span>
                <span className="text-sm font-medium text-ink">{name}</span>
              </BentoCard>
            ))}
          </BentoGrid>
        </AnimatePresence>
      </Container>
    </Section>
  )
}
