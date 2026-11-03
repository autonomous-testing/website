// Post-build SEO guard: fails when an indexable page ships a <title> over 60
// characters, a meta description under 110 or over 160, an <img> with empty alt text,
// or a share card (og:image) that is missing, not PNG/JPEG, off 1.91:1, over 300 KB,
// or whose og:image:width/height/alt don't match the file.
// Runs against build/ after `docusaurus build` (see .github/workflows/test-deploy.yml).

const fs = require("fs");
const path = require("path");

const BUILD = path.join(__dirname, "..", "build");
const MAX_TITLE = 60;
const MIN_DESCRIPTION = 110;
const MAX_DESCRIPTION = 160;
const MAX_OG_BYTES = 300 * 1024; // WhatsApp drops larger previews
const SITE_ORIGIN = "https://wopee.io";

const meta = (html, attr, key) => {
  const tags = html.match(new RegExp(`<meta[^>]+${attr}="${key}"[^>]*>`, "gi")) || [];
  return tags.map((t) => decode((t.match(/content="([^"]*)"/i) || [, ""])[1]));
};

// Pixel size from the PNG IHDR or the JPEG SOF marker.
function imageSize(buf) {
  if (buf.slice(1, 4).toString() === "PNG") return { type: "png", width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    for (let i = 2; i < buf.length; ) {
      const marker = buf[i + 1];
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker))
        return { type: "jpeg", width: buf.readUInt16BE(i + 7), height: buf.readUInt16BE(i + 5) };
      i += 2 + buf.readUInt16BE(i + 2);
    }
  }
  return null;
}

function checkOgImage(html, route) {
  const out = [];
  const images = meta(html, "property", "og:image");
  if (images.length !== 1) return [`${route}  ${images.length} og:image tags`];
  const [src] = images;
  const [w] = meta(html, "property", "og:image:width");
  const [h] = meta(html, "property", "og:image:height");
  const [alt] = meta(html, "property", "og:image:alt");
  if (!w || !h || !alt) out.push(`${route}  og:image:width/height/alt missing`);
  // Blog posts and changelog entries need their generated card (scripts/og-cards), not the default.
  const isPost = meta(html, "property", "og:type").includes("article");
  if (isPost && !src.startsWith(SITE_ORIGIN + "/img/og/")) out.push(`${route}  post without a generated card (run yarn og:cards): ${src}`);
  if (isPost && src.includes("/img/og/pages/")) out.push(`${route}  post falls back to the default card (run yarn og:cards)`);
  if (!src.startsWith(SITE_ORIGIN + "/")) return out; // external (YouTube thumbnails): tags only
  const file = path.join(BUILD, decodeURI(src.slice(SITE_ORIGIN.length).split("?")[0]));
  if (!fs.existsSync(file)) return [...out, `${route}  og:image not in build: ${src}`];
  const buf = fs.readFileSync(file);
  const size = imageSize(buf);
  if (!size) return [...out, `${route}  og:image is not PNG or JPEG: ${src}`];
  const ratio = size.width / size.height;
  if (size.width < 1200 || ratio < 1.85 || ratio > 1.95) out.push(`${route}  og:image ${size.width}x${size.height}, want >= 1200 wide at 1.91:1`);
  if (buf.length > MAX_OG_BYTES) out.push(`${route}  og:image ${Math.round(buf.length / 1024)} KB > 300 KB`);
  if (w && h && (Number(w) !== size.width || Number(h) !== size.height)) out.push(`${route}  og:image:width/height ${w}x${h} but file is ${size.width}x${size.height}`);
  return out;
}

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

function* htmlFiles(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(full);
    else if (entry.name === "index.html") yield full;
  }
}

const problems = [];
let checked = 0;

for (const file of htmlFiles(BUILD)) {
  const html = fs.readFileSync(file, "utf8");
  if (/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html)) continue;
  if (/http-equiv="refresh"/i.test(html)) continue;
  checked++;
  const route = "/" + path.relative(BUILD, path.dirname(file)).split(path.sep).join("/");

  const title = decode((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [, ""])[1].trim());
  if (title.length > MAX_TITLE) problems.push(`${route}  title ${title.length} > ${MAX_TITLE}: ${title}`);

  const desc = decode((html.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i) || [, ""])[1]);
  if (desc.length > MAX_DESCRIPTION) problems.push(`${route}  description ${desc.length} > ${MAX_DESCRIPTION}`);
  if (desc.length > 0 && desc.length < MIN_DESCRIPTION) problems.push(`${route}  description ${desc.length} < ${MIN_DESCRIPTION}`);

  const emptyAlt = (html.match(/<img\b[^>]*>/gi) || []).filter((tag) => /\balt=""/.test(tag) || !/\balt=/.test(tag));
  if (emptyAlt.length) problems.push(`${route}  ${emptyAlt.length} <img> without alt text`);

  problems.push(...checkOgImage(html, route));
}

if (problems.length) {
  console.error(`SEO check failed on ${problems.length} issue(s) across ${checked} indexable pages:\n`);
  for (const p of problems) console.error("  " + p);
  process.exit(1);
}
console.log(`SEO check passed: ${checked} indexable pages.`);
