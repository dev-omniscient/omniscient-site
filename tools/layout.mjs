// Puts the shared head, header and footer into every page, stamps the CSS and JS links, then writes sitemap.xml.
// Edit partials/*.html or assets/*.css, then run: node tools/layout.mjs
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const read = (f) => readFileSync(join(root, "partials", f), "utf8").trim();
const parts = { head: read("head.html"), header: read("header.html"), footer: read("footer.html") };

// Each CSS and JS link gets ?v=<hash of the file>, so a changed file skips the browser cache.
const version = (name) => createHash("sha1").update(readFileSync(join(root, "assets", name))).digest("hex").slice(0, 8);

const skip = new Set(["node_modules", ".git", "partials", "tools", "assets"]);
function pages(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return skip.has(name) ? [] : pages(p);
    return name.endsWith(".html") ? [p] : [];
  });
}

const urls = [];
const files = pages(root);
for (const file of files) {
  let html = readFileSync(file, "utf8");
  for (const [name, content] of Object.entries(parts)) {
    const re = new RegExp(`<!-- ${name}:start -->[\\s\\S]*?<!-- ${name}:end -->`);
    html = html.replace(re, () => `<!-- ${name}:start -->\n${content}\n<!-- ${name}:end -->`);
  }
  html = html.replace(/(href|src)="\/assets\/([\w.-]+\.(?:css|js))(\?v=\w+)?"/g, (_, attr, name) => `${attr}="/assets/${name}?v=${version(name)}"`);
  writeFileSync(file, html);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const noindex = /<meta name="robots" content="[^"]*noindex/.test(html);
  if (canonical && !noindex) urls.push(canonical);
}

const today = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...new Set(urls)].sort().map((u) => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>
`;
writeFileSync(join(root, "sitemap.xml"), xml);
console.log(`Updated ${files.length} pages, ${urls.length} URLs in sitemap.xml`);
