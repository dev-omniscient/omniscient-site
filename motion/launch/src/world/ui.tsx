import React from 'react';
import {Img, staticFile} from 'remotion';
import {C, POP_SM, sans} from '../theme';

export type Pt = {x: number; y: number};

/** Places children so their center sits on a world point. */
export const At: React.FC<{p: Pt; w: number; h: number; style?: React.CSSProperties; children?: React.ReactNode}> = ({p, w, h, style, children}) => (
	<div style={{position: 'absolute', left: p.x - w / 2, top: p.y - h / 2, width: w, height: h, ...style}}>{children}</div>
);

/** An app window: white, hairline border, 8px corners. Cards don't get shadows; floating ones do. */
export const Card: React.FC<{style?: React.CSSProperties; float?: boolean; children?: React.ReactNode}> = ({style, float, children}) => (
	<div
		style={{
			position: 'absolute',
			inset: 0,
			background: C.panel,
			border: `1.5px solid ${C.line}`,
			borderRadius: 14,
			boxShadow: float ? POP_SM : 'none',
			overflow: 'hidden',
			fontFamily: sans,
			color: C.ink,
			...style,
		}}
	>
		{children}
	</div>
);

/** The app's top bar: breadcrumb on the left, a tag on the right. */
export const AppBar: React.FC<{crumb: string; page: string; right?: React.ReactNode; size?: number}> = ({crumb, page, right, size = 22}) => (
	<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: size * 3, padding: `0 ${size * 1.2}px`, borderBottom: `1.5px solid ${C.line}`, fontSize: size}}>
		<span style={{color: C.faint}}>
			{crumb} <span style={{color: C.light, margin: '0 6px'}}>/</span> <b style={{color: C.ink, fontWeight: 500}}>{page}</b>
		</span>
		{right}
	</div>
);

type Tone = 'neutral' | 'brand' | 'green' | 'orange' | 'red' | 'purple' | 'sky' | 'turquoise';
const TONE: Record<Tone, [string, string]> = {
	neutral: [C.hover, C.muted],
	brand: [C.brandSoft, C.brand],
	green: [C.greenSoft, C.green],
	orange: [C.orangeSoft, C.orange],
	red: [C.redSoft, C.red],
	purple: [C.purpleSoft, C.purple],
	sky: [C.skySoft, C.sky],
	turquoise: [C.turquoiseSoft, C.turquoise],
};

/** A state tag: a pill, step 3 fill with step 11 text. */
export const Tag: React.FC<{tone?: Tone; size?: number; children: React.ReactNode; style?: React.CSSProperties}> = ({tone = 'neutral', size = 18, children, style}) => (
	<span
		style={{
			display: 'inline-flex',
			alignItems: 'center',
			gap: size * 0.35,
			height: size * 1.7,
			padding: `0 ${size * 0.62}px`,
			borderRadius: 999,
			background: TONE[tone][0],
			color: TONE[tone][1],
			fontSize: size,
			fontWeight: 500,
			whiteSpace: 'nowrap',
			...style,
		}}
	>
		{children}
	</span>
);

/** Initials in a soft circle, in place of a photo. */
export const Avatar: React.FC<{initials: string; tone?: Tone; size?: number}> = ({initials, tone = 'sky', size = 44}) => (
	<span
		style={{
			display: 'inline-flex',
			alignItems: 'center',
			justifyContent: 'center',
			flexShrink: 0,
			width: size,
			height: size,
			borderRadius: 999,
			background: TONE[tone][0],
			color: TONE[tone][1],
			fontSize: size * 0.38,
			fontWeight: 600,
			fontFamily: sans,
		}}
	>
		{initials}
	</span>
);

/** Otto: the mark with a face. `look` moves his pupils (-1..1), `blink` closes his eyes (0..1). */
export const Otto: React.FC<{size: number; color?: string; eye?: string; pupil?: string; look?: Pt; blink?: number; style?: React.CSSProperties}> = ({
	size,
	color = C.brand,
	eye = '#ffffff',
	pupil = C.navy,
	look = {x: 0, y: 0},
	blink = 0,
	style,
}) => (
	<svg width={size} height={size} viewBox="0 0 64 64" style={{overflow: 'visible', ...style}}>
		<path d="M10 26V6A20 20 0 0 1 30 26ZM54 26V6A20 20 0 0 0 34 26Z" fill={color} />
		<rect x="8" y="16" width="48" height="44" rx="18" fill={color} />
		<g transform={`translate(0 ${33 * blink}) scale(1 ${1 - blink * 0.92})`} style={{transformOrigin: '0 33px'}}>
			<circle cx="22.5" cy="33" r="9.5" fill={eye} />
			<circle cx="41.5" cy="33" r="9.5" fill={eye} />
			<circle cx={22.5 + look.x * 3.6} cy={33 + look.y * 3.6} r="4.4" fill={pupil} />
			<circle cx={41.5 + look.x * 3.6} cy={33 + look.y * 3.6} r="4.4" fill={pupil} />
		</g>
		<path d="M32 43l3.2 3.6L32 50l-3.2-3.4z" fill={color === '#ffffff' ? C.brand : C.brandHalo} />
	</svg>
);

/** Credit for anything Otto wrote or found. */
export const ByOtto: React.FC<{size?: number}> = ({size = 18}) => (
	<span style={{display: 'inline-flex', alignItems: 'center', gap: size * 0.3, height: size * 1.7, padding: `0 ${size * 0.55}px 0 ${size * 0.3}px`, borderRadius: 999, background: C.brandSoft, color: C.brand, fontSize: size, fontWeight: 500, fontFamily: sans}}>
		<Otto size={size * 1.15} />
		Otto
	</span>
);

/** A fit, drawn with the mark's four quarters. */
export const Quarters: React.FC<{filled: number; size?: number}> = ({filled, size = 24}) => {
	const Q = ['M30 30H4A26 26 0 0 1 30 4Z', 'M34 30V4A26 26 0 0 1 60 30Z', 'M34 34H60A26 26 0 0 1 34 60Z', 'M30 34V60H4V34Z'];
	return (
		<svg width={size} height={size} viewBox="0 0 64 64">
			{Q.map((d, i) => (
				<path key={d} d={d} fill={i < filled ? C.brand : C.line} />
			))}
		</svg>
	);
};

/** A button. `kind` picks the one brand button or an outlined one. */
export const Btn: React.FC<{kind?: 'primary' | 'ghost'; size?: number; scale?: number; style?: React.CSSProperties; children: React.ReactNode}> = ({kind = 'primary', size = 20, scale = 1, style, children}) => (
	<span
		style={{
			display: 'inline-flex',
			alignItems: 'center',
			justifyContent: 'center',
			height: size * 2.1,
			padding: `0 ${size * 0.9}px`,
			borderRadius: size * 0.4,
			background: kind === 'primary' ? C.brand : C.panel,
			color: kind === 'primary' ? '#fff' : C.ink,
			border: kind === 'primary' ? 'none' : `1.5px solid ${C.lineStrong}`,
			fontSize: size,
			fontWeight: 500,
			fontFamily: sans,
			whiteSpace: 'nowrap',
			scale: `${scale}`,
			...style,
		}}
	>
		{children}
	</span>
);

export const Logo: React.FC<{name: 'linkedin' | 'meet' | 'gmail'; size: number}> = ({name, size}) => (
	<Img src={staticFile(`logos/${name}.svg`)} style={{width: size, height: size, display: 'block'}} />
);

/** A line icon in the app's style. */
export const Icon: React.FC<{d: string; size?: number; color?: string}> = ({d, size = 22, color = 'currentColor'}) => (
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
		<path d={d} />
	</svg>
);
export const I = {
	mail: 'M3 6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5zM3 7l9 6 9-6',
	note: 'M4 4h16v12H8l-4 4z',
	video: 'M3 7.5A1.5 1.5 0 0 1 4.5 6h10A1.5 1.5 0 0 1 16 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 3 16.5zM16 10l5-3v10l-5-3',
	check: 'M5 12.5l4.5 4.5L19 7.5',
	invite: 'M9 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21c.8-3.6 3.6-6 7-6s6.2 2.4 7 6M19 8v6M16 11h6',
	clock: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2',
	eye: 'M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
	file: 'M7 3h7l4 4v14H7zM14 3v4h4',
	send: 'M4 12l16-8-6 16-2.5-6.5z',
};
