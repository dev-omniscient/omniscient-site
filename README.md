# Omniscient site theme

The custom WordPress theme for tryomniscient.com. Hostinger deploys the `main` branch to
`public_html/wp-content/themes/omniscient`.

The app itself lives at app.tryomniscient.com. This theme is only the marketing site: the home page, Privacy and Terms.

## How it is built

```
style.css            theme header (WordPress needs it)
functions.php        app links, contact email, menu links, <head> tags, loads the CSS for each page
header.php           top bar, shared by every page
footer.php           footer, shared by every page
index.php            post list and anything without its own template
page.php, single.php plain pages and posts written in the WordPress editor
404.php              page not found (most unknown paths go to the app first, see below)
assets/base.css      brand tokens, reset, tags, buttons, header, footer, reading pages
assets/brand/        favicon.ico, icon.svg, apple-icon.png, share image
pages/home/          the home page: home.php (words and layout), mocks.php (the app pictures), home.css
legal/               Privacy and Terms text (<slug>.md) and their template (legal.php)
inc/legal.php        serves /privacy and /terms with no WordPress page needed
```

Plain PHP, HTML and CSS. No build step, no page builder, no JavaScript.

- The front page always uses `pages/home`, whatever is set under Settings → Reading.
- A WordPress page whose slug matches a folder in `pages/` uses that folder. To add a key page,
  add `pages/<slug>/<slug>.php` (and `<slug>.css` if it needs one) and create an empty WordPress page with that slug.
- Any other path with no page here goes to the same path on the app (`/today` goes to
  `https://app.tryomniscient.com/today`), like `src/proxy.ts` did on the Next.js site. Missing files (a path that ends
  in `.png`, `.js` and so on) get the 404 page. Turn this off with `OM_SEND_404_TO_APP` in functions.php.

## Where the words come from

The site was ported from the Next.js marketing pages in the app repo. Keep them in step when either side changes.

| Here | In the app repo |
| --- | --- |
| `pages/home/home.php` | `src/app/page.tsx` |
| `pages/home/mocks.php` | `src/components/marketing/HeroMock.tsx` and `Mocks.tsx` |
| `header.php`, `footer.php`, `OM_NAV` | `src/components/Site.tsx` |
| `legal/privacy.md`, `legal/terms.md` | `src/app/privacy/page.tsx`, `src/app/terms/page.tsx` |
| `OM_COMPANY`, `OM_EMAIL`, `OM_LEGAL_UPDATED` | `src/lib/legal.ts` |
| Plan prices in `pages/home/home.php` | `src/lib/plans.ts` (yearly prices) |
| Tokens at the top of `assets/base.css` | `src/app/globals.css` and `docs/brand.md` |

## How to edit

- **Home page words:** edit the arrays at the top of `pages/home/home.php`. Each section below them is plain HTML.
- **Privacy or Terms:** edit `legal/privacy.md` or `legal/terms.md`. They use a small set of Markdown: `##` headings,
  paragraphs, `- ` lists, tables, `**bold**`, `` `code` `` and `[links](https://...)`. `[COMPANY]` and `[EMAIL]` are
  filled from functions.php, and the contact email becomes a link on its own. Change the date in `OM_LEGAL_UPDATED`
  (inc/legal.php). Google's OAuth review reads these pages, so keep the URLs `/privacy` and `/terms`.
- **Top bar links:** `OM_NAV` in functions.php. **Footer links:** `$cols` at the top of footer.php.
- **App links:** `OM_APP` in functions.php. "Sign in", "Start free" and every plan button go to `/today` on the app.
- **Brand:** follow `docs/brand.md` in the app repo. Square boxes, `rounded-md` (6px) buttons, square tags, no pills,
  no shadows on cards, no gradients, labels and buttons only.
- CSS changes show up right away: each file's version is its last change time.

## Hostinger setup

1. **Create the site.** In hPanel, go to Websites → Add website → WordPress, and use `tryomniscient.com`. Set the site
   title to "Omniscient". Under Settings → Permalinks, pick "Post name" (the `/privacy` and `/terms` pages need it).
2. **Connect Git.** In hPanel, open the site, then Advanced → Git. Add this repo, branch `main`, install path
   `public_html/wp-content/themes/omniscient`. The folder must be empty the first time. For a private repo, copy the
   SSH key hPanel shows into the repo's deploy keys on GitHub. Turn on auto-deploy and add the webhook URL hPanel gives
   you to the repo's webhooks, so every push to `main` goes live.
3. **Activate the theme.** In WordPress, go to Appearance → Themes and activate "Omniscient".
4. **Check it.** Open `/`, `/privacy`, `/privacy/`, `/terms` and `/terms/`. Each should load with no redirect
   (`curl -I https://tryomniscient.com/privacy` shows `200`). If LiteSpeed Cache is on, purge it after a deploy.

An SEO plugin is optional. If one is active, its description and share tags replace the theme's.

## DNS

- `tryomniscient.com` and `www.tryomniscient.com` point to Hostinger. Use the A record (and the `www` CNAME) that
  hPanel shows for the site. WordPress sends `www` to the bare domain.
- `app.tryomniscient.com` points to the app on Fly.io. Run `fly certs add app.tryomniscient.com` and add the record it
  asks for. Do not point it at Hostinger.
- Keep every email record as it is: MX, SPF (TXT), DMARC, and the Resend records (the `resend._domainkey` DKIM record
  and the `send` subdomain's MX and TXT records). The app sends digests from `digest@tryomniscient.com` through Resend.
- Google's OAuth consent screen links to `https://tryomniscient.com`, `/privacy` and `/terms`. Those stay the same.
