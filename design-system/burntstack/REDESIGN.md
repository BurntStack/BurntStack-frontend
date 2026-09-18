# BurntStack studio redesign

## Evidence and direction

Reviewed the existing master design system, project records, offer data, page shell, lead flow, and footer. No separate research attachment was present. This is a repository-informed design study, not external user research.

The existing orange brand, Satoshi / General Sans typography, Instrument Serif accent, and confirmed BookMyVenues project informed the redesign. Pricing is still quoted individually. No client counts, testimonials, awards, or performance claims were invented.

The visual direction pairs a warm paper background with oversized type, orange, lime, and a pink project canvas. The interactive stack makes the brand name tangible: visitors can select Design, Develop, or Deploy, shuffle the cards, and restore them. All controls are buttons with keyboard access; selection is announced through an aria-live description. Reduced motion disables transitions.

## Content and interaction decisions

- Work appears directly after the hero, then capabilities, process, pricing explanation, FAQ, and contact.
- The BookMyVenues artwork is an original HTML/CSS interface study, labelled as such. It is not a screenshot or a claim about the shipped interface. Its enclosing link opens the existing confirmed project URL.
- Contact actions use the existing quote modal and lead submission integration.
- Navigation works across routes; the mobile menu closes after selection or Escape.
- Removed the unsolicited lead popup and redundant floating action column. The chat remains available.
- Replaced the footer's local-only newsletter success message with real email and route links.

## Verification

Production build and lint pass. All 71 existing tests pass. Browser proof images are stored in `proof/desktop.png` and `proof/mobile.png`.

Browser checks cover stack shuffle/reset, layer selection, quote modal opening and Escape, FAQ expansion, mobile menu navigation, and overflow at 320, 390, 768, and 1440 pixels. No real lead is sent by these checks. Production email delivery and externally hosted project availability are not verified by the local checks.

## Connection restoration — September 18, 2026

- Preserved the studio hero, interactive stack, colour palette and layout.
- Restored a dedicated `booking` section with the existing Cal.com event,
  click-to-load calendar, direct booking fallback and a playful calendar sticker.
- Restored the homepage journal from the published employee-portal feed, including
  loading, empty, cached and retry states. Added blog pagination and article retry.
- Restored package scopes with expandable inclusions. Selecting a package or
  service preselects it in the quote form and includes it in the email request.
- Contact offers both a written enquiry and scheduled consultation. Footer links
  restore service, pricing, FAQ, booking, portfolio, blog and direct contact paths.
- Generic social-network homepages are replaced with optional configured company
  profiles; unknown accounts are not guessed.
- Vite now runs the existing lead/chat/sitemap handlers locally. Forms require an
  explicit API acknowledgement, retain fields on failure, and expose real errors.
- No live emails or appointments were created during verification. Provider
  delivery requires the deployment credentials documented in the frontend README.

Verification: 81 tests pass; lint, production build and diff checks pass. Browser
checks passed for quote success/failure, service context, chat success/failure,
booking links, journal pagination/detail/retry, mobile navigation and overflow at
320, 390, 768, 900 and 1440 pixels. Live read-only checks loaded real published
articles and article content and created the Cal.com embed. Updated screenshots:
`proof/connected-desktop.png` and `proof/connected-mobile.png`.

## Project browser — September 18, 2026

The work section now uses a browser-style frame shared with portfolio entries.
The preview images are actual desktop/mobile website captures, replacing the
illustrated interface study. Embeddable projects can load an interactive iframe
on demand, browse inside it, reload, close, or open the full website.
BookMyVenues blocks framing through its own HTTP headers, so the live iframe is
gated off until its host allows BurntStack. The currently visible snapshot is
labelled and its external links work. No security headers are bypassed.

The owner supplied three more clients: ManaKutumbam, Velvora (clothing), and Ram
Laxman Gifts & Novelties. A four-button project selector keeps the homepage
compact while showing each client's browser preview, and the portfolio lists all
four entries. Brand names come from the supplied public sites; ManaKutumbam is
marked coming soon. Each new site allows framing, so its interactive preview is
enabled. The assistant's confirmed project list includes the same clients.

## Clearer content and blog layout

Removed the decorative geographical captions, figure label, section numbers,
secondary slogans and navigation superscript. Kept functional controls, contact
information and the keyboard skip link. Navigation now consistently says Blog
and How we work. The service ribbon lists actual offerings.

The blog uses the same page width, paper background and typography as the studio
homepage. One latest article leads a consistent card grid. Author/read-time rows
align, excerpts are limited, and cards show no more than two topic tags. Decorative
cover images no longer repeat the linked title in their text alternative; missing
or failed images receive CSS artwork. Search, category filters, pagination, empty
results, retry and article navigation remain connected to the existing API.

“What we do” leads to a clearly labelled services section with six concrete
services, three inclusions each, and an enquiry action that preselects the service.
Business websites, online stores, web/mobile apps, AI/automation, WhatsApp enquiries
and SEO/analytics share the same data as the quote-form options.

Browser checks passed for the live blog, aligned author rows, search/filter/empty/
pagination/retry/detail paths, all six service enquiry selections, navigation from
the blog, mobile menus and 320/390/768/1440 layouts. Real iframe checks passed for
all three new clients, including shop navigation within Velvora's iframe. No
messages, purchases or bookings were created. Lint, build and 81 unit tests pass.

## Services, process and pricing rebuild

Three bands were carrying the same weakness: uniform treatment where the
reader needed a distinction.

**What we do** was six identical cards in a 3x2 grid, which asked the
reader to sort the list themselves and implied every service mattered
equally. It is now two labelled groups, Build and Grow, numbered
continuously so the six stay one index. Each row leads with the outcome
in the visitor's own terms, because people arrive wanting customers to
find them rather than wanting on-page SEO. Inclusions are a fixed
three-row spec list, not wrapping pills: pills re-flowed into a ragged
1-2-1 pattern and left rows taller than their own copy.

**How we work** held one sentence per step and ran mostly empty. The fear
it exists to answer is losing control partway through, so each step now
ends with what the reader walks away holding, set apart from the prose.

**Pricing** printed the identical string "Price on request" in all four
cards, wasting the one row a pricing table is scanned for. The shared
promise now appears once at section level and each card gives that slot
to scope, which genuinely differs. A `fit` line sits under each name
because the question being asked is "which of these am I?", not "what
does it cost". Both fields derive from existing `features` data, so
nothing was invented, and the price slot returns when
`PACKAGES_CONFIRMED` flips.

### Defects found and fixed

- The same first call was described as 15 minutes in three places and 30
  in four others, against a `burntstack/30min` booking event. Unified on
  30 and covered by a test over all source files.
- The capability ribbon listed four services with ampersands directly
  under copy promising six, while the section below listed six with
  "and". It is now rendered from `OFFER_SERVICES`, so it cannot drift.
- Stacked process steps: the desktop rule stripping the first step's left
  padding still applied below 760px, so step 01 bled off the page edge
  while 02 and 03 sat indented.
- Footer directory links measured 22 to 23px wide against the 24px WCAG
  2.2 minimum. `.tap-target` only ever grew the vertical hit area, so it
  now covers both axes.
- `<select>` was missing from the cursor baseline; the quote form's
  package picker was the last control reporting `cursor: default`.
- The project card's live-site link was 20px tall.
- Copy added in this pass avoided contractions while the surrounding site
  used them. A straight apostrophe in `offer.js` terminates its own
  string literal, which broke the module once; a test now requires the
  typographic form in prose.
- Removed five superseded section components and the unused `OFFER_STEPS`
  export.

### Verification

Lint, production build and 91 unit tests pass, 10 of them new copy and
data-consistency checks. The accessibility and link audit reports zero
findings across `/`, `/portfolio`, `/contact`, `/blog` and `/terms`,
covering contrast, focus indicators, target size, control naming, field
labelling, heading order, duplicate ids and internal link resolution.
No horizontal overflow at 320, 390, 768, 1024, 1440 or 1920. The journal
band was checked against a forced 502 and degrades to a retry rather than
an empty section.

The audit itself had two false positives worth recording: it resolved
background colour by walking ancestors, so white text on the gradient
CTA band reported 1.08:1, and it checked focus rings on the element only,
so a wrapper using `:focus-within` looked unstyled. Both are corrected.

Pricing figures and delivery times remain unconfirmed.
