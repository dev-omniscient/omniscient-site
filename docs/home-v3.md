# Home page v3

The home page after folk's layout, in the app's square style. Replaces home v2 (the Scout, Unify and Close tour).

## Look
- Square corners, 1px black frames, no shadows. Section labels are mono in brackets.
- Each product shot sits on a pastel band with a light grain: blue, sand, lavender, pink, cream, peach.
- Product shots are HTML copies of the real app screens, with made-up companies, real portraits from Unsplash
  (`assets/img/people/`) and the real logos of the tools Omniscient connects to (`assets/logos/`).

## Order
1. Hero: headline, one line on what Omniscient does, email field to start a trial, the Companies screen.
2. Works with: Gmail, Outlook, LinkedIn, HubSpot, Salesforce, Zoom, Slack.
3. Three chapters on one arrow. Each chapter has a stage bar (pipeline chevrons) that stays at the top while you read it.
   - Pipeline: 01 Scout, 02 Campaigns, 03 Inbox.
   - CRM: 04 Unify, 05 Call intelligence, 06 Omniscient Context.
   - Deal Room: 07 Curate content, 08 Build proposal, 09 Send and close.
4. Replace five tools with one.
5. Security, Pricing, Questions, a closing band with the trial form.

## The arrow
`assets/home.js` draws one black line down the left of the three chapters as you scroll, to 40% of the screen height.
A stage's number box fills black when the line reaches it, and its chevron in the stage bar fills black; earlier
stages get a check. Each product shot plays once when it comes into view (rows arrive, approvals tick, a reply types,
the deal turns Won). With reduced motion, the line is drawn in full and nothing moves.

## Copy
Plain and specific: each heading names the feature, each paragraph says what it does, each list names the parts.
No stories and no claims the product can't back. The owl is called Omniscient on the site.

## Running cost
$0 a month at Beta and Growth: a static page on the same hosting, with Google Fonts.
