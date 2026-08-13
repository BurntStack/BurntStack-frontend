import { motion } from 'framer-motion'
import { FiTarget, FiEye, FiHeart } from 'react-icons/fi'
import Seo from '@/components/seo/Seo.jsx'
import PageHero from '@/components/ui/PageHero.jsx'
import Section from '@/components/ui/Section.jsx'
import Container from '@/components/ui/Container.jsx'
import SectionHeading from '@/components/ui/SectionHeading.jsx'
import AnimatedCounter from '@/components/ui/AnimatedCounter.jsx'
import WhyChoose from '@/sections/home/WhyChoose.jsx'
import CtaBanner from '@/sections/home/CtaBanner.jsx'
import { STATS } from '@/data/misc.js'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion.js'

const PILLARS = [
  { icon: FiTarget, title: 'Our Mission', text: 'To help businesses grow faster by building software that is fast, reliable and a joy to use.' },
  { icon: FiEye, title: 'Our Vision', text: 'To give every ambitious company access to senior engineering — without the overhead of building a large in-house team.' },
  { icon: FiHeart, title: 'Our Values', text: 'Craftsmanship, transparency and ownership. We treat your product like it’s our own.' },
]

export default function About() {
  return (
    <>
      <Seo
        title="About Us"
        path="/about"
        description="BurntStack Technologies is a product studio building software that powers businesses."
      />
      <PageHero
        eyebrow="About Us"
        title="Engineers, designers and problem-solvers"
        description="We’re a product studio on a mission to turn ambitious ideas into software that scales."
      />

      {/* Story */}
      <Section className="pt-0">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              variants={staggerContainer(0.12)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="flex flex-col gap-5"
            >
              <motion.h2 variants={fadeInUp} className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                Building since day one for <span className="text-gradient">scale and trust</span>
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-muted">
                BurntStack Technologies Private Limited was founded on a simple belief: great software
                is a competitive advantage. Over the years we’ve partnered with startups and enterprises
                alike to design, build and scale products that people rely on every day.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-muted">
                Our team brings senior engineering, thoughtful design and deep industry context to every
                engagement — and we stay long after launch to help you grow.
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerContainer(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="grid grid-cols-2 gap-4"
            >
              {STATS.map((s) => (
                <motion.div
                  key={s.label}
                  variants={fadeInUp}
                  className="rounded-3xl border border-border-base bg-surface p-6 text-center"
                >
                  <div className="font-display text-3xl font-extrabold text-gradient sm:text-4xl">
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 text-sm text-muted">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Pillars */}
      <Section className="bg-background-secondary">
        <Container>
          <SectionHeading eyebrow="What Drives Us" title="Mission, vision & values" />
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-14 grid gap-6 md:grid-cols-3"
          >
            {PILLARS.map(({ icon: Icon, title, text }) => (
              <motion.div
                key={title}
                variants={fadeInUp}
                className="rounded-3xl border border-border-base bg-surface p-8 text-center"
              >
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-ember-500/10 text-2xl text-ember-500">
                  <Icon />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-foreground">{title}</h3>
                <p className="mt-2 text-sm text-muted">{text}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      <WhyChoose />
      <CtaBanner />
    </>
  )
}
