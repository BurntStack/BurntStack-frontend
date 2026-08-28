import {
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaXTwitter,
  FaGithub,
} from 'react-icons/fa6'

export const COMPANY = {
  name: 'BurntStack Technologies',
  shortName: 'BurntStack',
  legalName: 'BurntStack Technologies Private Limited',
  tagline: 'Building Software That Powers Businesses',
  email: 'hello@burntstack.com',
  phone: '+91 79816 72639',
  address: 'Stambampalle, Khila Warangal Mandal, Warangal, Telangana 506013, India',
  mapQuery: '17.966963,79.628964',
  addressLocality: 'Warangal',
  addressRegion: 'Telangana',
  postalCode: '506013',
}

// Primary navigation shown in the navbar.
export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Technologies', to: '/technologies' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Industries', to: '/industries' },
  { label: 'Blog', to: '/blog' },
  { label: 'Careers', to: '/careers' },
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
  Services: [
    { label: 'Web Development', to: '/services' },
    { label: 'Mobile Apps', to: '/services' },
    { label: 'AI & Machine Learning', to: '/services' },
    { label: 'Cloud Solutions', to: '/services' },
    { label: 'Enterprise Software', to: '/services' },
  ],
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Portfolio', to: '/portfolio' },
    { label: 'Case Studies', to: '/case-studies' },
    { label: 'Industries', to: '/industries' },
    { label: 'Careers', to: '/careers' },
  ],
  Resources: [
    { label: 'Blog', to: '/blog' },
    { label: 'Solutions', to: '/solutions' },
    { label: 'Technologies', to: '/technologies' },
    { label: 'Contact', to: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', to: '/privacy-policy' },
    { label: 'Terms & Conditions', to: '/terms' },
  ],
}
