// Copies the home page and its assets into the Omniscient app, which serves tryomniscient.com.
// The app's src/app/route.ts serves public/site/index.html on "/", and Next.js serves public/assets/ as files.
// Run from this repo, after node tools/layout.mjs: node tools/export-app.mjs ../omniscient
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const app = process.argv[2];
if (!app) {
  console.error("Usage: node tools/export-app.mjs <path to the omniscient app repo>");
  process.exit(1);
}
const root = new URL("..", import.meta.url).pathname;
const out = resolve(app, "public");

// The app answers /privacy and /terms without the trailing slash.
const html = readFileSync(join(root, "index.html"), "utf8")
  .replaceAll('href="/privacy/"', 'href="/privacy"')
  .replaceAll('href="/terms/"', 'href="/terms"');

mkdirSync(join(out, "site"), { recursive: true });
writeFileSync(join(out, "site", "index.html"), html);
rmSync(join(out, "assets"), { recursive: true, force: true });
cpSync(join(root, "assets"), join(out, "assets"), { recursive: true });
console.log(`Copied the home page and assets to ${out}`);
