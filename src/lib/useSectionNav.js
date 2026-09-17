import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { scrollToTarget } from '@/lib/scroll.js'

// The target may belong to a route that is only now mounting, and
// AnimatePresence runs in "wait" mode so the outgoing page finishes its
// exit first. Give it a bounded window to appear.
const WAIT_MS = 1500

function scrollWhenPresent(id) {
  const deadline = performance.now() + WAIT_MS
  const attempt = () => {
    const el = document.getElementById(id)
    if (el) return scrollToTarget(el)
    if (performance.now() < deadline) requestAnimationFrame(attempt)
    return undefined
  }
  requestAnimationFrame(attempt)
}

/**
 * Navigates to a section of the landing page without putting a fragment in
 * the URL.
 *
 * These were `<Link to="/#pricing">`, which left `burntstack.com/#pricing`
 * in the address bar - meaningless to a visitor, and ugly if they copy the
 * link. Scrolling is a view concern, so it is handled directly instead of
 * being encoded into the location.
 *
 * Arriving from another route passes the target through router state
 * rather than scrolling immediately: ScrollToTop also fires on that
 * navigation, and without this the two race and the reader lands at the
 * top of the page instead of the section they asked for.
 */
export function useSectionNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return useCallback(
    (id) => {
      if (pathname === '/') scrollWhenPresent(id)
      else navigate('/', { state: { scrollTo: id } })
    },
    [navigate, pathname],
  )
}

export { scrollWhenPresent }
