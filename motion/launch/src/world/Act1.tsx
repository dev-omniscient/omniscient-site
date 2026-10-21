import React from 'react';
import {B, hit, keysBy, life, money, prog, roll, useT} from '../lib';
import {INVOICE, INVOICE_H, INVOICE_W, LEGACY, LEGACY_H, LEGACY_W} from '../layout';
import {C, sans} from '../theme';
import {At, Icon, I} from './ui';

// The renewal: line items stack up one per beat and the total keeps climbing.
const LINES: [string, number, number][] = [
	['CRM seats × 25', 45000, 0.6],
	['Sales add-on', 9000, 1.3],
	['AI credits', 6500, 2.0],
	['Data storage', 2400, 2.7],
	['Price increase, 9%', 5600, B.priceUp],
];

export const Invoice: React.FC = () => {
	const t = useT();
	const out = prog(t, B.toLegacy - 0.2, B.toLegacy + 0.5);
	if (out >= 1) return null;
	let total = 0;
	for (const [, v, at] of LINES) total += v * prog(t, at, at + 0.5);
	return (
		<At p={INVOICE} w={INVOICE_W} h={INVOICE_H} style={{opacity: 1 - out, translate: `${-out * 220}px 0`, fontFamily: sans}}>
			<div style={{position: 'absolute', inset: 0, background: '#fff', borderRadius: 10, border: `1.5px solid ${C.oldLine}`, padding: '46px 52px', color: C.oldHead}}>
				<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
					<div>
						<div style={{fontSize: 22, color: C.old, fontWeight: 500}}>Your CRM, Inc.</div>
						<div style={{fontSize: 44, fontWeight: 700, letterSpacing: -1.2, marginTop: 6}}>Annual renewal</div>
					</div>
					<span style={{fontSize: 20, fontWeight: 600, color: C.red, background: C.redSoft, padding: '6px 14px', borderRadius: 999}}>Due in 14 days</span>
				</div>
				<div style={{marginTop: 36, borderTop: `1.5px solid ${C.oldLine}`}}>
					{LINES.map(([label, v, at]) => {
						const p = prog(t, at, at + 0.35);
						const up = label.startsWith('Price');
						return (
							<div key={label} style={{display: 'flex', justifyContent: 'space-between', padding: '18px 0', borderBottom: `1.5px solid ${C.oldBg}`, fontSize: 27, opacity: p, translate: `0 ${(1 - p) * 14}px`, color: up ? C.red : C.oldHead}}>
								<span>{label}</span>
								<b style={{fontWeight: 600}}>{money(v)}</b>
							</div>
						);
					})}
				</div>
				<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 26}}>
					<span style={{fontSize: 26, color: C.old}}>Total a year</span>
					<b style={{fontSize: 62, fontWeight: 700, letterSpacing: -2, scale: `${1 + 0.05 * hit(t, B.priceUp, 6)}`, display: 'inline-block'}}>{money(Math.round(total / 10) * 10)}</b>
				</div>
			</div>
		</At>
	);
};

// The fields a rep copies by hand, and what goes in them.
const FIELDS: [string, string][] = [
	['First name', 'Priya'],
	['Last name', 'Shah'],
	['Title', 'VP Sales'],
	['Company', 'Lumen Labs'],
	['Email', 'priya@lumenlabs.com'],
	['Phone', '+44 20 7946 0321'],
	['Stage', 'Demo'],
	['Amount', '40,000'],
	['Close date', '12/15/2026'],
	['Next step', 'Follow up after call'],
	['Last contact', '10/14/2026'],
];
const TOTAL = FIELDS.reduce((n, [, v]) => n + v.length, 0);
const SOURCES = ['Re: Pricing questions', 'Call notes, Oct 14', 'Re: Next steps', 'Fwd: Security review', 'Intro: Priya Shah', 'Meeting notes'];

/** The old CRM: grey, cramped, every field typed by hand, one key at a time. */
export const Legacy: React.FC = () => {
	const t = useT();
	const show = prog(t, B.toLegacy - 0.3, B.toLegacy + 0.4);
	if (t > B.turn + 0.2) return null;
	const k = keysBy(t);
	let chars = Math.round((k / B.keys.length) * TOTAL);
	let current = -1;
	const vals = FIELDS.map(([, v], i) => {
		const n = Math.max(0, Math.min(v.length, chars));
		chars -= v.length;
		if (current < 0 && n < v.length) current = i;
		return v.slice(0, n);
	});
	const caret = Math.floor(t * 2.4) % 2 === 0;
	const src = Math.floor(k / 4) % SOURCES.length;
	const notesFocus = t > B.zoomField - 0.4;
	return (
		<At p={LEGACY} w={LEGACY_W} h={LEGACY_H} style={{opacity: show, fontFamily: sans}}>
			<div style={{position: 'absolute', inset: 0, background: C.oldBg, borderRadius: 10, border: `1.5px solid ${C.oldLine}`, overflow: 'hidden', color: C.oldHead}}>
				{/* A crowded tab bar */}
				<div style={{display: 'flex', gap: 2, height: 54, background: '#3f4a5a', alignItems: 'flex-end', padding: '0 12px'}}>
					{['Home', 'Leads', 'Contacts', 'Accounts', 'Opportunities', 'Forecasts', 'Reports', 'Tasks', 'More ▾'].map((n, i) => (
						<span key={n} style={{fontSize: 17, color: i === 2 ? C.oldHead : '#c9ced6', background: i === 2 ? C.oldBg : 'transparent', padding: '10px 16px', borderRadius: '6px 6px 0 0'}}>
							{n}
						</span>
					))}
				</div>
				<div style={{display: 'grid', gridTemplateColumns: '330px 1fr', height: LEGACY_H - 54}}>
					{/* Where the facts really are: emails and notes, copied one at a time */}
					<div style={{borderRight: `1.5px solid ${C.oldLine}`, background: '#e6e9ed', padding: 18}}>
						<div style={{fontSize: 17, color: C.old, marginBottom: 12}}>Inbox and notes</div>
						{SOURCES.map((s, i) => {
							const on = t > B.keys[0] && i === src;
							return (
								<div key={s} style={{display: 'flex', alignItems: 'center', gap: 12, padding: '14px 12px', marginBottom: 8, borderRadius: 6, background: on ? '#fff' : 'transparent', border: `1.5px solid ${on ? C.oldLine : 'transparent'}`, fontSize: 19}}>
									<span style={{color: C.old}}>
										<Icon d={i % 2 ? I.note : I.mail} size={22} />
									</span>
									<span style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{s}</span>
								</div>
							);
						})}
					</div>
					<div style={{padding: '22px 30px'}}>
						<div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
							<div style={{fontSize: 34, fontWeight: 700, letterSpacing: -0.8}}>New contact</div>
							<div style={{fontSize: 17, color: C.old}}>* Required</div>
						</div>
						<div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 22px', marginTop: 18}}>
							{FIELDS.map(([label], i) => {
								const active = i === current && !notesFocus;
								return (
									<div key={label}>
										<div style={{fontSize: 16, color: C.old, marginBottom: 5}}>{label} *</div>
										<div style={{height: 40, borderRadius: 4, background: '#fff', border: `1.5px solid ${active ? '#7a8597' : C.oldLine}`, padding: '0 12px', display: 'flex', alignItems: 'center', fontSize: 19, color: C.oldHead}}>
											{vals[i]}
											{active && caret ? <span style={{width: 2, height: 22, background: C.oldHead, marginLeft: 1}} /> : null}
										</div>
									</div>
								);
							})}
							<div>
								<div style={{fontSize: 16, color: C.old, marginBottom: 5}}>Notes *</div>
								<div style={{height: 40, borderRadius: 4, background: '#fff', border: `1.5px solid ${notesFocus ? '#7a8597' : C.oldLine}`, padding: '0 12px', display: 'flex', alignItems: 'center'}}>
									{notesFocus && caret ? <span style={{width: 2, height: 22, background: C.oldHead}} /> : null}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* As the camera closes in on the empty field, everything else goes dark. */}
			<div style={{position: 'absolute', inset: -400, background: 'radial-gradient(ellipse 330px 120px at 1395px 978px, transparent 0, transparent 60%, rgba(11,26,61,0.85) 100%)', opacity: life(t, B.zoomField + 0.4, B.turn + 0.3, 1.2, 0.2) * 0.9}} />
		</At>
	);
};
