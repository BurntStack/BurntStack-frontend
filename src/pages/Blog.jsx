import { useMemo, useState } from 'react'
import { FiSearch, FiClock, FiArrowRight } from 'react-icons/fi'
import Seo from '@/components/seo/Seo.jsx'
import PageHero from '@/components/ui/PageHero.jsx'
import Section from '@/components/ui/Section.jsx'
import Container from '@/components/ui/Container.jsx'
import { cn } from '@/utils/cn.js'
import { BLOG_POSTS, BLOG_CATEGORIES } from '@/data/blog.js'
import { BentoGrid, BentoCard } from '@/components/ui/Bento.jsx'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function Blog() {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')

  const featured = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0]

  const filtered = useMemo(() => {
    return BLOG_POSTS.filter((p) => {
      const matchesCat = category === 'All' || p.category === category
      const matchesQuery =
        !query ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      return matchesCat && matchesQuery
    })
  }, [category, query])

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
          {/* Featured article */}
          <BentoGrid cols="grid-cols-1">
            <BentoCard span="col-span-1" tone="surface" size="none" className="lg:flex-row">
              <div className={cn('relative flex h-56 shrink-0 items-center justify-center bg-gradient-to-br lg:h-auto lg:w-2/5', featured.gradient)}>
                <div className="absolute inset-0 bg-dot-grid opacity-40" />
                <span className="rounded-full bg-white/70 px-4 py-1.5 text-sm font-semibold text-ink backdrop-blur">
                  Featured
                </span>
              </div>
              <div className="flex flex-col justify-center gap-4 p-8 sm:p-10">
                <div className="flex items-center gap-3 text-sm text-slate">
                  <span className="font-semibold text-orange-600">{featured.category}</span>
                  <span>•</span>
                  <span>{formatDate(featured.date)}</span>
                  <span className="flex items-center gap-1"><FiClock className="h-3.5 w-3.5" /> {featured.readingTime} min</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{featured.title}</h2>
                <p className="text-slate">{featured.excerpt}</p>
                <button className="inline-flex w-fit items-center gap-1.5 font-semibold text-orange-600 hover:gap-2.5">
                  Read article <FiArrowRight className="h-4 w-4" />
                </button>
              </div>
            </BentoCard>
          </BentoGrid>

          {/* Controls */}
          <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {BLOG_CATEGORIES.map((cat) => (
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
          <BentoGrid key={category + query} className="mt-8" cols="grid-cols-2 sm:grid-cols-4 lg:grid-cols-6">
            {filtered.map((post) => (
              <BentoCard key={post.slug} span="col-span-2 sm:col-span-2 lg:col-span-2" tone="surface" size="none">
                <div className={cn('relative h-40 bg-gradient-to-br', post.gradient)}>
                  <div className="absolute inset-0 bg-dot-grid opacity-40" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-ink backdrop-blur">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="flex items-center gap-2 text-xs text-slate">
                    <span>{formatDate(post.date)}</span>
                    <span className="flex items-center gap-1"><FiClock className="h-3 w-3" /> {post.readingTime} min</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-ink">{post.title}</h3>
                  <p className="flex-1 text-sm text-slate">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-sand px-2 py-0.5 text-xs text-slate">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </BentoCard>
            ))}
          </BentoGrid>

          {filtered.length === 0 && (
            <p className="mt-12 text-center text-slate">No articles match your search.</p>
          )}
        </Container>
      </Section>
    </>
  )
}
