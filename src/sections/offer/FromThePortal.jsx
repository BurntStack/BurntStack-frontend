import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiClock } from 'react-icons/fi'
import { motion } from 'framer-motion'
import Band from '@/components/editorial/Band.jsx'
import Label from '@/components/editorial/Label.jsx'
import Display from '@/components/editorial/Display.jsx'
import Button from '@/components/ui/Button.jsx'
import api from '@/lib/axios.js'
import { readCache, writeCache } from '@/lib/sessionCache.js'
import { fadeInUp } from '@/lib/motion.js'
import { cn } from '@/utils/cn.js'

const CACHE_KEY = 'home-latest-posts'
const HOW_MANY = 3

/**
 * The latest posts the team has published from the employee portal.
 *
 * Read from the portal's public feed, the same endpoint /blog uses, so
 * anything an employee publishes and an admin approves appears here with
 * no deploy. Cached per tab (stale-while-revalidate) so moving between
 * pages doesn't re-fetch.
 *
 * Renders nothing at all when there are no posts: an empty "latest from
 * the blog" heading on a sales page is worse than no section.
 */
export default function FromThePortal() {
  const [posts, setPosts] = useState(() => readCache(CACHE_KEY) || [])
  const [settled, setSettled] = useState(false)

  useEffect(() => {
    let active = true
    api
      .get('/blog/', { params: { page_size: HOW_MANY } })
      .then(({ data }) => {
        if (!active) return
        const next = (data?.results ?? []).slice(0, HOW_MANY)
        setPosts(next)
        writeCache(CACHE_KEY, next)
      })
      .catch(() => {
        // The marketing page must not break because the portal backend is
        // down; the section simply stays hidden.
      })
      .finally(() => active && setSettled(true))
    return () => {
      active = false
    }
  }, [])

  if (settled && posts.length === 0) return null
  if (!settled && posts.length === 0) return null

  return (
    <Band id="insights" tone="canvas">
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] md:items-end">
        <div>
          <Label index="02">From the team</Label>
          <Display className="mt-6 max-w-[15ch]" accent="worth reading.">
            What we have been writing
          </Display>
        </div>
        <p className="text-slate md:pb-3">
          Written by the people who build the work, published straight from our employee portal.
        </p>
      </div>

      <div className="mt-14 grid gap-x-10 gap-y-12 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-3 sm:mt-20">
        {posts.map((post) => (
          <motion.div key={post.slug} variants={fadeInUp}>
            <Link to={`/blog/${post.slug}`} className="group flex h-full flex-col">
              <div
                className={cn(
                  'relative h-44 shrink-0 overflow-hidden rounded-sm',
                  !post.cover_image && 'bg-gradient-to-br from-orange-100 via-amber-300/40 to-sand',
                )}
              >
                {post.cover_image && (
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              {post.category && (
                <span className="t-label mt-5 text-orange-700">
                  {typeof post.category === 'string' ? post.category : post.category.name}
                </span>
              )}
              <h3 className="mt-3 font-display text-xl font-bold tracking-[-0.02em] text-ink transition-colors duration-300 group-hover:text-orange-600">
                {post.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate">{post.excerpt}</p>
              <span className="mt-5 flex items-center gap-3 text-xs text-mute">
                <span>By {post.author}</span>
                {post.reading_time && (
                  <span className="inline-flex items-center gap-1">
                    <FiClock className="h-3 w-3" /> {post.reading_time} min
                  </span>
                )}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-12">
        <Button to="/blog" variant="outline" size="lg">
          Read the blog <FiArrowUpRight className="h-4 w-4" />
        </Button>
      </div>
    </Band>
  )
}
