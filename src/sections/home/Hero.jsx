import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi'
import { FaStar } from 'react-icons/fa6'
import Container from '@/components/ui/Container.jsx'
import Button from '@/components/ui/Button.jsx'
import BackgroundFX from '@/components/ui/BackgroundFX.jsx'
import AnimatedCounter from '@/components/ui/AnimatedCounter.jsx'
import { BentoGrid, BentoCard } from '@/components/ui/Bento.jsx'
import { STATS } from '@/data/misc.js'

const years = STATS.find((s) => s.label === 'Years of Experience')
const projects = STATS.find((s) => s.label === 'Projects Completed')

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <BackgroundFX />
      <Container className="pt-32 pb-14 sm:pt-40 sm:pb-16">
        <BentoGrid cols="grid-cols-2 lg:grid-cols-6" stagger={0.09}>
          {/* Flagship tile — headline, pitch, primary CTAs */}
          <BentoCard span="col-span-2 lg:col-span-4" tone="brand" hover={false} className="justify-center gap-6 py-10 sm:py-12">
            <span className="w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
              Enterprise Software Studio
            </span>
            <h1 className="t-display max-w-xl font-bold text-white">
              Building software that powers businesses
            </h1>
            <p className="t-lead max-w-lg text-white/85">
              We design and engineer websites, mobile apps, AI solutions and cloud platforms that
              help ambitious companies move faster and scale with confidence.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button to="/contact" size="lg" variant="secondary" className="border-transparent bg-white text-ink hover:bg-white/90">
                Get Started <FiArrowRight className="h-4 w-4" />
              </Button>
              <Button to="/portfolio" size="lg" variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
                View Portfolio
              </Button>
            </div>
          </BentoCard>

          {/* Rating tile */}
          <BentoCard span="col-span-2 lg:col-span-2" tone="surface" hover={false} className="justify-center gap-2">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar key={i} className="h-4 w-4" />
              ))}
            </div>
            <p className="font-display text-2xl font-extrabold text-ink">4.9/5</p>
            <p className="text-sm text-slate">Trusted by 120+ companies worldwide</p>
          </BentoCard>

          {/* Years experience */}
          <BentoCard span="col-span-1 lg:col-span-2" tone="ink" hover={false} className="justify-center">
            <p className="font-display text-3xl font-extrabold text-white">
              <AnimatedCounter value={years.value} suffix={years.suffix} />
            </p>
            <p className="mt-1 text-sm text-white/70">{years.label}</p>
          </BentoCard>

          {/* Projects shipped */}
          <BentoCard span="col-span-1 lg:col-span-2" tone="surface" hover={false} className="justify-center">
            <p className="font-display text-3xl font-extrabold text-orange-600">
              <AnimatedCounter value={projects.value} suffix={projects.suffix} />
            </p>
            <p className="mt-1 text-sm text-slate">{projects.label}</p>
          </BentoCard>

          {/* Quick CTA */}
          <BentoCard
            to="/contact"
            span="col-span-2 lg:col-span-2"
            tone="ivory"
            direction="row"
            className="items-center justify-between gap-3"
          >
            <span className="font-display text-lg font-semibold text-ink">
              Free consultation
            </span>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <FiArrowUpRight className="h-4 w-4" />
            </span>
          </BentoCard>
        </BentoGrid>
      </Container>
    </section>
  )
}
