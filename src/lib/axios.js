import axios from 'axios'

/**
 * Client for the employee portal's public blog feed (a separate backend —
 * see github.com/BurntStack/EmployeePortal-blog). The marketing site only
 * ever reads from it (GET /blog/, /blog/categories/); nothing here needs
 * auth or write access.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_BLOG_API_URL || 'http://localhost:8000/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
})

export default api
