// Post-build SEO guard: fails when an indexable page ships a <title> over 60
// characters, a meta description under 110 or over 160, or an <img> with empty alt text.
// Runs against build/ after `docusaurus build` (see .github/workflows/test-deploy.yml).

const fs = require("fs");
const path = require("path");

const BUILD = path.join(__dirname, "..", "build");
const MAX_TITLE = 60;
const MIN_DESCRIPTION = 110;
const MAX_DESCRIPTION = 160;

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
}

if (problems.length) {
  console.error(`SEO check failed on ${problems.length} issue(s) across ${checked} indexable pages:\n`);
  for (const p of problems) console.error("  " + p);
  process.exit(1);
}
console.log(`SEO check passed: ${checked} indexable pages.`);
