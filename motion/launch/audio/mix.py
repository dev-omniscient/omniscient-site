"""Mix: the score stems, the sound design and the voice, mastered to -14 LUFS with peaks under -1 dBFS.

Run after score.py, sfx.py and vo.py:  python audio/mix.py
Writes public/audio/mix.wav and public/audio/mix.m4a (the track the film plays).
"""
from __future__ import annotations

import json
import subprocess
from pathlib import Path

import numpy as np
import pyloudnorm as pyln
import soundfile as sf
from scipy.ndimage import maximum_filter1d, uniform_filter1d
from scipy.signal import butter, fftconvolve, sosfilt

ROOT = Path(__file__).resolve().parent.parent
TL = json.loads((ROOT / "src/timeline.json").read_text())
B = TL["beats"]
SR = 48000
END = float(TL["durationSec"])
N = int(END * SR)

# stem: gain dB, pan (-1..1), reverb send
STEMS = {
    "piano": (-3.0, -0.15, 0.22),
    "bass": (-2.0, 0.0, 0.0),
    "strings": (-5.0, 0.2, 0.3),
    "pad": (-6.0, 0.0, 0.35),
    "glock": (-9.0, 0.3, 0.35),
    "pizz": (-8.0, -0.35, 0.15),
    "lead": (-2.5, 0.05, 0.25),
    "choir": (-7.0, 0.0, 0.4),
    "brass": (-7.0, -0.2, 0.25),
    "drums": (-3.0, 0.0, 0.08),
    "cello": (-2.0, 0.0, 0.25),
    "timpani": (-5.0, 0.0, 0.25),
}
MUSIC_LUFS = -20.0
VOICE_LUFS = -16.5
SFX_LUFS = -26.0
DUCK_DB, ATTACK, RELEASE = -7.0, 0.06, 0.5


def load(path: Path, stereo: bool = True) -> np.ndarray:
    x, sr = sf.read(path, always_2d=True)
    assert sr == SR, (path, sr)
    if stereo and x.shape[1] == 1:
        x = np.repeat(x, 2, axis=1)
    if not stereo:
        x = x.mean(axis=1, keepdims=True)
    out = np.zeros((N, x.shape[1]))
    n = min(N, len(x))
    out[:n] = x[:n]
    return out


def reverb(x: np.ndarray) -> np.ndarray:
    """A short, soft hall: decaying noise as the impulse."""
    rng = np.random.default_rng(3)
    n = int(1.6 * SR)
    t = np.arange(n) / SR
    ir = rng.standard_normal((n, 2)) * np.exp(-t / 0.45)[:, None]
    ir[: int(0.012 * SR)] = 0
    ir /= np.sqrt((ir**2).sum(axis=0))
    return np.stack([fftconvolve(x[:, c], ir[:, c])[: len(x)] for c in range(2)], axis=1)


def loud(x: np.ndarray) -> float:
    return pyln.Meter(SR).integrated_loudness(x)


def gain_to(x: np.ndarray, target: float) -> np.ndarray:
    return x * 10 ** ((target - loud(x)) / 20)


def main() -> None:
    stems_dir = ROOT / "audio/build/stems"
    dry = np.zeros((N, 2))
    send = np.zeros((N, 2))
    for name, (g, pan, rv) in STEMS.items():
        x = load(stems_dir / f"{name}.wav") * 10 ** (g / 20)
        x[:, 0] *= min(1.0, 1 - pan)
        x[:, 1] *= min(1.0, 1 + pan)
        dry += x
        send += x * rv
    music = dry + reverb(send) * 0.6
    music = sosfilt(butter(2, 30, btype="high", fs=SR, output="sos"), music, axis=0)
    music = gain_to(music, MUSIC_LUFS)

    voice = load(ROOT / "public/audio/vo.wav")
    voice = sosfilt(butter(2, 90, btype="high", fs=SR, output="sos"), voice, axis=0)
    voice = gain_to(voice, VOICE_LUFS)

    # Duck the music under the voice.
    level = maximum_filter1d(np.abs(voice).max(axis=1), size=int(0.05 * SR))
    talking = (level > 10 ** (-40 / 20)).astype(float)
    talking = maximum_filter1d(talking, size=int(RELEASE * SR))
    duck = 1 - (1 - 10 ** (DUCK_DB / 20)) * uniform_filter1d(talking, size=int(ATTACK * SR * 4))
    music *= duck[:, None]

    sfx = load(ROOT / "public/audio/sfx.wav")
    sfx = gain_to(sfx, SFX_LUFS)

    mix = music + voice + sfx
    # Fade the last chord out.
    fade = np.ones(N)
    a = int((END - 3.0) * SR)
    fade[a:] = np.cos(np.linspace(0, np.pi / 2, N - a)) ** 2
    mix *= fade[:, None]
    # Master: -14 LUFS, then a soft clip so no peak tops -1 dBFS.
    mix = gain_to(mix, -14.0)
    ceiling = 10 ** (-1.0 / 20)
    mix = np.tanh(mix / ceiling) * ceiling
    print("mix LUFS", round(loud(mix), 2), "peak dBFS", round(20 * np.log10(np.abs(mix).max()), 2))
    sf.write(ROOT / "public/audio/mix.wav", mix.astype(np.float32), SR)
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(ROOT / "public/audio/mix.wav"), "-c:a", "aac", "-b:a", "256k", str(ROOT / "public/audio/mix.m4a")], check=True)
    print("wrote public/audio/mix.m4a")


if __name__ == "__main__":
    main()
