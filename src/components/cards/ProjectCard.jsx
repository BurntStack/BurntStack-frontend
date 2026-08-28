import { FiExternalLink, FiGithub, FiArrowUpRight } from 'react-icons/fi'
import { cn } from '@/utils/cn.js'
import { BentoCard } from '@/components/ui/Bento.jsx'

/** Case-study bento tile with a full-bleed gradient cover and a details body. */
export default function ProjectCard({ project, span = 'col-span-2 lg:col-span-3', coverHeight = 'h-48' }) {
  const { name, category, gradient, tech, problem, solution, results, liveUrl, githubUrl } = project

  return (
    <BentoCard span={span} tone="surface" size="none">
      {/* Cover */}
      <div className={cn('relative overflow-hidden bg-gradient-to-br', coverHeight, gradient)}>
        <div className="absolute inset-0 bg-dot-grid opacity-40" />
        <span className="absolute left-5 top-5 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-ink backdrop-blur">
          {category}
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-2xl font-extrabold tracking-tight text-ink/85 transition-transform duration-500 group-hover:scale-105">
            {name}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
        <div className="flex flex-wrap gap-2">
          {tech.map((t) => (
            <span key={t} className="rounded-full border border-line bg-sand px-2.5 py-1 text-xs font-medium text-slate">
              {t}
            </span>
          ))}
        </div>

        <dl className="space-y-2.5 text-sm">
          <div>
            <dt className="font-semibold text-ink">Problem</dt>
            <dd className="text-slate">{problem}</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">Solution</dt>
            <dd className="text-slate">{solution}</dd>
          </div>
          <div>
            <dt className="font-semibold text-orange-600">Results</dt>
            <dd className="text-slate">{results}</dd>
          </div>
        </dl>

        <div className="mt-auto flex items-center gap-3 border-t border-line pt-4">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 hover:gap-2"
            >
              Live Demo <FiExternalLink className="h-4 w-4" />
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="View source on GitHub"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate hover:text-ink"
            >
              <FiGithub className="h-4 w-4" /> Code
            </a>
          )}
          <FiArrowUpRight className="ml-auto h-5 w-5 text-slate transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange-600" />
        </div>
      </div>
    </BentoCard>
  )
}
