import { motion } from 'framer-motion'
import Seo from '@/components/seo/Seo.jsx'
import PageHero from '@/components/ui/PageHero.jsx'
import Section from '@/components/ui/Section.jsx'
import Container from '@/components/ui/Container.jsx'
import { cn } from '@/utils/cn.js'
import { PROJECTS } from '@/data/projects.js'
import CtaBanner from '@/sections/home/CtaBanner.jsx'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion.js'

export default function CaseStudies() {
  return (
    <>
      <Seo
        title="Case Studies"
        path="/case-studies"
        description="Deep dives into how we solved real business problems with software."
      />
      <PageHero
        eyebrow="Case Studies"
        title="The story behind the results"
        description="A closer look at the problem, the approach and the outcome for some of our favourite engagements."
      />
      <Section className="pt-0">
        <Container>
          <div className="space-y-8">
            {PROJECTS.map((p, i) => (
              <motion.article
                key={p.slug}
                variants={staggerContainer(0.1)}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                className={cn(
                  'grid items-center gap-8 rounded-3xl border border-border-base bg-surface p-6 sm:p-8 lg:grid-cols-2',
                  i % 2 === 1 && 'lg:[&>*:first-child]:order-2',
                )}
              >
                <motion.div
                  variants={fadeInUp}
                  className={cn(
                    'relative flex h-56 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br',
                    p.gradient,
                  )}
                >
                  <div className="absolute inset-0 bg-dots opacity-40" />
                  <span className="font-display text-2xl font-extrabold text-foreground/90">{p.name}</span>
                </motion.div>

                <motion.div variants={fadeInUp} className="flex flex-col gap-3">
                  <span className="text-sm font-semibold uppercase tracking-wide text-ember-500">
                    {p.category}
                  </span>
                  <h2 className="font-display text-2xl font-bold text-foreground">{p.name}</h2>
                  <p className="text-sm text-muted"><strong className="text-foreground">Problem:</strong> {p.problem}</p>
                  <p className="text-sm text-muted"><strong className="text-foreground">Solution:</strong> {p.solution}</p>
                  <p className="text-sm text-muted"><strong className="text-ember-500">Results:</strong> {p.results}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span key={t} className="rounded-full border border-border-base bg-surface-2 px-2.5 py-1 text-xs text-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.article>
            ))}
          </div>
        </Container>
      </Section>
      <CtaBanner />
    </>
  )
}
