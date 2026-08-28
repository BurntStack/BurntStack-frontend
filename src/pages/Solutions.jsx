import { FiArrowUpRight } from 'react-icons/fi'
import { FaLayerGroup, FaRobot, FaCartShopping, FaChartLine, FaMobileScreen, FaCloud } from 'react-icons/fa6'
import Seo from '@/components/seo/Seo.jsx'
import PageHero from '@/components/ui/PageHero.jsx'
import Section from '@/components/ui/Section.jsx'
import Container from '@/components/ui/Container.jsx'
import { BentoGrid, BentoCard, BentoIcon } from '@/components/ui/Bento.jsx'
import CtaBanner from '@/sections/home/CtaBanner.jsx'

const SOLUTIONS = [
  { icon: FaLayerGroup, title: 'SaaS Platforms', text: 'Multi-tenant products with billing, auth, analytics and everything you need to launch and scale.' },
  { icon: FaRobot, title: 'AI Copilots', text: 'LLM-powered assistants grounded in your data — helpful, safe and production-ready.' },
  { icon: FaCartShopping, title: 'Commerce Systems', text: 'Headless storefronts and marketplaces with fast checkout and personalised experiences.' },
  { icon: FaChartLine, title: 'Data & Analytics', text: 'Pipelines, warehouses and dashboards that turn raw data into decisions.' },
  { icon: FaMobileScreen, title: 'Mobile Products', text: 'Cross-platform apps with native performance and delightful UX.' },
  { icon: FaCloud, title: 'Cloud Modernisation', text: 'Migrate, containerise and scale legacy systems on AWS and Azure.' },
]

const SPANS = [
  'col-span-2 lg:col-span-4',
  'col-span-2 lg:col-span-2',
  'col-span-2 lg:col-span-2',
  'col-span-2 lg:col-span-2',
  'col-span-2 lg:col-span-2',
  'col-span-2 lg:col-span-6',
]

export default function Solutions() {
  return (
    <>
      <Seo
        title="Solutions"
        path="/solutions"
        description="Tailored solutions — SaaS, AI copilots, commerce, data, mobile and cloud modernisation."
      />
      <PageHero
        eyebrow="Solutions"
        title="Outcomes, not just output"
        description="We package our expertise into solutions built around the results your business actually needs."
      />
      <Section className="pt-0">
        <Container>
          <BentoGrid cols="grid-cols-2 lg:grid-cols-6">
            {SOLUTIONS.map(({ icon: Icon, title, text }, i) => (
              <BentoCard key={title} span={SPANS[i]} tone={i === 5 ? 'ink' : 'surface'} direction={i === 5 ? 'row' : 'col'} className={i === 5 ? 'items-center gap-6' : 'gap-4'}>
                <BentoIcon icon={Icon} tone={i === 5 ? 'onDark' : 'default'} />
                <div>
                  <h3 className={`font-display text-xl font-bold ${i === 5 ? 'text-white' : 'text-ink'}`}>{title}</h3>
                  <p className={`mt-2 text-sm ${i === 5 ? 'text-white/70' : 'text-slate'}`}>{text}</p>
                </div>
                <FiArrowUpRight className={`absolute right-6 top-6 h-5 w-5 opacity-0 transition-all group-hover:opacity-100 ${i === 5 ? 'text-white' : 'text-orange-600'}`} />
              </BentoCard>
            ))}
          </BentoGrid>
        </Container>
      </Section>
      <CtaBanner />
    </>
  )
}
