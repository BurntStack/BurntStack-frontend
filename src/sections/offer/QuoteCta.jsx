import { FiArrowRight, FiPhone } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa6'
import Band from '@/components/editorial/Band.jsx'
import Display from '@/components/editorial/Display.jsx'
import Button from '@/components/ui/Button.jsx'
import { CONTACT_CHANNELS } from '@/data/offer.js'

/**
 * Closing CTA band for the supporting routes (work, blog), which have no
 * quote form of their own.
 */
export default function QuoteCta() {
  return (
    <Band tone="brand" spacing="tight">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <Display className="max-w-[13ch]" tone="onDark" accent="Let’s talk.">
          Ready to get started?
        </Display>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            to="/#quote"
            size="lg"
            variant="secondary"
            className="border-transparent bg-white text-ink hover:bg-white/90"
          >
            Get my quote <FiArrowRight className="h-4 w-4" />
          </Button>
          <Button
            href={CONTACT_CHANNELS.whatsapp}
            target="_blank"
            rel="noreferrer"
            size="lg"
            variant="ghost"
            className="text-white hover:bg-white/10 hover:text-white"
          >
            <FaWhatsapp className="h-4 w-4" /> WhatsApp
          </Button>
          <Button
            href={`tel:${CONTACT_CHANNELS.phone}`}
            size="lg"
            variant="ghost"
            className="text-white hover:bg-white/10 hover:text-white"
          >
            <FiPhone className="h-4 w-4" /> Call
          </Button>
        </div>
      </div>
    </Band>
  )
}
