import React from 'react';
import {AbsoluteFill} from 'remotion';
import {B, INOUT, IN, OUT, prog, SPRING, useT} from './lib';
import {C, sans} from './theme';
import {Otto} from './world/ui';

const WORDS = ['There', 'has', 'to', 'be', 'a', 'better', 'way.'];

/** The turn: the keys stop, the screen goes navy, one line lands, and two owl eyes open in the dark. */
export const Turn: React.FC = () => {
	const t = useT();
	const a = B.turn;
	if (t < a - 0.2 || t > B.drop + 0.6) return null;
	const dark = prog(t, a - 0.15, a + 0.1, IN);
	const wipe = prog(t, B.drop - 0.5, B.drop + 0.4, INOUT);
	const textOut = prog(t, a + 2.2, a + 2.55, IN);
	const e = B.eyes;
	const open = 1 - prog(t, e + 0.05, e + 0.3);
	const blink = t > B.drop - 1.6 && t < B.drop - 1.35 ? Math.sin(((t - (B.drop - 1.6)) / 0.25) * Math.PI) : 0;
	const look = {x: t < e + 0.3 ? 0 : t < e + 0.6 ? -0.9 * prog(t, e + 0.3, e + 0.5) : -0.9 + 0.9 * prog(t, e + 0.6, e + 0.9), y: 0.1};
	const body = prog(t, B.reset - 0.1, B.reset + 0.4);
	const lock = prog(t, B.reset + 0.3, B.reset + 0.9, INOUT);
	const word = prog(t, B.reset + 0.5, B.reset + 0.9);
	const tagline = prog(t, B.reset + 1.6, B.reset + 2.0);
	const size = 360 - 170 * lock;
	return (
		<AbsoluteFill style={{background: C.navy, opacity: dark, clipPath: `inset(0 0 ${wipe * 100}% 0)`}}>
			<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', opacity: 1 - textOut, scale: `${1 + textOut * 0.06}`}}>
				<div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 34px', maxWidth: 1500}}>
					{WORDS.map((w, i) => {
						const p = prog(t, a + 0.2 + i * 0.23, a + 0.45 + i * 0.23, OUT);
						return (
							<span key={w} style={{fontFamily: sans, fontWeight: 600, fontSize: 150, lineHeight: 1.1, letterSpacing: -5.5, color: i >= 5 ? C.brandOnDark : '#fff', opacity: p, translate: `0 ${(1 - p) * 30}px`, filter: `blur(${(1 - p) * 8}px)`}}>
								{w}
							</span>
						);
					})}
				</div>
			</AbsoluteFill>
			{t > e - 0.1 ? (
				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
					<div style={{display: 'flex', alignItems: 'center', gap: 44 * lock, translate: `0 ${-40 * lock}px`}}>
						<Otto size={size} color={`rgba(255,255,255,${body})`} eye={body > 0.5 ? C.brand : '#ffffff'} pupil={body > 0.5 ? '#ffffff' : C.navy} look={look} blink={Math.max(open, blink)} style={{scale: `${0.96 + 0.04 * prog(t, B.reset - 0.1, B.reset + 0.5, SPRING)}`}} />
						{lock > 0 ? (
							<span style={{fontFamily: sans, fontWeight: 600, fontSize: 150 * lock, letterSpacing: -5, color: '#fff', opacity: word, width: 760 * lock, overflow: 'hidden', whiteSpace: 'nowrap'}}>Omniscient</span>
						) : null}
					</div>
					<div style={{position: 'absolute', top: 700, fontFamily: sans, fontSize: 52, fontWeight: 500, letterSpacing: -1.2, color: C.brandOnDark, opacity: tagline, translate: `0 ${(1 - tagline) * 14}px`}}>A CRM that updates itself.</div>
				</AbsoluteFill>
			) : null}
		</AbsoluteFill>
	);
};
