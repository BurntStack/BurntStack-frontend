// Branded HTML for the "new lead" notification email. Table-based layout
// with inline styles throughout - email clients (Outlook especially) don't
// reliably support external/embedded stylesheets or modern CSS layout.

const LOGO_URL = 'https://www.burntstack.com/logo-mark.png'
const SITE_URL = 'https://www.burntstack.com'
const BRAND_ORANGE = '#e0661a'
const INK = '#1b1712'
const SLATE = '#57514a'
const SAND = '#f4f1ea'

/**
 * Renders the chat transcript as a quoted block. The caller escapes the
 * text (it is visitor-typed); this only turns the newlines into <br>,
 * because `white-space: pre-wrap` is not reliable across email clients.
 */
function transcriptBlock(transcript) {
  if (!transcript) return ''
  return `
    <tr>
      <td style="padding:8px 32px 0 32px;">
        <p style="margin:0 0 8px 0;font-size:13px;font-weight:600;color:${SLATE};">Conversation</p>
        <div style="background:${SAND};border-radius:10px;padding:16px;font-size:13px;line-height:1.6;color:${INK};">
          ${transcript.replace(/\n/g, '<br />')}
        </div>
      </td>
    </tr>
  `
}

function row(label, value) {
  if (!value) return ''
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid ${SAND};font-size:13px;font-weight:600;color:${SLATE};width:110px;vertical-align:top;">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid ${SAND};font-size:14px;color:${INK};vertical-align:top;">${value}</td>
    </tr>
  `
}

/**
 * @param {object} lead
 * @param {string} [lead.source] Eyebrow text - which surface produced the
 *   lead. Chat leads and form leads get followed up differently, and the
 *   team should be able to tell them apart at a glance in the inbox.
 * @param {string} [lead.transcript] Escaped chat transcript, if any.
 */
export function buildLeadEmailHtml({ name, email, phone, plan, message, source, transcript }) {
  // Chat leads always have a mobile but often no email, so the reply
  // button follows whichever channel actually exists rather than
  // rendering a dead `mailto:` with nothing after the colon.
  const replyHref = email ? `mailto:${email}` : `https://wa.me/${(phone || '').replace(/\D/g, '')}`
  const replyLabel = email ? `Reply to ${name.split(' ')[0]}` : `WhatsApp ${name.split(' ')[0]}`

  return `
<!doctype html>
<html>
  <body style="margin:0;padding:0;background:${SAND};font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${SAND};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #ebe6dd;">
            <!-- Header -->
            <tr>
              <td style="background:${INK};padding:28px 32px;">
                <img src="${LOGO_URL}" alt="BurntStack" height="28" style="display:block;" />
              </td>
            </tr>
            <!-- Eyebrow + title -->
            <tr>
              <td style="padding:32px 32px 8px 32px;">
                <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${BRAND_ORANGE};">${source || 'New Website Lead'}</p>
                <h1 style="margin:8px 0 0 0;font-size:22px;font-weight:700;color:${INK};">${name} wants to talk</h1>
              </td>
            </tr>
            <!-- Details -->
            <tr>
              <td style="padding:16px 32px 8px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${row('Name', name)}
                  ${row('Email', `<a href="mailto:${email}" style="color:${BRAND_ORANGE};text-decoration:none;">${email}</a>`)}
                  ${row('Phone', phone ? `<a href="tel:${phone}" style="color:${BRAND_ORANGE};text-decoration:none;">${phone}</a>` : '')}
                  ${row('Package', plan)}
                  ${row('Message', message)}
                </table>
              </td>
            </tr>
            ${transcriptBlock(transcript)}
            <tr>
              <td style="padding:0 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                </table>
              </td>
            </tr>
            <!-- CTA -->
            <tr>
              <td style="padding:24px 32px 32px 32px;">
                <a href="${replyHref}" style="display:inline-block;background:${BRAND_ORANGE};color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:12px 22px;border-radius:8px;">
                  ${replyLabel}
                </a>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td style="background:${SAND};padding:20px 32px;">
                <p style="margin:0;font-size:12px;color:${SLATE};">
                  Submitted on <a href="${SITE_URL}" style="color:${SLATE};">burntstack.com</a>
                </p>
                <p style="margin:6px 0 0 0;font-size:12px;color:${SLATE};">
                  BurntStack Technologies Pvt. Ltd. &middot; Stambampalle, Khila Warangal Mandal, Warangal, Telangana 506013, India
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `
}
