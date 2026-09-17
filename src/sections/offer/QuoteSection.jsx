import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiCheck, FiSend, FiPhone, FiMail, FiShield } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa6'
import Band from '@/components/editorial/Band.jsx'
import Label from '@/components/editorial/Label.jsx'
import Display from '@/components/editorial/Display.jsx'
import { PACKAGES, CONTACT_CHANNELS, OFFER } from '@/data/offer.js'
import { fadeInUp } from '@/lib/motion.js'
import { cn } from '@/utils/cn.js'

// Underlined inputs rather than boxed ones: on an editorial page a stack of
// bordered boxes reads as a form bolted on, where rules match the rest.
const FIELD =
  'w-full border-0 border-b border-line-strong bg-transparent px-0 py-3 text-base text-ink outline-none transition-colors placeholder:text-mute/70 focus:border-orange-500'

const EMPTY_FORM = { name: '', email: '', phone: '', plan: '', message: '', website: '' }

/**
 * The page's conversion point. Posts to /api/lead - the same serverless
 * function the popup uses, so the Resend key stays server-side - and
 * carries the package the visitor was looking at.
 */
export default function QuoteSection() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

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
      setForm(EMPTY_FORM)
    } catch (err) {
      setStatus('idle')
      setError(err.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <Band id="quote" tone="ink">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-20">
        <div>
          <Label index="06" tone="onDark">
            Free quote
          </Label>
          <Display className="mt-6 max-w-[12ch]" tone="onDark" accent="about your business.">
            Tell us
          </Display>
          <p className="mt-6 text-white/55">
            Fill this in and we will come back within one business day with a fixed price and a
            realistic timeline. No obligation, and no sales pressure afterwards.
          </p>

          <div className="mt-8 flex flex-col gap-4 border-t border-white/12 pt-8">
            <a
              href={CONTACT_CHANNELS.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 text-sm font-semibold text-white transition-colors hover:text-orange-300"
            >
              <FaWhatsapp className="h-5 w-5 text-[#25D366]" /> Message on WhatsApp
            </a>
            <a
              href={`tel:${CONTACT_CHANNELS.phone}`}
              className="inline-flex items-center gap-3 text-sm font-semibold text-white transition-colors hover:text-orange-300"
            >
              <FiPhone className="h-5 w-5 text-orange-400" /> {CONTACT_CHANNELS.phoneLabel}
            </a>
            <a
              href={`mailto:${CONTACT_CHANNELS.email}`}
              className="inline-flex items-center gap-3 text-sm font-semibold text-white transition-colors hover:text-orange-300"
            >
              <FiMail className="h-5 w-5 text-orange-400" /> {CONTACT_CHANNELS.email}
            </a>
          </div>
        </div>

        <motion.div variants={fadeInUp}>
          {status === 'done' ? (
            <div className="flex flex-col items-start gap-4 border-t border-white/12 py-16">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-2xl text-white">
                <FiCheck />
              </span>
              <h3 className="t-editorial-sm text-white">Got it — thank you</h3>
              <p className="max-w-md text-white/55">
                We have your details and will be in touch within one business day. If it is urgent,
                WhatsApp or call and we will pick it up straight away.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-8">
              {/* Honeypot - hidden from real visitors, bots fill every field */}
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

              <div className="grid gap-8 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="t-label text-white/45">Your name</span>
                  <input
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Ravi Kumar"
                    value={form.name}
                    onChange={update('name')}
                    className={cn(FIELD, 'border-white/20 text-white placeholder:text-white/30')}
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="t-label text-white/45">Phone / WhatsApp</span>
                  <input
                    type="tel"
                    autoComplete="tel"
                    placeholder="+91 90000 00000"
                    value={form.phone}
                    onChange={update('phone')}
                    className={cn(FIELD, 'border-white/20 text-white placeholder:text-white/30')}
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="t-label text-white/45">Email</span>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@business.com"
                    value={form.email}
                    onChange={update('email')}
                    className={cn(FIELD, 'border-white/20 text-white placeholder:text-white/30')}
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="t-label text-white/45">What are you after?</span>
                  <select
                    value={form.plan}
                    onChange={update('plan')}
                    className={cn(FIELD, 'border-white/20 text-white [&>option]:text-ink')}
                  >
                    <option value="">Not sure yet — advise me</option>
                    {PACKAGES.map((plan) => (
                      <option key={plan.name} value={plan.name}>
                        {plan.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="flex flex-col gap-2">
                <span className="t-label text-white/45">
                  Tell us about the business <span className="normal-case tracking-normal">(optional)</span>
                </span>
                <textarea
                  rows={3}
                  placeholder="What you do, who your customers are, and anything the site needs to handle."
                  value={form.message}
                  onChange={update('message')}
                  className={cn(FIELD, 'resize-y border-white/20 text-white placeholder:text-white/30')}
                />
              </label>

              {error && <p className="text-sm text-red-300">{error}</p>}

              <div className="flex flex-wrap items-center gap-6">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-orange-500 px-7 text-[0.95rem] font-semibold text-white transition-colors hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 disabled:opacity-60"
                >
                  {status === 'sending' ? (
                    'Sending…'
                  ) : (
                    <>
                      {OFFER.primaryCta} <FiSend className="h-4 w-4" />
                    </>
                  )}
                </button>
                <p className="inline-flex items-center gap-2 text-sm text-white/45">
                  <FiShield className="h-4 w-4 text-orange-400" />
                  Your details stay with us. We never sell or share them.
                </p>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </Band>
  )
}
