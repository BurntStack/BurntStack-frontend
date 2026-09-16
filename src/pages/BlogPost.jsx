import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import DOMPurify from 'dompurify'
import { FiClock, FiArrowLeft } from 'react-icons/fi'
import Seo from '@/components/seo/Seo.jsx'
import Section from '@/components/ui/Section.jsx'
import Container from '@/components/ui/Container.jsx'
import { cn } from '@/utils/cn.js'
import api from '@/lib/axios.js'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    setStatus('loading')
    setPost(null)
    api
      .get(`/blog/${slug}/`)
      .then(({ data }) => {
        setPost(data)
        setStatus('done')
      })
      .catch(() => setStatus('error'))
  }, [slug])

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
            <p className="text-slate">We couldn’t find that post.</p>
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
      <Seo title={post.title} path={`/blog/${post.slug}`} description={post.excerpt} />

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
              <img src={post.cover_image} alt="" className="w-full object-cover" />
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
    </>
  )
}
