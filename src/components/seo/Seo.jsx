import { Helmet } from 'react-helmet-async'
import { COMPANY } from '@/data/site.js'

// The actual serving domain - burntstack.com (no www) 301s here. Canonical
// and social-share URLs must point straight at it: a canonical tag that
// itself redirects elsewhere just adds ambiguity for Google about which
// URL is authoritative.
const SITE_URL = 'https://www.burntstack.com'
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
  publishedAt,
  jsonLd,
  noindex = false,
}) {
  const fullTitle = title
    ? (title.includes(COMPANY.shortName) ? title : `${title} | ${COMPANY.shortName}`)
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
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={COMPANY.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={fullTitle} />
      {publishedAt && <meta property="article:published_time" content={publishedAt} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image} />

      {jsonLd &&
        (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).map((schema, i) => (
          <script key={i} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        ))}
    </Helmet>
  )
}
