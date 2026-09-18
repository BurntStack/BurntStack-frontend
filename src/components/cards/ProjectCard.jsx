import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub, FiArrowUpRight } from 'react-icons/fi'
import { cn } from '@/utils/cn.js'
import { fadeInUp } from '@/lib/motion.js'
import ProjectBrowser from './ProjectBrowser.jsx'

/**
 * A project as a full-width editorial entry: oversized name, details in a
 * readable column, cover as a wide band alongside. Replaces the bordered
 * bento tile, which boxed a case study into the same visual container as a
 * two-line service blurb.
 */
export default function ProjectCard({ project, coverHeight = 'h-56' }) {
  const { name, category, gradient, tech, blurb, problem, solution, results, liveUrl, githubUrl } =
    project
  const details = [
    ['Problem', problem],
    ['Solution', solution],
    ['Results', results],
  ].filter(([, v]) => v)

  return (
    <motion.article
      variants={fadeInUp}
      className={cn('group grid gap-8 border-b border-line py-12 lg:gap-12', !liveUrl && 'lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]')}
    >
      <div>
        <span className="t-label text-mute">{category}</span>
        {project.status && <span className="ml-3 rounded-full border border-line px-3 py-1 text-xs text-mute">{project.status}</span>}
        <h2 className="t-editorial-sm mt-4 text-ink transition-colors duration-300 group-hover:text-orange-600">
          {name}
        </h2>

        {blurb && <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate">{blurb}</p>}

        {details.length > 0 && (
          <dl className="mt-8 space-y-5 border-t border-line pt-6">
            {details.map(([term, value]) => (
              <div key={term} className="grid gap-1 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-6">
                <dt
                  className={cn(
                    't-label',
                    term === 'Results' ? 'text-orange-700' : 'text-mute',
                  )}
                >
                  {term}
                </dt>
                <dd className="text-slate">{value}</dd>
              </div>
            ))}
          </dl>
        )}

        {tech?.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line bg-sand px-3 py-1 text-xs font-medium text-slate"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-8 flex items-center gap-6">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 py-1 text-sm font-semibold text-orange-600 transition-colors hover:text-orange-700"
            >
              Visit the live site <FiExternalLink className="h-4 w-4" />
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate transition-colors hover:text-ink"
            >
              <FiGithub className="h-4 w-4" /> Code
            </a>
          )}
          <FiArrowUpRight className="ml-auto h-5 w-5 text-mute transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange-600" />
        </div>
      </div>

      {liveUrl ? <div className="portfolio-project-browser"><ProjectBrowser project={project} /></div> : <div
        className={cn(
          'relative w-full overflow-hidden rounded-sm bg-gradient-to-br transition-transform duration-500 group-hover:scale-[1.02]',
          coverHeight,
          gradient,
        )}
      >
        <div className="absolute inset-0 bg-dot-grid opacity-40" />
      </div>}
    </motion.article>
  )
}
