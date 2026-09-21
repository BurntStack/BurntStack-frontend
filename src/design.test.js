import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Guards for the visual tells this pass removed.
 *
 * Each of these came back into the codebase at least once already, because
 * nothing stopped them: the palette drifted to four hues, Feather icons were
 * imported ad hoc per file, and decorative glyphs were pasted inline. These
 * tests fail the build rather than relying on the next reader noticing.
 *
 * They check source, not rendered output, so they are cheap and they point at
 * the file that reintroduced the problem.
 */

function walk(dir, test, out = []) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry)
    if (statSync(path).isDirectory()) walk(path, test, out)
    else if (test(entry)) out.push(path)
  }
  return out
}

const SOURCE = walk('src', (f) => /\.jsx?$/.test(f) && !/\.test\.jsx?$/.test(f))
const STYLES = walk('src', (f) => /\.css$/.test(f))
const read = (files) => files.map((f) => [f, readFileSync(f, 'utf8')])

describe('palette', () => {
  // Hue band for the warm brand: roughly red-orange through amber. Anything
  // outside it is a second hue family, which is how the build ended up
  // running orange next to lime, pink and sage at the same time.
  function hue(hex) {
    const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16))
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    if (max - min < 12) return null // neutral: no meaningful hue
    const d = max - min
    let h
    if (max === r) h = 60 * ((((g - b) / d) % 6) + 6) % 360
    else if (max === g) h = 60 * ((b - r) / d + 2)
    else h = 60 * ((r - g) / d + 4)
    return h
  }

  it('keeps every chromatic colour inside the warm brand band', () => {
    const offenders = read(STYLES).flatMap(([file, css]) =>
      css
        .split('\n')
        .flatMap((line, i) =>
          // Skip comments: they quote the retired values on purpose.
          line.trim().startsWith('/*') || line.trim().startsWith('*')
            ? []
            : [...line.matchAll(/#([0-9a-fA-F]{6})\b/g)].map((m) => {
                const h = hue(m[1])
                return h !== null && (h < 12 || h > 52) ? `${file}:${i + 1} #${m[1]} (hue ${Math.round(h)})` : null
              }),
        )
        .filter(Boolean),
    )
    expect(offenders).toEqual([])
  })

  it('bans the specific retired values outright', () => {
    // Lime, pink, sage and the three neon oranges.
    const RETIRED = /#(e8edcc|dce4b7|d7df7f|e8b4bb|e9c6cf|e7c5cd|3b4834|788265|b8bf9e|ff6b35|ff763e|ff783f|f16834)\b/i
    const offenders = read(STYLES)
      .filter(([, css]) =>
        css.split('\n').some((l) => !l.trim().startsWith('/*') && !l.trim().startsWith('*') && RETIRED.test(l)),
      )
      .map(([f]) => f)
    expect(offenders).toEqual([])
  })

  it('defines the palette tokens once, in the globally loaded stylesheet', () => {
    // blog.css and project-browser.css reference these but are imported from
    // lazy routes, so the definitions have to live in index.css.
    const index = readFileSync('src/index.css', 'utf8')
    for (const token of ['--paper', '--kraft', '--kraft-deep', '--shell', '--linen', '--ember', '--amber']) {
      expect(index).toContain(`${token}:`)
    }
  })
})

describe('icons', () => {
  it('imports no third-party icon package', () => {
    // react-icons/Feather and Lucide (a Feather fork) are the generic
    // outline set; the in-house set in src/components/icons replaced it.
    const offenders = read(SOURCE)
      .filter(([f]) => !f.includes('components/icons'))
      .filter(([, t]) => /from '(react-icons|lucide-react)/.test(t))
      .map(([f]) => f)
    expect(offenders).toEqual([])
  })

  it('is not listed as a dependency', () => {
    const pkg = JSON.parse(readFileSync('package.json', 'utf8'))
    const deps = { ...pkg.dependencies, ...pkg.devDependencies }
    expect(Object.keys(deps)).not.toContain('react-icons')
    expect(Object.keys(deps)).not.toContain('lucide-react')
  })

  it('draws the set square-capped, so it does not read as Feather', () => {
    const icons = readFileSync('src/components/icons/index.jsx', 'utf8')
    expect(icons).toContain('strokeLinecap="square"')
    expect(icons).toContain('strokeLinejoin="miter"')
    expect(icons).not.toContain('strokeLinecap="round"')
  })
})

describe('decoration', () => {
  it('carries no emoji or decorative glyphs in the UI', () => {
    // The eight-spoked asterisk was on the h1, the footer, the pricing
    // header, the service ribbon, the quote dialog and two image fallbacks.
    // Alternation rather than one character class: a variation selector is a
    // combining mark, and lint rejects those inside a class.
    const GLYPHS = /[\u2728\u2733\u2734\u2b50\u2318]|\uFE0F|[\u{1F300}-\u{1FAFF}]|[\u{1F004}-\u{1F0CF}]/u
    const offenders = read(SOURCE)
      .filter(([, t]) => GLYPHS.test(t))
      .map(([f]) => f)
    expect(offenders).toEqual([])
  })

  it('has no dot-grid or blurred-orb backdrops', () => {
    const offenders = read(STYLES).flatMap(([file, css]) =>
      css
        .split('\n')
        .map((line, i) =>
          // A radial gradient used as a repeating background is a dot grid;
          // one behind a large blur is an orb. Neither survives here.
          /radial-gradient/.test(line) && !/mask/.test(line) ? `${file}:${i + 1}` : null,
        )
        .filter(Boolean),
    )
    expect(offenders).toEqual([])
  })

  it('has no blurred orb markup in components', () => {
    const offenders = read(SOURCE)
      .filter(([, t]) => /blur-3xl|blur-2xl/.test(t))
      .map(([f]) => f)
    expect(offenders).toEqual([])
  })

  it('applies backdrop blur only to modal scrims', () => {
    // Frosted navigation is the liquid-glass tell; a dialog scrim is not.
    const offenders = read(STYLES).flatMap(([file, css]) =>
      css
        .split('\n')
        .map((line, i) =>
          /backdrop-filter:\s*blur|backdrop-blur/.test(line) && !/backdrop|dialog|scrim|none/.test(line)
            ? `${file}:${i + 1}`
            : null,
        )
        .filter(Boolean),
    )
    expect(offenders).toEqual([])
  })
})

describe('shape and shadow', () => {
  it('keeps card and panel radii within the documented 12px cap', () => {
    // The cap in MASTER.md is on cards and panels. 50% is a circle (dots,
    // the orbit ring) and a scrollbar thumb is a platform control, not a
    // panel - a capsule thumb is the convention on every OS.
    let scope = true
    const offenders = read(STYLES).flatMap(([file, css]) =>
      css
        .split('\n')
        .flatMap((line, i) => {
          if (/::-webkit-scrollbar/.test(line)) scope = false
          else if (/^\s*\}/.test(line)) scope = true
          if (!scope) return []
          return [...line.matchAll(/border-radius:\s*([0-9]+)px/g)]
            .filter((m) => Number(m[1]) > 12)
            .map((m) => `${file}:${i + 1} ${m[0]}`)
        }),
    )
    expect(offenders).toEqual([])
  })

  it('uses hard offset shadows, not soft glows', () => {
    // The sheet's language is `Xpx Ypx 0`. A large blur radius mixed into it
    // is the generic drop shadow, and it read as a different design system.
    const offenders = read(STYLES).flatMap(([file, css]) =>
      css
        .split('\n')
        .flatMap((line, i) =>
          [...line.matchAll(/box-shadow:[^;}]*?(\d+)px\s+(?:-?\d+px\s+)?(\d{2,})px/g)]
            .filter((m) => Number(m[2]) > 45)
            .map((m) => `${file}:${i + 1} ${m[0].slice(0, 60)}`),
        ),
    )
    expect(offenders).toEqual([])
  })
})

describe('loading states', () => {
  it('answers every wait with a shaped skeleton, not a spinner', () => {
    const offenders = read(SOURCE)
      .filter(([, t]) => /animate-spin/.test(t))
      .map(([f]) => f)
    expect(offenders).toEqual([])
  })

  it('ships the skeleton primitive and honours reduced motion', () => {
    const css = readFileSync('src/index.css', 'utf8')
    expect(css).toContain('.skeleton-bar')
    const reduced = css.slice(css.indexOf('@keyframes skeleton-sweep'))
    expect(reduced).toMatch(/prefers-reduced-motion[\s\S]*?\.skeleton-bar::after\s*\{\s*animation:\s*none/)
  })
})

describe('legal routes', () => {
  it('routes both a privacy policy and terms', () => {
    const app = readFileSync('src/App.jsx', 'utf8')
    expect(app).toContain('/privacy-policy')
    expect(app).toContain('/terms')
  })
})
