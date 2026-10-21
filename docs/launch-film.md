# Omniscient launch film: "There has to be a better way"

An 86-second film. Fifteen seconds of the problem: legacy CRMs cost too much and turn reps into typists. Then one line, "There has to be a better way", and Omniscient answers it. Otto opens his eyes and the CRM starts filling itself in, from first hello to closed deal.

Built like the Perceptric film (`dev-perceptric/perceptric-site`, `motion/launch`): one continuous camera move, look-alike tool screens and an original score that changes key at the turn. 1920 × 1080, 30 fps, 120 BPM (a bar is 2 seconds, 43 bars).

## The device: "Typed by hand"

A counter in the top right: **Typed by hand**. In the problem it spins up fast, with a keyboard clacking on every tick. When Omniscient arrives it resets to 0 and never moves again, and the keyboard sound is gone for good.

## Script

86 seconds. Times are where each voice line starts (`motion/launch/src/timeline.json`).

| Time | Voice | Picture |
|---|---|---|
| 0:00 | If you're on a legacy CRM, you know how it goes. | A renewal invoice. Line items stack up: seats, add-ons, AI credits. |
| 0:03 | It's expensive, and the price goes up every year. | A 9% price increase lands. The total keeps climbing. |
| 0:07 | On top of that, your reps spend hours every week typing in notes and updating deals by hand. | The camera moves to an old, grey CRM. Fields get typed in one key at a time. The "Typed by hand" counter climbs, with a keyboard clack on every tick. |
| 0:12 | That's time they should be spending with customers. | The camera pushes into the one empty field left, Notes. Everything else goes dark. |
| 0:16 | There has to be a better way. | The keys stop. The screen goes navy and the line lands one word at a time. |
| 0:19 | That's why we built Omniscient. It's a CRM that updates itself. | Two eyes open in the dark. Otto appears, the wordmark sets beside him, and the counter resets to 0. |
| 0:24 | Start by telling Scout who you want to sell to. It finds people on LinkedIn who match, and shows you why they're worth reaching out to right now. | Scout. The sentence types itself and its rules underline in blue. 128 people found. Priya's LinkedIn post lifts out as the signal. |
| 0:32 | Otto, our AI agent, writes the first message. You check it and hit approve. | The outreach sequence. Otto writes a message to Priya; Approve is pressed and the invite flies off. |
| 0:37 | When someone replies, it shows up in one inbox, right next to everything you know about them. | The inbox. "Thanks for reaching out. Tuesday works." The record panel slides in; Create opportunity. |
| 0:43 | After a call, Omniscient reads the transcript and updates the deal for you, from the stage to the next step. | The call transcript streams by. Four lines lift out and land in Stage, Amount, Next step and Close date. |
| 0:50 | Click any field to see exactly where it came from. | The receipt opens on Next step: the quote and the minute of the call it came from. |
| 0:53 | Your team doesn't have to type a thing. | The counter comes to the middle of the frame. Typed by hand: 0. |
| 0:56 | When it's time to close, Otto builds a private page for the deal, with the plan and pricing your buyer needs. | Templates, then Fill with this deal. The plan, the people, the SOC 2 report and the pricing build in. |
| 1:02 | Your buyer picks the number of seats and approves it right there. | Dana's phone. The seat slider moves to 40, the total settles at $48,000 a year, Approve. Blue squares burst. |
| 1:07 | Deal closed. | "Signed. Welcome aboard." The deal turns to Won. Otto hops. |
| 1:09 | Omniscient takes you from the first message to a signed deal, all in one place. And AI is included in the price. | The camera pulls all the way back: one line runs under Revenue, CRM and Deal Room. |
| 1:17 | Know everything. Close more. | The end card: Otto, the wordmark and the tagline. |
| 1:20 | Try it free at tryomniscient.com. | Start free, Book a demo and tryomniscient.com. |

**Sound:** a keyboard clack on every tick of the counter in the opening, and none after the turn. The music is D minor through the opening, stops dead at "There has to be a better way", comes back as a warm pad when Otto opens his eyes, drops into F major at 0:24 and lifts to G major when the buyer approves.

## Look

- **Brand:** `docs/brand.md` in the app repo. White and navy with the one brand blue, Inter, hairlines, 8px cards, tags as pills, shadows only on things that float, no gradients.
- **The problem is cold:** a gray-blue legacy CRM, cramped screens, empty fields, everything a little too small.
- **The better way is calm:** one screen at a time, one bold thing per frame, brand blue only where the eye should go.
- **Motion:** transform and opacity only. Rules underline themselves, rows rise with a blue flash, and the burst plays once, on Approve. Otto blinks, bobs while he works and hops when the deal closes.
- **Screens:** built from the homepage mocks (`assets/marketing.css`). The legacy CRM, LinkedIn and Meet are look-alikes with no real brand names, the same approach as the Perceptric film.

## Music

An original score built in code, the same way as the Perceptric film's audio.
- **The problem:** D minor, with the keyboard clack as the beat. It speeds up with the counter.
- **The turn:** the clacking stops dead, then a warm pad and the first bar of the hook.
- **The better way:** F major, which shares every note with D minor, so the same song turns hopeful. Full band from 0:22, and no keyboard sound from here to the end.
- **Final chorus:** at Approve (0:57) it lifts a whole step to G major.
- **Mix:** the voice sits about 6 dB on top, with the music ducking under every line. Master at -14 LUFS.

## Voice

Plain and conversational, like a founder showing the product to a friend. Built with Kokoro like the Perceptric film, or a hired voice actor if the budget allows (check the price).

## Cutdowns

| Cut | Length | What's in it |
|---|---|---|
| Launch film | 1:26 | Everything, 16:9 |
| Social | 0:30 | The problem in 8 seconds, the turn, Scout, the counter at 0, Approve, end card. 1:1 and 9:16 |
| Teaser | 0:15 | "There has to be a better way", Otto's eyes, the counter at 0, Closed won, end card. 9:16 |
| Hero loop | 0:20 | The better way without the voice, for the homepage video slot, muted and looping |

## Production

- **Engine:** Remotion, copied from the Perceptric film (`motion/launch`): the camera rig, the line-grid world, the look-alike screens and the audio pipeline. It goes in this repo as `motion/launch`.
- **Steps:** lock the script, build the timeline (one entry per voice line), build the screens from the site mocks, voice, score, mix, render, then spot-check stills.
- **People:** faces are stand-ins until licensed stock headshots are swapped in.

## Accuracy

- **The problem:** "Pricier every year" and "data entry" describe legacy CRMs in general. No competitor is named or priced on screen.
- **The better way:** every screen shows something Omniscient does today:
  - Scout signals come from public LinkedIn posts.
  - Messages wait for approval before they send.
  - Records fill from email and transcripts, each with its quote.
  - Otto fills the Deal Room from the deal.
  - The configurator and Approve elements are real.
  - AI is included in the seat price, with no credits to buy.

## Running cost

$0 extra a month at Beta (50 reps) and Growth (500 reps). The film renders on machines we already have, the voice and score are built with free open-source tools, and the files are served as static files. Writing it uses Claude tokens once. A hired voice actor or licensed stock photos would be one-time costs (check).
