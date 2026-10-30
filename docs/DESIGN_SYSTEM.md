<!-- Snapshot of dome-docs brand/DESIGN_SYSTEM.md (v2.7, dome-docs 20b1b32), copied 2026-10-30 so sessions
working in this repo alone can read it. The canonical copy lives in the private dome-docs repo; when the
two differ, dome-docs wins. Dashes were replaced by colons, commas or 'to' in this copy (house style). -->

# DOME Design System v2.7
**Governance-Driven Operational AI**
Last updated: October 2026

> This file is the single source of truth for all DOME brand and UI decisions.
> It supersedes DOME_Design_System_v1.0.md and the original extracted system from domelayer.com.
> Apply to domelayer.com first, then each portfolio product in sequence.

---

## Table of Contents

1. [Brand Foundation](#1-brand-foundation)
2. [Colour Tokens](#2-colour-tokens)
3. [Typography](#3-typography)
4. [Spacing & Layout](#4-spacing--layout)
5. [Elevation & Borders](#5-elevation--borders)
6. [Iconography](#6-iconography)
7. [Component Library](#7-component-library)
8. [Motion & Animation](#8-motion--animation)
9. [Theme System](#9-theme-system)
10. [Tailwind CSS v4 Configuration](#10-tailwind-css-v4-configuration)
11. [Copywriting Guidelines](#11-copywriting-guidelines)
12. [Migration Guide](#12-migration-guide)
13. [Usage Rules & Anti-patterns](#13-usage-rules--anti-patterns)

14. [Imagery and Media (v2.1)](#14-imagery-and-media-v21)

> **v2.1 (2026-09-15):** adds section 14 (imagery, hero video, scrim tokens, functional fades), removes the em dash guidance, and reframes brand identity for DOME as the company. Everything else in v2.0 stands.
>
> **v2.2 (2026-10-13): contrast.** Every text colour now meets WCAG 2.1 AA (4.5:1) on every surface it
> sits on, in both themes. The tertiary grey, the light-theme accent text and the filled-button blue move
> to darker steps; hover on a filled button now darkens instead of lightening; `#0080FF` stays the brand
> accent for the logo, graphics and borders. v2.1 claimed white text on `#0080FF` buttons had enough
> contrast: it is 3.8:1, so it did not. Found by the 2026-10-12 SEO and accessibility audit
> (`dome-docs/audits/2026-10-12-seo-geo-audit.md`). Values and ratios in section 2, "Contrast (v2.2)".
>
> **v2.3 (2026-10-27): input-driven motion, home hero only.** Section 8 gains "Input-driven motion: the
> home hero (v2.3)", a scoped exception to "purposeful, not decorative", the 600 ms ceiling and "no
> decorative gradients" for the generative scene that replaced the home hero video (Sprint HX,
> `dome-docs/sprints/SPRINT_HX_HOME_HERO.md`). Every other component keeps the v2.2 rules. Rationale in
> `DOME_DECISIONS.md`, 2026-10-27.

> **v2.4 (2026-10-27): the home hero on the primary colour, home hero only.** Section 2 gains "Home
> hero surface (v2.4)": the home hero is the one full-bleed surface in the accent, with a radial glow
> from 768px and a fade into the page on phones, white copy, an inverse button, a white wordmark over
> it and a three-state top bar. Four scoped exceptions, listed there; every other page, component and
> surface keeps the v2.2 colour rules. Sub-page heroes are unchanged. Rationale in
> `DOME_DECISIONS.md`, 2026-10-27 (second entry).

> **v2.5 (2026-10-27): the primary in the dark hero too, and a blue top bar on every page.** The
> dark hero uses the same `#0070E0` surface and glow as light, with only a deeper outer edge
> (`#004D99` read as too neutral). The top bar is solid `#0070E0` on every page in both themes,
> transparent only at the very top of the home page; the current page is underlined. This widens
> the v2.4 exception from the home hero to the top bar site-wide; the rest of every page keeps the
> v2.2 rules. Rationale in `DOME_DECISIONS.md`, 2026-10-27 (third entry).

> **v2.6 (2026-10-28): the sign-in page and the 404 on the hero surface.** The same surface, still
> frames and inverse button as the home hero, on two more pages: `/login` (a full-bleed split from
> 1024px, a band below, no top bar) and the 404 and error page (the record art, the full bar
> transparent over the blue on the 404). The 404's one-off 600ms entrance is within the section 8
> entrance limit, so the home hero's motion exception is not extended. Rationale in
> `DOME_DECISIONS.md`, 2026-10-28.

> **v2.7 (2026-10-28): the blue surface becomes a rule, not a list of exceptions.** Four versions
> each added a place where the accent may be a surface. v2.7 replaces that list with one rule by
> page role (section 2, "Blue surface"): the top bar on every page, and the opening band of an
> entry page, the page someone lands on rather than reads through. Everything else stays neutral.
> The signed-in hub `/app` is the first page added under the rule (its opening band: "What would
> you like to do?" with one action tile per tool). The home hero's motion exception (v2.3) is
> unchanged and still covers the home hero only. Rationale in `DOME_DECISIONS.md`, 2026-10-28,
> "The blue surface as a rule".

---

## 1. Brand Foundation

### Identity

| Property | Value |
|---|---|
| Name | DOME |
| Full name | Dome |
| Domain | domelayer.com |
| Positioning | Governance-Driven Operational AI |
| Category | Practice site: enterprise UX and product consulting, AI process automation, DOME capability showcase (v2.1) |
| Audience | CDOs, CFOs, procurement, product and operations leaders at regulated enterprises |

### Design Principles

**Clarity as authority.** DOME does not need decoration to communicate expertise. Whitespace, typographic precision, and restraint do the work. No gradients. No decorative shadows. No unnecessary colour. (Since v2.7 one rule allows the accent as a surface: the top bar and the opening band of an entry page, section 2, "Blue surface".)

**Single accent, total control.** The electric blue accent (`#0080FF`) is the only brand colour beyond neutrals. Filled buttons and accent text use darker steps of the same blue, so text on them stays legible (v2.2). It appears intentionally and sparingly, never as decoration and always as a signal of something actionable or important.

**Soft modern, not sharp technical.** The system uses rounded corners (8px buttons, 12px cards) and clean Inter typography: consistent with Apple, Linear, and Revolut. This is deliberate: DOME is a modern, forward-looking firm, not a developer tool.

**Sentence case everywhere.** No uppercase buttons, no uppercase nav links. Uppercase is reserved exclusively for eyebrow labels and badge text. Sentence case signals confidence and modernity.

**Consistency across every touchpoint.** Every product, document, and page shares the same token system. A visitor moving from the website to a portfolio demo to a PDF proposal must feel the same brand.

**Theme flexibility.** Everything defaults to light theme. Dark theme is available via toggle on all surfaces: website and products alike. Neither theme is mandatory for any context.

---

## 2. Colour Tokens

### Primitive Palette

Raw values only. Never reference primitives directly in components: always use semantic tokens.

```css
/* Neutrals */
--primitive-white:       #FFFFFF;
--primitive-black:       #0A0A0A;
--primitive-grey-50:     #FAFAFA;
--primitive-grey-100:    #F5F5F5;
--primitive-grey-200:    #E8E8E8;
--primitive-grey-300:    #D4D4D4;
--primitive-grey-400:    #A3A3A3;
--primitive-grey-500:    #737373;
--primitive-grey-600:    #525252;
--primitive-grey-700:    #404040;
--primitive-grey-800:    #262626;
--primitive-grey-900:    #171717;
--primitive-grey-950:    #0D0D0D;

/* Electric Blue: the only brand accent */
--primitive-blue-50:     #E8F3FF;
--primitive-blue-100:    #C5DFFF;
--primitive-blue-200:    #99CCFF;
--primitive-blue-300:    #66B3FF;
--primitive-blue-400:    #40A8FF;   /* dark-theme accent text */
--primitive-blue-500:    #0080FF;   /* PRIMARY ACCENT: logo, graphics, borders; never under white text */
--primitive-blue-550:    #0070E0;   /* filled accent (white text 4.8:1), v2.2 */
--primitive-blue-600:    #0066CC;   /* fill hover; light-theme accent text (v2.2) */
--primitive-blue-700:    #004D99;   /* fill pressed / active (v2.2) */
--primitive-blue-800:    #003366;
--primitive-blue-900:    #001A33;
```

### Semantic Tokens: Light Theme (Default)

```css
:root {
  /* Backgrounds */
  --color-bg-base:          #FFFFFF;   /* page background */
  --color-bg-subtle:        #FAFAFA;   /* alternate section background */
  --color-bg-muted:         #F5F5F5;   /* card backgrounds, input fields */
  --color-bg-accent:        #E8F3FF;   /* accent-tinted surfaces */
  --color-bg-accent-hover:  #C5DFFF;   /* accent surface on hover */
  --color-bg-inverse:       #0A0A0A;   /* dark sections, footer */

  /* Text */
  --color-text-primary:     #0A0A0A;   /* headings, body */
  --color-text-secondary:   #525252;   /* descriptions, secondary labels */
  --color-text-tertiary:    #6E6E6E;   /* placeholders, captions (v2.2: was #A3A3A3, 2.5:1) */
  --color-text-accent:      #0066CC;   /* links, accented labels (v2.2: was #0080FF, 3.8:1) */
  --color-text-on-accent:   #FFFFFF;   /* text on filled accent buttons */
  --color-text-on-inverse:  #F5F5F5;   /* text on dark/inverse surfaces */

  /* Borders */
  --color-border-subtle:    #F0F0F0;   /* dividers, section separators */
  --color-border-default:   #E8E8E8;   /* card borders, input borders */
  --color-border-strong:    #D4D4D4;   /* emphasis borders */
  --color-border-accent:    #99CCFF;   /* accent-bordered elements */

  /* Interactive */
  --color-accent:           #0070E0;   /* filled primary action (v2.2: was #0080FF) */
  --color-accent-hover:     #0066CC;   /* hover darkens (v2.2: was #40A8FF, 2.5:1 with white) */
  --color-accent-active:    #004D99;   /* pressed / active state */
  --color-accent-subtle:    #E8F3FF;   /* ghost / tinted backgrounds */

  /* Focus */
  --color-focus-ring:       rgba(0, 128, 255, 0.25); /* keyboard focus ring: all interactive elements */

  /* Status */
  --color-success:          #16A34A;
  --color-success-subtle:   #F0FDF4;
  --color-success-border:   #86EFAC;
  --color-warning:          #D97706;
  --color-warning-subtle:   #FFFBEB;
  --color-warning-border:   #FCD34D;
  --color-error:            #DC2626;
  --color-error-subtle:     #FEF2F2;
  --color-error-border:     #FCA5A5;
}
```

### Semantic Tokens: Dark Theme

```css
[data-theme="dark"] {
  /* Backgrounds */
  --color-bg-base:          #0A0A0A;
  --color-bg-subtle:        #111111;
  --color-bg-muted:         #1A1A1A;
  --color-bg-accent:        #001A33;
  --color-bg-accent-hover:  #003366;
  --color-bg-inverse:       #F5F5F5;

  /* Text */
  --color-text-primary:     #F5F5F5;
  --color-text-secondary:   #A3A3A3;
  --color-text-tertiary:    #858585;   /* v2.2: was #525252, 2.5:1 */
  --color-text-accent:      #40A8FF;   /* lightened for dark bg legibility */
  --color-text-on-accent:   #FFFFFF;
  --color-text-on-inverse:  #0A0A0A;

  /* Borders */
  --color-border-subtle:    #1A1A1A;
  --color-border-default:   #262626;
  --color-border-strong:    #404040;
  --color-border-accent:    #004D99;

  /* Interactive */
  --color-accent:           #0070E0;
  --color-accent-hover:     #0066CC;
  --color-accent-active:    #004D99;
  --color-accent-subtle:    #001A33;

  /* Focus */
  --color-focus-ring:       rgba(64, 168, 255, 0.3);

  /* Status */
  --color-success:          #22C55E;
  --color-success-subtle:   #052E16;
  --color-success-border:   #166534;
  --color-warning:          #F59E0B;
  --color-warning-subtle:   #1C1400;
  --color-warning-border:   #854D0E;
  --color-error:            #EF4444;
  --color-error-subtle:     #1F0000;
  --color-error-border:     #7F1D1D;
}
```

### Colour Usage Rules

- The electric blue is the **only** non-neutral colour in the system. One accent, no exceptions: `#0080FF` for the logo, graphics and borders, and its darker steps where text sits on it or is set in it (v2.2).
- No decorative gradients: not on backgrounds, text, icons, or decorative elements. The system is flat. The exceptions are a functional fade from media into the theme background (v2.1, section 14) and the radial glow of the blue surface (v2.4, below).
- The accent is a large surface only where "Blue surface" below says: the top bar, and the opening band of an entry page (v2.7). Never a section, card or panel further down a page, and never inside the product UIs.
- The hero headline on domelayer.com is solid white on dark: no gradient text.
- Body copy always uses `--color-text-primary` or `--color-text-secondary`. Never raw hex values in components.
- Status colours (success, warning, error) are for system feedback only: never for brand decoration.
- The focus ring token `--color-focus-ring` must be applied to **every** interactive element for WCAG 2.1 AA compliance. Enterprise clients in regulated sectors may have internal accessibility requirements.
- In dark theme, `--color-text-accent` shifts to `#40A8FF` for legibility. Filled accent buttons use `--color-accent` (`#0070E0`) in both themes, because white on `#0080FF` is only 3.8:1 (v2.2; v2.1 wrongly said it was enough).
- **Every text colour meets 4.5:1 on every surface it can sit on** (base, subtle, muted and accent-tinted, in both themes); 3:1 is enough only for text at 24 px, or 18.66 px bold, and for non-text UI such as borders and icons. Check a new token against all four surfaces, not just the page background.

### Contrast (v2.2)

Worst case over the four surfaces of each theme (light: `#FFFFFF`, `#FAFAFA`, `#F5F5F5`, `#E8F3FF`; dark: `#0A0A0A`, `#111111`, `#1A1A1A`, `#001A33`).

| Pair | Value | Worst case |
|---|---|---|
| Tertiary text, light | `#6E6E6E` | 4.54:1 |
| Tertiary text, dark | `#858585` | 4.72:1 |
| Accent text, light | `#0066CC` | 4.96:1 |
| Accent text, dark | `#40A8FF` | 6.85:1 |
| White on filled accent | `#0070E0` | 4.78:1 |
| White on fill hover | `#0066CC` | 5.57:1 |
| White on fill pressed | `#004D99` | 8.33:1 |

### Blue surface (v2.4 to v2.7)

The accent became a surface on the home hero (v2.4: on a white or black page the hero did not stand
apart, and in light the scene lost its impact), then the top bar (v2.5), then the sign-in page and the
404 (v2.6). From v2.7 one rule decides where it goes, instead of a list of exceptions:

**The rule (v2.7).** The accent is a large surface in exactly two roles.
1. **The top bar**, on every page, signed in or not (the sign-in page carries the brand on its blue
   side instead, see below).
2. **The opening band of an entry page.** An entry page is one people land on rather than read
   through: the home page, sign-in, the 404 and error page, and the signed-in hub `/app`. One band
   per page, at the top, holding only the page's opening: the wordmark where there is no bar, a
   heading, a line, and the page's first actions. The rest of the page sits on the neutral surfaces.

Not entry pages, so neutral: sub-page heroes, content pages (services, case studies, about, legal),
and every screen inside the tools. Cards, sections and panels further down any page stay neutral. A new
entry page uses the band without a new decision; a blue surface anywhere else still needs one. Every
band keeps the copy, button and contrast rules below.

**Surface.** The original primary in both themes (v2.5; v2.4 used `#004D99` in dark, which read as
too neutral). Only the glow's outer edge differs, deeper in dark so the blue meets the black page
softly rather than as a bright slab.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--color-hero-surface` | `#0070E0` | `#0070E0` | The hero fill |
| `--color-hero-surface-glow` | `#4A9DFF` | `#4A9DFF` | Centre of the radial glow, behind the scene only |
| `--color-hero-surface-deep` | `#005AB5` | `#003D7A` | Outer edge of the radial glow |
| `--color-bar` | `#0070E0` | `#0070E0` | The top bar, every page |

**Fill, by the same breakpoint as the scene (768px, `md`).**
- From 768px (the dome): a radial glow centred under the dome. Desktop (1024px and up): ellipse
  60% x 70% at 72% 92%. Tablet (768 to 1023px): ellipse 60% x 42% at 50% 102%. Both settle to
  `--color-hero-surface` by 40% and to `-deep` at the edge. The hero ends on a clean edge.
- Below 768px (signal to record): the surface holds behind the copy and buttons, then fades into the
  page background across the 200px scene band at the bottom of the hero.
- The glow is sized so that all copy sits on `--color-hero-surface` or deeper. Changing its size or
  centre means re-checking contrast at the copy, not just at the centre.

**Copy and buttons on the surface.**
- Eyebrow, heading, lead and the scroll cue are white. Only pure white passes on `#0070E0` (4.78:1),
  so nothing on it is tinted or faded, in either theme (v2.4's 86% white dark lead was for `#004D99`).
- Worst case at the copy, scrim aside: 5.17:1 (tablet), 5.26:1 (desktop) in light.
- With the scene running, the dots add white light under the text, so they dim harder behind the
  copy (to 10% on desktop, 25% on touch) and the pointer ring fades out over it. Measured on the page
  (surface, scene and scrim composited, worst point in each text box): light at 1440 at least
  4.76:1 with the pointer on the copy, light at 768 at least 5.04:1, dark at 1440 at least 5.08:1
  (v2.5). Anything that brightens the scene near the copy has to be re-measured this way.
- Primary button: inverse, white fill with `#0066CC` text (5.57:1) in both themes; hover `#E8F3FF`. Secondary: transparent, 1px white border at 72%, white text, hover white
  at 12%. Focus rings stay.
- The scrims behind the copy are tinted with the surface colour, never white or black.

**Wordmark.** White on the blue surface and in the top bar. It is the same SVG with a different
fill, not a new asset. On white or black surfaces the wordmark stays `#0080FF`.

**Top bar (v2.5: every page).** Solid `--color-bar` on every page in both themes, with white
wordmark, links and icons and the inverse Sign in button (white with `#0066CC` text). At the very
top of the home page it is transparent, so the hero shows through; it turns solid as soon as the page
scrolls. The current page is white with a 2px underline (offset 8px), since accent text would not
show on blue. A light shadow appears once the page scrolls. On phones the bar stays solid with the
menu open; the menu itself is the page-colour menu. Transitions are colour only, on the bar's
existing 300ms transition. (v2.4 had three states on the home page, with a frosted bar and the normal
bar after the hero; v2.5 replaces them.)

**Scene on the surface** (section 8, "Input-driven motion"). Governed dots are white light (additive),
with a light-blue glow; raw particles in signal to record are darker specks, so noise to record still
reads. In the fade, dots cross over to the page palette as the surface gives way.

**Sign-in page (v2.6).** `/login` has no top bar; the wordmark on the surface is the link home and the
theme switch sits in a corner. From 1024px: a full-bleed split, the surface 58% of the width (at most
1000px) and the full height of the window, radial glow at 60% 100%, the brand line on the deeper blue
at the top left and the dome's still frame on the bottom edge, sized to the side and 40px clear of the
brand line; the form on the page colour in a 360px column. 768 to 1023px: a band with the dome fading
into the page, the form in a card. Phones: a band with the record rows fading into the page. Form
fields and buttons are 44px. Error text in dark is `#F87171` (6.9:1 on `#0A0A0A`; the status
`#DC2626` is 3.9:1 there).

**404 and error page (v2.6).** The whole page is the surface (radial glow from the bottom centre,
settling to the surface colour by 46%, so the copy sits on the surface colour or deeper). The 404
draws its number as a record: 5 by 7 dot glyphs on a 26px grid, linked along rows only, among loose
signal. It has the full top bar, transparent over the blue as at the top of the home page. Once on
load the record dots settle out of the signal (420ms each after a delay of up to 180ms, then the row
links fade in: 600ms in all), and not at all with reduced motion. "Something went wrong" has only the
loose signal, the wordmark home and no menu, and no motion.

**Signed-in hub `/app` (v2.7).** The band asks "What would you like to do?" (eyebrow "Welcome back",
heading in white) over one action tile per tool, and a white underlined link for Agent Flow's private
demo. The top bar is transparent over the band, as at the top of the home page, and turns solid once
the page scrolls. From 768px: the home hero's desktop glow (ellipse 60% x 70% at 72% 92%), four tiles
in a row. Phones: the surface holds behind the copy and tiles, two tiles a row, then fades into the page
over the last 110px, below the link, so no text sits in the fade. Tiles are inverse, like the primary
button: white fill in both themes, 12px radius, a `#0066CC` stroke icon and arrow, the action in
`#0A0A0A` and the tool's name in `#525252`; hover `#E8F3FF`. Below the band, on the page colour: the
latest record per tool to pick up from, and one card with the governance numbers and "Open the
governance dashboard" (the filled primary). No scene and no motion on this band.

---

## 3. Typography

### Typeface Decision

**One typeface: Inter.** Clean, precise, Apple-adjacent. Used for all UI text: headings, body, labels, buttons, nav.

**One monospace: JetBrains Mono.** Used exclusively for code snippets. No brand role.

```css
/* Google Fonts import */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont,
               'Helvetica Neue', Arial, sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace;
}

body {
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

> Note: Inter weight 300 is not imported. The minimum weight is 400.

### Type Scale

| Token | Size | Weight | Line Height | Letter Spacing | Usage |
|---|---|---|---|---|---|
| `--text-display` | clamp(2.5rem, 5vw, 3.5rem) | 700 | 1.1 | -0.03em | Hero headlines |
| `--text-h1` | clamp(2rem, 4vw, 2.5rem) | 700 | 1.15 | -0.025em | Page titles |
| `--text-h2` | clamp(1.5rem, 3vw, 2rem) | 700 | 1.2 | -0.02em | Section headings |
| `--text-h3` | clamp(1.25rem, 2.5vw, 1.5rem) | 600 | 1.25 | -0.015em | Sub-section headings |
| `--text-h4` | 1.25rem / 20px | 600 | 1.3 | -0.01em | Card headings |
| `--text-eyebrow` | 0.6875rem / 11px | 600 | 1.4 | 0.18em | Section labels: always uppercase |
| `--text-body-lg` | 1.125rem / 18px | 400 | 1.7 | 0 | Lead paragraphs |
| `--text-body` | 1rem / 16px | 400 | 1.7 | 0 | Default body copy |
| `--text-body-sm` | 0.875rem / 14px | 400 | 1.6 | 0 | Secondary descriptions |
| `--text-label` | 0.8125rem / 13px | 500 | 1.4 | 0 | UI labels, buttons, nav |
| `--text-caption` | 0.75rem / 12px | 400 | 1.5 | 0 | Captions, helper text |
| `--text-overline` | 0.625rem / 10px | 500 | 1.4 | 0.14em | Badges, tags: always uppercase |

### Casing Rules

| Element | Casing |
|---|---|
| All headings (H1 to H4, Display) | Sentence case |
| Body copy | Sentence case |
| Buttons | Sentence case |
| Nav links | Sentence case |
| Eyebrow labels | UPPERCASE (only via `text-transform: uppercase`) |
| Badge / overline text | UPPERCASE (only via `text-transform: uppercase`) |
| DOME wordmark | DOME: all-caps always |
| Brand name in body copy | Dome: mixed case |

> Never manually type uppercase in copy. Always use `text-transform: uppercase` in CSS so it can be overridden if needed.

### Typography Rules

- Minimum font size: 12px (`--text-caption`). Nothing smaller in any component.
- Body copy line length: 60 to 80 characters (`max-width: 65ch` on prose containers).
- Use `--font-mono` only for `<code>` elements and code blocks. Never for labels, buttons, or UI text.
- Allowed Inter weights: 400, 500, 600, 700 only. Never 300 (too light on screens) or 800+.
- Negative letter spacing (`-0.03em` to `-0.01em`) on all headings: tight tracking reads as modern and confident at large sizes.

---

## 4. Spacing & Layout

### Spacing Scale

Base-4 system with an 8px fundamental unit.

```css
:root {
  --space-1:   4px;
  --space-2:   8px;
  --space-3:   12px;
  --space-4:   16px;
  --space-5:   20px;
  --space-6:   24px;
  --space-8:   32px;
  --space-10:  40px;
  --space-12:  48px;
  --space-16:  64px;
  --space-20:  80px;
  --space-24:  96px;
  --space-32:  128px;
  --space-40:  160px;
}
```

### Layout Grid

```css
:root {
  --grid-columns:    12;
  --grid-gutter:     24px;
  --content-max:     1200px;
  --content-narrow:  720px;
  --content-wide:    1400px;
}

/* Page margins: responsive */
.page-container {
  width: 100%;
  max-width: var(--content-max);
  margin: 0 auto;
  padding: 0 24px;
}
@media (min-width: 768px)  { .page-container { padding: 0 48px; } }
@media (min-width: 1024px) { .page-container { padding: 0 80px; } }
@media (min-width: 1280px) { .page-container { padding: 0 auto; } }
```

### Section Spacing

| Context | Top padding | Bottom padding |
|---|---|---|
| Hero section | 160px (`--space-40`) | 128px (`--space-32`) |
| Standard section | 96px (`--space-24`) | 96px (`--space-24`) |
| Compact section | 64px (`--space-16`) | 64px (`--space-16`) |
| Card internal (large) | 32px (`--space-8`) | 32px (`--space-8`) |
| Card internal (standard) | 24px (`--space-6`) | 24px (`--space-6`) |
| Component internal | 16px (`--space-4`) | 16px (`--space-4`) |

### App Shell Layout (Product UIs)

For portfolio demo products with persistent sidebar navigation.

```
┌─────────────────────────────────────────────┐
│ Top bar (64px height)                        │
├──────────────┬──────────────────────────────┤
│              │                              │
│  Sidebar     │  Main content area           │
│  240px       │  flex: 1                     │
│  (collapsed: │                              │
│  64px)       │                              │
│              │                              │
└──────────────┴──────────────────────────────┘
```

```css
.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--color-bg-base);
}

.app-topbar {
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 var(--space-6);
  background: var(--color-bg-base);
  border-bottom: 0.5px solid var(--color-border-subtle);
  position: sticky;
  top: 0;
  z-index: 100;
}

.app-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.app-sidebar {
  width: 240px;
  flex-shrink: 0;
  background: var(--color-bg-subtle);
  border-right: 0.5px solid var(--color-border-subtle);
  padding: var(--space-4) 0;
  overflow-y: auto;
  transition: width 200ms ease;
}

.app-sidebar.collapsed {
  width: 64px;
}

.app-main {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-8);
}

/* Sidebar nav item */
.sidebar-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-label);
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  border-radius: 0;
  transition: color 150ms ease, background 150ms ease;
  white-space: nowrap;
  overflow: hidden;
}

.sidebar-item:hover {
  color: var(--color-text-primary);
  background: var(--color-bg-muted);
}

.sidebar-item.active {
  color: var(--color-text-accent);
  background: var(--color-bg-accent);
}

/* Sidebar section label */
.sidebar-section-label {
  font-size: var(--text-overline);
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-tertiary);
  padding: var(--space-4) var(--space-4) var(--space-2);
}
```

---

## 5. Elevation & Borders

### Border Radius

```css
:root {
  --radius-sm:   4px;     /* badges, tags, small chips */
  --radius-md:   8px;     /* buttons, inputs, small cards */
  --radius-lg:   12px;    /* standard cards */
  --radius-xl:   16px;    /* large cards, modals, panels */
  --radius-full: 9999px;  /* pills */
}
```

> Maximum is `--radius-xl` (16px). Never exceed this: larger values read as consumer product, not enterprise.

### Border Widths

```css
:root {
  --border-thin:    0.5px;  /* dividers, subtle separators */
  --border-default: 1px;    /* standard component borders */
  --border-thick:   2px;    /* active states, featured items */
}
```

### Shadows

Used sparingly: only on floating elements (dropdowns, modals, tooltips). Never on flat page surfaces.

```css
:root {
  --shadow-sm:  0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md:  0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04);
  --shadow-lg:  0 12px 32px rgba(0,0,0,0.10), 0 4px 8px rgba(0,0,0,0.04);
  --shadow-xl:  0 24px 48px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.06);
}

[data-theme="dark"] {
  --shadow-sm:  0 1px 3px rgba(0,0,0,0.4);
  --shadow-md:  0 4px 12px rgba(0,0,0,0.5);
  --shadow-lg:  0 12px 32px rgba(0,0,0,0.6);
  --shadow-xl:  0 24px 48px rgba(0,0,0,0.7);
}
```

---

## 6. Iconography

Use **Lucide Icons**: consistent with the React / Vite / TypeScript stack at domelayer.com.

```bash
npm install lucide-react
```

### Icon Sizes

```css
:root {
  --icon-xs:  12px;   /* inline with caption text */
  --icon-sm:  16px;   /* inline with body text, inside buttons */
  --icon-md:  20px;   /* navigation items, form labels */
  --icon-lg:  24px;   /* standalone feature icons */
  --icon-xl:  32px;   /* section icons */
  --icon-2xl: 48px;   /* empty states, hero moments */
}
```

### Icon Rules

- Default colour: `--color-text-tertiary`
- Hover colour: `--color-text-primary`
- Active / selected: `--color-text-accent`
- Lucide default stroke width is `1.5`: do not change this value
- Icon + label gap: `--space-2` (8px)
- Never use icons purely decoratively in body copy

---

## 7. Component Library

### 7.1 Buttons

> v2.4: the home hero surface uses an inverse primary (white fill, blue text) and a white outline
> secondary, see "Blue surface" in section 2. v2.5: the top bar's Sign in uses the same inverse
> primary. v2.7: so do the action tiles on the `/app` band. Only on the blue surface.

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-family: var(--font-sans);
  font-size: var(--text-label);
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0;
  border-radius: var(--radius-md);
  padding: 12px 24px;
  cursor: pointer;
  transition: all 150ms ease;
  white-space: nowrap;
  text-decoration: none;
  outline: none;
}

.btn:focus-visible {
  box-shadow: 0 0 0 3px var(--color-focus-ring);
}

/* Primary */
.btn-primary {
  background: var(--color-accent);
  color: var(--color-text-on-accent);
  border: none;
}
.btn-primary:hover  { background: var(--color-accent-hover); }
.btn-primary:active { background: var(--color-accent-active); transform: scale(0.98); }

/* Secondary / Ghost */
.btn-secondary {
  background: transparent;
  color: var(--color-text-accent);
  border: 1px solid var(--color-border-accent);
}
.btn-secondary:hover  { background: var(--color-accent-subtle); }
.btn-secondary:active { transform: scale(0.98); }

/* Neutral */
.btn-neutral {
  background: var(--color-bg-muted);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-default);
}
.btn-neutral:hover  { background: var(--color-bg-subtle); border-color: var(--color-border-strong); }
.btn-neutral:active { transform: scale(0.98); }

/* Dark / Inverse: for use on light backgrounds */
.btn-dark {
  background: var(--color-text-primary);
  color: var(--color-bg-base);
  border: none;
}
.btn-dark:hover  { opacity: 0.85; }
.btn-dark:active { transform: scale(0.98); }

/* Sizes */
.btn-sm { font-size: 12px; padding: 8px 16px; }
.btn-lg { font-size: 15px; padding: 14px 32px; }

/* Disabled */
.btn:disabled,
.btn[aria-disabled="true"] {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}
```

### 7.2 Cards

```css
/* Standard card */
.card {
  background: var(--color-bg-base);
  border: var(--border-default) solid var(--color-border-default);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
}

/* Subtle card: sits on white, uses muted background */
.card-subtle {
  background: var(--color-bg-subtle);
  border: var(--border-thin) solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
}

/* Accent card: highlighted state (e.g. active DOME phase) */
.card-accent {
  background: var(--color-bg-accent);
  border: var(--border-default) solid var(--color-border-accent);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
}

/* Interactive card */
.card-interactive {
  cursor: pointer;
  transition: border-color 150ms ease, box-shadow 150ms ease;
}
.card-interactive:hover {
  border-color: var(--color-border-accent);
  box-shadow: var(--shadow-sm);
}
.card-interactive:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--color-focus-ring);
}
```

### 7.3 Badges & Pills

```css
.badge {
  display: inline-flex;
  align-items: center;
  font-size: var(--text-overline);
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: var(--radius-sm);
  line-height: 1;
  border: 0.5px solid transparent;
}

.badge-accent   { background: var(--color-bg-accent);       color: var(--color-text-accent);    border-color: var(--color-border-accent); }
.badge-dark     { background: var(--color-text-primary);    color: var(--color-bg-base);         }
.badge-neutral  { background: var(--color-bg-muted);        color: var(--color-text-secondary); border-color: var(--color-border-default); }
.badge-success  { background: var(--color-success-subtle);  color: var(--color-success);        border-color: var(--color-success-border); }
.badge-warning  { background: var(--color-warning-subtle);  color: var(--color-warning);        border-color: var(--color-warning-border); }
.badge-error    { background: var(--color-error-subtle);    color: var(--color-error);          border-color: var(--color-error-border); }

/* Pill: same variants, fully rounded */
.pill { border-radius: var(--radius-full); padding: 4px 12px; }
```

### 7.4 Inputs

```css
.input-label {
  display: block;
  font-size: var(--text-label);
  font-weight: 500;
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.input {
  display: block;
  width: 100%;
  font-family: var(--font-sans);
  font-size: var(--text-body-sm);
  font-weight: 400;
  color: var(--color-text-primary);
  background: var(--color-bg-base);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  padding: 10px 14px;
  line-height: 1.5;
  transition: border-color 150ms ease, box-shadow 150ms ease;
  outline: none;
  appearance: none;
}

.input::placeholder { color: var(--color-text-tertiary); }
.input:hover        { border-color: var(--color-border-strong); }
.input:focus        { border-color: var(--color-accent); box-shadow: 0 0 0 3px var(--color-focus-ring); }
.input:disabled     { opacity: 0.5; cursor: not-allowed; background: var(--color-bg-muted); }
.input.error        { border-color: var(--color-error); }
.input.error:focus  { box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15); }

.input-helper { font-size: var(--text-caption); color: var(--color-text-tertiary); margin-top: var(--space-1); }
.input-error  { font-size: var(--text-caption); color: var(--color-error);         margin-top: var(--space-1); }
```

### 7.5 Navigation (Website)

> v2.5: the bar is solid `#0070E0` on every page, transparent only at the very top of the home
> page, with white content and the current page underlined; see "Blue surface" in section 2.
> The neutral styles below are no longer used for the website bar; the product UIs still follow them.

```css
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-8);
  height: 64px;
  background: var(--color-bg-base);
  border-bottom: 0.5px solid var(--color-border-subtle);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-wordmark {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-text-primary);
  text-decoration: none;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.nav-link {
  font-size: var(--text-label);
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  transition: color 150ms ease, background 150ms ease;
  outline: none;
}
.nav-link:hover          { color: var(--color-text-primary); background: var(--color-bg-muted); }
.nav-link.active         { color: var(--color-text-accent); }
.nav-link:focus-visible  { box-shadow: 0 0 0 3px var(--color-focus-ring); }
```

### 7.6 Dividers

```css
.divider {
  border: none;
  border-top: 0.5px solid var(--color-border-subtle);
  margin: var(--space-8) 0;
}
.divider-strong {
  border-top: 1px solid var(--color-border-default);
}
```

### 7.7 DOME Method Phase Block

```css
.dome-phases {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-2);
}

.dome-phase {
  background: var(--color-bg-subtle);
  border: 0.5px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  padding: var(--space-6) var(--space-4);
  transition: border-color 150ms ease;
}

.dome-phase.active {
  background: var(--color-bg-accent);
  border-color: var(--color-border-accent);
}

.dome-phase-letter {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--color-text-accent);
  line-height: 1;
  margin-bottom: var(--space-1);
}

.dome-phase-name {
  font-size: var(--text-overline);
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-tertiary);
}

@media (max-width: 640px) {
  .dome-phases { grid-template-columns: repeat(2, 1fr); }
}
```

### 7.8 Modal

```css
/* Overlay */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-6);
  z-index: 200;
  backdrop-filter: blur(2px);
}

/* Modal panel */
.modal {
  background: var(--color-bg-base);
  border: 0.5px solid var(--color-border-default);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  width: 100%;
  max-width: 560px;
  max-height: calc(100vh - var(--space-12));
  overflow-y: auto;
  box-shadow: var(--shadow-xl);
}

.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: var(--space-6);
}

.modal-title {
  font-size: var(--text-h4);
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--color-text-primary);
}

.modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-md);
  border: none;
  background: transparent;
  color: var(--color-text-tertiary);
  cursor: pointer;
  transition: background 150ms ease, color 150ms ease;
  flex-shrink: 0;
}
.modal-close:hover { background: var(--color-bg-muted); color: var(--color-text-primary); }

.modal-body {
  font-size: var(--text-body-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: var(--space-8);
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-3);
}

/* Sizes */
.modal-sm { max-width: 400px; }
.modal-lg { max-width: 720px; }
```

### 7.9 Table

```css
.table-wrapper {
  width: 100%;
  overflow-x: auto;
  border: 0.5px solid var(--color-border-default);
  border-radius: var(--radius-lg);
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-body-sm);
}

/* Header */
.table thead {
  background: var(--color-bg-subtle);
  border-bottom: 1px solid var(--color-border-default);
}

.table th {
  padding: var(--space-3) var(--space-4);
  text-align: left;
  font-size: var(--text-overline);
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-tertiary);
  white-space: nowrap;
}

/* Sortable column header */
.table th.sortable {
  cursor: pointer;
  user-select: none;
  transition: color 150ms ease;
}
.table th.sortable:hover { color: var(--color-text-primary); }
.table th.sorted         { color: var(--color-text-accent); }

/* Body */
.table td {
  padding: var(--space-3) var(--space-4);
  color: var(--color-text-primary);
  border-bottom: 0.5px solid var(--color-border-subtle);
  vertical-align: middle;
}

.table tbody tr:last-child td { border-bottom: none; }

.table tbody tr:hover td { background: var(--color-bg-subtle); }

/* Numeric / mono column */
.table td.numeric {
  font-family: var(--font-mono);
  font-size: 12px;
  text-align: right;
  color: var(--color-text-secondary);
}

/* Dense variant */
.table-dense th,
.table-dense td { padding: var(--space-2) var(--space-3); }
```

### 7.10 Loading & Skeleton States

```css
/* Spinner */
.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-border-default);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 600ms linear infinite;
}
.spinner-sm { width: 14px; height: 14px; border-width: 1.5px; }
.spinner-lg { width: 32px; height: 32px; border-width: 3px; }

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Skeleton shimmer */
@keyframes shimmer {
  0%   { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}

.skeleton {
  border-radius: var(--radius-md);
  background: linear-gradient(
    90deg,
    var(--color-bg-muted) 25%,
    var(--color-bg-subtle) 50%,
    var(--color-bg-muted) 75%
  );
  background-size: 800px 100%;
  animation: shimmer 1.5s infinite linear;
}

/* Common skeleton shapes */
.skeleton-text  { height: 16px; width: 100%; margin-bottom: var(--space-2); }
.skeleton-title { height: 24px; width: 60%; margin-bottom: var(--space-4); }
.skeleton-card  { height: 120px; width: 100%; border-radius: var(--radius-lg); }
.skeleton-avatar { width: 40px; height: 40px; border-radius: 50%; }

/* Loading overlay: for async content within a bounded area */
.loading-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  padding: var(--space-16);
  color: var(--color-text-tertiary);
  font-size: var(--text-body-sm);
}
```

### 7.11 Tooltip

```css
/* Applied to the trigger element */
.tooltip-wrapper {
  position: relative;
  display: inline-flex;
}

.tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-bg-inverse);
  color: var(--color-text-on-inverse);
  font-size: var(--text-caption);
  font-weight: 400;
  line-height: 1.4;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  white-space: nowrap;
  max-width: 240px;
  white-space: normal;
  pointer-events: none;
  z-index: 300;
  box-shadow: var(--shadow-md);
  opacity: 0;
  transition: opacity 150ms ease;
}

.tooltip-wrapper:hover .tooltip,
.tooltip-wrapper:focus-within .tooltip { opacity: 1; }

/* Arrow */
.tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: var(--color-bg-inverse);
}

/* Position variants */
.tooltip-bottom {
  top: calc(100% + 8px);
  bottom: auto;
}
.tooltip-bottom::after {
  top: auto;
  bottom: 100%;
  border-top-color: transparent;
  border-bottom-color: var(--color-bg-inverse);
}
```

### 7.12 Empty State

```css
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--space-16) var(--space-8);
  color: var(--color-text-tertiary);
}

.empty-state-icon {
  width: var(--icon-2xl);   /* 48px */
  height: var(--icon-2xl);
  color: var(--color-text-tertiary);
  margin-bottom: var(--space-4);
  opacity: 0.6;
}

.empty-state-title {
  font-size: var(--text-h4);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
  letter-spacing: -0.01em;
}

.empty-state-description {
  font-size: var(--text-body-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
  max-width: 360px;
  margin-bottom: var(--space-6);
}
```

---

## 8. Motion & Animation

### Principles

- **Purposeful, not decorative.** Motion communicates state change: it never runs for its own sake.
- **Fast and precise.** Enterprise users are not here for spectacle. Animations are short.
- **Framer Motion** is the animation library. Consistent with the existing domelayer.com stack.

### Duration Tokens

```css
:root {
  --duration-instant:  50ms;    /* button press feedback */
  --duration-fast:     150ms;   /* hover states, micro-interactions */
  --duration-default:  250ms;   /* standard transitions */
  --duration-slow:     400ms;   /* page entrances, section reveals */
  --duration-crawl:    600ms;   /* complex orchestrated sequences */
}
```

> Maximum animation duration: 600ms. Never exceed this in any UI component.
> (v2.3: scroll-linked and pointer-linked motion in the home hero has no fixed duration, so the
> ceiling does not apply to it; see "Input-driven motion" below. Its timed parts still keep it.)

### Easing Tokens

```css
:root {
  --ease-default:  cubic-bezier(0.16, 1, 0.3, 1);    /* snappy entrance */
  --ease-out:      cubic-bezier(0, 0, 0.2, 1);        /* exits */
  --ease-in-out:   cubic-bezier(0.4, 0, 0.2, 1);      /* state transitions */
  --ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1); /* slight overshoot */
}
```

### Framer Motion Variants

```typescript
// Section entrance: triggered on scroll
export const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
}

// Staggered grid / list
export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
}

export const staggerItem = {
  hidden:  { opacity: 0, y: 16 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  }
}

// Fade: modals, overlays
export const fade = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } }
}

// Modal entrance
export const modalEntrance = {
  hidden:  { opacity: 0, scale: 0.97, y: 8 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
  }
}
```

### Input-driven motion: the home hero (v2.3)

The home hero on domelayer.com is the one place where motion leads instead of following a state
change: a generative particle scene that answers scroll and pointer. The exception covers that
component only, and only under the conditions below. Anything else that wants the same freedom needs
its own decision.

- **Two scenes, one breakpoint.** "The dome opens" at 768px and up: a dotted hemisphere, the DOME
  mark, that parts to the left and right on scroll. "Signal to record" below 768px: scattered raw
  particles that snap into a linked grid, the audit record. One engine; the switch is the hero's
  existing `md` breakpoint.
- **Driven by input, so no duration cap.** Scroll-linked and pointer-linked motion follows its input
  with an eased follow and has no fixed duration. Everything timed keeps the 600ms ceiling: the
  entrance is at most 600ms, and a scene swap across 768px fades in at most 250ms.
- **Ambient motion stays barely perceptible.** A drift of a few px per second and a slow twinkle on a
  minority of dots. Nothing loops visibly or pulls the eye away from the copy.
- **Scroll finishes inside the hero.** The split completes within the hero's own height. No pinning,
  no runway, no smooth scroll, no scroll hijack; the sections below keep their own motion.
- **Colour.** The accent family only: `#0080FF` and its steps for dots, glow and lines (graphics, as
  section 2 allows), and the tertiary grey for raw particles. The dark theme blends additively; the
  light theme blends normally, at a lower alpha, in the darker steps. Since v2.4 the scene sits on the
  hero surface: white governed dots, light-blue glow, darker raw specks, additive; one look in both
  themes since the surface is the same (v2.5); in the phone fade the dots cross over to the page
  palette above.
- **Glow is light on graphics, not a gradient on a surface.** Soft halos around accent dots are
  allowed. They never sit behind text, icons or buttons: particles dim inside a zone measured around
  the copy, and the theme scrims stay. Text keeps 4.5:1 in both themes.
- **Touch.** No hover effects on touch layouts (tablet and phone); a tap sends a short pulse. Below
  `md` the hero keeps a band under the buttons for the scene, and its scrim runs top to bottom.
- **Reduced motion and Save-Data.** One still frame per scene, an SVG in the prerendered HTML. No
  animation loop and no listeners.
- **Cost.** Canvas 2D without a library (framer-motion stays the library for everything else). The
  loop pauses when the hero is off screen or the tab is hidden; device pixel ratio is capped at 2;
  glow comes from pre-rendered sprites, never `shadowBlur`.

### Reduced Motion

Always respect user preference:

```typescript
import { useReducedMotion } from 'framer-motion'

const prefersReduced = useReducedMotion()
const variants = prefersReduced ? {} : fadeUp
```

---

## 9. Theme System

### Default Behaviour

- **Everything defaults to light theme**: website and all products.
- Dark theme is available via toggle on all surfaces.
- User preference is saved to `localStorage` under the key `dome-theme`.
- On load, saved preference takes priority. If none exists, system OS preference is respected.

### Implementation

```typescript
// theme.ts: shared utility across all DOME projects

type Theme = 'light' | 'dark'

export const getTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light'
  const saved = localStorage.getItem('dome-theme') as Theme | null
  if (saved) return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const setTheme = (theme: Theme): void => {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('dome-theme', theme)
}

export const toggleTheme = (): Theme => {
  const current = document.documentElement.getAttribute('data-theme') as Theme
  const next: Theme = current === 'dark' ? 'light' : 'dark'
  setTheme(next)
  return next
}

// Call on app initialisation: before first render to avoid flash
export const initTheme = (): void => {
  setTheme(getTheme())
}
```

```typescript
// In your React root / _app.tsx: call before render
import { initTheme } from './theme'
initTheme()
```

### Theme Toggle Component (React)

```tsx
import { Sun, Moon } from 'lucide-react'
import { toggleTheme, getTheme } from './theme'
import { useState } from 'react'

export const ThemeToggle = () => {
  const [theme, setTheme] = useState(getTheme)

  const handleToggle = () => {
    const next = toggleTheme()
    setTheme(next)
  }

  return (
    <button
      onClick={handleToggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 36,
        height: 36,
        borderRadius: 'var(--radius-md)',
        border: '0.5px solid var(--color-border-default)',
        background: 'transparent',
        color: 'var(--color-text-secondary)',
        cursor: 'pointer',
        transition: 'background 150ms ease, color 150ms ease',
      }}
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
```

### Dark Theme Design Reference

| Element | Light | Dark |
|---|---|---|
| Page background | `#FFFFFF` | `#0A0A0A` |
| Surface / cards | `#FAFAFA` | `#111111` |
| Elevated surface | `#F5F5F5` | `#1A1A1A` |
| Accent | `#0070E0` (button bg) / `#0066CC` (text) | `#0070E0` (button bg) / `#40A8FF` (text); logo `#0080FF` in both |
| Text primary | `#0A0A0A` | `#F5F5F5` |
| Text secondary | `#525252` | `#A3A3A3` |
| Borders | `#E8E8E8` | `#262626` |
| Hero wordmark | `#0A0A0A` | `#F5F5F5` |

---

## 10. Tailwind CSS v4 Configuration

domelayer.com uses Tailwind CSS v4. All tokens are defined in the `@theme` block within the global CSS entry file.

### `app.css`

```css
@import "tailwindcss";
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

@theme {
  /* Fonts */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace;

  /* Accent colour ramp */
  --color-accent-50:   #E8F3FF;
  --color-accent-100:  #C5DFFF;
  --color-accent-200:  #99CCFF;
  --color-accent-300:  #66B3FF;
  --color-accent-400:  #40A8FF;
  --color-accent-500:  #0080FF;
  --color-accent-550:  #0070E0;
  --color-accent-600:  #0066CC;
  --color-accent-700:  #004D99;
  --color-accent-800:  #003366;
  --color-accent-900:  #001A33;

  /* Neutral ramp */
  --color-grey-50:   #FAFAFA;
  --color-grey-100:  #F5F5F5;
  --color-grey-200:  #E8E8E8;
  --color-grey-300:  #D4D4D4;
  --color-grey-400:  #A3A3A3;
  --color-grey-500:  #737373;
  --color-grey-600:  #525252;
  --color-grey-700:  #404040;
  --color-grey-800:  #262626;
  --color-grey-900:  #171717;
  --color-grey-950:  #0D0D0D;

  /* Border radius */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  --radius-full: 9999px;

  /* Spacing */
  --spacing-1:  4px;
  --spacing-2:  8px;
  --spacing-3:  12px;
  --spacing-4:  16px;
  --spacing-5:  20px;
  --spacing-6:  24px;
  --spacing-8:  32px;
  --spacing-10: 40px;
  --spacing-12: 48px;
  --spacing-16: 64px;
  --spacing-20: 80px;
  --spacing-24: 96px;
  --spacing-32: 128px;
  --spacing-40: 160px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04);
  --shadow-lg: 0 12px 32px rgba(0,0,0,0.10), 0 4px 8px rgba(0,0,0,0.04);
  --shadow-xl: 0 24px 48px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.06);

  /* Content widths */
  --width-content: 1200px;
  --width-narrow:  720px;
  --width-wide:    1400px;
}

/* Semantic tokens: applied via data-theme */
@layer base {
  :root {
    --color-bg-base:          #FFFFFF;
    --color-bg-subtle:        #FAFAFA;
    --color-bg-muted:         #F5F5F5;
    --color-bg-accent:        #E8F3FF;
    --color-bg-accent-hover:  #C5DFFF;
    --color-bg-inverse:       #0A0A0A;
    --color-text-primary:     #0A0A0A;
    --color-text-secondary:   #525252;
    --color-text-tertiary:    #6E6E6E;
    --color-text-accent:      #0066CC;
    --color-text-on-accent:   #FFFFFF;
    --color-text-on-inverse:  #F5F5F5;
    --color-border-subtle:    #F0F0F0;
    --color-border-default:   #E8E8E8;
    --color-border-strong:    #D4D4D4;
    --color-border-accent:    #99CCFF;
    --color-accent:           #0070E0;
    --color-accent-hover:     #0066CC;
    --color-accent-active:    #004D99;
    --color-accent-subtle:    #E8F3FF;
    --color-focus-ring:       rgba(0, 128, 255, 0.25);
    --color-success:          #16A34A;
    --color-success-subtle:   #F0FDF4;
    --color-success-border:   #86EFAC;
    --color-warning:          #D97706;
    --color-warning-subtle:   #FFFBEB;
    --color-warning-border:   #FCD34D;
    --color-error:            #DC2626;
    --color-error-subtle:     #FEF2F2;
    --color-error-border:     #FCA5A5;
  }

  [data-theme="dark"] {
    --color-bg-base:          #0A0A0A;
    --color-bg-subtle:        #111111;
    --color-bg-muted:         #1A1A1A;
    --color-bg-accent:        #001A33;
    --color-bg-accent-hover:  #003366;
    --color-bg-inverse:       #F5F5F5;
    --color-text-primary:     #F5F5F5;
    --color-text-secondary:   #A3A3A3;
    --color-text-tertiary:    #858585;
    --color-text-accent:      #40A8FF;
    --color-text-on-accent:   #FFFFFF;
    --color-text-on-inverse:  #0A0A0A;
    --color-border-subtle:    #1A1A1A;
    --color-border-default:   #262626;
    --color-border-strong:    #404040;
    --color-border-accent:    #004D99;
    --color-accent:           #0070E0;
    --color-accent-hover:     #0066CC;
    --color-accent-active:    #004D99;
    --color-accent-subtle:    #001A33;
    --color-focus-ring:       rgba(64, 168, 255, 0.3);
    --color-success:          #22C55E;
    --color-success-subtle:   #052E16;
    --color-success-border:   #166534;
    --color-warning:          #F59E0B;
    --color-warning-subtle:   #1C1400;
    --color-warning-border:   #854D0E;
    --color-error:            #EF4444;
    --color-error-subtle:     #1F0000;
    --color-error-border:     #7F1D1D;
  }

  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: var(--font-sans);
    background: var(--color-bg-base);
    color: var(--color-text-primary);
  }

  :focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--color-focus-ring);
  }
}
```

---

## 11. Copywriting Guidelines

### Voice & Tone

DOME speaks with calm authority. The brand does not sell: it informs. Every sentence must pass the "board memo test": would this read credibly in a document sent to a CFO or procurement director at a regulated enterprise?

### Core Principles

**Precise over verbose.** Every word earns its place. If a sentence can be cut without losing meaning, cut it.

**Active over passive.** "We engineer governance into architecture" is stronger than "Governance is engineered into the architecture."

**Concrete over abstract.** "Deployed in 8 weeks with zero enterprise system access required" beats "Rapid, frictionless deployment."

**Confident, not arrogant.** State what DOME does without hedging. Avoid superlatives: they signal insecurity.

**Third person for the company** in formal documents ("Dome designs..."). First person plural acceptable on the website ("We treat AI as operational infrastructure").

### Vocabulary

**Use freely:**
Design · Engineer · Deploy · Govern · Integrate · Align · Operate · Structure · Architect · Define · Deliver · Execute

**Use sparingly (only when precise):**
Strategy · Framework · Programme · System · Infrastructure · Architecture · Governance

**Never use:**
Revolutionary · Cutting-edge · Game-changing · Seamless · Leverage · Synergy · Unlock · Disrupt · Empower · Transform · Supercharge · AI-powered (as a standalone claim)

### Headline Patterns

1. **Declarative + precise:** "Governance-Driven Operational AI." "Architected for production from day one."
2. **Problem + position:** "Enterprise AI fails at the architecture layer. We fix that."
3. **What we do, plainly stated:** "We design AI systems for regulated enterprises."

### Copy by Element

| Element | Rule |
|---|---|
| Hero headline | One idea, under 10 words, no sub-clause, no question mark |
| Tagline / subhead | One sentence, max 20 words, expands on headline without restating it |
| Body paragraph | 2 to 3 sentences, active voice, no bullet points in first screen |
| Button / CTA | Verb-first, specific, sentence case: "Book an automation review" not "Get started" |
| Nav labels | Nouns: "Services" "DOME" "Case studies" "About" "Contact" |
| Error messages | Plain and helpful. Never apologetic, never technical to the user |
| Empty states | "No [items] yet" + one-line instruction + optional CTA |

### Numbers & Formatting

- Spell out one through nine; numerals for 10 and above
- Percentages always as numerals: 12%, not twelve percent
- No em dashes or en dashes in copy (v2.1). Use a comma, a full stop, a colon or parentheses, or restructure the sentence. Hyphens in compound words are fine.
- Sentence case for all headings and UI labels
- Brand name: **DOME** in wordmarks and headlines; **Dome** in body copy

### What DOME Is Not

Never describe DOME as: a chatbot company · a no-code platform · a startup · an AI product for sale

DOME is the company; its tools are capability proof. AI process automation is a legitimate service line of the company (v2.1), so the rule is about how DOME itself is framed, not about the word "automation".

---

## 12. Migration Guide

This section documents how to migrate from the original domelayer.com design system to v2.0.

### Token Rename Map

Run a find-and-replace across all projects using this table. Replace old token names with new ones.

| Old token | New token |
|---|---|
| `--bg-primary` | `--color-bg-base` |
| `--bg-secondary` | `--color-bg-subtle` |
| `--bg-tertiary` | `--color-bg-muted` |
| `--text-primary` | `--color-text-primary` |
| `--text-secondary` | `--color-text-secondary` |
| `--text-muted` | `--color-text-tertiary` |
| `--accent-cyan` | `--color-accent` |
| `--accent-purple` | *(remove: no equivalent. Remove decorative uses.)* |
| `--accent-blue` | `--color-accent` |
| `--accent-lightblue` | `--color-accent-hover` |
| `--border-default` | `--color-border-default` |

### Visual Changes Checklist (domelayer.com)

Apply in this order to avoid compounding issues:

- [ ] **1. Swap Google Fonts import**: replace Space Grotesk + Outfit + JetBrains Mono with Inter + JetBrains Mono (code only)
- [ ] **2. Update CSS custom properties**: replace old tokens with new semantic tokens in all stylesheets
- [ ] **3. Remove hero gradient**: replace gradient text on hero headline with solid `--color-text-on-inverse` (white on dark)
- [ ] **4. Update accent colour**: replace all instances of `#5B9CB5` (old cyan) and `#9A00FF` / `#006BDF` (old purple/blue) with `#0080FF`
- [ ] **5. Update border radius**: replace `border-radius: 4px` on buttons with `var(--radius-md)` (8px), on cards with `var(--radius-lg)` (12px)
- [ ] **6. Update button typography**: remove `font-family: JetBrains Mono`, `text-transform: uppercase`, `letter-spacing: 1.4px` from buttons. Apply Inter 600, sentence case
- [ ] **7. Update nav link typography**: same as buttons: remove mono font and uppercase, apply Inter 500 sentence case
- [ ] **8. Update background colours**: old `#0C0C0E` → `#0A0A0A`, `#161619` → `#111111`, `#1C1C20` → `#1A1A1A`
- [ ] **9. Add theme toggle**: implement `ThemeToggle` component and `initTheme()` call in app root
- [ ] **10. Add focus ring**: verify `:focus-visible` styles are applied globally via the base layer

### Product Migration Sequence

1. domelayer.com (website)
2. Dome Process Analyzer
3. Dome Document Intelligence
4. Dome Morning Intelligence
5. Dome Governance Dashboard

Each product uses the same `app.css` token definitions. Copy the Tailwind v4 config block from Section 10 into each product's global CSS entry file.

---

## 13. Usage Rules & Anti-patterns

### Do

- Use `--color-accent` for one primary action per screen
- Default every surface to light theme; provide dark via toggle
- Use sentence case for all copy: headings, buttons, nav, labels
- Use `var(--radius-md)` (8px) on buttons and inputs, `var(--radius-lg)` (12px) on cards
- Apply `--color-focus-ring` to every interactive element
- Use Lucide Icons at the defined sizes with stroke `1.5`
- Keep the DOME wordmark in all-caps at all times
- Use the eyebrow + headline pattern for every major section
- Import Inter at weights 400, 500, 600, 700 only

### Do Not

- Do not use more than one accent colour in any view: the electric blue family only
- Do not add decorative gradients to backgrounds, text, icons or decorative elements (functional media fades are the one exception, see section 14)
- Do not use border radius above `--radius-xl` (16px)
- Do not use JetBrains Mono for anything other than `<code>` elements
- Do not use `text-transform: uppercase` outside eyebrows, overlines, and badges
- Do not use font weight 300: minimum is 400
- Do not place two primary buttons side by side
- Do not use drop shadows on flat page surfaces: only floating elements
- Do not use status colours (success/warning/error) for brand decoration
- Do not exceed 600ms for any animation duration
- Do not hardcode hex values in component styles: always reference semantic tokens
- Do not use the old token names (`--bg-primary`, `--accent-cyan`, etc.) in any new code

---

## 14. Imagery and Media (v2.1)

*Added 2026-09-15 for the domelayer.com restructure (DOME_DECISIONS 2026-09-15). Applies to the website; products may adopt it later.*

### Principles

**Image-led, not image-boxed.** Photography, illustration and video carry sections edge to edge, or bleed off one side beside text, instead of sitting inside bordered cards. Cards remain for structured content (case-study lists, tool cards).

**Theme-safe by construction.** Every overlay, scrim and fade is a semantic token with light and dark values, keyed on `[data-theme]` so it follows the manual toggle, not only `prefers-color-scheme`. Text over media must meet WCAG 2.1 AA in both themes.

**Media never carries meaning alone.** Background video and decorative imagery are `aria-hidden`. Headlines and copy carry the message.

### Tokens

```css
:root {
  --color-scrim:        rgba(255, 255, 255, 0.72); /* text over media, light */
  --color-scrim-strong: rgba(255, 255, 255, 0.88); /* small text or busy media */
  --color-media-fade:   #FFFFFF;                   /* fade target = --color-bg-base */
}

[data-theme="dark"] {
  --color-scrim:        rgba(10, 10, 10, 0.64);
  --color-scrim-strong: rgba(10, 10, 10, 0.84);
  --color-media-fade:   #0A0A0A;
}
```

### Functional fades (the one gradient exception)

A single fade from media into `--color-media-fade`, applied with `mask-image` or an overlay, so an image dissolves into the page background of the current theme. Allowed only on media, only towards the theme background, only one direction per edge. Never on text, icons, buttons or plain surfaces, and never multi-colour.

### Components (website)

| Component | Use |
|---|---|
| `HeroMedia` | Background video (or image) behind the hero, scrim token, poster frame |
| `FullBleedSection` | Section with background media, scrim, content on top |
| `MediaSplit` | Media bleeding off one edge beside text, fading into the page |
| `ImageBand` | Full-width media strip between sections |

### Hero video

- `autoplay muted loop playsinline`, self-hosted WebM plus MP4, **target under about 4 MB**. Weight is the constraint, not duration: a longer clip is fine as long as it stays inside that budget. *(v2.1 originally also said 20 seconds or less. The home hero video is 30 s at 1.1 MB WebM and 2.1 MB MP4, comfortably inside budget, so the fixed duration limit was dropped rather than the video trimmed. Relaxed 2026-09-22.)*
- A `poster` frame is the LCP image. Show the poster only when `prefers-reduced-motion: reduce` or Save-Data is set.
- Pause when off-screen. No audio track.
- *(v2.3)* The home hero no longer plays the video: it runs the generative scene in section 8. The
  video files stay in the media manifest, unused, so going back is a one-line revert.

### Delivery and accessibility

- Responsive `srcset` in **AVIF with a JPEG fallback**, with explicit `width` and `height` (no layout shift). `loading="lazy"` below the fold, `fetchpriority="high"` on the hero poster. *(v2.1 originally said WebP. The encoder used for the site's media has no WebP support, and AVIF plus JPEG already covers every browser we support, so JPEG is the fallback. Corrected 2026-09-22, when the media landed.)*
- Alt text is written per locale (English and Italian) for every meaningful image; decorative media uses empty alt.
- Where a single image cannot read well in both themes, swap light and dark variants with `[data-theme]` CSS, not `<picture media>`.
- **Inverting beats brightening for dark source media.** The home hero footage is near-black. Lifting its blacks for the light theme produces flat grey and amplifies banding, and a white scrim over black reads as muddy. `filter: invert(1)` in the light theme instead yields a genuinely light frame that keeps the original's structure and contrast, costs no extra asset or bandwidth, and follows the manual toggle instantly. Prefer it to shipping a second, brightened encode. *(Added 2026-09-22.)*

### Sourcing and labelling

Every asset is listed in the website's media manifest, `src/content/media.ts`, with file, intrinsic size, source type (own, licensed stock, AI-generated, tool screenshot) and licence or AI flag. Alt text is keyed by the same media id in the per-locale message catalogues, so a missing translation fails `tsc`. A test checks the manifest against the files on disk, against CREDITS.md and against both catalogues, so none of the three can drift. Licences and provenance are recorded publicly in `public/media/CREDITS.md`, which the legal notice points at: AI-generated imagery carries a visible label on the page, and the decorative textures, which carry no on-page label, are disclosed there instead. That file is an attribution record for visitors, not an engineering one, and a localised `/credits` page rendered from the manifest supersedes it when the pages are rebuilt. Tool screenshots are captured in both themes.

---

*DOME Design System v2.0: domelayer.com*
*Maintained by Francesco Prodomo*
*Supersedes: DOME_Design_System_v1.0.md and original extracted system*
