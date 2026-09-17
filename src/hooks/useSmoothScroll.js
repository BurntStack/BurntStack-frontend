import { useEffect } from 'react'
import Lenis from 'lenis'
import { registerLenis } from '@/lib/scroll.js'

/**
 * Initialises Lenis smooth scrolling for the whole app.
 * Automatically disabled when the user prefers reduced motion.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return undefined

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Deliberately NOT using Lenis' `anchors` option: the offer page's
      // section links are router links, so they already come through
      // ScrollToTop's hash branch. Enabling both meant two animations
      // racing for the same scroll position and neither finishing.
    })

    registerLenis(lenis)

    let frame
    function raf(time) {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      registerLenis(null)
      lenis.destroy()
    }
  }, [])
}
