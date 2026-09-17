import { COMPANY } from '@/data/company.js'

const SITE_URL = 'https://www.burntstack.com'
const LOGO_URL = `${SITE_URL}/logo-mark.png`

/**
 * Structured data (JSON-LD) builders. Kept in one place so every page pulls
 * from the same real company facts instead of re-typing them - and so a
 * future address/phone change only needs updating in data/site.js.
 */

// Organization + LocalBusiness combined: schema.org allows multiple types
// on one node, and we have a real street address and real GPS coordinates
// (COMPANY.mapQuery), so this is eligible for Google's local pack /
// Maps-linked rich results, not just a generic Organization card.
export function buildOrganizationSchema() {
  const [lat, lng] = COMPANY.mapQuery.split(',').map(Number)
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    '@id': `${SITE_URL}/#organization`,
    name: COMPANY.legalName,
    alternateName: COMPANY.shortName,
    url: SITE_URL,
    logo: LOGO_URL,
    image: LOGO_URL,
    email: COMPANY.email,
    telephone: COMPANY.phone,
    description: COMPANY.tagline,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.address,
      addressLocality: COMPANY.addressLocality,
      addressRegion: COMPANY.addressRegion,
      postalCode: COMPANY.postalCode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: lat,
      longitude: lng,
    },
  }
}

// Enables Google's sitelinks search box (a search field right in the SERP
// entry for the site) - requires the site to actually support the query
// param the template promises, which the Blog page's ?q= filter does.
export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: COMPANY.name,
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/blog?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  }
}

// A visible breadcrumb trail isn't required for this - Google can render
// the rich breadcrumb in search results from this schema alone, replacing
// the raw URL under the title with a real path.
export function buildBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}

// Renders as an expandable Q&A block directly in search results ("people
// also ask"-style) when Google trusts the page enough to show it.
export function buildFaqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }
}

// Lets Google show the author, publish date and a thumbnail directly in
// the search result for a blog post instead of just a title/description.
export function buildBlogPostingSchema(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${SITE_URL}/blog/${post.slug}/#article`,
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image || LOGO_URL,
    datePublished: post.published_at,
    dateModified: post.published_at,
    author: { '@type': 'Person', name: post.author },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    ...(post.category?.name && { articleSection: post.category.name }),
    ...(post.tags?.length > 0 && { keywords: post.tags.join(', ') }),
  }
}
