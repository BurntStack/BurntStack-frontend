import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from '@/components/ui/Logo.jsx'
import { useQuoteForm } from '@/components/lead/useQuoteForm.js'
import { useSectionNav } from '@/lib/useSectionNav.js'
import { ArrowUpRight, Close, Menu } from '@/components/icons/index.jsx'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const { openQuoteForm } = useQuoteForm()
  const go = useSectionNav()
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    const close = (event) => { if (event.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])
  const section = (id) => { setOpen(false); go(id) }
  return <header className="studio-header"><div className="studio-wrap studio-nav"><Logo /><nav className={open ? 'studio-navigation is-open' : 'studio-navigation'} aria-label="Primary" id="primary-menu"><button onClick={() => section('work')}>Selected work</button><button onClick={() => section('services')}>Services</button><button onClick={() => section('process')}>Process</button><button onClick={() => section('booking')}>Consultation</button><Link to="/blog">Technical notes <ArrowUpRight /></Link></nav><div className="nav-actions"><button className="nav-project" onClick={() => { setOpen(false); openQuoteForm() }}>Discuss a project <ArrowUpRight /></button><button className="nav-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="primary-menu" onClick={() => setOpen(!open)}>{open ? <Close /> : <Menu />}</button></div></div></header>
}
