import React from 'react';
import {B, hit, prog, SPRING, useT} from '../lib';
import {RECORD} from '../layout';
import {C, POP} from '../theme';
import {AppBar, At, Avatar, ByOtto, Card, Icon, I, Logo, Tag} from './ui';

const W = 1340;
const H = 780;

// The call, line by line. Four lines carry a fact into the record.
const LINES: {at: string; who: string; text: string; field?: number}[] = [
	{at: '02:15', who: 'Maya', text: 'Thanks for making time, both of you.'},
	{at: '09:50', who: 'Priya', text: 'Ramp time is our biggest worry.'},
	{at: '12:04', who: 'Dana', text: 'Growth looks right for us, around 40 seats.', field: 1},
	{at: '14:40', who: 'Priya', text: "Send over the proposal and we'll review it Friday.", field: 0},
	{at: '18:31', who: 'Dana', text: 'Legal needs your SOC 2 report before we can sign.', field: 3},
	{at: '27:12', who: 'Dana', text: "We'd like to sign before the end of November.", field: 2},
];
// Fields and when each one fills (seconds after the station starts).
const FIELDS: {label: string; before: string; after: string; at: number}[] = [
	{label: 'Stage', before: 'Demo', after: 'Proposal', at: 2.5},
	{label: 'Amount', before: '—', after: '$48,000', at: 3.2},
	{label: 'Close date', before: '—', after: 'Nov 28, 2026', at: 4.6},
	{label: 'Next step', before: '—', after: 'Send the SOC 2 report', at: 3.9},
];
const LINE_Y0 = 150;
const LINE_H = 92;
const fieldPos = (k: number) => ({x: 600 + (k % 2) * 360, y: 250 + Math.floor(k / 2) * 120});

export const Record: React.FC = () => {
	const t = useT();
	const a = B.record;
	const rc = prog(t, B.receipt, B.receipt + 0.45, SPRING);
	return (
		<At p={RECORD} w={W} h={H}>
			<Card>
				<AppBar crumb="Opportunities" page="Lumen Labs, annual plan" right={<Tag tone={t > a + 2.5 ? 'purple' : 'neutral'} size={19}>{t > a + 2.5 ? 'Proposal' : 'Demo'}</Tag>} />
				<div style={{display: 'grid', gridTemplateColumns: '540px 1fr', height: H - 66}}>
					{/* The transcript */}
					<div style={{borderRight: `1.5px solid ${C.line}`, background: C.tint, padding: '22px 24px'}}>
						<div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16}}>
							<Logo name="meet" size={28} />
							<b style={{fontSize: 21, fontWeight: 600, flex: 1}}>Discovery call</b>
							<span style={{fontSize: 16, color: C.faint}}>Oct 14, 32 min</span>
						</div>
						{LINES.map((l, i) => {
							const p = prog(t, a + 0.4 + i * 0.32, a + 0.8 + i * 0.32);
							const f = l.field !== undefined ? FIELDS[l.field] : null;
							const hot = f ? Math.min(prog(t, a + f.at - 0.5, a + f.at - 0.3), 1 - prog(t, a + f.at + 0.6, a + f.at + 1.2)) : 0;
							const keep = l.field === 3 && t > B.receipt - 0.2 ? 1 : 0;
							const glow = Math.max(hot, keep);
							return (
								<div key={l.at} style={{display: 'grid', gridTemplateColumns: '64px 66px 1fr', gap: 8, padding: '12px 12px', margin: '0 -12px', height: LINE_H - 6, borderRadius: 8, fontSize: 19, lineHeight: 1.4, opacity: p, translate: `0 ${(1 - p) * 16}px`, background: `rgba(238,243,252,${glow})`, boxShadow: glow ? `inset 3px 0 0 rgba(9,67,176,${glow})` : 'none'}}>
									<span style={{color: C.faint, fontSize: 16, paddingTop: 2}}>{l.at}</span>
									<b style={{fontWeight: 600}}>{l.who}</b>
									<span>{l.text}</span>
								</div>
							);
						})}
					</div>
					{/* The record fills itself in */}
					<div style={{position: 'relative', padding: '26px 30px'}}>
						<div style={{display: 'flex', alignItems: 'center', gap: 16}}>
							<span style={{display: 'inline-flex', width: 56, height: 56, borderRadius: 10, background: C.navy, color: '#fff', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 24}}>L</span>
							<span>
								<b style={{display: 'block', fontSize: 28, fontWeight: 600, letterSpacing: -0.6}}>Lumen Labs, annual plan</b>
								<span style={{fontSize: 18, color: C.faint}}>lumenlabs.com</span>
							</span>
						</div>
						{FIELDS.map((f, k) => {
							const pos = fieldPos(k);
							const p = prog(t, a + f.at, a + f.at + 0.35, SPRING);
							const flash = hit(t, a + f.at, 3);
							return (
								<div key={f.label} style={{position: 'absolute', left: pos.x - 600 + 30, top: pos.y - 100, width: 340}}>
									<div style={{fontSize: 17, color: C.faint, marginBottom: 6}}>{f.label}</div>
									<div style={{position: 'relative', minHeight: 48, padding: '8px 12px', margin: '0 -12px', borderRadius: 8, background: `rgba(220,231,251,${flash})`}}>
										{p < 1 ? <span style={{position: 'absolute', left: 12, top: 10, fontSize: 23, color: C.light, opacity: 1 - p}}>{f.before}</span> : null}
										<div style={{display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', opacity: p, translate: `0 ${(1 - p) * 10}px`}}>
											<span style={{fontSize: 23, fontWeight: 600}}>{f.after}</span>
											<ByOtto size={15} />
										</div>
									</div>
								</div>
							);
						})}
						{[
							['Decision maker', <span key="d" style={{display: 'inline-flex', alignItems: 'center', gap: 10}}><Avatar initials="DK" tone="turquoise" size={34} />Dana Kim</span>],
							['Owner', <span key="o" style={{display: 'inline-flex', alignItems: 'center', gap: 10}}><Avatar initials="MC" tone="sky" size={34} />Maya Chen</span>],
						].map(([k, v], i) => (
							<div key={k as string} style={{position: 'absolute', left: 30 + i * 360, top: 420, width: 340}}>
								<div style={{fontSize: 17, color: C.faint, marginBottom: 8}}>{k}</div>
								<div style={{fontSize: 22, fontWeight: 500}}>{v}</div>
							</div>
						))}
						<div style={{position: 'absolute', left: 30, right: 30, top: 520, borderTop: `1.5px solid ${C.lineLight}`, paddingTop: 16}}>
							<div style={{fontSize: 17, color: C.faint, marginBottom: 10}}>Activity</div>
							{[
								[I.video, 'Discovery call', 'Meeting with Priya Shah and Dana Kim'],
								[I.note, 'LinkedIn reply', 'Priya Shah: Tuesday works'],
							].map(([ic, n, s]) => (
								<div key={n} style={{display: 'flex', alignItems: 'center', gap: 14, padding: '8px 0'}}>
									<span style={{display: 'inline-flex', width: 40, height: 40, borderRadius: 8, background: C.brandSoft, color: C.brand, alignItems: 'center', justifyContent: 'center'}}>
										<Icon d={ic} size={22} />
									</span>
									<span>
										<b style={{display: 'block', fontSize: 19, fontWeight: 500}}>{n}</b>
										<span style={{fontSize: 16, color: C.faint}}>{s}</span>
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</Card>
			{/* Each fact flies from the line that said it to its field */}
			{LINES.map((l, i) => {
				if (l.field === undefined) return null;
				const f = FIELDS[l.field];
				const p = prog(t, a + f.at - 0.45, a + f.at, (n) => n * n * (3 - 2 * n));
				if (p <= 0 || p >= 1) return null;
				const from = {x: 300, y: 66 + 22 + 60 + i * LINE_H + 30};
				const dest = fieldPos(l.field);
				const to = {x: dest.x - 30 + 120, y: 66 + dest.y - 100 + 50};
				const x = from.x + (to.x - from.x) * p;
				const y = from.y + (to.y - from.y) * p - Math.sin(p * Math.PI) * 90;
				return (
					<span key={l.at} style={{position: 'absolute', left: x - 70, top: y - 20, height: 40, padding: '0 16px', display: 'inline-flex', alignItems: 'center', borderRadius: 999, background: C.brand, color: '#fff', fontSize: 18, fontWeight: 500, boxShadow: POP, whiteSpace: 'nowrap', opacity: Math.min(1, p * 4, (1 - p) * 4)}}>
						{f.after}
					</span>
				);
			})}
			{/* The receipt */}
			<div style={{position: 'absolute', left: 940, top: 470, width: 470, opacity: rc, scale: `${0.94 + 0.06 * rc}`, transformOrigin: 'top left'}}>
				<Card float style={{position: 'relative', padding: '22px 24px', boxShadow: POP}}>
					<div style={{fontSize: 16, color: C.faint, fontWeight: 500}}>Receipt</div>
					<div style={{fontSize: 24, lineHeight: 1.4, fontWeight: 600, margin: '10px 0 14px', letterSpacing: -0.3}}>“Legal needs your SOC 2 report before we can sign.”</div>
					<div style={{display: 'flex', alignItems: 'center', gap: 8, color: C.brand, fontSize: 17}}>
						<Icon d={I.video} size={20} />
						Discovery call, Oct 14, 18:31
					</div>
				</Card>
			</div>
		</At>
	);
};
