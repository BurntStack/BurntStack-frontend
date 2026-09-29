import axios from 'axios'

/**
 * Client for the employee portal's public blog feed (a separate backend —
 * see github.com/BurntStack/EmployeePortal-blog). The marketing site reads published articles and records anonymous
 * article engagement events. No authenticated portal access is used.
 */
const api = axios.create({
  baseURL: import.meta.env.DEV ? '/portal-api' : (import.meta.env.VITE_BLOG_API_URL || 'https://backend-wine-one-95.vercel.app/api'),
  timeout: 15000,
})

export default api
