import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FiSearch, FiClock, FiArrowUpRight, FiX, FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import Seo from '@/components/seo/Seo.jsx'
import { buildBreadcrumbSchema } from '@/lib/schema.js'
import api from '@/lib/axios.js'
import { readCache, writeCache } from '@/lib/sessionCache.js'
import './blog.css'

function ArticleImage({ post, index = 0 }) {
  const [failed, setFailed] = useState(false)
  return <div className={`article-image article-image-${index % 3}`}>
    {post.cover_image && !failed ? <img src={post.cover_image} alt="" loading="lazy" onError={() => setFailed(true)} /> : <div className="article-art" aria-hidden="true"><span>{['{ }', '↗', '✳'][index % 3]}</span><i /><b /></div>}
  </div>
}

function ArticleCard({ post, featured = false, index = 0 }) {
  const topic = typeof post.category === 'object' ? post.category?.name : post.category
  const tags = (post.tags || []).filter((tag) => tag !== topic).slice(0, 2)
  return <article className={featured ? 'article-card article-featured' : 'article-card'}>
    <Link to={`/blog/${post.slug}`} aria-label={post.title}>
      <ArticleImage key={`${post.slug}:${post.cover_image}`} post={post} index={index} />
      <div className="article-copy">
        <div className="article-labels">
          {featured && <span className="article-latest">{post.is_featured ? 'Featured article' : 'Latest article'}</span>}
          {topic && <span>{topic}</span>}
        </div>
        <h2>{post.title}</h2>
        <p className="article-excerpt">{post.excerpt}</p>
        {!featured && tags.length > 0 && <div className="article-topics">{tags.map((tag) => <span key={tag} title={tag}>{tag}</span>)}</div>}
        <div className="article-byline"><span>{post.author}</span>{post.reading_time > 0 && <span><FiClock aria-hidden="true" /> {post.reading_time} min read</span>}</div>
        {featured && <span className="article-read">Read article <FiArrowUpRight aria-hidden="true" /></span>}
      </div>
      {!featured && <span className="article-corner" aria-hidden="true"><FiArrowUpRight /></span>}
    </Link>
  </article>
}

export default function Blog() {
  const [categories, setCategories] = useState(() => readCache('blog-categories') ?? [])
  const [category, setCategory] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [posts, setPosts] = useState(null)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)
  const [page, setPage] = useState(1)
  const [hasNext, setHasNext] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    api.get('/blog/categories/', { signal: controller.signal })
      .then(({ data }) => {
        const list = data.results ?? data
        if (!Array.isArray(list)) return
        setCategories(list)
        writeCache('blog-categories', list)
      }).catch(() => {})
    return () => controller.abort()
  }, [])

  useEffect(() => {
    const params = { page, ordering: '-published_at' }
    if (category) params.category__slug = category
    if (query) params.search = query
    const cacheKey = `blog-posts:${category}:${query}:${page}`
    setPosts(readCache(cacheKey) || null)
    setError('')
    setLoading(true)
    setHasNext(false)
    const controller = new AbortController()
    api.get('/blog/', { params, signal: controller.signal })
      .then(({ data }) => {
        const results = data.results ?? data
        if (!Array.isArray(results)) throw new Error('Invalid blog response')
        setPosts(results)
        setHasNext(Boolean(data.next))
        writeCache(cacheKey, results)
      })
      .catch(() => { if (!controller.signal.aborted) setError('We couldn’t load the articles. Please try again.') })
      .finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [category, query, page, attempt])

  const setQuery = (value) => { setPage(1); setSearchParams(value ? { q: value } : {}, { replace: true }) }
  const hasFeature = page === 1 && !query && !category && posts?.length > 0
  const remaining = hasFeature ? posts.slice(1) : posts

  return <div className="blog-page studio-wrap">
    <Seo title="Engineering notes | BurntStack" path="/blog" description="Technical notes on websites, software applications, ERP systems, AI automation, voice agents, SaaS, mobile applications and e-commerce." jsonLd={buildBreadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }])} />
    <header className="blog-header"><h1>Engineering <em>notes.</em></h1><p>Technical guidance on websites, software, business systems and automation.</p></header>
    <div className="blog-controls">
      <div className="blog-filters" role="group" aria-label="Filter articles by category">
        {[{ name: 'All articles', slug: '' }, ...categories].map((item) => <button key={item.slug} aria-pressed={category === item.slug} onClick={() => { setCategory(item.slug); setPage(1) }}>{item.name}</button>)}
      </div>
      <div className="blog-search" role="search"><FiSearch aria-hidden="true" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search technical notes" aria-label="Search technical notes" />{query && <button aria-label="Clear search" onClick={() => setQuery('')}><FiX /></button>}</div>
    </div>
    {error && <div className="blog-state" role="alert"><p>{error}</p><button className="text-button" onClick={() => setAttempt((value) => value + 1)}>Try again <FiArrowRight /></button></div>}
    {loading && !posts && !error && <div className="blog-loading" role="status" aria-label="Loading articles"><div /><div /><div /></div>}
    {posts?.length === 0 && !loading && <div className="blog-state" role="status"><h2>{query || category ? 'No matching articles.' : 'No articles are available.'}</h2><p>{query || category ? 'Change the search term or select all articles.' : 'Please return later for new technical notes.'}</p>{(query || category) && <button className="text-button" onClick={() => { setCategory(''); setQuery('') }}>Show all articles <FiArrowRight /></button>}</div>}
    {hasFeature && <ArticleCard post={posts[0]} featured />}
    {remaining?.length > 0 && <div className="article-grid">{remaining.map((post, index) => <ArticleCard key={post.slug} post={post} index={index + 1} />)}</div>}
    {(page > 1 || hasNext) && <nav aria-label="Article pages" className="blog-pagination"><button disabled={loading || page === 1} onClick={() => setPage((value) => value - 1)}><FiArrowLeft /> Previous</button><span>Page {page}</span><button disabled={loading || !hasNext} onClick={() => setPage((value) => value + 1)}>Next <FiArrowRight /></button></nav>}
  </div>
}
