import { motion } from 'framer-motion'

/**
 * Fade/slide transition applied to every routed page. AnimatePresence runs
 * in "wait" mode (see App.jsx) so the exit must fully finish before the next
 * page even starts entering - a slow exit here means real, felt dead time
 * after every click before anything happens. Exit is deliberately snappier
 * than enter for that reason; enter can afford to be a little more relaxed
 * since content is already appearing by then.
 */
export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } }}
      exit={{ opacity: 0, transition: { duration: 0.12, ease: 'easeIn' } }}
    >
      {children}
    </motion.div>
  )
}
