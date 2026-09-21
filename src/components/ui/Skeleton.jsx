import { cn } from '@/utils/cn.js'

/**
 * Loading placeholders that hold the shape of the content they stand in for.
 *
 * The site previously answered every wait with either a centred spinner or a
 * plain grey box. Both reserve the wrong amount of space, so the real content
 * arriving shifts the page - the same layout-shift problem documented for the
 * Home route in App.jsx, just smaller. These block out the actual card, so
 * the swap is a fill rather than a jump.
 *
 * The sweep is a background-position animation on a static gradient, which
 * stays off the layout and paint path. `prefers-reduced-motion` drops it to a
 * flat tint rather than removing the placeholder.
 */

/** One placeholder bar. `w` and `h` accept any Tailwind sizing classes. */
export function SkeletonBar({ className }) {
  return <div className={cn('skeleton-bar', className)} />
}

/** Placeholder for an article/journal card: art block, title, meta row. */
export function SkeletonCard({ art = 'h-[220px]' }) {
  return (
    <div className="flex flex-col gap-4">
      <SkeletonBar className={cn('w-full rounded-md', art)} />
      <SkeletonBar className="h-3 w-24" />
      <SkeletonBar className="h-5 w-[85%]" />
      <SkeletonBar className="h-5 w-[60%]" />
      <SkeletonBar className="mt-2 h-3 w-40" />
    </div>
  )
}

/**
 * Route-level fallback. Mirrors the supporting routes' shape: a page hero
 * (label, oversized title, rule) followed by a three-card body.
 */
export default function PageSkeleton() {
  return (
    <div role="status" aria-label="Loading page" className="w-full">
      <section className="border-b border-line bg-paper pt-32 pb-14 sm:pt-40 sm:pb-20">
        <div className="mx-auto w-full max-w-[1320px] px-6 sm:px-14">
          <SkeletonBar className="h-3 w-32" />
          <SkeletonBar className="mt-6 h-16 w-[min(100%,34rem)] sm:h-24" />
          <div className="mt-10 border-t border-line pt-8">
            <SkeletonBar className="h-4 w-[min(100%,28rem)]" />
          </div>
        </div>
      </section>
      <div className="mx-auto grid w-full max-w-[1320px] gap-8 px-6 py-16 sm:px-14 md:grid-cols-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  )
}
