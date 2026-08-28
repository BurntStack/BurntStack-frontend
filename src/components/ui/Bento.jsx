import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn.js'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion.js'

/**
 * Shared bento primitives used across every page. A `BentoGrid` is a 6-column
 * (desktop) CSS grid that collapses to 2 columns on mobile; `BentoCard` tiles
 * declare their own `span` so hierarchy comes from size, not extra chrome.
 */

const TONES = {
  surface: 'border-line bg-white hover:border-orange-300/70',
  ivory: 'border-line bg-ivory hover:border-orange-300/70',
  ink: 'border-ink/80 bg-ink text-white hover:border-orange-400/60',
  brand: 'border-orange-600 bg-gradient-to-br from-orange-500 to-orange-600 text-white hover:brightness-[1.04]',
}

/** Animated 6-col (desktop) / 4-col (tablet) / 2-col (mobile) grid. */
export function BentoGrid({ children, className, cols = 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-6', align = 'stretch', stagger = 0.07, as = 'div', ...props }) {
  const Tag = motion[as] || motion.div
  return (
    <Tag
      variants={staggerContainer(stagger)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={cn('grid auto-rows-[minmax(0,auto)] gap-4 sm:gap-5', align === 'start' ? 'items-start' : 'items-stretch', cols, className)}
      {...props}
    >
      {children}
    </Tag>
  )
}

/**
 * A single bento tile. Renders as a `Link`/`a`/`div` depending on `to`/`href`,
 * always fills its grid cell, and gets the restrained "active grid" hover
 * treatment: a quiet lift plus an orange border-glow (no heavy shadow).
 */
export function BentoCard({
  span = 'col-span-2 lg:col-span-3',
  tone = 'surface',
  size = 'md',
  direction = 'col',
  to,
  href,
  onClick,
  hover = true,
  className,
  children,
  ...props
}) {
  const Comp = to ? Link : href ? 'a' : onClick ? 'button' : 'div'
  const linkProps = to ? { to } : href ? { href, target: '_blank', rel: 'noreferrer' } : {}

  return (
    <motion.div variants={fadeInUp} className={span}>
      <Comp
        {...linkProps}
        onClick={onClick}
        className={cn(
          'group relative flex h-full w-full overflow-hidden rounded-bento border text-left transition-all duration-300 ease-out',
          direction === 'row' ? 'flex-row' : 'flex-col',
          size === 'sm' ? 'p-5 sm:p-6' : size === 'none' ? '' : 'p-6 sm:p-8',
          TONES[tone],
          hover && 'hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]',
          className,
        )}
        {...props}
      >
        {children}
      </Comp>
    </motion.div>
  )
}

/** Small square icon chip used inside bento tiles, consistent across the site. */
export function BentoIcon({ icon: Icon, tone = 'default', className }) {
  return (
    <span
      className={cn(
        'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl transition-colors duration-300',
        tone === 'onDark'
          ? 'bg-white/10 text-white group-hover:bg-white/20'
          : 'bg-sand text-ink group-hover:bg-orange-500 group-hover:text-white',
        className,
      )}
    >
      <Icon />
    </span>
  )
}

/** Compact eyebrow + heading combo sized for a bento tile rather than a full section. */
export function BentoHeading({ eyebrow, title, description, tone = 'default', className }) {
  const isDark = tone === 'onDark' || tone === 'onBrand'
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2.5">
          <span className={cn('h-px w-6', isDark ? 'bg-orange-400' : 'bg-orange-500')} />
          <span
            className={cn(
              'text-xs font-semibold uppercase tracking-[0.16em]',
              isDark ? 'text-orange-300' : 'text-orange-600',
            )}
          >
            {eyebrow}
          </span>
        </span>
      )}
      <h2 className={cn('t-h2 font-bold', isDark ? 'text-white' : 'text-ink')}>{title}</h2>
      {description && (
        <p className={cn('t-lead max-w-xl', isDark ? 'text-white/70' : 'text-slate')}>{description}</p>
      )}
    </div>
  )
}
