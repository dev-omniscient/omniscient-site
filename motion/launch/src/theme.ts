import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';

// Tokens from the Omniscient brand (docs/brand.md in the app repo, assets/base.css on the site).
// Navy text on white, every neutral tinted from the one brand blue.
export const C = {
	ink: '#0b1a3d',
	muted: '#4b5f8a',
	faint: '#8395bd',
	light: '#a9b7d6',
	panel: '#ffffff',
	tint: '#f7f9fe',
	hover: '#f3f6fc',
	pressed: '#e8eef9',
	navy: '#0b1a3d',
	navy2: '#0d1835',
	line: '#e3e9f5',
	lineLight: '#eff3fa',
	lineStrong: '#c9d5ee',
	brand: '#0943b0',
	brandHover: '#06307f',
	brandSoft: '#eef3fc',
	brandHalo: '#c9d8f5',
	brandFlash: '#dce7fb',
	brandOnDark: '#8fb4ff',
	green: '#138a5e',
	greenSoft: '#e3f6ee',
	orange: '#b25a09',
	orangeSoft: '#fff1e2',
	red: '#b23a26',
	redSoft: '#fdecea',
	purple: '#5230c2',
	purpleSoft: '#f1ecfe',
	sky: '#0b62b0',
	skySoft: '#e3f2fe',
	turquoise: '#0b7a73',
	turquoiseSoft: '#e0f6f4',
	// The legacy CRM in the opening: grey and tired.
	old: '#6b7280',
	oldLine: '#d6d9de',
	oldBg: '#eef0f3',
	oldHead: '#3f4a5a',
	linkedin: '#0A66C2',
} as const;

// Only things that float get a shadow.
export const POP = '0 24px 60px rgba(11, 26, 61, 0.16), 0 2px 6px rgba(11, 26, 61, 0.06)';
export const POP_SM = '0 12px 32px rgba(11, 26, 61, 0.14), 0 2px 4px rgba(11, 26, 61, 0.06)';

const font = (family: string, file: string) => {
	loadFont({family, url: staticFile(`fonts/${file}`), weight: '100 900', format: 'woff2'});
	return `'${family}'`;
};
export const sans = font('Inter', 'Inter.woff2');
