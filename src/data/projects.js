// Client projects confirmed by the owner. Describe the visible project
// honestly, including coming-soon sites; never invent delivery outcomes.
export const PROJECTS = [
  {
    slug: 'bookmyvenues',
    name: 'BookMyVenues',
    category: 'Venue Booking',
    gradient: 'from-orange-100 via-amber-300/40 to-sand',
    tech: [],
    blurb: 'A venue booking and events platform.',
    liveUrl: 'https://www.thebookmyvenues.in/',
    previewImage: '/projects/bookmyvenues.png',
    previewImageMobile: '/projects/bookmyvenues-mobile.png',
    // The host currently sends frame-ancestors 'none' and X-Frame-Options: DENY.
    // Enable only after its hosting configuration allows BurntStack to embed it.
    embedUrl: import.meta.env.VITE_BOOKMYVENUES_EMBED_ENABLED === 'true'
      ? 'https://www.thebookmyvenues.in/' : null,
    githubUrl: null,
  },
  {
    slug: 'manakutumbam',
    name: 'ManaKutumbam',
    category: 'Family & Community',
    status: 'Coming soon',
    tech: [],
    blurb: 'A coming-soon website for a platform that helps families connect and build lasting bonds.',
    liveUrl: 'https://www.manakutumbam.in/',
    embedUrl: 'https://www.manakutumbam.in/',
    previewImage: '/projects/manakutumbam.jpg',
    previewImageMobile: '/projects/manakutumbam-mobile.jpg',
  },
  {
    slug: 'velvora',
    name: 'Velvora',
    category: 'Fashion E-Commerce',
    tech: [],
    blurb: 'A clothing storefront with curated collections and a browsable fashion catalogue.',
    liveUrl: 'https://clothing-e-commerce-frondend.vercel.app/',
    embedUrl: 'https://clothing-e-commerce-frondend.vercel.app/',
    previewImage: '/projects/clothing-store.jpg',
    previewImageMobile: '/projects/clothing-store-mobile.jpg',
  },
  {
    slug: 'ram-laxman-gifts',
    name: 'Ram Laxman Gifts & Novelties',
    category: 'Gifts E-Commerce',
    tech: [],
    blurb: 'An online gift shop for a Warangal business, with gifts, toys and personalised collections.',
    liveUrl: 'https://gift-shop-frontend-red.vercel.app/',
    embedUrl: 'https://gift-shop-frontend-red.vercel.app/',
    previewImage: '/projects/gift-shop.jpg',
    previewImageMobile: '/projects/gift-shop-mobile.jpg',
  },
]
