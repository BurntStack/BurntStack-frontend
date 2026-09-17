import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'
import { cn } from '@/utils/cn.js'
import { fadeInUp } from '@/lib/motion.js'

/**
 * A list of items separated by hairline rules rather than boxed into cards.
 *
 * This is the bento grid's direct replacement for repeating content
 * (services, steps, packages). Rules carry the same grouping information as
 * a border-plus-background card, at a fraction of the visual weight, and
 * they let each row run the full width - so a row can hold a numeral, a
 * title, a description and an action on one line at desktop width instead
 * of stacking them inside a narrow tile.
 */
export function RuleRow({ index, title, description, to, href, tone = 'default', children }) {
  const onDark = tone === 'onDark'
  const interactive = Boolean(to || href)
  const Comp = to ? Link : href ? 'a' : 'div'
  const linkProps = to ? { to } : href ? { href, target: '_blank', rel: 'noreferrer' } : {}

  return (
    <motion.div
      variants={fadeInUp}
      className={cn('border-b', onDark ? 'border-white/12' : 'border-line')}
    >
      <Comp
        {...linkProps}
        className={cn(
          'group grid w-full grid-cols-1 items-baseline gap-x-8 gap-y-2 py-7 text-left transition-colors duration-300 sm:py-9',
          'md:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1.1fr)_auto]',
          interactive && (onDark ? 'hover:bg-white/[0.03]' : 'hover:bg-sand/60'),
        )}
      >
        {index && (
          <span className={cn('t-numeral', onDark ? 'text-white/60' : 'text-mute')}>{index}</span>
        )}
        <h3
          className={cn(
            'font-display text-xl font-semibold tracking-[-0.02em] transition-colors duration-300 sm:text-2xl',
            onDark ? 'text-white group-hover:text-orange-300' : 'text-ink group-hover:text-orange-600',
          )}
        >
          {title}
        </h3>
        {description && (
          <p className={cn('text-[0.95rem] leading-relaxed', onDark ? 'text-white/55' : 'text-slate')}>
            {description}
          </p>
        )}
        <span className="flex items-center justify-start md:justify-end">
          {children ??
            (interactive && (
              <span
                className={cn(
                  'inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300',
                  onDark
                    ? 'border-white/15 text-white/60 group-hover:border-orange-300 group-hover:text-orange-300'
                    : 'border-line-strong text-mute group-hover:border-orange-500 group-hover:text-orange-600',
                  'group-hover:translate-x-0.5 group-hover:-translate-y-0.5',
                )}
              >
                <FiArrowUpRight className="h-4 w-4" />
              </span>
            ))}
        </span>
      </Comp>
    </motion.div>
  )
}

export default function RuleList({ tone = 'default', className, children }) {
  return (
    <div className={cn('border-t', tone === 'onDark' ? 'border-white/12' : 'border-line', className)}>
      {children}
    </div>
  )
}
