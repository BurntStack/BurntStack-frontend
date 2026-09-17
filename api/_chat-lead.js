/**
 * Pure helpers shared by the chat endpoint: turning whatever the visitor
 * typed into a lead we can actually act on, and keeping the conversation
 * the client sends us within sane bounds before it reaches the model.
 *
 * Kept free of network and environment access so it can be unit-tested
 * directly (see _chat-lead.test.js).
 */

// A chat lead is worthless without a number somebody can ring, so the
// parsing here is deliberately forgiving about *format* and strict about
// what actually constitutes a reachable number.
const INDIAN_MOBILE = /^[6-9]\d{9}$/

export const MAX_TURNS = 24
export const MAX_MESSAGE_CHARS = 2000
const MAX_FREE_TEXT_CHARS = 1000
const MAX_NAME_CHARS = 120
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Normalises a phone number to E.164, or returns null if it can't be one.
 *
 * Visitors type numbers every way imaginable - "98765 43210", "+91-98765
 * 43210", "098765 43210" - and all of those are the same reachable
 * number. Non-Indian numbers are passed through rather than forced into
 * +91, which would silently corrupt them.
 *
 * @param {string} raw
 * @returns {string|null} E.164 number, or null when it isn't usable
 */
export function normaliseMobile(raw) {
  if (typeof raw !== 'string') return null

  const hadPlus = raw.trim().startsWith('+')
  let digits = raw.replace(/\D/g, '')
  if (!digits) return null

  // 00 is the other way of writing a leading "+".
  if (digits.startsWith('00')) digits = digits.slice(2)

  // Indian forms, longest prefix first.
  if (digits.length === 12 && digits.startsWith('91') && INDIAN_MOBILE.test(digits.slice(2))) {
    return `+91${digits.slice(2)}`
  }
  if (digits.length === 11 && digits.startsWith('0') && INDIAN_MOBILE.test(digits.slice(1))) {
    return `+91${digits.slice(1)}`
  }
  if (INDIAN_MOBILE.test(digits)) return `+91${digits}`

  // Anything else is only accepted when it was written as an explicit
  // international number - otherwise a typo'd Indian number would sail
  // through as a bogus foreign one.
  if (hadPlus && digits.length >= 8 && digits.length <= 15) return `+${digits}`

  return null
}

function clamp(value, max) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

/**
 * Validates a lead the model claims to have captured. The model is
 * instructed to only call the tool once it has a name and a number, but
 * it is not the thing standing between a bad record and the team's inbox
 * - this is.
 *
 * @returns {{ ok: true, lead: object } | { ok: false, reason: string }}
 */
export function validateLead(raw) {
  if (!raw || typeof raw !== 'object') {
    return { ok: false, reason: 'No lead details were provided.' }
  }

  const name = clamp(raw.name, MAX_NAME_CHARS)
  if (name.length < 2) {
    return { ok: false, reason: 'A name of at least two characters is required.' }
  }

  const mobile = normaliseMobile(raw.mobile)
  if (!mobile) {
    return { ok: false, reason: 'A valid mobile number is required.' }
  }

  const email = clamp(raw.email, MAX_FREE_TEXT_CHARS)

  return {
    ok: true,
    lead: {
      name,
      mobile,
      email: EMAIL.test(email) ? email : '',
      requirement: clamp(raw.requirement, MAX_FREE_TEXT_CHARS),
    },
  }
}

const ALLOWED_ROLES = new Set(['user', 'assistant'])

/**
 * Filters and trims the conversation a client posted.
 *
 * The history arrives from the browser, so it is untrusted input in the
 * ordinary sense: a crafted request could otherwise inject a `system`
 * turn to rewrite the assistant's instructions, or send a few megabytes
 * of text straight through to a metered API.
 */
export function sanitiseHistory(history) {
  if (!Array.isArray(history)) return []

  const clean = []
  for (const turn of history) {
    if (!turn || typeof turn !== 'object') continue
    if (!ALLOWED_ROLES.has(turn.role)) continue
    if (typeof turn.content !== 'string') continue
    const content = turn.content.trim()
    if (!content) continue
    clean.push({ role: turn.role, content: content.slice(0, MAX_MESSAGE_CHARS) })
  }

  // Keep the most recent turns: the end of a conversation is where the
  // contact details and the actual ask live.
  return clean.slice(-MAX_TURNS)
}

/** Renders the conversation for the notification email. */
export function formatTranscript(history) {
  if (!Array.isArray(history) || history.length === 0) return ''
  return history
    .map((t) => `${t.role === 'user' ? 'Visitor' : 'Burnty'}: ${t.content}`)
    .join('\n')
}

/**
 * Confirms the visitor actually typed the details the model claims to have
 * captured.
 *
 * This exists because of an observed, reproducible failure: asked a plain
 * question with no contact details anywhere in the conversation ("do you
 * do SEO as well?"), the model sometimes called capture_lead with an
 * invented name and the stock placeholder number 9876543210 - which is a
 * structurally perfect Indian mobile, so validateLead waved it through and
 * fabricated leads were emailed to the team.
 *
 * No wording in the system prompt can be relied on to prevent that, so the
 * check is made here instead: every digit of the number, and every word of
 * the name, has to appear in what the visitor themselves wrote. The
 * assistant's own turns don't count - otherwise the model could launder an
 * invention by saying it out loud first.
 */
export function isGrounded(lead, history) {
  if (!lead || typeof lead !== 'object') return false
  if (!Array.isArray(history) || history.length === 0) return false

  const saidByVisitor = history
    .filter((t) => t?.role === 'user' && typeof t.content === 'string')
    .map((t) => t.content)
    .join(' ')
  if (!saidByVisitor) return false

  // Compare digits only, so "98765 43210", "+91-98765-43210" and
  // "9876543210" all count as the same number the visitor gave.
  const typedDigits = saidByVisitor.replace(/\D/g, '')
  const leadDigits = String(lead.mobile || '').replace(/\D/g, '')
  if (leadDigits.length < 8) return false
  // Match on the national part: the visitor may have omitted the country
  // code that normaliseMobile added for them.
  const national = leadDigits.slice(-10)
  if (!typedDigits.includes(national)) return false

  const haystack = saidByVisitor.toLowerCase()
  const words = String(lead.name || '')
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length >= 2)
  if (words.length === 0) return false

  return words.every((word) => haystack.includes(word))
}
