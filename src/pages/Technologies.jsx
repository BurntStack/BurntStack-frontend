import Seo from '@/components/seo/Seo.jsx'
import { buildBreadcrumbSchema } from '@/lib/schema.js'
import PageHero from '@/components/ui/PageHero.jsx'
import TechnologiesSection from '@/sections/home/TechnologiesSection.jsx'
import CtaBanner from '@/sections/home/CtaBanner.jsx'

export default function Technologies() {
  return (
    <>
      <Seo
        title="Technologies"
        path="/technologies"
        description="The modern stack we use to ship fast, reliable software: React, Django, PostgreSQL, AWS, AI and more."
        jsonLd={buildBreadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Technologies', path: '/technologies' }])}
      />
      <PageHero
        eyebrow="Technologies"
        title="A modern stack, chosen with intent"
        description="We pick tools for performance, reliability and longevity, never hype. Here’s what powers our work."
      />
      <TechnologiesSection />
      {/* TechnologiesSection carries its own generous bottom padding (shared
          with the Home page, where more sections follow it) - pull the CTA
          up here so a lone page doesn't end in a large dead gap. */}
      <div className="-mt-16 sm:-mt-24">
        <CtaBanner />
      </div>
    </>
  )
}
