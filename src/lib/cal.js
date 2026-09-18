import { getCalApi } from '@calcom/embed-react'

/** Public booking link — Cal.com embeds are client-side and need no API key. */
export const CAL_LINK = 'burntstack/30min'
export const CAL_URL = `https://cal.com/${CAL_LINK}`

let initialization

/** Loads the Cal.com embed script and applies branding once, app-wide. */
export async function initCal() {
  if (initialization) return initialization
  initialization = getCalApi().then((cal) => {
    cal('ui', {
      theme: 'light',
      cssVarsPerTheme: { light: { 'cal-brand': '#c54b21' } },
      hideEventTypeDetails: false,
      layout: 'month_view',
    })
    return cal
  }).catch((error) => {
    initialization = undefined
    throw error
  })
  return initialization
}
