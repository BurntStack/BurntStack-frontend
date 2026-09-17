import { motion } from 'framer-motion'
import { FiPhone } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa6'
import Container from '@/components/ui/Container.jsx'
import LeadForm from '@/components/lead/LeadForm.jsx'
import { OFFER, CONTACT_CHANNELS, PROOF_POINTS } from '@/data/offer.js'
import { fadeInUp, staggerContainer } from '@/lib/motion.js'

/**
 * Hero with the lead form in it, rather than a button that sends the
 * visitor somewhere else to find one.
 *
 * The previous hero's primary CTA was a link to `/#quote`, which threw the
 * reader to the bottom of the page and put a fragment in the address bar.
 * The form is the first thing on the page now: nothing to click before you
 * can start typing, and nothing moves when you do.
 *
 * Animated with initial="show" rather than a scroll reveal - this is above
 * the fold on every visit, so gating it behind an IntersectionObserver
 * directly delays LCP.
 */
export default function OfferHero() {
  return (
    <section className="relative w-full overflow-hidden bg-canvas pt-28 pb-0 sm:pt-36 lg:pt-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-1/4 -top-1/3 h-[38rem] w-[38rem] rounded-full opacity-[0.55] blur-3xl"
        style={{
          background:
            'radial-gradient(circle, color-mix(in oklab, var(--color-orange-300) 55%, transparent) 0%, transparent 68%)',
        }}
      />

      <Container className="relative">
        <motion.div
          variants={staggerContainer(0.08)}
          initial="show"
          animate="show"
          className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16"
        >
          <div>
            {OFFER.badge && (
              <motion.div variants={fadeInUp} className="t-label mb-7 flex items-center gap-3 text-orange-600">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
                </span>
                {OFFER.badge}
              </motion.div>
            )}

            <motion.h1 variants={fadeInUp} className="t-editorial max-w-[15ch] text-ink">
              Turn visitors
              <br />
              into paying customers.
              <br />
              <span className="t-accent text-orange-600">Websites that sell.</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="mt-8 max-w-xl text-lg leading-relaxed text-slate">
              {OFFER.subline}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6"
            >
              <a
                href={CONTACT_CHANNELS.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-orange-600"
              >
                <FaWhatsapp className="h-4 w-4 text-[#25D366]" /> WhatsApp us
              </a>
              <a
                href={`tel:${CONTACT_CHANNELS.phone}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-orange-600"
              >
                <FiPhone className="h-4 w-4 text-orange-500" /> {CONTACT_CHANNELS.phoneLabel}
              </a>
              <span className="text-sm text-mute">{OFFER.reassurance}</span>
            </motion.div>
          </div>

          {/* The form itself, in the first screen. */}
          <motion.div
            variants={fadeInUp}
            id="lead-form"
            className="rounded-bento border border-line bg-white p-6 shadow-[var(--shadow-md)] sm:p-7"
          >
            <p className="t-label text-orange-600">Free quote</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-[-0.02em] text-ink">
              Tell us what you need
            </h2>
            <p className="mt-2 text-sm text-slate">
              We reply within one business day with a fixed price and a realistic timeline.
            </p>
            <div className="mt-6">
              <LeadForm compact />
            </div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Proof strip: promises we control, never invented statistics. */}
      <div className="mt-16 border-y border-line bg-ivory sm:mt-20">
        <Container>
          <dl className="grid grid-cols-2 divide-line lg:grid-cols-4 lg:divide-x">
            {PROOF_POINTS.map(({ value, label }, i) => (
              <div
                key={label}
                className={`flex flex-col gap-1 py-7 lg:px-8 lg:first:pl-0 ${
                  i % 2 === 0 ? 'pr-5' : 'border-l border-line pl-5 lg:border-l-0 lg:pl-8'
                } ${i < 2 ? 'border-b border-line lg:border-b-0' : ''}`}
              >
                <dt className="font-display text-2xl font-extrabold tracking-[-0.02em] text-orange-600 sm:text-3xl">
                  {value}
                </dt>
                <dd className="text-sm leading-snug text-slate">{label}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>
    </section>
  )
}
