import { FiArrowRight } from 'react-icons/fi'
import Container from './Container.jsx'
import Button from './Button.jsx'
import BackgroundFX from './BackgroundFX.jsx'
import { BentoGrid, BentoCard, BentoHeading } from './Bento.jsx'

/**
 * Shared bento header for the remaining inner pages (work, blog, contact,
 * legal). The side tile used to be a "2026 / Founded this year" stat -
 * that claim is gone from the site entirely, and a quote CTA is a far
 * better use of the most valuable tile on an inner page anyway.
 *
 * `aside={false}` drops the side tile and lets the heading run full width,
 * which suits the legal pages where a sales CTA would be out of place.
 */
export default function PageHero({ eyebrow, title, description, aside = true, children }) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <BackgroundFX />
      <Container>
        <BentoGrid
          className="pt-36 pb-12 sm:pt-44 sm:pb-16"
          cols="grid-cols-2 lg:grid-cols-6"
          stagger={0.08}
          revealOnScroll={false}
        >
          <BentoCard
            span={aside ? 'col-span-2 lg:col-span-4' : 'col-span-2 lg:col-span-6'}
            tone="ink"
            hover={false}
            className="justify-center"
          >
            <BentoHeading as="h1" eyebrow={eyebrow} title={title} description={description} tone="onDark" />
            {children && <div className="mt-6">{children}</div>}
          </BentoCard>

          {aside && (
            <BentoCard
              span="col-span-2 lg:col-span-2"
              tone="brand"
              hover={false}
              className="justify-center gap-3"
            >
              <p className="font-display text-xl font-bold text-white">
                Know what you need? Get a fixed quote.
              </p>
              <p className="text-sm text-white/80">
                A free 15-minute call, then a written price. No obligation either way.
              </p>
              <Button
                to="/#quote"
                variant="secondary"
                className="mt-1 w-fit border-transparent bg-white text-ink hover:bg-white/90"
              >
                Get my quote <FiArrowRight className="h-4 w-4" />
              </Button>
            </BentoCard>
          )}
        </BentoGrid>
      </Container>
    </section>
  )
}
