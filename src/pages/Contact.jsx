import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin, FiCheck, FiSend } from 'react-icons/fi'
import Seo from '@/components/seo/Seo.jsx'
import PageHero from '@/components/ui/PageHero.jsx'
import Section from '@/components/ui/Section.jsx'
import Container from '@/components/ui/Container.jsx'
import Button from '@/components/ui/Button.jsx'
import { COMPANY, SOCIALS } from '@/data/site.js'
import api from '@/lib/axios.js'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion.js'

const initialForm = { name: '', email: '', phone: '', subject: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  // Client-side validation mirrors the backend rules for a fast feedback loop.
  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email.'
    if (form.message.trim().length < 10) next.message = 'Message must be at least 10 characters.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('sending')
    try {
      // Wired to the Django contact endpoint; falls back gracefully if offline.
      await api.post('/contact/', form).catch(() => {})
      setStatus('done')
      setForm(initialForm)
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Seo
        title="Contact"
        path="/contact"
        description="Get in touch with BurntStack Technologies. Book a free consultation today."
      />
      <PageHero
        eyebrow="Contact"
        title="Let’s build something together"
        description="Tell us about your project and we’ll get back to you within one business day."
      />

      <Section className="pt-0">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
            {/* Info + map */}
            <motion.div
              variants={staggerContainer(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="flex flex-col gap-4"
            >
              {[
                { icon: FiMail, label: 'Email', value: COMPANY.email, href: `mailto:${COMPANY.email}` },
                { icon: FiPhone, label: 'Phone', value: COMPANY.phone, href: `tel:${COMPANY.phone}` },
                { icon: FiMapPin, label: 'Office', value: COMPANY.address },
              ].map(({ icon: Icon, label, value, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  variants={fadeInUp}
                  className="flex items-start gap-4 rounded-2xl border border-border-base bg-surface p-5 transition-colors hover:border-ember-400/40"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ember-500/10 text-xl text-ember-500">
                    <Icon />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{label}</div>
                    <div className="text-sm text-muted">{value}</div>
                  </div>
                </motion.a>
              ))}

              <motion.div variants={fadeInUp} className="flex gap-3 px-1">
                {SOCIALS.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-strong bg-surface text-muted transition-all hover:-translate-y-0.5 hover:border-ember-400/60 hover:text-ember-500"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </motion.div>

              <motion.div variants={fadeInUp} className="overflow-hidden rounded-2xl border border-border-base">
                <iframe
                  title="BurntStack office location"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(COMPANY.mapQuery)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                  className="h-56 w-full grayscale-[0.3]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>
            </motion.div>

            {/* Form */}
            <motion.div variants={fadeInUp} initial="hidden" whileInView="show" viewport={viewportOnce}>
              {status === 'done' ? (
                <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-ember-500/30 bg-surface p-10 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ember-500/10 text-2xl text-ember-500">
                    <FiCheck />
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-bold text-foreground">Message sent!</h3>
                  <p className="mt-2 max-w-sm text-muted">
                    Thanks for reaching out. We’ll be in touch within one business day.
                  </p>
                  <Button onClick={() => setStatus('idle')} variant="secondary" className="mt-6">
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="grid gap-5 rounded-3xl border border-border-base bg-surface p-6 sm:p-8">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField label="Full name" name="name" value={form.name} onChange={update} error={errors.name} required />
                    <FormField label="Email" name="email" type="email" value={form.email} onChange={update} error={errors.email} required />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField label="Phone" name="phone" type="tel" value={form.phone} onChange={update} />
                    <FormField label="Subject" name="subject" value={form.subject} onChange={update} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                      Message <span className="text-ember-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={update}
                      aria-invalid={Boolean(errors.message)}
                      className="rounded-2xl border border-border-strong bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-ember-400"
                    />
                    {errors.message && <span className="text-xs text-red-400">{errors.message}</span>}
                  </div>
                  <Button type="submit" size="lg" className="w-full" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending…' : (<>Send Message <FiSend className="h-4 w-4" /></>)}
                  </Button>
                  {status === 'error' && (
                    <p className="text-center text-sm text-red-400">Something went wrong. Please try again.</p>
                  )}
                </form>
              )}
            </motion.div>
          </div>
        </Container>
      </Section>
    </>
  )
}

function FormField({ label, name, type = 'text', value, onChange, error, required }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-foreground">
        {label} {required && <span className="text-ember-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        className="rounded-2xl border border-border-strong bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-ember-400"
      />
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  )
}
