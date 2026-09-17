import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToTarget } from '@/lib/scroll.js'

// AnimatePresence runs in "wait" mode (see App.jsx), so on a cross-page
// jump like /portfolio -> /#pricing the outgoing page has to finish its
// ~120ms exit before the incoming one mounts. This effect fires well
// before that, when the target section does not exist yet - so give it a
// bounded window to appear rather than measuring a DOM that isn't there.
const TARGET_WAIT_MS = 1500

/**
 * Owns scroll position on navigation. Without a hash, every route change
 * starts at the top; with one, it scrolls to that section instead.
 *
 * Same-page section links reach this too: the navbar and CTAs are router
 * links, so clicking "Pricing" on the homepage changes `hash` without
 * changing `pathname` and this effect runs. Keeping this as the single
 * entry point is deliberate - see lib/scroll.js for what happened when
 * Lenis was also allowed to handle anchors itself.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      scrollToTarget(0, { immediate: true })
      return undefined
    }

    let frame
    const deadline = performance.now() + TARGET_WAIT_MS

    const attempt = () => {
      const el = document.querySelector(hash)
      if (el) {
        scrollToTarget(el)
        return
      }
      if (performance.now() < deadline) {
        frame = requestAnimationFrame(attempt)
      }
    }

    frame = requestAnimationFrame(attempt)
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}
