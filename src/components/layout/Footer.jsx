import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiPhone } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa6'
import Logo from '@/components/ui/Logo.jsx'
import { COMPANY } from '@/data/company.js'
import { CONTACT_CHANNELS } from '@/data/offer.js'
import { FOOTER_LINKS, SOCIALS } from '@/data/site.js'
import { useQuoteForm } from '@/components/lead/useQuoteForm.js'
import { useSectionNav } from '@/lib/useSectionNav.js'
import { scrollToTarget } from '@/lib/scroll.js'

export default function Footer() {
  const { openQuoteForm } = useQuoteForm()
  const go = useSectionNav()
  return <footer className="studio-footer"><div className="studio-wrap">
    <div className="footer-hero"><div className="footer-brand"><Logo tone="onDark" lazy /><p>Websites, software and<br />business systems.</p><span className="footer-location">Based in Warangal. Building beyond.</span></div><div className="footer-hero-copy"><span>Make your next move</span><h2>Built for business.<br /><em>Built for yours.</em></h2><button className="footer-hero-action" onClick={openQuoteForm}>Discuss a project <FiArrowUpRight /></button></div><span className="footer-spark" aria-hidden="true">✳</span></div>
    <div className="footer-directory">{Object.entries(FOOTER_LINKS).filter(([heading]) => heading !== 'Legal').map(([heading, links]) => <nav key={heading} aria-label={heading}><h2>{heading}</h2>{links.map((link) => link.to ? <Link key={link.label} to={link.to}>{link.label}</Link> : <button key={link.label} onClick={() => link.quote ? openQuoteForm() : go(link.section)}>{link.label}</button>)}</nav>)}
      <div className="footer-channels"><h2>Contact details</h2><a href={CONTACT_CHANNELS.whatsapp} target="_blank" rel="noreferrer"><FaWhatsapp /> WhatsApp us</a><a href={`tel:${CONTACT_CHANNELS.phone}`}><FiPhone /> {COMPANY.phone}</a><a href={`https://maps.google.com/?q=${encodeURIComponent(COMPANY.mapQuery)}`} target="_blank" rel="noreferrer">{COMPANY.address} <FiArrowUpRight /></a><div className="footer-socials">{SOCIALS.map(({ label, href, icon: Icon }) => <a href={href} key={label} aria-label={label} target="_blank" rel="noreferrer"><Icon /></a>)}</div></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} {COMPANY.legalName}</span><div><Link to="/contact">Contact</Link><Link to="/privacy-policy">Privacy</Link><Link to="/terms">Terms</Link><button onClick={() => scrollToTarget(0)}>Back to top ↑</button></div></div>
  </div></footer>
}
