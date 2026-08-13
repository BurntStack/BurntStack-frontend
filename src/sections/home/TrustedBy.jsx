import { motion } from 'framer-motion'
import Container from '@/components/ui/Container.jsx'
import AnimatedCounter from '@/components/ui/AnimatedCounter.jsx'
import { STATS } from '@/data/misc.js'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion.js'

const LOGOS = ['Northwind', 'Vertex', 'Quantic', 'Meridian', 'Apex', 'Lumen']

export default function TrustedBy() {
  return (
    <section className="pb-8 pt-4">
      {/* Client wordmarks */}
      <Container>
        <p className="text-center text-sm text-mute">
          Powering product teams at fast-growing companies
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-12 gap-y-5">
          {LOGOS.map((logo) => (
            <span
              key={logo}
              className="font-display text-lg font-semibold tracking-tight text-line-strong grayscale transition-colors hover:text-slate"
            >
              {logo}
            </span>
          ))}
        </div>
      </Container>

      {/* Stats — charcoal band, divider-separated (distinct from the card sections) */}
      <Container className="mt-14">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-2 gap-y-10 rounded-2xl bg-ink px-8 py-12 sm:px-12 lg:grid-cols-4 lg:gap-0"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              className={i < STATS.length - 1 ? 'lg:border-r lg:border-white/10' : ''}
            >
              <div className="px-2 text-center lg:px-6">
                <div className="font-display text-4xl font-bold text-white sm:text-5xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-2 text-sm text-white/55">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
