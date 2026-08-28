import { useEffect, useState } from 'react'
import { FiSearch, FiClock } from 'react-icons/fi'
import Seo from '@/components/seo/Seo.jsx'
import PageHero from '@/components/ui/PageHero.jsx'
import Section from '@/components/ui/Section.jsx'
import Container from '@/components/ui/Container.jsx'
import { cn } from '@/utils/cn.js'
import { BentoGrid, BentoCard } from '@/components/ui/Bento.jsx'
import api from '@/lib/axios.js'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function Blog() {
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [posts, setPosts] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/blog/categories/').then(({ data }) => setCategories(data)).catch(() => {})
  }, [])

  useEffect(() => {
    const params = {}
    const selected = categories.find((c) => c.name === category)
    if (selected) params.category__slug = selected.slug
    if (query) params.search = query

    const controller = new AbortController()
    api
      .get('/blog/', { params, signal: controller.signal })
      .then(({ data }) => setPosts(data.results ?? data))
      .catch((err) => {
        if (err.name !== 'CanceledError') setError('Could not load posts right now.')
      })
    return () => controller.abort()
  }, [category, query, categories])

  const featured = posts?.find((p) => p.is_featured) || posts?.[0]
  const rest = posts?.filter((p) => p.slug !== featured?.slug) ?? []

  return (
    <>
      <Seo
        title="Blog"
        path="/blog"
        description="Engineering, AI, cloud and design insights from the BurntStack team."
      />
      <PageHero
        eyebrow="Blog"
        title="Insights from the build"
        description="Practical engineering, AI, cloud and design lessons from the projects we ship."
      />

      <Section className="pt-0">
        <Container>
          {error && <p className="text-center text-slate">{error}</p>}
          {posts === null && !error && <p className="text-center text-slate">Loading posts…</p>}

          {posts?.length === 0 && (
            <p className="rounded-bento border border-dashed border-line-strong bg-white p-10 text-center text-slate">
              No posts yet, check back soon.
            </p>
          )}

          {featured && (
            <BentoGrid cols="grid-cols-1">
              <BentoCard span="col-span-1" tone="surface" size="none" className="lg:flex-row">
                <div className={cn('relative flex h-56 shrink-0 items-center justify-center bg-gradient-to-br lg:h-auto lg:w-2/5', !featured.cover_image && 'from-orange-100 via-amber-300/40 to-sand')}>
                  {featured.cover_image ? (
                    <img src={featured.cover_image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 bg-dot-grid opacity-40" />
                  )}
                  <span className="relative rounded-full bg-white/70 px-4 py-1.5 text-sm font-semibold text-ink backdrop-blur">
                    Featured
                  </span>
                </div>
                <div className="flex flex-col justify-center gap-4 p-8 sm:p-10">
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate">
                    {featured.category && <span className="font-semibold text-orange-600">{featured.category}</span>}
                    <span>By {featured.author}</span>
                    {featured.published_at && <span>{formatDate(featured.published_at)}</span>}
                    <span className="flex items-center gap-1"><FiClock className="h-3.5 w-3.5" /> {featured.reading_time} min</span>
                  </div>
                  <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{featured.title}</h2>
                  <p className="text-slate">{featured.excerpt}</p>
                </div>
              </BentoCard>
            </BentoGrid>
          )}

          {/* Controls */}
          <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
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
            <div className="flex items-center gap-2 rounded-full border border-line-strong bg-white px-4 py-2 lg:w-72">
              <FiSearch className="h-4 w-4 text-slate" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-mute"
                aria-label="Search articles"
              />
            </div>
          </div>

          {/* Post grid */}
          {rest.length > 0 && (
            <BentoGrid className="mt-8" cols="grid-cols-2 sm:grid-cols-4 lg:grid-cols-6">
              {rest.map((post) => (
                <BentoCard key={post.slug} span="col-span-2 sm:col-span-2 lg:col-span-2" tone="surface" size="none">
                  <div className={cn('relative h-40', !post.cover_image && 'bg-gradient-to-br from-orange-100 via-amber-300/40 to-sand')}>
                    {post.cover_image ? (
                      <img src={post.cover_image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 bg-dot-grid opacity-40" />
                    )}
                    {post.category && (
                      <span className="absolute left-4 top-4 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-ink backdrop-blur">
                        {post.category}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <div className="flex items-center gap-2 text-xs text-slate">
                      <span>By {post.author}</span>
                      <span className="flex items-center gap-1"><FiClock className="h-3 w-3" /> {post.reading_time} min</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-ink">{post.title}</h3>
                    <p className="flex-1 text-sm text-slate">{post.excerpt}</p>
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
                </BentoCard>
              ))}
            </BentoGrid>
          )}
        </Container>
      </Section>
    </>
  )
}
