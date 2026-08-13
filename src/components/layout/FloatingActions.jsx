import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowUp, FiMessageCircle } from 'react-icons/fi'

/**
 * Restrained floating actions, bottom-right:
 *  - a persistent "Let's talk" contact button (conversion affordance)
 *  - a back-to-top button that appears once the user scrolls down
 * Both stay out of the way and respect reduced-motion.
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
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
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

      <Link
        to="/contact"
        className="group inline-flex items-center gap-2 rounded-full bg-orange-500 py-3 pl-3.5 pr-4 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-orange-600 hover:shadow-xl"
      >
        <FiMessageCircle className="h-5 w-5" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-[7rem] group-hover:opacity-100">
          Let’s talk
        </span>
      </Link>
    </div>
  )
}
