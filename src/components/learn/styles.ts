// One look for every /learn page, on the site's neutral dark page (#1b1b1d):
// translucent white surfaces and hairlines, never Tailwind's navy grays.

export const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-wopee dark:focus-visible:outline-primary-wopee";

/** Card or panel surface. */
export const surface =
  "border border-solid border-gray-200 bg-white dark:border-white/10 dark:bg-white/[0.04]";

/** Quieter tinted surface (notes, tracker header, explanations). */
export const surfaceMuted = "bg-gray-50 dark:bg-white/[0.03]";

/** Hairline border colour, for dividers. */
export const hairline = "border-gray-200 dark:border-white/10";

/** Code and terminal surface, the same in both themes. */
export const codeSurface =
  "border border-solid border-gray-900/10 bg-[#141416] text-gray-100 dark:border-white/10";

export const h1 =
  "m-0 font-bold tracking-tight leading-[1.06] text-balance text-[2.25rem] sm:tracking-tighter sm:leading-[1.02] sm:text-5xl lg:text-6xl";

export const h2 =
  "m-0 font-bold tracking-tight leading-tight text-balance text-3xl sm:text-4xl";

/** H1 accent: the one solid-yellow heading on a dark page. */
export const accent = "text-secondary-wopee dark:text-primary-wopee";

/** H2 accent: purple in light, plain in dark, so yellow stays for the CTA. */
export const accentH2 = "text-secondary-wopee dark:text-inherit";

/** Small uppercase label above a heading; muted in dark so solid yellow stays for actions. */
export const eyebrow =
  "m-0 text-sm font-bold uppercase tracking-widest text-secondary-wopee dark:text-yellow-200/80";

// In dark, links are near-white with a yellow underline: solid yellow is for the primary CTA.
export const textLink =
  "font-semibold text-secondary-wopee dark:text-gray-100 dark:hover:text-white underline decoration-secondary-wopee/30 dark:decoration-primary-wopee/60 underline-offset-4 hover:decoration-current dark:hover:decoration-primary-wopee rounded-sm " +
  focusRing;

/** A standalone text link with a 44 px touch target. */
export const standaloneLink =
  "inline-flex min-h-[44px] items-center gap-1 font-semibold text-secondary-wopee underline-offset-4 hover:underline dark:text-gray-100 dark:underline dark:decoration-primary-wopee/60 dark:hover:text-white dark:hover:decoration-primary-wopee rounded-md " +
  focusRing;

/** Size for a primary CTA rendered with <Button asChild variant="wopeeFlat">. */
export const ctaSize =
  "h-auto min-h-[48px] rounded-lg px-6 py-3 text-base font-semibold hover:no-underline hover:text-white dark:hover:text-black " +
  focusRing;

/** The homepage hero background: a faint grid with a purple glow (use on an absolute layer). */
export const heroBg = {
  backgroundImage:
    "radial-gradient(circle at 85% 30%, rgba(112, 48, 160, 0.28) 0%, transparent 50%), radial-gradient(circle at 10% 90%, rgba(112, 48, 160, 0.12) 0%, transparent 45%), linear-gradient(rgba(128,128,128,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(128,128,128,0.08) 1px, transparent 1px)",
  backgroundSize: "100% 100%, 100% 100%, 40px 40px, 40px 40px",
};

export const container = "container px-6 lg:px-10";
