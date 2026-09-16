// Dynamic sitemap: static pages plus every published blog post, fetched
// live from the portal backend. The old static public/sitemap.xml only
// listed /blog itself - individual posts had no discovery path for search
// engines except crawling client-rendered links on the JS-hydrated /blog
// page, which is slow and unreliable for fresh content.

const STATIC_PAGES = [
  { path: '/', priority: '1.0' },
  { path: '/about', priority: '0.8' },
  { path: '/services', priority: '0.9' },
  { path: '/solutions', priority: '0.8' },
  { path: '/technologies', priority: '0.7' },
  { path: '/portfolio', priority: '0.8' },
  { path: '/case-studies', priority: '0.7' },
  { path: '/industries', priority: '0.7' },
  { path: '/blog', priority: '0.7' },
  { path: '/careers', priority: '0.6' },
  { path: '/contact', priority: '0.8' },
  { path: '/privacy-policy', priority: '0.3' },
  { path: '/terms', priority: '0.3' },
]

const SITE = 'https://www.burntstack.com'
const BLOG_API = 'https://backend-wine-one-95.vercel.app/api/blog/'

async function fetchAllPosts() {
  const posts = []
  let url = BLOG_API
  // The public feed is paginated; a handful of pages is a non-issue for a
  // sitemap that regenerates on every request.
  for (let i = 0; i < 20 && url; i++) {
    const res = await fetch(url)
    if (!res.ok) break
    const data = await res.json()
    posts.push(...(data.results ?? []))
    url = data.next
  }
  return posts
}

export default async function handler(req, res) {
  let posts = []
  try {
    posts = await fetchAllPosts()
  } catch (err) {
    console.error('sitemap: could not fetch posts', err)
    // Still serve the static pages rather than a 500 - a sitemap missing
    // posts once is far better than a sitemap missing entirely.
  }

  const urls = [
    ...STATIC_PAGES.map((p) => `<url><loc>${SITE}${p.path}</loc><priority>${p.priority}</priority></url>`),
    ...posts.map((p) => {
      const lastmod = p.published_at ? `<lastmod>${p.published_at.slice(0, 10)}</lastmod>` : ''
      return `<url><loc>${SITE}/blog/${p.slug}</loc>${lastmod}<priority>0.6</priority></url>`
    }),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  ${urls.join('\n  ')}\n</urlset>\n`

  res.setHeader('Content-Type', 'application/xml')
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
  res.status(200).send(xml)
}
