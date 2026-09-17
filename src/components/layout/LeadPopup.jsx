import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { FiX, FiCheck, FiSend } from 'react-icons/fi'
import { cn } from '@/utils/cn.js'
import { CHAT_STATE_EVENT } from '@/components/chat/ChatWidget.jsx'

const STORAGE_KEY = 'bs-lead-popup-dismissed'
// Show only once the visitor is past the hero. The previous 5-second timer
// fired while they were still reading the headline, and on the offer
// landing page it covered the hero outright - at 390px wide it hid the
// entire first screen, headline, CTAs and all.
const SHOW_AFTER_SCROLL_PX = 900

/**
 * Small, restrained lead-capture popup. Shows once per browser (localStorage
 * gated, not per-page-view), asks for name + email, and posts to /api/lead
 * (a Vercel serverless function - the only place the Resend API key lives,
 * never in client code).
 *
 * It stays hidden while the page's own quote form (#quote) is on screen,
 * and while the chat panel is open: asking for the same details twice, in
 * two places at once, reads as a malfunction rather than as persistence.
 *
 * Positioning is load-bearing, not cosmetic. It used to span the full
 * width at `bottom-4` on `z-40`, which put it directly over the chat
 * launcher in the bottom-right corner - on a phone it swallowed the click
 * and the chat could not be opened at all while the popup was up. Hence
 * `right-24` (clear of the floating button column) and `z-30` (below it).
 */
export default function LeadPopup() {
  const [visible, setVisible] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', website: '' })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const reduceMotion = useReducedMotion()

  const [quoteFormOnScreen, setQuoteFormOnScreen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)

  useEffect(() => {
    let dismissed = false
    try {
      dismissed = Boolean(localStorage.getItem(STORAGE_KEY))
    } catch {
      // Private mode / blocked storage: fall through and just show it.
    }
    if (dismissed) return undefined

    const onScroll = () => {
      if (window.scrollY > SHOW_AFTER_SCROLL_PX) {
        setVisible(true)
        window.removeEventListener('scroll', onScroll)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onChatState = (e) => setChatOpen(Boolean(e.detail?.open))
    window.addEventListener(CHAT_STATE_EVENT, onChatState)
    return () => window.removeEventListener(CHAT_STATE_EVENT, onChatState)
  }, [])

  // The quote section only exists on the landing page; elsewhere this
  // observer simply never attaches and the popup behaves as before.
  useEffect(() => {
    const quote = document.getElementById('quote')
    if (!quote) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => setQuoteFormOnScreen(entry.isIntersecting),
      { threshold: 0.15 },
    )
    observer.observe(quote)
    return () => observer.disconnect()
  }, [])

  const remember = () => {
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // Nothing to do - worst case it reappears on the next visit.
    }
  }

  const dismiss = () => {
    setVisible(false)
    remember()
  }

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setStatus('sending')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      setStatus('done')
      remember()
      setTimeout(() => setVisible(false), 2200)
    } catch (err) {
      setStatus('idle')
      setError(err.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <AnimatePresence>
      {visible && !quoteFormOnScreen && !chatOpen && (
        <motion.div
          role="dialog"
          aria-label="Get in touch"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-24 z-30 max-h-[min(23rem,calc(100dvh-2rem))] w-auto overflow-y-auto rounded-bento border border-line bg-white p-4 shadow-[var(--shadow-lg)] sm:bottom-7 sm:left-7 sm:right-auto sm:w-[20rem] sm:p-4"
        >
          <button
            type="button"
            onClick={dismiss}
            aria-label="Close"
            className="absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-full text-mute transition-colors hover:bg-sand hover:text-ink"
          >
            <FiX className="h-4 w-4" />
          </button>

          {status === 'done' ? (
            <div className="flex flex-col items-center gap-2 py-4 text-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500/10 text-xl text-orange-600">
                <FiCheck />
              </span>
              <p className="font-semibold text-ink">Thanks! We’ll be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-2.5">
              <div>
                <h3 className="font-display text-base font-bold text-ink">Have a project in mind?</h3>
                <p className="mt-0.5 text-xs text-slate">Leave your details and we’ll reach out within a day.</p>
              </div>

              {/* Honeypot - hidden from real visitors, bots tend to fill every field */}
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={update('website')}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={update('name')}
                required
                className="rounded-lg border border-line-strong bg-canvas px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-orange-400"
              />
              <input
                type="email"
                placeholder="Your email"
                value={form.email}
                onChange={update('email')}
                required
                className="rounded-lg border border-line-strong bg-canvas px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-orange-400"
              />
              <input
                type="tel"
                placeholder="Phone number (optional)"
                value={form.phone}
                onChange={update('phone')}
                className="rounded-lg border border-line-strong bg-canvas px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-orange-400"
              />
              <textarea
                placeholder="What are you looking to build? (optional)"
                value={form.message}
                onChange={update('message')}
                rows={1}
                className="rounded-lg border border-line-strong bg-canvas px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-orange-400"
              />

              {error && <p className="text-xs text-red-500">{error}</p>}

              <button
                type="submit"
                disabled={status === 'sending'}
                className={cn(
                  'mt-1 inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors',
                  'hover:bg-orange-600 disabled:opacity-60',
                )}
              >
                {status === 'sending' ? 'Sending…' : (<>Send <FiSend className="h-3.5 w-3.5" /></>)}
              </button>
            </form>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
