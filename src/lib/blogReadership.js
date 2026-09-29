import api from './axios.js'

/** Count article sessions without cookies, IP storage, or cross-session identity. */
export function trackArticle(slug) {
  if (!slug || typeof window === 'undefined' || navigator.globalPrivacyControl || navigator.doNotTrack === '1') return () => {}
  let session
  try {
    session = sessionStorage.getItem('burntstack-reader-session') || crypto.randomUUID()
    sessionStorage.setItem('burntstack-reader-session', session)
  } catch { return () => {} }

  const send = engaged => api.post(`/blog/${encodeURIComponent(slug)}/events/`, { session, engaged }).catch(() => {})
  send(false)
  let visibleMilliseconds = 0, previous = performance.now(), sent = false
  const check = () => {
    const now = performance.now()
    if (document.visibilityState === 'visible') visibleMilliseconds += Math.min(now - previous, 1500)
    previous = now
    const article = document.querySelector('.post-content')
    if (!article || sent || visibleMilliseconds < 30000) return
    const bounds = article.getBoundingClientRect()
    const fraction = (window.innerHeight - bounds.top) / Math.max(bounds.height, 1)
    if (fraction >= 0.5) { sent = true; send(true) }
  }
  const interval = window.setInterval(check, 1000)
  const visibility = () => { previous = performance.now() }
  document.addEventListener('visibilitychange', visibility)
  window.addEventListener('scroll', check, { passive: true })
  return () => { window.clearInterval(interval); document.removeEventListener('visibilitychange', visibility); window.removeEventListener('scroll', check) }
}
