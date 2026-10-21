# Omniscient launch film

"There has to be a better way": an 86-second film for Omniscient. Fifteen seconds of the problem (a legacy CRM that
costs more every year and a rep typing every field by hand), then the turn, then the same work done in Omniscient:
Scout, LinkedIn Outreach, the Unified Inbox, a record that fills itself in from a call, and a Deal Room that ends in
Closed won. One continuous camera move, 1920 × 1080, 30 fps, built on the Perceptric film's engine
(`dev-perceptric/perceptric-site`, `motion/launch`). The plan and script are in `docs/launch-film.md`.

## Run it

```bash
npm install
npm run studio
REMOTION_CHROME=<path to chrome-headless-shell> npx remotion render src/index.ts OmniscientLaunch out/omniscient-launch.mp4
REMOTION_CHROME=<path to chrome-headless-shell> node scripts/stills.mjs 2 20 54   # spot-check frames
```

## Where things are

| File | What |
|---|---|
| `src/timeline.json` | Every voice line and beat. Change a time here and the picture and the sound follow. |
| `src/Camera.tsx` | The one camera move, key by key. |
| `src/world/Act1.tsx` | The renewal invoice and the old CRM. |
| `src/world/Revenue.tsx` | Scout, the outreach sequence and the inbox. |
| `src/world/Crm.tsx` | The call transcript filling the record, and the receipt. |
| `src/world/DealRoom.tsx` | The Deal Room, the buyer's phone, the burst and Won. |
| `src/Turn.tsx`, `src/Hud.tsx`, `src/Close.tsx` | The turn, the "Typed by hand" counter and section bar, and the end card. |
| `audio/` | Voice, score, sound design and mix (below). |

## Audio

Everything you hear is built from code and lined up to `src/timeline.json`.

| Step | Script | Output |
|---|---|---|
| Voice | `vo.py <kokoro-v1.0.onnx> <voices-v1.0.bin>` | `public/audio/vo.wav` |
| Score | `score.py` | `audio/build/stems/*.wav` |
| Sound design | `sfx.py` | `public/audio/sfx.wav` |
| Mix | `mix.py` | `public/audio/mix.m4a` (the track the film plays) |

```bash
apt-get install -y fluidsynth fluid-soundfont-gm ffmpeg
python -m venv .venv && .venv/bin/pip install kokoro-onnx soundfile numpy scipy mido pyloudnorm
.venv/bin/python audio/vo.py kokoro-v1.0.onnx voices-v1.0.bin
.venv/bin/python audio/score.py
.venv/bin/python audio/sfx.py
.venv/bin/python audio/mix.py
```

The voice is Kokoro's `af_heart`. The score uses the FluidR3 General MIDI soundfont. The master sits at -14 LUFS with
peaks under -1 dBFS.

## People

Everyone on screen is made up and shown with initials, so there are no photos to license. The legacy CRM, LinkedIn and
the meeting are look-alikes; no real CRM is named.
