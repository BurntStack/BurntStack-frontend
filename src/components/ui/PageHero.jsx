import { FaStar } from 'react-icons/fa6'
import Container from './Container.jsx'
import BackgroundFX from './BackgroundFX.jsx'
import { BentoGrid, BentoCard, BentoHeading } from './Bento.jsx'
import { STATS } from '@/data/misc.js'
import AnimatedCounter from './AnimatedCounter.jsx'

const yearsStat = STATS.find((s) => s.label === 'Years of Experience') ?? STATS[0]

/** Shared bento header for inner pages — a large title tile beside two compact stat tiles. */
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

          <BentoCard span="col-span-2 lg:col-span-2" tone="brand" hover={false} className="justify-center gap-5">
            <div className="flex flex-col gap-1.5">
              <div className="flex text-amber-200">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} className="h-3.5 w-3.5" />
                ))}
              </div>
              <p className="font-display text-2xl font-extrabold text-white">4.9/5 from 120+ clients</p>
            </div>
            <div className="h-px w-full bg-white/20" />
            <div>
              <p className="font-display text-2xl font-extrabold text-white">
                <AnimatedCounter value={yearsStat.value} suffix={yearsStat.suffix} /> years
              </p>
              <p className="text-sm text-white/80">shipping production software</p>
            </div>
          </BentoCard>
        </BentoGrid>
      </Container>
    </section>
  )
}
