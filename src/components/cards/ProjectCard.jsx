import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub, FiArrowUpRight } from 'react-icons/fi'
import { cn } from '@/utils/cn.js'
import { fadeInUp } from '@/lib/motion.js'

/** Case-study style project card with a gradient cover and hover reveal. */
export default function ProjectCard({ project }) {
  const { name, category, gradient, tech, problem, solution, results, liveUrl, githubUrl } = project

  return (
    <motion.article
      variants={fadeInUp}
      className="group relative overflow-hidden rounded-3xl border border-border-base bg-surface transition-all duration-500 hover:-translate-y-1.5 hover:border-ember-400/40 hover:shadow-soft"
    >
      {/* Cover */}
      <div className={cn('relative h-52 overflow-hidden bg-gradient-to-br', gradient)}>
        <div className="absolute inset-0 bg-dots opacity-40" />
        <div className="absolute left-5 top-5">
          <span className="rounded-full bg-background/70 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur">
            {category}
          </span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-2xl font-extrabold tracking-tight text-foreground/90 transition-transform duration-500 group-hover:scale-105">
            {name}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-4 p-6">
        <div className="flex flex-wrap gap-2">
          {tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border-base bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted"
            >
              {t}
            </span>
          ))}
        </div>

        <dl className="space-y-2.5 text-sm">
          <div>
            <dt className="font-semibold text-foreground">Problem</dt>
            <dd className="text-muted">{problem}</dd>
          </div>
          <div>
            <dt className="font-semibold text-foreground">Solution</dt>
            <dd className="text-muted">{solution}</dd>
          </div>
          <div>
            <dt className="font-semibold text-ember-500">Results</dt>
            <dd className="text-muted">{results}</dd>
          </div>
        </dl>

        <div className="mt-2 flex items-center gap-3 border-t border-border-base pt-4">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ember-500 hover:gap-2"
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
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-foreground"
            >
              <FiGithub className="h-4 w-4" /> Code
            </a>
          )}
          <FiArrowUpRight className="ml-auto h-5 w-5 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember-500" />
        </div>
      </div>
    </motion.article>
  )
}
