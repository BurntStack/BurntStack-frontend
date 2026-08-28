import { FiTarget, FiEye, FiHeart } from 'react-icons/fi'
import Seo from '@/components/seo/Seo.jsx'
import PageHero from '@/components/ui/PageHero.jsx'
import Section from '@/components/ui/Section.jsx'
import Container from '@/components/ui/Container.jsx'
import SectionHeading from '@/components/ui/SectionHeading.jsx'
import { BentoGrid, BentoCard, BentoIcon } from '@/components/ui/Bento.jsx'
import WhyChoose from '@/sections/home/WhyChoose.jsx'
import CtaBanner from '@/sections/home/CtaBanner.jsx'

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
                Founded on a simple belief in <span className="text-orange-600">scale and trust</span>
              </h2>
              <p className="text-slate">
                BurntStack Technologies Private Limited was founded in 2026 on a simple belief: great
                software is a competitive advantage. We’re building the studio around senior
                engineering, thoughtful design and deep ownership of every project we take on.
              </p>
              <p className="text-slate">
                We’re early, and we like it that way. No bloated teams, no juniors learning on your
                dime, just a small group of people who care about getting it right and staying with
                you after launch.
              </p>
            </BentoCard>

            <BentoCard span="col-span-2 lg:col-span-2" tone="ink" hover={false} className="items-center justify-center text-center">
              <p className="font-display text-4xl font-extrabold text-white">2026</p>
              <p className="mt-1 text-sm text-white/70">The year we started building</p>
            </BentoCard>
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
