import { FiArrowRight, FiPhone } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa6'
import Container from '@/components/ui/Container.jsx'
import Button from '@/components/ui/Button.jsx'
import { BentoGrid, BentoCard } from '@/components/ui/Bento.jsx'
import { CONTACT_CHANNELS } from '@/data/offer.js'

/**
 * Closing CTA band for the supporting routes (work, blog), which have no
 * quote form of their own. Replaces the old CtaBanner, whose only action
 * was opening a Cal.com booking popup - a heavier ask than "send us your
 * details", and one that loaded a third-party SDK to do it.
 */
export default function QuoteCta() {
  return (
    <Container className="py-20 sm:py-28">
      <BentoGrid cols="grid-cols-2 lg:grid-cols-6">
        <BentoCard
          span="col-span-2 lg:col-span-6"
          tone="brand"
          hover={false}
          className="items-start gap-8 py-10 sm:py-12 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="max-w-xl">
            <h2 className="t-h2 font-bold text-white">Ready to get started?</h2>
            <p className="t-lead mt-4 text-white/85">
              Tell us what your business does and we will come back with a fixed price and a
              realistic timeline within one business day.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
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
        </BentoCard>
      </BentoGrid>
    </Container>
  )
}
