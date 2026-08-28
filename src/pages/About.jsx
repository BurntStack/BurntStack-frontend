import { FiTarget, FiEye, FiHeart } from 'react-icons/fi'
import Seo from '@/components/seo/Seo.jsx'
import PageHero from '@/components/ui/PageHero.jsx'
import Section from '@/components/ui/Section.jsx'
import Container from '@/components/ui/Container.jsx'
import SectionHeading from '@/components/ui/SectionHeading.jsx'
import AnimatedCounter from '@/components/ui/AnimatedCounter.jsx'
import { BentoGrid, BentoCard, BentoIcon } from '@/components/ui/Bento.jsx'
import WhyChoose from '@/sections/home/WhyChoose.jsx'
import CtaBanner from '@/sections/home/CtaBanner.jsx'
import { STATS } from '@/data/misc.js'

const PILLARS = [
  { icon: FiTarget, title: 'Our Mission', text: 'To help businesses grow faster by building software that is fast, reliable and a joy to use.' },
  { icon: FiEye, title: 'Our Vision', text: 'To give every ambitious company access to senior engineering, without the overhead of building a large in-house team.' },
  { icon: FiHeart, title: 'Our Values', text: 'Craftsmanship, transparency and ownership. We treat your product like it’s our own.' },
]

export default function About() {
  return (
    <>
      <Seo
        title="About Us"
        path="/about"
        description="BurntStack Technologies is a product studio building software that powers businesses."
      />
      <PageHero
        eyebrow="About Us"
        title="Engineers, designers and problem-solvers"
        description="We’re a product studio on a mission to turn ambitious ideas into software that scales."
      />

      {/* Story + stats */}
      <Section className="pt-0">
        <Container>
          <BentoGrid cols="grid-cols-2 lg:grid-cols-6">
            <BentoCard span="col-span-2 lg:col-span-4" tone="ivory" hover={false} className="justify-center gap-5">
              <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
                Building since day one for <span className="text-orange-600">scale and trust</span>
              </h2>
              <p className="text-slate">
                BurntStack Technologies Private Limited was founded on a simple belief: great software
                is a competitive advantage. Over the years we’ve partnered with startups and enterprises
                alike to design, build and scale products that people rely on every day.
              </p>
              <p className="text-slate">
                Our team brings senior engineering, thoughtful design and deep industry context to every
                engagement, and we stay long after launch to help you grow.
              </p>
            </BentoCard>

            {STATS.map((s, i) => (
              <BentoCard
                key={s.label}
                span={i === 0 ? 'col-span-2 lg:col-span-2' : 'col-span-2 sm:col-span-1 lg:col-span-2'}
                tone={i === 0 ? 'ink' : 'surface'}
                className="items-center justify-center text-center"
              >
                <div className={`font-display text-3xl font-extrabold sm:text-4xl ${i === 0 ? 'text-white' : 'text-orange-600'}`}>
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </div>
                <div className={`mt-1 text-sm ${i === 0 ? 'text-white/70' : 'text-slate'}`}>{s.label}</div>
              </BentoCard>
            ))}
          </BentoGrid>
        </Container>
      </Section>

      {/* Pillars */}
      <Section className="bg-ivory">
        <Container>
          <SectionHeading eyebrow="What Drives Us" title="Mission, vision & values" />
          <BentoGrid className="mt-14" cols="grid-cols-1 sm:grid-cols-3">
            {PILLARS.map(({ icon: Icon, title, text }) => (
              <BentoCard key={title} span="col-span-1" tone="surface" className="items-center gap-3 text-center">
                <BentoIcon icon={Icon} />
                <h3 className="mt-2 font-display text-xl font-bold text-ink">{title}</h3>
                <p className="text-sm text-slate">{text}</p>
              </BentoCard>
            ))}
          </BentoGrid>
        </Container>
      </Section>

      <WhyChoose />
      <CtaBanner />
    </>
  )
}
