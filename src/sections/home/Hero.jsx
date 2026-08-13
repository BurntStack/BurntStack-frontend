import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import { FaStar } from 'react-icons/fa6'
import Container from '@/components/ui/Container.jsx'
import Button from '@/components/ui/Button.jsx'
import Badge from '@/components/ui/Badge.jsx'
import BackgroundFX from '@/components/ui/BackgroundFX.jsx'
import { fadeInUp, staggerContainer } from '@/lib/motion.js'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <BackgroundFX />
      <Container className="flex flex-col items-center pt-40 pb-20 text-center sm:pt-48 lg:pb-28">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          <motion.div variants={fadeInUp}>
            <Badge>Enterprise Software Studio</Badge>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="t-display mt-6 max-w-3xl font-bold text-ink"
          >
            Building software that{' '}
            <span className="text-orange-600">powers businesses</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="t-lead mt-6 max-w-2xl text-slate"
          >
            We design and engineer websites, mobile apps, AI solutions and cloud platforms that
            help ambitious companies move faster and scale with confidence.
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button to="/contact" size="lg">
              Get Started <FiArrowRight className="h-4 w-4" />
            </Button>
            <Button to="/portfolio" variant="secondary" size="lg">
              View Portfolio
            </Button>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mt-10 flex items-center gap-5 text-sm"
          >
            <div className="flex items-center gap-1.5">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} className="h-4 w-4" />
                ))}
              </div>
              <span className="font-semibold text-ink">4.9/5</span>
            </div>
            <span className="h-4 w-px bg-line-strong" />
            <p className="text-slate">
              Trusted by <span className="font-semibold text-ink">120+ companies</span> worldwide
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
