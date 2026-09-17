import { describe, it, expect } from 'vitest'
import * as offer from './offer.js'

// Em dash and en dash. Ordinary hyphens inside words ("mobile-first",
// "on-page") are fine and deliberately not matched.
const DASHES = /[–—]/

/** Every string reachable from the module's exports, with a path for errors. */
function collectStrings(value, path = '', out = []) {
  if (typeof value === 'string') out.push([path, value])
  else if (Array.isArray(value)) value.forEach((v, i) => collectStrings(v, `${path}[${i}]`, out))
  else if (value && typeof value === 'object' && !(value instanceof Function)) {
    for (const [k, v] of Object.entries(value)) collectStrings(v, path ? `${path}.${k}` : k, out)
  }
  return out
}

describe('offer copy', () => {
  it('contains no em or en dashes anywhere', () => {
    // Requested explicitly: dashes read as machine-written. Every one was
    // rewritten as a full stop, comma or colon rather than swapped for a
    // hyphen, so this guards the rewrite rather than the character.
    const offenders = collectStrings(offer)
      .filter(([, text]) => DASHES.test(text))
      .map(([path, text]) => `${path}: ${text.slice(0, 60)}`)
    expect(offenders).toEqual([])
  })

  it('still keeps hyphens inside compound words', () => {
    // The fix must not have mangled legitimate hyphenation.
    const all = collectStrings(offer).map(([, t]) => t).join(' ')
    expect(all).toMatch(/mobile-first/)
    expect(all).toMatch(/on-page/i)
  })

  it('has copy to check in the first place', () => {
    // Guards against the collector silently returning nothing and the
    // assertions above passing vacuously.
    expect(collectStrings(offer).length).toBeGreaterThan(40)
  })
})
