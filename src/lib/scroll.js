/**
 * One owner for programmatic scrolling.
 *
 * Lenis runs its own rAF loop and continuously writes the scroll position,
 * so `window.scrollTo({ behavior: 'smooth' })` and Lenis' own `scrollTo`
 * fight if both are allowed to run: measured on the offer landing page,
 * a click on "Get this quote" travelled about 1,200px of the required
 * 5,300 and then stopped dead, leaving the visitor in the middle of a
 * section they never asked for. Everything that needs to move the page
 * goes through here instead, and this module picks whichever mechanism is
 * actually in charge.
 */

let lenis = null

/** Called by useSmoothScroll on mount/unmount. Null when reduced-motion is on. */
export function registerLenis(instance) {
  lenis = instance
}

// Clears the fixed navbar, which would otherwise sit on top of the first
// line of whatever section was targeted.
export const SCROLL_OFFSET = -88

/**
 * @param {string|number|HTMLElement} target selector, offset or element
 * @param {{ immediate?: boolean }} [options]
 */
export function scrollToTarget(target, { immediate = false } = {}) {
  if (lenis) {
    // Lenis caches the document height and clamps every scroll to it. On a
    // cross-page jump the cache still holds the *previous* route's height,
    // so arriving at the long landing page from the short /portfolio one
    // clamped a 3,500px scroll down to about 1,000px and stopped mid-page.
    // Re-measuring first is what makes the target reachable at all.
    lenis.resize()
    lenis.scrollTo(target, { offset: SCROLL_OFFSET, immediate })
    return
  }

  // Reduced motion, or before Lenis has mounted.
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'auto' })
    return
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (!el) return
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY + SCROLL_OFFSET,
    behavior: 'auto',
  })
}
