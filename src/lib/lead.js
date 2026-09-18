export async function submitLead(form) {
  let response
  try {
    response = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
      signal: AbortSignal.timeout(20000),
    })
  } catch {
    throw new Error('Could not reach us. Please try again, or use WhatsApp below.')
  }
  const data = await response.json().catch(() => null)
  // A static host can return index.html with status 200 for a missing API.
  // Only an explicit acknowledgement from the handler confirms delivery.
  if (!response.ok || data?.ok !== true) {
    throw new Error(data?.error || 'Your enquiry was not confirmed. Please try again or contact us directly.')
  }
  return data
}
