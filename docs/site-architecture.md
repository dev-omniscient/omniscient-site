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

Three modules plus Ecosystem, with a tinted panel on the right, like Attio's Context, Orchestration and Ecosystem. Each feature has a proper name and one short line. Names are Title Case because they are product names; everything else stays sentence case.

The theme is the all-knowing owl: Omniscient sees and remembers everything, Otto and his agents do the work, and the team wins the deal.

### Context: what Omniscient knows

| Name | Line | What it is in the app |
|---|---|---|
| **Context Graph** | Everything your team knows, connected | Links, facts with quotes, one summary per record, Pulse map |
| **Total Recall** | Every email and meeting, remembered | Gmail, Outlook and Calendar capture |
| **Living Records** | Records that fill themselves in | Companies, People, Opportunities, Lists, AI fields with proof |
| **Meeting Memory** | Notes and next steps from every call | Meetings, transcripts, call notes, coaching |
| **Blueprint** | Shape the CRM like your business | Data model: custom objects, 15 field types, links, calculated fields |
| **Foresight** | Forecasts and dashboards from a sentence | Dashboards, forecast, deal health |

### Agents: what Otto does

| Name | Line | What it is in the app |
|---|---|---|
| **Ask Omniscient** | Ask your whole pipeline anything | Ask, with Think Harder for deep answers |
| **Autopilot** | Workflows that run the next step | Workflows, approvals, runs |
| **Parliament** | A team of agents for any task | Agent library (a group of owls is a parliament) |
| **Briefings** | Know the room before every call | Meeting prep briefs |
| **Night Shift** | Work done while you sleep | Daily agents, digests, Up next |
| **Wisdom** | Teach Otto how you sell | Knowledge |

### Revenue: where deals get won

| Name | Line | What it is in the app |
|---|---|---|
| **Sixth Sense** | Find buyers before they find you | Scout |
| **First Move** | LinkedIn outreach that opens the door | Campaigns |
| **Live Threads** | Every reply, with the deal beside it | Inbox |
| **Closing Room** | A website for every deal, built in minutes | Experiences, 55 elements, Otto in the builder |
| **Arsenal** | Every asset, ready to win | Library |

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

### Words that carry through

- **Receipts:** every fact Omniscient shows links to the email, call or note it came from. Used on the Context Graph page and the home page.
- **Think Harder:** the deep-answer mode inside Ask Omniscient.
- **ByOtto:** the tag on anything an agent wrote or found.

Clear these names with a trademark search before launch: Total Recall, Autopilot, Foresight, Night Shift, Sixth Sense, First Move, Closing Room, Arsenal.

## 3. Resources menu

| Learn | Company (tinted panel) |
|---|---|
| **Help center**<br>Learn every feature | Changelog |
| **Guides**<br>Omniscient, explained | Blog |
| **Templates**<br>Closing Room sites and workflow playbooks | Compare |
| **Developer docs**<br>Start building on Omniscient | Security |
| | About |

## 4. Sitemap

Every page lives in its own folder (the URL is the folder path). All marketing pages sit under a prefix, because `.htaccess` sends any path with no page here to the app. App routes such as `/ask`, `/meetings`, `/library`, `/workflows`, `/inbox` and `/scout` must keep reaching the app, so the site never uses them at the root.

| URL | Page | Phase |
|---|---|---|
| `/` | Home | 1 (rework) |
| `/product/` | Product overview: the three modules and Ecosystem as a page | 1 |
| `/product/context-graph/` | Context Graph | 1 |
| `/product/total-recall/` | Total Recall | 1 |
| `/product/living-records/` | Living Records | 1 |
| `/product/meeting-memory/` | Meeting Memory | 1 |
| `/product/blueprint/` | Blueprint | 2 |
| `/product/foresight/` | Foresight | 2 |
| `/product/ask/` | Ask Omniscient | 1 |
| `/product/autopilot/` | Autopilot | 1 |
| `/product/parliament/` | Parliament | 2 |
| `/product/briefings/` | Briefings | 2 |
| `/product/night-shift/` | Night Shift | 2 |
| `/product/wisdom/` | Wisdom | 2 |
| `/product/sixth-sense/` | Sixth Sense | 2 |
| `/product/first-move/` | First Move | 2 |
| `/product/live-threads/` | Live Threads | 2 |
| `/product/closing-room/` | Closing Room | 1 |
| `/product/arsenal/` | Arsenal | 2 |
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
| `/templates/` | Template gallery: 20 Closing Room sites and the workflow playbooks | 2 |
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

1. **Hero.** A small label with the module ("Agents"), a big title (the page's one bold thing), one lead line, Start free and Book a demo, and a live HTML mock of the screen below. Mocks are HTML and CSS, the same way the home page does `HeroMock` today. No screenshots, so they stay sharp and match the brand.
2. **Works with.** A row of tool logos that apply to this feature.
3. **Feature rows.** Two to four rows, words on one side and a small mock on the other, switching sides each row.
4. **Otto at work.** What the agent does on this feature, tagged `ByOtto`, with Otto in his working state.
5. **Proof.** A quote or a number. Left out until we have a real one.
6. **Related.** Four cards linking to other feature pages.
7. **FAQ.** Four to six questions, with `FAQPage` structured data.
8. **Closing band.** Title and Start free.

Solution, compare and integration pages use the same parts in a different order. Compare pages add a table, Omniscient against the rival, with prices that link to the rival's own pricing page.

## 6. Home page

The home page becomes the tour, and each section links to its feature page.

1. Hero: "The CRM that fills itself in", the product mock, Start free.
2. Logo strip of the tools it connects to.
3. Four tabs that switch one big mock: Total Recall, Ask Omniscient, Autopilot, Closing Room.
4. Context Graph: every fact with its receipt.
5. The three modules and Ecosystem as cards.
6. One-Click Switch: the HubSpot, Salesforce, Attio and Pipedrive logos.
7. Security in brief, linking to `/security/`.
8. Pricing in brief, linking to `/pricing/`.
9. FAQ and the closing band.

## 7. Footer

Five columns of links, the same groups as the menus: Context, Agents, Revenue, Ecosystem, and Resources merged with Company. Under them: the logo, Privacy, Terms, the email address and the year.

## 8. How it's built

- **Menus.** `partials/header.html` holds both menus as plain HTML lists. `assets/nav.css` styles them. `assets/nav.js` (small, no library) opens a menu on hover after 120ms or on click, closes it on Esc or a click outside, and moves focus with the arrow keys. Menus are floating panels: white, `line` border, `shadow-pop`, 8px corners, 200ms fade and 4px rise.
- **Phone.** Below 960px the nav turns into a menu button. It opens a full-screen sheet with each menu as an open-and-close section, and the two buttons pinned to the bottom.
- **Page CSS.** `assets/product.css` holds the shared feature template. Page-only CSS stays out; a page that needs more gets a new section type in `product.css`.
- **Mocks.** `assets/mocks.css` holds the shared mock pieces: the app frame, a table, a record panel, the Otto chat, a tag, a logo tile. Each mock is HTML in the page.
- **Logos.** `assets/logos/` holds one SVG per tool, the same set as `BrandLogo` in the app.
- **Layout tool.** `tools/layout.mjs` already walks nested folders and builds the sitemap. Add `nav.css`, `product.css` and `mocks.css` to `partials/head.html`, and stamp `nav.js` the same way the CSS links get their `?v=` hash.
- **Search and AI answers.** Every page gets a title, description, canonical, og tags and JSON-LD (`SoftwareApplication` on product pages, `FAQPage` where there are questions). Add `/llms.txt` listing every product page with its one line, so AI answers describe Omniscient right. Arrowsterr tracks how they do.
- **Analytics.** PostHog is already on the site. Track Start free and Book a demo clicks by page and menu item.
- **Help center, guides, changelog and blog.** Plain HTML pages in this repo, made from Markdown by a small script in `tools/`. No CMS.
- **Brand.** Everything follows `docs/brand.md` in the app repo. The corner and tag line in this repo's README comes from the old brand and should be updated to match it.

## 9. Order of work

| Phase | What ships |
|---|---|
| 1 | New header with both menus and the phone sheet, new footer, the feature template and mock parts, Home rework, `/product/`, Context Graph, Total Recall, Living Records, Meeting Memory, Ask Omniscient, Autopilot, Closing Room, Pricing, Security, Demo |
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
