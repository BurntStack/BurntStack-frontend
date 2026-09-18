import { FiArrowUpRight } from 'react-icons/fi'
import { OFFER_SERVICES, SERVICE_GROUPS } from '@/data/offer.js'
import { useQuoteForm } from '@/components/lead/useQuoteForm.js'

/**
 * Services, as two labelled groups rather than one flat grid of eight.
 *
 * Identical cards asked the reader to sort the list themselves and
 * made every service look equally important. Build and Grow is the
 * distinction they are actually weighing: can you make the thing, and
 * can you make it work harder. The outcome leads each row because
 * people arrive wanting customers to find them, not wanting SEO.
 */
export default function OfferServices() {
  const { openQuoteForm } = useQuoteForm()

  return (
    <section id="services" className="services-section" aria-labelledby="services-heading">
      <div className="studio-wrap studio-section">
        <div className="section-heading services-heading">
          <h2 id="services-heading">
            What we <em>do.</em>
          </h2>
          <p>
            Eight capabilities across product development and automation. Select a service to see
            the type of work it covers.
          </p>
        </div>

        {SERVICE_GROUPS.map(({ id, label, promise }) => (
          <div className={`service-group service-group-${id}`} key={id}>
            <div className="service-group-head">
              <div><span className="service-group-label">{label}</span><h3>{promise}</h3></div>
              <p>{id === 'build' ? 'The foundations people see and use.' : 'The systems that keep working after launch.'}</p>
            </div>

            <div className="service-cards">
              {OFFER_SERVICES.map((service, i) => ({ ...service, index: i + 1 }))
                .filter((service) => service.group === id)
                .map(({ icon: Icon, title, job, description, includes, plan, index }) => (
                  <article className="service-card-new" key={title}>
                    <div className="service-card-new-top"><span className="service-index" aria-hidden="true">{String(index).padStart(2, '0')}</span><Icon aria-hidden="true" /></div>
                    <h4>{title}</h4>
                    <p className="service-job">{job}</p>
                    <p className="service-detail">{description}</p>
                    <ul className="service-includes">{includes.map((item) => <li key={item}>{item}</li>)}</ul>
                    <button type="button" className="service-cta" onClick={() => openQuoteForm(plan)} aria-label={`Discuss ${title.toLowerCase()}`}>
                      Discuss this <FiArrowUpRight aria-hidden="true" />
                    </button>
                  </article>
                ))}
            </div>
          </div>
        ))}

        <div className="service-help">
          <p>Not sure which of these you need? Most people aren’t. Tell us the problem instead.</p>
          <button type="button" className="text-button" onClick={() => openQuoteForm()}>
            Talk it through <FiArrowUpRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}
