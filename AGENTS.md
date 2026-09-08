# AGENTS.md

## Deployment workflow

We maintain three repositories with a linear promotion flow:

- **website**: main development repository; deployed to **website.wopee.io** for testing purposes **(should not be indexed)**.
- **website-prod**: fork of `website`, kept in sync and deployed to **wopee.io**.
- **website-testing**: fork of `website`, used for testing after development, before production; deployed for testing purposes **(should not be indexed)**.

### How we work

1. Develop on a new branch in `website`.
2. Test locally on that branch.
3. If OK, sync to `website-testing` branch and test further.
4. If OK, sync to `website-prod` branch and test further.

If a change does not require thorough testing, sync/deploy to both forks at once.

## Styling gotchas (Docusaurus + Infima)

Non-obvious dependency behaviour that repeatedly bites when styling custom components. None of this is visible from our own code, it comes from Infima (Docusaurus's CSS framework) and the Docusaurus runtime.

- **Infima restyles bare `<button>` and `<a>`.** It applies an `outset` bevel border and `--ifm-color-primary` (brand yellow/purple) text/border to plain buttons and links, overriding Tailwind via specificity. For a custom-styled clickable, render a **`<div role="button" tabIndex={0}>`** (with an `onKeyDown` Enter/Space handler) instead of `<button>`, it sidesteps the Infima selector entirely. Same applies to OAuth/scenario "buttons".
- **Don't reuse the navbar button ids.** `#login-button` and `#navbar-button` have styled rules in `src/css/custom.css`. Putting either id on another component inherits those rules, and **id specificity (0,1,0,0) beats any class**, so Tailwind/`!important` won't win. (This silently re-yellowed modal OAuth buttons until the id was removed.)
- **Docusaurus drops `className` on `type: "dropdown"` navbar items.** A className set on a dropdown entry in `docusaurus.config.js` does not reach the DOM. To hide/style the dropdown, target it structurally, e.g. `body.is-home .theme-layout-navbar-left .navbar__item.dropdown`.
- **No per-route body class out of the box.** Pages under `src/pages/*` share the same body classes. To scope CSS to one page (e.g. hide nav links only on `/`), set a body class via Helmet inside the page's `<Head>`: `<body className="is-home" />`, then target `body.is-home …` in `custom.css`. (A `useEffect` toggling `document.body.classList` is unreliable across HMR/route changes, use Helmet.)
- **Tailwind preflight is off, so `border` alone draws nothing.** Preflight normally sets `border-style: solid` on every element; without it `border border-gray-300` sets a width with no style. Always pair `border` with `border-solid` (or `border-t` with `border-solid`).
- **Swizzled theme components and `themeConfig` edits need a dev-server restart.** `@theme/*` aliases and the config are resolved when `docusaurus start` boots; adding `src/theme/Footer/index.tsx` or editing `docusaurus.config.js` while the server runs keeps serving the old component with no warning.
- **Never run `docusaurus build` while `docusaurus start` is serving the same checkout.** Both write `.docusaurus/`; the build regenerates `client-modules.js` with the production-only gtag module, the running dev server hot-reloads it without the gtag script, and every client-side navigation then throws `window.gtag is not a function`. Stop the dev server first, or restart it after the build.
- **Dark mode is `[data-theme="dark"]`, not `prefers-color-scheme`.** Tailwind's `dark:` variant is wired to it, but any raw CSS override in `custom.css` (keyframes, filters, disabled-state opacity, etc.) must be themed explicitly with a `[data-theme="dark"]` selector, a single color/animation will look broken in one of the two themes.
