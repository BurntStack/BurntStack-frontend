import { cn } from '@/utils/cn.js'

/**
 * Editorial eyebrow label: a short brand-coloured rule followed by
 * upper-case tracked text. Sets an intentional, designed tone above headings.
 */
export default function Badge({ children, className }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span className="h-px w-6 bg-orange-500" />
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-600">
        {children}
      </span>
    </span>
  )
}
