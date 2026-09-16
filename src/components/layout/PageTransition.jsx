import { motion } from 'framer-motion'

// Set once, for the lifetime of the tab - true only until the very first
// PageTransition ever mounts. A hard reload resets it (fresh module scope).
let hasMountedOnce = false

/**
 * Fade/slide transition applied to every routed page. AnimatePresence runs
 * in "wait" mode (see App.jsx) so the exit must fully finish before the next
 * page even starts entering - a slow exit here means real, felt dead time
 * after every click before anything happens. Exit is deliberately snappier
 * than enter for that reason; enter can afford to be a little more relaxed
 * since content is already appearing by then.
 *
 * Measured with Lighthouse: on first load, this component's initial
 * opacity:0 was directly responsible for ~92% of LCP time (7.7s of an 8.3s
 * LCP was "Render Delay" - the hero H1 was in the DOM almost immediately,
 * just invisible until the fade-in fired). `initial={false}` skips the
 * animated entrance only on that very first mount, so first paint isn't
 * gated behind an animation at all; every subsequent client-side route
 * change still gets the normal fade/slide.
 */
export default function PageTransition({ children }) {
  const skipEntranceAnimation = !hasMountedOnce
  hasMountedOnce = true

  return (
    <motion.div
      initial={skipEntranceAnimation ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } }}
      exit={{ opacity: 0, transition: { duration: 0.12, ease: 'easeIn' } }}
    >
      {children}
    </motion.div>
  )
}
