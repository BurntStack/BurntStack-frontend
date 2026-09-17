import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus } from 'react-icons/fi'
import Band from '@/components/editorial/Band.jsx'
import Label from '@/components/editorial/Label.jsx'
import Display from '@/components/editorial/Display.jsx'
import { OFFER_FAQS } from '@/data/offer.js'
import { fadeInUp } from '@/lib/motion.js'
import { cn } from '@/utils/cn.js'

/**
 * The objections that actually stop a local business from buying, answered
 * immediately before the quote form.
 *
 * A single full-width ruled column rather than a two-up grid of bordered
 * cards: questions read faster in one vertical line, and the rules match
 * the rest of the page.
 */
export default function OfferFaq() {
  const [open, setOpen] = useState(0)

  return (
    <Band id="faq" tone="ivory">
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] md:items-end">
        <div>
          <Label index="05">Questions</Label>
          <Display className="mt-6 max-w-[16ch]" accent="before saying yes.">
            The things people ask
          </Display>
        </div>
      </div>

      <div className="mt-14 border-t border-line sm:mt-20">
        {OFFER_FAQS.map((faq, i) => {
          const isOpen = open === i
          return (
            <motion.div key={faq.q} variants={fadeInUp} className="border-b border-line">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="group flex w-full items-center justify-between gap-6 py-7 text-left"
              >
                <span
                  className={cn(
                    'font-display text-lg font-semibold tracking-[-0.015em] transition-colors duration-300 sm:text-xl',
                    isOpen ? 'text-orange-600' : 'text-ink group-hover:text-orange-600',
                  )}
                >
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300',
                    isOpen
                      ? 'border-orange-500 bg-orange-500 text-white'
                      : 'border-line-strong text-mute group-hover:border-orange-500 group-hover:text-orange-600',
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
                    <p className="max-w-2xl pb-8 text-slate">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </Band>
  )
}
