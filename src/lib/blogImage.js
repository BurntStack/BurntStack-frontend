/** Use Supabase's image proxy for responsive WebP delivery when the API
 * returns a public storage URL. External image URLs are left untouched. */
export function blogImageUrl(source, { width = 1200, quality = 82 } = {}) {
  if (!source) return source
  try {
    const url = new URL(source)
    if (!url.hostname.endsWith('.supabase.co')) return source
    if (!url.pathname.includes('/storage/v1/object/public/')) return source
    url.pathname = url.pathname.replace('/storage/v1/object/public/', '/storage/v1/render/image/public/')
    url.searchParams.set('width', String(width))
    url.searchParams.set('quality', String(quality))
    url.searchParams.set('format', 'webp')
    return url.toString()
  } catch {
    return source
  }
}
