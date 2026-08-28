import { FiArrowRight } from 'react-icons/fi'
import Container from '@/components/ui/Container.jsx'
import Button from '@/components/ui/Button.jsx'
import { BentoGrid, BentoCard } from '@/components/ui/Bento.jsx'

export default function CtaBanner() {
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
            <h2 className="t-h2 font-bold text-white">Have a project in mind? Let’s talk</h2>
            <p className="t-lead mt-4 text-white/85">
              Book a free consultation and get a clear plan and timeline within a few days.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Button to="/contact" size="lg" variant="secondary" className="border-transparent bg-white text-ink hover:bg-white/90">
              Get a Free Consultation <FiArrowRight className="h-4 w-4" />
            </Button>
            <Button to="/portfolio" size="lg" variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
              View Our Work
            </Button>
          </div>
        </BentoCard>
      </BentoGrid>
    </Container>
  )
}
