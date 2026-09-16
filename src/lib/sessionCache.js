/** Tiny sessionStorage JSON cache for stale-while-revalidate reads. */
const PREFIX = 'bs-cache:'

export function readCache(key) {
  try {
    const raw = sessionStorage.getItem(PREFIX + key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function writeCache(key, value) {
  try {
    sessionStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    // Private browsing / storage full - caching is a nice-to-have, never fatal.
  }
}
