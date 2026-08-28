import {
  FaHeartPulse,
  FaGraduationCap,
  FaMoneyBillTrendUp,
  FaTruckFast,
  FaIndustry,
  FaBagShopping,
  FaHotel,
  FaHouseChimney,
} from 'react-icons/fa6'

export const STATS = [
  { value: 250, suffix: '+', label: 'Projects Completed' },
  { value: 120, suffix: '+', label: 'Happy Clients' },
  { value: 9, suffix: '+', label: 'Years of Experience' },
  { value: 15, suffix: '+', label: 'Industries Served' },
]

export const INDUSTRIES = [
  { icon: FaHeartPulse, name: 'Healthcare', blurb: 'HIPAA-ready platforms & telehealth.' },
  { icon: FaGraduationCap, name: 'Education', blurb: 'LMS, e-learning & student portals.' },
  { icon: FaMoneyBillTrendUp, name: 'Finance', blurb: 'Secure fintech & analytics.' },
  { icon: FaTruckFast, name: 'Logistics', blurb: 'Fleet tracking & optimisation.' },
  { icon: FaIndustry, name: 'Manufacturing', blurb: 'IoT, ERP & automation.' },
  { icon: FaBagShopping, name: 'Retail', blurb: 'Commerce & omnichannel.' },
  { icon: FaHotel, name: 'Hospitality', blurb: 'Booking & guest experience.' },
  { icon: FaHouseChimney, name: 'Real Estate', blurb: 'Listings, CRM & virtual tours.' },
]

export const PROCESS = [
  { step: '01', title: 'Discovery', description: 'We dig into your goals, users and constraints to define what success looks like.' },
  { step: '02', title: 'Planning', description: 'Scope, architecture and a clear roadmap with milestones and estimates.' },
  { step: '03', title: 'UI/UX Design', description: 'Wireframes, prototypes and a polished design system your users will love.' },
  { step: '04', title: 'Development', description: 'Clean, tested code shipped in agile sprints with continuous demos.' },
  { step: '05', title: 'Testing', description: 'Automated and manual QA across devices, performance and security.' },
  { step: '06', title: 'Deployment', description: 'Zero-downtime releases with CI/CD, monitoring and rollback safety.' },
  { step: '07', title: 'Maintenance', description: 'Ongoing support, updates and iteration as your business grows.' },
]

export const TESTIMONIALS = [
  {
    name: 'Ananya Rao',
    company: 'CEO, MediSync',
    rating: 5,
    review:
      'BurntStack rebuilt our entire platform in record time. The quality and communication were excellent. They feel like part of our team.',
    initials: 'AR',
  },
  {
    name: 'Daniel Fischer',
    company: 'CTO, FinTrack',
    rating: 5,
    review:
      'Their AI expertise is the real deal. The analytics engine they built pays for itself every single month.',
    initials: 'DF',
  },
  {
    name: 'Priya Menon',
    company: 'Founder, ShopWave',
    rating: 5,
    review:
      'Conversions more than doubled after the rebuild. Thoughtful engineering and design at every step.',
    initials: 'PM',
  },
  {
    name: 'Marcus Lee',
    company: 'VP Eng, LogiFlow',
    rating: 5,
    review:
      'Scalable, secure and delivered on time. BurntStack is our go-to engineering partner now.',
    initials: 'ML',
  },
]

export const PRICING = [
  {
    name: 'Business Websites',
    tagline: 'Marketing sites & landing pages',
    features: ['Custom design', 'CMS & blog', 'SEO optimised', 'Analytics setup', 'Up to 10 pages'],
    highlighted: false,
  },
  {
    name: 'Enterprise Software',
    tagline: 'Mission-critical platforms',
    features: ['Scalable architecture', 'Custom integrations', 'Role-based access', 'SLAs & support', 'Dedicated team'],
    highlighted: true,
  },
  {
    name: 'AI Solutions',
    tagline: 'ML models & copilots',
    features: ['LLM integration', 'Custom models', 'Data pipelines', 'MLOps', 'Ongoing tuning'],
    highlighted: false,
  },
  {
    name: 'Mobile Apps',
    tagline: 'iOS & Android',
    features: ['Cross-platform', 'Native performance', 'App store launch', 'Push & analytics', 'Maintenance'],
    highlighted: false,
  },
]

export const FAQS = [
  {
    q: 'How long does development take?',
    a: 'It depends on scope, but most websites ship in 3–6 weeks and enterprise platforms in 3–6 months. We share a detailed timeline after the discovery phase.',
  },
  {
    q: 'Do you provide support?',
    a: 'Yes. Every engagement includes a support window, and we offer ongoing maintenance plans with SLAs for long-term partnerships.',
  },
  {
    q: 'Can you redesign existing websites?',
    a: 'Absolutely. We frequently modernise legacy sites and platforms, improving performance, design and maintainability without disrupting your business.',
  },
  {
    q: 'Which technologies do you use?',
    a: 'We specialise in React, Python/Django, PostgreSQL, AWS and modern AI tooling, and we choose the best stack for each project.',
  },
  {
    q: 'Do you sign NDAs?',
    a: 'Yes, we are happy to sign an NDA before discussing your project in detail. Your ideas and data are always protected.',
  },
  {
    q: 'How does payment work?',
    a: 'We typically work in milestone-based payments tied to deliverables, with flexible terms for retainers and long-term engagements.',
  },
]
