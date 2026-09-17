import Seo from '@/components/seo/Seo.jsx'
import { OFFER_FAQS } from '@/data/offer.js'
import { buildFaqSchema, buildOrganizationSchema, buildWebsiteSchema } from '@/lib/schema.js'
import OfferHero from '@/sections/offer/OfferHero.jsx'
import BookingSection from '@/sections/offer/BookingSection.jsx'
import FromThePortal from '@/sections/offer/FromThePortal.jsx'
import OfferServices from '@/sections/offer/OfferServices.jsx'
import WorkProof from '@/sections/offer/WorkProof.jsx'
import OfferProcess from '@/sections/offer/OfferProcess.jsx'
import Packages from '@/sections/offer/Packages.jsx'
import OfferFaq from '@/sections/offer/OfferFaq.jsx'
import QuoteCta from '@/sections/offer/QuoteCta.jsx'

// One real Organization/LocalBusiness node the whole site's other schema
// blocks reference by @id, plus the site-level search box and every FAQ
// actually rendered on this page - so Google can offer an expandable Q&A
// rich result for genuinely visible content.
const homeSchema = [buildOrganizationSchema(), buildWebsiteSchema(), buildFaqSchema(OFFER_FAQS)]

/**
 * Ordered by what the visitor is ready to do, not by what we want to say.
 *
 *   1. Hero, with the lead form in it. The cheapest possible action, and
 *      it needs no click to reach - it is simply there.
 *   2. Booking. A bigger commitment than a form, so it comes second.
 *   3. From the portal. Whatever the team has published most recently;
 *      hides itself entirely when there is nothing.
 *   4. Everything else: what we do, what we have shipped, how it runs,
 *      what it costs, and the usual objections.
 *
 * Nothing on this page links to a `#fragment`. Every "get a quote" button
 * opens the form over the page instead, so the reader never loses their
 * place and the address bar stays clean.
 */
export default function Home() {
  return (
    <>
      <Seo
        path="/"
        title="Websites that turn visitors into customers"
        description="BurntStack builds fast, custom websites, online stores and apps for businesses across India, wired to WhatsApp and Google so enquiries reach your phone. Fixed-price packages, free consultation."
        jsonLd={homeSchema}
      />
      <OfferHero />
      <BookingSection />
      <FromThePortal />
      <OfferServices />
      <WorkProof />
      <OfferProcess />
      <Packages />
      <OfferFaq />
      <QuoteCta />
    </>
  )
}
