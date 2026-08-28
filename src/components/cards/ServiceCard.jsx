import { FiArrowRight } from 'react-icons/fi'
import { BentoCard, BentoIcon } from '@/components/ui/Bento.jsx'

/**
 * A service as a bento tile. `featured` tiles run wider (set via `span` by the
 * caller) and get a slightly larger type scale; size itself signals priority.
 */
export default function ServiceCard({ icon, title, description, index, span, featured = false, to = '/services' }) {
  return (
    <BentoCard to={to} span={span} tone="surface">
      <div className="flex items-center justify-between">
        <BentoIcon icon={icon} />
        {index != null && (
          <span className="font-display text-sm font-semibold text-line-strong">
            {String(index).padStart(2, '0')}
          </span>
        )}
      </div>

      <h3 className={featured ? 'mt-6 font-display text-2xl font-semibold text-ink' : 'mt-5 font-display text-lg font-semibold text-ink'}>
        {title}
      </h3>
      <p className={featured ? 'mt-3 max-w-md flex-1 text-[0.975rem] leading-relaxed text-slate' : 'mt-2 flex-1 text-[0.925rem] leading-relaxed text-slate'}>
        {description}
      </p>

      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600">
        Learn more
        <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </BentoCard>
  )
}
