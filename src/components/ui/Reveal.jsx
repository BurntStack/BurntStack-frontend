import { motion } from 'framer-motion'
import { fadeInUp, viewportOnce } from '@/lib/motion.js'

/**
 * Scroll-reveal wrapper. Animates children into view once, using the shared
 * fadeInUp variant by default.
 */
export default function Reveal({
  children,
  variants = fadeInUp,
  className,
  as = 'div',
  delay = 0,
  ...props
}) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={delay ? { delay } : undefined}
      {...props}
    >
      {children}
    </MotionTag>
  )
}
