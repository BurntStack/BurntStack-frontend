import { afterEach, describe, expect, it, vi } from 'vitest'
import handler from './lead.js'

const valid = { name: 'Test Visitor', email: 'visitor@example.com', phone: '+919000000000', plan: 'Business Website', message: '<script>test</script>' }
function response() {
  return { statusCode: 200, status(code) { this.statusCode = code; return this }, json: vi.fn() }
}
afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); vi.restoreAllMocks() })
describe('lead handler', () => {
  it('uses the configured sender and carries the selected service to the team', async () => {
    vi.stubEnv('RESEND_API_KEY', 'test-only')
    vi.stubEnv('RESEND_FROM', 'Studio <leads@example.com>')
    const fetch = vi.fn().mockResolvedValue({ ok: true })
    vi.stubGlobal('fetch', fetch)
    const res = response()
    await handler({ method: 'POST', body: valid }, res)
    expect(res.json).toHaveBeenCalledWith({ ok: true })
    const body = JSON.parse(fetch.mock.calls[0][1].body)
    expect(body.from).toBe('Studio <leads@example.com>')
    expect(body.to).toEqual(['socials@burntstack.com'])
    expect(body.subject).toContain('Business Website')
    expect(body.html).toContain('&lt;script&gt;')
    expect(body.reply_to).toBe(valid.email)
  })
  it('reports missing credentials without claiming the message was delivered', async () => {
    vi.stubEnv('RESEND_API_KEY', '')
    const res = response()
    await handler({ method: 'POST', body: valid }, res)
    expect(res.statusCode).toBe(503)
    expect(res.json.mock.calls[0][0].error).toContain('WhatsApp')
  })
  it('reports provider failure', async () => {
    vi.stubEnv('RESEND_API_KEY', 'test-only')
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 403, text: async () => 'test failure' }))
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const res = response()
    await handler({ method: 'POST', body: valid }, res)
    expect(res.statusCode).toBe(502)
  })
  it('rejects malformed fields before any provider request', async () => {
    const fetch = vi.fn()
    vi.stubGlobal('fetch', fetch)
    const res = response()
    await handler({ method: 'POST', body: { ...valid, message: { bad: true } } }, res)
    expect(res.statusCode).toBe(400)
    expect(fetch).not.toHaveBeenCalled()
  })
})
