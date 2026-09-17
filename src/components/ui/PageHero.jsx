import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import Container from './Container.jsx'
import Button from './Button.jsx'
import { useQuoteForm } from '@/components/lead/useQuoteForm.js'
import { fadeInUp, staggerContainer } from '@/lib/motion.js'
import { cn } from '@/utils/cn.js'

/**
 * Header for the supporting routes (work, blog, contact, legal).
 *
 * Matches the landing page's editorial bands: a tracked label, an oversized
 * uppercase title with a serif italic accent, and a rule closing the block -
 * no tiles. `aside={false}` drops the quote CTA for the legal pages, where
 * a sales prompt would be out of place.
 */
export default function PageHero({ eyebrow, title, accent, description, aside = true, children }) {
  const { openQuoteForm } = useQuoteForm()

  return (
    <section className="relative w-full overflow-hidden border-b border-line bg-canvas pt-32 pb-14 sm:pt-40 sm:pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-1/4 -top-1/2 h-[30rem] w-[30rem] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, color-mix(in oklab, var(--color-orange-300) 50%, transparent) 0%, transparent 70%)',
        }}
      />
      <Container className="relative">
        <motion.div variants={staggerContainer(0.08)} initial="show" animate="show">
          {eyebrow && (
            <motion.div variants={fadeInUp} className="t-label flex items-center gap-3 text-orange-600">
              <span className="h-px w-8 bg-orange-500/60" />
              {eyebrow}
            </motion.div>
          )}

          <motion.h1 variants={fadeInUp} className={cn('t-editorial mt-6 max-w-[16ch] text-ink')}>
            {title}
            {accent && (
              <>
                <br />
                <span className="t-accent text-orange-600">{accent}</span>
              </>
            )}
          </motion.h1>

          {(description || aside || children) && (
            <motion.div
              variants={fadeInUp}
              className="mt-10 grid gap-8 border-t border-line pt-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end"
            >
              <div>
                {description && <p className="max-w-xl text-lg text-slate">{description}</p>}
                {children && <div className="mt-6">{children}</div>}
              </div>
              {aside && (
                <Button onClick={openQuoteForm} size="lg" className="w-fit shrink-0">
                  Get my quote <FiArrowRight className="h-4 w-4" />
                </Button>
              )}
            </motion.div>
          )}
        </motion.div>
      </Container>
    </section>
  )
}
