import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { FiX, FiCheck, FiSend } from 'react-icons/fi'
import { cn } from '@/utils/cn.js'

const STORAGE_KEY = 'bs-lead-popup-dismissed'
const SHOW_AFTER_MS = 5000

/**
 * Small, restrained lead-capture popup. Shows once per browser (localStorage
 * gated, not per-page-view) a few seconds after landing, asks for name +
 * email, and posts to /api/lead (a Vercel serverless function - the only
 * place the Resend API key lives, never in client code).
 */
export default function LeadPopup() {
  const [visible, setVisible] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', website: '' })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return
    const timer = setTimeout(() => setVisible(true), SHOW_AFTER_MS)
    return () => clearTimeout(timer)
  }, [])

  const dismiss = () => {
    setVisible(false)
    localStorage.setItem(STORAGE_KEY, '1')
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
      localStorage.setItem(STORAGE_KEY, '1')
      setTimeout(() => setVisible(false), 2200)
    } catch (err) {
      setStatus('idle')
      setError(err.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Get in touch"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-5 left-5 z-40 w-[min(22rem,calc(100vw-2.5rem))] rounded-bento border border-line bg-white p-5 shadow-[var(--shadow-lg)] sm:bottom-7 sm:left-7"
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
            <form onSubmit={onSubmit} className="flex flex-col gap-3">
              <div>
                <h3 className="font-display text-lg font-bold text-ink">Have a project in mind?</h3>
                <p className="mt-1 text-sm text-slate">Leave your details and we’ll reach out within a day.</p>
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
                className="rounded-lg border border-line-strong bg-canvas px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-orange-400"
              />
              <input
                type="email"
                placeholder="Your email"
                value={form.email}
                onChange={update('email')}
                required
                className="rounded-lg border border-line-strong bg-canvas px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-orange-400"
              />
              <input
                type="tel"
                placeholder="Phone number (optional)"
                value={form.phone}
                onChange={update('phone')}
                className="rounded-lg border border-line-strong bg-canvas px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-orange-400"
              />
              <textarea
                placeholder="What are you looking to build? (optional)"
                value={form.message}
                onChange={update('message')}
                rows={2}
                className="rounded-lg border border-line-strong bg-canvas px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-orange-400"
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
