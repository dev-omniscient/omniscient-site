// Blog covers: writes the preview page (docs/blog-covers.html) and the 1200x630 share image of every post.
// Each post (blog/<slug>/index.html) holds its cover as <div class="cover ...">. Its share image is saved to
// assets/img/blog/<slug>.png, the file the post's og:image points to.
// Run: node tools/blog/covers.mjs   (needs Playwright with Chromium)
import { createServer } from "node:http";
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { createRequire } from "node:module";
import { cover, CATEGORIES } from "./art.mjs";

const root = new URL("../..", import.meta.url).pathname;

// 1. The preview page: every category at hero, card and text sizes
const samples = {
  pipeline: "Write the first line <span>your buyer reads to the end</span>",
  crm: "A CRM that fills itself <span>from every email and call</span>",
  "deal-room": "Send one link <span>that holds the whole proposal</span>",
  guides: "Omniscient 101 <span>your first day in five steps</span>",
  product: "New in October <span>what shipped this month</span>",
  company: "Why we built Omniscient <span>the whole deal in one place</span>",
};
const card = (category, title) => `<a class="post-card" href="#">${cover({ category, title })}
    <span class="post-card__meta"><span>${CATEGORIES[category]}</span><span>Oct 31, 2026</span><span>6 min</span></span>
    <span class="post-card__title">${title.replace(/<\/?span>/g, "")}</span></a>`;
const preview = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Blog covers</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Inter+Tight:wght@500;600&family=Geist+Mono:wght@400;500&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/blog.css">
<style>.sec { padding-block: 48px; border-bottom: 1px solid var(--line); } .sec > .eyebrow { margin-bottom: 24px; } .hero-cover { max-width: 960px; }</style>
</head>
<body>
<!-- Written by tools/blog/covers.mjs. Open with python3 -m http.server 8000, then /docs/blog-covers.html -->
<main class="wrap">
  <section class="sec"><p class="eyebrow">[ Post hero ]</p><div class="hero-cover post-cover">${cover({ category: "pipeline", title: samples.pipeline, slug: "first-line" })}</div></section>
  <section class="sec"><p class="eyebrow">[ Blog list ]</p><div class="post-grid">
    ${Object.entries(samples).map(([c, t]) => card(c, t)).join("\n    ")}
  </div></section>
  <section class="sec"><p class="eyebrow">[ Text only ]</p><div class="post-grid">
    ${card("company", samples.company).replace(/<div class="cover__art">[\s\S]*?<\/svg><\/div>/, "").replace("cover cover--company", "cover cover--company cover--text")}
  </div></section>
</main>
</body>
</html>
`;
writeFileSync(join(root, "docs/blog-covers.html"), preview);
console.log("Wrote docs/blog-covers.html");

// 2. Share images for every post
const blog = join(root, "blog");
const posts = existsSync(blog) ? readdirSync(blog).filter((s) => statSync(join(blog, s)).isDirectory() && existsSync(join(blog, s, "index.html"))) : [];
const withCover = posts.filter((s) => /<div class="cover[ "]/.test(readFileSync(join(blog, s, "index.html"), "utf8")));
if (!withCover.length) { console.log("No posts with a cover yet"); process.exit(0); }

const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg" };
const server = createServer((req, res) => {
  let p = join(root, decodeURIComponent(req.url.split("?")[0]));
  if (existsSync(p) && statSync(p).isDirectory()) p = join(p, "index.html");
  if (!existsSync(p)) { res.writeHead(404).end(); return; }
  res.writeHead(200, { "content-type": types[extname(p)] || "application/octet-stream" }).end(readFileSync(p));
}).listen(0);
const base = `http://localhost:${server.address().port}`;

const { chromium } = createRequire(import.meta.url)("playwright");
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 1 });
mkdirSync(join(root, "assets/img/blog"), { recursive: true });
for (const slug of withCover) {
  await page.goto(`${base}/blog/${slug}/`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const el = page.locator("div.cover").first();
  await el.evaluate((n) => n.classList.add("cover--og"));
  await el.screenshot({ path: join(root, "assets/img/blog", `${slug}.png`) });
  console.log(`Wrote assets/img/blog/${slug}.png`);
}
await browser.close();
server.close();
