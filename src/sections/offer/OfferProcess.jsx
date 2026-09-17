import Band from '@/components/editorial/Band.jsx'
import Label from '@/components/editorial/Label.jsx'
import Display from '@/components/editorial/Display.jsx'
import RuleList, { RuleRow } from '@/components/editorial/RuleList.jsx'
import { OFFER_STEPS } from '@/data/offer.js'

/** The five steps, on ink, immediately before the price. */
export default function OfferProcess() {
  return (
    <Band id="process" tone="ink">
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] md:items-end">
        <div>
          <Label index="03" tone="onDark">
            How it works
          </Label>
          <Display className="mt-6 max-w-[14ch]" tone="onDark" accent="no surprises.">
            Five steps,
          </Display>
        </div>
        <p className="text-white/55 md:pb-3">
          You know the price before we start and you see the design before we build. That is the
          whole process.
        </p>
      </div>

      <RuleList tone="onDark" className="mt-14 sm:mt-20">
        {OFFER_STEPS.map((step) => (
          <RuleRow
            key={step.step}
            index={step.step}
            title={step.title}
            description={step.description}
            tone="onDark"
          />
        ))}
      </RuleList>
    </Band>
  )
}
