import { cn } from '@/utils/cn.js'

/**
 * Clean, solid backdrop for hero bands. No glowing gradient blobs, just a
 * faint hairline grid on the ivory wash that fades out toward the content.
 */
export default function BackgroundFX({ className, variant = 'default' }) {
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 -z-10 bg-ivory', className)}>
      {variant !== 'plain' && (
        <div className="absolute inset-0 bg-grid opacity-70 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      )}
    </div>
  )
}
