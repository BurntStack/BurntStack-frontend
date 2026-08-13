import { motion, useScroll, useSpring } from 'framer-motion'
import { useSmoothScroll } from '@/hooks/useSmoothScroll.js'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import FloatingActions from './FloatingActions.jsx'

/** App shell: smooth scroll, scroll-progress bar, navbar, page content, footer. */
export default function Layout({ children }) {
  useSmoothScroll()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.3 })

  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Skip link for keyboard users */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-orange-500 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[55] h-0.5 origin-left bg-orange-500"
      />

      <Navbar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <FloatingActions />
    </div>
  )
}
