"""Score: "One place", an original cue for the Omniscient film, lined up to src/timeline.json (120 BPM, a bar is 2 s).

The opening is D minor and gets busier as the keys speed up. It stops dead at "There has to be a better way."
A warm pad and the hook come in when Otto opens his eyes. From the drop it's the same song in F major (it shares
every note with D minor), and it lifts a whole step to G major when the buyer presses Approve.

Run: python audio/score.py   (needs fluidsynth and the FluidR3 GM soundfont)
Writes audio/build/midi/<stem>.mid and audio/build/stems/<stem>.wav (48 kHz).
"""
from __future__ import annotations

import json
import random
import subprocess
from pathlib import Path

import mido

ROOT = Path(__file__).resolve().parent.parent
TL = json.loads((ROOT / "src/timeline.json").read_text())
B = TL["beats"]
BPM = 120
TPB = 480  # ticks per beat
SEC = TPB * BPM / 60  # ticks per second
SF2 = "/usr/share/sounds/sf2/FluidR3_GM.sf2"
OUT_MIDI = ROOT / "audio/build/midi"
OUT_STEMS = ROOT / "audio/build/stems"
random.seed(7)

N = {n: i for i, n in enumerate(["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"])}
N.update({"Db": 1, "Eb": 3, "Gb": 6, "Ab": 8, "Bb": 10})


def note(name: str) -> int:
    """'A4' -> 69."""
    return 12 * (int(name[-1]) + 1) + N[name[:-1]]


# Chords as (root, quality). One per bar (2 s).
MINOR = [("D", "m"), ("A#", ""), ("F", ""), ("C", "")]       # Dm | Bb | F | C
MAJOR = [("F", ""), ("D", "m"), ("A#", ""), ("C", "")]       # F | Dm | Bb | C
# The hook in F major: (beat in the 4-bar phrase, length in beats, note)
HOOK = [(0, 1, "A4"), (1, 1, "C5"), (2, 1, "F5"), (3, 1, "E5"),
        (4, 1, "D5"), (5, 1, "C5"), (6, 2, "A4"),
        (8, 1, "A#4"), (9, 1, "D5"), (10, 1, "F5"), (11, 1, "G5"),
        (12, 2, "E5"), (14, 2, "C5")]


def triad(root: str, q: str, octave: int, shift: int = 0) -> list[int]:
    r = note(f"{root}{octave}") + shift
    return [r, r + (3 if q == "m" else 4), r + 7]


class Stem:
    def __init__(self, name: str, program: int, channel: int = 0, volume: int = 100):
        self.name, self.program, self.channel = name, program, channel
        self.events: list[tuple[float, str, int, int]] = []  # (seconds, on/off, note, velocity)
        self.volume = volume

    def add(self, t: float, length: float, pitch: int, vel: int) -> None:
        if t < 0 or pitch < 0:
            return
        jitter = random.uniform(-0.006, 0.006) if self.channel != 9 else 0
        self.events.append((max(0.0, t + jitter), "on", pitch, max(1, min(127, vel))))
        self.events.append((t + length, "off", pitch, 0))

    def write(self) -> Path:
        mid = mido.MidiFile(ticks_per_beat=TPB)
        tr = mido.MidiTrack()
        mid.tracks.append(tr)
        tr.append(mido.MetaMessage("set_tempo", tempo=mido.bpm2tempo(BPM), time=0))
        if self.channel != 9:
            tr.append(mido.Message("program_change", program=self.program, channel=self.channel, time=0))
        tr.append(mido.Message("control_change", control=7, value=self.volume, channel=self.channel, time=0))
        last = 0
        for t, kind, p, v in sorted(self.events, key=lambda e: (e[0], e[1] == "on")):
            tick = int(round(t * SEC))
            msg = "note_on" if kind == "on" else "note_off"
            tr.append(mido.Message(msg, note=p, velocity=v, channel=self.channel, time=max(0, tick - last)))
            last = max(last, tick)
        path = OUT_MIDI / f"{self.name}.mid"
        mid.save(path)
        return path


def bars(a: float, b: float):
    """Bar starts (s) from a up to b, on the 2 s grid."""
    t = a
    while t < b - 1e-6:
        yield t
        t += 2.0


def chord_at(t: float, prog: list, origin: float):
    return prog[int(round((t - origin) / 2.0)) % len(prog)]


def main() -> None:
    OUT_MIDI.mkdir(parents=True, exist_ok=True)
    OUT_STEMS.mkdir(parents=True, exist_ok=True)
    end = TL["durationSec"]
    turn, eyes, drop, press, close = B["turn"], B["eyes"], B["drop"], B["press"], B["close"]
    lift = round(press * 2) / 2  # the key change lands on the half beat nearest Approve
    lift_bar = drop + 2.0 * round((press - drop) / 2.0)  # bars of G major start here

    piano = Stem("piano", 0, 0, 96)
    bass = Stem("bass", 33, 1, 110)
    strings = Stem("strings", 48, 2, 92)
    pad = Stem("pad", 89, 3, 88)        # warm pad
    glock = Stem("glock", 9, 4, 80)
    pizz = Stem("pizz", 45, 5, 90)
    lead = Stem("lead", 11, 6, 100)     # vibraphone carries the hook
    choir = Stem("choir", 52, 7, 84)
    brass = Stem("brass", 61, 8, 86)
    drums = Stem("drums", 0, 9, 104)
    cello = Stem("cello", 42, 10, 90)
    timp = Stem("timpani", 47, 11, 96)

    # ---------- The opening: D minor, getting busier as the typing speeds up ----------
    for t in bars(0.0, turn):
        root, q = chord_at(t, MINOR, 0.0)
        cello.add(t, 2.0, note(f"{root}2"), 70)
        # A lonely piano figure that walks down the chord
        ch = triad(root, q, 4)
        for i, p in enumerate([ch[2], ch[1], ch[0], ch[1]]):
            piano.add(t + i * 0.5, 0.45, p, 58 + (8 if t >= B["toLegacy"] else 0))
        if t >= B["keys"][0] - 0.2:
            bass.add(t, 0.9, note(f"{root}2"), 84)
            bass.add(t + 1.0, 0.9, note(f"{root}2"), 80)
        if t >= 9.6:  # strings pulse in eighths
            for i in range(8):
                for p in triad(root, q, 3):
                    strings.add(t + i * 0.25, 0.22, p, 52 + i * 2)
        if t >= 12.0:  # hats in 16ths, kick on the beat
            for i in range(16):
                drums.add(t + i * 0.125, 0.05, 42, 50 + (18 if i % 4 == 0 else 0) + int((t - 12) * 4))
            for i in range(4):
                drums.add(t + i * 0.5, 0.1, 36, 92)
    # A last push into the stop: snare 16ths through the final bar, then nothing.
    for i in range(16):
        drums.add(turn - 2.0 + i * 0.125, 0.05, 38, 50 + i * 4)

    # ---------- The turn: silence, then a warm pad when Otto opens his eyes ----------
    for t in bars(eyes - 0.6, drop):
        root, q = chord_at(t, MAJOR, eyes - 0.6)
        for p in triad(root, q, 3) + [note(f"{root}2")]:
            pad.add(t, 2.0, p, 62 + int((t - eyes) * 3))
        strings.add(t, 2.0, triad(root, q, 4)[1], 48)
    # The first bar of the hook on glockenspiel, as the wordmark sets
    for beat, ln, n in HOOK[:4]:
        glock.add(B["reset"] + 0.4 + beat * 0.5, ln * 0.5, note(n) + 12, 78)
    # A soft timpani roll into the drop
    for i in range(16):
        timp.add(drop - 2.0 + i * 0.125, 0.12, note("F2"), 40 + i * 4)

    # ---------- The better way: F major from the drop, G major from Approve ----------
    for t in bars(drop, close):
        key = 2 if t >= lift_bar else 0
        root, q = chord_at(t, MAJOR, drop)
        ch = triad(root, q, 3, key)
        r2 = note(f"{root}2") + key
        intensity = (t - drop) / (close - drop)
        # Bass: driving eighths
        for i in range(8):
            bass.add(t + i * 0.25, 0.22, r2 + (12 if i in (3, 7) else 0), 88)
        # Piano: chords on the beat, an octave up after the record fills in
        for i in range(4):
            for p in ch:
                piano.add(t + i * 0.5, 0.42, p + (12 if t >= B["record"] else 0), 66 if i % 2 == 0 else 58)
        # Pizzicato arpeggio in sixteenths
        arp = [ch[0] + 12, ch[1] + 12, ch[2] + 12, ch[1] + 12]
        for i in range(16):
            pizz.add(t + i * 0.125, 0.1, arp[i % 4], 56 + (10 if i % 4 == 0 else 0))
        # Strings: long chords, and an ostinato from the inbox on
        for p in ch:
            strings.add(t, 2.0, p + 12, 58)
        if t >= B["inbox"]:
            for i in range(8):
                strings.add(t + i * 0.25, 0.2, ch[i % 3] + 24, 50)
        # Choir from the record on
        if t >= B["record"]:
            for p in ch:
                choir.add(t, 2.0, p + 12, 60 + int(intensity * 20))
        # Brass stabs from the deal room, and on every bar of the final chorus
        if t >= B["deal"]:
            for p in ch:
                brass.add(t, 0.35, p + 12, 74)
                if t >= lift_bar:
                    brass.add(t + 1.5, 0.3, p + 12, 70)
        # Drums: four on the floor, snare on 2 and 4, hats in eighths (sixteenths in the chorus)
        for i in range(4):
            drums.add(t + i * 0.5, 0.1, 36, 100)
            if i % 2 == 1:
                drums.add(t + i * 0.5, 0.1, 38, 92)
        hats = 16 if t >= lift_bar else 8
        for i in range(hats):
            drums.add(t + i * (2.0 / hats), 0.05, 42, 58 + (14 if i % (hats // 4) == 0 else 0))
        if abs(t - drop) < 1e-6 or abs(t - lift_bar) < 1e-6 or abs(t - B["deal"]) < 1.0:
            drums.add(t, 1.2, 49, 110)  # crash on the arrivals
    # The hook, every four bars, with the glockenspiel doubling it from the CRM on
    for phrase in bars(drop, close):
        if round((phrase - drop) / 2.0) % 4:
            continue
        key = 2 if phrase >= lift_bar else 0
        up = 12 if phrase >= lift_bar else 0
        for beat, ln, n in HOOK:
            at = phrase + beat * 0.5
            if at >= close:
                break
            lead.add(at, ln * 0.5 - 0.04, note(n) + key + up, 92)
            if phrase >= B["record"]:
                glock.add(at, ln * 0.5 - 0.04, note(n) + key + 12, 70)
    # A snare roll and timpani into Approve
    for i in range(16):
        drums.add(lift_bar - 2.0 + i * 0.125, 0.05, 38, 54 + i * 4)
        timp.add(lift_bar - 2.0 + i * 0.125, 0.12, note("G2"), 46 + i * 4)
    # Three stabs on the pull-back, each one higher
    for k, at in enumerate([B["pullback"] + 3.0, B["pullback"] + 3.75, B["pullback"] + 4.5]):
        for p in triad("G", "", 4, 2 * k):
            brass.add(at, 0.4, p, 92)
        timp.add(at, 0.3, note("G2"), 96)

    # ---------- The close: everyone on G, ringing out ----------
    for p in triad("G", "", 3) + [note("G2"), note("D5"), note("G5"), note("B5")]:
        for s, v in ((strings, 70), (choir, 66), (pad, 70), (brass, 78)):
            s.add(close + 0.15, end - close - 0.4, p, v)
    for p in triad("G", "", 4):
        piano.add(close + 0.15, 4.0, p, 84)
    glock.add(close + 0.15, 3.0, note("G6"), 90)
    bass.add(close + 0.15, end - close - 0.6, note("G1"), 96)
    timp.add(close + 0.15, 2.0, note("G2"), 110)
    drums.add(close + 0.15, 3.0, 49, 118)

    stems = [piano, bass, strings, pad, glock, pizz, lead, choir, brass, drums, cello, timp]
    for s in stems:
        mid = s.write()
        wav = OUT_STEMS / f"{s.name}.wav"
        subprocess.run(["fluidsynth", "-ni", "-g", "0.8", "-r", "48000", "-F", str(wav), SF2, str(mid)], check=True, capture_output=True)
        print("stem", s.name, len(s.events) // 2, "notes")


if __name__ == "__main__":
    main()
