import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import * as offer from './offer.js'

/** Every source file that can carry visitor-facing copy. */
function sourceFiles(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry)
    if (statSync(path).isDirectory()) sourceFiles(path, out)
    else if (/\.jsx?$/.test(entry) && !/\.test\.jsx?$/.test(entry)) out.push(path)
  }
  return out
}

const FILES = [...sourceFiles('src'), ...sourceFiles('api')]
const CORPUS = FILES.map((f) => [f, readFileSync(f, 'utf8')])

describe('call duration', () => {
  // The booking event is burntstack/30min. Three separate places had
  // drifted to "15 minutes" for the same call, which a visitor only
  // discovers is wrong once they are on it.
  it('is quoted as 30 minutes wherever it is quoted at all', () => {
    const offenders = CORPUS.flatMap(([file, text]) =>
      [...text.matchAll(/\b(\d{1,3}|fifteen|twenty|forty[- ]five|sixty)[- ]minute/gi)]
        .map((m) => [file, m[0]])
        .filter(([, phrase]) => !/^30[- ]minute/i.test(phrase)),
    )
    expect(offenders).toEqual([])
  })

  it('still states the duration somewhere, so this is not vacuous', () => {
    const all = CORPUS.map(([, t]) => t).join('')
    expect(all).toMatch(/30[- ]minute/i)
  })
})

describe('offer copy punctuation', () => {
  // URLs and percent-encoded values are not prose: the pre-filled
  // WhatsApp message legitimately carries a straight apostrophe.
  const isProse = (s) => !/^(https?:|mailto:|tel:|\+?\d[\d\s]*$)/.test(s) && !/%[0-9A-F]{2}/i.test(s)
  const strings = []
  const collect = (value) => {
    if (typeof value === 'string') { if (isProse(value)) strings.push(value) }
    else if (Array.isArray(value)) value.forEach(collect)
    else if (value && typeof value === 'object' && !(value instanceof Function)) {
      Object.values(value).forEach(collect)
    }
  }
  collect(offer)

  it('uses the typographic apostrophe, never the straight one', () => {
    // Not only a house-style point: a straight apostrophe inside a
    // single-quoted string in this file terminates it, which is exactly
    // how this module got broken once already.
    expect(strings.filter((s) => s.includes("'"))).toEqual([])
  })

  it('has contractions, so the voice matches the rest of the site', () => {
    expect(strings.some((s) => /’(s|t|ll|re|ve)\b/.test(s))).toBe(true)
  })
})

describe('services and packages stay linked', () => {
  it('every service plan resolves to a package or stands alone', () => {
    // LeadForm builds its dropdown by matching service.plan against
    // package names; a typo silently drops the option.
    const names = new Set(offer.PACKAGES.map((p) => p.name))
    for (const service of offer.OFFER_SERVICES) {
      expect(typeof service.plan).toBe('string')
      expect(service.plan.length).toBeGreaterThan(0)
      if (names.has(service.plan)) expect(names.has(service.plan)).toBe(true)
    }
  })

  it('assigns every service to a declared group', () => {
    const groups = new Set(offer.SERVICE_GROUPS.map((g) => g.id))
    for (const service of offer.OFFER_SERVICES) expect(groups.has(service.group)).toBe(true)
  })

  it('gives every group at least one service', () => {
    for (const group of offer.SERVICE_GROUPS) {
      expect(offer.OFFER_SERVICES.some((s) => s.group === group.id)).toBe(true)
    }
  })

  it('gives every package the fields the cards render', () => {
    for (const plan of offer.PACKAGES) {
      expect(plan.fit, `${plan.name} fit`).toBeTruthy()
      expect(plan.scope, `${plan.name} scope`).toBeTruthy()
      expect(plan.features.length).toBeGreaterThan(2)
    }
  })

  it('gives each package a distinct scope, which is what the cards differentiate on', () => {
    const scopes = offer.PACKAGES.map((p) => p.scope)
    expect(new Set(scopes).size).toBe(scopes.length)
  })
})

describe('unpublished pricing is never leaked as a figure', () => {
  it('shows no rupee amount while PACKAGES_CONFIRMED is false', () => {
    if (offer.PACKAGES_CONFIRMED) return
    const rendered = [
      ...offer.PACKAGES.map((p) => `${p.name} ${p.tagline} ${p.fit} ${p.scope}`),
      ...offer.OFFER_SERVICES.map((s) => `${s.job} ${s.description}`),
    ].join(' ')
    expect(rendered).not.toMatch(/₹\s?[\d,]+/)
    expect(rendered).not.toMatch(/\bRs\.?\s?[\d,]+/i)
  })
})
