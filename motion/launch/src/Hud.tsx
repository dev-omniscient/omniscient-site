import React from 'react';
import {AbsoluteFill} from 'remotion';
import {B, counterAt, hit, INOUT, life, prog, useT} from './lib';
import {C, POP_SM, sans} from './theme';
import {Otto} from './world/ui';

/** "Typed by hand": climbs with every key in the opening, resets to 0 at the turn and never moves again. */
export const Counter: React.FC = () => {
	const t = useT();
	const act1 = life(t, B.keys[0] - 0.3, B.turn, 0.3, 0.2);
	const act2 = life(t, B.reset + 0.2, B.pullback + 0.4, 0.3, 0.4);
	const on = Math.max(act1, act2);
	if (on <= 0) return null;
	const blue = t > B.turn;
	const value = blue ? 0 : counterAt(t);
	const lastKey = [...B.keys].reverse().find((k) => k <= t) ?? -9;
	const tick = blue ? 0 : hit(t, lastKey, 18);
	// On "Your team doesn't have to type a thing", the counter comes to the middle of the frame.
	const z = Math.min(prog(t, B.zero - 0.2, B.zero + 0.4, INOUT), 1 - prog(t, B.zero + 2.0, B.zero + 2.6, INOUT));
	const w = 330;
	const left = 1920 - 56 - w + (960 - w / 2 - (1920 - 56 - w)) * z;
	const top = 44 + (540 - 70 - 44) * z;
	const reset = hit(t, B.reset + 0.25, 5);
	return (
		<AbsoluteFill style={{pointerEvents: 'none'}}>
			{z > 0 ? <AbsoluteFill style={{background: C.navy, opacity: 0.55 * z}} /> : null}
			<div
				style={{
					position: 'absolute',
					left,
					top,
					width: w,
					height: 140,
					scale: `${1 + 1.3 * z}`,
					opacity: on,
					background: '#fff',
					borderRadius: 16,
					border: `1.5px solid ${blue ? C.line : C.oldLine}`,
					boxShadow: POP_SM,
					padding: '22px 28px',
					fontFamily: sans,
				}}
			>
				<div style={{fontSize: 22, fontWeight: 500, color: blue ? C.muted : C.old}}>Typed by hand</div>
				<div style={{fontSize: 64, fontWeight: 700, letterSpacing: -2, lineHeight: 1.1, color: blue ? C.brand : C.oldHead, fontVariantNumeric: 'tabular-nums', scale: `${1 + 0.08 * tick + 0.25 * reset}`, transformOrigin: 'left center'}}>
					{value}
				</div>
			</div>
		</AbsoluteFill>
	);
};

/** Which part is on screen: Revenue, CRM, Deal Room, like the sidebar on the site. */
export const Sections: React.FC = () => {
	const t = useT();
	const on = life(t, B.drop + 0.3, B.pullback + 0.2, 0.4, 0.4);
	if (on <= 0) return null;
	const active = [...B.sections].reverse().find(([, at]) => (at as number) <= t + 0.2)?.[0] ?? 'Revenue';
	return (
		<AbsoluteFill style={{pointerEvents: 'none'}}>
			<div style={{position: 'absolute', left: 56, top: 44, display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderRadius: 16, background: 'rgba(255,255,255,0.94)', border: `1.5px solid ${C.line}`, boxShadow: POP_SM, opacity: on, translate: `0 ${(1 - on) * -20}px`, fontFamily: sans}}>
				<Otto size={40} style={{marginRight: 10}} />
				{B.sections.map(([name]) => {
					const is = name === active;
					return (
						<span key={name as string} style={{position: 'relative', padding: '8px 16px', fontSize: 24, fontWeight: 600, color: is ? C.ink : C.light}}>
							{name}
							<span style={{position: 'absolute', left: 16, right: 16, bottom: 0, height: 3, borderRadius: 2, background: C.brand, opacity: is ? 1 : 0}} />
						</span>
					);
				})}
			</div>
		</AbsoluteFill>
	);
};

/** On the pull-back, the one line that sums it up. */
export const Headline: React.FC = () => {
	const t = useT();
	const a = B.pullback + 0.3;
	const on = life(t, a, B.close + 0.1, 0.5, 0.3);
	if (on <= 0) return null;
	const tag = prog(t, a + 4.0, a + 4.5);
	return (
		<AbsoluteFill style={{alignItems: 'center', pointerEvents: 'none'}}>
			<div style={{marginTop: 120, textAlign: 'center', fontFamily: sans, opacity: on, translate: `0 ${(1 - prog(t, a, a + 0.6)) * 20}px`}}>
				<div style={{fontSize: 92, fontWeight: 600, letterSpacing: -3.4, color: C.ink, lineHeight: 1.05}}>
					From the first message
					<br />
					to a <span style={{color: C.brand}}>signed deal</span>.
				</div>
				<div style={{display: 'inline-flex', marginTop: 30, padding: '12px 26px', borderRadius: 999, background: C.brandSoft, color: C.brand, fontSize: 30, fontWeight: 500, opacity: tag, scale: `${0.92 + 0.08 * tag}`}}>AI included in the price</div>
			</div>
		</AbsoluteFill>
	);
};
