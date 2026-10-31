# Blog covers

Every post on `/blog/` gets one cover, drawn in HTML and CSS. Covers hold no text: the title and category sit next to the cover on the page. No photos, no stock art and no AI images, so covers stay sharp and match the site. The same markup is the list card, the post hero and the 1200x630 share image.

Preview every cover at `/docs/blog-covers.html` (run `python3 -m http.server 8000` first). Docs are hidden from visitors.

## The parts

1. **Band.** The app's gray fill (#f5f5f5) with grain and a 1px black frame, the same bands as the home page.
2. **Art.** A white framed panel in the middle, on a dot grid with corner marks, holding one line drawing. Black 1.5px lines, square ends, one emerald point.

## Categories

Every cover uses the same gray. The drawing says the category.

| Category | Class | Drawing |
|---|---|---|
| Pipeline | `cover--pipeline` | A line rising to the point |
| CRM | `cover--crm` | A table with the open row in black |
| Deal Room | `cover--deal-room` | A site with a player and three tiles |
| Guides | `cover--guides` | Three steps, the last one black |
| Product | `cover--product` | Four squares, one black |
| Company | `cover--company` | Three people, the middle one in black |

The drawings and the cover markup live in `tools/blog/art.mjs` (`cover({ category })`). A new drawing follows the same rules: 200x160 view box, classes `fill`, `paper`, `soft`, `gray` and one `point`.

## Sizes

The cover is a CSS container, so type and spacing scale with its width.

| Where | Markup | Notes |
|---|---|---|
| Blog list | `.post-grid` > `a.post-card` > `.cover`, then the meta and title | The art panel lifts a little on hover. |
| Post hero | `.post-cover` > `.cover` | Under the post title. |
| Share image | `.cover--og` | Exactly 1200x630. Written by the script below. |

## Share images

`node tools/blog/covers.mjs` rewrites the preview page and saves a 1200x630 PNG of each post's cover to `assets/img/blog/<slug>.png`. Point the post's `og:image` and `twitter:image` at that file. It needs Playwright with Chromium.

## Rules

- Square corners, black frames, no shadows, no gradients, no emoji.
- One emerald point per cover, in the drawing. Nothing else is green.
- No text on the cover.

## Running cost

$0 a month at Beta (50 reps) and Growth (500 reps). Covers are CSS on the Hostinger plan we already pay for. Share images are made on a laptop with free tools. No paid service and no AI calls.
