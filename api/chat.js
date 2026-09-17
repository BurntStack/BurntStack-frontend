// Vercel serverless function (Node.js runtime). The Groq key lives here and
// only here: anything imported by src/ ends up in the Vite bundle, which is
// public, and a leaked key can be spent by anyone who views source.
import { buildSystemPrompt, LEAD_TOOL } from './_chat-prompt.js'
import { buildLeadEmailHtml } from './_lead-email.js'
import { sanitiseHistory, validateLead, formatTranscript, isGrounded } from './_chat-lead.js'

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const DEFAULT_MODEL = 'openai/gpt-oss-120b'
// Groq's token-per-minute allowance is per model, so when the primary is
// saturated a different model is still available. On the free tier the
// limit is 8k TPM and this prompt costs ~1.4k per turn, so that ceiling is
// reached by a handful of simultaneous conversations, not by abuse.
const FALLBACK_MODEL = 'openai/gpt-oss-20b'

// Matches the quote form and the popup - one inbox for every enquiry.
const NOTIFY_TO = 'socials@burntstack.com'
const FROM = 'BurntStack Leads <onboarding@resend.dev>'

// Best-effort throttle. Serverless instances aren't shared, so this bounds
// abuse from a single warm instance rather than enforcing a global limit -
// real rate limiting would need a shared store (Upstash/KV). It still stops
// the common case: one browser tab hammering the endpoint in a loop.
const RATE_LIMIT = { windowMs: 60_000, maxRequests: 15 }
const hits = new Map()

function rateLimited(ip) {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_LIMIT.windowMs)
  recent.push(now)
  hits.set(ip, recent)
  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_LIMIT.windowMs)) hits.delete(key)
    }
  }
  return recent.length > RATE_LIMIT.maxRequests
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

async function post(apiKey, body) {
  return fetch(GROQ_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

/**
 * Calls Groq, falling back to a second model once if the first is rate
 * limited. Throws `busy` when both are saturated so the caller can tell
 * the visitor something true and useful rather than "something failed".
 */
async function callGroq(apiKey, body) {
  let res = await post(apiKey, body)

  if (res.status === 429 && body.model !== FALLBACK_MODEL) {
    console.warn(`Groq rate limited on ${body.model}; retrying on ${FALLBACK_MODEL}`)
    res = await post(apiKey, { ...body, model: FALLBACK_MODEL })
  }

  if (!res.ok) {
    // Logged server-side only: upstream bodies can echo request details,
    // and the visitor gets a generic message either way.
    console.error('Groq error:', res.status, await res.text())
    throw new Error(res.status === 429 ? 'busy' : 'upstream')
  }
  return res.json()
}

/** Emails the captured lead to the team. Never throws into the chat flow. */
async function notifyTeam(lead, history) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('Lead captured but RESEND_API_KEY is not set:', lead.mobile)
    return false
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM,
        to: [NOTIFY_TO],
        ...(lead.email ? { reply_to: lead.email } : {}),
        subject: `New chat lead: ${lead.name} (${lead.mobile})`,
        html: buildLeadEmailHtml({
          name: escapeHtml(lead.name),
          email: escapeHtml(lead.email),
          phone: escapeHtml(lead.mobile),
          message: escapeHtml(lead.requirement),
          source: 'New Chatbot Lead',
          transcript: escapeHtml(formatTranscript(history)),
        }),
      }),
    })
    if (!res.ok) {
      console.error('Resend error:', res.status, await res.text())
      return false
    }
    return true
  } catch (err) {
    console.error('Lead notification failed:', err)
    return false
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown'
  if (rateLimited(ip)) {
    res.status(429).json({ error: 'Too many messages. Give it a moment and try again.' })
    return
  }

  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    console.error('GROQ_API_KEY is not configured')
    res.status(500).json({ error: 'Chat is not available right now.' })
    return
  }

  const history = sanitiseHistory(req.body?.messages)
  if (history.length === 0) {
    res.status(400).json({ error: 'Send a message first.' })
    return
  }

  const messages = [{ role: 'system', content: buildSystemPrompt() }, ...history]
  const model = process.env.GROQ_MODEL || DEFAULT_MODEL

  try {
    const first = await callGroq(apiKey, {
      model,
      temperature: 0.4,
      max_tokens: 500,
      messages,
      tools: [LEAD_TOOL],
      tool_choice: 'auto',
    })

    const message = first.choices?.[0]?.message ?? {}
    const toolCall = message.tool_calls?.find((c) => c.function?.name === 'capture_lead')

    if (!toolCall) {
      res.status(200).json({ reply: message.content?.trim() || '', leadCaptured: false })
      return
    }

    // The model decided it has a lead. It is not the thing that decides
    // whether the details are usable - validateLead is.
    let args = {}
    try {
      args = JSON.parse(toolCall.function.arguments || '{}')
    } catch {
      args = {}
    }
    const validated = validateLead(args)

    // Two gates, and both have to pass. validateLead says the details are
    // *usable*; isGrounded says the visitor actually gave them. The second
    // is the one that matters in practice - the model has been observed
    // inventing a name and the placeholder number 9876543210 out of a
    // conversation containing neither, which the first gate cannot detect
    // because that number is perfectly well-formed.
    const grounded = validated.ok && isGrounded(validated.lead, history)
    if (validated.ok && !grounded) {
      console.warn('Discarded ungrounded lead:', validated.lead.name, validated.lead.mobile)
    }

    const saved = grounded ? await notifyTeam(validated.lead, history) : false

    // Feed the outcome back so the model writes the follow-up itself -
    // either a natural confirmation, or a fresh ask when what it captured
    // wasn't usable or wasn't actually said.
    let toolResult
    if (saved) {
      toolResult = 'Lead recorded. Confirm the team will follow up within one business day.'
    } else if (grounded) {
      toolResult =
        'Could not record the lead. Ask them to WhatsApp or call +91 79816 72639 instead. Do NOT tell them their details have been saved.'
    } else if (validated.ok) {
      toolResult =
        'NOT recorded: those details were not found anywhere in what the visitor actually wrote, so they were discarded. You must not state or imply that anything has been saved, and must not address the visitor by that name. Ask them plainly for their name and mobile number.'
    } else {
      toolResult = `NOT recorded: ${validated.reason} You must not state or imply that anything has been saved. Ask the visitor for it again, politely, without blaming them.`
    }

    // If the follow-up call fails after the email has already gone out,
    // a 502 would tell the visitor nothing happened while the team is
    // holding their details. Fall back to a fixed confirmation instead.
    let reply = ''
    try {
      const second = await callGroq(apiKey, {
        model,
        temperature: 0.4,
        max_tokens: 300,
        messages: [
          ...messages,
          { role: 'assistant', content: message.content ?? '', tool_calls: message.tool_calls },
          { role: 'tool', tool_call_id: toolCall.id, content: toolResult },
        ],
      })
      reply = second.choices?.[0]?.message?.content?.trim() || ''
    } catch (err) {
      if (!saved) throw err
      console.error('Follow-up generation failed after a lead was saved:', err.message)
      reply = `Thanks ${validated.lead.name.split(' ')[0]}, your details are with the team and someone will be in touch within one business day.`
    }

    res.status(200).json({ reply, leadCaptured: saved })
  } catch (err) {
    if (err.message === 'busy') {
      res.status(503).json({
        error: 'The assistant is busy right now. WhatsApp us on +91 79816 72639 and we\'ll reply straight away.',
      })
      return
    }
    if (err.message !== 'upstream') console.error('Chat failed:', err)
    res.status(502).json({ error: 'Could not reach the assistant. Please try again.' })
  }
}
