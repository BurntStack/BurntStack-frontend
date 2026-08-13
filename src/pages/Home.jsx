import Seo from '@/components/seo/Seo.jsx'
import { COMPANY } from '@/data/site.js'
import Hero from '@/sections/home/Hero.jsx'
import TrustedBy from '@/sections/home/TrustedBy.jsx'
import ServicesSection from '@/sections/home/ServicesSection.jsx'
import WhyChoose from '@/sections/home/WhyChoose.jsx'
import TechnologiesSection from '@/sections/home/TechnologiesSection.jsx'
import FeaturedProjects from '@/sections/home/FeaturedProjects.jsx'
import IndustriesSection from '@/sections/home/IndustriesSection.jsx'
import ProcessSection from '@/sections/home/ProcessSection.jsx'
import Testimonials from '@/sections/home/Testimonials.jsx'
import PricingSection from '@/sections/home/PricingSection.jsx'
import FaqSection from '@/sections/home/FaqSection.jsx'
import CtaBanner from '@/sections/home/CtaBanner.jsx'

// Organisation schema for rich results.
const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: COMPANY.legalName,
  url: 'https://burntstack.com',
  email: COMPANY.email,
  telephone: COMPANY.phone,
  description: COMPANY.tagline,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Hyderabad',
    addressCountry: 'IN',
  },
}

export default function Home() {
  return (
    <>
      <Seo path="/" jsonLd={orgSchema} />
      <Hero />
      <TrustedBy />
      <ServicesSection />
      <WhyChoose />
      <TechnologiesSection />
      <FeaturedProjects />
      <IndustriesSection />
      <ProcessSection />
      <Testimonials />
      <PricingSection />
      <FaqSection />
      <CtaBanner />
    </>
  )
}
