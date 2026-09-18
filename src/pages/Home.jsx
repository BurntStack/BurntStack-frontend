import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiArrowDown, FiCode, FiCommand, FiLayers, FiRefreshCw, FiPlus, FiPause, FiPlay, FiMessageCircle } from 'react-icons/fi'
import Seo from '@/components/seo/Seo.jsx'
import { useQuoteForm } from '@/components/lead/useQuoteForm.js'
import { useSectionNav } from '@/lib/useSectionNav.js'
import { OFFER_FAQS, OFFER_SERVICES } from '@/data/offer.js'
import { buildFaqSchema, buildOrganizationSchema, buildWebsiteSchema } from '@/lib/schema.js'
import BookingSection from '@/sections/offer/BookingSection.jsx'
import FromThePortal from '@/sections/offer/FromThePortal.jsx'
import StudioPackages from '@/sections/offer/StudioPackages.jsx'
import StudioProcess from '@/sections/offer/StudioProcess.jsx'
import ProjectShowcase from '@/components/cards/ProjectShowcase.jsx'
import OfferServices from '@/sections/offer/OfferServices.jsx'
import '@/studio.css'
import '@/studio-details.css'

const layers = [
  { name: 'Design', note: 'Interfaces designed around your customers.', icon: FiCommand, className: 'design' },
  { name: 'Develop', note: 'Websites and apps built for your business.', icon: FiCode, className: 'develop' },
  { name: 'Deploy', note: 'Testing, hosting and launch support.', icon: FiLayers, className: 'deploy' },
]

export default function Home() {
  const { openQuoteForm } = useQuoteForm()
  const go = useSectionNav()
  const [active, setActive] = useState(0)
  const [scattered, setScattered] = useState(false)
  const [faq, setFaq] = useState(0)
  const [ribbonPaused, setRibbonPaused] = useState(false)
  return (
    <div className="studio-home">
      <Seo path="/" title="Websites, software and business systems | BurntStack" description="BurntStack designs and develops websites, software applications, ERP systems, AI automations, voice agents, SaaS products, mobile applications and e-commerce systems." jsonLd={[buildOrganizationSchema(), buildWebsiteSchema(), buildFaqSchema(OFFER_FAQS)]} />
      <section className="studio-hero studio-wrap">
        <div className="hero-main">
          <div className="hero-copy">
            <h1>Digital products<br />for <span className="serif-word">business.</span><span className="heading-star" aria-hidden="true">✳</span></h1>
            <p>Websites, software and connected systems designed around your customers, staff and operating requirements.</p>
            <div className="hero-actions"><button className="studio-button" onClick={openQuoteForm}>Discuss a project <FiArrowUpRight /></button><button className="text-button" onClick={() => go('work')}>View selected work <FiArrowDown /></button></div><button className="text-button hero-booking" onClick={() => go('booking')}>Book an initial 30-minute call <FiArrowUpRight /></button>
          </div>
          <div className={`stack-playground ${scattered ? 'is-scattered' : ''}`}>
            <div className="stack-orbit" aria-hidden="true" />
            <div className="interactive-stack">
              {layers.map(({ name, icon: Icon, className }, index) => <button key={name} className={`stack-tile tile-${className} ${active === index ? 'is-active' : ''}`} onClick={() => setActive(index)} aria-pressed={active === index} aria-label={`Explore ${name}`}><Icon className="tile-icon" /><span className="tile-name">{name}<FiArrowUpRight /></span></button>)}
            </div>
            <span className="stack-doodle" aria-hidden="true">↙</span><span className="play-note">Select a stage</span>
            <div className="playground-bottom"><span aria-live="polite">{layers[active].note}</span><button onClick={() => setScattered(!scattered)} aria-label={scattered ? 'Restore the cards' : 'Rearrange the cards'}><FiRefreshCw /> {scattered ? 'Restore' : 'Rearrange'}</button></div>
          </div>
        </div>
      </section>
      <section className={`capability-ribbon${ribbonPaused ? ' is-paused' : ''}`} aria-label="Services">
        <div className="capability-ribbon-label"><span>What we build</span><FiArrowUpRight aria-hidden="true" /></div>
        <div className="capability-ribbon-viewport">
          <div className="capability-ribbon-track">
            <ul>{OFFER_SERVICES.map(({ title }) => <li key={title}>{title}<b aria-hidden="true">✳</b></li>)}</ul>
            <ul aria-hidden="true">{OFFER_SERVICES.map(({ title }) => <li key={`repeat-${title}`}>{title}<b aria-hidden="true">✳</b></li>)}</ul>
          </div>
        </div>
        <button className="capability-ribbon-toggle" onClick={() => setRibbonPaused(!ribbonPaused)} aria-label={ribbonPaused ? 'Play service strip' : 'Pause service strip'} aria-pressed={ribbonPaused}>{ribbonPaused ? <FiPlay /> : <FiPause />}</button>
      </section>
      <section id="work" className="studio-section studio-wrap">

        <div className="section-heading"><h2>Selected <em>work.</em></h2><Link className="text-button" to="/portfolio">View portfolio <FiArrowUpRight /></Link></div>
        <ProjectShowcase />
      </section>
      <OfferServices />
      <StudioProcess />
      <StudioPackages />
      <section id="faq" className="studio-section studio-wrap faq-section">
        <div className="faq-intro"><span className="detail-eyebrow">Before we begin</span><div className="faq-symbol" aria-hidden="true"><FiMessageCircle /><span>?</span></div><h2>Good projects<br /> start with<br /><em>good questions.</em></h2><p>Scope, systems, handover. A little clarity before the first conversation.</p><Link className="faq-contact" to="/contact"><span>Something else on your mind?<strong>Let’s talk it through</strong></span><FiArrowUpRight /></Link></div>
        <div className="studio-faq-list"><div className="faq-list-heading"><span>Project essentials</span><span>{String(OFFER_FAQS.length).padStart(2, '0')} answers</span></div>{OFFER_FAQS.map(({ q, a }, i) => <div className={`studio-faq${faq === i ? ' is-open' : ''}`} key={q}><h3><button onClick={() => setFaq(faq === i ? -1 : i)} aria-expanded={faq === i} aria-controls={`answer-${i}`}><span className="faq-number" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span><span>{q}</span><span className="faq-toggle"><FiPlus className={faq === i ? 'rotated' : ''} /></span></button></h3><div id={`answer-${i}`} hidden={faq !== i}><p>{a}</p></div></div>)}</div>
      </section>
      <BookingSection />
      <FromThePortal />
      <section className="closing-section"><div id="quote" className="studio-wrap"><button onClick={openQuoteForm} className="closing-button"><span>Discuss your<br /><em>requirements.</em></span><FiArrowUpRight /></button><div className="closing-bottom"><span>Websites, software and connected business systems.</span></div></div></section>
    </div>
  )
}
