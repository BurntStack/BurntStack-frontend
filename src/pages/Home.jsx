import Seo from '@/components/seo/Seo.jsx'
import { OFFER_FAQS } from '@/data/offer.js'
import { buildFaqSchema, buildOrganizationSchema, buildWebsiteSchema } from '@/lib/schema.js'
import OfferHero from '@/sections/offer/OfferHero.jsx'
import OfferServices from '@/sections/offer/OfferServices.jsx'
import WorkProof from '@/sections/offer/WorkProof.jsx'
import OfferProcess from '@/sections/offer/OfferProcess.jsx'
import Packages from '@/sections/offer/Packages.jsx'
import OfferFaq from '@/sections/offer/OfferFaq.jsx'
import QuoteSection from '@/sections/offer/QuoteSection.jsx'

// One real Organization/LocalBusiness node the whole site's other schema
// blocks reference by @id, plus the site-level search box and every FAQ
// actually rendered on this page (OfferFaq below) - so Google can offer an
// expandable Q&A rich result for genuinely visible content, not schema
// invented separately from the page.
const homeSchema = [buildOrganizationSchema(), buildWebsiteSchema(), buildFaqSchema(OFFER_FAQS)]

/**
 * The homepage is now a single offer landing page rather than the entry
 * point to a fourteen-page brochure site. Everything a visitor needs to
 * decide - what we do, what it costs, what we've shipped, how it works,
 * the usual objections and the quote form - is on this one page, in that
 * order, with /portfolio, /blog and /contact as the only supporting routes.
 */
export default function Home() {
  return (
    <>
      <Seo
        path="/"
        title="Websites that turn local searches into customers"
        description="BurntStack builds fast, custom websites and online stores for local businesses in Warangal and across India, wired to WhatsApp and Google so enquiries reach your phone. Fixed-price packages, free consultation."
        jsonLd={homeSchema}
      />
      <OfferHero />
      <OfferServices />
      <WorkProof />
      <OfferProcess />
      <Packages />
      <OfferFaq />
      <QuoteSection />
    </>
  )
}
