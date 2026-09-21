import { PROCESS_STEPS } from '@/data/offer.js'
import { useSectionNav } from '@/lib/useSectionNav.js'
import { ArrowRight, ArrowUpRight, Bearing, Calendar, Crate, Stack } from '@/components/icons/index.jsx'

const stages = [
  { label: 'Discover', icon: Bearing },
  { label: 'Align', icon: Stack },
  { label: 'Deliver', icon: Crate },
]

/**
 * How a project runs.
 *
 * Lifted out of Home.jsx, which was carrying the markup and the copy
 * inline. The three steps previously held one sentence each and left
 * most of the band empty; the fear this section exists to answer is
 * "I pay, then I lose control, then I am stuck with it", so every step
 * now ends with what the reader walks away holding.
 */
export default function StudioProcess() {
  const go = useSectionNav()

  return (
    <section id="process" className="studio-section studio-wrap process-section">
      <div className="detail-section-label"><span>How we work</span><span>From first conversation to launch <ArrowRight /></span></div>
      <div className="section-heading">
        <h2>
          A clear path.
          <br />
          <em>A better delivery.</em>
        </h2>
        <p>
          We move from requirements to an approved scope, then to a tested release. Decisions and
          responsibilities are recorded at each stage.
        </p>
      </div>

      <ol className="process-grid">
        {PROCESS_STEPS.map(({ title, body, gives }, i) => {
          const Icon = stages[i].icon
          return (
          <li className="process-step" key={title}>
            <div className="process-card-top"><span className="process-stage">{stages[i].label}</span><span className="process-number" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span></div>
            <div className="process-illustration" aria-hidden="true"><Icon /><span className="process-path-dot" /><span className="process-path-line" /><ArrowRight /></div>
            <h3>{title}</h3>
            <p className="process-body">{body}</p>
            <p className="process-gives">
              <span>What you walk away with <ArrowUpRight aria-hidden="true" /></span>
              {gives}
            </p>
          </li>
        )})}
      </ol>

      <div className="process-consultation">
        <div className="process-consultation-icon" aria-hidden="true"><Calendar /></div>
        <div className="process-consultation-copy">
          <span className="process-consultation-label">Next step</span>
          <h3>Schedule a requirements call.</h3>
          <p>Bring the business objective and any existing system details. We will identify the information needed for a proposal.</p>
        </div>
        <div className="process-consultation-meta"><span>30 minutes</span><span>No charge</span></div>
        <button type="button" className="process-consultation-button" onClick={() => go('booking')}>Choose a time <ArrowUpRight aria-hidden="true" /></button>
      </div>
    </section>
  )
}
