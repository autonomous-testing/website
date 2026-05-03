// Tiny Docusaurus plugin that exposes a flat index of all blog posts via
// globalData so client components (e.g. RelatedPosts) can render tag-based
// related lists. Avoids depending on `gray-matter` by parsing the YAML
// frontmatter block with a small regex.
//
// Cover images are intentionally NOT included: the official blog plugin
// resolves collocated images through Webpack (hashed paths). Re-resolving
// them here would require duplicating that pipeline. Related-post cards
// fall back to a gradient placeholder.

const fs = require("fs");
const path = require("path");

const FRONTMATTER_RE = /^---\s*\n([\s\S]*?)\n---/;

function parseFrontmatter(raw) {
  const match = raw.match(FRONTMATTER_RE);
  if (!match) return null;
  const lines = match[1].split("\n");
  const data = {};
  let currentKey = null;
  for (const line of lines) {
    if (!line.trim()) continue;
    // simple `key: value` (value may be quoted)
    const kv = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (kv) {
      currentKey = kv[1];
      let value = kv[2].trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      // tag-array form: `tags: [a, b, c]`
      if (value.startsWith("[") && value.endsWith("]")) {
        data[currentKey] = value
          .slice(1, -1)
          .split(",")
          .map((s) => s.trim().replace(/^["']|["']$/g, ""))
          .filter(Boolean);
      } else if (value === "") {
        data[currentKey] = [];
      } else {
        data[currentKey] = value;
      }
    } else if (currentKey && /^\s*-\s+/.test(line)) {
      // list-item form
      if (!Array.isArray(data[currentKey])) data[currentKey] = [];
      data[currentKey].push(line.replace(/^\s*-\s+/, "").trim().replace(/^["']|["']$/g, ""));
    }
  }
  return data;
}

function dateFromDirName(name) {
  // e.g. "2024-12-19-ai-testing-agents" → "2024-12-19"
  const m = name.match(/^(\d{4}-\d{2}-\d{2})-/);
  return m ? m[1] : null;
}

function slugFromFrontmatter(fm, dirName) {
  if (fm && fm.slug) return fm.slug;
  if (!dirName) return null;
  return dirName.replace(/^\d{4}-\d{2}-\d{2}-/, "");
}

module.exports = function blogRelatedPlugin(context) {
  return {
    name: "wopee-blog-related",

    async loadContent() {
      const blogDir = path.join(context.siteDir, "blog");
      if (!fs.existsSync(blogDir)) return { posts: [] };

      const entries = fs.readdirSync(blogDir, { withFileTypes: true });
      const posts = [];

      for (const entry of entries) {
        if (!entry.isDirectory()) continue;
        if (entry.name.startsWith("2019")) continue; // matches blog.exclude
        const indexPath = path.join(blogDir, entry.name, "index.md");
        if (!fs.existsSync(indexPath)) continue;
        const raw = fs.readFileSync(indexPath, "utf8");
        const fm = parseFrontmatter(raw) || {};
        const slug = slugFromFrontmatter(fm, entry.name);
        if (!slug) continue;
        const date = fm.date || dateFromDirName(entry.name) || "";
        const tags = Array.isArray(fm.tags) ? fm.tags : [];
        posts.push({
          slug,
          permalink: `/blog/${slug}/`,
          title: fm.title || slug,
          description: fm.description || "",
          tags,
          date,
        });
      }

      // newest first
      posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
      return { posts };
    },

    async contentLoaded({ content, actions }) {
      actions.setGlobalData(content);
    },
  };
};
