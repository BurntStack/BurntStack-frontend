import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn.js'

/**
 * BurntStack logo mark: the brand's actual artwork (three stacked plates
 * dissolving into a rising flame), served as a cropped, transparent PNG
 * rather than a hand-approximated vector redraw.
 */
export function LogoMark({ className }) {
  return (
    <img
      src="/logo-mark.png"
      alt=""
      className={cn('object-contain', className)}
      width={256}
      height={256}
    />
  )
}

/**
 * `tone="onDark"` swaps the wordmark to white/orange-400 for dark surfaces
 * (the footer). `tagline` adds the "Technologies Pvt. Ltd." row from the
 * full brand lockup, used where there's room to show the full identity.
 */
export default function Logo({ className, showText = true, tagline = false, tone = 'default' }) {
  const isDark = tone === 'onDark'
  return (
    <Link
      to="/"
      className={cn('group inline-flex items-center gap-3', className)}
      aria-label="BurntStack home"
    >
      {isDark ? (
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/95 p-1.5">
          <LogoMark className="h-full w-full" />
        </span>
      ) : (
        <LogoMark className="h-12 w-12 shrink-0" />
      )}
      {showText && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              'font-display text-[1.5rem] font-bold tracking-[-0.03em]',
              isDark ? 'text-white' : 'text-ink',
            )}
          >
            Burnt<span className={isDark ? 'text-orange-400' : 'text-orange-600'}>Stack</span>
          </span>
          {tagline && (
            <span
              className={cn(
                'mt-2 flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em]',
                isDark ? 'text-white/40' : 'text-mute',
              )}
            >
              <span className={cn('h-px w-4', isDark ? 'bg-white/20' : 'bg-line-strong')} />
              Technologies Pvt. Ltd.
              <span className={cn('h-px w-4', isDark ? 'bg-white/20' : 'bg-line-strong')} />
            </span>
          )}
        </span>
      )}
    </Link>
  )
}
