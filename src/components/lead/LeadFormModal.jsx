import { useCallback, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { FiX, FiPhone } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa6'
import LeadForm from './LeadForm.jsx'
import { CONTACT_CHANNELS } from '@/data/offer.js'
import { LeadFormContext } from './useQuoteForm.js'

/**
 * Opens the lead form over whatever the visitor is already looking at.
 *
 * Every "get a quote" button used to be a link to `/#quote`, which did two
 * things nobody asked for: it threw the reader down to the bottom of the
 * page away from whatever they were reading, and it put `#quote` in the
 * address bar. A dialog keeps them exactly where they are and leaves the
 * URL alone.
 */
export function LeadFormProvider({ children }) {
  const [open, setOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  const openQuoteForm = useCallback(() => setOpen(true), [])
  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    // Stop the page scrolling behind the dialog.
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [open, close])

  // Focus the first field once the dialog has rendered.
  useEffect(() => {
    if (!open) return undefined
    const id = requestAnimationFrame(() => {
      document.querySelector('[data-lead-modal] [data-lead-first-field]')?.focus()
    })
    return () => cancelAnimationFrame(id)
  }, [open])

  const value = useMemo(() => ({ openQuoteForm }), [openQuoteForm])

  return (
    <LeadFormContext.Provider value={value}>
      {children}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
                onClick={close}
              >
                <motion.div
                  data-lead-modal
                  role="dialog"
                  aria-modal="true"
                  aria-label="Get a quote"
                  onClick={(e) => e.stopPropagation()}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="relative max-h-[92dvh] w-full overflow-y-auto rounded-t-bento bg-canvas p-6 shadow-[var(--shadow-lg)] sm:max-w-lg sm:rounded-bento sm:p-8"
                >
                  <button
                    type="button"
                    onClick={close}
                    aria-label="Close"
                    className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-mute transition-colors hover:bg-sand hover:text-ink"
                  >
                    <FiX className="h-4 w-4" />
                  </button>

                  <p className="t-label text-orange-600">Free quote</p>
                  <h2 className="t-editorial-sm mt-3 text-ink">Tell us what you need</h2>
                  <p className="mt-3 text-sm text-slate">
                    Leave your details and we will come back within one business day with a fixed
                    price and a realistic timeline.
                  </p>

                  <div className="mt-6">
                    <LeadForm compact />
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-5">
                    <a
                      href={CONTACT_CHANNELS.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-orange-600"
                    >
                      <FaWhatsapp className="h-4 w-4 text-[#25D366]" /> WhatsApp instead
                    </a>
                    <a
                      href={`tel:${CONTACT_CHANNELS.phone}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-orange-600"
                    >
                      <FiPhone className="h-4 w-4 text-orange-500" /> {CONTACT_CHANNELS.phoneLabel}
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </LeadFormContext.Provider>
  )
}
