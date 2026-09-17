import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn.js'

// White on orange-500 measures 3.45:1, which is below the 4.5:1 a normal
// button label needs. orange-600 measures 4.55:1, so the solid variants
// start there and darken on hover rather than the other way round.
const VARIANTS = {
  primary:
    'bg-orange-600 text-white shadow-xs hover:bg-orange-700 active:translate-y-px',
  secondary:
    'bg-white text-ink border border-line-strong hover:border-ink/25 hover:bg-ivory active:translate-y-px',
  ghost: 'text-slate hover:text-ink hover:bg-sand',
  outline: 'text-orange-700 border border-orange-600/40 hover:bg-orange-50 active:translate-y-px',
  link: 'text-orange-700 hover:text-orange-800 underline-offset-4 hover:underline px-0',
}

const SIZES = {
  sm: 'h-10 px-4 text-[0.85rem] gap-1.5 rounded-md',
  md: 'h-11 px-5 text-[0.9rem] gap-2 rounded-lg',
  lg: 'h-12 px-6 text-[0.95rem] gap-2 rounded-lg',
}

/** Polymorphic button. Renders as <Link>, <a> or <button> depending on props. */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  className,
  ...props
}) {
  const classes = cn(
    'inline-flex items-center justify-center font-semibold tracking-[-0.01em] whitespace-nowrap',
    'transition-colors duration-150 ease-out',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500',
    'disabled:opacity-55 disabled:pointer-events-none',
    SIZES[size],
    VARIANTS[variant],
    className,
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
