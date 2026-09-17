import { useState } from 'react'
import { FiCheck, FiSend, FiShield } from 'react-icons/fi'
import { PACKAGES } from '@/data/offer.js'
import { cn } from '@/utils/cn.js'

const EMPTY = { name: '', phone: '', email: '', plan: '', message: '', website: '' }

/**
 * The single lead-capture form, used inline in the hero and inside the
 * modal that every other CTA opens.
 *
 * It lives in one component on purpose: there were previously two separate
 * implementations of the same four fields (this and the popup), which is
 * how the two drifted apart on validation and error handling.
 */
export default function LeadForm({ tone = 'light', compact = false, onSuccess }) {
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const onDark = tone === 'dark'
  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const field = cn(
    'w-full rounded-lg border px-3.5 py-2.5 text-[0.95rem] transition-colors',
    onDark
      ? 'border-white/20 bg-white/5 text-white placeholder:text-white/35 focus:border-orange-400'
      : 'border-line-strong bg-canvas text-ink placeholder:text-mute/70 focus:border-orange-500',
  )
  const labelCls = cn('t-label', onDark ? 'text-white/45' : 'text-mute')

  const submit = async (e) => {
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
      setForm(EMPTY)
      onSuccess?.()
    } catch (err) {
      setStatus('idle')
      setError(err.message || 'Something went wrong. Please try again.')
    }
  }

  if (status === 'done') {
    return (
      <div className={cn('flex flex-col items-start gap-3 py-8', onDark ? 'text-white' : 'text-ink')}>
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-xl text-white">
          <FiCheck />
        </span>
        <h3 className="font-display text-xl font-bold">Got it, thank you</h3>
        <p className={cn('max-w-sm', onDark ? 'text-white/60' : 'text-slate')}>
          We have your details and will be in touch within one business day. If it is urgent,
          WhatsApp or call and we will pick it up straight away.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      {/* Honeypot. Real visitors never fill this; bots fill every field. */}
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

      <div className={cn('grid gap-4', !compact && 'sm:grid-cols-2')}>
        <label className="flex flex-col gap-1.5">
          <span className={labelCls}>Your name</span>
          <input
            type="text"
            required
            autoComplete="name"
            placeholder="Ravi Kumar"
            value={form.name}
            onChange={update('name')}
            className={field}
            data-lead-first-field
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelCls}>Mobile / WhatsApp</span>
          <input
            type="tel"
            required
            autoComplete="tel"
            placeholder="+91 90000 00000"
            value={form.phone}
            onChange={update('phone')}
            className={field}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelCls}>Email</span>
          <input
            type="email"
            required
            autoComplete="email"
            placeholder="you@business.com"
            value={form.email}
            onChange={update('email')}
            className={field}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelCls}>What do you need?</span>
          <select
            value={form.plan}
            onChange={update('plan')}
            className={cn(field, onDark && '[&>option]:text-ink')}
          >
            <option value="">Not sure yet, advise me</option>
            {PACKAGES.map((plan) => (
              <option key={plan.name} value={plan.name}>
                {plan.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {!compact && (
        <label className="flex flex-col gap-1.5">
          <span className={labelCls}>
            Anything else <span className="normal-case tracking-normal">(optional)</span>
          </span>
          <textarea
            rows={2}
            placeholder="What your business does, and anything the site needs to handle."
            value={form.message}
            onChange={update('message')}
            className={cn(field, 'resize-y')}
          />
        </label>
      )}

      {error && <p className={cn('text-sm', onDark ? 'text-red-300' : 'text-red-600')}>{error}</p>}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-orange-600 px-6 text-[0.95rem] font-semibold text-white transition-colors hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : (<>Get my quote <FiSend className="h-4 w-4" /></>)}
      </button>

      <p className={cn('inline-flex items-center gap-2 text-xs', onDark ? 'text-white/40' : 'text-mute')}>
        <FiShield className="h-3.5 w-3.5 text-orange-500" />
        Your details stay with us. We never sell or share them.
      </p>
    </form>
  )
}
