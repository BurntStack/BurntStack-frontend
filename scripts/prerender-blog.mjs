import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))
const project = join(root, '..')
const dist = join(project, 'dist')
const apiBase = (process.env.VITE_BLOG_API_URL || 'https://backend-wine-one-95.vercel.app/api').replace(/\/$/, '')
const site = 'https://www.burntstack.com'

const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char])
const safeContent = (value = '') => String(value)
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace(/<style[\s\S]*?<\/style>/gi, '')
  .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
  .replace(/javascript:/gi, '')
const blogImageUrl = (source, width) => {
  try {
    const url = new URL(source)
    if (!url.hostname.endsWith('.supabase.co') || !url.pathname.includes('/storage/v1/object/public/')) return source
    url.pathname = url.pathname.replace('/storage/v1/object/public/', '/storage/v1/render/image/public/')
    url.searchParams.set('width', String(width)); url.searchParams.set('quality', '82'); url.searchParams.set('format', 'webp')
    return url.toString()
  } catch { return source }
}

async function getJson(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(12000), headers: { accept: 'application/json' } })
  if (!response.ok) throw new Error(`${response.status} ${url}`)
  return response.json()
}

async function allPosts() {
  const posts = []
  let url = `${apiBase}/blog/?page_size=100&ordering=-published_at`
  const origin = new URL(url).origin
  for (let page = 0; page < 50 && url; page += 1) {
    const data = await getJson(url)
    posts.push(...(Array.isArray(data) ? data : data.results || []))
    const next = data.next ? new URL(data.next, url) : null
    url = next?.origin === origin ? next.href : null
  }
  return posts
}

function articleMarkup(post) {
  const date = post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''
  const image = post.cover_image ? `<img src="${escapeHtml(blogImageUrl(post.cover_image, 1200))}" alt="${escapeHtml(post.title)}" width="1200" height="675" fetchpriority="high" decoding="async" class="w-full object-cover" />` : ''
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${site}/blog/${post.slug}/#article`,
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image || `${site}/logo-mark.png`,
    datePublished: post.published_at,
    dateModified: post.published_at,
    author: { '@type': 'Person', name: post.author },
    publisher: { '@type': 'Organization', name: 'BurntStack Technologies', url: site },
    mainEntityOfPage: `${site}/blog/${post.slug}`,
  }
  return `<main id="main"><article class="blog-prerender studio-wrap"><a href="/blog" class="text-button">← Back to blog</a><p class="blog-prerender-meta">${escapeHtml(post.category?.name || '')} · By ${escapeHtml(post.author || '')} · ${escapeHtml(date)} · ${post.reading_time || 5} min read</p><h1>${escapeHtml(post.title)}</h1><p class="blog-prerender-excerpt">${escapeHtml(post.excerpt)}</p>${image}<div class="post-content">${safeContent(post.content)}</div>${post.related_posts?.length ? `<nav aria-label="Related articles"><h2>Keep reading</h2><ul>${post.related_posts.map((related) => `<li><a href="/blog/${encodeURIComponent(related.slug)}">${escapeHtml(related.title)}</a></li>`).join('')}</ul></nav>` : ''}</article></main><script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`
}

try {
  const template = await readFile(join(dist, 'index.html'), 'utf8')
  const posts = await allPosts()
  const details = await Promise.all(posts.map(async (post) => ({ ...post, ...(await getJson(`${apiBase}/blog/${encodeURIComponent(post.slug)}/`)) })))
  await Promise.all(details.map(async (post) => {
    const html = template
      .replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(post.title)} | BurntStack Technologies</title>`)
      .replace('</head>', `<meta name="description" content="${escapeHtml(post.excerpt)}" /><link rel="canonical" href="${site}/blog/${encodeURIComponent(post.slug)}" /><meta property="og:type" content="article" /><meta property="og:title" content="${escapeHtml(post.title)}" /><meta property="og:description" content="${escapeHtml(post.excerpt)}" />${post.cover_image ? `<meta property="og:image" content="${escapeHtml(post.cover_image)}" />` : ''}</head>`)
      .replace('<div id="root"></div>', `<div id="root">${articleMarkup(post)}</div><script>window.__BLOG_POST__=${JSON.stringify(post).replace(/</g, '\\u003c')}</script>`)
    const output = join(dist, 'blog', post.slug, 'index.html')
    await mkdir(dirname(output), { recursive: true })
    await writeFile(output, html)
  }))
  console.log(`Prerendered ${details.length} blog articles.`)
} catch (error) {
  console.warn(`Blog prerender skipped: ${error.message}`)
}
