import Container from './Container.jsx'
import BackgroundFX from './BackgroundFX.jsx'
import { BentoGrid, BentoCard, BentoHeading } from './Bento.jsx'

/** Shared bento header for inner pages: a large title tile beside a founding-year tile. */
export default function PageHero({ eyebrow, title, description, children }) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <BackgroundFX />
      <Container>
        <BentoGrid className="pt-36 pb-12 sm:pt-44 sm:pb-16" cols="grid-cols-2 lg:grid-cols-6" stagger={0.08}>
          <BentoCard span="col-span-2 lg:col-span-4" tone="ink" hover={false} className="justify-center">
            <BentoHeading eyebrow={eyebrow} title={title} description={description} tone="onDark" />
            {children && <div className="mt-6">{children}</div>}
          </BentoCard>

          <BentoCard span="col-span-2 lg:col-span-2" tone="brand" hover={false} className="justify-center gap-2">
            <p className="font-display text-4xl font-extrabold text-white">2026</p>
            <p className="text-sm text-white/80">Founded this year, senior team from day one</p>
          </BentoCard>
        </BentoGrid>
      </Container>
    </section>
  )
}
