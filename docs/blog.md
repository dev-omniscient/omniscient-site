# Blog covers

Every post on `/blog/` gets one cover, drawn in HTML and CSS. Covers hold no text: the title and category sit next to the cover on the page. No photos, no stock art and no AI images, so covers stay sharp and match the site. The same markup is the list card, the post hero and the 1200x630 share image.

Preview every cover at `/docs/blog-covers.html` (run `python3 -m http.server 8000` first). Docs are hidden from visitors.

## The parts

1. **Band.** A pale green ground with grain and a 1px black frame, the same bands as the home page. The color says the category.
2. **Art.** A white framed panel in the middle, on a dot grid with corner marks, holding one line drawing. Black 1.5px lines, square ends, one emerald point.

## Categories

| Category | Class | Band | Drawing |
|---|---|---|---|
| Pipeline | `cover--pipeline` | mint #d5ebe0 | A line rising to the point |
| CRM | `cover--crm` | moss #edf3e9 | A table with the open row in green |
| Deal Room | `cover--deal-room` | sea #d7ece8 | A site with a player and three tiles |
| Guides | `cover--guides` | sage #e4ecdf | Three steps, the last one green |
| Product | `cover--product` | fern #dcefdf | Four squares, one green |
| Company | `cover--company` | leaf #e6f2ea | Three people, the middle one in green |

The drawings and the cover markup live in `tools/blog/art.mjs` (`cover({ category })`). A new drawing follows the same rules: 200x160 view box, classes `fill` (green), `paper`, `soft`, `gray` and one `point` (`point on` turns it white on a fill).

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
- Lines and frames are black. Green fills mark the one thing that matters, and one emerald point sits in each drawing.
- No text on the cover.

## Running cost

$0 a month at Beta (50 reps) and Growth (500 reps). Covers are CSS on the Hostinger plan we already pay for. Share images are made on a laptop with free tools. No paid service and no AI calls.
