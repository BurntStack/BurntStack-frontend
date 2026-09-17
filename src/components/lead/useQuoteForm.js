import { createContext, useContext } from 'react'

/**
 * Shared so LeadFormModal.jsx only exports components, which is what
 * react-refresh needs to hot-reload it reliably.
 */
export const LeadFormContext = createContext({ openQuoteForm: () => {} })

/** `const { openQuoteForm } = useQuoteForm()` - call it from any CTA. */
export function useQuoteForm() {
  return useContext(LeadFormContext)
}
