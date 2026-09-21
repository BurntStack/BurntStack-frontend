import { cn } from '@/utils/cn.js'

/**
 * Flat backdrop for hero bands. The hairline grid and its radial mask were
 * removed: a masked grid fading into a glow is decoration standing in for
 * hierarchy, and the bands below it already carry their own rules.
 */
export default function BackgroundFX({ className }) {
  return <div aria-hidden className={cn('pointer-events-none absolute inset-0 -z-10 bg-paper', className)} />
}
