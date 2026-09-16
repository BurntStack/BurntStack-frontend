import Seo from '@/components/seo/Seo.jsx'
import { buildBreadcrumbSchema } from '@/lib/schema.js'
import PageHero from '@/components/ui/PageHero.jsx'
import ServicesSection from '@/sections/home/ServicesSection.jsx'
import ProcessSection from '@/sections/home/ProcessSection.jsx'
import PricingSection from '@/sections/home/PricingSection.jsx'
import CtaBanner from '@/sections/home/CtaBanner.jsx'

export default function Services() {
  return (
    <>
      <Seo
        title="Services"
        path="/services"
        description="End-to-end product development: web, mobile, AI, cloud, enterprise software and more."
        jsonLd={buildBreadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }])}
      />
      <PageHero
        eyebrow="Services"
        title="Everything you need to design, build and scale"
        description="A full-stack team that takes you from idea to production, and stays with you as you grow."
      />
      <ServicesSection />
      <ProcessSection />
      <PricingSection />
      <CtaBanner />
    </>
  )
}
