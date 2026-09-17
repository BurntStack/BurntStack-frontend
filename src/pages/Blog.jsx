import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FiSearch, FiClock, FiBookmark } from 'react-icons/fi'
import Seo from '@/components/seo/Seo.jsx'
import { buildBreadcrumbSchema } from '@/lib/schema.js'
import PageHero from '@/components/ui/PageHero.jsx'
import Section from '@/components/ui/Section.jsx'
import Container from '@/components/ui/Container.jsx'
import { cn } from '@/utils/cn.js'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/motion.js'
import api from '@/lib/axios.js'
import { readCache, writeCache } from '@/lib/sessionCache.js'

function CardSkeleton({ className }) {
  return <div className={cn('animate-pulse rounded-bento border border-line bg-sand/60', className)} />
}

export default function Blog() {
  // Seeded from sessionStorage so a repeat visit this session (or coming
  // back from a post) renders instantly with the last known data instead
  // of blanking out and re-showing a loading state for a network round
  // trip that already happened once. Still revalidates in the background
  // below - this is a cache, not a source of truth.
  const [categories, setCategories] = useState(() => readCache('blog-categories') ?? [])
  const [category, setCategory] = useState('All')
  // Synced with ?q= so a search is shareable/bookmarkable, and so the
  // WebSite SearchAction in schema.js (which promises Google a working
  // /blog?q={term} URL for the sitelinks search box) is actually true.
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const setQuery = (value) => {
    setSearchParams(value ? { q: value } : {}, { replace: true })
  }
  const [posts, setPosts] = useState(() => readCache('blog-posts:All:') ?? null)
  const [error, setError] = useState('')

  useEffect(() => {
    api
      .get('/blog/categories/')
      .then(({ data }) => {
        setCategories(data)
        writeCache('blog-categories', data)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const params = {}
    const selected = categories.find((c) => c.name === category)
    if (selected) params.category__slug = selected.slug
    if (query) params.search = query
    const cacheKey = `blog-posts:${category}:${query}`

    const cached = readCache(cacheKey)
    if (cached) setPosts(cached)

    const controller = new AbortController()
    api
      .get('/blog/', { params, signal: controller.signal })
      .then(({ data }) => {
        const results = data.results ?? data
        setPosts(results)
        writeCache(cacheKey, results)
      })
      .catch((err) => {
        if (err.name !== 'CanceledError' && !cached) setError('Could not load posts right now.')
      })
    return () => controller.abort()
    // Deliberately excludes `categories`: a user can't select a real
    // category until the buttons (rendered from `categories`) exist, so by
    // the time `category` actually changes to something other than 'All',
    // `categories` is already loaded. Including it here just means this
    // effect re-fires the moment the categories fetch resolves independently
    // of any real filter change, aborting the in-flight posts request and
    // racing a replacement - occasionally the abort's rejection didn't
    // resolve to a clean no-op, surfacing as "Could not load posts right
    // now" even though nothing was actually wrong.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, query])

  return (
    <>
      <Seo
        title="Blog"
        path="/blog"
        description="Engineering, AI, cloud and design insights from the BurntStack team."
        jsonLd={buildBreadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }])}
      />
      <PageHero
        eyebrow="Blog"
        title="Insights from the build"
        description="Practical engineering, AI, cloud and design lessons from the projects we ship."
      />

      <Section className="pt-0">
        <Container>
          {/* Controls */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {['All', ...categories.map((c) => c.name)].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={cn(
                    'rounded-full px-4 py-1.5 text-sm font-semibold transition-all',
                    category === cat
                      ? 'bg-orange-500 text-white'
                      : 'border border-line-strong bg-white text-slate hover:text-ink',
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 rounded-full border border-line-strong bg-white px-4 py-2 sm:w-64 sm:shrink-0">
              <FiSearch className="h-4 w-4 text-slate" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full bg-transparent text-sm text-ink placeholder:text-mute"
                aria-label="Search articles"
              />
            </div>
          </div>

          {error && <p className="mt-12 text-center text-slate">{error}</p>}

          {/* A real grid, always - never one giant card standing alone even
              with a single post. Every post gets an equal-size cell and
              wraps into a new row once there are more than fit the row
              width, exactly like a news site's article grid. */}
          {posts === null && !error && (
            <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <CardSkeleton key={i} className="h-80" />
              ))}
            </div>
          )}

          {posts?.length === 0 && (
            <p className="mt-8 rounded-bento border border-dashed border-line-strong bg-white p-10 text-center text-slate">
              No posts yet, check back soon.
            </p>
          )}

          {posts?.length > 0 && (
            <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <motion.div variants={fadeInUp} key={post.slug}>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group flex h-full flex-col border-t border-line pt-5 transition-colors duration-300 hover:border-orange-400"
                  >
                  <div className={cn('relative h-44 shrink-0 overflow-hidden rounded-sm', !post.cover_image && 'bg-gradient-to-br from-orange-100 via-amber-300/40 to-sand')}>
                    {post.cover_image ? (
                      <img src={post.cover_image} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="absolute inset-0 bg-dot-grid opacity-40" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-3 pt-5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      {post.category ? (
                        <span className="text-orange-600">{post.category}</span>
                      ) : (
                        <span />
                      )}
                      {post.is_featured && (
                        <span className="flex items-center gap-1 text-mute">
                          <FiBookmark className="h-3 w-3" /> Featured
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-xl font-bold tracking-[-0.02em] text-ink transition-colors duration-300 group-hover:text-orange-600">{post.title}</h3>
                    <p className="flex-1 text-sm text-slate">{post.excerpt}</p>
                    <div className="flex items-center gap-2 text-xs text-mute">
                      <span>By {post.author}</span>
                      <span className="flex items-center gap-1"><FiClock className="h-3 w-3" /> {post.reading_time} min</span>
                    </div>
                    {post.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.map((tag) => (
                          <span key={tag} className="rounded-full bg-sand px-2 py-0.5 text-xs text-slate">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}
