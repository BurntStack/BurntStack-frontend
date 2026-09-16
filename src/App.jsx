import { Suspense, lazy, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from '@/components/layout/Layout.jsx'
import ScrollToTop from '@/components/layout/ScrollToTop.jsx'
import PageTransition from '@/components/layout/PageTransition.jsx'
import { initCal } from '@/lib/cal.js'
// Home is NOT code-split like the other pages: it's the entry point for
// essentially every fresh visit (direct traffic, search, social), so its
// chunk is downloaded immediately regardless - lazy-loading it bought
// nothing and cost something real. Measured directly (Playwright's
// PerformanceObserver, reproduced with every third-party script blocked
// to rule those out): the Suspense fallback's tiny spinner (min-h-[60vh])
// briefly occupied the page before the real, much taller Home content
// swapped in, and the footer jumping from "just below a small spinner" to
// "the bottom of the full homepage" was a single ~0.4 CLS layout shift -
// by far the single biggest layout-stability issue on the site. Every
// other route still lazy-loads normally: those benefit from it, and a
// user landing there already has the app shell loaded, so any fallback
// gap is comparatively small.
import Home from '@/pages/Home.jsx'

// Code-split every other page for a small initial bundle (better Lighthouse score).
const About = lazy(() => import('@/pages/About.jsx'))
const Services = lazy(() => import('@/pages/Services.jsx'))
const Solutions = lazy(() => import('@/pages/Solutions.jsx'))
const Technologies = lazy(() => import('@/pages/Technologies.jsx'))
const Portfolio = lazy(() => import('@/pages/Portfolio.jsx'))
const CaseStudies = lazy(() => import('@/pages/CaseStudies.jsx'))
const Industries = lazy(() => import('@/pages/Industries.jsx'))
const Blog = lazy(() => import('@/pages/Blog.jsx'))
const BlogPost = lazy(() => import('@/pages/BlogPost.jsx'))
const Careers = lazy(() => import('@/pages/Careers.jsx'))
const Contact = lazy(() => import('@/pages/Contact.jsx'))
const Privacy = lazy(() => import('@/pages/Privacy.jsx'))
const Terms = lazy(() => import('@/pages/Terms.jsx'))
const NotFound = lazy(() => import('@/pages/NotFound.jsx'))

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
  // page (Navbar, CtaBanner) without every one of them re-initializing it.
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
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
            <Route path="/solutions" element={<PageTransition><Solutions /></PageTransition>} />
            <Route path="/technologies" element={<PageTransition><Technologies /></PageTransition>} />
            <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
            <Route path="/case-studies" element={<PageTransition><CaseStudies /></PageTransition>} />
            <Route path="/industries" element={<PageTransition><Industries /></PageTransition>} />
            <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
            <Route path="/blog/:slug" element={<PageTransition><BlogPost /></PageTransition>} />
            <Route path="/careers" element={<PageTransition><Careers /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="/privacy-policy" element={<PageTransition><Privacy /></PageTransition>} />
            <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </Layout>
  )
}
