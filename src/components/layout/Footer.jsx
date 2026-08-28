import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMail, FiPhone, FiMapPin, FiArrowRight } from 'react-icons/fi'
import { COMPANY, FOOTER_LINKS, SOCIALS } from '@/data/site.js'
import Container from '@/components/ui/Container.jsx'
import Logo from '@/components/ui/Logo.jsx'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const onSubscribe = (e) => {
    e.preventDefault()
    if (!email) return
    setDone(true)
    setEmail('')
    setTimeout(() => setDone(false), 4000)
  }

  return (
    <footer className="bg-ink text-white/70">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          {/* Brand + newsletter */}
          <div className="flex flex-col gap-6">
            <Logo tone="onDark" tagline />
            <p className="max-w-sm text-sm leading-relaxed text-white/55">
              {COMPANY.legalName}. We design and build software that powers ambitious businesses,
              from websites and mobile apps to AI and enterprise platforms.
            </p>

            <form onSubmit={onSubscribe} className="max-w-sm">
              <label htmlFor="newsletter" className="mb-2 block text-sm font-semibold text-white">
                Subscribe to our newsletter
              </label>
              <div className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 p-1.5 pl-4 transition-colors focus-within:border-orange-400/60">
                <input
                  id="newsletter"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-orange-500 text-white transition-colors hover:bg-orange-600"
                >
                  <FiArrowRight className="h-4 w-4" />
                </button>
              </div>
              {done && <p className="mt-2 text-xs text-amber-400">Thanks! You’re subscribed.</p>}
            </form>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
              <div key={heading}>
                <h3 className="mb-4 text-sm font-semibold text-white">{heading}</h3>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to} className="text-sm text-white/55 transition-colors hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact row */}
        <div className="mt-14 grid gap-4 border-t border-white/10 pt-8 text-sm sm:grid-cols-3">
          <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2.5 text-white/60 transition-colors hover:text-white">
            <FiMail className="h-4 w-4 text-orange-400" /> {COMPANY.email}
          </a>
          <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-2.5 text-white/60 transition-colors hover:text-white">
            <FiPhone className="h-4 w-4 text-orange-400" /> {COMPANY.phone}
          </a>
          <span className="flex items-center gap-2.5 text-white/60">
            <FiMapPin className="h-4 w-4 text-orange-400" /> {COMPANY.address}
          </span>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-white/45">
            © {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.
            {' · '}
            <Link to="/portal/login" className="hover:text-white/70">Employee Login</Link>
          </p>
          <div className="flex items-center gap-2">
            {SOCIALS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/12 text-white/60 transition-colors hover:border-orange-400/50 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}
