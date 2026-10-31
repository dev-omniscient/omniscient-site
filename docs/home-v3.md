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
3. Three things it does, a full screen each, after Lightfield: a short title and one line on the left, and one big
   product screen on the right that runs off the edge of the page. On phones the words sit above the screen.
   - Build high-quality pipeline: Scout.
   - Unify all conversations: the CRM, one person's record with every source flowing into it.
   - Close deals with Netflix-like proposals: the Deal Room proposal, with rows for each person.
4. Replace five tools with one.
5. Security, Pricing, Questions, a closing band with the trial form.

## Motion
`assets/home.js` plays each product shot once when it comes into view (rows arrive, sources slide in, tiles fill).
With reduced motion, nothing moves.

## Copy
Plain and specific: each heading says what it does in a few words, with one line under it. No lists.
No stories and no claims the product can't back. The owl is called Omniscient on the site.

## Running cost
$0 a month at Beta and Growth: a static page on the same hosting, with Google Fonts.
