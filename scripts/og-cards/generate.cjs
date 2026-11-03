#!/usr/bin/env node
// Open Graph share cards (1200x630 PNG) for wopee.io.
//
//   node scripts/og-cards/generate.cjs            render new or changed cards
//   node scripts/og-cards/generate.cjs --force    re-render everything
//   node scripts/og-cards/generate.cjs --check    exit 1 if a card is missing, stale or over 150 KB (no browser)
//   node scripts/og-cards/generate.cjs --write-punchlines   add a derived og_punchline to entries that lack one
//   node scripts/og-cards/generate.cjs --only changelog,blog,pages  --limit 5  --site <dir>
//
// Cards: static/img/og/{changelog,blog,pages}/<slug>.png, plus static/img/og/manifest.json
// ({ "<permalink>": { image, width, height, alt, hash } }) that the theme reads to emit og:image.
// A card is re-rendered only when its inputs (front matter, GIF bytes, author, templates) change.
// The card is built for LinkedIn's ~138 px thumbnail: a 2-5 word punchline in huge type, not the title
// (the title already shows next to the thumbnail).
// Front matter: og_punchline (the card text, \n for a forced line break; when missing it is derived from the title),
// og_frame (GIF frame: 0-based index or "last"), og_gif (screenshot source, defaults to /img/changelog/<slug>.gif).
"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const matter = require("gray-matter");
const yaml = require("js-yaml");
const sharp = require("sharp");

const args = process.argv.slice(2);
const flag = (n) => args.includes("--" + n);
const opt = (n, d) => {
  const i = args.indexOf("--" + n);
  return i >= 0 && args[i + 1] ? args[i + 1] : d;
};

const SITE = path.resolve(opt("site", path.join(__dirname, "..", "..")));
const OUT = path.join(SITE, "static", "img", "og");
const TPL = path.join(__dirname, "templates");
const ONLY = opt("only", "changelog,blog,pages").split(",");
const LIMIT = Number(opt("limit", "0")) || Infinity;
const CONCURRENCY = Number(opt("concurrency", "4"));
const MAX_BYTES = 150 * 1024;
const W = 1200;
const H = 630;

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const fmtDate = (iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
};
const sha = (...parts) => {
  const h = crypto.createHash("sha1");
  for (const p of parts) h.update(typeof p === "string" ? p : JSON.stringify(p) ?? "");
  return h.digest("hex").slice(0, 16);
};

// Every file in templates/ feeds every hash, so a design change re-renders all cards.
const templateHash = (() => {
  const files = [];
  const walk = (d) =>
    fs.readdirSync(d, { withFileTypes: true }).forEach((e) => {
      const p = path.join(d, e.name);
      e.isDirectory() ? walk(p) : files.push(p);
    });
  walk(TPL);
  const h = crypto.createHash("sha1");
  files.sort().forEach((f) => h.update(f.slice(TPL.length)).update(fs.readFileSync(f)));
  h.update(fs.readFileSync(__filename));
  return h.digest("hex");
})();

// Short card text from a title: the title itself at 5 words or fewer, else its first clause
// (before ":", "?", ",", " - ") when that has 2-5 words, else the first 5 words without a dangling
// small word. `--write-punchlines` writes the result into front matter for review.
const SMALL = new Set(["a", "an", "the", "and", "or", "of", "to", "for", "with", "in", "on", "that", "your", "its", "via", "by", "how", "it", "each", "is", "are", "as", "from", "only", "than"]);
const words = (s) => s.trim().split(/\s+/).filter(Boolean);
function derivePunchline(title) {
  const t = String(title || "").replace(/["“”]/g, "").trim();
  if (words(t).length <= 5) return t;
  for (const sep of [/:\s/, /\?\s/, /,\s/, /\s[-–]\s/]) {
    const head = t.split(sep)[0].trim();
    const n = words(head).length;
    if (head !== t && n >= 2 && n <= 5) return head;
  }
  let w = words(t.split(/[:?,]\s/)[0]).slice(0, 5);
  while (w.length > 2 && SMALL.has(w[w.length - 1].toLowerCase())) w.pop();
  return w.join(" ");
}

const fileHash = (p) => (p && fs.existsSync(p) ? crypto.createHash("sha1").update(fs.readFileSync(p)).digest("hex") : "");

// ---------- collect jobs ----------

function slugFromName(name) {
  return name.replace(/\.(md|mdx)$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
}
function dateFrom(fm, name) {
  if (fm.date) return new Date(fm.date).toISOString().slice(0, 10);
  const m = name.match(/^(\d{4}-\d{2}-\d{2})/);
  return m ? m[1] : null;
}

function changelogJobs() {
  const dir = path.join(SITE, "changelog");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => {
      const { data: fm, content } = matter(fs.readFileSync(path.join(dir, f), "utf8"));
      const slug = fm.slug || slugFromName(f);
      const date = dateFrom(fm, f);
      // GIF: front matter og_gif, else static/img/changelog/<slug>.gif, else the first /img/changelog/*.gif in the body.
      let gif = fm.og_gif || `/img/changelog/${slug}.gif`;
      if (!fs.existsSync(path.join(SITE, "static", gif))) {
        const m = content.match(/\/img\/changelog\/[\w.-]+\.(gif|png|webp|jpe?g)/);
        gif = m ? m[0] : null;
      }
      const gifPath = gif ? path.join(SITE, "static", gif) : null;
      return {
        type: "changelog",
        permalink: `/changelog/${slug}/`,
        out: `changelog/${slug}.png`,
        file: path.join(dir, f),
        hasPunchline: Boolean(fm.og_punchline),
        data: {
          kicker: date ? `CHANGELOG · ${fmtDate(date)}` : "CHANGELOG",
          punchline: String(fm.og_punchline || derivePunchline(fm.title)),
        },
        gifPath,
        gifFrame: fm.og_frame ?? "auto",
        sortKey: date || "",
      };
    })
    .sort((a, b) => b.sortKey.localeCompare(a.sortKey));
}

function loadAuthors() {
  const p = path.join(SITE, "blog", "authors.yml");
  return fs.existsSync(p) ? yaml.load(fs.readFileSync(p, "utf8")) || {} : {};
}

function authorImage(key, a) {
  for (const ext of ["jpg", "png", "webp"]) {
    const p = path.join(SITE, "static", "img", "team", `${key}.${ext}`);
    if (fs.existsSync(p)) return { file: p };
  }
  if (a.image_url && a.image_url.startsWith("/")) return { file: path.join(SITE, "static", a.image_url) };
  if (a.image_url) return { url: a.image_url };
  return null;
}

function blogJobs() {
  const dir = path.join(SITE, "blog");
  if (!fs.existsSync(dir)) return [];
  const authors = loadAuthors();
  const entries = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    let file = null;
    if (e.isDirectory()) {
      file = ["index.md", "index.mdx"].map((n) => path.join(dir, e.name, n)).find((p) => fs.existsSync(p));
    } else if (/\.mdx?$/.test(e.name)) file = path.join(dir, e.name);
    if (!file) continue;
    const { data: fm } = matter(fs.readFileSync(file, "utf8"));
    if (fm.draft) continue;
    const slug = fm.slug || slugFromName(e.name);
    const date = dateFrom(fm, e.name);
    const key = Array.isArray(fm.authors) ? fm.authors[0] : fm.authors;
    const a = typeof key === "string" ? authors[key] : key;
    entries.push({
      type: "blog",
      permalink: `/blog/${slug}/`,
      out: `blog/${slug}.png`,
      file,
      hasPunchline: Boolean(fm.og_punchline),
      data: {
        kicker: date ? `BLOG · ${fmtDate(date)}` : "BLOG",
        punchline: String(fm.og_punchline || derivePunchline(fm.title)),
        author: a ? { name: a.name } : null,
      },
      avatar: a ? authorImage(typeof key === "string" ? key : "", a) : null,
      sortKey: date || "",
    });
  }
  return entries.sort((a, b) => b.sortKey.localeCompare(a.sortKey));
}

function pageJobs() {
  const p = path.join(__dirname, "pages.json");
  if (!fs.existsSync(p)) return [];
  return JSON.parse(fs.readFileSync(p, "utf8")).map((pg) => ({
    type: "page",
    permalink: pg.permalink,
    out: `pages/${pg.id}.png`,
    data: { kicker: pg.kicker, punchline: pg.punchline || derivePunchline(pg.title) },
    alt: pg.alt,
  }));
}

// ---------- inputs that need bytes ----------

const CACHE = path.join(SITE, "node_modules", ".cache", "og-cards");

// Which GIF frame goes on the card: front matter og_frame (a 0-based index or "last"), else "auto":
// the first frame unless it is a near-empty screen (an empty state, a loading page), in which case
// the busiest of 12 evenly spaced frames (highest grey-level entropy of the top part the card shows).
async function pickFrame(file, want) {
  const { pages = 1 } = await sharp(file).metadata();
  if (want === "last") return pages - 1;
  if (Number.isInteger(want)) return Math.min(Math.max(want, 0), pages - 1);
  const entropy = async (i) => {
    const img = sharp(file, { page: i });
    const { width, height } = await img.metadata();
    const top = Math.min(height, Math.round(width * 0.75));
    return (await img.extract({ left: 0, top: 0, width, height: top }).greyscale().stats()).entropy;
  };
  const first = await entropy(0);
  if (first >= 2.8 || pages < 2) return 0;
  let best = { i: 0, e: first };
  for (let k = 1; k < 12; k++) {
    const i = Math.round((k * (pages - 1)) / 11);
    const e = await entropy(i);
    if (e > best.e + 0.05) best = { i, e };
  }
  return best.i;
}

async function shotDataUrl(file, want) {
  const page = await pickFrame(file, want);
  const buf = await sharp(file, { page }).resize({ width: 1096, withoutEnlargement: true }).jpeg({ quality: 82 }).toBuffer();
  return "data:image/jpeg;base64," + buf.toString("base64");
}

async function avatarDataUrl(src) {
  if (!src) return null;
  let buf;
  if (src.file) buf = fs.readFileSync(src.file);
  else {
    const cached = path.join(CACHE, "avatars", sha(src.url) + ".img");
    if (fs.existsSync(cached)) buf = fs.readFileSync(cached);
    else {
      try {
        const res = await fetch(src.url);
        if (!res.ok) return null;
        buf = Buffer.from(await res.arrayBuffer());
        fs.mkdirSync(path.dirname(cached), { recursive: true });
        fs.writeFileSync(cached, buf);
      } catch {
        return null;
      }
    }
  }
  const out = await sharp(buf).resize(144, 144, { fit: "cover", position: "attention" }).jpeg({ quality: 85 }).toBuffer();
  return "data:image/jpeg;base64," + out.toString("base64");
}

function jobHash(job) {
  const avatarKey = job.avatar ? (job.avatar.file ? fileHash(job.avatar.file) : job.avatar.url) : "";
  return sha(templateHash, job.type, job.data, job.alt ?? "", fileHash(job.gifPath), String(job.gifFrame ?? ""), avatarKey);
}

// ---------- render ----------

async function launch() {
  const { chromium } = require("playwright-core");
  const tries = [
    process.env.OG_CHROME ? { executablePath: process.env.OG_CHROME } : null,
    {}, // bundled chromium headless shell: launches and quits in under a second
    { channel: "chrome" }, // installed Google Chrome: fine, but quitting it can take ~10 s on macOS
  ].filter(Boolean);
  let last;
  for (const t of tries) {
    try {
      return await chromium.launch({
        headless: true,
        args: ["--disable-background-timer-throttling", "--disable-renderer-backgrounding", "--disable-backgrounding-occluded-windows"],
        ...t,
      });
    } catch (e) {
      last = e;
    }
  }
  throw last;
}

// Mean per-channel difference between two encodings of the same 1200x630 image.
async function drift(a, b) {
  const [x, y] = await Promise.all([a, b].map((i) => sharp(i).removeAlpha().raw().toBuffer()));
  let sum = 0;
  for (let i = 0; i < x.length; i++) sum += Math.abs(x[i] - y[i]);
  return sum / x.length;
}

// 256-colour PNG (no dithering: libimagequant's dither paints ghost shapes into flat dark areas),
// checked against the screenshot; full-colour PNG if quantizing visibly changed the card.
async function compress(png) {
  for (const colors of [256, 160]) {
    const out = await sharp(png).png({ palette: true, colors, quality: 95, effort: 3, dither: 0 }).toBuffer();
    if (out.length <= MAX_BYTES && (await drift(png, out)) < 1.5) return out;
  }
  return sharp(png).png({ compressionLevel: 9, adaptiveFiltering: true }).toBuffer();
}

async function renderAll(jobs) {
  const dbg = (m, t0) => process.env.OG_DEBUG && console.error(m, Date.now() - t0, "ms");
  let t0 = Date.now();
  const browser = await launch();
  dbg("launch", t0);
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  const queue = jobs.slice();
  const results = [];
  const worker = async () => {
    const page = await ctx.newPage();
    for (let job; (job = queue.shift()); ) {
      const t = [Date.now()];
      const tpl = { changelog: "changelog.html", blog: "blog.html", page: "page.html" }[job.type];
      await page.goto("file://" + path.join(TPL, tpl));
      t.push(Date.now());
      const data = JSON.parse(JSON.stringify(job.data));
      if (job.gifPath && fs.existsSync(job.gifPath)) data.shot = await shotDataUrl(job.gifPath, job.gifFrame);
      if (job.avatar && data.author) data.author.image = await avatarDataUrl(job.avatar);
      t.push(Date.now());
      const info = await page.evaluate((d) => window.renderCard(d), data);
      t.push(Date.now());
      const raw = await page.screenshot({ type: "png", clip: { x: 0, y: 0, width: W, height: H } });
      t.push(Date.now());
      const png = await compress(raw);
      t.push(Date.now());
      if (process.env.OG_DEBUG) console.error(job.out, "goto/inputs/render/shot/png ms:", t.slice(1).map((x, i) => x - t[i]).join(" "));
      const dest = path.join(OUT, job.out);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, png);
      results.push({ job, bytes: png.length, info });
    }
    await page.close();
  };
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, jobs.length) }, worker));
  t0 = Date.now();
  // Quitting the browser can stall for seconds on a busy host; Playwright kills it on exit anyway.
  await Promise.race([browser.close(), new Promise((r) => setTimeout(r, 2000))]);
  dbg("close", t0);
  return results;
}

// ---------- main ----------

(async () => {
  const t0 = Date.now();
  let jobs = [];
  if (ONLY.includes("changelog")) jobs.push(...changelogJobs());
  if (ONLY.includes("blog")) jobs.push(...blogJobs().slice(0, LIMIT));
  if (ONLY.includes("pages")) jobs.push(...pageJobs());

  const manifestPath = path.join(OUT, "manifest.json");
  const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, "utf8")) : {};
  for (const j of jobs) j.hash = jobHash(j);
  const stale = jobs.filter(
    (j) => flag("force") || manifest[j.permalink]?.hash !== j.hash || !fs.existsSync(path.join(OUT, j.out)),
  );

  const full = ONLY.length === 3 && LIMIT === Infinity;
  const known = new Set(jobs.map((j) => j.permalink));
  const orphans = full ? Object.keys(manifest).filter((k) => !known.has(k)) : [];

  if (flag("write-punchlines")) {
    let n = 0;
    for (const j of jobs.filter((x) => x.file && !x.hasPunchline)) {
      const src = fs.readFileSync(j.file, "utf8");
      const line = `og_punchline: ${JSON.stringify(j.data.punchline)}`;
      const out = src.replace(/^(---\r?\n[\s\S]*?^title:.*$)/m, `$1\n${line}`);
      if (out === src) continue;
      fs.writeFileSync(j.file, out);
      console.log(`${path.relative(SITE, j.file)}: ${line}`);
      n++;
    }
    console.log(`${n} punchlines written`);
    process.exit(0);
  }

  if (flag("check")) {
    stale.forEach((j) => console.log("stale:", j.out));
    const big = jobs.filter((j) => !stale.includes(j) && fs.statSync(path.join(OUT, j.out)).size > MAX_BYTES);
    big.forEach((j) => console.log(`over ${MAX_BYTES / 1024} KB:`, j.out));
    stale.push(...big);
    orphans.forEach((k) => console.log("orphan manifest entry:", k));
    console.log(`${jobs.length - stale.length}/${jobs.length} cards up to date`);
    if (stale.length || orphans.length) console.log("Run `yarn og:cards` and commit static/img/og/.");
    process.exit(stale.length || orphans.length ? 1 : 0);
  }

  for (const k of orphans) {
    const file = path.join(SITE, "static", manifest[k].image.split("?")[0]);
    if (fs.existsSync(file)) fs.unlinkSync(file);
    delete manifest[k];
  }

  const results = stale.length ? await renderAll(stale) : [];
  for (const r of results) {
    // ?v=<hash> busts LinkedIn, Slack and CDN caches whenever the card changes.
    manifest[r.job.permalink] = {
      image: `/img/og/${r.job.out}?v=${r.job.hash.slice(0, 8)}`,
      width: W,
      height: H,
      alt: r.job.alt || r.job.data.punchline.replace(/\s*\n\s*/g, " "),
      hash: r.job.hash,
    };
    const kb = (r.bytes / 1024).toFixed(0);
    const fitNote = `${r.info.size}px/${r.info.lines}l${r.info.overflow ? " OVERFLOW" : ""}`;
    console.log(`${r.bytes > MAX_BYTES ? "OVER " : ""}${kb.padStart(4)} KB  ${fitNote.padEnd(10)} ${r.job.out}${r.info.hasShot ? "  (gif)" : ""}`);
  }
  const sorted = Object.fromEntries(Object.keys(manifest).sort().map((k) => [k, manifest[k]]));
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(manifestPath, JSON.stringify(sorted, null, 2) + "\n");
  console.log(`${results.length} rendered, ${jobs.length - stale.length} unchanged, ${((Date.now() - t0) / 1000).toFixed(1)} s`);
  process.exit(0);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
