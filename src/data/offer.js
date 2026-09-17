import {
  FaGlobe,
  FaCartShopping,
  FaWhatsapp,
  FaMagnifyingGlassChart,
  FaMobileScreen,
  FaBrain,
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
  badge: 'Limited-time launch pricing',
  headline: 'Turn local searches into paying customers.',
  headlineAccent: 'Websites that sell, not just sit there.',
  subline:
    'Design, build and launch handled end to end — a fast, mobile-first site wired to WhatsApp and Google so enquiries actually reach your phone. No technical knowledge needed on your side.',
  primaryCta: 'Get my quote',
  secondaryCta: 'See our work',
  reassurance: 'Free consultation · No obligation · We reply within one business day',
}

// Promises, not statistics. Each one is something we decide and can keep.
export const PROOF_POINTS = [
  { value: '7 days', label: 'Typical launch time for a standard site' },
  { value: '1 month', label: 'Free post-launch support on every package' },
  { value: '100%', label: 'Custom built — never a recycled template' },
  { value: 'Warangal', label: 'Local team you can actually call' },
]

export const OFFER_SERVICES = [
  {
    icon: FaGlobe,
    title: 'Business websites',
    description:
      'A fast, mobile-first site that explains what you do and makes it obvious how to contact you. Built custom, not dropped onto a theme.',
  },
  {
    icon: FaCartShopping,
    title: 'Online stores',
    description:
      'Product catalogue, secure payments, order tracking and a checkout that does not lose people halfway through.',
  },
  {
    icon: FaWhatsapp,
    title: 'WhatsApp lead pipeline',
    description:
      'Every enquiry lands directly in your WhatsApp with the customer’s details attached, so nothing sits unread in an inbox.',
  },
  {
    icon: FaMagnifyingGlassChart,
    title: 'On-page SEO & Google setup',
    description:
      'Proper titles, schema, sitemaps, Google Business Profile and Analytics, so you show up when people search nearby.',
  },
  {
    icon: FaMobileScreen,
    title: 'Mobile apps',
    description:
      'iOS and Android apps for when a website is not enough — bookings, ordering, memberships or internal tools.',
  },
  {
    icon: FaBrain,
    title: 'AI & automation',
    description:
      'Chat assistants, automatic follow-ups and the small repetitive jobs your team should not be doing by hand.',
  },
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

export const PACKAGES = [
  {
    name: 'Landing Page', // TODO: confirm name
    tagline: 'One page, one goal: get the enquiry.',
    price: '₹—', // TODO: confirm price
    priceNote: 'one-time', // TODO: confirm
    delivery: 'TODO: delivery time',
    features: [
      'Single-page custom design',
      'Enquiry form + WhatsApp button',
      'Mobile and tablet optimised',
      'Free SSL and hosting setup',
      'Basic on-page SEO',
    ],
    highlighted: false,
  },
  {
    name: 'Business Website', // TODO: confirm name
    tagline: 'The full picture of your business, done properly.',
    price: '₹—', // TODO: confirm price
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
    tagline: 'Content you control, built to grow.',
    price: '₹—', // TODO: confirm price
    priceNote: 'one-time', // TODO: confirm
    delivery: 'TODO: delivery time',
    features: [
      'Up to 12 custom pages',
      'Blog / CMS you can edit yourself',
      'Advanced SEO and speed tuning',
      'Booking or enquiry workflow',
      'Three months of free changes',
    ],
    highlighted: false,
  },
  {
    name: 'E-Commerce Store', // TODO: confirm name
    tagline: 'Sell online, end to end.',
    price: 'Custom',
    priceNote: 'quoted per store',
    delivery: 'TODO: delivery time',
    features: [
      'Full product catalogue',
      'Secure payment gateway',
      'Inventory and order management',
      'Shipping and tax configuration',
      'Staff training on handover',
    ],
    highlighted: false,
  },
]

/**
 * Client testimonials. Empty on purpose: we don't have signed-off quotes
 * yet, and the section below simply does not render while this is empty
 * rather than shipping invented five-star reviews. Add real entries as
 * `{ quote, name, company, role }` and the section appears on its own.
 */
export const TESTIMONIALS = []

export const OFFER_STEPS = [
  { step: '01', title: 'Free call', description: 'Fifteen minutes on what your business does and what the site needs to achieve.' },
  { step: '02', title: 'Fixed quote', description: 'A written scope and price. No hourly surprises, no scope creeping in later.' },
  { step: '03', title: 'Design', description: 'You see the real design before a line of code is written, and you sign it off.' },
  { step: '04', title: 'Build & launch', description: 'We build, test on real devices, connect your domain and put it live.' },
  { step: '05', title: 'Support', description: 'Free changes for your support window, then an optional monthly plan if you want us on call.' },
]

export const OFFER_FAQS = [
  {
    q: 'Do I need to provide the content and photos?',
    a: 'Only if you want to. Send whatever you already have and we will write and arrange the rest, then check it with you before anything goes live.',
  },
  {
    q: 'Will the site work properly on phones?',
    a: 'Yes. We design for mobile first and test on real devices, because that is where almost all local searches actually happen.',
  },
  {
    q: 'Can I edit the site myself afterwards?',
    a: 'On the packages that include a CMS, yes, and we walk you through it on handover. On the simpler packages we handle changes for you during your support window.',
  },
  {
    q: 'What happens after the free support period ends?',
    a: 'Nothing breaks and the site stays yours. You can request changes as one-off jobs or move onto a monthly plan, whichever suits you.',
  },
  {
    q: 'Who owns the website and the domain?',
    a: 'You do. The domain is registered in your name and the site is handed over to you in full — we are not holding anything hostage.',
  },
  {
    q: 'How do payments work?',
    a: 'A deposit to start and the balance on launch. Larger builds are split into milestones tied to what has actually been delivered.',
  },
]
