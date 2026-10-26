# Site architecture

The plan for tryomniscient.com, built the way Attio builds attio.com: two big menus, one page per feature, and one page template used everywhere. The site stays plain HTML on Hostinger (see `README.md`).

The feature list comes from the app's sidebar (`src/components/ClientApp.tsx` in the app repo): Home and Ask, Outreach (Scout, Campaigns, Inbox), CRM (Companies, People, Opportunities, Lists, Dashboards), Resources (Meetings, Emails, Notes, Automation, Knowledge) and Deal Room (Experiences, Library).

## 1. Header

```
[Otto] Omniscient    Product ▾   Resources ▾   Customers   Pricing          Sign in   Book a demo   Start free →
```

- **Product** and **Resources** open mega menus. **Customers** stays hidden until there are three real stories.
- One primary button: **Start free** (brand blue). **Book a demo** is the outlined button. **Sign in** is a plain link.
- The header sticks to the top. It gets a hairline under it once the page scrolls.

## 2. Product menu

Three sections that run end to end, in the order a deal moves: Revenue finds the buyer, CRM keeps the whole story, Deal Room closes. Ecosystem sits beside them, with a tinted panel on the right, like Attio's menu. Names are plain and say what the feature does.

### Revenue

| Name | Line | In the app |
|---|---|---|
| **B2B Lead Scouting** | Find the right buyers and see why they fit | Scout |
| **LinkedIn Outreach** | LinkedIn campaigns you approve before they send | Campaigns |
| **Unified Inbox** | Every reply in one place, next to the record | Inbox |

### CRM

| Name | Line | In the app |
|---|---|---|
| **Single Source of Truth** | Everything about every account, connected | Links, facts with quotes, summaries, Pulse |
| **Call & Meeting Intelligence** | Every email, call and meeting, captured and summed up | Gmail, Outlook, Calendar, Meetings, transcripts |
| **Self-Driving CRM** | Records that update themselves | AI fields with proof, suggestions, workflows |
| **Data Model** | Shape it to fit your business | Custom objects, 15 field types, links |
| **Reporting & Forecasts** | Pipeline numbers in real time | Dashboards, forecast |

### Deal Room

| Name | Line | In the app |
|---|---|---|
| **Deal Room** | A private website for every deal | Experiences |
| **Content Experiences** | Turn your content into journeys buyers want to finish | Library, tracks, hubs |
| **Interactive Proposals** | Proposals buyers can explore, price and act on | Proposal templates, pricing elements |

### Ecosystem

| Name | Line |
|---|---|
| **Apps** | Gmail, Outlook, Slack, Zoom and more |
| **One-Click Switch** | Bring your CRM over in one click |
| **Developer Platform** | Build on Omniscient |
| **The Suite** | Works with Claritia and Arrowsterr |

### Right panel

- **Omniscient for:** Founders, Agencies, Sales teams
- **Get started:** Omniscient 101, Book a demo

Section headings are small `faint` labels. Feature names are 14px `ink`, lines are 13px `muted`. Hover fills the item with `hover`.

Otto, Ask Omniscient and Workflows show up inside every section's pages, where they do the work.

## 3. Resources menu

| Learn | Company (tinted panel) |
|---|---|
| **Help center**<br>Learn every feature | Changelog |
| **Guides**<br>Omniscient, explained | Blog |
| **Templates**<br>Deal Room sites and workflow playbooks | Compare |
| **Developer docs**<br>Start building on Omniscient | Security |
| | About |

## 4. Sitemap

Every page lives in its own folder (the URL is the folder path). All marketing pages sit under a prefix, because `.htaccess` sends any path with no page here to the app. App routes such as `/ask`, `/meetings`, `/library`, `/workflows`, `/inbox` and `/scout` must keep reaching the app, so the site never uses them at the root.

| URL | Page | Phase |
|---|---|---|
| `/` | Home | 1 (rework) |
| `/product/` | Product overview: the three sections and Ecosystem as a page | 1 |
| `/product/lead-scouting/` | B2B Lead Scouting | 1 |
| `/product/linkedin-outreach/` | LinkedIn Outreach | 1 |
| `/product/unified-inbox/` | Unified Inbox | 2 |
| `/product/single-source-of-truth/` | Single Source of Truth | 1 |
| `/product/call-meeting-intelligence/` | Call & Meeting Intelligence | 1 |
| `/product/self-driving-crm/` | Self-Driving CRM | 1 |
| `/product/data-model/` | Data Model | 2 |
| `/product/reporting-forecasts/` | Reporting & Forecasts | 2 |
| `/product/deal-room/` | Deal Room | 1 |
| `/product/content-experiences/` | Content Experiences | 2 |
| `/product/proposals/` | Interactive Proposals | 2 |
| `/integrations/` | Apps: a grid of logos with filters by kind | 2 |
| `/integrations/<tool>/` | One page per tool: gmail, outlook, google-calendar, slack, zoom, google-meet, teams, hubspot, salesforce, attio, pipedrive, claritia, arrowsterr | 3 |
| `/switch/` | One-Click Switch (imports) | 2 |
| `/developers/` | Developer Platform: API and webhooks | 2 |
| `/developers/docs/` | API reference, from `docs/api.md` in the app repo | 3 |
| `/suite/` | The Suite: Omniscient with Claritia and Arrowsterr | 3 |
| `/for/founders/`, `/for/agencies/`, `/for/sales-teams/` | Solutions | 2 |
| `/pricing/` | Pricing (moves off the home page; plans from `src/lib/plans.ts`) | 1 |
| `/demo/` | Book a demo (Calendly embed) | 1 |
| `/start/` | Omniscient 101: first day in five steps | 2 |
| `/templates/` | Template gallery: 20 Deal Room sites and the workflow playbooks | 2 |
| `/templates/<slug>/` | One page per template, with a live preview and "Use template" | 3 |
| `/compare/` | Compare hub | 2 |
| `/compare/hubspot/`, `/salesforce/`, `/attio/`, `/pipedrive/`, `/day-ai/` | One page per rival | 2 |
| `/help/` | Help center home with search | 3 |
| `/help/<topic>/<article>/` | Help articles | 3 |
| `/guides/` | Guides | 3 |
| `/changelog/` | Changelog, one entry per shipped PR worth telling | 2 |
| `/blog/`, `/blog/<slug>/` | Blog | 3 |
| `/security/` | Security (moves off the home page) | 1 |
| `/about/` | About | 3 |
| `/customers/`, `/customers/<slug>/` | Customer stories | Later |
| `/privacy/`, `/terms/` | Unchanged | Built |

About 45 pages at the end of phase 3, plus help articles, templates and blog posts.

## 5. One page template for every feature

Like Attio's feature pages, each one follows the same order, so a new page is mostly words and one mock.

1. **Hero.** A small label with the section ("Revenue"), a big title (the page's one bold thing), one lead line, Start free and Book a demo, and a live HTML mock of the screen below. Mocks are HTML and CSS, the same way the home page does `HeroMock` today. No screenshots, so they stay sharp and match the brand.
2. **Works with.** A row of tool logos that apply to this feature.
3. **Feature rows.** Two to four rows, words on one side and a small mock on the other, switching sides each row.
4. **Otto at work.** What the agent does on this feature, tagged `ByOtto`, with Otto in his working state.
5. **Proof.** A quote or a number. Left out until we have a real one.
6. **Related.** Four cards linking to other feature pages.
7. **FAQ.** Four to six questions, with `FAQPage` structured data.
8. **Closing band.** Title and Start free.

Solution, compare and integration pages use the same parts in a different order. Compare pages add a table, Omniscient against the rival, with prices that link to the rival's own pricing page.

## 6. Home page and product overview

The home page is a cover, not the whole manual. It tells one idea, walks the route, proves the claim, then hands the full feature tour to `/product/`.

### Home

**Hero title:** Run the whole deal.

**Lead:** Omniscient finds the buyers who fit, writes the outreach, keeps every record true and builds the room where they sign. One system, with a receipt for every fact Otto writes.

**Hero object:** the deal file (`.df` in `index.html`): a folder, a four-stop route, a source receipt and an approval stamp. Otto peeks over the top.

**Closing line:** One system, from first hello to closed deal.

Page order:

1. Hero: copy left, the deal file right.
2. Tools strip.
3. The route: “One record. Six stops.” Six links into `/product/#f-...`.
4. The why, short.
5. The receipt: “Every fact has a receipt.” One suggested field, its quote, its source, accept or skip.
6. Meet Otto.
7. One-Click Switch.
8. Security: four promises as stamps.
9. Pricing: a joined plan grid with square cards and stamps.
10. FAQ and the closing band.

### Product overview `/product/`

The full 11-feature tour lives here: a sidebar that follows the scroll (Revenue, CRM, Deal Room) and one exhibit per feature. The page hero is “From first hello to closed deal.” with file tabs for the three sections. The header and footer product links point at `/product/#f-...`, so every feature is one click from anywhere on the site.

### Visual system

`docs/visual-direction.html` is the visual direction. `assets/file.css` holds the system: figure labels, the deal file, the route, the receipt and the stamps. Archivo for display, Geist for body, Geist Mono for labels. Paper, ink, one brand blue, one signal orange; square file objects, no gradients or stock illustrations.

## 7. Footer

Five columns of links, the same groups as the menus: Revenue, CRM, Deal Room, Ecosystem, and Resources merged with Company. Under them: the logo, Privacy, Terms, the email address and the year.

## 8. How it's built

- **Menus.** `partials/header.html` holds both menus as plain HTML lists. `assets/nav.css` styles them. `assets/nav.js` (small, no library) opens a menu on hover after 120ms or on click, closes it on Esc or a click outside, and moves focus with the arrow keys. Menus are floating panels: white, `line` border, `shadow-pop`, 8px corners, 200ms fade and 4px rise.
- **Phone.** Below 960px the nav turns into a menu button. It opens a full-screen sheet with each menu as an open-and-close section, and the two buttons pinned to the bottom.
- **Page CSS.** `assets/product.css` holds the shared feature template. Page-only CSS stays out; a page that needs more gets a new section type in `product.css`.
- **Mocks.** `assets/mocks.css` holds the shared mock pieces: the app frame, a table, a record panel, the Otto chat, a tag, a logo tile. Each mock is HTML in the page.
- **Logos.** `assets/logos/` holds one SVG per tool, the same set as `BrandLogo` in the app.
- **Layout tool.** `tools/layout.mjs` already walks nested folders and builds the sitemap. Add `nav.css`, `product.css` and `mocks.css` to `partials/head.html`, and stamp `nav.js` the same way the CSS links get their `?v=` hash.
- **Search and AI answers.** Every page gets a title, description, canonical, og tags and JSON-LD (`SoftwareApplication` on product pages, `FAQPage` where there are questions). Add `/llms.txt` listing every product page with its one line, so AI answers describe Omniscient right. Arrowsterr tracks how they do.
- **Analytics.** Add PostHog to the site and track Start free and Book a demo clicks by page and menu item.
- **Help center, guides, changelog and blog.** Plain HTML pages in this repo, made from Markdown by a small script in `tools/`. No CMS.
- **Brand.** Everything follows `docs/brand.md` in the app repo. The corner and tag line in this repo's README comes from the old brand and should be updated to match it.

## 9. Order of work

Built so far: the header and both menus, the phone menu, the footer, the home page with the deal-file hero, route and receipt, `/product/` with the full 11-feature tour, Privacy and Terms. The individual feature pages, compare pages and resources pages are next.


| Phase | What ships |
|---|---|
| 1 | New header with both menus and the phone sheet, new footer, the feature template and mock parts, Home rework, `/product/`, B2B Lead Scouting, LinkedIn Outreach, Single Source of Truth, Call & Meeting Intelligence, Self-Driving CRM, Deal Room, Pricing, Security, Demo |
| 2 | The other product pages, Apps, Switch, Developers, the three solution pages, Omniscient 101, the template gallery, Compare and five rival pages, Changelog |
| 3 | One page per tool and per template, API reference, the suite page, help center, guides, blog, About |
| Later | Customers, once three stories are signed off |

## 10. Running cost

$0 extra a month at Beta (50 reps) and at Growth (500 reps). The site stays static on the Hostinger plan we already pay for.

| Item | Beta (50 reps) | Growth (500 reps) |
|---|---|---|
| Hosting (Hostinger, already paid) | $0 | $0 |
| PostHog on the site (free tier, 1M events a month, check) | $0 | $0 |
| Book a demo (Calendly, plan already paid, check) | $0 | $0 |
| Claude tokens | $0 (none at run time; writing the pages is a one-time cost) | $0 |
| **Total added** | **$0** | **$0** |

If site traffic passes PostHog's free events, PostHog bills by the event (check its pricing page before then).
