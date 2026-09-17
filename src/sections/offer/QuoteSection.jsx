import { useState } from 'react'
import { FiCheck, FiSend, FiPhone, FiMail, FiShield } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa6'
import Section from '@/components/ui/Section.jsx'
import Container from '@/components/ui/Container.jsx'
import { BentoGrid, BentoCard } from '@/components/ui/Bento.jsx'
import { PACKAGES, CONTACT_CHANNELS, OFFER } from '@/data/offer.js'
import { cn } from '@/utils/cn.js'

const FIELD_CLASS =
  'w-full rounded-lg border border-line-strong bg-canvas px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-mute focus:border-orange-400'

const EMPTY_FORM = { name: '', email: '', phone: '', plan: '', message: '', website: '' }

/**
 * The page's actual conversion point. Posts to /api/lead - the same Vercel
 * serverless function the popup uses, so the Resend key stays server-side -
 * and carries the package the visitor was looking at, which the old
 * "Request a Quote" links to /contact threw away entirely.
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
    <Section id="quote" className="bg-ivory">
      <Container>
        <BentoGrid cols="grid-cols-2 lg:grid-cols-6" align="start">
          {/* Pitch + the non-form ways to reach us */}
          <BentoCard
            span="col-span-2 lg:col-span-2"
            tone="ink"
            hover={false}
            className="justify-start gap-5"
          >
            <span className="w-fit rounded-full bg-orange-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-orange-300">
              Free quote
            </span>
            <h2 className="t-h2 font-bold text-white">Tell us about your business</h2>
            <p className="text-white/70">
              Fill this in and we will come back within one business day with a fixed price and a
              realistic timeline. No obligation, and no sales pressure afterwards.
            </p>

            <div className="mt-2 flex flex-col gap-3">
              <a
                href={CONTACT_CHANNELS.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-bento-sm bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
              >
                <FaWhatsapp className="h-5 w-5" /> Message on WhatsApp
              </a>
              <a
                href={`tel:${CONTACT_CHANNELS.phone}`}
                className="flex items-center gap-3 rounded-bento-sm border border-white/15 px-4 py-3 text-sm font-semibold text-white transition-colors hover:border-orange-400/60 hover:bg-white/5"
              >
                <FiPhone className="h-4 w-4 text-orange-400" /> {CONTACT_CHANNELS.phoneLabel}
              </a>
              <a
                href={`mailto:${CONTACT_CHANNELS.email}`}
                className="flex items-center gap-3 rounded-bento-sm border border-white/15 px-4 py-3 text-sm font-semibold text-white transition-colors hover:border-orange-400/60 hover:bg-white/5"
              >
                <FiMail className="h-4 w-4 text-orange-400" /> {CONTACT_CHANNELS.email}
              </a>
            </div>
          </BentoCard>

          {/* Form */}
          <BentoCard span="col-span-2 lg:col-span-4" tone="surface" hover={false}>
            {status === 'done' ? (
              <div className="flex flex-col items-center gap-3 py-16 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500/10 text-2xl text-orange-600">
                  <FiCheck />
                </span>
                <h3 className="font-display text-xl font-bold text-ink">Got it — thank you</h3>
                <p className="max-w-sm text-slate">
                  We have your details and will be in touch within one business day. If it is
                  urgent, WhatsApp or call us and we will pick it up straight away.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-4">
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

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-semibold text-ink">Your name</span>
                    <input
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Ravi Kumar"
                      value={form.name}
                      onChange={update('name')}
                      className={FIELD_CLASS}
                    />
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-semibold text-ink">Phone / WhatsApp</span>
                    <input
                      type="tel"
                      autoComplete="tel"
                      placeholder="+91 90000 00000"
                      value={form.phone}
                      onChange={update('phone')}
                      className={FIELD_CLASS}
                    />
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-semibold text-ink">Email</span>
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@business.com"
                      value={form.email}
                      onChange={update('email')}
                      className={FIELD_CLASS}
                    />
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-semibold text-ink">What are you after?</span>
                    <select value={form.plan} onChange={update('plan')} className={FIELD_CLASS}>
                      <option value="">Not sure yet — advise me</option>
                      {PACKAGES.map((plan) => (
                        <option key={plan.name} value={plan.name}>
                          {plan.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-semibold text-ink">
                    Tell us about the business <span className="font-normal text-mute">(optional)</span>
                  </span>
                  <textarea
                    rows={4}
                    placeholder="What you do, who your customers are, and anything the site needs to handle."
                    value={form.message}
                    onChange={update('message')}
                    className={cn(FIELD_CLASS, 'resize-y')}
                  />
                </label>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-orange-500 px-6 text-[0.95rem] font-semibold text-white transition-colors hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:opacity-60"
                  >
                    {status === 'sending' ? (
                      'Sending…'
                    ) : (
                      <>
                        {OFFER.primaryCta} <FiSend className="h-4 w-4" />
                      </>
                    )}
                  </button>
                  <p className="inline-flex items-center gap-2 text-sm text-mute">
                    <FiShield className="h-4 w-4 text-orange-500" />
                    Your details stay with us. We never sell or share them.
                  </p>
                </div>
              </form>
            )}
          </BentoCard>
        </BentoGrid>
      </Container>
    </Section>
  )
}
