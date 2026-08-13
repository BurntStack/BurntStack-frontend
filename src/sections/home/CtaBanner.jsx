import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import Container from '@/components/ui/Container.jsx'
import Button from '@/components/ui/Button.jsx'
import { fadeInUp, viewportOnce } from '@/lib/motion.js'

export default function CtaBanner() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="relative overflow-hidden rounded-xl border border-line bg-ivory px-6 py-12 sm:px-12"
        >
          <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="t-h2 font-bold text-ink">
                Have a project in mind? Let’s talk
              </h2>
              <p className="t-lead mt-4 text-slate">
                Book a free consultation and get a clear plan and timeline within a few days.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Button to="/contact" size="lg">
                Get a Free Consultation <FiArrowRight className="h-4 w-4" />
              </Button>
              <Button to="/portfolio" variant="secondary" size="lg">
                View Our Work
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
