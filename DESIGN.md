---
version: alpha
name: Wopee.io
description: >-
  Brand and design rules for Wopee.io, AI testing agents for web apps.
  The source of truth for people and AI agents making web pages, slides,
  social posts, documents and merchandise. The format follows DESIGN.md
  (github.com/google-labs-code/design.md). The format has no themes, so
  light and dark values are separate tokens with -light and -dark suffixes.
colors:
  primary: "#FFCC00"
  ink: "#111827"
  secondary: "#7030A0"
  white: "#FFFFFF"
  purple-300: "#B98AE0"
  surface-light: "#FFFFFF"
  surface-dark: "#111827"
  text-light: "#111827"
  text-dark: "#FFFFFF"
  text-muted-light: "#4B5563"
  text-muted-dark: "#D1D5DB"
  border-light: "#E5E7EB"
  link-light: "#7030A0"
  link-dark: "#FFCC00"
typography:
  display:
    fontFamily: Rubik
    fontSize: 64px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: -0.025em
  h2:
    fontFamily: Rubik
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.1
  h3:
    fontFamily: Rubik
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: Rubik
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: Rubik
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.15em
  button:
    fontFamily: Rubik
    fontSize: 16px
    fontWeight: 700
    lineHeight: 1
rounded:
  sm: 6px
  md: 8px
  lg: 16px
  pill: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  xxl: 64px
  slide-margin: 96px
components:
  button-primary-light:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 12px
  button-primary-dark:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 12px
  button-secondary-light:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
  button-secondary-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
  toggle-active-light:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
  toggle-active-dark:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.white}"
    rounded: "{rounded.sm}"
  marker-light:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.ink}"
  card-light:
    backgroundColor: "{colors.surface-light}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
  card-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.white}"
    rounded: "{rounded.lg}"
  slide-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.white}"
  slide-white:
    backgroundColor: "{colors.surface-light}"
    textColor: "{colors.ink}"
  slide-yellow:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.ink}"
  text-light:
    backgroundColor: "{colors.surface-light}"
    textColor: "{colors.text-light}"
    typography: "{typography.body}"
  text-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.text-dark}"
    typography: "{typography.body}"
  caption-light:
    backgroundColor: "{colors.surface-light}"
    textColor: "{colors.text-muted-light}"
  caption-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.text-muted-dark}"
  link-light:
    backgroundColor: "{colors.surface-light}"
    textColor: "{colors.link-light}"
  link-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.link-dark}"
  divider-light:
    backgroundColor: "{colors.border-light}"
    height: 1px
  commander-accent-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.purple-300}"
---

# Wopee.io design system

Last updated 2026-11-06. The human version of these rules is
https://wopee.io/brand/. This file and that page say the same thing. If
they ever differ, this file wins, so report the difference to
marcel.veselka@wopee.io.

## Overview

Wopee.io sells AI testing agents to engineering leaders, QA leads and
buyers at large and regulated companies. The brand must read as
competent and calm first, with one confident accent.

- **Yellow (#FFCC00) is the brand colour.** No competitor uses it. Every
  surface carries some yellow, and on each surface it has one or two clear
  roles (the key phrase, the primary button, a flat field).
- **Ink (#111827)** is used for text, the wordmark on light and yellow
  grounds, and dark grounds.
- **Purple (#7030A0)** gives atmosphere and links. It is the background
  glow, links on light, the cap, the dark-theme toggle and Commander. On
  light grounds purple never sits next to yellow as an equal accent.
- **Two typefaces:** Bungee for the W only, and Rubik for everything else.
- **The logo is always one colour.** Colour belongs to the symbol, not to
  the wordmark.

## Colors

| Role | Light theme | Dark theme |
|---|---|---|
| Page ground | white | #111827 |
| Hero background | white, 40 px grid, one central purple glow | #111827, grid, purple and pink glow |
| Text | ink | white |
| Wordmark | ink, one colour | white, one colour |
| Key phrase in a headline | ink text on a yellow marker | yellow text |
| Primary button | yellow, ink text | yellow, ink text |
| Active toggle segment | white with a hairline, ink text | purple, white text |
| Hero form frame | 1 px ink hairline at 10 % and a soft shadow | purple-to-yellow gradient frame |
| Links | purple | yellow |

**Contrast (WCAG 2):**

- Passing pairs: ink on yellow 11.7:1, ink on white 17.7:1, yellow on
  ink 11.7:1, white on purple 8.0:1, purple on white 8.0:1, yellow on
  purple 5.3:1, and purple-300 on ink 6.6:1.
- Failing pairs: yellow on white is 1.5:1 and purple on ink is 2.2:1.
  Never use yellow text, thin yellow lines or yellow icons on white. On
  light grounds yellow is always a filled area with ink on top.

**Utility colours:** black #000000 for one-colour print only, and
yellow-800 #7A5C00 for the Build & Break title shadow only.

**Light hero background:**

- White with a 40 px grid of ink at 4.5 %.
- One purple glow sits behind the headline and subtitle:
  `radial-gradient(ellipse 620px 360px at 50% 30%, rgba(112,48,160,.13) 0%, rgba(112,48,160,.05) 55%, transparent 100%)`.
- The glow covers less than half of the first screen and never reaches
  the edges. There is no blue tint, no pink and no vignette.

**Dark hero background:**

- A #111827 base with a purple glow at 15 % / 75 % (32 %) and a pink glow
  at 85 % / 25 % (12 %).
- A 15 % vignette and a 40 px grid of grey at 8 %.
- The dark theme is deliberately more playful than the light one.

## Typography

- **Rubik** is used for all text. Headings use weight 700 with tight
  tracking, and letters must not touch. Body text uses weight 400.
- **Bungee** is used for the W of the logo only. The logo files are
  outlined, so no font is needed to use them. In display headings, the
  site's `WopeeIo` component may set the name with the Bungee W. Never
  set a whole word in Bungee, and never let the browser synthesise bold.
- Sizes: display 64 (40 on mobile), h2 40, h3 24, body 18 and label 12
  (uppercase, tracked).
- **Key phrase:** one per screen or slide, usually the second line of the
  headline ("for Web Apps").
  - On light grounds it is ink text on a yellow marker band from 58 % to
    92 % of the line height, with 0.1 em side padding. In left-aligned
    headlines pull it back by 0.1 em so the text keeps the left edge.
  - On dark grounds it is yellow text.
  - On yellow grounds there is no marker.

## Layout

- Content is at most 1280 px wide, with 24 px gutters on mobile.
- Spacing follows the scale 4, 8, 16, 24, 40 and 64.
- The homepage hero is centred: a badge, a two-line headline, one
  sentence, then the action card and the video.
- Slides are 16:9 with a 96 px margin. The logo sits top left. The
  headline is set left, with a 72 × 8 px bar 30 px above it.

## Elevation & Depth

- **Light theme cards:** white, with a 1 px ink hairline at 10 % and a
  soft purple-tinted shadow `0 24px 50px rgba(76,29,149,.14)`.
- **Dark theme cards:** the hero form gets the purple-to-yellow gradient
  frame and a deep purple shadow. Gradient frames are a dark-theme
  device only.

## Shapes

- Corners are rounded: 8 px for buttons and inputs, 16 px for cards. The
  symbol tile's corner radius is 22 % of its side.
- The tile, the dots in the logo and the slide bar share the same
  rounded-rectangle language.

## Components

- **Primary button:** yellow with ink text, in both themes. Use one
  primary action per view; the navbar "Start for free" is the same
  action. "Log in" is a neutral outline (ink on light, yellow on dark).
- **Segmented toggle (for example "Your app / Demo app"):** the active
  segment is white with a hairline on light and purple on dark.
- **Marker:** use it for headlines only, never in body text and never on
  the logo.

## Logo

**Wordmark "Wopee.io"** (Bungee W followed by "opee.io" in Rubik
ExtraBold, W at cap height):

- It is always one colour: ink on white or yellow, and white on ink,
  purple or photos.
- Never colour the W or the dot. Never put the W in a tile inside the
  wordmark.
- Write the name as "Wopee.io", never Wopee, WOPEE or Wopee IO. Use
  lowercase only in URLs and code.

**Symbol:**

- A yellow tile with an ink W. Use it for favicons, app icons, avatars,
  the cap and stickers.
- Below 32 px use the dedicated 16 px drawing (`/img/favicon-16.svg`).

**Products:**

- Commander and MCP use the wordmark plus the product name, in one
  colour.
- The product colour lives only in its symbol tile: purple for Commander,
  ink for MCP.

**Clear space and minimum size:**

- Clear space is the height of the "o" on every side.
- The wordmark must be at least 80 px wide on screen or 20 mm in print.
  The symbol must be at least 24 px on screen or 6 mm in print.

| Situation | File | Ground |
|---|---|---|
| Website header and footer, light | https://wopee.io/brand/svg/wopee-wordmark-mono-ink.svg | white |
| Website header and footer, dark | https://wopee.io/brand/svg/wopee-wordmark-mono-white.svg | #111827 |
| On yellow (slides, booth, roll-up) | https://wopee.io/brand/svg/wopee-wordmark-mono-ink.svg | #FFCC00 |
| On purple or a photo | https://wopee.io/brand/svg/wopee-wordmark-mono-white.svg | #7030A0 or a dark photo |
| Favicon, avatar, app icon | https://wopee.io/brand/svg/wopee-symbol-color-light.svg | any |
| Symbol on a yellow ground | https://wopee.io/brand/svg/wopee-symbol-on-yellow.svg | #FFCC00 |
| Commander | https://wopee.io/brand/svg/wopee-wordmark-commander-mono-ink.svg (light), -mono-white.svg (dark) | |
| MCP | https://wopee.io/brand/svg/wopee-wordmark-mcp-mono-ink.svg (light), -mono-white.svg (dark) | |
| Booth, end cards, merch (monkey and logo) | https://wopee.io/brand/svg/wopee-logo-stacked-color-light.svg, -dark.svg | white or yellow, dark |

PNG versions are at the same path with `/brand/png/` and `@2x.png`.
Everything is also in https://wopee.io/brand/wopee-brand-kit-2026.zip.

## Surfaces

- **Website:** use the light and dark rules in Colors and Components.
  The light theme is calm: white, a grid, one central glow, the marker
  and a yellow button. The dark theme is more playful: the purple and
  pink glow, the gradient form frame and the purple toggle.
- **LinkedIn image (1200 × 627):** there are two forms. Use one headline
  and no button in the image, and keep the logo top left.
  - Default, dark: the dark hero background, white wordmark, a white
    headline with a yellow key phrase. Example:
    https://wopee.io/brand/examples/linkedin-dark.png
  - Alternative, light: white, ink wordmark, an ink headline with a yellow
    marker on the key phrase. Example:
    https://wopee.io/brand/examples/linkedin-light.png
- **Slides (16:9):** there are three forms. Mix them within one deck to
  pace it. Each puts the 72 × 8 px bar above the headline. Yellow is
  always flat, never a gradient.
  - Dark: the default cover and formal meetings. The bar is yellow.
    Example: https://wopee.io/brand/examples/slide-dark.png
  - White with the marker: content slides, documents and PDFs. The bar is
    ink. Example: https://wopee.io/brand/examples/slide-white.png
  - Yellow field: section openers and big moments. The bar is ink and
    there is no marker. Example:
    https://wopee.io/brand/examples/slide-yellow.png
- **Merchandise:** a purple cap with the symbol as a woven patch. This is
  the one place where purple leads.
- **Booth and roll-up:** a full yellow wall with the ink wordmark, an ink
  headline and the monkey.

## Mascot

- The monkey is the brand's character, not its logo. Use it on social
  avatars, stickers, video end cards, the email sign-off, 404 pages,
  empty states and event booths.
- It wears a purple cap carrying the symbol (yellow tile, ink W), the same
  patch as the staff caps.
- Place it on white or yellow. On dark or purple grounds, place it on its
  yellow disc.
- Never use it in place of the logo or inside it, in a customer logo row
  or on a customer quote. Never redraw, recolour or crop it.

## Do's and Don'ts

- Do give every surface some yellow: the key phrase, the primary button
  or a flat yellow field.
- Do keep the wordmark one colour: ink on light and yellow, white on dark
  and purple.
- Do use the symbol where colour is needed in a small space.
- Don't recolour parts of the wordmark, add a marker or a shadow to it,
  or put the W in a tile in front of "opee.io".
- Don't use yellow text, thin yellow lines or yellow icons on white.
- Don't place a purple button or toggle next to a yellow button on light
  grounds.
- Don't use gradient frames, blue tints or vignettes on light grounds,
  and don't use gradients on yellow.
- Don't use typefaces other than Rubik, or Bungee outside the W.
- Don't stretch, rotate or outline the logo, or use the light file on a
  dark ground.
