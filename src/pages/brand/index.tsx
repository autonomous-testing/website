import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import ThemedImage from "@theme/ThemedImage";
import { Check, Copy, Download, Mail, X } from "lucide-react";

import SocialCard from "@site/src/components/seo/SocialCard";
import WopeeIo from "@site/src/components/brand/WopeeIo";

const KIT = {
  href: "/brand/wopee-brand-kit-2026.zip",
  size: "ZIP, 837 KB",
};
const SVG = (n: string) => `/brand/svg/wopee-${n}.svg`;
const PNG = (n: string) => `/brand/png/wopee-${n}@2x.png`;
const MASCOT_BADGE = SVG("mascot-head-color-dark");

const NAV = [
  ["logo", "Logo"],
  ["symbol", "Symbol"],
  ["products", "Products"],
  ["mascot", "Mascot"],
  ["colour", "Colour"],
  ["type", "Type"],
  ["space", "Space and size"],
  ["rules", "Do and don’t"],
  ["download", "Download"],
] as const;

// ---------- building blocks ----------

const btnBase =
  "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 text-sm font-semibold no-underline transition-colors hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-wopee dark:focus-visible:outline-primary-wopee";
const btnPrimary = clsx(
  btnBase,
  "bg-secondary-wopee text-white hover:bg-[#5c2785] hover:text-white dark:bg-primary-wopee dark:text-[#111827] dark:hover:bg-[#e6b800] dark:hover:text-[#111827]"
);
const btnSecondary = clsx(
  btnBase,
  "border border-solid border-slate-300 bg-white text-slate-900 hover:border-secondary-wopee hover:text-secondary-wopee dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:hover:border-primary-wopee dark:hover:text-primary-wopee"
);
const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary-wopee dark:focus-visible:outline-primary-wopee";
const chip = clsx(
  "inline-flex min-h-11 items-center gap-1.5 rounded-md border border-solid border-slate-300 bg-white px-2.5 text-xs font-semibold text-slate-700 no-underline transition-colors hover:border-secondary-wopee hover:text-secondary-wopee hover:no-underline dark:border-white/15 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-primary-wopee dark:hover:text-primary-wopee focus-visible:outline-offset-2",
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
      <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-secondary-wopee dark:text-primary-wopee">
        {n} · {NAV.find(([k]) => k === id)?.[1]}
      </p>
      <h2 className="text-balance text-3xl font-bold leading-tight sm:text-4xl">{title}</h2>
      {children && <div className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 dark:text-slate-300">{children}</div>}
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
        "scroll-mt-36 border-0 border-t border-solid border-slate-200 py-12 sm:py-20 dark:border-white/10",
        tint && "bg-slate-50 dark:bg-white/[0.02]"
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

const LOCKUPS = [
  { g: "light", file: "logo-horizontal-color-light", title: "On light", note: "The default. Yellow square, ink W, purple dot." },
  { g: "dark", file: "wordmark-color-dark", title: "On dark", note: "The square goes, the W turns yellow." },
  { g: "yellow", file: "logo-horizontal-on-yellow", title: "On yellow", note: "Ink square, yellow W." },
  { g: "purple", file: "logo-horizontal-on-purple", title: "On purple", note: "Yellow square, white text, yellow dot." },
] as const;

const MORE = [
  { file: "logo-horizontal-mono-ink", title: "One colour, ink", g: "light" },
  { file: "logo-horizontal-mono-white", title: "One colour, white", g: "dark" },
  { file: "wordmark-color-light", title: "Wordmark, light", g: "light" },
  { file: "wordmark-color-dark", title: "Wordmark, dark", g: "dark" },
] as const;

function LogoSection() {
  return (
    <Section id="logo">
      <SectionHead id="logo" n="01" title="One W, square on or off">
        The logo is the Bungee W followed by “opee.io” in Rubik ExtraBold. The W is the first letter of the name, so the
        pair always reads <WopeeIo />. On light, yellow and purple grounds the W sits in a square. On dark grounds the
        square goes and the W turns yellow.
      </SectionHead>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {LOCKUPS.map((l) => (
          <figure key={l.file} className="m-0 overflow-hidden rounded-2xl border border-solid border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.03]">
            <Ground g={l.g} className="m-2 h-32 rounded-xl px-6 sm:h-56 sm:px-8">
              <img src={SVG(l.file)} alt={`Wopee.io logo, ${l.title.toLowerCase()}`} width={264} height={56} className="h-10 w-auto max-w-full sm:h-14" />
            </Ground>
            <figcaption className="flex flex-col gap-3 px-5 pb-5 pt-3 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">{l.title}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{l.note}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <FileLink href={SVG(l.file)} label="SVG" name={`logo ${l.title.toLowerCase()}`} />
                <FileLink href={PNG(l.file)} label="PNG" name={`logo ${l.title.toLowerCase()}`} />
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      <h3 className="mb-4 mt-12 text-lg font-semibold">More versions</h3>
      <p className="mb-5 max-w-3xl text-slate-600 dark:text-slate-300">
        One-colour versions are for print, stamps and photo overlays. The wordmark, with the square off, is for small
        sizes and footers.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {MORE.map((m) => (
          <div key={m.file} className="rounded-xl border border-solid border-slate-200 bg-white p-2 dark:border-white/10 dark:bg-white/[0.03]">
            <Ground g={m.g} className="h-20 px-3 sm:h-28 sm:px-6">
              <img src={SVG(m.file)} alt={`Wopee.io ${m.title.toLowerCase()}`} width={160} height={34} className="h-6 w-auto max-w-full sm:h-8" />
            </Ground>
            <div className="flex flex-col gap-2.5 px-2 pb-1 pt-3">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{m.title}</p>
              <div className="flex flex-wrap gap-2">
                <FileLink href={SVG(m.file)} label="SVG" name={m.title} />
                <FileLink href={PNG(m.file)} label="PNG" name={m.title} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-4 rounded-2xl border border-solid border-slate-200 p-6 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-8 sm:p-8 dark:border-white/10">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Writing the name</p>
        <p className="text-slate-700 dark:text-slate-300">
          <strong className="text-slate-900 dark:text-white">Wopee.io</strong>: a capital W and always the “.io”. Not
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
        The W in its square, on its own. Use it where the full logo does not fit or the name is already on screen:
        favicons, app icons, avatars. The 16&nbsp;px favicon is a separate hand-tuned drawing, so it stays sharp in a
        browser tab.
      </SectionHead>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col rounded-2xl border border-solid border-slate-200 bg-white p-2 dark:border-white/10 dark:bg-white/[0.03]">
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
                  <span className={clsx("font-mono text-xs", g === "dark" ? "text-slate-400" : "text-slate-600")}>{s} px</span>
                </div>
              ))}
            </Ground>
          ))}
          <div className="flex flex-wrap gap-2 px-4 pb-4 pt-2">
            <FileLink href={SVG("symbol-color-light")} label="Symbol SVG" />
            <FileLink href="/brand/png/wopee-symbol-color-light.png" label="Symbol PNG 512" />
            <FileLink href={SVG("symbol-on-yellow")} label="On yellow SVG" />
            <FileLink href="/brand/png/wopee-avatar-tile-500.png" label="Avatar tile 500" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Tab />
          <Tab dark />
          <ul className="m-0 mt-2 flex flex-1 list-none flex-col divide-y divide-slate-200 rounded-2xl border border-solid border-slate-200 bg-white p-0 dark:divide-white/10 dark:border-white/10 dark:bg-white/[0.03]">
            {ICONS.map((i) => (
              <li key={i.label} className="flex flex-1 items-center justify-between gap-3 px-4 py-2">
                <span className="min-w-0">
                  <span className="block truncate font-mono text-sm text-slate-900 dark:text-white">{i.label}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{i.note}</span>
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
    tile: "Purple tile. On dark, the W and dot turn purple-300, so they never clash with the amber status colour.",
  },
  {
    name: "MCP",
    key: "mcp",
    where: "wopee-mcp, the server that runs Wopee.io from Claude Code, Cursor and Copilot.",
    tile: "Ink tile with a yellow W. On dark, a white W and a yellow dot.",
  },
];

function ProductsSection() {
  return (
    <Section id="products">
      <SectionHead id="products" n="03" title="Products">
        Every product is <WopeeIo /> plus its name, set in caps under “.io”. The tile colour tells them apart:
        yellow for the company, purple for Commander, ink for MCP. Products never get their own symbol.
      </SectionHead>

      <div className="grid gap-6 xl:grid-cols-2">
        {PRODUCTS.map((p) => (
          <article key={p.key} className="flex flex-col rounded-2xl border border-solid border-slate-200 bg-white p-2 dark:border-white/10 dark:bg-white/[0.03]">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Ground g="light" className="h-36 px-6">
                <img src={SVG(`logo-horizontal-${p.key}-color-light`)} alt={`Wopee.io ${p.name} logo on light`} width={185} height={42} className="h-[42px] w-auto max-w-full" />
              </Ground>
              <Ground g="dark" className="h-36 px-6">
                <img src={SVG(`logo-horizontal-${p.key}-color-dark`)} alt={`Wopee.io ${p.name} logo on dark`} width={190} height={42} className="h-10 w-auto max-w-full" />
              </Ground>
            </div>
            <div className="flex flex-1 flex-col gap-4 px-4 pb-4 pt-5 sm:flex-row sm:items-stretch">
              <div className="flex shrink-0 flex-col items-start gap-3">
                <img src={SVG(`symbol-${p.key}-color-light`)} alt={`Wopee.io ${p.name} symbol`} width={48} height={48} className="h-12 w-12 rounded-[11px] dark:ring-1 dark:ring-white/20" />
                <FileLink href={SVG(`symbol-${p.key}-color-light`)} label="Symbol" name={`${p.name} symbol`} />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <h3 className="text-xl font-bold">{p.name}</h3>
                <p className="mt-1 text-slate-600 dark:text-slate-300">{p.where}</p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{p.tile}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-4">
                  <FileLink href={SVG(`logo-horizontal-${p.key}-color-light`)} label="Light SVG" name={`${p.name} logo`} />
                  <FileLink href={PNG(`logo-horizontal-${p.key}-color-light`)} label="Light PNG" name={`${p.name} logo`} />
                  <FileLink href={SVG(`logo-horizontal-${p.key}-color-dark`)} label="Dark SVG" name={`${p.name} logo`} />
                  <FileLink href={PNG(`logo-horizontal-${p.key}-color-dark`)} label="Dark PNG" name={`${p.name} logo`} />
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
  "On white or yellow, or on its yellow disc on dark and purple",
];
const MASCOT_DONT = [
  "In place of the logo, or inside it",
  "In a customer logo row or on a customer quote",
  "On dark without a yellow disc: its black parts disappear",
  "Redrawn, recoloured or cropped",
];

function MascotSection() {
  return (
    <Section id="mascot" tint>
      <SectionHead id="mascot" n="04" title="The monkey">
        The monkey is our character, not our logo. It is the face on YouTube, LinkedIn and at events, and it signs
        our emails. The cap is purple and carries the W from the logo.
      </SectionHead>
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-12 xl:grid-cols-[minmax(0,420px)_1fr] xl:gap-16">
        <div className="mx-auto w-full max-w-[240px] sm:max-w-[320px] lg:max-w-none">
          <img src={MASCOT_BADGE} alt="The Wopee.io monkey: purple cap with the W, yellow-rimmed sunglasses and purple headphones, on a yellow disc" width={420} height={420} className="block aspect-square h-auto w-full" />
        </div>
        <div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-400">Use it for</p>
              <ul className="m-0 list-none space-y-2.5 p-0">
                {MASCOT_DO.map((t) => (
                  <li key={t} className="flex gap-2.5 text-slate-700 dark:text-slate-300">
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
                  <li key={t} className="flex gap-2.5 text-slate-700 dark:text-slate-300">
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
          <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-solid border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:gap-6 dark:border-white/10 dark:bg-white/[0.03]">
            <Ground g="light" className="h-36 w-full shrink-0 sm:w-40">
              <img src={SVG("logo-stacked-color-light")} alt="Wopee.io stacked logo: the monkey above the wordmark" width={96} height={156} className="h-28 w-auto" />
            </Ground>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Stacked logo</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
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
  { name: "Yellow", hex: "#FFCC00", rgb: "255 204 0", role: "The W square, highlights, buttons on dark", fg: "#111827" },
  { name: "Purple", hex: "#7030A0", rgb: "112 48 160", role: "The dot, Commander, buttons on light", fg: "#ffffff" },
  { name: "Ink", hex: "#111827", rgb: "17 24 39", role: "Text, the dark ground, the MCP tile", fg: "#ffffff" },
  { name: "White", hex: "#FFFFFF", rgb: "255 255 255", role: "The light ground", fg: "#111827" },
  { name: "Purple 300", hex: "#B98AE0", rgb: "185 138 224", role: "Commander on dark only", fg: "#111827" },
];

const CONTRAST = [
  { pair: "Ink on yellow", fg: "#111827", bg: "#FFCC00", ratio: "11.7 : 1", ok: true },
  { pair: "Ink on white", fg: "#111827", bg: "#FFFFFF", ratio: "17.7 : 1", ok: true },
  { pair: "Yellow on ink", fg: "#FFCC00", bg: "#111827", ratio: "11.7 : 1", ok: true },
  { pair: "White on purple", fg: "#FFFFFF", bg: "#7030A0", ratio: "8.0 : 1", ok: true },
  { pair: "Purple on white", fg: "#7030A0", bg: "#FFFFFF", ratio: "8.0 : 1", ok: true },
  { pair: "Yellow on purple", fg: "#FFCC00", bg: "#7030A0", ratio: "5.3 : 1", ok: true },
  { pair: "Purple 300 on ink", fg: "#B98AE0", bg: "#111827", ratio: "6.6 : 1", ok: true },
  { pair: "Yellow on white", fg: "#FFCC00", bg: "#FFFFFF", ratio: "1.5 : 1", ok: false },
  { pair: "Purple on ink", fg: "#7030A0", bg: "#111827", ratio: "2.2 : 1", ok: false },
];

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
          "inline-flex min-h-11 min-w-[6.5rem] cursor-pointer select-none items-center justify-center gap-1.5 rounded-md border border-solid border-slate-300 bg-white px-2.5 font-mono text-xs font-semibold text-slate-700 transition-colors hover:border-secondary-wopee hover:text-secondary-wopee dark:border-white/15 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-primary-wopee dark:hover:text-primary-wopee focus-visible:outline-offset-2",
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
        Yellow, purple and ink, with white. Purple 300 exists for one job: Commander on dark grounds. No other tints, no
        gradients in the logo, and no red.
      </SectionHead>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-6 lg:grid-cols-5">
        {COLOURS.map((c, i) => (
          <div key={c.hex} className={clsx(i < 3 ? "md:col-span-2" : "md:col-span-3", i === COLOURS.length - 1 && "col-span-2", "lg:col-span-1", "overflow-hidden rounded-2xl border border-solid border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.03]")}>
            <div
              className={clsx("flex h-24 items-end p-4 sm:h-32 lg:h-40", c.hex === "#FFFFFF" && "border-0 border-b border-solid border-slate-200 dark:border-transparent", c.hex === "#111827" && "dark:border-0 dark:border-b dark:border-solid dark:border-white/10")}
              style={{ background: c.hex, color: c.fg }}
            >
              <span className="text-lg font-bold">{c.name}</span>
            </div>
            <div className="flex flex-col gap-3 p-3 sm:p-4">
              <div className="flex flex-col items-start gap-2">
                <CopyHex hex={c.hex} />
                <span className="font-mono text-xs text-slate-500 dark:text-slate-400">RGB {c.rgb}</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">{c.role}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="mb-2 mt-14 text-lg font-semibold">Contrast</h3>
      <p className="mb-5 max-w-3xl text-slate-600 dark:text-slate-300">
        WCAG 2 ratios. Text needs 4.5 : 1 and graphics 3 : 1. Yellow on white and purple on ink fail, so the logo never
        uses them: the dark version swaps purple for yellow.
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CONTRAST.map((c, i) => (
          <div key={c.pair} className={clsx(i === CONTRAST.length - 1 && "sm:col-span-2 lg:col-span-1", "flex items-center gap-4 rounded-xl border border-solid border-slate-200 bg-white p-3 dark:border-white/10 dark:bg-white/[0.03]")}>
            <span
              className={clsx("flex h-12 w-16 shrink-0 items-center justify-center rounded-lg text-xl font-extrabold", c.bg === "#FFFFFF" && "ring-1 ring-inset ring-slate-200")}
              style={{ background: c.bg, color: c.fg }}
              aria-hidden="true"
            >
              Aa
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-slate-900 dark:text-white">{c.pair}</span>
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400">{c.ratio}</span>
            </span>
            <span
              className={clsx(
                "shrink-0 rounded-full px-2.5 py-1 text-xs font-bold",
                c.ok ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-300" : "bg-rose-100 text-rose-800 dark:bg-rose-400/15 dark:text-rose-300"
              )}
            >
              {c.ok ? "Pass" : "Fail"}
            </span>
          </div>
        ))}
      </div>
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
        <div className="rounded-2xl border border-solid border-slate-200 bg-white p-6 sm:p-8 dark:border-white/10 dark:bg-white/[0.03]">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-xl font-bold">Bungee</h3>
            <a href="https://fonts.google.com/specimen/Bungee" className="-my-3 inline-flex min-h-11 items-center text-sm font-semibold text-secondary-wopee dark:text-primary-wopee">
              Google Fonts
            </a>
          </div>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">The W in the logo, and Build &amp; Break titles</p>
          <p className="my-6 text-[96px] leading-none text-slate-900 sm:text-[128px] dark:text-white" style={{ fontFamily: 'Bungee, "Arial Black", sans-serif' }} aria-hidden="true">
            W
          </p>
          <p className="text-slate-600 dark:text-slate-300">
            Caps only. We use one glyph of it: the W. Never set the whole name in Bungee.
          </p>
        </div>
        <div className="rounded-2xl border border-solid border-slate-200 bg-white p-6 sm:p-8 dark:border-white/10 dark:bg-white/[0.03]">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-xl font-bold">Rubik</h3>
            <a href="https://fonts.google.com/specimen/Rubik" className="-my-3 inline-flex min-h-11 items-center text-sm font-semibold text-secondary-wopee dark:text-primary-wopee">
              Google Fonts
            </a>
          </div>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">“opee.io” in the logo, and all text</p>
          <p className="my-6 text-[96px] font-extrabold leading-none text-slate-900 sm:text-[128px] dark:text-white" aria-hidden="true">
            Aa
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-slate-600 dark:text-slate-300">
            <span className="font-normal">Regular 400</span>
            <span className="font-semibold">Semibold 600</span>
            <span className="font-extrabold">ExtraBold 800</span>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ---------- 07 clear space + size ----------

const XMark = () => (
  <span className="rounded bg-white px-1 font-mono text-[10px] font-bold leading-4 sm:px-1.5 sm:text-xs sm:leading-5 text-secondary-wopee ring-1 ring-secondary-wopee/40 dark:bg-[#1f1f22] dark:text-primary-wopee dark:ring-primary-wopee/40">x</span>
);

function SpaceSection() {
  return (
    <Section id="space">
      <SectionHead id="space" n="07" title="Clear space and minimum size">
        Keep one <em className="font-semibold not-italic">x</em> of empty space on every side, where x is the height of
        the “o”. Inside a nav bar, the bar’s padding counts.
      </SectionHead>
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex items-center justify-center rounded-2xl border border-solid border-slate-200 bg-white p-4 sm:p-10 dark:border-white/10 dark:bg-white/[0.03]">
          {/* x = the "o" height = 52/93.4 of the logo height = 9.57% of the box width (padding % is of the width on all sides) */}
          <div className="relative w-full max-w-[560px] rounded-lg bg-secondary-wopee/[0.06] p-[9.57%] ring-1 ring-inset ring-secondary-wopee/40 dark:bg-primary-wopee/[0.08] dark:ring-primary-wopee/40">
            <div className="bg-white ring-1 ring-secondary-wopee/40 dark:bg-[#1f1f22] dark:ring-primary-wopee/40">
              <ThemedImage
                sources={{ light: SVG("logo-horizontal-color-light"), dark: SVG("logo-horizontal-color-dark") }}
                alt="Wopee.io logo inside its clear-space box"
                width={439}
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
            { what: "Logo", min: "80\u00a0px wide", print: "20\u00a0mm", demo: <img src={SVG("logo-horizontal-color-light")} alt="Wopee.io logo at 80 pixels wide" width={80} height={17} style={{ width: 80, height: "auto" }} /> },
            { what: "Commander, MCP", min: "41\u00a0px tall", print: "30\u00a0mm", wide: true, demo: <img src={SVG("logo-horizontal-commander-color-light")} alt="Wopee.io Commander logo at 41 pixels tall" width={181} height={41} style={{ height: 41, width: "auto" }} /> },
            { what: "Symbol", min: "24\u00a0px", print: "6\u00a0mm", demo: <img src={SVG("symbol-color-light")} alt="Wopee.io symbol at 24 pixels" width={24} height={24} /> },
            { what: "Favicon", min: "16\u00a0px", print: "", demo: <img src="/img/favicon-16.svg" alt="Wopee.io favicon at 16 pixels" width={16} height={16} /> },
          ].map((r) => (
            <div key={r.what} className={clsx("flex items-center gap-4 rounded-xl border border-solid border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.03]", r.wide && "flex-wrap")}>
              <span className={clsx("flex shrink-0 items-center justify-center rounded-lg bg-white ring-1 ring-inset ring-slate-200 dark:ring-0", r.wide ? "h-14 w-[197px]" : "h-12 w-24")}>{r.demo}</span>
              <span>
                <span className="block font-semibold text-slate-900 dark:text-white">{r.what}</span>
                <span className="text-sm text-slate-600 dark:text-slate-300">
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

// ---------- 08 do and don't ----------

const L = SVG("logo-horizontal-color-light");
const D = SVG("wordmark-color-dark");
const logoImg = (src: string, alt: string, style?: React.CSSProperties, className = "h-9 w-auto max-w-full") => <img src={src} alt={alt} width={180} height={38} className={className} style={style} />;

const RULES: { ok: boolean; text: string; g: keyof typeof GROUNDS; art: React.ReactNode }[] = [
  { ok: true, text: "Use the light version on white and pale grounds.", g: "light", art: logoImg(L, "Correct: the light logo on white") },
  { ok: true, text: "Use the dark version on ink and dark photos.", g: "dark", art: logoImg(D, "Correct: the dark logo on ink") },
  { ok: true, text: "On yellow, the square turns ink.", g: "yellow", art: logoImg(SVG("logo-horizontal-on-yellow"), "Correct: the on-yellow logo on yellow") },
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
  { ok: false, text: "Don’t use the light version on dark. “opee.io” disappears.", g: "dark", art: logoImg(L, "Incorrect: the light logo on ink") },
  { ok: false, text: "Don’t recolour it, or add shadows, glows or outlines.", g: "light", art: logoImg(SVG("logo-horizontal-mono-ink"), "Incorrect: the logo recoloured red with a shadow", { filter: "invert(27%) sepia(91%) saturate(2352%) hue-rotate(346deg) brightness(104%) drop-shadow(3px 3px 0 #0ea5e9)" }) },
  { ok: false, text: "Don’t set yellow parts on white without the square.", g: "light", art: logoImg(D, "Incorrect: the dark logo on white") },
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
      <SectionHead id="rules" n="08" title="Do and don’t">
        Use the files as they are. If a layout needs something that is not here, ask us.
      </SectionHead>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {RULES.map((r) => (
          <figure key={r.text} className="m-0 rounded-2xl border border-solid border-slate-200 bg-white p-2 dark:border-white/10 dark:bg-white/[0.03]">
            <Ground g={r.g} className="h-24 overflow-hidden px-6 sm:h-32">
              {r.art}
            </Ground>
            <figcaption className="flex gap-2.5 px-3 pb-3 pt-3.5 text-sm text-slate-700 dark:text-slate-300">
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

// ---------- 09 download + contact ----------

const KIT_CONTENTS = [
  "Logo in every colour version, SVG and PNG",
  "Commander and MCP logos",
  "The symbol, favicons and app icons",
  "The monkey",
];

function DownloadSection() {
  return (
    <Section id="download">
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="relative overflow-hidden rounded-3xl bg-[#111827] p-7 text-white sm:p-10 dark:ring-1 dark:ring-inset dark:ring-white/10">
          <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary-wopee">09 · Download</p>
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">The brand kit</h2>
          <ul className="m-0 mt-6 list-none space-y-2.5 p-0">
            {KIT_CONTENTS.map((t) => (
              <li key={t} className="flex gap-2.5 text-pretty text-slate-200">
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
            <span className="text-sm text-slate-400">{KIT.size} · free to use when you write about or work with Wopee.io</span>
          </div>
        </div>
        <div className="flex flex-col justify-start gap-6 rounded-3xl border border-solid border-slate-200 bg-white p-7 sm:p-10 dark:border-white/10 dark:bg-white/[0.03]">
          <div>
            <h2 className="text-2xl font-bold">Questions</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
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
          <p className="mb-5 inline-flex rounded-full border border-solid border-secondary-wopee/25 bg-secondary-wopee/10 px-4 py-1.5 text-sm font-semibold text-secondary-wopee dark:border-primary-wopee/25 dark:bg-primary-wopee/10 dark:text-primary-wopee">
            Brand kit
          </p>
          <h1 className="text-balance text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            The <WopeeIo display /> logo, colours and type
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 dark:text-slate-300">
            Everything you need to show <WopeeIo /> in an article, a slide or a partner page, and the few rules that keep
            it looking right.
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
          <Ground g="dark" className="h-28 rounded-2xl px-4 sm:h-36">
            <img src={D} alt="Wopee.io logo on ink" width={150} height={32} className="h-7 w-auto max-w-full sm:h-9" />
          </Ground>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <Ground g="yellow" className="h-28 rounded-2xl sm:h-36">
              <img src={SVG("symbol-on-yellow")} alt="Wopee.io symbol on yellow" width={56} height={56} className="h-11 w-11 sm:h-14 sm:w-14" />
            </Ground>
            <Ground g="purple" className="h-28 rounded-2xl sm:h-36">
              <img src={SVG("symbol-color-light")} alt="Wopee.io symbol on purple" width={56} height={56} className="h-11 w-11 sm:h-14 sm:w-14" />
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
    <nav aria-label="On this page" className="sticky top-[var(--ifm-navbar-height)] z-20 border-0 border-y border-solid border-slate-200 bg-[color:var(--ifm-navbar-background-color)] dark:border-white/10">
      <div className={wrap}>
        <ul ref={row} data-more={more} className="no-scrollbar page-nav -mx-3 my-0 flex list-none gap-1 overflow-x-auto p-0 py-1">
          {NAV.map(([id, label]) => (
            <li key={id} className="shrink-0">
              <a
                href={`#${id}`}
                className={clsx(
                  "inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-slate-600 no-underline transition-colors hover:bg-slate-100 hover:text-slate-900 hover:no-underline dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white",
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
      <main className="overflow-x-clip">
        <Hero />
        <PageNav />
        <LogoSection />
        <SymbolSection />
        <ProductsSection />
        <MascotSection />
        <ColourSection />
        <TypeSection />
        <SpaceSection />
        <RulesSection />
        <DownloadSection />
      </main>
    </Layout>
  );
}
