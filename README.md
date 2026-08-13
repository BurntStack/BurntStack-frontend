# BurntStack — Frontend

Premium, enterprise-grade company website for **BurntStack Technologies Private Limited**.
Built with React (JavaScript), Vite, Tailwind CSS v4 and Framer Motion.

## Tech Stack

- **React 19** + **Vite 8**
- **Tailwind CSS v4** (CSS-first config, dark/light theming)
- **Framer Motion** + **GSAP** — animations
- **React Router DOM** — routing with animated page transitions
- **Lenis** — smooth scrolling
- **Swiper** — testimonial slider
- **Axios** — API client
- **React Helmet Async** — SEO / meta tags
- **React Icons**

## Getting Started

```bash
npm install
cp .env.example .env      # set VITE_API_URL to your Django API
npm run dev               # http://localhost:5173
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build (code-split) |
| `npm run preview` | Preview the production build |
| `npm run lint` | Lint with oxlint |

## Project Structure

```
src/
  components/
    cards/      # ServiceCard, ProjectCard
    layout/     # Navbar, Footer, Layout, PageTransition, ScrollToTop
    seo/        # Seo (meta, OG, Twitter, JSON-LD)
    ui/         # Button, Container, Section, Badge, Logo, ThemeToggle,
                # SectionHeading, PageHero, Reveal, AnimatedCounter, BackgroundFX
  context/      # ThemeContext (dark/light)
  data/         # Content: services, technologies, projects, blog, careers…
  hooks/        # useSmoothScroll (Lenis)
  lib/          # axios instance, motion variants
  pages/        # One file per route (lazy-loaded)
  sections/home # Home page sections (Hero, Services, Pricing, FAQ…)
  utils/        # cn() classname helper
```

## Design System

- **Brand:** ember/amber accent (`--color-ember-*`) on a deep dark base — the "burnt" identity.
- **Theming:** semantic CSS variables in `index.css` swap between light and dark via a `.dark`
  class on `<html>`; brand tokens stay constant.
- **Accessibility:** skip link, focus-visible rings, ARIA labels, reduced-motion support,
  semantic headings.
- **SEO:** dynamic meta tags, Open Graph, Twitter cards, canonical URLs, JSON-LD, `robots.txt`
  and `sitemap.xml`.

## Notes

- All content lives in `src/data/*` so it is trivial to wire up to the Django API later
  (the Axios instance in `src/lib/axios.js` is already configured with JWT support).
- The Contact form posts to `${VITE_API_URL}/contact/`; the newsletter and careers forms are
  ready to be wired to their respective endpoints.
