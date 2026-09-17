// Vercel serverless function (Node.js runtime) - not part of the Vite bundle,
// so RESEND_API_KEY never reaches the browser. This is the only place that's
// allowed to call Resend, since the key can send email as this account.
import { buildLeadEmailHtml } from './_lead-email.js'

// Single inbox for every enquiry the site produces, matching the address
// published on the page (data/company.js) - a lead notification that
// arrives somewhere other than the address customers are told to write to
// is how replies get missed.
const NOTIFY_TO = 'socials@burntstack.com'
const FROM = 'BurntStack Leads <onboarding@resend.dev>'

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const { name, email, phone, plan, message, website } = req.body || {}

  // Honeypot: a real visitor never fills this hidden field in.
  if (website) {
    res.status(200).json({ ok: true })
    return
  }

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    res.status(400).json({ error: 'Please enter your name.' })
    return
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: 'Please enter a valid email.' })
    return
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    res.status(500).json({ error: 'Email is not configured.' })
    return
  }

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: [NOTIFY_TO],
        reply_to: email,
        subject: plan ? `New lead (${plan}): ${name}` : `New site lead: ${name}`,
        html: buildLeadEmailHtml({
          name: escapeHtml(name),
          email: escapeHtml(email),
          phone: phone ? escapeHtml(phone) : '',
          // Which package they were looking at when they asked. The old
          // "Request a Quote" buttons all pointed at /contact and threw
          // this away, so every lead arrived with no idea of budget.
          plan: plan ? escapeHtml(plan) : '',
          message: message ? escapeHtml(message) : '',
        }),
      }),
    })

    if (!resendRes.ok) {
      const body = await resendRes.text()
      console.error('Resend error:', resendRes.status, body)
      res.status(502).json({ error: 'Could not send right now.' })
      return
    }

    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Lead submission failed:', err)
    res.status(502).json({ error: 'Could not send right now.' })
  }
}
