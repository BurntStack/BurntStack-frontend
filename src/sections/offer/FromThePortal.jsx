import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiClock } from 'react-icons/fi'
import api from '@/lib/axios.js'
import { readCache, writeCache } from '@/lib/sessionCache.js'

const CACHE_KEY = 'home-latest-posts'

export default function FromThePortal() {
  const [posts, setPosts] = useState(() => readCache(CACHE_KEY) || [])
  const [status, setStatus] = useState('loading')
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    const controller = new AbortController()
    setStatus('loading')
    api.get('/blog/', { params: { ordering: '-published_at', page_size: 3 }, signal: controller.signal })
      .then(({ data }) => {
        const results = data.results ?? data
        if (!Array.isArray(results)) throw new Error('Invalid blog response')
        const latest = results.slice(0, 3)
        setPosts(latest)
        writeCache(CACHE_KEY, latest)
        setStatus('ready')
      })
      .catch(() => { if (!controller.signal.aborted) setStatus('error') })
    return () => controller.abort()
  }, [attempt])

  return <section id="insights" className="studio-section studio-wrap studio-journal">
    <div className="section-heading"><h2>Technical <em>notes.</em></h2><Link className="text-button" to="/blog">View all articles <FiArrowUpRight /></Link></div>
    {status === 'error' && <p className="journal-status" role="status">Articles are unavailable at the moment. <button className="text-button" onClick={() => setAttempt((value) => value + 1)}>Retry <FiArrowUpRight /></button></p>}
    {posts.length > 0 ? <div className="journal-grid">{posts.map((post, index) => <Link className="journal-card" to={`/blog/${post.slug}`} key={post.slug}>
      <div className={`journal-art journal-art-${index}`}>
        {post.cover_image ? <img src={post.cover_image} alt="" loading="lazy" /> : <span aria-hidden="true">{['✳', '↗', '⌘'][index]}</span>}
        <FiArrowUpRight className="journal-arrow" />
      </div>
      <span className="journal-category">{typeof post.category === 'object' ? post.category?.name : post.category || 'Engineering'}</span>
      <h3>{post.title}</h3><p>{post.excerpt}</p>
      <span className="journal-meta">By {post.author}{post.reading_time > 0 && <span><FiClock /> {post.reading_time} min</span>}</span>
    </Link>)}</div> : <p className="journal-status" role="status">{status === 'loading' ? 'Loading technical notes…' : status === 'ready' ? 'No articles are available yet.' : 'The article feed is unavailable. Please try again later.'}</p>}
  </section>
}
