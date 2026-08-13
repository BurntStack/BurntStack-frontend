import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiArrowUpRight } from 'react-icons/fi'
import { NAV_LINKS } from '@/data/site.js'
import { cn } from '@/utils/cn.js'
import Container from '@/components/ui/Container.jsx'
import Button from '@/components/ui/Button.jsx'
import Logo from '@/components/ui/Logo.jsx'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          'transition-all duration-300',
          scrolled
            ? 'border-b border-line bg-canvas/85 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <Container
          className={cn(
            'flex items-center justify-between gap-6 transition-all duration-300',
            scrolled ? 'h-16' : 'h-20',
          )}
        >
          <Logo />

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'group relative text-[0.9rem] font-medium transition-colors',
                    isActive ? 'text-ink' : 'text-slate hover:text-ink',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={cn(
                        'absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-orange-500 transition-all duration-300',
                        isActive ? 'w-full' : 'w-0 group-hover:w-full',
                      )}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button to="/contact" size="sm" variant="primary" className="hidden sm:inline-flex">
              Free Consultation
              <FiArrowUpRight className="h-4 w-4" />
            </Button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line-strong text-ink transition-colors hover:bg-sand lg:hidden"
            >
              {open ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
            </button>
          </div>
        </Container>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="border-b border-line bg-canvas lg:hidden"
          >
            <Container className="flex flex-col py-3">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'border-b border-line/70 py-3.5 text-[0.95rem] font-medium transition-colors last:border-0',
                      isActive ? 'text-orange-600' : 'text-slate hover:text-ink',
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Button to="/contact" className="mt-4 w-full">
                Free Consultation <FiArrowUpRight className="h-4 w-4" />
              </Button>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
