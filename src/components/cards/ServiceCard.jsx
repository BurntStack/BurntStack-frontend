import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn.js'
import { fadeInUp } from '@/lib/motion.js'

/**
 * Service card with intentional hierarchy: an index, an icon tile, title,
 * supporting copy and a quiet "Learn more" affordance. Restrained hover —
 * a top accent rule, a hairline border shift and a subtle lift.
 */
export default function ServiceCard({ icon: Icon, title, description, index, to = '/services' }) {
  return (
    <motion.div variants={fadeInUp}>
      <Link
        to={to}
        className={cn(
          'group relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white p-6',
          'transition-colors duration-150 ease-out hover:border-line-strong hover:shadow-sm',
        )}
      >
        {/* top accent rule on hover */}
        <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-orange-500 transition-transform duration-150 ease-out group-hover:scale-x-100" />

        <div className="flex items-center justify-between">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-sand text-xl text-ink transition-colors duration-300 group-hover:bg-orange-500 group-hover:text-white">
            <Icon />
          </span>
          {index != null && (
            <span className="font-display text-sm font-semibold text-line-strong">
              {String(index).padStart(2, '0')}
            </span>
          )}
        </div>

        <h3 className="mt-5 font-display text-lg font-semibold text-ink">{title}</h3>
        <p className="mt-2 flex-1 text-[0.925rem] leading-relaxed text-slate">{description}</p>

        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600">
          Learn more
          <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </Link>
    </motion.div>
  )
}
