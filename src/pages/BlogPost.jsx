import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import DOMPurify from 'dompurify'
import { FiClock, FiArrowLeft } from 'react-icons/fi'
import Seo from '@/components/seo/Seo.jsx'
import Section from '@/components/ui/Section.jsx'
import Container from '@/components/ui/Container.jsx'
import { cn } from '@/utils/cn.js'
import api from '@/lib/axios.js'
import { buildBlogPostingSchema, buildBreadcrumbSchema } from '@/lib/schema.js'
import { blogImageUrl } from '@/lib/blogImage.js'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function BlogPost() {
  const { slug } = useParams()
  const prerendered = typeof window !== 'undefined' && window.__BLOG_POST__?.slug === slug ? window.__BLOG_POST__ : null
  const [post, setPost] = useState(prerendered)
  const [status, setStatus] = useState(prerendered ? 'done' : 'loading')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    if (prerendered) {
      window.__BLOG_POST__ = null
      return undefined
    }
    setStatus('loading')
    setPost(null)
    const controller = new AbortController()
    api
      .get(`/blog/${encodeURIComponent(slug)}/`, { signal: controller.signal })
      .then(({ data }) => {
        setPost(data)
        setStatus('done')
      })
      .catch((error) => { if (!controller.signal.aborted) setStatus(error.response?.status === 404 ? 'missing' : 'error') })
    return () => controller.abort()
  }, [slug, attempt, prerendered])

  if (status === 'loading') {
    return (
      <Section>
        <Container>
          <p className="text-center text-slate">Loading post…</p>
        </Container>
      </Section>
    )
  }

  if (status === 'error' || !post) {
    return (
      <Section>
        <Container>
          <div className="rounded-bento border border-dashed border-line-strong bg-white p-10 text-center">
            <p role="status" className="text-slate">{status === 'missing' ? 'We couldn’t find that post.' : 'We couldn’t load this article right now.'}</p>
            {status !== 'missing' && <button className="text-button mt-4" onClick={() => setAttempt((value) => value + 1)}>Try again</button>}
            <Link to="/blog" className="mt-4 inline-flex items-center gap-2 font-semibold text-orange-600 hover:text-orange-700">
              <FiArrowLeft className="h-4 w-4" /> Back to blog
            </Link>
          </div>
        </Container>
      </Section>
    )
  }

  // Server (bleach) already sanitizes on save, but this content is rendered
  // as raw HTML in a different app than the one that wrote it - never trust
  // that as a substitute for sanitizing again on the way in here.
  const safeContent = DOMPurify.sanitize(post.content, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 's', 'a', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'blockquote', 'code', 'pre', 'img', 'hr',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
    ],
    ALLOWED_ATTR: ['href', 'title', 'target', 'rel', 'src', 'alt', 'width', 'height'],
  })

  return (
    <>
      <Seo
        title={post.title}
        path={`/blog/${post.slug}`}
        description={post.excerpt}
        type="article"
        publishedAt={post.published_at}
        image={post.cover_image || undefined}
        jsonLd={[
          buildBlogPostingSchema(post),
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <Section className="pb-0">
        <Container className="max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700">
            <FiArrowLeft className="h-4 w-4" /> Back to blog
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate">
            {post.category?.name && <span className="font-semibold text-orange-600">{post.category.name}</span>}
            <span>By {post.author}</span>
            {post.published_at && <span>{formatDate(post.published_at)}</span>}
            <span className="flex items-center gap-1"><FiClock className="h-3.5 w-3.5" /> {post.reading_time} min read</span>
          </div>

          <h1 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">{post.title}</h1>
          <p className="mt-4 text-lg text-slate">{post.excerpt}</p>

          {post.cover_image && (
            <div className="mt-8 overflow-hidden rounded-bento border border-line">
              <img src={blogImageUrl(post.cover_image, { width: 1200 })} alt={post.title} width="1200" height="675" fetchPriority="high" decoding="async" className="aspect-video w-full object-cover" />
            </div>
          )}

          {post.tags?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-sand px-2.5 py-1 text-xs font-medium text-slate">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </Container>
      </Section>

      <Section>
        <Container className="max-w-3xl">
          <div className={cn('post-content')} dangerouslySetInnerHTML={{ __html: safeContent }} />
        </Container>
      </Section>
      {post.related_posts?.length > 0 && (
        <Section className="pt-0">
          <Container className="max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-ink">Keep reading</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {post.related_posts.map((related) => (
                <Link key={related.slug} to={`/blog/${related.slug}`} className="rounded-lg border border-line bg-white p-4 transition-colors hover:border-orange-500">
                  <span className="text-sm font-semibold text-ink">{related.title}</span>
                  <span className="mt-2 block text-xs text-slate">Read article →</span>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  )
}
