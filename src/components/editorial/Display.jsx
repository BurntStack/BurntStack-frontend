import { motion } from 'framer-motion'
import { cn } from '@/utils/cn.js'
import { fadeInUp } from '@/lib/motion.js'

/**
 * A band's headline: uppercase sans, with an optional lowercase serif
 * italic phrase beneath it.
 *
 * That contrast is the whole typographic idea - tight uppercase display
 * type set against a relaxed serif italic. One voice states the claim, the
 * other softens it. Without the accent the headings read as shouting; with
 * it they read as written by someone.
 */
export default function Display({
  children,
  accent,
  as: Tag = 'h2',
  size = 'md',
  tone = 'default',
  className,
}) {
  const MotionTag = motion[Tag] || motion.h2
  const onDark = tone === 'onDark'
  return (
    <MotionTag
      variants={fadeInUp}
      className={cn(
        size === 'lg' ? 't-editorial' : 't-editorial-sm',
        onDark ? 'text-white' : 'text-ink',
        className,
      )}
    >
      {children}
      {accent && (
        <>
          <br />
          <span className={cn('t-accent', onDark ? 'text-orange-300' : 'text-orange-600')}>
            {accent}
          </span>
        </>
      )}
    </MotionTag>
  )
}
