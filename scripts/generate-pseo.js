// Programmatic SEO page generator (#98).
//
// Reads data/pseo-pages.json and writes one .mdx landing page per entry into
// generated/pseo/. A second @docusaurus/plugin-content-pages instance (see
// docusaurus.config.js, id: "pseo") serves that folder at the site root, so
// slug "ai-testing-react" is published at /ai-testing-react/.
//
// Runs automatically before every build via the "prebuild" npm script, so the
// generated output is NOT committed (generated/ is gitignored). Reviewers
// review the template (this file) and the data (pseo-pages.json) instead.

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const DATA = path.join(ROOT, "data", "pseo-pages.json");
const OUT = path.join(ROOT, "generated", "pseo");

const titleize = (slug) =>
  slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const h1For = (page) =>
  page.category === "use-case" ? `AI ${page.subject}` : `AI Testing for ${page.subject}`;

// Inline JSON-LD as JSX-safe dangerouslySetInnerHTML (mirrors the comparison
// blog posts). Escape for a single-quoted JS string and neutralise "<".
const jsonLdScript = (obj) => {
  const safe = JSON.stringify(obj)
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'")
    .replace(/</g, "\\u003c");
  return `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '${safe}' }} />`;
};

const mdTable = ({ header, rows }) => {
  const line = (cells) => `| ${cells.join(" | ")} |`;
  return [
    line(header),
    line(header.map(() => "---")),
    ...rows.map((r) => line(r)),
  ].join("\n");
};

function renderPage(page, bySlug) {
  const h1 = h1For(page);
  const isUseCase = page.category === "use-case";
  const subjLower = page.subject.charAt(0).toLowerCase() + page.subject.slice(1);
  const painHeading = isUseCase ? `Why ${subjLower} is hard` : `Why testing ${page.subject} is hard`;
  const solutionHeading = isUseCase
    ? `How Wopee.io approaches ${subjLower}`
    : `How Wopee.io tests ${page.subject}`;
  const ctaHeading = isUseCase
    ? `Start ${subjLower} with Wopee.io`
    : `Start testing ${page.subject} with AI`;
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  // Only link to related pages that actually exist in the dataset, so we never
  // ship broken internal links while a batch is partial.
  const related = (page.related || [])
    .filter((slug) => bySlug[slug])
    .map((slug) => `- [${bySlug[slug].linkLabel}](/${slug}/)`);

  const steps = page.steps.map((s, i) => `${i + 1}. ${s}`).join("\n");
  const faqMd = page.faqs
    .map((f) => `### ${f.q}\n\n${f.a}`)
    .join("\n\n");

  return `---
title: "${page.title.replace(/"/g, '\\"')}"
description: "${page.description.replace(/"/g, '\\"')}"
keywords: [${page.keyword.split(",").map((k) => `"${k.trim()}"`).join(", ")}]
---

${jsonLdScript(faqLd)}

# ${h1}

${page.aioOpener}

## ${painHeading}

${page.problem}

## ${solutionHeading}

${page.solution}

## How to get started

${steps}

## ${page.subject}: approach comparison

${mdTable(page.comparison)}

## ${ctaHeading}

Generate your first autonomous tests in minutes — no brittle selectors, no manual baselines. [Book a demo](/book-demo/) or [see pricing](/pricing/) to get started.

## Frequently asked questions

${faqMd}
${related.length ? `\n## Related\n\n${related.join("\n")}\n` : ""}`;
}

function main() {
  const raw = JSON.parse(fs.readFileSync(DATA, "utf8"));
  const pages = raw.pages || [];

  const bySlug = {};
  for (const p of pages) {
    bySlug[p.slug] = {
      ...p,
      linkLabel: p.category === "use-case" ? `AI ${p.subject}` : `AI Testing for ${p.subject}`,
    };
  }

  // Clean + recreate output dir so removed entries don't leave stale pages.
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

  for (const page of pages) {
    const file = path.join(OUT, `${page.slug}.mdx`);
    fs.writeFileSync(file, renderPage(page, bySlug));
  }

  console.log(`[pseo] generated ${pages.length} page(s) into generated/pseo/`);
}

main();
