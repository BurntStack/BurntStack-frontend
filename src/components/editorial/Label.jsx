import { motion } from 'framer-motion'
import { cn } from '@/utils/cn.js'
import { fadeInUp } from '@/lib/motion.js'

/**
 * The small tracked label that opens every band, optionally with a section
 * numeral. Numbering the sections is what makes a long single-page site
 * feel navigable rather than endless - it tells the reader where they are.
 */
export default function Label({ children, index, tone = 'default', className }) {
  const onDark = tone === 'onDark'
  return (
    <motion.div
      variants={fadeInUp}
      className={cn(
        't-label flex items-center gap-3',
        onDark ? 'text-orange-300' : 'text-orange-600',
        className,
      )}
    >
      <span className={cn('h-px w-8', onDark ? 'bg-orange-300/60' : 'bg-orange-500/60')} />
      <span>{children}</span>
      {index && (
        <span className={onDark ? 'text-white/35' : 'text-mute'}>{index}</span>
      )}
    </motion.div>
  )
}
