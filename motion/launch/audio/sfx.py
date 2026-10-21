"""Sound design, built from code and lined up to src/timeline.json.

The keyboard clacks on every tick of the "Typed by hand" counter in the opening, and never again after the turn.
The rest are small UI sounds: clicks for presses, pops for things arriving, chimes as fields fill, whooshes for
camera moves, and one sparkle for the burst on Approve.

Run: python audio/sfx.py   Writes public/audio/sfx.wav (48 kHz, mono, the full film).
"""
from __future__ import annotations

import json
from pathlib import Path

import numpy as np
import soundfile as sf
from scipy.signal import butter, sosfilt

ROOT = Path(__file__).resolve().parent.parent
TL = json.loads((ROOT / "src/timeline.json").read_text())
B = TL["beats"]
SR = 48000
N = int(TL["durationSec"] * SR)
rng = np.random.default_rng(11)
track = np.zeros(N, dtype=np.float64)


def band(x: np.ndarray, lo: float, hi: float) -> np.ndarray:
    return sosfilt(butter(4, [lo, hi], btype="band", fs=SR, output="sos"), x)


def env(n: int, attack: float, decay: float) -> np.ndarray:
    t = np.arange(n) / SR
    a = np.clip(t / max(attack, 1e-4), 0, 1)
    return a * np.exp(-t / decay)


def place(at: float, x: np.ndarray, gain: float) -> None:
    i = int(at * SR)
    if i >= N:
        return
    j = min(N, i + len(x))
    track[i:j] += gain * x[: j - i]


def tone(f0: float, f1: float, dur: float, decay: float) -> np.ndarray:
    n = int(dur * SR)
    f = np.linspace(f0, f1, n)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.004, decay)


def key_clack(seed: int) -> np.ndarray:
    r = np.random.default_rng(seed)
    n = int(0.07 * SR)
    noise = r.standard_normal(n)
    body = band(noise, 1800 + r.uniform(-300, 300), 6500) * env(n, 0.0008, 0.012)
    thock = band(noise, 250, 900) * env(n, 0.001, 0.02) * 0.6
    return body + thock


def click(gain_hi: float = 1.0) -> np.ndarray:
    n = int(0.05 * SR)
    return band(rng.standard_normal(n), 2500, 9000) * env(n, 0.0005, 0.006) * gain_hi + tone(1200, 900, 0.05, 0.01) * 0.4


def pop(f: float = 660) -> np.ndarray:
    return tone(f * 0.7, f * 1.3, 0.16, 0.05)


def chime(f: float) -> np.ndarray:
    x = tone(f, f, 0.9, 0.35) + 0.5 * tone(f * 2, f * 2, 0.9, 0.2) + 0.25 * tone(f * 3, f * 3, 0.9, 0.12)
    return x / 1.75


def whoosh(dur: float, rise: bool = True) -> np.ndarray:
    n = int(dur * SR)
    x = rng.standard_normal(n)
    out = np.zeros(n)
    steps = 24
    for k in range(steps):
        a, b = k * n // steps, (k + 1) * n // steps
        p = k / (steps - 1)
        f = 400 + (3200 if rise else 1600) * (p if rise else 1 - p)
        out[a:b] = band(x[a:b], f * 0.6, f * 1.6)
    shape = np.sin(np.linspace(0, np.pi, n)) ** 2
    return out * shape


def thump() -> np.ndarray:
    return tone(140, 45, 0.35, 0.09) * 1.4 + band(rng.standard_normal(int(0.35 * SR)), 80, 400) * env(int(0.35 * SR), 0.002, 0.04) * 0.5


def sparkle(dur: float = 1.1) -> np.ndarray:
    n = int(dur * SR)
    out = np.zeros(n)
    for _ in range(26):
        f = rng.uniform(2200, 5200)
        s = int(rng.uniform(0, 0.75) * SR)
        g = tone(f, f * 1.02, 0.25, 0.06) * rng.uniform(0.3, 0.8)
        out[s : s + len(g)] += g[: n - s]
    return out


def main() -> None:
    # The opening: invoice lines tick in, the price rise lands with a thud.
    for at in (0.6, 1.3, 2.0, 2.7):
        place(at, pop(520), 0.25)
    place(B["priceUp"], thump(), 0.5)
    place(B["toLegacy"] - 0.15, whoosh(0.6), 0.25)
    # Every key, until the turn.
    for i, at in enumerate(B["keys"]):
        place(at, key_clack(i), 0.55 + 0.15 * (i / len(B["keys"])))
        if i % 9 == 4:
            place(at + 0.06, key_clack(1000 + i), 0.35)
    # The turn: a swell into the dark, then a soft bloop as the eyes open, and the counter's reset click.
    place(B["turn"] - 0.5, whoosh(0.55), 0.35)
    place(B["eyes"] + 0.05, tone(220, 440, 0.4, 0.15), 0.35)
    place(B["reset"] + 0.25, click(), 0.6)
    place(B["drop"] - 0.9, whoosh(1.0), 0.45)
    # Camera moves between stations.
    for k in ("outreach", "inbox", "record", "deal"):
        place(B[k] - 0.85, whoosh(0.8, rise=False), 0.28)
    # Scout: the rows arrive.
    for i in range(5):
        place(B["scout"] + 3.3 + i * 0.12, pop(700 + i * 60), 0.12)
    place(B["scout"] + 5.4, pop(880), 0.2)
    # Outreach: Approve, then the invite flies off.
    place(B["approve"], click(), 0.6)
    place(B["approve"] + 0.35, whoosh(0.7), 0.25)
    # Inbox: the reply pops in, then Create opportunity.
    place(B["inbox"] + 0.4, pop(740), 0.3)
    place(B["inbox"] + 2.8, click(), 0.5)
    # CRM: a chime for each field, climbing.
    for at, f in ((2.5, 784), (3.2, 880), (3.9, 988), (4.6, 1175)):
        place(B["record"] + at, chime(f), 0.22)
    place(B["receipt"], pop(620), 0.3)
    place(B["zero"] - 0.2, whoosh(0.5), 0.25)
    # Deal Room: Fill with this deal, then each section lands.
    place(B["fill"] - 0.15, click(), 0.5)
    for at in (0.3, 1.0, 1.6, 2.2, 2.8):
        place(B["fill"] + at, pop(660), 0.14)
    for i in range(14):  # the seat slider
        place(B["phone"] + 0.6 + i * 0.13, click(0.5), 0.12)
    # Approve: the big moment.
    place(B["press"], click(), 0.7)
    place(B["press"] + 0.03, thump(), 0.55)
    place(B["press"] + 0.05, sparkle(), 0.3)
    place(B["press"] + 0.9, pop(900), 0.3)
    place(B["won"], chime(1175) + chime(1480) * 0.7, 0.3)
    place(B["pullback"], whoosh(1.4, rise=False), 0.3)
    place(B["close"] + 0.15, chime(784) + chime(988) * 0.6, 0.25)

    peak = np.abs(track).max()
    out = (track / peak * 0.9).astype(np.float32)
    (ROOT / "public/audio").mkdir(parents=True, exist_ok=True)
    sf.write(ROOT / "public/audio/sfx.wav", out, SR)
    print("sfx peak", round(float(peak), 3))


if __name__ == "__main__":
    main()
