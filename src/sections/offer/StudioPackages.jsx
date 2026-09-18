import { useState } from 'react'
import { FiArrowUpRight, FiCheck, FiChevronRight } from 'react-icons/fi'
import { PACKAGES, PACKAGES_CONFIRMED } from '@/data/offer.js'
import { useQuoteForm } from '@/components/lead/useQuoteForm.js'

/**
 * Packages.
 *
 * The price row is the line a reader scans a pricing table for, and while
 * prices are unpublished all four cards printed the identical string
 * "Price on request" there. That is the whole point of the table wasted
 * four times over.
 *
 * So the shared promise is stated once, at section level, and each card
 * gives that slot to `scope`, which genuinely differs. `fit` sits directly
 * under the name because the question a reader is actually asking is not
 * "what does it cost" but "which of these am I?".
 *
 * When PACKAGES_CONFIRMED flips, the real price takes the headline slot
 * and scope steps down beside it.
 */
export default function StudioPackages() {
  const { openQuoteForm } = useQuoteForm()
  const [activeIndex, setActiveIndex] = useState(1)
  const activePlan = PACKAGES[activeIndex]

  return (
    <section id="pricing" className="studio-wrap studio-packages">
      <div className="pricing-intro">
        <div className="pricing-intro-mark" aria-hidden="true">✳</div>
        <div>
          <p className="pricing-eyebrow">Website packages</p>
          <h2>Select the website scope.</h2>
          <p className="pricing-intro-copy">Choose the closest website scope. We will confirm the final requirements and quotation during the consultation.</p>
        </div>
        <button type="button" className="text-button pricing-help" onClick={() => openQuoteForm()}>
          Request guidance <FiArrowUpRight aria-hidden="true" />
        </button>
      </div>

      <div className="pricing-picker">
        <div className="pricing-options" role="tablist" aria-label="Choose a package">
          {PACKAGES.map((plan, index) => (
            <button type="button" role="tab" key={plan.name} className={`pricing-option${index === activeIndex ? ' is-active' : ''}`} aria-selected={index === activeIndex} aria-controls="selected-package" onClick={() => setActiveIndex(index)}>
              <span className="pricing-option-number">0{index + 1}</span>
              <span className="pricing-option-copy"><strong>{plan.name}</strong><small>{plan.scope}</small></span>
              <FiChevronRight aria-hidden="true" />
            </button>
          ))}
        </div>

        <article id="selected-package" className="pricing-stage" role="tabpanel">
          <div className="pricing-stage-topline"><span>{String(activeIndex + 1).padStart(2, '0')} / {String(PACKAGES.length).padStart(2, '0')}</span>{activePlan.highlighted && <span className="pricing-badge">Most requested website scope</span>}</div>
          <div className="pricing-stage-heading"><div><p className="pricing-stage-kicker">{activePlan.scope}</p><h3>{activePlan.name}</h3></div><span className="pricing-stage-price">{PACKAGES_CONFIRMED ? activePlan.price : 'Quote after we talk'}</span></div>
          <p className="pricing-stage-fit">{activePlan.fit}</p>
          <p className="pricing-stage-tagline">{activePlan.tagline}</p>
          <div className="pricing-stage-bottom"><div><p className="pricing-includes-label">Included in this scope</p><ul className="pricing-features">{activePlan.features.map((feature) => <li key={feature}><FiCheck aria-hidden="true" />{feature}</li>)}</ul></div><button type="button" className="pricing-quote-button" onClick={() => openQuoteForm(activePlan.name)}>Request this scope <FiArrowUpRight aria-hidden="true" /></button></div>
        </article>
      </div>
    </section>
  )
}
