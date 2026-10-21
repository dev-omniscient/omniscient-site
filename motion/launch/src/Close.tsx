import React from 'react';
import {AbsoluteFill} from 'remotion';
import {B, IN, prog, SPRING, useT} from './lib';
import {C, sans} from './theme';
import {Btn, Otto} from './world/ui';

/** The end card: Otto and the wordmark on white, the tagline, then Start free. */
export const Close: React.FC = () => {
	const t = useT();
	const a = B.close;
	if (t < a - 0.1) return null;
	const white = prog(t, a - 0.1, a + 0.4, IN);
	const logo = prog(t, a + 0.15, a + 0.6, SPRING);
	const tag = prog(t, a + 0.5, a + 0.9);
	const cta = prog(t, B.cta, B.cta + 0.4);
	const blink = t > B.end - 2 && t < B.end - 1.75 ? Math.sin(((t - (B.end - 2)) / 0.25) * Math.PI) : 0;
	return (
		<AbsoluteFill style={{background: `rgba(255,255,255,${white})`, alignItems: 'center', justifyContent: 'center', fontFamily: sans}}>
			<div style={{display: 'flex', alignItems: 'center', gap: 40, opacity: logo, scale: `${0.9 + 0.1 * logo}`, translate: `0 ${-60 - 40 * cta}px`}}>
				<Otto size={190} blink={blink} />
				<span style={{fontSize: 170, fontWeight: 600, letterSpacing: -6, color: C.ink}}>Omniscient</span>
			</div>
			<div style={{position: 'absolute', top: 650 - 40 * cta, fontSize: 64, fontWeight: 600, letterSpacing: -2, color: C.ink, opacity: tag, translate: `0 ${(1 - tag) * 14}px`}}>
				Know everything. <span style={{color: C.brand}}>Close more.</span>
			</div>
			<div style={{position: 'absolute', top: 800, display: 'flex', alignItems: 'center', gap: 22, opacity: cta, translate: `0 ${(1 - cta) * 16}px`}}>
				<Btn size={34}>Start free →</Btn>
				<Btn kind="ghost" size={34}>
					Book a demo
				</Btn>
				<span style={{fontSize: 34, fontWeight: 500, color: C.muted, marginLeft: 18}}>tryomniscient.com</span>
			</div>
		</AbsoluteFill>
	);
};
