import { motion } from 'framer-motion'
import Container from '@/components/ui/Container.jsx'
import { cn } from '@/utils/cn.js'
import { staggerContainer, viewportOnce } from '@/lib/motion.js'

/**
 * A full-width horizontal band - the single structural unit of the page,
 * replacing the bento tile.
 *
 * The bento grid gave every piece of content the same treatment: a bordered
 * card on a light ground, differing only in how many columns it spanned.
 * Hierarchy had to come from tile size, which is a weak signal, and the
 * result read as a template. Bands carry hierarchy through tone, scale and
 * whitespace instead: a band owns the full viewport width, sets its own
 * ground colour, and gives its headline room to be genuinely large.
 */
const TONES = {
  canvas: 'bg-canvas text-slate',
  ivory: 'bg-ivory text-slate',
  sand: 'bg-sand text-slate',
  ink: 'bg-ink text-white/70',
  // orange-500 -> white measures 3.45:1, which no normal-size label on
  // this band could pass. orange-600 -> orange-700 gives 4.55:1 at the
  // lightest end and 6.36:1 at the darkest.
  brand: 'bg-gradient-to-br from-orange-600 to-orange-700 text-white',
}

const SPACING = {
  // Bands need far more vertical air than cards did; the rhythm is part of
  // what makes the layout read as editorial rather than as a dashboard.
  normal: 'py-20 sm:py-28 lg:py-36',
  tight: 'py-14 sm:py-20',
  hero: 'pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-28',
}

export default function Band({
  id,
  tone = 'canvas',
  spacing = 'normal',
  bordered = false,
  className,
  containerClassName,
  children,
  ...props
}) {
  return (
    <motion.section
      id={id}
      variants={staggerContainer(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={cn(
        'relative w-full overflow-hidden',
        TONES[tone],
        SPACING[spacing],
        bordered && 'border-t border-line',
        tone === 'ink' && bordered && 'border-white/10',
        className,
      )}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </motion.section>
  )
}
