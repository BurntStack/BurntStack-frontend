import { Suspense, lazy, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from '@/components/layout/Layout.jsx'
import ScrollToTop from '@/components/layout/ScrollToTop.jsx'
import PageTransition from '@/components/layout/PageTransition.jsx'
import { initCal } from '@/lib/cal.js'
// Home is NOT code-split like the other pages: it's the entry point for
// essentially every fresh visit (direct traffic, search, social), so its
// chunk is downloaded immediately regardless - lazy-loading it bought
// nothing and cost something real. Measured directly with Playwright's
// PerformanceObserver (reproduced with Lenis disabled and every third-party
// script network-blocked, to rule those out as the cause): the Suspense
// fallback's small spinner briefly occupied the page before Home's much
// taller real content swapped in, and the footer jumping from "just below
// a small spinner" to "the bottom of the full homepage" was a single,
// huge ~0.4 CLS layout shift - the single biggest layout-stability issue
// on the site. Preloading the lazy chunk earlier doesn't help: CLS scores
// the shift itself, not how long the wrong layout was visible, so even a
// near-instant swap still counts. (Un-lazying this did have a real side
// effect - it changed Rollup's automatic chunk boundaries for unrelated
// shared modules - see the manualChunks comment in vite.config.js for how
// that's pinned back down.) Every other route still lazy-loads normally:
// those benefit from it, and a user landing there already has the app
// shell loaded, so any fallback gap is comparatively small.
import Home from '@/pages/Home.jsx'

const Portfolio = lazy(() => import('@/pages/Portfolio.jsx'))
const Blog = lazy(() => import('@/pages/Blog.jsx'))
const BlogPost = lazy(() => import('@/pages/BlogPost.jsx'))
const Contact = lazy(() => import('@/pages/Contact.jsx'))
const Privacy = lazy(() => import('@/pages/Privacy.jsx'))
const Terms = lazy(() => import('@/pages/Terms.jsx'))
const NotFound = lazy(() => import('@/pages/NotFound.jsx'))

/**
 * Routes that used to be their own page and are now sections of the offer
 * landing page (or folded into another route). These are kept as permanent
 * client-side redirects rather than deleted outright: they're in Google's
 * index, in the old sitemap and in any link anyone has shared, and a 404
 * on all of them would throw that away for nothing.
 */
const REDIRECTS = [
  ['/about', '/#work'],
  ['/services', '/#services'],
  ['/solutions', '/#services'],
  ['/technologies', '/#services'],
  ['/industries', '/#services'],
  ['/case-studies', '/portfolio'],
  ['/careers', '/contact'],
]

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-ember-500/30 border-t-ember-500" />
    </div>
  )
}

export default function App() {
  const location = useLocation()

  // Loads once, app-wide, so the "Free Consultation" popup works from any
  // page (Navbar, Contact) without every one of them re-initializing it.
  // Deferred via requestIdleCallback: this SDK isn't needed until someone
  // actually clicks a booking button, so it shouldn't compete with the
  // current page's own content/data fetches for bandwidth and main-thread
  // time right after navigation.
  useEffect(() => {
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 1))
    const cancelIdle = window.cancelIdleCallback || clearTimeout
    const id = idle(() => initCal())
    return () => cancelIdle(id)
  }, [])

  return (
    <Layout>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
            <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
            <Route path="/blog/:slug" element={<PageTransition><BlogPost /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="/privacy-policy" element={<PageTransition><Privacy /></PageTransition>} />
            <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />

            {REDIRECTS.map(([from, to]) => (
              <Route key={from} path={from} element={<Navigate to={to} replace />} />
            ))}

            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </Layout>
  )
}
