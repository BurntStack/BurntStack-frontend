import { FaStar, FaQuoteLeft } from 'react-icons/fa6'
import Section from '@/components/ui/Section.jsx'
import Container from '@/components/ui/Container.jsx'
import SectionHeading from '@/components/ui/SectionHeading.jsx'
import { BentoGrid, BentoCard } from '@/components/ui/Bento.jsx'
import { TESTIMONIALS } from '@/data/misc.js'

const SPANS = ['col-span-2 lg:col-span-4', 'col-span-2 lg:col-span-2', 'col-span-2 lg:col-span-3', 'col-span-2 lg:col-span-3']

export default function Testimonials() {
  return (
    <Section id="testimonials">
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title="Loved by the teams we build with"
          description="Don’t just take our word for it. Here’s what our clients say about working with BurntStack."
        />

        <BentoGrid className="mt-14" cols="grid-cols-2 lg:grid-cols-6">
          {TESTIMONIALS.map((t, i) => (
            <BentoCard key={t.name} span={SPANS[i]} tone={i === 0 ? 'ink' : 'surface'} className="justify-between gap-5">
              <FaQuoteLeft className={i === 0 ? 'h-7 w-7 text-orange-400' : 'h-6 w-6 text-orange-500/40'} />
              <blockquote className={i === 0 ? 'flex-1 font-display text-xl leading-snug text-white' : 'flex-1 text-[0.95rem] leading-relaxed text-ink/90'}>
                “{t.review}”
              </blockquote>
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <FaStar key={s} className="h-3.5 w-3.5" />
                ))}
              </div>
              <div className={`flex items-center gap-3 border-t pt-5 ${i === 0 ? 'border-white/15' : 'border-line'}`}>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-sm font-bold text-white">
                  {t.initials}
                </span>
                <div>
                  <div className={i === 0 ? 'font-semibold text-white' : 'font-semibold text-ink'}>{t.name}</div>
                  <div className={i === 0 ? 'text-sm text-white/60' : 'text-sm text-slate'}>{t.company}</div>
                </div>
              </div>
            </BentoCard>
          ))}
        </BentoGrid>
      </Container>
    </Section>
  )
}
