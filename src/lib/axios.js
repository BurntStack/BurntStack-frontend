import axios from 'axios'

/**
 * Central Axios instance. The base URL comes from an environment variable so
 * the same build works across local, staging and production.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
})

// Attach JWT access token if present.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('burntstack-access')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
