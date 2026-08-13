import { motion } from 'framer-motion'
import { FiArrowLeft, FiHome } from 'react-icons/fi'
import Seo from '@/components/seo/Seo.jsx'
import Container from '@/components/ui/Container.jsx'
import Button from '@/components/ui/Button.jsx'
import BackgroundFX from '@/components/ui/BackgroundFX.jsx'

export default function NotFound() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden">
      <Seo title="Page Not Found" path="/404" />
      <BackgroundFX />
      <Container className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto flex max-w-xl flex-col items-center gap-6"
        >
          <span className="font-display text-[7rem] font-extrabold leading-none text-gradient sm:text-[10rem]">
            404
          </span>
          <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            This page went up in smoke
          </h1>
          <p className="max-w-md text-muted">
            The page you’re looking for doesn’t exist or has been moved. Let’s get you back on track.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button to="/" size="lg">
              <FiHome className="h-4 w-4" /> Back Home
            </Button>
            <Button to="/contact" variant="secondary" size="lg">
              <FiArrowLeft className="h-4 w-4" /> Contact Us
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
