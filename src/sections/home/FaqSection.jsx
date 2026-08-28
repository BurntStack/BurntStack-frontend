import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus } from 'react-icons/fi'
import Section from '@/components/ui/Section.jsx'
import Container from '@/components/ui/Container.jsx'
import SectionHeading from '@/components/ui/SectionHeading.jsx'
import { BentoGrid, BentoCard } from '@/components/ui/Bento.jsx'
import { FAQS } from '@/data/misc.js'
import { cn } from '@/utils/cn.js'

export default function FaqSection() {
  const [open, setOpen] = useState(0)

  return (
    <Section id="faq">
      <Container>
        <SectionHeading eyebrow="FAQ" title="Questions, answered" />

        <BentoGrid className="mt-12" align="start" cols="grid-cols-2 lg:grid-cols-6">
          {FAQS.map((faq, i) => {
            const isOpen = open === i
            return (
              <BentoCard
                key={faq.q}
                span="col-span-2 lg:col-span-3"
                tone="surface"
                size="none"
                hover={false}
                className={cn(isOpen && 'border-orange-300')}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-semibold text-ink">{faq.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors',
                      isOpen ? 'bg-orange-500 text-white' : 'bg-sand text-orange-600',
                    )}
                  >
                    <FiPlus className="h-4 w-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-slate">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </BentoCard>
            )
          })}
        </BentoGrid>
      </Container>
    </Section>
  )
}
