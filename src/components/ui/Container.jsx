import { cn } from '@/utils/cn.js'

/** Centered, responsive max-width wrapper used across every section. */
export default function Container({ as: Tag = 'div', className, children }) {
  return (
    <Tag className={cn('w-full px-5 sm:px-8 lg:px-12', className)}>
      {children}
    </Tag>
  )
}
