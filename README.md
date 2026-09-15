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
cp .env.example .env      # set VITE_BLOG_API_URL to the employee portal's API
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

- The Blog page reads published posts from the employee portal's public API
  (`${VITE_BLOG_API_URL}/blog/`) — see github.com/BurntStack/EmployeePortal-blog.
  Everything else in `src/data/*` is still static content.
- The Contact and Careers-application forms submit via Web3Forms directly
  from the client (`src/lib/web3forms.js`) — no backend involved.
