import Seo from '@/components/seo/Seo.jsx'
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
      />
      <PageHero
        eyebrow="Technologies"
        title="A modern stack, chosen with intent"
        description="We pick tools for performance, reliability and longevity, never hype. Here’s what powers our work."
      />
      <TechnologiesSection />
      <CtaBanner />
    </>
  )
}
