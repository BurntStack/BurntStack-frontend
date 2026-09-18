import { useCallback, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { FiX, FiPhone, FiArrowUpRight, FiCheck } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa6'
import LeadForm from './LeadForm.jsx'
import { CONTACT_CHANNELS } from '@/data/offer.js'
import { LeadFormContext } from './useQuoteForm.js'
import { lockPageScroll } from '@/lib/scroll.js'

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
  const [initialPlan, setInitialPlan] = useState('')
  const reduceMotion = useReducedMotion()

  const openQuoteForm = useCallback((plan) => {
    setInitialPlan(typeof plan === 'string' ? plan : '')
    setOpen(true)
  }, [])
  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return undefined
    const previousFocus = document.activeElement
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key !== 'Tab') return
      const fields = [...document.querySelectorAll('[data-lead-modal] button:not(:disabled), [data-lead-modal] input:not([tabindex="-1"]), [data-lead-modal] select, [data-lead-modal] textarea, [data-lead-modal] a[href]')]
        .filter((element) => element.getClientRects().length)
      const first = fields[0]
      const last = fields.at(-1)
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus() }
      if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus() }
    }
    window.addEventListener('keydown', onKey)
    const unlock = lockPageScroll()
    const app = document.getElementById('root')
    const wasInert = app?.inert
    if (app) app.inert = true
    return () => {
      window.removeEventListener('keydown', onKey)
      unlock()
      if (app) app.inert = wasInert
      previousFocus?.focus({ preventScroll: true })
    }
  }, [open, close])

  // Focus the first field once the dialog has rendered.
  useEffect(() => {
    if (!open) return undefined
    const id = requestAnimationFrame(() => {
      document.querySelector('[data-lead-modal] [data-lead-first-field]')?.focus({ preventScroll: true })
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
                className="project-dialog-backdrop"
                data-lenis-prevent
                onClick={close}
              >
                <motion.div
                  data-lead-modal
                  role="dialog"
                  aria-modal="true"
                  aria-label="Get a quote"
                  aria-describedby="project-dialog-description"
                  onClick={(e) => e.stopPropagation()}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="project-dialog"
                >
                  <div className="project-dialog-bar"><span><span aria-hidden="true">✳</span> A new beginning</span>
                  <button
                    type="button"
                    onClick={close}
                    aria-label="Close"
                    className="project-dialog-close"
                  >
                    <FiX className="h-4 w-4" />
                  </button>
                  </div>
                  <div className="project-dialog-layout">
                  <aside className="project-dialog-intro">
                    <span className="detail-eyebrow">Your next chapter</span>
                    <h2>Big ideas.<br /><em>Practical<br /> next steps.</em></h2>
                    <p id="project-dialog-description">Tell us what you have in mind. We’ll review your requirements and reply within one business day.</p>
                    <div className="project-dialog-art" aria-hidden="true"><span>Your idea <FiArrowUpRight /></span><span>Our expertise <FiArrowUpRight /></span><span>A working product <FiCheck /></span></div>
                    <p className="project-dialog-note">A conversation first.<br />A clear scope before we build.</p>
                  </aside>
                  <div className="project-dialog-form">
                  <div className="project-dialog-form-heading"><span className="detail-eyebrow">The project brief</span><h3>What can we build for you?</h3><p>A few details are all we need to get started.</p></div>
                    <LeadForm initialPlan={initialPlan} />

                  <div className="project-dialog-contact">
                    <a href={CONTACT_CHANNELS.whatsapp} target="_blank" rel="noreferrer"><FaWhatsapp /> WhatsApp instead</a>
                    <a href={`tel:${CONTACT_CHANNELS.phone}`}><FiPhone /> {CONTACT_CHANNELS.phoneLabel}</a>
                  </div>
                  </div>
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
