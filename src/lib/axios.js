import axios from 'axios'

/**
 * Client for the employee portal's public blog feed (a separate backend —
 * see github.com/BurntStack/EmployeePortal-blog). The marketing site only
 * ever reads from it (GET /blog/, /blog/categories/); nothing here needs
 * auth or write access.
 */
const api = axios.create({
  baseURL: import.meta.env.DEV ? '/portal-api' : (import.meta.env.VITE_BLOG_API_URL || 'https://backend-wine-one-95.vercel.app/api'),
  timeout: 15000,
})

export default api
