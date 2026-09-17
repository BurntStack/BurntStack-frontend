import Cal from '@calcom/embed-react'
import Band from '@/components/editorial/Band.jsx'
import Label from '@/components/editorial/Label.jsx'
import Display from '@/components/editorial/Display.jsx'
import { CONTACT_CHANNELS } from '@/data/offer.js'
import { CAL_LINK } from '@/lib/cal.js'

/**
 * Pick-a-time booking, immediately after the lead form.
 *
 * Two different asks, in order of commitment: the form above takes thirty
 * seconds and leaves the next move to us, this takes a diary slot. Anyone
 * not ready to hand over a time still had a way to reach us one screen
 * earlier, which is why it sits second rather than first.
 */
export default function BookingSection() {
  return (
    <Band id="booking" tone="ivory">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
        <div>
          <Label index="01">Book a call</Label>
          <Display className="mt-6 max-w-[12ch]" accent="no back and forth.">
            Pick a time,
          </Display>
          <p className="mt-6 text-slate">
            A free fifteen minutes on what your business does and what the site needs to achieve.
            We come with questions, not a sales script.
          </p>
          <p className="mt-6 text-sm text-mute">
            Prefer to talk now? Call{' '}
            <a
              href={`tel:${CONTACT_CHANNELS.phone}`}
              className="tap-target inline-block py-1 font-semibold text-ink underline underline-offset-2 hover:text-orange-700"
            >
              {CONTACT_CHANNELS.phoneLabel}
            </a>
            .
          </p>
        </div>

        <div className="min-h-[560px] overflow-hidden rounded-sm border border-line bg-canvas">
          <Cal
            calLink={CAL_LINK}
            style={{ width: '100%', height: '100%' }}
            config={{ layout: 'month_view' }}
          />
        </div>
      </div>
    </Band>
  )
}
