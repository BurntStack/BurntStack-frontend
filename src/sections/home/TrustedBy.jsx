import { motion } from 'framer-motion'
import Container from '@/components/ui/Container.jsx'
import AnimatedCounter from '@/components/ui/AnimatedCounter.jsx'
import { BentoGrid, BentoCard } from '@/components/ui/Bento.jsx'
import { STATS } from '@/data/misc.js'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion.js'

const LOGOS = ['Northwind', 'Vertex', 'Quantic', 'Meridian', 'Apex', 'Lumen']

export default function TrustedBy() {
  return (
    <Container className="py-8">
      <BentoGrid cols="grid-cols-2 lg:grid-cols-6" stagger={0.08}>
        <BentoCard span="col-span-2 lg:col-span-6" tone="ivory" hover={false} className="items-center gap-6 py-8 sm:flex-row sm:justify-between">
          <p className="shrink-0 text-sm text-mute">Powering product teams at fast-growing companies</p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {LOGOS.map((logo) => (
              <span
                key={logo}
                className="font-display text-lg font-semibold tracking-tight text-line-strong grayscale transition-colors hover:text-slate"
              >
                {logo}
              </span>
            ))}
          </div>
        </BentoCard>

        <BentoCard span="col-span-2 lg:col-span-6" tone="ink" hover={false}>
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid grid-cols-2 gap-y-8 lg:grid-cols-4 lg:gap-0"
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
        </BentoCard>
      </BentoGrid>
    </Container>
  )
}
