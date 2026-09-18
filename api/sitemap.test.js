import { afterEach, describe, expect, it, vi } from 'vitest'
import handler from './sitemap.js'

const response = () => ({ setHeader: vi.fn(), status() { return this }, send: vi.fn() })
afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); vi.restoreAllMocks() })
describe('published article sitemap', () => {
  it('uses the configured portal and follows its pagination', async () => {
    vi.stubEnv('VITE_BLOG_API_URL', 'https://portal.example/api/')
    const fetch = vi.fn()
      .mockResolvedValueOnce({ ok: true, json: async () => ({ results: [{ slug: 'first', published_at: '2026-09-18T00:00:00Z' }], next: '?page=2' }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ results: [{ slug: 'second' }], next: null }) })
    vi.stubGlobal('fetch', fetch)
    const res = response()
    await handler({}, res)
    expect(fetch.mock.calls.map(([url]) => url)).toEqual(['https://portal.example/api/blog/', 'https://portal.example/api/blog/?page=2'])
    expect(res.send.mock.calls[0][0]).toContain('/blog/first')
    expect(res.send.mock.calls[0][0]).toContain('/blog/second')
  })
  it('keeps static routes discoverable if the blog is unavailable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const res = response()
    await handler({}, res)
    expect(res.send.mock.calls[0][0]).toContain('/contact')
  })
})
