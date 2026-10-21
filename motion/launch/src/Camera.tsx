import React from 'react';
import {Easing, interpolate, useVideoConfig} from 'remotion';
import {B, hit, INOUT, useT} from './lib';
import {DEAL, INBOX, INVOICE, LEGACY, NOTES_FIELD, OUTREACH, PHONE, RECORD, ROW, SCOUT} from './layout';

type Key = {t: number; x: number; y: number; z: number; ease?: (n: number) => number};

const WHIP = Easing.bezier(0.7, 0, 0.18, 1);
const RAMP = Easing.bezier(0.45, 0, 0.0, 1);

// One continuous shot. Each key is where the camera points and how close it is.
export const KEYS: Key[] = [
	{t: 0, x: INVOICE.x, y: INVOICE.y, z: 1.0},
	{t: B.toLegacy - 0.1, x: INVOICE.x + 20, y: INVOICE.y, z: 1.12},
	{t: B.toLegacy + 0.8, x: LEGACY.x, y: LEGACY.y, z: 0.98, ease: WHIP},
	{t: B.zoomField - 0.9, x: LEGACY.x + 30, y: LEGACY.y + 10, z: 1.05},
	{t: B.zoomField + 0.4, x: NOTES_FIELD.x, y: NOTES_FIELD.y - 20, z: 2.3, ease: INOUT},
	{t: B.turn, x: NOTES_FIELD.x + 10, y: NOTES_FIELD.y - 20, z: 2.5},
	// Behind the turn, the camera parks above the first station.
	{t: B.turn + 0.1, x: SCOUT.x, y: ROW - 260, z: 0.7},
	{t: B.drop - 0.2, x: SCOUT.x, y: ROW - 260, z: 0.7},
	{t: B.drop + 1.0, x: SCOUT.x, y: SCOUT.y, z: 0.96, ease: RAMP},
	{t: B.outreach - 0.9, x: SCOUT.x + 40, y: SCOUT.y, z: 0.99},
	{t: B.outreach, x: OUTREACH.x, y: OUTREACH.y, z: 0.96, ease: WHIP},
	{t: B.inbox - 0.9, x: OUTREACH.x + 40, y: OUTREACH.y, z: 0.99},
	{t: B.inbox, x: INBOX.x, y: INBOX.y, z: 0.94, ease: WHIP},
	{t: B.record - 0.9, x: INBOX.x + 40, y: INBOX.y, z: 0.97},
	{t: B.record, x: RECORD.x, y: RECORD.y, z: 0.9, ease: WHIP},
	{t: B.deal - 1.0, x: RECORD.x + 60, y: RECORD.y, z: 0.95},
	{t: B.deal, x: DEAL.x, y: DEAL.y, z: 0.92, ease: WHIP},
	{t: B.phone, x: DEAL.x + 40, y: DEAL.y, z: 0.95},
	{t: B.phone + 1.0, x: PHONE.x - 170, y: PHONE.y - 10, z: 1.16, ease: INOUT},
	{t: B.press + 0.9, x: PHONE.x - 150, y: PHONE.y - 10, z: 1.2},
	{t: B.won + 0.3, x: DEAL.x + 280, y: DEAL.y, z: 0.86, ease: INOUT},
	{t: B.pullback - 0.5, x: DEAL.x + 300, y: DEAL.y, z: 0.88},
	{t: B.pullback + 1.6, x: 3800, y: ROW + 40, z: 0.205, ease: INOUT},
	{t: B.close + 0.5, x: 3800, y: ROW + 40, z: 0.215},
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
	[B.toLegacy - 0.1, B.toLegacy + 0.8, 10],
	[B.drop - 0.2, B.drop + 1.0, 22],
	[B.outreach - 0.9, B.outreach, 12],
	[B.inbox - 0.9, B.inbox, 12],
	[B.record - 0.9, B.record, 12],
	[B.deal - 1.0, B.deal, 12],
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
	[B.toLegacy, B.toLegacy + 0.6],
	[B.drop, B.drop + 0.8],
	[B.outreach - 0.8, B.outreach - 0.2],
	[B.inbox - 0.8, B.inbox - 0.2],
	[B.record - 0.8, B.record - 0.2],
	[B.deal - 0.9, B.deal - 0.2],
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
