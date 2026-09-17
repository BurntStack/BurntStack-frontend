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
 * Primary navigation. The site is one offer landing page plus a handful of
 * supporting routes, so most of these are in-page sections rather than
 * separate pages. The `/#id` form works from any route - ScrollToTop
 * honours the hash on arrival, and Lenis handles it when we're already on
 * the homepage.
 */
export const NAV_LINKS = [
  { label: 'What we do', to: '/#services' },
  { label: 'Our work', to: '/portfolio' },
  { label: 'Pricing', to: '/#pricing' },
  { label: 'How it works', to: '/#process' },
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
    { label: 'Business websites', to: '/#services' },
    { label: 'Online stores', to: '/#services' },
    { label: 'WhatsApp lead pipeline', to: '/#services' },
    { label: 'SEO & Google setup', to: '/#services' },
  ],
  Company: [
    { label: 'Our work', to: '/portfolio' },
    { label: 'Pricing', to: '/#pricing' },
    { label: 'How it works', to: '/#process' },
    { label: 'Blog', to: '/blog' },
  ],
  'Get in touch': [
    { label: 'Get a quote', to: '/#quote' },
    { label: 'Book a call', to: '/contact' },
    { label: 'FAQ', to: '/#faq' },
  ],
  Legal: [
    { label: 'Privacy Policy', to: '/privacy-policy' },
    { label: 'Terms & Conditions', to: '/terms' },
  ],
}
