import Seo from '@/components/seo/Seo.jsx'
import PageHero from '@/components/ui/PageHero.jsx'
import Section from '@/components/ui/Section.jsx'
import Container from '@/components/ui/Container.jsx'

/** Renders a legal document from a simple sections array. */
export default function LegalPage({ title, path, updated, sections }) {
  return (
    <>
      <Seo title={title} path={path} />
      <PageHero eyebrow="Legal" title={title} description={`Last updated ${updated}`} />
      <Section className="pt-0">
        <Container className="max-w-3xl">
          <div className="space-y-8">
            {sections.map((s) => (
              <div key={s.heading}>
                <h2 className="font-display text-xl font-bold text-foreground">{s.heading}</h2>
                <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
