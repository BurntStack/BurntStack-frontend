import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowUp } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa6'
import { CONTACT_CHANNELS } from '@/data/offer.js'

/**
 * Restrained floating actions, stacked directly above the chat launcher
 * (see ChatWidget, which owns the bottom-right corner itself):
 *  - a persistent WhatsApp button (the channel local customers actually
 *    use, and the one that gets the fastest reply from us)
 *  - a back-to-top button that appears once the user scrolls down
 *
 * Deliberately just the one action: a second "Get a quote" FAB stacked
 * here put three overlapping circles over the hero copy at 390px. That CTA
 * lives in the navbar instead, where it's visible at every width.
 */
export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed bottom-24 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-28 sm:right-7">
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            initial={{ opacity: 0, scale: 0.8, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 8 }}
            transition={{ duration: 0.2 }}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-white text-ink shadow-md transition-colors hover:bg-ivory"
          >
            <FiArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <a
        href={CONTACT_CHANNELS.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Message us on WhatsApp"
        className="group inline-flex items-center gap-2 rounded-full bg-[#25D366] py-3 pl-3.5 pr-4 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl"
      >
        <FaWhatsapp className="h-5 w-5" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-[7rem] group-hover:opacity-100">
          WhatsApp
        </span>
      </a>

    </div>
  )
}
