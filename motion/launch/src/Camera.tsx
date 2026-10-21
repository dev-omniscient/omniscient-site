import React from 'react';
import {Easing, interpolate, useVideoConfig} from 'remotion';
import {B, hit, INOUT, useT} from './lib';
import {DEAL, INBOX, INVOICE, LEGACY, NOTES_FIELD, OUTREACH, PHONE, RECORD, ROW, SCOUT} from './layout';

type Key = {t: number; x: number; y: number; z: number; ease?: (n: number) => number};

const WHIP = Easing.bezier(0.7, 0, 0.18, 1);
const RAMP = Easing.bezier(0.45, 0, 0.0, 1);

// One continuous shot. Each key is where the camera points and how close it is.
export const KEYS: Key[] = [
	{t: 0, x: INVOICE.x, y: INVOICE.y, z: 1.02},
	{t: 3.9, x: INVOICE.x + 20, y: INVOICE.y, z: 1.1},
	{t: 4.8, x: LEGACY.x, y: LEGACY.y, z: 0.98, ease: WHIP},
	{t: 11.9, x: LEGACY.x + 30, y: LEGACY.y + 10, z: 1.05},
	{t: 13.2, x: NOTES_FIELD.x, y: NOTES_FIELD.y - 20, z: 2.3, ease: INOUT},
	{t: 15.0, x: NOTES_FIELD.x + 10, y: NOTES_FIELD.y - 20, z: 2.5},
	// Behind the turn, the camera parks above the first station.
	{t: 15.1, x: SCOUT.x, y: ROW - 260, z: 0.7},
	{t: 21.8, x: SCOUT.x, y: ROW - 260, z: 0.7},
	{t: 23.0, x: SCOUT.x, y: SCOUT.y, z: 0.96, ease: RAMP},
	{t: 29.5, x: SCOUT.x + 40, y: SCOUT.y, z: 0.99},
	{t: 30.4, x: OUTREACH.x, y: OUTREACH.y, z: 0.96, ease: WHIP},
	{t: 33.5, x: OUTREACH.x + 40, y: OUTREACH.y, z: 0.99},
	{t: 34.4, x: INBOX.x, y: INBOX.y, z: 0.94, ease: WHIP},
	{t: 37.5, x: INBOX.x + 40, y: INBOX.y, z: 0.97},
	{t: 38.4, x: RECORD.x, y: RECORD.y, z: 0.9, ease: WHIP},
	{t: 50.3, x: RECORD.x + 60, y: RECORD.y, z: 0.95},
	{t: 51.3, x: DEAL.x, y: DEAL.y, z: 0.92, ease: WHIP},
	{t: 56.4, x: DEAL.x + 40, y: DEAL.y, z: 0.95},
	{t: 57.4, x: PHONE.x - 170, y: PHONE.y - 10, z: 1.16, ease: INOUT},
	{t: 61.4, x: PHONE.x - 150, y: PHONE.y - 10, z: 1.2},
	{t: 62.3, x: DEAL.x + 280, y: DEAL.y, z: 0.86, ease: INOUT},
	{t: 65.5, x: DEAL.x + 300, y: DEAL.y, z: 0.88},
	{t: 67.6, x: 3800, y: ROW + 40, z: 0.205, ease: INOUT},
	{t: 72.5, x: 3800, y: ROW + 40, z: 0.215},
];

export const cameraAt = (t: number) => {
	const i = Math.max(0, KEYS.findIndex((k) => k.t > t) - 1);
	const a = KEYS[Math.min(i, KEYS.length - 1)];
	const b = KEYS[Math.min(i + 1, KEYS.length - 1)];
	if (a === b || t <= a.t) return {x: a.x, y: a.y, z: a.z};
	const p = interpolate(t, [a.t, b.t], [0, 1], {easing: b.ease ?? INOUT, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	return {x: a.x + (b.x - a.x) * p, y: a.y + (b.y - a.y) * p, z: Math.exp(Math.log(a.z) + (Math.log(b.z) - Math.log(a.z)) * p)};
};

// While the camera travels, the map tips back a little, then levels out to read.
const TRAVEL: [number, number, number][] = [
	[3.9, 4.8, 10],
	[21.8, 23.0, 22],
	[29.5, 30.4, 12],
	[33.5, 34.4, 12],
	[37.5, 38.4, 12],
	[50.3, 51.3, 12],
];
export const tiltAt = (t: number) => TRAVEL.reduce((rx, [a, b, amp]) => (t > a && t < b ? rx + amp * Math.sin(Math.PI * ((t - a) / (b - a))) : rx), 0);

// The camera punches in only on the big hits.
const HITS: [number, number][] = [
	[B.drop + 1.0, 0.025],
	[B.approve, 0.02],
	[B.press, 0.035],
	[B.won, 0.03],
];
export const punchAt = (t: number) => HITS.reduce((s, [at, amp]) => s + amp * hit(t, at, 7), 0);

/** Fast stretches get motion blur. */
export const BLUR: [number, number][] = [
	[4.0, 4.6],
	[22.0, 22.8],
	[29.6, 30.2],
	[33.6, 34.2],
	[37.6, 38.2],
	[50.4, 51.1],
];

/** The world, seen through the camera. Children use world coordinates. */
export const World: React.FC<{children: React.ReactNode}> = ({children}) => {
	const t = useT();
	const {width, height} = useVideoConfig();
	const cam = cameraAt(t);
	const rx = tiltAt(t);
	const z = cam.z * (1 - rx / 160) * (1 + punchAt(t));
	return (
		<div style={{position: 'absolute', inset: 0, perspective: 1800, perspectiveOrigin: '50% 45%'}}>
			<div
				style={{
					position: 'absolute',
					left: 0,
					top: 0,
					width: 0,
					height: 0,
					transformOrigin: '0 0',
					transform: `translate(${width / 2}px, ${height / 2}px) rotateX(${rx}deg) scale(${z}) translate(${-cam.x}px, ${-cam.y}px)`,
				}}
			>
				{children}
			</div>
		</div>
	);
};
