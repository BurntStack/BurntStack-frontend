import { FiArrowRight, FiPhone } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa6'
import Container from '@/components/ui/Container.jsx'
import Button from '@/components/ui/Button.jsx'
import BackgroundFX from '@/components/ui/BackgroundFX.jsx'
import { BentoGrid, BentoCard } from '@/components/ui/Bento.jsx'
import { OFFER, CONTACT_CHANNELS, PROOF_POINTS } from '@/data/offer.js'

/**
 * Offer-led hero. The old hero sold the studio ("Building software that
 * powers businesses") and pointed at a portfolio; this one sells the offer
 * and points at the quote form, with the phone and WhatsApp routes given
 * equal billing because that's how local customers actually get in touch.
 *
 * `revealOnScroll={false}` on the grid is deliberate and load-bearing —
 * see the comment in Bento.jsx: this content is above the fold, so gating
 * it behind an IntersectionObserver directly delays LCP.
 */
export default function OfferHero() {
  return (
    <section className="relative overflow-hidden">
      <BackgroundFX />
      <Container className="pt-32 pb-12 sm:pt-40 sm:pb-16">
        <BentoGrid cols="grid-cols-2 lg:grid-cols-6" stagger={0.08} revealOnScroll={false}>
          {/* Pitch */}
          <BentoCard
            span="col-span-2 lg:col-span-4"
            tone="brand"
            hover={false}
            className="justify-center gap-6 py-10 sm:py-14"
          >
            {OFFER.badge && (
              <span className="flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-300" />
                </span>
                {OFFER.badge}
              </span>
            )}

            <h1 className="t-display max-w-2xl font-bold text-white">
              {OFFER.headline}{' '}
              <span className="text-amber-300">{OFFER.headlineAccent}</span>
            </h1>

            <p className="t-lead max-w-xl text-white/85">{OFFER.subline}</p>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                to="/#quote"
                size="lg"
                variant="secondary"
                className="border-transparent bg-white text-ink hover:bg-white/90"
              >
                {OFFER.primaryCta} <FiArrowRight className="h-4 w-4" />
              </Button>
              <Button
                to="/portfolio"
                size="lg"
                variant="ghost"
                className="text-white hover:bg-white/10 hover:text-white"
              >
                {OFFER.secondaryCta}
              </Button>
            </div>

            <p className="text-sm text-white/65">{OFFER.reassurance}</p>
          </BentoCard>

          {/* Direct contact routes — the fastest path for someone who's
              already decided, so they don't have to scroll to the form. */}
          <BentoCard
            span="col-span-2 lg:col-span-2"
            tone="ink"
            hover={false}
            className="justify-center gap-4"
          >
            <p className="font-display text-lg font-semibold text-white">
              Rather just talk to someone?
            </p>
            <p className="text-sm text-white/60">
              Call or message us directly. You'll get a person, not a ticket number.
            </p>

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
          </BentoCard>

          {/* Proof strip: promises we control, never invented statistics. */}
          <BentoCard
            span="col-span-2 lg:col-span-6"
            tone="surface"
            hover={false}
            size="none"
            className="divide-y divide-line sm:grid sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x"
          >
            {PROOF_POINTS.map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-1 px-6 py-5 sm:px-7 sm:py-6">
                <span className="font-display text-2xl font-extrabold text-orange-600 sm:text-3xl">
                  {value}
                </span>
                <span className="text-sm leading-snug text-slate">{label}</span>
              </div>
            ))}
          </BentoCard>
        </BentoGrid>
      </Container>
    </section>
  )
}
