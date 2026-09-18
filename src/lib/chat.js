/**
 * Client half of the site assistant: one call to /api/chat, plus
 * per-tab persistence so the conversation survives a route change or a
 * reload without following the visitor around forever.
 *
 * Nothing here knows the Groq key exists - the serverless function holds
 * it, because anything imported from src/ ships in the public bundle.
 */

const ENDPOINT = '/api/chat'
const STORAGE_KEY = 'bs-chat'

/** Enough to keep the thread coherent, bounded so storage can't grow without end. */
export const MAX_STORED_TURNS = 30

const GENERIC_ERROR = 'Something went wrong. Please try again.'
const NETWORK_ERROR = 'Connection problem. Check your network and try again.'

/**
 * @param {{role: string, content: string}[]} messages
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<{ reply: string, leadCaptured: boolean }>}
 */
export async function sendChat(messages, { signal } = {}) {
  let res
  try {
    res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
      signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(75000)]) : AbortSignal.timeout(75000),
    })
  } catch (err) {
    // A cancelled request isn't a failure - the caller unmounted or the
    // visitor sent something else - so let it through untouched.
    if (err?.name === 'AbortError') throw err
    throw new Error(NETWORK_ERROR)
  }

  let data = {}
  try {
    data = await res.json()
  } catch {
    // An HTML error page or an empty body - handled by the status check.
  }

  if (!res.ok) {
    // 429 and 503 carry instructions worth reading (wait a moment; use
    // WhatsApp instead), so the server's own wording wins where it exists.
    throw new Error(data?.error || GENERIC_ERROR)
  }

  if (typeof data?.reply !== 'string' || !data.reply.trim()) throw new Error(GENERIC_ERROR)

  return { reply: data?.reply || '', leadCaptured: data?.leadCaptured === true }
}

function isTurn(value) {
  return (
    value &&
    typeof value === 'object' &&
    (value.role === 'user' || value.role === 'assistant') &&
    typeof value.content === 'string'
  )
}

/** Reads the stored conversation. Returns [] for anything unusable. */
export function loadConversation() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isTurn).slice(-MAX_STORED_TURNS)
  } catch {
    // Corrupted JSON, or storage blocked in private mode. An empty thread
    // is a working widget; a thrown error is a blank corner of the page.
    return []
  }
}

export function saveConversation(messages) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_STORED_TURNS)))
  } catch {
    // Storage full or blocked - the in-memory thread still works.
  }
}

export function clearConversation() {
  try {
    sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    // Nothing to do.
  }
}
