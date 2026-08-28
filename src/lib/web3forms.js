const WEB3FORMS_ACCESS_KEY = '04552b51-7f92-48ce-9cda-fd7610032fe3'
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

/**
 * Submits a form directly to Web3Forms (no backend required). Accepts either
 * a FormData instance (so file inputs like a résumé upload pass through) or
 * a plain object of fields.
 */
export async function submitToWeb3Forms(data, { subject } = {}) {
  const formData = data instanceof FormData ? data : new FormData()
  if (!(data instanceof FormData)) {
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') formData.append(key, value)
    })
  }
  formData.append('access_key', WEB3FORMS_ACCESS_KEY)
  if (subject) formData.append('subject', subject)

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    body: formData,
  })
  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || 'Form submission failed')
  }
  return result
}
