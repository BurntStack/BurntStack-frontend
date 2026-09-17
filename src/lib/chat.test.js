import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  sendChat,
  loadConversation,
  saveConversation,
  clearConversation,
  MAX_STORED_TURNS,
} from './chat.js'

function stubFetch(response) {
  return vi.fn().mockResolvedValue({
    ok: response.status >= 200 && response.status < 300,
    status: response.status,
    json: async () => response.body,
  })
}

describe('sendChat', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('returns the reply and the lead flag on success', async () => {
    vi.stubGlobal('fetch', stubFetch({ status: 200, body: { reply: 'Hello', leadCaptured: true } }))
    await expect(sendChat([{ role: 'user', content: 'hi' }])).resolves.toEqual({
      reply: 'Hello',
      leadCaptured: true,
    })
  })

  it('posts the conversation to the chat endpoint as JSON', async () => {
    const fetchMock = stubFetch({ status: 200, body: { reply: 'ok' } })
    vi.stubGlobal('fetch', fetchMock)
    const messages = [{ role: 'user', content: 'hi' }]
    await sendChat(messages)

    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('/api/chat')
    expect(init.method).toBe('POST')
    expect(JSON.parse(init.body)).toEqual({ messages })
  })

  it('defaults leadCaptured to false when the server omits it', async () => {
    vi.stubGlobal('fetch', stubFetch({ status: 200, body: { reply: 'ok' } }))
    await expect(sendChat([{ role: 'user', content: 'hi' }])).resolves.toEqual({
      reply: 'ok',
      leadCaptured: false,
    })
  })

  it('surfaces the server message when the assistant is busy', async () => {
    // 503 carries a genuinely useful instruction (WhatsApp instead), so it
    // must reach the visitor rather than being flattened to "try again".
    vi.stubGlobal(
      'fetch',
      stubFetch({ status: 503, body: { error: 'The assistant is busy. WhatsApp us on +91 79816 72639.' } }),
    )
    await expect(sendChat([{ role: 'user', content: 'hi' }])).rejects.toThrow(/WhatsApp us/)
  })

  it('surfaces the server message when rate limited', async () => {
    vi.stubGlobal('fetch', stubFetch({ status: 429, body: { error: 'Too many messages.' } }))
    await expect(sendChat([{ role: 'user', content: 'hi' }])).rejects.toThrow('Too many messages.')
  })

  it('falls back to a generic message when the server sends no error text', async () => {
    vi.stubGlobal('fetch', stubFetch({ status: 500, body: {} }))
    await expect(sendChat([{ role: 'user', content: 'hi' }])).rejects.toThrow(/try again/i)
  })

  it('survives a non-JSON error response instead of throwing a parse error', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 502,
        json: async () => {
          throw new SyntaxError('Unexpected token < in JSON')
        },
      }),
    )
    await expect(sendChat([{ role: 'user', content: 'hi' }])).rejects.toThrow(/try again/i)
  })

  it('reports a network failure in the visitor\'s terms', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')))
    await expect(sendChat([{ role: 'user', content: 'hi' }])).rejects.toThrow(/connection|try again/i)
  })

  it('lets an abort propagate so a cancelled request is not shown as an error', async () => {
    const abort = Object.assign(new Error('aborted'), { name: 'AbortError' })
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(abort))
    await expect(sendChat([{ role: 'user', content: 'hi' }])).rejects.toMatchObject({
      name: 'AbortError',
    })
  })
})

describe('conversation persistence', () => {
  beforeEach(() => {
    const store = new Map()
    vi.stubGlobal('sessionStorage', {
      getItem: (k) => (store.has(k) ? store.get(k) : null),
      setItem: (k, v) => store.set(k, String(v)),
      removeItem: (k) => store.delete(k),
    })
  })
  afterEach(() => vi.unstubAllGlobals())

  it('round-trips a conversation', () => {
    const convo = [
      { role: 'user', content: 'hi' },
      { role: 'assistant', content: 'hello' },
    ]
    saveConversation(convo)
    expect(loadConversation()).toEqual(convo)
  })

  it('starts empty when nothing has been saved', () => {
    expect(loadConversation()).toEqual([])
  })

  it('clears the stored conversation', () => {
    saveConversation([{ role: 'user', content: 'hi' }])
    clearConversation()
    expect(loadConversation()).toEqual([])
  })

  it('keeps only the most recent turns so storage cannot grow forever', () => {
    const convo = Array.from({ length: MAX_STORED_TURNS + 8 }, (_, i) => ({
      role: 'user',
      content: `m${i}`,
    }))
    saveConversation(convo)
    const loaded = loadConversation()
    expect(loaded).toHaveLength(MAX_STORED_TURNS)
    expect(loaded.at(-1).content).toBe(`m${MAX_STORED_TURNS + 7}`)
  })

  it('discards corrupted stored data rather than crashing the widget', () => {
    sessionStorage.setItem('bs-chat', '{not json')
    expect(loadConversation()).toEqual([])
  })

  it('discards stored data that is not an array of turns', () => {
    sessionStorage.setItem('bs-chat', '{"role":"user"}')
    expect(loadConversation()).toEqual([])
  })

  it('never throws when storage is unavailable', () => {
    vi.stubGlobal('sessionStorage', {
      getItem: () => {
        throw new Error('blocked')
      },
      setItem: () => {
        throw new Error('blocked')
      },
      removeItem: () => {
        throw new Error('blocked')
      },
    })
    expect(loadConversation()).toEqual([])
    expect(() => saveConversation([{ role: 'user', content: 'hi' }])).not.toThrow()
    expect(() => clearConversation()).not.toThrow()
  })
})
