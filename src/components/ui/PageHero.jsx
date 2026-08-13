import { motion } from 'framer-motion'
import Container from './Container.jsx'
import Badge from './Badge.jsx'
import BackgroundFX from './BackgroundFX.jsx'
import { fadeInUp, staggerContainer } from '@/lib/motion.js'

/** Shared hero band for inner pages — consistent, calm, well-spaced. */
export default function PageHero({ eyebrow, title, description, children }) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <BackgroundFX />
      <Container>
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate="show"
          className="mx-auto flex max-w-3xl flex-col items-center gap-6 pt-36 pb-16 text-center sm:pt-44 sm:pb-20"
        >
          {eyebrow && (
            <motion.div variants={fadeInUp}>
              <Badge>{eyebrow}</Badge>
            </motion.div>
          )}
          <motion.h1 variants={fadeInUp} className="t-h1 font-bold text-ink">
            {title}
          </motion.h1>
          {description && (
            <motion.p variants={fadeInUp} className="t-lead max-w-2xl text-slate">
              {description}
            </motion.p>
          )}
          {children && <motion.div variants={fadeInUp}>{children}</motion.div>}
        </motion.div>
      </Container>
    </section>
  )
}
