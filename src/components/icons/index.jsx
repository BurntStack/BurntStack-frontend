/**
 * BurntStack icon set.
 *
 * Replaces react-icons/Feather. Feather (and Lucide, which is a fork of it)
 * is drawn round-cap / round-join at a uniform 2px, which is why anything
 * using it reads as the same generic outline set every other site ships.
 *
 * This set is drafted instead: square caps, miter joins, and geometry built
 * from straight runs and single arcs. It sits closer to the tight, squared
 * terminals of General Sans than a rounded set does, and it is visibly not
 * Feather at a glance.
 *
 * Every glyph is stroke-only on `currentColor` at a 24 viewBox, so existing
 * CSS that sizes `svg` or overrides `stroke-width` keeps working. Brand marks
 * (GitHub, WhatsApp) are filled, since an outline version of a logo is not
 * that logo.
 */

/** Shared stroke geometry. `title` promotes a decorative glyph to a labelled one. */
function Glyph({ children, title, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden={title ? undefined : 'true'}
      role={title ? 'img' : undefined}
      focusable="false"
      {...props}
    >
      {title && <title>{title}</title>}
      {children}
    </svg>
  )
}

/** Brand marks are filled silhouettes, not strokes. */
function Mark({ children, title, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
      aria-hidden={title ? undefined : 'true'}
      role={title ? 'img' : undefined}
      focusable="false"
      {...props}
    >
      {title && <title>{title}</title>}
      {children}
    </svg>
  )
}

/* --------------------------------------------------------------------- */
/*  Direction                                                            */
/*                                                                       */
/*  The diagonal runs corner to corner with a head that closes at 45deg, */
/*  rather than Feather's short shaft in a floating box.                 */
/* --------------------------------------------------------------------- */

export const ArrowUpRight = (p) => (
  <Glyph {...p}><path d="M5 19 19 5" /><path d="M10 5h9v9" /></Glyph>
)
export const ArrowRight = (p) => (
  <Glyph {...p}><path d="M3 12h18" /><path d="m14 5 7 7-7 7" /></Glyph>
)
export const ArrowLeft = (p) => (
  <Glyph {...p}><path d="M21 12H3" /><path d="m10 5-7 7 7 7" /></Glyph>
)
export const ArrowDown = (p) => (
  <Glyph {...p}><path d="M12 3v18" /><path d="m5 14 7 7 7-7" /></Glyph>
)
export const ArrowUp = (p) => (
  <Glyph {...p}><path d="M12 21V3" /><path d="m5 10 7-7 7 7" /></Glyph>
)
export const ChevronRight = (p) => (
  <Glyph {...p}><path d="m9 4 8 8-8 8" /></Glyph>
)

/* --------------------------------------------------------------------- */
/*  Controls                                                             */
/* --------------------------------------------------------------------- */

export const Plus = (p) => (
  <Glyph {...p}><path d="M12 4v16" /><path d="M4 12h16" /></Glyph>
)
export const Close = (p) => (
  <Glyph {...p}><path d="m5 5 14 14" /><path d="M19 5 5 19" /></Glyph>
)
/** Asymmetric on purpose: the long arm carries past the corner. */
export const Check = (p) => (
  <Glyph {...p}><path d="m4 13 5 5L20 6" /></Glyph>
)
export const Play = (p) => (
  <Glyph {...p}><path d="M7 4v16l13-8z" /></Glyph>
)
export const Pause = (p) => (
  <Glyph {...p}><path d="M8 4v16" /><path d="M16 4v16" /></Glyph>
)
export const Refresh = (p) => (
  <Glyph {...p}>
    <path d="M20.5 9A9 9 0 1 0 21 13.5" />
    <path d="M21 3v6h-6" />
  </Glyph>
)
/** Two rules of different length - a three-bar hamburger is the generic one. */
export const Menu = (p) => (
  <Glyph {...p}><path d="M3 8h18" /><path d="M3 16h12" /></Glyph>
)
export const Search = (p) => (
  <Glyph {...p}><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></Glyph>
)

/* --------------------------------------------------------------------- */
/*  Contact                                                              */
/* --------------------------------------------------------------------- */

export const Phone = (p) => (
  <Glyph {...p}>
    <path d="M7 3h3.5l1.5 5-2.5 1.5a10.5 10.5 0 0 0 5 5L16 12l5 1.5V17a4 4 0 0 1-4 4C9.8 21 3 14.2 3 7a4 4 0 0 1 4-4z" />
  </Glyph>
)
export const Mail = (p) => (
  <Glyph {...p}><path d="M2 5h20v14H2z" /><path d="m2 5 10 8 10-8" /></Glyph>
)
export const MapPin = (p) => (
  <Glyph {...p}>
    <path d="M12 22s-7-7.6-7-12.5a7 7 0 1 1 14 0C19 14.4 12 22 12 22z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </Glyph>
)
export const Calendar = (p) => (
  <Glyph {...p}>
    <path d="M3 6h18v15H3z" /><path d="M3 10.5h18" />
    <path d="M8 3v4" /><path d="M16 3v4" />
  </Glyph>
)
/** Squared bubble with a hard tail. */
export const Message = (p) => (
  <Glyph {...p}><path d="M3 4h18v13H9l-5 4v-4H3z" /></Glyph>
)
export const Globe = (p) => (
  <Glyph {...p}>
    <circle cx="12" cy="12" r="9" /><path d="M3 12h18" />
    <path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" />
  </Glyph>
)

/* --------------------------------------------------------------------- */
/*  Capability marks - the stack tiles and the process steps             */
/*                                                                       */
/*  Drawn as what the stage produces (a wireframe, a bracket pair, a     */
/*  stack, a bearing, a crate) rather than a decorative pictogram.       */
/* --------------------------------------------------------------------- */

/** Design: a wireframe - header rule plus a sidebar split. */
export const Blueprint = (p) => (
  <Glyph {...p}>
    <path d="M4 4h16v16H4z" /><path d="M4 9h16" /><path d="M9.5 9v11" />
  </Glyph>
)
/** Develop: angle brackets, wider than a code glyph's usual pinch. */
export const Brackets = (p) => (
  <Glyph {...p}><path d="m9 6-5 6 5 6" /><path d="m15 6 5 6-5 6" /></Glyph>
)
/** Deploy: a stack seen in projection. */
export const Stack = (p) => (
  <Glyph {...p}>
    <path d="m12 3 9 5-9 5-9-5z" /><path d="m3 13 9 5 9-5" />
  </Glyph>
)
/** Discovery: a bearing mark. */
export const Bearing = (p) => (
  <Glyph {...p}>
    <circle cx="12" cy="12" r="8.5" /><path d="m15.5 8.5-2 5-5 2 2-5z" />
  </Glyph>
)
/** Handover: a crate. */
export const Crate = (p) => (
  <Glyph {...p}>
    <path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5z" /><path d="M3 7.5 12 12l9-4.5" /><path d="M12 12v9" />
  </Glyph>
)

/* --------------------------------------------------------------------- */
/*  Brand marks                                                          */
/* --------------------------------------------------------------------- */

export const GitHub = (p) => (
  <Mark {...p}>
    <path d="M12 1.8a10.2 10.2 0 0 0-3.2 19.9c.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .8.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.5 9.5 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10.2 10.2 0 0 0 12 1.8z" />
  </Mark>
)
export const WhatsApp = (p) => (
  <Mark {...p}>
    <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 1.8a8.2 8.2 0 1 1-4.2 15.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.8zm-3.3 4c-.2 0-.5.1-.7.4-.3.3-.9.9-.9 2.1s.9 2.4 1.1 2.6c.1.2 1.8 2.8 4.4 3.8 2.2.9 2.6.7 3.1.6.5 0 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.6-.3-1.6-.8c-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1-.2-.1-1.1-.4-2-1.2-.7-.6-1.2-1.4-1.3-1.7-.1-.2 0-.3.1-.4l.4-.5.3-.5v-.5l-.7-1.7c-.2-.5-.4-.4-.5-.5h-.5z" />
  </Mark>
)

/* --------------------------------------------------------------------- */
/*  Service marks - one per entry in OFFER_SERVICES                      */
/* --------------------------------------------------------------------- */

/** Business systems / ERP: a building elevation, not a generic office block. */
export const Building = (p) => (
  <Glyph {...p}>
    <path d="M4 21V5l8-3v19" /><path d="M12 9h8v12" />
    <path d="M2 21h20" /><path d="M7 8v2" /><path d="M7 13v2" /><path d="M16 13v2" />
  </Glyph>
)
/** Automation: a head-on unit with an antenna and two sensors. */
export const Automation = (p) => (
  <Glyph {...p}>
    <path d="M5 8h14v11H5z" /><path d="M12 4v4" /><path d="M10 12h.01" /><path d="M14 12h.01" />
    <path d="M9 16h6" />
  </Glyph>
)
/** Voice agents: a capsule mic on a stand. */
export const Microphone = (p) => (
  <Glyph {...p}>
    <path d="M9 4h6v9H9z" /><path d="M5 11a7 7 0 0 0 14 0" />
    <path d="M12 18v3" /><path d="M8 21h8" />
  </Glyph>
)
/** SaaS / hosting: a cloud drawn from straight runs and two arcs. */
export const Cloud = (p) => (
  <Glyph {...p}>
    <path d="M7 19h11a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.7 9.1 5 5 0 0 0 7 19z" />
  </Glyph>
)
/** E-commerce: a basket, flat-bottomed. */
export const Cart = (p) => (
  <Glyph {...p}>
    <path d="M3 5h3l2.5 11h10L21 8H7" />
    <path d="M10 20h.01" /><path d="M18 20h.01" />
  </Glyph>
)
/** Mobile apps: a handset with a hard-edged screen. */
export const Mobile = (p) => (
  <Glyph {...p}>
    <path d="M6 2h12v20H6z" /><path d="M6 18h12" /><path d="M10.5 5.5h3" />
  </Glyph>
)

/* --------------------------------------------------------------------- */
/*  Social brand marks                                                   */
/*                                                                       */
/*  Filled silhouettes. These are other companies' trademarks, so they    */
/*  are reproduced as-is rather than restyled to match the set.          */
/* --------------------------------------------------------------------- */

export const LinkedIn = (p) => (
  <Mark {...p}>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4v11H3v-11zm6.5 0h3.8v1.5h.06a4.2 4.2 0 0 1 3.77-2c4 0 4.74 2.6 4.74 6v5.5h-4V15.8c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3v4.8h-4v-11z" />
  </Mark>
)
export const Instagram = (p) => (
  <Mark {...p}>
    <path d="M12 2.2c3.2 0 3.6 0 4.9.07 3.25.15 4.77 1.7 4.92 4.92.06 1.28.07 1.67.07 4.9s0 3.6-.07 4.9c-.15 3.22-1.66 4.77-4.92 4.92-1.28.06-1.67.07-4.9.07s-3.6 0-4.9-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.11 15.6 2.1 15.2 2.1 12s0-3.6.07-4.9C2.32 3.87 3.83 2.32 7.1 2.17 8.4 2.11 8.8 2.2 12 2.2zm0 1.8c-3.17 0-3.54 0-4.79.07-2.3.1-3.2 1.03-3.3 3.3C3.84 8.6 3.83 8.96 3.83 12s0 3.4.08 4.63c.1 2.28 1 3.2 3.3 3.3 1.25.07 1.62.08 4.79.08s3.54 0 4.79-.08c2.3-.1 3.2-1.02 3.3-3.3.07-1.23.08-1.6.08-4.63s0-3.4-.08-4.63c-.1-2.27-1-3.2-3.3-3.3C15.54 4 15.17 4 12 4zm0 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4zm5.2-3.1a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z" />
  </Mark>
)
export const Facebook = (p) => (
  <Mark {...p}>
    <path d="M13.5 21.9V13.5h2.8l.5-3.3h-3.3V8.1c0-.95.26-1.6 1.63-1.6H17V3.6a23 23 0 0 0-2.54-.13c-2.5 0-4.22 1.53-4.22 4.35v2.4H7.4v3.3h2.84v8.4h3.26z" />
  </Mark>
)
export const XTwitter = (p) => (
  <Mark {...p}>
    <path d="M17.7 3h3.3l-7.2 8.2L22 21h-6.6l-5.2-6.7L4.3 21H1l7.7-8.8L1.3 3H8l4.7 6.2L17.7 3zm-1.2 16.2h1.8L7.6 4.7H5.6l10.9 14.5z" />
  </Mark>
)
