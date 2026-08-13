import { cn } from '@/utils/cn.js'

/** Standard vertical rhythm wrapper for page sections. */
export default function Section({ id, className, children, ...props }) {
  return (
    <section id={id} className={cn('relative py-16 sm:py-24', className)} {...props}>
      {children}
    </section>
  )
}
