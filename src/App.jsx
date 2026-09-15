import { Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from '@/components/layout/Layout.jsx'
import ScrollToTop from '@/components/layout/ScrollToTop.jsx'
import PageTransition from '@/components/layout/PageTransition.jsx'

// Code-split every page for a small initial bundle (better Lighthouse score).
const Home = lazy(() => import('@/pages/Home.jsx'))
const About = lazy(() => import('@/pages/About.jsx'))
const Services = lazy(() => import('@/pages/Services.jsx'))
const Solutions = lazy(() => import('@/pages/Solutions.jsx'))
const Technologies = lazy(() => import('@/pages/Technologies.jsx'))
const Portfolio = lazy(() => import('@/pages/Portfolio.jsx'))
const CaseStudies = lazy(() => import('@/pages/CaseStudies.jsx'))
const Industries = lazy(() => import('@/pages/Industries.jsx'))
const Blog = lazy(() => import('@/pages/Blog.jsx'))
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
