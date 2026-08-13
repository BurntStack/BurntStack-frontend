import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn.js'

/**
 * BurntStack logo — "Layered Flame" mark + wordmark.
 * The flame reads as "Burnt"; the two horizontal cuts read as "Stack".
 */
export function LogoMark({ className }) {
  return (
    <svg viewBox="0 0 32 32" className={className} role="img" aria-hidden="true">
      <defs>
        <linearGradient id="bs-flame" x1="16" y1="2" x2="16" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f8b724" />
          <stop offset="0.55" stopColor="#ef7d1a" />
          <stop offset="1" stopColor="#d1500f" />
        </linearGradient>
      </defs>
      {/* Flame silhouette */}
      <path
        d="M16 2.5c4 6 8 8.5 8 14a8 8 0 1 1-16 0c0-4.5 3-8 5-9.5-.4 2.6.6 4 1.7 4.4C15 11 15.2 6.5 16 2.5Z"
        fill="url(#bs-flame)"
      />
      {/* Two layer cuts = the "stack" */}
      <path d="M11 17.5h10" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M12 21.5h8" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

export default function Logo({ className, showText = true }) {
  return (
    <Link
      to="/"
      className={cn('group flex items-center gap-2.5', className)}
      aria-label="BurntStack home"
    >
      <LogoMark className="h-8 w-8 shrink-0" />
      {showText && (
        <span className="font-display text-[1.2rem] font-bold tracking-[-0.03em] text-ink">
          Burnt<span className="text-orange-600">Stack</span>
        </span>
      )}
    </Link>
  )
}
