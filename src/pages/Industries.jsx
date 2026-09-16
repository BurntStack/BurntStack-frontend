import Seo from '@/components/seo/Seo.jsx'
import { buildBreadcrumbSchema } from '@/lib/schema.js'
import PageHero from '@/components/ui/PageHero.jsx'
import IndustriesSection from '@/sections/home/IndustriesSection.jsx'
import CtaBanner from '@/sections/home/CtaBanner.jsx'

export default function Industries() {
  return (
    <>
      <Seo
        title="Industries"
        path="/industries"
        description="Software expertise across healthcare, finance, education, logistics, retail and more."
        jsonLd={buildBreadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Industries', path: '/industries' }])}
      />
      <PageHero
        eyebrow="Industries"
        title="Software shaped to your sector"
        description="We’ve shipped for regulated, high-stakes industries, and we bring that context to every build."
      />
      <IndustriesSection />
      {/* Same fix as Technologies.jsx: IndustriesSection's bottom padding is
          sized for the Home page, where more sections follow it. */}
      <div className="-mt-16 sm:-mt-24">
        <CtaBanner />
      </div>
    </>
  )
}
