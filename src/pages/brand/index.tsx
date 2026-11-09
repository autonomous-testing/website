import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Head from "@docusaurus/Head";
import Layout from "@theme/Layout";
import ThemedImage from "@theme/ThemedImage";
import { Check, Copy, Download, Mail, X } from "lucide-react";

import SocialCard from "@site/src/components/seo/SocialCard";
import WopeeIo from "@site/src/components/brand/WopeeIo";
import CopyPrompt from "@site/src/components/ui/CopyPrompt";

const KIT = {
  href: "/brand/wopee-brand-kit-2026.zip",
  size: "ZIP, 1.5 MB",
};
const SVG = (n: string) => `/brand/svg/wopee-${n}.svg`;
const PNG = (n: string) => `/brand/png/wopee-${n}@2x.png`;
const MASCOT_BADGE = SVG("mascot-head-color-dark");
const DESIGN_MD = "/brand/DESIGN.md";
const EX = (n: string) => `/brand/examples/${n}.png`;

const NAV = [
  ["logo", "Logo"],
  ["symbol", "Symbol"],
  ["products", "Products"],
  ["mascot", "Mascot"],
  ["colour", "Colour"],
  ["type", "Type"],
  ["ui", "UI elements"],
  ["space", "Space and size"],
  ["surfaces", "Surfaces"],
  ["rules", "Do and don’t"],
  ["agents", "For AI agents"],
  ["download", "Download"],
] as const;

// ---------- building blocks ----------

const btnBase =
  "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 text-sm font-semibold no-underline transition-colors hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-wopee dark:focus-visible:outline-primary-wopee";
const btnPrimary = clsx(
  btnBase,
  "bg-primary-wopee text-[#111827] hover:bg-[#ffd633] hover:text-[#111827] dark:hover:bg-[#e6b800]"
);
const btnSecondary = clsx(
  btnBase,
  "border border-solid border-gray-300 bg-white text-gray-900 hover:border-secondary-wopee hover:text-secondary-wopee dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:hover:border-primary-wopee dark:hover:text-primary-wopee"
);
const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary-wopee dark:focus-visible:outline-primary-wopee";
const chip = clsx(
  "inline-flex min-h-11 items-center gap-1.5 rounded-md border border-solid border-gray-300 bg-white px-2.5 text-xs font-semibold text-gray-700 no-underline transition-colors hover:border-secondary-wopee hover:text-secondary-wopee hover:no-underline dark:border-white/15 dark:bg-white/[0.04] dark:text-gray-200 dark:hover:border-primary-wopee dark:hover:text-primary-wopee focus-visible:outline-offset-2",
  focusRing
);

function FileLink({ href, label, name }: { href: string; label: string; name?: string }) {
  return (
    <a href={href} download className={chip} aria-label={name ? `Download ${name} (${label})` : undefined}>
      <Download size={14} aria-hidden="true" />
      {label}
    </a>
  );
}

function SectionHead({ id, n, title, children }: { id: string; n: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-8 max-w-3xl lg:mb-10">
      <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-primary-wopee">
        {n} · {NAV.find(([k]) => k === id)?.[1]}
      </p>
      <h2 className="text-balance text-3xl font-bold leading-tight sm:text-4xl">{title}</h2>
      {children && <div className="mt-4 text-base leading-7 text-gray-600 sm:text-lg sm:leading-8 dark:text-gray-300">{children}</div>}
    </div>
  );
}

// The footer's grid, so the page and the footer share one left edge.
const wrap = "mx-auto max-w-7xl px-6 lg:px-8";

function Section({ id, children, tint }: { id: string; children: React.ReactNode; tint?: boolean }) {
  return (
    <section
      id={id}
      className={clsx(
        "scroll-mt-36 border-0 border-t border-solid border-gray-200 py-12 sm:py-20 dark:border-white/10",
        tint && "bg-gray-50 dark:bg-white/[0.02]"
      )}
    >
      <div className={wrap}>{children}</div>
    </section>
  );
}

// A fixed ground: it does not follow the colour mode.
const GROUNDS = {
  light: { bg: "#f3f4f6", ring: "" },
  dark: { bg: "#111827", ring: "ring-0 dark:ring-1 dark:ring-inset dark:ring-white/10" },
  yellow: { bg: "#ffcc00", ring: "" },
  purple: { bg: "#7030a0", ring: "" },
} as const;

function Ground({ g, className, children }: { g: keyof typeof GROUNDS; className?: string; children: React.ReactNode }) {
  return (
    <div className={clsx("flex items-center justify-center rounded-xl", GROUNDS[g].ring, className)} style={{ background: GROUNDS[g].bg }}>
      {children}
    </div>
  );
}

// ---------- 01 logo ----------

const INK_LOGO = "wordmark-mono-ink";
const WHITE_LOGO = "wordmark-mono-white";

const LOCKUPS = [
  { g: "light", file: INK_LOGO, title: "On light", note: "The default. Ink, one colour." },
  { g: "dark", file: WHITE_LOGO, title: "On dark", note: "White, one colour." },
  { g: "yellow", file: INK_LOGO, title: "On yellow", note: "Ink. The same file as on light." },
] as const;

function LogoSection() {
  return (
    <Section id="logo">
      <SectionHead id="logo" n="01" title="One W, one colour">
        The logo is the Bungee W followed by “opee.io” in Rubik ExtraBold, with the W at cap height, so the pair always
        reads <WopeeIo />. It is always one colour: ink on white and yellow, white on ink and dark photos. The brand’s
        yellow lives in the symbol, the headline key phrase and the main button, never in parts of the logo.
      </SectionHead>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {LOCKUPS.map((l) => (
          <figure key={l.title} className="m-0 overflow-hidden rounded-2xl border border-solid border-gray-200 bg-white dark:border-white/10 dark:bg-white/[0.03]">
            <Ground g={l.g} className="m-2 h-32 rounded-xl px-6 sm:h-56 sm:px-8">
              <img src={SVG(l.file)} alt={`Wopee.io logo, ${l.title.toLowerCase()}`} width={264} height={56} className="h-10 w-auto max-w-full sm:h-14" />
            </Ground>
            <figcaption className="flex flex-col gap-3 px-5 pb-5 pt-3 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{l.title}</p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{l.note}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <FileLink href={SVG(l.file)} label="SVG" name={`logo ${l.title.toLowerCase()}`} />
                <FileLink href={PNG(l.file)} label="PNG" name={`logo ${l.title.toLowerCase()}`} />
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-12 grid gap-4 rounded-2xl border border-solid border-gray-200 p-6 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-8 sm:p-8 dark:border-white/10">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400">Writing the name</p>
        <p className="text-gray-700 dark:text-gray-300">
          <strong className="text-gray-900 dark:text-white">Wopee.io</strong>: a capital W and always the “.io”. Not
          Wopee, WOPEE or Wopee IO. Lowercase only in URLs and code, such as <code className="whitespace-nowrap">wopee-mcp</code>. The image alt text
          is “Wopee.io”.
        </p>
      </div>
    </Section>
  );
}

// ---------- 02 symbol + favicons ----------

const ICONS = [
  { href: "/img/favicon.svg", label: "favicon.svg", note: "Any size" },
  { href: "/img/favicon.ico", label: "favicon.ico", note: "16, 32, 48" },
  { href: "/img/apple-touch-icon.png", label: "apple-touch-icon.png", note: "180 × 180" },
  { href: "/img/icon-512.png", label: "icon-512.png", note: "512 × 512" },
  { href: "/img/icon-maskable-512.png", label: "icon-maskable-512.png", note: "Android, maskable" },
];

function Tab({ dark }: { dark?: boolean }) {
  return (
    <div className={clsx("rounded-xl p-2 pb-0", dark ? "bg-[#202124] ring-1 ring-inset ring-white/10" : "bg-[#dfe1e5]")}>
      <div className="flex items-end gap-1">
        <div className={clsx("flex h-9 min-w-0 flex-1 items-center gap-2 rounded-t-lg px-3 sm:max-w-[240px]", dark ? "bg-[#35363a] text-[#e8eaed]" : "bg-white text-[#202124]")}>
          <img src="/img/favicon.svg" alt="Wopee.io favicon" width={16} height={16} className="h-4 w-4 shrink-0" />
          <span className="truncate text-xs">Wopee.io: AI testing agents</span>
        </div>
        <div className={clsx("hidden h-9 flex-1 items-center gap-2 px-3 sm:flex sm:max-w-[200px]", dark ? "text-[#9aa0a6]" : "text-[#5f6368]")}>
          <span className={clsx("h-4 w-4 shrink-0 rounded-full", dark ? "bg-white/15" : "bg-black/10")} aria-hidden="true" />
          <span className="truncate text-xs">Another tab</span>
        </div>
      </div>
    </div>
  );
}

function SymbolSection() {
  return (
    <Section id="symbol" tint>
      <SectionHead id="symbol" n="02" title="The symbol and favicons">
        The ink W in its yellow square: the one place where the logo carries colour. Use it where the full logo does
        not fit or the name is already on screen: favicons, app icons, avatars, the cap. The 16&nbsp;px favicon is a
        separate hand-tuned drawing, so it stays sharp in a browser tab.
      </SectionHead>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col rounded-2xl border border-solid border-gray-200 bg-white p-2 dark:border-white/10 dark:bg-white/[0.03]">
          {(["light", "dark"] as const).map((g) => (
            <Ground key={g} g={g} className="mb-2 flex-1 flex-wrap !items-end !justify-start gap-5 px-6 py-7 sm:gap-8 sm:px-8">
              {[128, 64, 32, 24, 16].map((s) => (
                <div key={s} className={clsx("flex-col items-center gap-3", s === 128 ? "hidden sm:flex" : "flex")}>
                  <img
                    src={s === 16 ? "/img/favicon-16.svg" : s === 32 ? "/img/favicon.svg" : SVG("symbol-color-light")}
                    alt={`Wopee.io symbol at ${s} pixels on ${g}`}
                    width={s}
                    height={s}
                    style={{ width: s, height: s }}
                  />
                  <span className={clsx("font-mono text-xs", g === "dark" ? "text-gray-400" : "text-gray-600")}>{s} px</span>
                </div>
              ))}
            </Ground>
          ))}
          <div className="flex flex-wrap gap-2 px-4 pb-4 pt-2">
            <FileLink href={SVG("symbol-color-light")} label="Symbol SVG" />
            <FileLink href="/brand/png/wopee-symbol-color-light.png" label="Symbol PNG 512" />
            <FileLink href="/brand/png/wopee-avatar-tile-500.png" label="Avatar tile 500" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Tab />
          <Tab dark />
          <ul className="m-0 mt-2 flex flex-1 list-none flex-col divide-y divide-gray-200 rounded-2xl border border-solid border-gray-200 bg-white p-0 dark:divide-white/10 dark:border-white/10 dark:bg-white/[0.03]">
            {ICONS.map((i) => (
              <li key={i.label} className="flex flex-1 items-center justify-between gap-3 px-4 py-2">
                <span className="min-w-0">
                  <span className="block truncate font-mono text-sm text-gray-900 dark:text-white">{i.label}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{i.note}</span>
                </span>
                <FileLink href={i.href} label="Get" name={i.label} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

// ---------- 03 products ----------

const PRODUCTS = [
  {
    name: "Commander",
    key: "commander",
    where: "cmd.wopee.io, the app where your team reviews tests and runs.",
    tile: "One colour like the main logo: ink on light, white on dark.",
  },
  {
    name: "MCP",
    key: "mcp",
    where: "wopee-mcp, the server that runs Wopee.io from Claude Code, Cursor and Copilot.",
    tile: "One colour like the main logo: ink on light, white on dark.",
  },
];

function ProductsSection() {
  return (
    <Section id="products">
      <SectionHead id="products" n="03" title="Products">
        Every product is <WopeeIo /> plus its name, set in caps under “.io”, one colour like the main logo. The name
        tells the products apart. There is one symbol, the yellow square with the ink W, for the company and every
        product; in running text write “Wopee.io Commander” or “Wopee.io MCP”.
      </SectionHead>

      <div className="grid gap-6 xl:grid-cols-2">
        {PRODUCTS.map((p) => (
          <article key={p.key} className="flex flex-col rounded-2xl border border-solid border-gray-200 bg-white p-2 dark:border-white/10 dark:bg-white/[0.03]">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Ground g="light" className="h-36 px-6">
                <img src={SVG(`wordmark-${p.key}-mono-ink`)} alt={`Wopee.io ${p.name} logo on light`} width={187} height={42} className="h-[42px] w-auto max-w-full" />
              </Ground>
              <Ground g="dark" className="h-36 px-6">
                <img src={SVG(`wordmark-${p.key}-mono-white`)} alt={`Wopee.io ${p.name} logo on dark`} width={187} height={42} className="h-[42px] w-auto max-w-full" />
              </Ground>
            </div>
            <div className="flex flex-1 flex-col gap-4 px-4 pb-4 pt-5 sm:flex-row sm:items-stretch">
              <div className="flex min-w-0 flex-1 flex-col">
                <h3 className="text-xl font-bold">{p.name}</h3>
                <p className="mt-1 text-gray-600 dark:text-gray-300">{p.where}</p>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{p.tile}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-4">
                  <FileLink href={SVG(`wordmark-${p.key}-mono-ink`)} label="Light SVG" name={`${p.name} logo`} />
                  <FileLink href={PNG(`wordmark-${p.key}-mono-ink`)} label="Light PNG" name={`${p.name} logo`} />
                  <FileLink href={SVG(`wordmark-${p.key}-mono-white`)} label="Dark SVG" name={`${p.name} logo`} />
                  <FileLink href={PNG(`wordmark-${p.key}-mono-white`)} label="Dark PNG" name={`${p.name} logo`} />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

// ---------- 04 mascot ----------

const MASCOT_DO = [
  "Social avatars, stickers, video end cards and the email sign-off",
  "404 pages, empty states and event booths",
  "On white or yellow, or on its yellow disc on dark",
];
const MASCOT_DONT = [
  "In place of the logo, or inside it",
  "In a customer logo row or on a customer quote",
  "On dark or purple without a yellow disc: its black parts disappear",
  "Redrawn, recoloured or cropped",
];

function MascotSection() {
  return (
    <Section id="mascot" tint>
      <SectionHead id="mascot" n="04" title="The monkey">
        The monkey is our character, not our logo. It is the face on YouTube, LinkedIn and at events, and it signs
        our emails. The cap is purple and carries the symbol, the same patch as on our team caps.
      </SectionHead>
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-12 xl:grid-cols-[minmax(0,420px)_1fr] xl:gap-16">
        <div className="mx-auto w-full max-w-[240px] sm:max-w-[320px] lg:max-w-none">
          <img src={MASCOT_BADGE} alt="The Wopee.io monkey: purple cap with the yellow W symbol, yellow-rimmed sunglasses and purple headphones, on a yellow disc" width={420} height={420} className="block aspect-square h-auto w-full" />
        </div>
        <div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-400">Use it for</p>
              <ul className="m-0 list-none space-y-2.5 p-0">
                {MASCOT_DO.map((t) => (
                  <li key={t} className="flex gap-2.5 text-gray-700 dark:text-gray-300">
                    <Check size={18} className="mt-1 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-rose-700 dark:text-rose-400">Never</p>
              <ul className="m-0 list-none space-y-2.5 p-0">
                {MASCOT_DONT.map((t) => (
                  <li key={t} className="flex gap-2.5 text-gray-700 dark:text-gray-300">
                    <X size={18} className="mt-1 shrink-0 text-rose-600 dark:text-rose-400" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            <FileLink href={SVG("mascot-head-color-light")} label="Monkey SVG" name="the monkey on light" />
            <FileLink href={PNG("mascot-head-color-light")} label="Monkey PNG" name="the monkey on light" />
            <FileLink href={SVG("mascot-head-color-dark")} label="Disc SVG" name="the monkey on a yellow disc" />
            <FileLink href={PNG("mascot-head-color-dark")} label="Disc PNG" name="the monkey on a yellow disc" />
            <FileLink href="/brand/png/wopee-mascot-head-on-yellow-800.png" label="Avatar 800" name="the monkey avatar" />
          </div>
          <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-solid border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:gap-6 dark:border-white/10 dark:bg-white/[0.03]">
            <Ground g="light" className="h-36 w-full shrink-0 sm:w-40">
              <img src={SVG("logo-stacked-color-light")} alt="Wopee.io stacked logo: the monkey above the wordmark" width={96} height={156} className="h-28 w-auto" />
            </Ground>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">Stacked logo</p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                The one place the monkey and the logo meet: end cards, booths and merch. Not for nav bars or documents.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <FileLink href={SVG("logo-stacked-color-light")} label="Light SVG" name="stacked logo" />
                <FileLink href={PNG("logo-stacked-color-light")} label="Light PNG" name="stacked logo" />
                <FileLink href={SVG("logo-stacked-color-dark")} label="Dark SVG" name="stacked logo" />
                <FileLink href={PNG("logo-stacked-color-dark")} label="Dark PNG" name="stacked logo" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ---------- 05 colour ----------

const COLOURS = [
  { name: "Yellow", hex: "#FFCC00", rgb: "255 204 0", role: "The brand colour: the symbol, the key phrase, main buttons, slide fields", fg: "#111827" },
  { name: "Purple", hex: "#7030A0", rgb: "112 48 160", role: "Atmosphere: the background glow, links on light, the cap, the dark-theme toggle", fg: "#ffffff" },
  { name: "Ink", hex: "#111827", rgb: "17 24 39", role: "Text, the logo on light and yellow, the dark ground", fg: "#ffffff" },
  { name: "White", hex: "#FFFFFF", rgb: "255 255 255", role: "The light ground, text and the logo on dark", fg: "#111827" },
];

type Verdict = "use" | "never" | "fail";
const CONTRAST: { pair: string; use: string; fg: string; bg: string; ratio: string; v: Verdict }[] = [
  { pair: "Ink on yellow", use: "Buttons, badges, yellow slides, the marker", fg: "#111827", bg: "#FFCC00", ratio: "11.7 : 1", v: "use" },
  { pair: "Ink on white", use: "Text and the logo on light", fg: "#111827", bg: "#FFFFFF", ratio: "17.7 : 1", v: "use" },
  { pair: "White on ink", use: "Text and the logo on dark", fg: "#FFFFFF", bg: "#111827", ratio: "17.7 : 1", v: "use" },
  { pair: "Yellow on ink", use: "The key phrase and links on dark", fg: "#FFCC00", bg: "#111827", ratio: "11.7 : 1", v: "use" },
  { pair: "Purple on white", use: "Links on light", fg: "#7030A0", bg: "#FFFFFF", ratio: "8.0 : 1", v: "use" },
  { pair: "White on purple", use: "Only the active toggle on dark", fg: "#FFFFFF", bg: "#7030A0", ratio: "8.0 : 1", v: "use" },
  { pair: "Yellow on purple", use: "Passes, but yellow and purple never meet as text and ground", fg: "#FFCC00", bg: "#7030A0", ratio: "5.3 : 1", v: "never" },
  { pair: "Purple on yellow", use: "Passes, but text on yellow is always ink", fg: "#7030A0", bg: "#FFCC00", ratio: "5.3 : 1", v: "never" },
  { pair: "White on yellow", use: "Unreadable: text on yellow is always ink", fg: "#FFFFFF", bg: "#FFCC00", ratio: "1.5 : 1", v: "fail" },
  { pair: "Yellow on white", use: "No yellow text, lines or icons on white", fg: "#FFCC00", bg: "#FFFFFF", ratio: "1.5 : 1", v: "fail" },
  { pair: "Purple on ink", use: "No purple text on dark", fg: "#7030A0", bg: "#111827", ratio: "2.2 : 1", v: "fail" },
];
const VERDICT: Record<Verdict, { label: string; cls: string; title: string; note: string }> = {
  use: { label: "Use", title: "Use these", note: "Each pair has one job. Use it for that job.", cls: "bg-emerald-100 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-300" },
  never: { label: "Not ours", title: "Pass the test, still not ours", note: "Readable, but off-brand: yellow and purple never sit together as text and ground. The cap is the one exception, and there it is the symbol (a yellow tile with an ink W) on purple fabric, not yellow type.", cls: "bg-amber-100 text-amber-900 dark:bg-amber-300/15 dark:text-amber-200" },
  fail: { label: "Fail", title: "Fail the test", note: "Below WCAG AA for text. Never use them.", cls: "bg-rose-100 text-rose-800 dark:bg-rose-400/15 dark:text-rose-300" },
};

function CopyHex({ hex }: { hex: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(hex).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  };
  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? `${hex} copied` : `Copy ${hex}`}
        className={clsx(
          "inline-flex min-h-11 min-w-[6.5rem] cursor-pointer select-none items-center justify-center gap-1.5 rounded-md border border-solid border-gray-300 bg-white px-2.5 font-mono text-xs font-semibold text-gray-700 transition-colors hover:border-secondary-wopee hover:text-secondary-wopee dark:border-white/15 dark:bg-white/[0.04] dark:text-gray-200 dark:hover:border-primary-wopee dark:hover:text-primary-wopee focus-visible:outline-offset-2",
          focusRing
        )}
      >
        {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
        <span aria-hidden="true">{copied ? "Copied" : hex}</span>
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? `${hex} copied` : ""}
      </span>
    </>
  );
}

function ColourSection() {
  return (
    <Section id="colour">
      <SectionHead id="colour" n="05" title="Colour">
        Yellow is the brand colour, purple sets the mood, ink does the work, white gives room. Purple never carries the
        logo or a main button. No other tints, no gradients on yellow, and no red.
      </SectionHead>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {COLOURS.map((c) => (
          <div key={c.hex} className={clsx("overflow-hidden rounded-2xl border border-solid border-gray-200 bg-white dark:border-white/10 dark:bg-white/[0.03]")}>
            <div
              className={clsx("flex h-24 items-end p-4 sm:h-32 lg:h-40", c.hex === "#FFFFFF" && "border-0 border-b border-solid border-gray-200 dark:border-transparent", c.hex === "#111827" && "dark:border-0 dark:border-b dark:border-solid dark:border-white/10")}
              style={{ background: c.hex, color: c.fg }}
            >
              <span className="text-lg font-bold">{c.name}</span>
            </div>
            <div className="flex flex-col gap-3 p-3 sm:p-4">
              <div className="flex flex-col items-start gap-2">
                <CopyHex hex={c.hex} />
                <span className="font-mono text-xs text-gray-500 dark:text-gray-400">RGB {c.rgb}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">{c.role}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="mb-2 mt-14 text-lg font-semibold">Text and ground pairs</h3>
      <p className="mb-6 max-w-3xl text-gray-600 dark:text-gray-300">
        Passing WCAG is not the same as being allowed. Text needs 4.5 : 1 and graphics 3 : 1, and on top of that each
        pair below has a verdict: use it, never use it although it passes, or never use it because it fails.
      </p>
      {(["use", "never", "fail"] as const).map((v) => (
        <div key={v} className="mb-8">
          <h4 className="mb-1 text-base font-semibold">{VERDICT[v].title}</h4>
          <p className="mb-3 max-w-3xl text-sm text-gray-600 dark:text-gray-300">{VERDICT[v].note}</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CONTRAST.filter((c) => c.v === v).map((c) => (
              <div key={c.pair} className="flex items-center gap-4 rounded-xl border border-solid border-gray-200 bg-white p-3 dark:border-white/10 dark:bg-white/[0.03]">
                <span
                  className={clsx("flex h-12 w-16 shrink-0 items-center justify-center rounded-lg text-xl font-extrabold", c.bg === "#FFFFFF" && "ring-1 ring-inset ring-gray-200")}
                  style={{ background: c.bg, color: c.fg }}
                  aria-hidden="true"
                >
                  Aa
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-gray-900 dark:text-white">{c.pair}</span>
                  <span className="font-mono text-xs text-gray-500 dark:text-gray-400">{c.ratio}</span>
                  <span className="block text-xs text-gray-500 dark:text-gray-400">{c.use}</span>
                </span>
                <span className={clsx("shrink-0 rounded-full px-2.5 py-1 text-xs font-bold", VERDICT[v].cls)}>{VERDICT[v].label}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </Section>
  );
}

// ---------- 06 type ----------

function TypeSection() {
  return (
    <Section id="type" tint>
      <SectionHead id="type" n="06" title="Type">
        Two free typefaces from Google Fonts, both under the SIL Open Font License 1.1. The logo files are outlined, so
        you need neither font to use them.
      </SectionHead>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-solid border-gray-200 bg-white p-6 sm:p-8 dark:border-white/10 dark:bg-white/[0.03]">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-xl font-bold">Bungee</h3>
            <a href="https://fonts.google.com/specimen/Bungee" className="-my-3 inline-flex min-h-11 items-center text-sm font-semibold text-secondary-wopee dark:text-primary-wopee">
              Google Fonts
            </a>
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">The W in the logo, and Build &amp; Break titles</p>
          <p className="my-6 text-[96px] leading-none text-gray-900 sm:text-[128px] dark:text-white" style={{ fontFamily: 'Bungee, "Arial Black", sans-serif' }} aria-hidden="true">
            W
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Caps only. We use one glyph of it: the W. Never set the whole name in Bungee.
          </p>
        </div>
        <div className="rounded-2xl border border-solid border-gray-200 bg-white p-6 sm:p-8 dark:border-white/10 dark:bg-white/[0.03]">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-xl font-bold">Rubik</h3>
            <a href="https://fonts.google.com/specimen/Rubik" className="-my-3 inline-flex min-h-11 items-center text-sm font-semibold text-secondary-wopee dark:text-primary-wopee">
              Google Fonts
            </a>
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">“opee.io” in the logo, and all text</p>
          <p className="my-6 text-[96px] font-extrabold leading-none text-gray-900 sm:text-[128px] dark:text-white" aria-hidden="true">
            Aa
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-gray-600 dark:text-gray-300">
            <span className="font-normal">Regular 400</span>
            <span className="font-semibold">Semibold 600</span>
            <span className="font-bold">Bold 700</span>
            <span className="font-extrabold">ExtraBold 800</span>
          </div>
        </div>
      </div>

      <h3 className="mb-2 mt-14 text-lg font-semibold">The key phrase</h3>
      <p className="mb-5 max-w-3xl text-gray-600 dark:text-gray-300">
        One phrase per screen or slide carries the yellow, usually the second line of the headline. On light grounds it
        is ink on a yellow marker band, on dark grounds it is yellow text, on yellow grounds it stays ink.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        {(["light", "dark", "yellow"] as const).map((g) => (
          <Ground key={g} g={g} className="h-36 flex-col !items-start px-6 sm:h-44 sm:px-8">
            <p className={clsx("m-0 text-2xl font-bold leading-tight sm:text-3xl", g === "dark" ? "text-white" : "text-[#111827]")} aria-hidden="true">
              AI Testing Agents
              <br />
              {g === "light" ? (
                <span className="-ml-[0.1em] px-[0.1em]" style={{ backgroundImage: "linear-gradient(transparent 58%, #ffcc00 58%, #ffcc00 92%, transparent 92%)" }}>
                  for Web Apps
                </span>
              ) : (
                <span className={g === "dark" ? "text-[#ffcc00]" : undefined}>for Web Apps</span>
              )}
            </p>
            <span className={clsx("mt-3 font-mono text-xs", g === "dark" ? "text-gray-400" : "text-gray-600")}>On {g}</span>
          </Ground>
        ))}
      </div>
    </Section>
  );
}

// ---------- 07 UI elements ----------

const INK = "#111827";
const btn = "inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-semibold";
type Spec = { name: string; use: string; light: React.ReactNode; dark: React.ReactNode };

const SPECS: { group: string; items: Spec[] }[] = [
  {
    group: "Buttons",
    items: [
      {
        name: "Primary",
        use: "The one main action in a view: Start for free, Generate my first test, Download. Yellow with ink text in both themes. Hover: a lighter yellow.",
        light: <span className={btn} style={{ background: "#ffcc00", color: INK }}>Start for free</span>,
        dark: <span className={btn} style={{ background: "#ffcc00", color: INK }}>Start for free</span>,
      },
      {
        name: "Secondary",
        use: "Every other action: Log in, Book a demo, See the logo. A neutral outline, never purple and never a gradient. Hover: the outline goes full ink or white with a faint tint; the text never changes colour.",
        light: <span className={clsx(btn, "border border-solid")} style={{ borderColor: INK, color: INK }}>Book a demo</span>,
        dark: <span className={clsx(btn, "border border-solid")} style={{ borderColor: "rgba(255,255,255,.3)", color: "#fff" }}>Book a demo</span>,
      },
      {
        name: "Text link",
        use: "Inline links and low-priority actions. Purple on light, yellow on dark. Hover: underline.",
        light: <span className="text-sm font-semibold underline underline-offset-4" style={{ color: "#7030a0" }}>Read the docs</span>,
        dark: <span className="text-sm font-semibold underline underline-offset-4" style={{ color: "#ffcc00" }}>Read the docs</span>,
      },
    ],
  },
  {
    group: "Toggles and badges",
    items: [
      {
        name: "Segmented toggle",
        use: "Switching between options in a form. The active segment is white on light and purple on dark, the only place purple fills a control.",
        light: (
          <span className="inline-flex gap-0.5 whitespace-nowrap rounded-lg p-0.5 text-xs font-semibold" style={{ background: "rgba(17,24,39,.04)", boxShadow: "inset 0 0 0 1px rgba(17,24,39,.1)" }}>
            <span className="rounded-md px-2.5 py-1.5 text-gray-600">Your app</span>
            <span className="rounded-md bg-white px-2.5 py-1.5" style={{ color: INK, boxShadow: "0 0 0 1px rgba(17,24,39,.15), 0 1px 2px rgba(17,24,39,.1)" }}>Demo app</span>
          </span>
        ),
        dark: (
          <span className="inline-flex gap-0.5 whitespace-nowrap rounded-lg p-0.5 text-xs font-semibold" style={{ background: "rgba(255,255,255,.05)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,.1)" }}>
            <span className="rounded-md px-2.5 py-1.5" style={{ color: "rgba(255,255,255,.7)" }}>Your app</span>
            <span className="rounded-md px-2.5 py-1.5 text-white" style={{ background: "#7030a0" }}>Demo app</span>
          </span>
        ),
      },
      {
        name: "Badge",
        use: "A short status next to a link or a plan: New, Recommended. Yellow with ink text in both themes.",
        light: <span className="rounded-full px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide" style={{ background: "#ffcc00", color: INK }}>New</span>,
        dark: <span className="rounded-full px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide" style={{ background: "#ffcc00", color: INK }}>New</span>,
      },
      {
        name: "Label",
        use: "A quiet tag above a headline or on a card. Neutral grey on light, a yellow tint on dark.",
        light: <span className="rounded-full border border-solid border-gray-300 bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">Free to start</span>,
        dark: <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: "rgba(255,204,0,.1)", color: "#ffcc00", boxShadow: "inset 0 0 0 1px rgba(255,204,0,.25)" }}>Free to start</span>,
      },
    ],
  },
  {
    group: "Frames and cards",
    items: [
      {
        name: "Card",
        use: "Grouping content that belongs together. A hairline and a soft shadow on light; on dark, a slightly lighter surface with a hairline. On hover the hairline darkens and the recommended card's glow fades in.",
        light: <span className="block h-16 w-40 rounded-2xl bg-white" style={{ boxShadow: "0 0 0 1px rgba(17,24,39,.1), 0 24px 50px rgba(76,29,149,.14)" }} />,
        dark: <span className="block h-16 w-40 rounded-2xl" style={{ background: "#181f2e", boxShadow: "0 0 0 1px rgba(255,255,255,.1)" }} />,
      },
      {
        name: "Highlighted frame",
        use: "Only the homepage form, the one place you act. Plain on light, the purple-to-yellow ring on dark. Never on cards in a grid or a comparison.",
        light: <span className="block h-16 w-40 rounded-2xl bg-white" style={{ boxShadow: "0 0 0 1px rgba(17,24,39,.1), 0 24px 50px rgba(76,29,149,.14)" }} />,
        dark: (
          <span className="block rounded-2xl p-[1.5px]" style={{ background: "linear-gradient(135deg,#7030a0,#a855f7 50%,#ffcc00)", boxShadow: "0 24px 50px rgba(59,7,100,.5)" }}>
            <span className="block h-16 w-40 rounded-[14px]" style={{ background: INK }} />
          </span>
        ),
      },
      {
        name: "Recommended option",
        use: "In a comparison every option is the same card; the recommended one gets the purple glow (soft on light, full on dark), a stronger hairline and a Recommended badge.",
        light: <span className="block h-16 w-40 rounded-2xl" style={{ background: "radial-gradient(circle at 15% 85%, rgba(112,48,160,.16), transparent 60%), radial-gradient(circle at 90% 10%, rgba(236,72,153,.07), transparent 55%), #ffffff", boxShadow: "0 0 0 1.5px #111827, 0 24px 50px rgba(76,29,149,.18)" }} />,
        dark: <span className="block h-16 w-40 rounded-2xl" style={{ background: "radial-gradient(circle at 15% 85%, rgba(112,48,160,.55), transparent 60%), #111827", boxShadow: "inset 0 0 0 1.5px rgba(255,255,255,.2)" }} />,
      },
      {
        name: "Media",
        use: "Videos, animations and product previews. No frame and no ring: a clean edge, a 12 px radius and a soft shadow on light.",
        light: <span className="block h-16 w-40 rounded-xl" style={{ background: "linear-gradient(160deg,#1f2937,#111827)", boxShadow: "0 24px 50px rgba(17,24,39,.18)" }} />,
        dark: <span className="block h-16 w-40 rounded-xl" style={{ background: "linear-gradient(160deg,#1f2937,#0b0f19)" }} />,
      },
      {
        name: "Icon tile",
        use: "A feature icon in a small yellow square with the symbol's corners, the icon in ink. No tag pill repeating the heading.",
        light: <span className="inline-flex h-10 w-10 items-center justify-center rounded-[9px]" style={{ background: "#ffcc00" }}><Check size={20} strokeWidth={2.5} color={INK} aria-hidden="true" /></span>,
        dark: <span className="inline-flex h-10 w-10 items-center justify-center rounded-[9px]" style={{ background: "#ffcc00" }}><Check size={20} strokeWidth={2.5} color={INK} aria-hidden="true" /></span>,
      },
      {
        name: "Solid card",
        use: "A call-to-action block with a primary button inside. Ink in both themes; on dark it carries the purple glow of the dark hero, so purple stays atmosphere and never sits under the yellow button.",
        light: (
          <span className="flex h-16 w-40 items-end rounded-2xl p-3" style={{ background: INK }}>
            <span className="h-5 w-20 rounded-md" style={{ background: "#ffcc00" }} />
          </span>
        ),
        dark: (
          <span className="flex h-16 w-40 items-end rounded-2xl p-3" style={{ background: "radial-gradient(circle at 15% 85%, rgba(112,48,160,.55), transparent 60%), #111827", boxShadow: "inset 0 0 0 1px rgba(255,255,255,.12)" }}>
            <span className="h-5 w-20 rounded-md" style={{ background: "#ffcc00" }} />
          </span>
        ),
      },
    ],
  },
];

const RETIRED: { name: string; why: string; g: "light" | "dark"; art: React.ReactNode }[] = [
  {
    name: "Purple main button",
    why: "The main action is yellow in both themes. A purple button made the brand colour flip between light and dark.",
    g: "light",
    art: <span className={btn} style={{ background: "#7030a0", color: "#fff" }}>Start for free</span>,
  },
  {
    name: "Purple text on yellow",
    why: "Text on yellow is always ink. Yellow and purple never meet as text and ground.",
    g: "dark",
    art: <span className={btn} style={{ background: "#ffcc00", color: "#7030a0" }}>Start for free</span>,
  },
  {
    name: "Purple outline button",
    why: "Secondary actions are a neutral outline, so the yellow primary is the only coloured action.",
    g: "light",
    art: <span className={clsx(btn, "border border-solid")} style={{ borderColor: "#7030a0", color: "#7030a0" }}>Book demo</span>,
  },
  {
    name: "Gradient outline button",
    why: "A blue-to-purple outline belongs to the 2023–25 template look and to no brand colour of ours.",
    g: "light",
    art: (
      <span className="inline-flex rounded-lg p-0.5" style={{ background: "linear-gradient(135deg,#3b82f6,#7030a0)" }}>
        <span className="rounded-md bg-white px-4 py-2 text-sm font-semibold" style={{ color: INK }}>Book demo</span>
      </span>
    ),
  },
  {
    name: "Gradient frame on light",
    why: "On light grounds frames are a hairline. The gradient ring is kept for dark, where it reads as light, not decoration.",
    g: "light",
    art: (
      <span className="block rounded-2xl p-[1.5px]" style={{ background: "linear-gradient(135deg,#7030a0,#a855f7 50%,#ffcc00)" }}>
        <span className="block h-14 w-36 rounded-[14px] bg-white" />
      </span>
    ),
  },
  {
    name: "A gradient ring on every card",
    why: "When every card in a grid has the ring, nothing is highlighted and the ring is just decoration. Next to the glow card it looked like a different product.",
    g: "dark",
    art: (
      <span className="flex gap-2">
        {[0, 1].map((i) => (
          <span key={i} className="block rounded-xl p-[1.5px]" style={{ background: "linear-gradient(135deg,#7030a0,#a855f7 50%,#ffcc00)" }}>
            <span className="block h-12 w-16 rounded-[10px]" style={{ background: "#111827" }} />
          </span>
        ))}
      </span>
    ),
  },
  {
    name: "Purple card with a yellow button",
    why: "A purple field under a yellow button puts yellow and purple side by side, in either theme. The solid card is ink; on dark purple stays a glow.",
    g: "dark",
    art: (
      <span className="flex h-14 w-36 items-end rounded-2xl p-3" style={{ background: "linear-gradient(135deg,#7030a0,#6b21a8)" }}>
        <span className="h-5 w-16 rounded-md" style={{ background: "#ffcc00" }} />
      </span>
    ),
  },
  {
    name: "Purple key phrase",
    why: "On light the key phrase is ink on the yellow marker; purple headings taught a second brand colour.",
    g: "light",
    art: <span className="text-xl font-bold" style={{ color: INK }}>AI Testing <span style={{ color: "#7030a0" }}>for Web Apps</span></span>,
  },
  {
    name: "A highlight in every heading",
    why: "One key phrase per screen. Marking a word in every section heading is a template habit and stops meaning anything.",
    g: "light",
    art: (
      <span className="flex flex-col items-start gap-1 text-sm font-bold" style={{ color: INK }}>
        {["Who tests it?", "testing stack", "supervise"].map((t) => (
          <span key={t} style={{ backgroundImage: "linear-gradient(transparent 58%, #ffcc00 58%, #ffcc00 92%, transparent 92%)" }}>{t}</span>
        ))}
      </span>
    ),
  },
  {
    name: "Purple tint pill",
    why: "Labels are neutral on light. Purple text on a purple tint was a second accent competing with yellow.",
    g: "light",
    art: <span className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide" style={{ background: "rgba(112,48,160,.1)", color: "#7030a0" }}>2 months free</span>,
  },
];

function SpecGround({ dark, children }: { dark?: boolean; children: React.ReactNode }) {
  return (
    <div className={clsx("flex h-28 items-center justify-center rounded-xl px-4", dark ? "ring-0 dark:ring-1 dark:ring-inset dark:ring-white/10" : "ring-1 ring-inset ring-gray-200 dark:ring-0")} style={{ background: dark ? INK : "#ffffff" }}>
      {children}
    </div>
  );
}

function UISection() {
  return (
    <Section id="ui">
      <SectionHead id="ui" n="07" title="UI elements">
        The few components the website is built from, each shown on light and on dark. Use only these. Below them are
        the ones we used before 5 November 2026 and have retired, so nobody brings them back.
      </SectionHead>
      <div className="flex flex-col gap-12">
        {SPECS.map((g) => (
          <div key={g.group}>
            <h3 className="mb-4 text-lg font-semibold">{g.group}</h3>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              {g.items.map((it) => (
                <figure key={it.name} className="m-0 flex flex-col rounded-2xl border border-solid border-gray-200 bg-white p-2 dark:border-white/10 dark:bg-white/[0.03]">
                  <div className="grid grid-cols-2 gap-2">
                    <SpecGround>{it.light}</SpecGround>
                    <SpecGround dark>{it.dark}</SpecGround>
                  </div>
                  <figcaption className="px-3 pb-3 pt-3">
                    <span className="block font-semibold text-gray-900 dark:text-white">{it.name}</span>
                    <span className="mt-1 block text-sm text-gray-600 dark:text-gray-300">{it.use}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}

        <div>
          <h3 className="mb-2 text-lg font-semibold">Retired</h3>
          <p className="mb-5 max-w-3xl text-gray-600 dark:text-gray-300">
            Used on the website until November 2026, now out of the brand. If you find one, replace it with the element
            above.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {RETIRED.map((r) => (
              <figure key={r.name} className="m-0 rounded-2xl border border-solid border-gray-200 bg-white p-2 dark:border-white/10 dark:bg-white/[0.03]">
                <SpecGround dark={r.g === "dark"}>{r.art}</SpecGround>
                <figcaption className="flex gap-2.5 px-3 pb-3 pt-3.5 text-sm text-gray-700 dark:text-gray-300">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-600 text-white dark:bg-rose-400 dark:text-[#111827]">
                    <X size={13} strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-semibold text-gray-900 dark:text-white">
                      <span className="sr-only">Retired: </span>
                      {r.name}
                    </span>
                    {r.why}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

// ---------- 08 clear space + size ----------

const XMark = () => (
  <span className="rounded bg-white px-1 font-mono text-[10px] font-bold leading-4 sm:px-1.5 sm:text-xs sm:leading-5 text-gray-600 ring-1 ring-gray-400 dark:bg-[#1f1f22] dark:text-primary-wopee dark:ring-primary-wopee/40">x</span>
);

function SpaceSection() {
  return (
    <Section id="space" tint>
      <SectionHead id="space" n="08" title="Clear space and minimum size">
        Keep one <em className="font-semibold not-italic">x</em> of empty space on every side, where x is the height of
        the “o”. Inside a nav bar, the bar’s padding counts.
      </SectionHead>
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex items-center justify-center rounded-2xl border border-solid border-gray-200 bg-white p-4 sm:p-10 dark:border-white/10 dark:bg-white/[0.03]">
          {/* x = the "o" height = 52/93.4 of the logo height = 9.57% of the box width (padding % is of the width on all sides) */}
          <div className="relative w-full max-w-[560px] rounded-lg bg-gray-100 p-[9.57%] ring-1 ring-inset ring-gray-300 dark:bg-primary-wopee/[0.08] dark:ring-primary-wopee/40">
            <div className="bg-white ring-1 ring-gray-300 dark:bg-[#1f1f22] dark:ring-primary-wopee/40">
              <ThemedImage
                sources={{ light: SVG(INK_LOGO), dark: SVG(WHITE_LOGO) }}
                alt="Wopee.io logo inside its clear-space box"
                width={433}
                height={93}
                className="block h-auto w-full"
              />
            </div>
            {["inset-y-0 left-0 w-[9.57%]", "inset-y-0 right-0 w-[9.57%]"].map((c) => (
              <span key={c} className={clsx("absolute flex items-center justify-center", c)} aria-hidden="true">
                <XMark />
              </span>
            ))}
            {["top-0", "bottom-0"].map((c) => (
              <span key={c} className={clsx("absolute inset-x-0 h-0 pt-[9.57%]", c)} aria-hidden="true">
                <span className="absolute inset-0 flex items-center justify-center">
                  <XMark />
                </span>
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 content-center gap-4">
          {[
            { what: "Logo", min: "80\u00a0px wide", print: "20\u00a0mm", demo: <img src={SVG(INK_LOGO)} alt="Wopee.io logo at 80 pixels wide" width={80} height={17} style={{ width: 80, height: "auto" }} /> },
            { what: "Commander, MCP", min: "41\u00a0px tall", print: "30\u00a0mm", wide: true, demo: <img src={SVG("wordmark-commander-mono-ink")} alt="Wopee.io Commander logo at 41 pixels tall" width={182} height={41} style={{ height: 41, width: "auto" }} /> },
            { what: "Symbol", min: "24\u00a0px", print: "6\u00a0mm", demo: <img src={SVG("symbol-color-light")} alt="Wopee.io symbol at 24 pixels" width={24} height={24} /> },
            { what: "Favicon", min: "16\u00a0px", print: "", demo: <img src="/img/favicon-16.svg" alt="Wopee.io favicon at 16 pixels" width={16} height={16} /> },
          ].map((r) => (
            <div key={r.what} className={clsx("flex items-center gap-4 rounded-xl border border-solid border-gray-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.03]", r.wide && "flex-wrap")}>
              <span className={clsx("flex shrink-0 items-center justify-center rounded-lg bg-white ring-1 ring-inset ring-gray-200 dark:ring-0", r.wide ? "h-14 w-[197px]" : "h-12 w-24")}>{r.demo}</span>
              <span>
                <span className="block font-semibold text-gray-900 dark:text-white">{r.what}</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {r.print ? (
                    <>
                      {r.min} on screen · <span className="whitespace-nowrap">{r.print} in print</span>
                    </>
                  ) : (
                    `${r.min}, screen only`
                  )}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ---------- 09 surfaces ----------

const SURFACES = [
  {
    title: "LinkedIn",
    note: "Dark by default, light as the alternative, the same two moods as the website. One headline, no button in the image.",
    items: [
      { file: "linkedin-dark", label: "Default: dark", size: "1200 × 627" },
      { file: "linkedin-light", label: "Alternative: light, with the marker", size: "1200 × 627" },
    ],
  },
  {
    title: "Slides",
    note: "Three forms to pace a deck, each with the short bar above the headline. Dark opens formal meetings, white carries content and PDFs, the yellow field opens a section. Yellow is always flat.",
    items: [
      { file: "slide-dark", label: "Dark: the default cover", size: "1920 × 1080" },
      { file: "slide-white", label: "White: content and documents", size: "1920 × 1080" },
      { file: "slide-yellow", label: "Yellow: section openers", size: "1920 × 1080" },
    ],
  },
];

function SurfacesSection() {
  return (
    <Section id="surfaces">
      <SectionHead id="surfaces" n="09" title="Where it shows up">
        The website sets the two moods. The light theme is calm: white, a grid, one soft purple glow, the yellow marker
        and a yellow button. The dark theme is more playful: the purple and pink glow, a gradient frame around the
        form, the purple toggle. Social posts and slides follow the same two moods. Merch uses a purple cap with the
        symbol, the one place where purple leads. The booth is a full yellow wall with the ink logo and the monkey.
      </SectionHead>
      <div className="flex flex-col gap-12">
        {SURFACES.map((g) => (
          <div key={g.title}>
            <h3 className="mb-2 text-lg font-semibold">{g.title}</h3>
            <p className="mb-5 max-w-3xl text-gray-600 dark:text-gray-300">{g.note}</p>
            <div className={clsx("grid grid-cols-1 gap-5", g.items.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2")}>
              {g.items.map((i) => (
                <figure key={i.file} className="m-0 overflow-hidden rounded-2xl border border-solid border-gray-200 bg-white p-2 dark:border-white/10 dark:bg-white/[0.03]">
                  <img src={EX(i.file)} alt={`Example: ${g.title}, ${i.label.toLowerCase()}`} width={1200} height={g.title === "Slides" ? 675 : 627} loading="lazy" className="block h-auto w-full rounded-xl ring-1 ring-inset ring-gray-200 dark:ring-white/10" />
                  <figcaption className="flex items-end justify-between gap-3 px-3 pb-2 pt-3">
                    <span>
                      <span className="block text-sm font-semibold text-gray-900 dark:text-white">{i.label}</span>
                      <span className="font-mono text-xs text-gray-500 dark:text-gray-400">{i.size}</span>
                    </span>
                    <FileLink href={EX(i.file)} label="PNG" name={`${g.title} example, ${i.label.toLowerCase()}`} />
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ---------- 11 for AI agents ----------

const AGENT_PROMPT = "Before you design anything for Wopee.io (a page, slides, a social post, a document), read https://wopee.io/brand/DESIGN.md and follow it. If something is not covered, ask.";

function AgentsSection() {
  return (
    <Section id="agents">
      <SectionHead id="agents" n="11" title="For AI agents">
        Everything on this page is also in one Markdown file, written for AI agents and design tools: colour and type
        tokens, the logo files for each situation, the website, slide and social rules, and the don’ts. It follows the
        open DESIGN.md format. Point your agent at it before it makes anything with our name on it.
      </SectionHead>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-2xl border border-solid border-gray-200 bg-white p-6 sm:p-8 dark:border-white/10 dark:bg-white/[0.03]">
          <p className="font-mono text-sm text-gray-900 dark:text-white">https://wopee.io/brand/DESIGN.md</p>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            Tokens in the front matter, rules in plain sections: Overview, Colors, Typography, Layout, Elevation, Shapes,
            Components, Logo, Surfaces, Mascot, Do’s and Don’ts. When this page and the file differ, the file wins.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={DESIGN_MD} className={clsx(btnPrimary, "h-11 px-5")}>
              Open DESIGN.md
            </a>
            <a href={DESIGN_MD} download className={clsx(btnSecondary, "h-11 px-5")}>
              <Download size={16} aria-hidden="true" />
              Download
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-4 rounded-2xl border border-solid border-gray-200 bg-white p-6 sm:p-8 dark:border-white/10 dark:bg-white/[0.03]">
          <CopyPrompt label="Prompt to paste" text={AGENT_PROMPT} buttonLabel="Copy the prompt" />
        </div>
      </div>
    </Section>
  );
}

// ---------- 10 do and don't ----------

const L = SVG(INK_LOGO);
const D = SVG(WHITE_LOGO);
// The retired two-colour wordmark, shown here only as a don't (it is not in /brand/ or the kit).
const OLD_TWO_COLOUR = "/img/brand/dont-two-colour-wordmark.svg";
const logoImg = (src: string, alt: string, style?: React.CSSProperties, className = "h-9 w-auto max-w-full") => <img src={src} alt={alt} width={180} height={38} className={className} style={style} />;

const RULES: { ok: boolean; text: string; g: keyof typeof GROUNDS; art: React.ReactNode }[] = [
  { ok: true, text: "Use the ink logo on white and pale grounds.", g: "light", art: logoImg(L, "Correct: the ink logo on white") },
  { ok: true, text: "Use the white logo on ink and dark photos.", g: "dark", art: logoImg(D, "Correct: the white logo on ink") },
  { ok: true, text: "On yellow, the logo stays ink.", g: "yellow", art: logoImg(L, "Correct: the ink logo on yellow") },
  { ok: false, text: "Don’t colour parts of the logo, such as a yellow W or a coloured dot.", g: "dark", art: logoImg(OLD_TWO_COLOUR, "Incorrect: the logo with a yellow W and a yellow dot") },
  {
    ok: false,
    text: "Don’t put the W in front of the full name. It reads “W Wopee.io”.",
    g: "light",
    art: (
      <span className="flex items-center gap-2">
        <img src={SVG("symbol-color-light")} alt="Incorrect: the W symbol in front of the full name" width={36} height={36} className="h-9 w-9" />
        <span className="text-[28px] font-extrabold leading-none text-[#111827]" aria-hidden="true">Wopee.io</span>
      </span>
    ),
  },
  { ok: false, text: "Don’t stretch, squash or rotate it.", g: "light", art: logoImg(L, "Incorrect: the logo stretched", { transform: "scaleX(1.35) scaleY(0.8)" }, "h-auto w-[170px] max-w-[72%]") },
  { ok: false, text: "Don’t recolour it, or add shadows, glows, outlines or a marker.", g: "light", art: logoImg(L, "Incorrect: the logo recoloured red with a shadow", { filter: "invert(27%) sepia(91%) saturate(2352%) hue-rotate(346deg) brightness(104%) drop-shadow(3px 3px 0 #0ea5e9)" }) },
  {
    ok: false,
    text: "Don’t use yellow text or thin yellow lines on white.",
    g: "light",
    art: (
      <span className="text-[30px] font-extrabold leading-none text-[#ffcc00]" aria-hidden="true">
        for Web Apps
      </span>
    ),
  },
  {
    ok: false,
    text: "Don’t use the monkey in place of the logo.",
    g: "light",
    art: (
      <span className="flex items-center gap-2">
        <img src={MASCOT_BADGE} alt="Incorrect: the monkey used as the logo" width={40} height={40} className="h-10 w-10" />
        <span className="text-[26px] font-extrabold leading-none text-[#111827]" aria-hidden="true">Wopee.io</span>
      </span>
    ),
  },
];

function RulesSection() {
  return (
    <Section id="rules" tint>
      <SectionHead id="rules" n="10" title="Do and don’t">
        Use the files as they are. If a layout needs something that is not here, ask us.
      </SectionHead>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {RULES.map((r) => (
          <figure key={r.text} className="m-0 rounded-2xl border border-solid border-gray-200 bg-white p-2 dark:border-white/10 dark:bg-white/[0.03]">
            <Ground g={r.g} className="h-24 overflow-hidden px-6 sm:h-32">
              {r.art}
            </Ground>
            <figcaption className="flex gap-2.5 px-3 pb-3 pt-3.5 text-sm text-gray-700 dark:text-gray-300">
              <span
                className={clsx(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white dark:text-[#111827]",
                  r.ok ? "bg-emerald-600 dark:bg-emerald-400" : "bg-rose-600 dark:bg-rose-400"
                )}
              >
                {r.ok ? <Check size={13} strokeWidth={3} aria-hidden="true" /> : <X size={13} strokeWidth={3} aria-hidden="true" />}
              </span>
              <span>
                <span className="sr-only">{r.ok ? "Do: " : "Don’t: "}</span>
                {r.text}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

// ---------- 12 download + contact ----------

const KIT_CONTENTS = [
  "The logo in ink and white, SVG and PNG",
  "Commander and MCP logos",
  "The symbol, favicons and app icons",
  "The monkey and the stacked logo",
  "Slide and LinkedIn examples, and DESIGN.md",
];

function DownloadSection() {
  return (
    <Section id="download">
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="relative overflow-hidden rounded-3xl bg-[#111827] p-7 text-white sm:p-10 dark:ring-1 dark:ring-inset dark:ring-white/10">
          <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary-wopee">12 · Download</p>
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">The brand kit</h2>
          <ul className="m-0 mt-6 list-none space-y-2.5 p-0">
            {KIT_CONTENTS.map((t) => (
              <li key={t} className="flex gap-2.5 text-pretty text-gray-200">
                <Check size={18} className="mt-1 shrink-0 text-primary-wopee" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href={KIT.href} download className={clsx(btnBase, "shrink-0 bg-primary-wopee px-6 text-base text-[#111827] hover:bg-[#e6b800] hover:text-[#111827] focus-visible:outline-primary-wopee")}>
              <Download size={18} aria-hidden="true" />
              Download ZIP
            </a>
            <span className="text-sm text-gray-400">{KIT.size} · free to use when you write about or work with Wopee.io</span>
          </div>
        </div>
        <div className="flex flex-col justify-start gap-6 rounded-3xl border border-solid border-gray-200 bg-white p-7 sm:p-10 dark:border-white/10 dark:bg-white/[0.03]">
          <div>
            <h2 className="text-2xl font-bold">Questions</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              Need a format that is not here, a co-branded version or a check before you print? Write to Marcel.
            </p>
          </div>
          <a href="mailto:marcel.veselka@wopee.io" className={clsx(btnSecondary, "self-start")}>
            <Mail size={16} aria-hidden="true" />
            marcel.veselka@wopee.io
          </a>
        </div>
      </div>
    </Section>
  );
}

// ---------- hero ----------

function Hero() {
  return (
    <header className="relative overflow-hidden">
      <div className={clsx(wrap, "grid items-center gap-10 pb-12 pt-12 sm:pb-16 sm:pt-16 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:pb-20 lg:pt-20")}>
        <div>
          <p className="mb-5 inline-flex rounded-full border border-solid border-gray-300 bg-gray-100 px-4 py-1.5 text-sm font-semibold text-gray-700 dark:border-primary-wopee/25 dark:bg-primary-wopee/10 dark:text-primary-wopee">
            Brand kit
          </p>
          <h1 className="text-balance text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            The <WopeeIo display /> logo, colours and type
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8 dark:text-gray-300">
            Everything you need to show <WopeeIo /> in an article, a slide or a partner page, and the few rules that keep
            it looking right. AI agents: read <a href={DESIGN_MD} className="font-semibold text-secondary-wopee dark:text-primary-wopee">DESIGN.md</a> first.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={KIT.href} download className={clsx(btnPrimary, "h-12 px-6 text-base")}>
              <Download size={18} aria-hidden="true" />
              Download the kit
            </a>
            <a href="#logo" className={clsx(btnSecondary, "h-12 px-6 text-base")}>
              See the logo
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <Ground g="light" className="col-span-2 h-36 rounded-2xl px-8 shadow-sm sm:h-56 lg:h-60">
            <img src={L} alt="Wopee.io logo on light" width={300} height={64} className="h-14 w-auto max-w-full sm:h-16" />
          </Ground>
          <div className="col-span-2 grid grid-cols-3 gap-3 sm:gap-4">
            <Ground g="dark" className="h-28 rounded-2xl px-3 sm:h-36 sm:px-4">
              <img src={D} alt="Wopee.io logo on ink" width={150} height={32} className="h-6 w-auto max-w-full sm:h-8" />
            </Ground>
            <Ground g="yellow" className="h-28 rounded-2xl px-3 sm:h-36 sm:px-4">
              <img src={L} alt="Wopee.io logo on yellow" width={150} height={32} className="h-6 w-auto max-w-full sm:h-8" />
            </Ground>
            <Ground g="purple" className="h-28 rounded-2xl sm:h-36">
              <img src={SVG("symbol-color-light")} alt="Wopee.io symbol on purple, as on the cap" width={56} height={56} className="h-11 w-11 sm:h-14 sm:w-14" />
            </Ground>
          </div>
        </div>
      </div>
    </header>
  );
}

function PageNav() {
  const row = useRef<HTMLUListElement>(null);
  const [more, setMore] = useState(false);
  useEffect(() => {
    const el = row.current;
    if (!el) return;
    const update = () => setMore(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return (
    <nav aria-label="On this page" className="sticky top-[var(--ifm-navbar-height)] z-20 border-0 border-y border-solid border-gray-200 bg-[color:var(--ifm-navbar-background-color)] dark:border-white/10">
      <div className={wrap}>
        <ul ref={row} data-more={more} className="no-scrollbar page-nav -mx-3 my-0 flex list-none gap-1 overflow-x-auto p-0 py-1">
          {NAV.map(([id, label]) => (
            <li key={id} className="shrink-0">
              <a
                href={`#${id}`}
                className={clsx(
                  "inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-gray-600 no-underline transition-colors hover:bg-gray-100 hover:text-gray-900 hover:no-underline dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white",
                  focusRing,
                  "focus-visible:-outline-offset-2"
                )}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default function BrandPage(): JSX.Element {
  return (
    <Layout
      title="Brand kit: logo, colours and type"
      description="Download the Wopee.io logo, symbol and favicons in SVG and PNG, with the brand colours, typefaces and the rules for using them."
    >
      <SocialCard permalink="/brand/" />
      <Head>
        <link rel="alternate" type="text/markdown" href={DESIGN_MD} title="Wopee.io design rules for AI agents (DESIGN.md)" />
      </Head>
      <main className="overflow-x-clip">
        <Hero />
        <PageNav />
        <LogoSection />
        <SymbolSection />
        <ProductsSection />
        <MascotSection />
        <ColourSection />
        <TypeSection />
        <UISection />
        <SpaceSection />
        <SurfacesSection />
        <RulesSection />
        <AgentsSection />
        <DownloadSection />
      </main>
    </Layout>
  );
}
