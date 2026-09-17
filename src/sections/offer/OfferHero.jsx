import { motion } from 'framer-motion'
import { FiArrowRight, FiPhone } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa6'
import Container from '@/components/ui/Container.jsx'
import Button from '@/components/ui/Button.jsx'
import { OFFER, CONTACT_CHANNELS, PROOF_POINTS } from '@/data/offer.js'
import { fadeInUp, staggerContainer } from '@/lib/motion.js'

/**
 * Editorial hero: one enormous headline, a serif italic counterweight, and
 * the contact routes as a quiet row beneath - no tiles.
 *
 * The animation is `initial="show"` rather than a scroll reveal, and that
 * is deliberate: this content is above the fold on every visit, so gating
 * it behind an IntersectionObserver directly delays LCP. Same reasoning as
 * the old bento grid's `revealOnScroll={false}`, which this replaces.
 */
export default function OfferHero() {
  return (
    <section className="relative w-full overflow-hidden bg-canvas pt-32 pb-0 sm:pt-40 lg:pt-48">
      {/* A single warm wash bleeding from the top-right, instead of the old
          decorative background grid. Pure CSS, no layout cost. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-1/4 -top-1/3 h-[38rem] w-[38rem] rounded-full opacity-[0.55] blur-3xl"
        style={{
          background:
            'radial-gradient(circle, color-mix(in oklab, var(--color-orange-300) 55%, transparent) 0%, transparent 68%)',
        }}
      />

      <Container className="relative">
        <motion.div variants={staggerContainer(0.09)} initial="show" animate="show">
          {OFFER.badge && (
            <motion.div variants={fadeInUp} className="t-label mb-8 flex items-center gap-3 text-orange-600">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
              </span>
              {OFFER.badge}
            </motion.div>
          )}

          <motion.h1 variants={fadeInUp} className="t-editorial max-w-[18ch] text-ink">
            Turn local searches
            <br />
            into paying customers.
            <br />
            <span className="t-accent text-orange-600">Websites that sell.</span>
          </motion.h1>

          <motion.div
            variants={fadeInUp}
            className="mt-10 grid gap-8 border-t border-line pt-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end"
          >
            <p className="max-w-xl text-lg leading-relaxed text-slate">{OFFER.subline}</p>

            <div className="flex flex-wrap items-center gap-3">
              <Button to="/#quote" size="lg">
                {OFFER.primaryCta} <FiArrowRight className="h-4 w-4" />
              </Button>
              <Button to="/portfolio" size="lg" variant="secondary">
                {OFFER.secondaryCta}
              </Button>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
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
        </motion.div>
      </Container>

      {/* Proof strip: promises we control, never invented statistics. Runs
          edge to edge as the band's closing rule. */}
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
