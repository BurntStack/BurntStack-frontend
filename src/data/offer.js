import {
  FaGlobe,
  FaCode,
  FaBuilding,
  FaRobot,
  FaMicrophoneLines,
  FaCloud,
  FaCartShopping,
  FaMobileScreen,
} from 'react-icons/fa6'

/**
 * Everything the offer landing page ("/") says, in one file.
 *
 * The site is now offer-led rather than brochure-led: one page carries the
 * pitch, the packages, the proof and the quote form, and the only other
 * routes are the ones that can't live inside it (work, blog, contact, legal).
 * Keeping the copy here rather than inline in JSX means the numbers can be
 * corrected without touching a component.
 *
 * Deliberately absent: any founding-year or "founded in ..." claim, and any
 * invented track-record number (clients served, projects delivered, ad spend
 * managed). PROOF_POINTS below are promises we control and can honour, not
 * statistics we'd have to make up.
 */

// Contact routes used by every CTA on the page. WHATSAPP_NUMBER is the
// international form with no "+" or spaces, which is what wa.me requires.
const WHATSAPP_NUMBER = '917981672639'
const WHATSAPP_MESSAGE = "Hi BurntStack, I'd like a quote for my project."

export const CONTACT_CHANNELS = {
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
  phone: '+917981672639',
  phoneLabel: '+91 79816 72639',
  email: 'socials@burntstack.com',
}

export const OFFER = {
  // Shown as the urgency pill above the headline. Set `badge: null` to hide
  // the pill and the matching strip in the quote section when no offer is
  // actually running — we'd rather show nothing than fake a countdown.
  badge: null,
  headline: 'Digital products for operational businesses.',
  headlineAccent: 'Websites, software and connected systems.',
  subline:
    'BurntStack designs and develops websites, software, ERP applications, AI automations, voice agents, SaaS products, mobile applications and e-commerce systems.',
  primaryCta: 'Discuss a project',
  secondaryCta: 'View selected work',
  reassurance: 'Initial consultation at no charge · Written scope before development',
}

// Promises, not statistics. Each one is something we decide and can keep.
export const PROOF_POINTS = [
  { value: 'Web', label: 'Marketing sites and e-commerce systems' },
  { value: 'Apps', label: 'Customer, operations and mobile applications' },
  { value: 'ERP', label: 'Business processes in one connected system' },
  { value: 'AI', label: 'Automation and voice interfaces for routine work' },
]

/**
 * The eight things we sell, grouped by the kind of product being built.
 *
 * `job` is the outcome in the visitor's own terms. People arrive wanting
 * customers to find them, not wanting "on-page SEO", so the outcome
 * leads and the service name is the mechanism underneath it.
 *
 * `plan` must match either a PACKAGES name or stand alone as its own
 * quote-form option. LeadForm builds its dropdown from both lists.
 */
export const OFFER_SERVICES = [
  {
    icon: FaGlobe,
    title: 'Websites',
    plan: 'Business Website',
    group: 'build',
    job: 'A clear, confident home for your business on the web.',
    description: 'Marketing sites, landing pages, and content-led websites designed around the action you need.',
    includes: ['mobile-first responsive build', 'Forms, booking, and integrations', 'Analytics and launch support'],
  },
  {
    icon: FaCode,
    title: 'Software applications',
    plan: 'Software applications',
    group: 'build',
    job: 'Purpose-built software for the way your team actually works.',
    description: 'Customer portals, internal tools, dashboards, and workflows shaped around your process.',
    includes: ['Product thinking and UX', 'Secure accounts and permissions', 'Reliable backend connections'],
  },
  {
    icon: FaBuilding,
    title: 'ERP applications',
    plan: 'ERP applications',
    group: 'build',
    job: 'One connected system for your operations, people, and data.',
    description: 'ERP applications that bring scattered work into one dependable place for your business.',
    includes: ['Roles, approvals, and workflows', 'Reports and operational dashboards', 'Data migration and integrations'],
  },
  {
    icon: FaRobot,
    title: 'AI automations',
    plan: 'AI automations',
    group: 'automate',
    job: 'Less repetitive work, with useful automation behind it.',
    description: 'AI-assisted workflows that connect your tools and help your team move faster.',
    includes: ['Document and data workflows', 'AI assistants for internal teams', 'Automated handoffs and reports'],
  },
  {
    icon: FaMicrophoneLines,
    title: 'Voice agents',
    plan: 'Voice agents',
    group: 'automate',
    job: 'A helpful voice at the front of your business, day and night.',
    description: 'Voice agents that answer common questions, qualify callers, and route the next step.',
    includes: ['Natural call handling', 'Lead capture and qualification', 'Human handoff when needed'],
  },
  {
    icon: FaCloud,
    title: 'SaaS applications',
    plan: 'SaaS applications',
    group: 'automate',
    job: 'A subscription product your customers can use anywhere.',
    description: 'Scalable SaaS applications with the product experience, accounts, and billing to grow with you.',
    includes: ['Multi-tenant architecture', 'Plans, billing, and account areas', 'Usage, support, and admin tools'],
  },
  {
    icon: FaMobileScreen,
    title: 'Mobile applications',
    plan: 'Mobile applications',
    group: 'build',
    job: 'A focused mobile experience in your customer’s pocket.',
    description: 'Mobile apps for customers, field teams, memberships, bookings, and everyday operations.',
    includes: ['iOS and Android experiences', 'Notifications and secure accounts', 'App-ready API connections'],
  },
  {
    icon: FaCartShopping,
    title: 'E-commerce',
    plan: 'E-Commerce Store',
    group: 'build',
    job: 'A store that makes browsing, buying, and fulfilment feel simple.',
    description: 'End-to-end commerce experiences for products, payments, orders, and the people running them.',
    includes: ['Catalogue and checkout', 'Payments, stock, and order flows', 'Shipping and fulfilment tools'],
  },
]

/** The two halves of OFFER_SERVICES, with the promise each half makes. */
export const SERVICE_GROUPS = [
  { id: 'build', label: 'Build', promise: 'Digital products people can use.' },
  { id: 'automate', label: 'Automate', promise: 'Systems that keep the work moving.' },
]

/**
 * Pricing packages.
 *
 * PLACEHOLDER — the real package names, prices, inclusions and delivery
 * times have not been supplied yet. Every `price`/`priceNote`/`delivery`
 * below is marked TODO and must be replaced before this page goes live;
 * `PACKAGES_CONFIRMED` gates the section so unconfirmed numbers can never
 * be shown to a visitor by accident. Flip it to `true` once the real
 * figures are in.
 */
export const PACKAGES_CONFIRMED = false

/**
 * Packages.
 *
 * `fit` is the load-bearing field. While prices are unpublished every
 * card showed the identical line "Price on request", which is the one
 * row a reader scans a pricing table for. `fit` answers the question
 * they are really asking, which is "which of these am I?", and `scope`
 * puts a real, differentiating number where the price will eventually
 * go. Both come from what is already in `features`, so neither invents
 * anything.
 *
 * PLACEHOLDER: `price`, `priceNote` and `delivery` are still unconfirmed
 * and PACKAGES_CONFIRMED gates them out of the UI entirely.
 */
export const PACKAGES = [
  {
    name: 'Landing Page', // TODO: confirm name
    tagline: 'A focused page for a single business objective.',
    fit: 'For one service, campaign, product or enquiry objective.',
    scope: 'One page',
    price: 'TBC', // TODO: confirm price
    priceNote: 'one-time', // TODO: confirm
    delivery: 'TODO: delivery time',
    features: [
      'Single-page custom design',
      'Enquiry form and WhatsApp button',
      'Mobile and tablet optimised',
      'Free SSL and hosting setup',
      'Basic on-page SEO',
    ],
    highlighted: false,
  },
  {
    name: 'Business Website', // TODO: confirm name
    tagline: 'A structured website for an established business.',
    fit: 'For organisations that need clear service, company and contact information.',
    scope: 'Up to 6 pages',
    price: 'TBC', // TODO: confirm price
    priceNote: 'one-time', // TODO: confirm
    delivery: 'TODO: delivery time',
    features: [
      'Up to 6 custom pages',
      'Gallery, services and contact pages',
      'Google Business Profile setup',
      'Google Analytics and Search Console',
      'One month of free changes',
    ],
    highlighted: true, // TODO: confirm which package is "most popular"
  },
  {
    name: 'Premium Website', // TODO: confirm name
    tagline: 'A larger website with managed content.',
    fit: 'For teams that need a CMS, publishing workflow or regular content updates.',
    scope: 'Up to 12 pages, plus a CMS',
    price: 'TBC', // TODO: confirm price
    priceNote: 'one-time', // TODO: confirm
    delivery: 'TODO: delivery time',
    features: [
      'Up to 12 custom pages',
      'Blog and CMS you edit yourself',
      'Advanced SEO and speed tuning',
      'Booking or enquiry workflow',
      'Three months of free changes',
    ],
    highlighted: false,
  },
  {
    name: 'E-Commerce Store', // TODO: confirm name
    tagline: 'An online store with catalogue, checkout and fulfilment workflows.',
    fit: 'For businesses that sell products online and need connected order operations.',
    scope: 'Full catalogue and checkout',
    price: 'Custom',
    priceNote: 'quoted per store',
    delivery: 'TODO: delivery time',
    features: [
      'Full product catalogue',
      'Secure payment gateway',
      'Inventory and order management',
      'Shipping and tax configuration',
      'Staff training at handover',
    ],
    highlighted: false,
  },
]

/**
 * How a project runs.
 *
 * A process section exists to remove a specific fear: pay, lose control,
 * receive something you dislike, get stuck with it. So each step names
 * what the visitor walks away holding (`gives`), which is the part that
 * actually reduces the risk. Three steps, because three is what people
 * remember.
 */
export const PROCESS_STEPS = [
  {
    title: 'Define the requirement.',
    body: 'We review the business context, users, current systems, constraints and the outcome the product must support.',
    gives: 'A written understanding of the problem and a practical next step.',
  },
  {
    title: 'Approve the scope.',
    body: 'We document the features, integrations, responsibilities and delivery stages before development begins.',
    gives: 'A defined scope, delivery plan and quotation for approval.',
  },
  {
    title: 'Build and release.',
    body: 'We design, develop, test and deploy the agreed product, then provide the handover information your team needs.',
    gives: 'A working release with the agreed access, documentation and support plan.',
  },
]

/**
 * Client testimonials. Empty on purpose: we don't have signed-off quotes
 * yet, and the section below simply does not render while this is empty
 * rather than shipping invented five-star reviews. Add real entries as
 * `{ quote, name, company, role }` and the section appears on its own.
 */
export const TESTIMONIALS = []


export const OFFER_FAQS = [
  {
    q: 'What information do you need to prepare a proposal?',
    a: 'We need the business objective, intended users, required functions, existing systems, preferred timeline and a contact who can approve the scope.',
  },
  {
    q: 'Can you connect to our existing systems?',
    a: 'Yes. We can assess APIs, databases, payment services, communication tools and other systems during scope definition.',
  },
  {
    q: 'Do you build products for internal teams?',
    a: 'Yes. Software and ERP applications can support internal workflows, permissions, approvals, reporting and operational data.',
  },
  {
    q: 'How do you handle changes during development?',
    a: 'Changes are reviewed against the approved scope. We document their effect on delivery and quotation before work starts.',
  },
  {
    q: 'What do we receive at handover?',
    a: 'You receive the agreed release, relevant account access, operating instructions and the support details defined in the project scope.',
  },
  {
    q: 'How do payments work?',
    a: 'The quotation sets out the payment schedule. It is agreed before work begins and can be tied to defined delivery milestones.',
  },
]
