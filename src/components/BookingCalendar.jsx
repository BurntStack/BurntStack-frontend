import { useEffect, useState } from 'react'
import Cal from '@calcom/embed-react'
import { FiArrowUpRight, FiCalendar } from 'react-icons/fi'
import { CAL_LINK, CAL_URL, initCal } from '@/lib/cal.js'

export default function BookingCalendar() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (show) initCal().catch(() => { /* The direct booking link remains available. */ })
  }, [show])

  return <div className="booking-calendar">
    {show ? (
      <div className="booking-embed" data-lenis-prevent>
        <Cal calLink={CAL_LINK} style={{ width: '100%', height: '100%', minHeight: 600 }} config={{ layout: 'month_view', theme: 'light' }} />
      </div>
    ) : (
      <div className="booking-invite">
        <span className="calendar-sticker" aria-hidden="true"><FiCalendar /></span>
        <h3>Schedule a consultation</h3>
        <p>Review your requirements, existing systems and the next stage of the project.</p>
        <button className="studio-button" onClick={() => setShow(true)}>View available times <FiArrowUpRight /></button>
        <span className="booking-note">30 minutes · Your local time zone</span>
      </div>
    )}
    <a className="booking-direct text-button" href={CAL_URL} target="_blank" rel="noreferrer">Open booking in a new tab <FiArrowUpRight /></a>
  </div>
}
