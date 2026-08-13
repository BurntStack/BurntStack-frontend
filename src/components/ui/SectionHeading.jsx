import { motion } from 'framer-motion'
import { cn } from '@/utils/cn.js'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion.js'
import Badge from './Badge.jsx'

/**
 * Consistent, animated heading block. Supports left or centered alignment so
 * sections can vary their rhythm instead of all looking identical.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}) {
  const isCenter = align === 'center'
  return (
    <motion.div
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={cn(
        'flex flex-col gap-5',
        isCenter ? 'mx-auto max-w-2xl items-center text-center' : 'max-w-2xl items-start text-left',
        className,
      )}
    >
      {eyebrow && (
        <motion.div variants={fadeInUp}>
          <Badge>{eyebrow}</Badge>
        </motion.div>
      )}
      <motion.h2 variants={fadeInUp} className="t-h2 font-bold text-ink">
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeInUp}
          className={cn('t-lead text-slate', isCenter && 'max-w-xl')}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}
