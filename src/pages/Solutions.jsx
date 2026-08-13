import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import { FaLayerGroup, FaRobot, FaCartShopping, FaChartLine, FaMobileScreen, FaCloud } from 'react-icons/fa6'
import Seo from '@/components/seo/Seo.jsx'
import PageHero from '@/components/ui/PageHero.jsx'
import Section from '@/components/ui/Section.jsx'
import Container from '@/components/ui/Container.jsx'
import CtaBanner from '@/sections/home/CtaBanner.jsx'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion.js'

const SOLUTIONS = [
  { icon: FaLayerGroup, title: 'SaaS Platforms', text: 'Multi-tenant products with billing, auth, analytics and everything you need to launch and scale.' },
  { icon: FaRobot, title: 'AI Copilots', text: 'LLM-powered assistants grounded in your data — helpful, safe and production-ready.' },
  { icon: FaCartShopping, title: 'Commerce Systems', text: 'Headless storefronts and marketplaces with fast checkout and personalised experiences.' },
  { icon: FaChartLine, title: 'Data & Analytics', text: 'Pipelines, warehouses and dashboards that turn raw data into decisions.' },
  { icon: FaMobileScreen, title: 'Mobile Products', text: 'Cross-platform apps with native performance and delightful UX.' },
  { icon: FaCloud, title: 'Cloud Modernisation', text: 'Migrate, containerise and scale legacy systems on AWS and Azure.' },
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
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {SOLUTIONS.map(({ icon: Icon, title, text }) => (
              <motion.div
                key={title}
                variants={fadeInUp}
                className="group relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-border-base bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-ember-400/40"
              >
                <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-ember-500/10 text-2xl text-ember-500 transition-colors group-hover:bg-ember-500 group-hover:text-white">
                  <Icon />
                </span>
                <h3 className="font-display text-xl font-bold text-foreground">{title}</h3>
                <p className="text-sm text-muted">{text}</p>
                <FiArrowUpRight className="absolute right-6 top-6 h-5 w-5 text-muted opacity-0 transition-all group-hover:opacity-100 group-hover:text-ember-500" />
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>
      <CtaBanner />
    </>
  )
}
