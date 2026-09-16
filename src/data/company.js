// Split out from site.js deliberately: this file has zero icon (or any
// other heavy) imports. schema.js pulls COMPANY into every single page's
// bundle (for Organization/LocalBusiness JSON-LD), and ES modules bundle
// at the file level - importing COMPANY from site.js would drag SOCIALS'
// react-icons/fa6 imports along for the ride even though schema.js never
// touches them. Measured directly: that exact coupling took the shared
// "Seo" chunk from 1.36KB to 50.5KB.
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
