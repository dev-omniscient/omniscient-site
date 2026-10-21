# tryomniscient.com

Static site for Omniscient. Plain HTML: no WordPress, no build step.

The app itself lives at app.tryomniscient.com. This repo is only the marketing site: the home page, Privacy and Terms. More pages follow `docs/site-architecture.md`.

## How it's laid out

| Path | What |
|---|---|
| `index.html` | The home page. |
| `privacy/index.html`, `terms/index.html` | Privacy and Terms. One folder per page. The URL is the folder path. |
| `404.html` | Page not found. |
| `partials/head.html` | Icons, fonts and the shared CSS. |
| `partials/header.html`, `partials/footer.html` | The site header and footer. |
| `assets/base.css` | Brand tokens, reset, type, tags, buttons, the header with the Product and Resources menus, the phone menu, footer, reading pages. |
| `assets/marketing.css` | Shared by the home and product pages: every product mock, the tools strip, security, pricing, questions and the closing band. |
| `assets/home.css` | The home page only: hero, the why and the tour with the sidebar that follows the scroll. |
| `assets/site.js` | Opens and closes the menus, the phone menu, the header line on scroll and scroll reveals. |
| `assets/logos/` | Logos of the tools Omniscient works with. |
| `assets/brand/` | favicon.ico, icon.svg, apple-icon.png, share image. |
| `tools/layout.mjs` | Copies the partials into every page, stamps the CSS and JS links and rebuilds `sitemap.xml`. |
| `.htaccess` | 404 page, https/www redirects, icon redirects, unknown paths to the app. |

## Editing

- **A page:** edit its `index.html` between `<!-- header:end -->` and `<!-- footer:start -->`.
- **Header, footer, icons or fonts:** edit the file in `partials/`, then run `node tools/layout.mjs`.
- **CSS or JS:** edit the file in `assets/`, then run `node tools/layout.mjs`. It adds `?v=<hash>` to each CSS and JS
  link, so browsers fetch the new file.
- **New page:** copy a page folder, change the content and the tags under `<!-- head:end -->`
  (title, description, canonical, og tags), then run `node tools/layout.mjs`. It adds the page to `sitemap.xml`.
- **Privacy or Terms:** edit the text in `privacy/index.html` or `terms/index.html` and change the
  "Last updated" date. Google's OAuth review reads these pages, so keep the URLs `/privacy` and `/terms`.
- **Footer year:** it is plain text in `partials/footer.html`. Change it each January.
- **Brand:** follow `docs/brand.md` in the app repo. Inter, navy text on white, one brand blue, neutrals tinted from
  that blue. Controls 6px, cards and menus 8px, tags are pills. Shadows only on things that float. No gradients.
- **Hero video:** replace the `.video-slot` div in `index.html` with the `<video>` tag in the comment above it, and put
  the film and its poster in `assets/video/`.
- **Site plan:** `docs/site-architecture.md` (menus, sitemap, page template, build order). Hidden from visitors.

Preview locally: `python3 -m http.server 8000`, then open http://localhost:8000.
The `.htaccess` rules only run on Hostinger.

Push to `main` and Hostinger deploys it.

## Where the words come from

The site was ported from the Next.js marketing pages in the app repo. Keep them in step when either side changes.

| Here | In the app repo |
| --- | --- |
| `index.html` | Written here first (October 2026). The app's `src/app/page.tsx` still has the old home page. |
| `partials/header.html`, `partials/footer.html` | Written here first. The menus follow `docs/site-architecture.md`. |
| `privacy/index.html`, `terms/index.html` | `src/app/privacy/page.tsx`, `src/app/terms/page.tsx` |
| Company name, email, "Last updated" date | `src/lib/legal.ts` |
| Plan prices and features in `index.html` | `src/lib/plans.ts` (yearly prices) and `docs/pricing.md` |
| Tokens at the top of `assets/base.css`, the icons in `assets/brand/` | `src/app/globals.css`, `src/app/icon.svg` and `docs/brand.md` |

## Paths that go to the app

Like the app's `src/proxy.ts`, any path with no page here goes to the same path on the app. `/today` goes to
`https://app.tryomniscient.com/today`, and the query string comes along. Real files and folders are served here.
A missing file (a path that ends in `.png`, `.js` and so on) gets `404.html`.

## Hostinger setup

1. **Add the site.** In hPanel, go to Websites → Add website, and add `tryomniscient.com` as an empty site.
   Do not install WordPress. If WordPress is already there, remove it first, so `public_html` is empty.
2. **Connect Git.** In hPanel, open the site, then Advanced → Git. Add this repo, branch `main`, and leave the
   install path empty, so it deploys to the domain's `public_html`. The folder must be empty the first time.
   For a private repo, copy the SSH key hPanel shows into the repo's deploy keys on GitHub. Turn on auto-deploy and
   add the webhook URL hPanel gives you to the repo's webhooks, so every push to `main` goes live.
3. **Turn on SSL.** In hPanel → Security → SSL, make sure the certificate covers `tryomniscient.com` and `www`.
4. **Check it.**
   - `curl -I https://tryomniscient.com/` shows `200`.
   - `/privacy` and `/terms` answer `301` to `/privacy/` and `/terms/`, which show `200`.
   - `curl -I https://www.tryomniscient.com/` and `curl -I http://tryomniscient.com/` answer `301` to `https://tryomniscient.com/`.
   - `curl -I https://tryomniscient.com/today` answers `301` to `https://app.tryomniscient.com/today`.
   - `curl -I https://tryomniscient.com/missing.png` shows `404`.

If LiteSpeed Cache is on for the site, purge it after a deploy.

## DNS

- `tryomniscient.com` and `www.tryomniscient.com` point to Hostinger. Use the A record (and the `www` CNAME) that
  hPanel shows for the site. `.htaccess` sends `www` to the bare domain.
- `app.tryomniscient.com` is a CNAME to `omniscient-web.fly.dev` (the app on Fly.io). Run
  `fly certs add app.tryomniscient.com --app omniscient-web` and add any record it asks for. Do not point it at Hostinger.
- Keep every email record as it is: MX, SPF (TXT), DMARC, and the Resend records (the `resend._domainkey` DKIM record
  and the `send` subdomain's MX and TXT records). The app sends digests from `digest@tryomniscient.com` through Resend.
- Google's OAuth consent screen links to `https://tryomniscient.com`, `/privacy` and `/terms`. Those keep working.

## Running cost

$0 extra a month at every stage (Beta 50 reps, Growth 500 reps). The site runs on the Hostinger plan we already pay
for. It has no server code, no database and no paid service.
