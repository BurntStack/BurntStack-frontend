import Seo from '@/components/seo/Seo.jsx'
import { FAQS } from '@/data/misc.js'
import { buildFaqSchema, buildOrganizationSchema, buildWebsiteSchema } from '@/lib/schema.js'
import Hero from '@/sections/home/Hero.jsx'
import ServicesSection from '@/sections/home/ServicesSection.jsx'
import WhyChoose from '@/sections/home/WhyChoose.jsx'
import TechnologiesSection from '@/sections/home/TechnologiesSection.jsx'
import FeaturedProjects from '@/sections/home/FeaturedProjects.jsx'
import IndustriesSection from '@/sections/home/IndustriesSection.jsx'
import ProcessSection from '@/sections/home/ProcessSection.jsx'
import PricingSection from '@/sections/home/PricingSection.jsx'
import FaqSection from '@/sections/home/FaqSection.jsx'
import CtaBanner from '@/sections/home/CtaBanner.jsx'

// One real Organization/LocalBusiness node the whole site's other schema
// blocks reference by @id, plus the site-level search box and every FAQ
// actually rendered on this page (FaqSection below) - so Google can offer
// an expandable Q&A rich result for genuinely visible content, not schema
// invented separately from the page.
const homeSchema = [buildOrganizationSchema(), buildWebsiteSchema(), buildFaqSchema(FAQS)]

export default function Home() {
  return (
    <>
      <Seo path="/" jsonLd={homeSchema} />
      <Hero />
      <ServicesSection />
      <WhyChoose />
      <TechnologiesSection />
      <FeaturedProjects />
      <IndustriesSection />
      <ProcessSection />
      <PricingSection />
      <FaqSection />
      <CtaBanner />
    </>
  )
}
