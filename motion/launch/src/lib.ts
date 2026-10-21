import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import tl from './timeline.json';

export const TL = tl;
export const B = tl.beats;

// The brand curves: ease-out for most things, a spring for presses and pops.
export const OUT = Easing.bezier(0.2, 0.8, 0.2, 1);
export const INOUT = Easing.bezier(0.65, 0, 0.35, 1);
export const IN = Easing.bezier(0.55, 0, 1, 0.45);
export const SPRING = Easing.bezier(0.3, 1.5, 0.6, 1);

/** Seconds since the film started. */
export const useT = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	return frame / fps;
};

/** Clamped interpolation over seconds. */
export const tw = (t: number, range: [number, number], out: [number, number], ease: (n: number) => number = OUT) =>
	interpolate(t, range, out, {easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

/** 0 → 1 between two times. */
export const prog = (t: number, a: number, b: number, ease: (n: number) => number = OUT) => tw(t, [a, b], [0, 1], ease);

/** Fade in at `a`, out at `b`. */
export const life = (t: number, a: number, b: number, fadeIn = 0.3, fadeOut = 0.35) =>
	Math.min(prog(t, a, a + fadeIn), 1 - prog(t, b - fadeOut, b, IN));

/** How much of a line has been typed, one character at a time. */
export const typed = (text: string, t: number, start: number, end: number) =>
	text.slice(0, Math.floor(tw(t, [start, end], [0, text.length], (n) => n)));

/** A number that rolls toward its target. */
export const roll = (t: number, a: number, b: number, from: number, to: number) =>
	Math.round(tw(t, [a, b], [from, to], Easing.bezier(0.16, 1, 0.3, 1)));

/** A punch that hits at `at` and settles fast. */
export const hit = (t: number, at: number, decay = 9) => (t < at ? 0 : Math.exp(-(t - at) * decay));

/** A press: shrinks to 96% and springs back. */
export const press = (t: number, at: number) => (t < at ? 1 : t < at + 0.08 ? 1 - 0.04 * ((t - at) / 0.08) : 0.96 + 0.04 * prog(t, at + 0.08, at + 0.3, SPRING));

/** How many key clacks have happened by `t` (the "Typed by hand" counter moves on each). */
export const keysBy = (t: number) => B.keys.filter((k) => k <= t).length;
export const counterAt = (t: number) => Math.round((keysBy(t) / B.keys.length) * B.counterMax);

export const money = (n: number) => `$${n.toLocaleString('en-US')}`;
