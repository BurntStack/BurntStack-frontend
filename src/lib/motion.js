/**
 * Shared Framer Motion variants for consistent, professional motion.
 * Keep animations subtle: fade, slide, scale, stagger.
 */

// Snappy, restrained ease-out. Reveals are quick and subtle, not slow drifts.
const EASE = [0.16, 1, 0.3, 1]

export const fadeInUp = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3, ease: EASE } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.98 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: EASE } },
}

export const staggerContainer = (stagger = 0.05, delay = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
})

// Common viewport config so sections animate once as they enter view.
export const viewportOnce = { once: true, amount: 0.2 }
