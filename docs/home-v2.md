# Home page v2: one deal, end to end (plan)

Status: plan, 28 October 2026. Builds on the v1 home page (PR 1) and `docs/brand-story.md` in the app repo.

## The idea

The page follows **one deal** from first search to signed room, with real product UI and one line that carries it down the page.

- **One thread.** Priya Shah, VP Sales at Northwind, is found by Scout, says yes on LinkedIn, becomes a $48,000 opportunity in the CRM, and signs in a Deal Room. Every section shows the same person, company and numbers.
- **One line.** A thin line (the Spine) runs from the hero to the closing band. Leads leave Scout as emerald dots, travel down the Spine and land as rows in the CRM. The record sends its facts down into the Deal Room. Reads in the room travel back up a second line to Scout.
- **Real UI.** Each section shows the app as it really looks, the way Arrowsterr's `Glimpse` shows real layouts with demo numbers: sidebar, breadcrumb, filter bar, table with column icons, record panel. Only the data is sample.
- **Scroll plays it.** Each corner is a pinned stage. Scrolling moves the demo forward step by step, so the animation always plays where the reader is looking.

## 1. More geometric and abstract

A small kit of shapes, used everywhere. Nothing else gets drawn.

| Shape | What it means | Look |
|---|---|---|
| **Node** | A person or a signal | 6px circle. Black at rest, emerald when it carries something |
| **Square** | A record (company, deal, page) | 8px square, 1px black line, white fill |
| **Edge** | Data moving | 1px line. Gray at rest, emerald while a dot travels on it |
| **Field** | The market | A grid of nodes, 8px apart, in `line-strong` |
| **Plate** | A product area | The isometric plate from v1, used as the ground under each stage |
| **Ring** | The record in the middle | The logo's ring, only in the hero and the closing band |
| **Ticks** | "Look here" | Four 8px corner marks around the one thing to read |

Rules:
- Everything sits on an 8px grid. Lines bend only at 90 degrees or on a quarter circle.
- Emerald moves. A dot or edge turns emerald only while data is moving on it.
- Each product window sits on a plate with corner ticks, and the plate's grid shows through the gaps around it.

## 2. The Spine

```
 HERO        ●  ring opens into the Triangle
             │
 SCOUT       ●──── field of 120 nodes ──── list ──── campaign ──── reply ● Priya
             │                                                         │
             │◄────────────────────────────────────────────────────────┘
 UNIFY       ■  Northwind row lands in Opportunities
             │  meeting ● ──► field updates ──► record
             │
 CLOSE       ■  record facts ──► room blocks ──► go live
             │  Dana ● Sam ● Jo ●  read pages
             │
 CLOSE BAND  ●  ring closes. A thin line on the right runs back up to Scout
```

- Drawn as one SVG behind the page, from the hero to the closing band. It draws itself as the page scrolls (`stroke-dashoffset` tied to scroll).
- Each section joins it at a **port**: a square on the Spine with a short mono label (`SCOUT`, `UNIFY`, `CLOSE`).
- Hand-offs between sections are literal: the dot that leaves the Scout reply is the same dot that lands on the Unify row.
- On phones the Spine moves to the left edge, 16px in. It keeps the ports and the hand-offs.

## 3. Hero

- Keep "Know everything. Close more." and the Triangle.
- The Triangle becomes more abstract. Three squares sit on the ring, joined by edges, with a field of nodes inside. Nodes drift toward the center and turn emerald when they reach the record.
- As you scroll off the hero, the Triangle's bottom point stretches into the Spine. The page grows out of the logo.

## 4. Scout: find, reach, reply

A pinned stage, about 3 screens of scroll. The window is the real Scout screen: sidebar on the left (Today, Ask, Scout, Campaigns, Inbox, then Companies, People, Opportunities, then Meetings, Deal Room), breadcrumb `Scout / US RevOps leaders`, then the content.

| Step | Scroll | What moves |
|---|---|---|
| 1. Describe | 0 to 15% | The sentence types itself: "Heads of RevOps in the United States at B2B software companies with 51 to 500 people, hiring in sales". Each criterion underlines and turns black as it lands |
| 2. Search | 15 to 35% | The window fades back. A field of 120 nodes fills the stage. A scan line sweeps left to right. Nodes that fit turn emerald and pulse once. A counter in mono counts to `128 found` |
| 3. List | 35 to 55% | Emerald nodes fly into rows. The table fills: person, company logo square, fit dashes filling to the score, signal tag. Priya Shah's row opens black. A side panel slides in with "Why she fits" and the LinkedIn post that makes now a good time |
| 4. Campaign | 55 to 80% | The view switches to `Campaigns / US RevOps leaders`. Four steps draw as a vertical chain of squares: Invite, Wait, Message, View profile. Counters run (96 sent, 41 accepted, 38 messaged). An approval card slides up with Priya's message. The Approve button presses itself and the card goes green |
| 5. Reply | 80 to 100% | `Inbox`. A new row rises: "Priya Shah: Tuesday works." Her status flips to Replied. A handle appears on the row's right edge and an emerald dot drops from it onto the Spine |

After the stage: the three Scout features (B2B Lead Scouting, LinkedIn Outreach, Unified Inbox) as a row of three cards. Each card has a small looping line drawing of its feature: the field with a scan, the chain of four squares, rows arriving.

## 5. Unify: a CRM that keeps itself current

No Otto in this section. The CRM does the work, and the sources are the hero: Gmail, Calendar, Meet and Zoom. The window is a real CRM screen like Lightfield's Target accounts: sidebar, `Opportunities / All`, filter and display buttons, a table with column icons (Account, Stage, Amount, Close date, Next step, Owner, Last touch).

| Step | Scroll | What moves |
|---|---|---|
| 1. Arrive | 0 to 15% | The dot from Scout lands on the table. A new row rises: Northwind, Stage Discovery, $40,000, Dec 15. The row flashes emerald and fades to white |
| 2. Sources | 15 to 35% | Four logo squares sit on a rail left of the window (Gmail, Calendar, Meet, Zoom). Each one sends dots down short edges into the window as emails and meetings come in. A "Pricing review, 32 min" meeting square lights up |
| 3. Listen | 35 to 60% | The Northwind record opens as a panel over the table. Its transcript scrolls in a narrow column. Three quotes highlight in turn: "around 40 seats", "send over the proposal", "sign before the end of November" |
| 4. Update | 60 to 85% | Each quote leaves as a dot along an edge into a field on the right rail. The field flips with a strike-through: Stage Discovery to Proposal, Amount $40,000 to $48,000, Close date Dec 15 to Nov 28. A small source line appears under each: "Pricing review, Oct 14, 18:31" |
| 5. Roll up | 85 to 100% | The record closes. The table row now shows the new values. A pipeline bar above the table grows and the total counts from $1.21M to $1.25M. The Northwind row drops a dot down the Spine toward Close |

After the stage: Single Source of Truth, Call & Meeting Intelligence, Self-Driving CRM, Data Model, Reporting & Forecasts. Five short rows, each with a tiny geometric mark that animates on hover.

## 6. Close: one link that closes

The window is the Deal Room builder, then the live room.

| Step | Scroll | What moves |
|---|---|---|
| 1. Build | 0 to 30% | The Northwind dot lands on a blank page. Fields from the record fly in on edges and become blocks: the stakeholders become a Team block, $48,000 becomes the Pricing block, Nov 28 becomes the Plan timeline. Blocks drop onto an 8px grid and snap |
| 2. Go live | 30 to 45% | The address bar reads `rooms.tryomniscient.com/northwind`. The Go live button presses. A tag flips to Live and a square burst runs from the button |
| 3. Readers | 45 to 75% | Three reader nodes appear around the room: Priya, Dana (CFO), Sam (IT). Edges draw from each node to the pages they read. Pricing gets three edges from Dana and turns emerald. A "Who read what" panel fills in time order |
| 4. Signed | 75 to 90% | Dana presses Accept plan. The CRM row (small, top right) flips to Closed won and the amount turns emerald |
| 5. Loop | 90 to 100% | Sam's read of the Security page sends a dot up the second line to Scout: "Find the CTO at Northwind next". The Triangle in the closing band lights all three corners |

After the stage: Deal Room, Content Experiences, Interactive Proposals as three cards with looping drawings.

## 7. Animation system

- **No library.** One small scroll engine in `assets/demo.js` (about 3KB), in the style of `site.js`.
  - Each stage is `<section data-stage>` with a sticky inner box. The engine sets `--p` (0 to 1) on it from scroll position and `data-step` from the step table.
  - CSS reads `--p` for scrubbed things (the Spine, counters, the scan line) and `data-step` for discrete changes (rows arriving, fields flipping).
  - Counters and typing read `--p` through one `requestAnimationFrame` loop that runs only while a stage is on screen.
- **Motion rules from the brand:**
  - Only transform, opacity and SVG stroke animate.
  - Discrete changes use the three speeds (120, 200 and 320ms) with `--ease-out`. Scrubbed things follow the scroll with no easing.
  - Loops are allowed only for live things: the scan line, the pulsing Point, the loader.
- **Phones:** no pinning. Each stage plays its five steps on its own when it scrolls into view, 1.6s per step, then holds the last frame. A small step bar under the window lets people jump to a step.
- **Reduced motion:** stages show their last frame, the Spine is drawn, nothing moves.
- **No JavaScript:** the last frame of every stage is the default HTML, so the page still reads.
- **Speed:** 60fps on a 2020 MacBook Air and a mid-range Android. SVG only, no canvas, no video. Stages off screen stop their loop.

## 8. Fixes from v1

- v1 animations play once when a section appears, often before the reader gets there. In v2 they are tied to scroll, so they play under the reader's eyes.
- The v1 moving dots are 3.5px and easy to miss. v2 dots are 6px with a soft emerald halo, and the edge turns emerald under them.
- The highlight behind "worth your time." in the Scout heading is the browser's text selection color (`--brand-flash`). It will become a soft gray so a stray click does not look like a design choice.

## 9. Files

| File | What |
|---|---|
| `index.html` | Three stages and the Spine replace the v1 Scout, Unify and Close sections and the Plates. The rest of the page stays |
| `assets/demo.css` | The shape kit, the app chrome (sidebar, bars, table, panel), the stages and the Spine |
| `assets/demo.js` | The scroll engine, typing, counters and the phone autoplay |
| `assets/home.css` | Hero changes and the feature cards under each stage |

Sample data lives in one place at the top of `index.html` as a comment, so the numbers stay consistent: Northwind, Priya Shah, Dana Ruiz, Sam Patel, $40,000 to $48,000, Dec 15 to Nov 28, pipeline $1.21M to $1.25M.

## 10. Build order

1. The shape kit and the app chrome in `demo.css`, checked on a static Scout frame.
2. The scroll engine and the Scout stage, end to end, on desktop and phone.
3. The Spine and the Scout to Unify hand-off.
4. The Unify stage.
5. The Close stage and the loop back up.
6. The hero Triangle that stretches into the Spine.
7. Feature cards with their drawings.
8. Reduced motion, no JavaScript, phone autoplay and a speed pass.

## 11. Running cost

The page stays static files on Hostinger, with no animation library and no new services.

| Stage | Added per month |
|---|---|
| Beta (50 reps) | $0 |
| Growth (500 reps) | $0 |
