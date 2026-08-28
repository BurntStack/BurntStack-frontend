import { Helmet } from 'react-helmet-async'
import { COMPANY } from '@/data/site.js'

const SITE_URL = 'https://burntstack.com'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`

/**
 * Centralised SEO component: dynamic meta tags, Open Graph, Twitter cards,
 * canonical URLs and optional JSON-LD structured data.
 */
export default function Seo({
  title,
  description,
  path = '',
  image = DEFAULT_IMAGE,
  type = 'website',
  jsonLd,
}) {
  const fullTitle = title
    ? `${title} | ${COMPANY.shortName}`
    : `${COMPANY.name} | ${COMPANY.tagline}`
  const url = `${SITE_URL}${path}`
  const desc =
    description ||
    'BurntStack Technologies builds websites, mobile apps, AI solutions, cloud platforms, and enterprise software that help businesses grow faster.'

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={COMPANY.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image} />

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  )
}
