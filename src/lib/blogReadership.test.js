import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
vi.mock('./axios.js', () => ({ default: { post: vi.fn(() => Promise.resolve()) } }))
import api from './axios.js'
import { trackArticle } from './blogReadership.js'

describe('article readership', () => {
  let visibility, top, now
  beforeEach(() => {
    vi.useFakeTimers(); vi.clearAllMocks()
    visibility = 'visible'; top = 100; now = 0
    vi.stubGlobal('navigator', {})
    vi.stubGlobal('sessionStorage', { getItem: () => '8c373e3c-fda8-4d6a-8ed3-c3e3cc557c7e', setItem: vi.fn() })
    vi.stubGlobal('performance', { now: () => now })
    vi.stubGlobal('window', { setInterval, clearInterval, innerHeight: 800, addEventListener: vi.fn(), removeEventListener: vi.fn() })
    vi.stubGlobal('document', { get visibilityState() { return visibility }, querySelector: () => ({ getBoundingClientRect: () => ({ top, height: 1000 }) }), addEventListener: vi.fn(), removeEventListener: vi.fn() })
  })
  afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals() })
  function tick(seconds) { for(let i = 0; i < seconds; i++) { now += 1000; vi.advanceTimersByTime(1000) } }
  it('records one view and one engaged read after 30 visible seconds and 50% scroll', () => {
    const stop = trackArticle('my-article')
    expect(api.post).toHaveBeenCalledTimes(1)
    tick(29); expect(api.post).toHaveBeenCalledTimes(1)
    tick(1); expect(api.post).toHaveBeenCalledTimes(2)
    expect(api.post.mock.calls[1][1].engaged).toBe(true)
    tick(60); expect(api.post).toHaveBeenCalledTimes(2)
    stop(); expect(vi.getTimerCount()).toBe(0)
  })
  it('does not count a hidden tab or an unread article as engaged', () => {
    const stop = trackArticle('my-article')
    visibility = 'hidden'; tick(60)
    expect(api.post).toHaveBeenCalledTimes(1)
    visibility = 'visible'; top = 900; tick(30)
    expect(api.post).toHaveBeenCalledTimes(1)
    top = 100; tick(1)
    expect(api.post).toHaveBeenCalledTimes(2)
    stop()
  })
  it('honors the browser privacy preference', () => {
    navigator.globalPrivacyControl = true
    trackArticle('my-article')()
    expect(api.post).not.toHaveBeenCalled()
  })
})
