import Band from '@/components/editorial/Band.jsx'
import Label from '@/components/editorial/Label.jsx'
import Display from '@/components/editorial/Display.jsx'
import RuleList, { RuleRow } from '@/components/editorial/RuleList.jsx'
import { OFFER_SERVICES } from '@/data/offer.js'

/**
 * Services as a ruled list rather than a grid of icon cards.
 *
 * Each row gets the full page width, so the title and its explanation sit
 * side by side and can be read as a single line - in the old tile grid the
 * same content stacked inside a narrow card and every service looked
 * identical to every other.
 */
export default function OfferServices() {
  return (
    <Band id="services" tone="canvas" bordered>
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] md:items-end">
        <div>
          <Label index="01">What you get</Label>
          <Display className="mt-6 max-w-[16ch]" accent="from first sketch to launch.">
            Everything handled,
          </Display>
        </div>
        <p className="text-slate md:pb-3">
          You describe the business. We handle design, copy, build, hosting, the domain and
          everything after.
        </p>
      </div>

      <RuleList className="mt-14 sm:mt-20">
        {OFFER_SERVICES.map((service, i) => (
          <RuleRow
            key={service.title}
            index={String(i + 1).padStart(2, '0')}
            title={service.title}
            description={service.description}
          >
            {/* Icons move from a decorative chip to a quiet trailing mark -
                present for scanning, not competing with the type. */}
            <service.icon className="h-5 w-5 shrink-0 text-mute transition-colors duration-300 group-hover:text-orange-500" />
          </RuleRow>
        ))}
      </RuleList>
    </Band>
  )
}
