import { getCalApi } from '@calcom/embed-react'

/** Public booking link — Cal.com embeds are client-side and need no API key. */
export const CAL_LINK = 'rohith-uppunuthula/30min'

let initialized = false

/** Loads the Cal.com embed script and applies branding once, app-wide. */
export async function initCal() {
  if (initialized) return
  initialized = true
  const cal = await getCalApi()
  cal('ui', {
    theme: 'light',
    cssVarsPerTheme: { light: { 'cal-brand': '#e0661a' } },
    hideEventTypeDetails: false,
    layout: 'month_view',
  })
}
