import Seo from '@/components/seo/Seo.jsx'
import PageHero from '@/components/ui/PageHero.jsx'
import Section from '@/components/ui/Section.jsx'
import Container from '@/components/ui/Container.jsx'
import { cn } from '@/utils/cn.js'
import { PROJECTS } from '@/data/projects.js'
import { BentoGrid, BentoCard } from '@/components/ui/Bento.jsx'
import CtaBanner from '@/sections/home/CtaBanner.jsx'

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
          <BentoGrid cols="grid-cols-1" className="gap-6">
            {PROJECTS.map((p, i) => (
              <BentoCard key={p.slug} span="col-span-1" tone="surface" size="none" hover={false}>
                <div
                  className={cn(
                    'grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-2',
                    i % 2 === 1 && 'lg:[&>*:first-child]:order-2',
                  )}
                >
                  <div className={cn('relative flex h-56 items-center justify-center overflow-hidden rounded-bento-sm bg-gradient-to-br', p.gradient)}>
                    <div className="absolute inset-0 bg-dot-grid opacity-40" />
                    <span className="font-display text-2xl font-extrabold text-ink/85">{p.name}</span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <span className="text-sm font-semibold uppercase tracking-wide text-orange-600">
                      {p.category}
                    </span>
                    <h2 className="font-display text-2xl font-bold text-ink">{p.name}</h2>
                    <p className="text-sm text-slate"><strong className="text-ink">Problem:</strong> {p.problem}</p>
                    <p className="text-sm text-slate"><strong className="text-ink">Solution:</strong> {p.solution}</p>
                    <p className="text-sm text-slate"><strong className="text-orange-600">Results:</strong> {p.results}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <span key={t} className="rounded-full border border-line bg-sand px-2.5 py-1 text-xs text-slate">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </BentoCard>
            ))}
          </BentoGrid>
        </Container>
      </Section>
      <CtaBanner />
    </>
  )
}
