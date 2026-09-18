import { FiArrowUpRight, FiPhone } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa6'
import BookingCalendar from '@/components/BookingCalendar.jsx'
import { useQuoteForm } from '@/components/lead/useQuoteForm.js'
import { CONTACT_CHANNELS } from '@/data/offer.js'

export default function BookingSection() {
  const { openQuoteForm } = useQuoteForm()
  return <section id="booking" className="studio-section studio-wrap studio-booking">
    <div>
      <h2>Discuss the<br /><em>requirement.</em></h2>
      <p>Use the calendar to schedule a 30-minute requirements call. We will review the product, users, integrations and next steps.</p>
      <div className="booking-alternatives">
        <button className="text-button" onClick={openQuoteForm}>Request a written proposal <FiArrowUpRight /></button>
        <a className="text-button" href={CONTACT_CHANNELS.whatsapp} target="_blank" rel="noreferrer"><FaWhatsapp /> Contact us on WhatsApp</a>
        <a className="text-button" href={`tel:${CONTACT_CHANNELS.phone}`}><FiPhone /> {CONTACT_CHANNELS.phoneLabel}</a>
      </div>
    </div>
    <BookingCalendar />
  </section>
}
