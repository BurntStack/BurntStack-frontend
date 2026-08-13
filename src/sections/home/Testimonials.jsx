import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { FaStar, FaQuoteLeft } from 'react-icons/fa6'
import 'swiper/css'
import 'swiper/css/pagination'
import Section from '@/components/ui/Section.jsx'
import Container from '@/components/ui/Container.jsx'
import SectionHeading from '@/components/ui/SectionHeading.jsx'
import { TESTIMONIALS } from '@/data/misc.js'

export default function Testimonials() {
  return (
    <Section id="testimonials">
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title="Loved by the teams we build with"
          description="Don’t just take our word for it — here’s what our clients say about working with BurntStack."
        />
      </Container>

      <div className="mt-14">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1.1}
          centeredSlides
          loop
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1.6, centeredSlides: false },
            1024: { slidesPerView: 2.4, centeredSlides: false },
          }}
          className="!px-5 !pb-14 sm:!px-8"
        >
          {TESTIMONIALS.map((t) => (
            <SwiperSlide key={t.name} className="h-auto">
              <figure className="flex h-full flex-col gap-5 rounded-3xl border border-border-base bg-surface p-8">
                <FaQuoteLeft className="h-7 w-7 text-ember-500/40" />
                <blockquote className="flex-1 text-base leading-relaxed text-foreground/90">
                  “{t.review}”
                </blockquote>
                <div className="flex items-center gap-1 text-ember-500">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <FaStar key={i} className="h-4 w-4" />
                  ))}
                </div>
                <figcaption className="flex items-center gap-3 border-t border-border-base pt-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-ember-500 to-amber-glow text-sm font-bold text-white">
                    {t.initials}
                  </span>
                  <div>
                    <div className="font-semibold text-foreground">{t.name}</div>
                    <div className="text-sm text-muted">{t.company}</div>
                  </div>
                </figcaption>
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Ember-tinted swiper pagination bullets */}
      <style>{`
        .swiper-pagination-bullet { background: var(--muted); opacity: 0.4; }
        .swiper-pagination-bullet-active { background: var(--color-ember-500); opacity: 1; width: 22px; border-radius: 999px; }
      `}</style>
    </Section>
  )
}
