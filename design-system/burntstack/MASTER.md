# BurntStack — Design System (Master)

Source of truth for visual and interaction decisions on burntstack.com.
Derived with the `ui-ux-pro-max` skill, then corrected against measured
values from the live site. Every number below was measured, not assumed.

## Pattern

**Trust & Authority + Conversion** (`trust-authority-conversion`).

Section order: hero with lead capture → booking → published writing →
services → work → process → packages → objections → closing CTA.

The skill's canonical order is Hero → Proof → Solution → CTA. Ours puts
the form *inside* the hero rather than at the end of a CTA path, because
the previous build's "Get a quote" button scrolled the reader away from
what they were reading. Proof (the promise strip) sits immediately under
the hero, preserving the intent.

## Style

**Accessible & Ethical** as the governing constraint, expressed through a
full-bleed editorial layout. Requirements it imposes, all enforced in
`src/index.css`: 4.5:1 text contrast, visible focus on every control,
keyboard operability, `prefers-reduced-motion` honoured.

Rejected: the skill's first suggestion was **Brutalism** with a pink and
cyan palette. It does not fit a software studio with an established
orange brand, so the query was narrowed once, as the skill's own contract
requires. The second result fit.

## Colour

The brand palette is unchanged. What changed is *which* token is allowed
where, because several failed measurement.

| Token | Value | Use | Measured |
|---|---|---|---|
| `--color-mute` | `#6b6359` | captions, labels, eyebrows | 5.91 / 5.57 / 5.24 on white / ivory / sand |
| `--color-accent-fill` | orange-500 `#e0661a` | decorative fills, large text only | 3.45:1 with white — **never** under normal text |
| `--color-accent-solid` | orange-600 `#c6520f` | solid button backgrounds | 4.55:1 with white |
| `--color-accent-text` | orange-700 `#a1420f` | small orange text on light | 6.36 / 6.00 / 5.64 |

Rules learned by measurement:

- `--color-mute` was `#8b847a` and scored **3.70 / 3.49 / 3.28**. It
  carried every form label and caption on the site.
- White on orange-500 is **3.45:1** and cannot carry a button label.
  Solid buttons start at orange-600 and darken on hover.
- The brand band gradient is orange-600 → orange-700, giving white
  **4.55:1** at its lightest point. It was orange-500 → orange-600.
- On the brand band the serif accent is `amber-300` (**3.16 / 4.41**).
  `orange-300` measured **2.15:1** and failed even the large-text bar.
- On ink, muted text must be at least `white/50`. `white/40` is 3.82 and
  `white/45` is 4.49 — both fail. `white/55` is 6.09.

## Typography

Satoshi (body) and General Sans (display), retained. Instrument Serif
italic 400 is the accent face, one weight, used for a single phrase per
band and never for body copy.

Scale: `.t-editorial` `clamp(2.5rem, 1.2rem + 5.4vw, 5.75rem)` for band
headlines, `.t-editorial-sm` for sub-bands, `.t-label` 12px/0.18em
uppercase for eyebrows, `.t-numeral` for row indices.

## Interaction baseline

Defined once in `src/index.css @layer base`, not per component:

- `cursor: pointer` on every enabled control. The audit found **28**
  controls reporting `cursor: default` — the browser default for
  `<button>`, and one of the clearest tells of unfinished work.
- `:focus-visible` → 2px outline at `--color-accent-text`, 2px offset,
  flipping to white on dark grounds for 3:1 state contrast.
- `touch-action: manipulation` on interactive elements.
- `.tap-target` gives inline links a ≥44px hit area without changing how
  they look. WCAG 2.2 AA requires 24×24 CSS px; nav and footer links
  measured 17–23px.
- `prefers-reduced-motion` collapses animation and scroll behaviour, with
  content left in its final readable state.

## Verification

`scripts/audit` equivalent lives in the session scratchpad; re-run it
against a preview build before shipping UI changes. Resolve colours via
canvas rather than regex — computed styles come back as `oklab()` under
Tailwind v4 and naive parsing produces meaningless ratios.

Current state: **0** contrast failures, **0** missing focus indicators,
**0** `cursor: default` controls, **0** image issues, **0** heading-order
breaks, **0** unlabelled fields, **0** unnamed icon controls, one `h1`.

The only reported target under 24px is the skip link at 1×1, which is the
standard visually-hidden technique and correct.

## Known gaps

- Pricing is unpublished (`PACKAGES_CONFIRMED = false` in
  `src/data/offer.js`). Cards and the assistant both say "on request".
- No testimonials. `TESTIMONIALS` ships empty and the block does not
  render rather than showing invented quotes.
- Dark mode is not implemented. The tokens are structured for it, but no
  theme has been built or measured, so it must not be claimed.
