# BurntStack website

React 19 + Vite marketing site. The studio UI retains the existing booking,
enquiry, chat and employee-portal integrations.

## Run locally

```sh
npm install
cp .env.example .env.local
npm run dev
```

Vite serves `/api/lead`, `/api/chat`, `/api/sitemap` and `/sitemap.xml` through
the same handlers deployed to Vercel. Server credentials are read from local
`.env` files or the process environment; they are never compiled into the client.
`npm run preview` only previews static output and does not run the API handlers.

The example points to the existing public employee-portal API. To develop with
the portal backend locally, set `VITE_BLOG_API_URL=http://localhost:8000/api` and
run `EmployeePortal-blog/backend`. The separate top-level `backend` is the legacy
marketing API and does not serve blog posts. Local blog reads pass through Vite’s
`/portal-api` proxy so the published portal’s CORS policy can stay restricted to
the deployed website.

## Connections

| Flow | Connection | Configuration |
| --- | --- | --- |
| Schedule a consultation | Cal.com `burntstack/30min`; click-to-load calendar and direct booking link | Public, no API key |
| Written quote / contact | `POST /api/lead` → Resend → `socials@burntstack.com` | `RESEND_API_KEY`, `RESEND_FROM` |
| Burnty assistant | `POST /api/chat` → Groq; validated chat leads → Resend | `GROQ_API_KEY`, optional `GROQ_MODEL`; email settings above |
| Homepage journal, blog, categories, search, pagination and articles | Employee portal `/api/blog/` | `VITE_BLOG_API_URL` |
| Published article sitemap | `/sitemap.xml` → `/api/sitemap`, using the same blog source | `VITE_BLOG_API_URL` |
| WhatsApp, phone, email, office map | Shared existing contact details | `src/data/company.js`, `src/data/offer.js` |
| Company social profiles | Optional real profile links; generic social-network homepages are omitted | `VITE_SOCIAL_*` in `.env.example` |
| Portfolio | Existing confirmed project links | `src/data/projects.js` |

Set `RESEND_FROM` to a sender verified in the Resend account for production.
The existing onboarding sender is retained as a development fallback. Missing
credentials and failed deliveries display an error with direct contact options;
the form only confirms submission after the API acknowledges it. The selected
package or service and written message are included in the enquiry.

The top-level Django backend also contains legacy contact, newsletter, careers,
projects, testimonials and FAQ endpoints. These were not used by the current
website and are not silently connected to a different database by this redesign.
The active portfolio and FAQ content still comes from the site's curated data.

## Deploy

Deploy this directory as a Vercel project. Configure the server environment
variables above and the public blog URL in the project settings, then rebuild.
`vercel.json` retains the sitemap and client-route rewrites. A static-only host
needs an equivalent server for the `api/` handlers; serving HTML at `/api/lead`
will correctly fail rather than report a false success.

## Checks

```sh
npm run lint
npm test
npm run build
```

Tests cover chat validation, grounded lead capture, form delivery acknowledgement,
malformed fields and email-provider failures. Browser checks additionally cover
package selection, quote success/failure, booking, blog loading and retry,
pagination, article navigation, mobile menus and responsive widths. Mocked
submissions do not send real emails or create calendar appointments.

## Project browser previews

`ProjectBrowser` is shared by the homepage and portfolio. It shows a captured
website preview with an address bar and an external link. Projects with an
`embedUrl` also offer an on-demand interactive iframe, reload and close controls.
The real site is only loaded after the visitor chooses to explore it.

BookMyVenues currently sends both `X-Frame-Options: DENY` and CSP
`frame-ancestors 'none'` (verified September 18, 2026). Browsers therefore refuse
an iframe regardless of the BurntStack code. Its source/hosting configuration
must replace that ancestor rule with an explicit allowlist such as:

```text
frame-ancestors 'self' https://burntstack.com https://www.burntstack.com
```

Preserve all other CSP directives and remove the conflicting `X-Frame-Options`
header for the public pages that may be embedded. Local preview origins, if
needed, must also be explicitly permitted by that project's development policy.
After deploying and verifying those headers, set
`VITE_BOOKMYVENUES_EMBED_ENABLED=true` here and rebuild. Until then, the UI labels
the image as a snapshot and opens the real site in a new tab, avoiding a blocked
iframe. Desktop/mobile captures live in `public/projects/`.

The homepage's project selector includes BookMyVenues, ManaKutumbam, Velvora,
and Ram Laxman Gifts & Novelties; all four also appear on `/portfolio`.
ManaKutumbam is labelled coming soon to match its current public page. The three
new client sites permit embedding and use their actual URLs in the interactive
preview. Their desktop/mobile snapshots are JPEGs; BookMyVenues retains its PNG
captures. Switching projects closes the previous embed so only the selected
site runs on the homepage. The direct full-site link is always available.
