import { afterEach, describe, expect, it, vi } from 'vitest'
import { submitLead } from './lead.js'

afterEach(() => vi.unstubAllGlobals())
describe('lead delivery acknowledgement', () => {
  it('sends the selected service and message to the existing handler', async () => {
    const fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true }) })
    vi.stubGlobal('fetch', fetch)
    const form = { name: 'Test Visitor', email: 'visitor@example.com', plan: 'AI & automation', message: 'Automate our reports' }
    await submitLead(form)
    expect(JSON.parse(fetch.mock.calls[0][1].body)).toEqual(form)
    expect(fetch.mock.calls[0][0]).toBe('/api/lead')
  })
  it('does not claim delivery when a static host returns HTML with HTTP 200', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => { throw new SyntaxError() } }))
    await expect(submitLead({})).rejects.toThrow('not confirmed')
  })
  it('surfaces delivery failure and allows the caller to keep the form', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, json: async () => ({ error: 'Please use WhatsApp.' }) }))
    await expect(submitLead({})).rejects.toThrow('Please use WhatsApp.')
  })
})
