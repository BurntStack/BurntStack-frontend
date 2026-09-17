import { motion } from 'framer-motion'
import { FiArrowUpRight, FiStar } from 'react-icons/fi'
import Band from '@/components/editorial/Band.jsx'
import Label from '@/components/editorial/Label.jsx'
import Display from '@/components/editorial/Display.jsx'
import Button from '@/components/ui/Button.jsx'
import { useQuoteForm } from '@/components/lead/useQuoteForm.js'
import { PROJECTS } from '@/data/projects.js'
import { TESTIMONIALS } from '@/data/offer.js'
import { fadeInUp } from '@/lib/motion.js'

/**
 * Work, shown as full-width entries rather than portfolio cards.
 *
 * TESTIMONIALS ships empty and this renders nothing in its place. The
 * reference direction leans hard on quote walls; inventing them is not on
 * the table. The block appears on its own the moment a real, signed-off
 * quote is added to data/offer.js.
 */
export default function WorkProof() {
  const { openQuoteForm } = useQuoteForm()

  return (
    <Band id="work" tone="ivory">
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] md:items-end">
        <div>
          <Label index="04">Our work</Label>
          <Display className="mt-6 max-w-[14ch]" accent="real businesses.">
            Real sites,
          </Display>
        </div>
        <p className="text-slate md:pb-3">
          Every project below is live and running. We would rather show you a handful of things we
          actually shipped than a wall of stock mockups.
        </p>
      </div>

      <div className="mt-14 border-t border-line sm:mt-20">
        {PROJECTS.map((project) => (
          <motion.a
            key={project.slug}
            variants={fadeInUp}
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="group grid items-center gap-6 border-b border-line py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,18rem)] lg:gap-14"
          >
            <div>
              <span className="t-label text-mute">{project.category}</span>
              <h3 className="t-editorial-sm mt-4 text-ink transition-colors duration-300 group-hover:text-orange-600">
                {project.name}
              </h3>
              <p className="mt-4 max-w-md text-slate">{project.blurb}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-orange-600">
                Visit the live site
                <FiArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
            <div
              className={`h-44 w-full rounded-sm bg-gradient-to-br ${project.gradient} transition-transform duration-500 group-hover:scale-[1.02] md:h-56`}
            />
          </motion.a>
        ))}

        <motion.div
          variants={fadeInUp}
          className="flex flex-col gap-5 border-b border-line py-10 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h3 className="font-display text-xl font-semibold text-ink">Yours could be next</h3>
            <p className="mt-2 max-w-md text-slate">
              We take on a limited number of projects at a time so each one gets proper
              attention.
            </p>
          </div>
          <Button onClick={openQuoteForm} variant="secondary" className="w-fit shrink-0">
            Start a project <FiArrowUpRight className="h-4 w-4" />
          </Button>
        </motion.div>

        {TESTIMONIALS.map(({ quote, name, company, role }) => (
          <motion.figure
            key={`${name}-${company}`}
            variants={fadeInUp}
            className="border-b border-line py-10"
          >
            <div className="flex gap-1 text-orange-500">
              {Array.from({ length: 5 }, (_, i) => (
                <FiStar key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <blockquote className="t-editorial-sm mt-6 max-w-4xl normal-case text-ink">
              <span className="t-accent">“{quote}”</span>
            </blockquote>
            <figcaption className="mt-5 text-sm text-mute">
              <span className="font-semibold text-ink">{name}</span>
              {', '}
              {role ? `${role}, ` : ''}
              {company}
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <div className="mt-12">
        <Button to="/portfolio" variant="outline" size="lg">
          View all work <FiArrowUpRight className="h-4 w-4" />
        </Button>
      </div>
    </Band>
  )
}
