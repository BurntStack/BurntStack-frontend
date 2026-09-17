import {
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaXTwitter,
  FaGithub,
} from 'react-icons/fa6'

// Re-exported so every existing `import { COMPANY } from '@/data/site.js'`
// keeps working unchanged - see data/company.js for why the data itself
// lives there instead of here.
export { COMPANY } from './company.js'

/**
 * Primary navigation. The site is one landing page plus a handful of
 * supporting routes, so most of these are in-page sections rather than
 * separate pages.
 *
 * An entry carries either `to` (a real route) or `section` (an id on the
 * landing page). Sections are scrolled to directly - see useSectionNav -
 * rather than linked as `/#id`, which put a meaningless fragment in the
 * address bar.
 */
export const NAV_LINKS = [
  { label: 'What we do', section: 'services' },
  { label: 'Our work', to: '/portfolio' },
  { label: 'Pricing', section: 'pricing' },
  { label: 'How it works', section: 'process' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

export const SOCIALS = [
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: FaLinkedinIn },
  { label: 'X (Twitter)', href: 'https://x.com', icon: FaXTwitter },
  { label: 'Instagram', href: 'https://instagram.com', icon: FaInstagram },
  { label: 'Facebook', href: 'https://facebook.com', icon: FaFacebookF },
  { label: 'GitHub', href: 'https://github.com', icon: FaGithub },
]

export const FOOTER_LINKS = {
  'What we do': [
    { label: 'Business websites', section: 'services' },
    { label: 'Online stores', section: 'services' },
    { label: 'WhatsApp lead pipeline', section: 'services' },
    { label: 'SEO & Google setup', section: 'services' },
  ],
  Company: [
    { label: 'Our work', to: '/portfolio' },
    { label: 'Pricing', section: 'pricing' },
    { label: 'How it works', section: 'process' },
    { label: 'Blog', to: '/blog' },
  ],
  'Get in touch': [
    { label: 'Get a quote', quote: true },
    { label: 'Book a call', section: 'booking' },
    { label: 'FAQ', section: 'faq' },
  ],
  Legal: [
    { label: 'Privacy Policy', to: '/privacy-policy' },
    { label: 'Terms & Conditions', to: '/terms' },
  ],
}
