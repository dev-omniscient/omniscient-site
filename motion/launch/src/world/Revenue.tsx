import React from 'react';
import {B, hit, press, prog, roll, SPRING, typed, useT} from '../lib';
import {INBOX, OUTREACH, SCOUT, ST_H, ST_W} from '../layout';
import {C, POP} from '../theme';
import {AppBar, At, Avatar, Btn, ByOtto, Card, Icon, I, Logo, Quarters, Tag} from './ui';

const appear = (t: number, a: number) => {
	const p = prog(t, a, a + 0.5);
	return {opacity: p, translate: `0 ${(1 - p) * 24}px`};
};

// ---------- Scout: one sentence in, the right people out ----------
const SENTENCE: {w: string; crit?: boolean}[] = [
	{w: 'Heads of Sales in '},
	{w: 'the UK', crit: true},
	{w: ' at '},
	{w: 'SaaS companies', crit: true},
	{w: ' who '},
	{w: 'posted about hiring SDRs', crit: true},
];
const PEOPLE: [string, 'purple' | 'sky' | 'orange' | 'turquoise' | 'red', string, string, number, string, 'green' | 'brand' | 'purple' | 'sky'][] = [
	['Priya Shah', 'purple', 'VP Sales', 'Lumen Labs', 4, 'Posted about SDR hiring', 'green'],
	['Tom Okafor', 'sky', 'Head of Sales', 'Brightline', 4, 'Commented on ramp time', 'brand'],
	['Lena Moreau', 'orange', 'Sales Director', 'Quarry', 3, 'Posted about SDR hiring', 'green'],
	['Dev Kapoor', 'turquoise', 'Head of Revenue', 'Fieldnote', 3, 'Reacted to a RevOps post', 'purple'],
	['Ana Ruiz', 'red', 'VP Sales', 'Copperleaf', 2, 'Commented on quotas', 'sky'],
];

export const Scout: React.FC = () => {
	const t = useT();
	const a = B.scout;
	const full = SENTENCE.map((s) => s.w).join('');
	const n = typed(full, t, a + 0.6, a + 2.8).length;
	let used = 0;
	const rowsAt = a + 3.3;
	const lift = prog(t, a + 5.4, a + 5.9);
	return (
		<At p={SCOUT} w={ST_W} h={ST_H}>
			<Card>
				<AppBar crumb="Scout" page="UK sales leaders" right={<Tag tone="brand" size={19}>{roll(t, rowsAt, rowsAt + 1.4, 0, 128)} found</Tag>} />
				<div style={{padding: '30px 34px 26px', fontSize: 40, fontWeight: 600, letterSpacing: -1.2, lineHeight: 1.35, borderBottom: `1.5px solid ${C.line}`, minHeight: 150}}>
					{SENTENCE.map((s, i) => {
						const shown = s.w.slice(0, Math.max(0, n - used));
						const start = used;
						used += s.w.length;
						const done = n >= used;
						const u = s.crit && done ? prog(t, a + 0.6 + (2.2 * used) / full.length, a + 1.1 + (2.2 * used) / full.length) : 0;
						return (
							<span key={i} style={{color: s.crit ? C.brand : C.ink, position: 'relative', whiteSpace: start === 0 ? 'normal' : undefined}}>
								{shown}
								{s.crit ? <span style={{position: 'absolute', left: 0, right: 0, bottom: -2, height: 3, background: C.brand, transformOrigin: 'left', scale: `${u} 1`}} /> : null}
							</span>
						);
					})}
					{n < full.length && Math.floor(t * 2.4) % 2 === 0 ? <span style={{display: 'inline-block', width: 3, height: 40, background: C.ink, verticalAlign: -6, marginLeft: 2}} /> : null}
				</div>
				<div style={{display: 'grid', gridTemplateColumns: '1.7fr 1fr 70px 1.5fr', gap: 16, padding: '0 34px', height: 46, alignItems: 'center', fontSize: 18, color: C.faint, borderBottom: `1.5px solid ${C.lineLight}`}}>
					<span>Person</span>
					<span>Company</span>
					<span>Fit</span>
					<span>Signal</span>
				</div>
				{PEOPLE.map(([name, tone, title, co, fit, sig, st], i) => {
					const r = appear(t, rowsAt + i * 0.12);
					const first = i === 0;
					return (
						<div key={name} style={{display: 'grid', gridTemplateColumns: '1.7fr 1fr 70px 1.5fr', gap: 16, padding: '0 34px', height: 76, alignItems: 'center', fontSize: 21, borderBottom: `1.5px solid ${C.lineLight}`, background: first ? `rgba(238,243,252,${lift})` : 'transparent', ...r}}>
							<span style={{display: 'flex', alignItems: 'center', gap: 14}}>
								<Avatar initials={name.split(' ').map((x) => x[0]).join('')} tone={tone} size={42} />
								<span>
									<b style={{display: 'block', fontWeight: 600}}>{name}</b>
									<span style={{fontSize: 17, color: C.faint}}>{title}</span>
								</span>
							</span>
							<span style={{color: C.muted}}>{co}</span>
							<Quarters filled={Math.round(fit * prog(t, rowsAt + 0.4 + i * 0.12, rowsAt + 1.0 + i * 0.12))} size={28} />
							<span>
								<Tag tone={st} size={17}>
									{sig}
								</Tag>
							</span>
						</div>
					);
				})}
			</Card>
			{/* Priya's post: the signal, one click away */}
			<div style={{position: 'absolute', right: -170, top: 330, width: 470, opacity: lift, translate: `${(1 - lift) * -40}px ${(1 - lift) * 20}px`}}>
				<Card float style={{position: 'relative', padding: 26, boxShadow: POP}}>
					<div style={{display: 'flex', alignItems: 'center', gap: 14}}>
						<Avatar initials="PS" tone="purple" size={48} />
						<span style={{flex: 1}}>
							<b style={{display: 'block', fontSize: 22, fontWeight: 600}}>Priya Shah</b>
							<span style={{fontSize: 17, color: C.faint}}>VP Sales, Lumen Labs</span>
						</span>
						<Logo name="linkedin" size={26} />
					</div>
					<div style={{fontSize: 24, lineHeight: 1.45, fontWeight: 500, margin: '18px 0 16px', letterSpacing: -0.3}}>“We're hiring 4 SDRs this quarter. Ramp time is the part that worries me most.”</div>
					<div style={{display: 'flex', alignItems: 'center', gap: 10}}>
						<Tag tone="green" size={17}>
							Signal
						</Tag>
						<span style={{fontSize: 17, color: C.faint}}>Posted Oct 12</span>
					</div>
				</Card>
			</div>
		</At>
	);
};

// ---------- Outreach: Otto writes, you approve ----------
const STEPS: [string, string, string, string][] = [
	[I.invite, 'Invite with a note', 'Day 1', '96 sent'],
	[I.clock, 'Wait for them to accept', 'Up to 14 days', '41 accepted'],
	[I.note, 'Send a message', 'Once they accept', '38 sent'],
	[I.eye, 'View their profile', 'After 5 days without a reply', '12 waiting'],
];
const DRAFT = 'Hi Priya, saw your post about hiring SDRs. Happy to share how teams like yours ramp new reps faster. Worth a chat?';

export const Outreach: React.FC = () => {
	const t = useT();
	const a = B.outreach;
	const card = prog(t, a + 0.2, a + 0.7);
	const ap = B.approve;
	const approved = t >= ap + 0.1;
	const fly = prog(t, ap + 0.35, ap + 1.1);
	return (
		<At p={OUTREACH} w={ST_W} h={ST_H}>
			<Card>
				<AppBar crumb="Campaigns" page="UK sales leaders" right={<Tag tone="green" size={19}>Live</Tag>} />
				<div style={{position: 'relative', padding: '28px 34px'}}>
					<div style={{position: 'absolute', left: 34 + 27, top: 64, bottom: 64, width: 2, background: C.line}} />
					{STEPS.map(([icon, name, when, n]) => (
						<div key={name} style={{position: 'relative', display: 'flex', alignItems: 'center', gap: 20, padding: '16px 0', fontSize: 23}}>
							<span style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 56, borderRadius: 10, border: `1.5px solid ${C.line}`, background: '#fff', color: C.brand}}>
								<Icon d={icon} size={28} />
							</span>
							<span style={{flex: 1}}>
								<b style={{display: 'block', fontWeight: 600}}>{name}</b>
								<span style={{fontSize: 18, color: C.faint}}>{when}</span>
							</span>
							<span style={{fontSize: 19, color: C.muted}}>{n}</span>
						</div>
					))}
				</div>
			</Card>
			<div style={{position: 'absolute', right: -120, top: 250, width: 560, opacity: card, translate: `0 ${(1 - card) * 30}px`}}>
				<Card float style={{position: 'relative', padding: 26, boxShadow: POP}}>
					<div style={{display: 'flex', alignItems: 'center', gap: 12}}>
						<Avatar initials="PS" tone="purple" size={44} />
						<b style={{fontSize: 22, fontWeight: 600, flex: 1}}>Priya Shah</b>
						<Tag tone={approved ? 'green' : 'orange'} size={17}>
							{approved ? 'Approved' : 'Needs approval'}
						</Tag>
					</div>
					<div style={{fontSize: 22, lineHeight: 1.5, margin: '18px 0 20px', minHeight: 132}}>{typed(DRAFT, t, a + 0.6, a + 2.3)}</div>
					<div style={{display: 'flex', alignItems: 'center', gap: 10}}>
						<ByOtto size={17} />
						<span style={{fontSize: 17, color: C.faint, flex: 1}}>wrote this</span>
						<Btn kind="ghost" size={18}>
							Edit
						</Btn>
						<Btn size={18} scale={press(t, ap)}>
							{approved ? '✓ Approved' : 'Approve'}
						</Btn>
					</div>
				</Card>
			</div>
			{/* The invite flies off toward LinkedIn */}
			{fly > 0 && fly < 1 ? (
				<div style={{position: 'absolute', right: -120 + 40 - fly * 520, top: 560 - Math.sin(fly * Math.PI) * 220, opacity: 1 - fly * 0.6, scale: `${1 - fly * 0.4}`}}>
					<span style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: 999, background: C.linkedin, color: '#fff'}}>
						<Icon d={I.send} size={30} />
					</span>
				</div>
			) : null}
		</At>
	);
};

// ---------- Inbox: the reply, with the whole story beside it ----------
const THREADS: [string, 'purple' | 'sky' | 'orange' | 'turquoise', string, string][] = [
	['Priya Shah', 'purple', 'Thanks for reaching out. Tuesday works.', 'now'],
	['Tom Okafor', 'sky', 'Can you send pricing first?', '1h'],
	['Lena Moreau', 'orange', "I'm out until the 27th.", '3h'],
	['Dev Kapoor', 'turquoise', 'Who else uses this in fintech?', '1d'],
];

export const Inbox: React.FC = () => {
	const t = useT();
	const a = B.inbox;
	const reply = prog(t, a + 0.4, a + 0.9, SPRING);
	const panel = prog(t, a + 1.4, a + 2.0);
	const create = a + 2.8;
	const made = t >= create + 0.15;
	return (
		<At p={INBOX} w={ST_W + 60} h={ST_H}>
			<Card>
				<AppBar crumb="Inbox" page="Needs reply" right={<Tag tone="brand" size={19}>1 new</Tag>} />
				<div style={{display: 'grid', gridTemplateColumns: '330px 1fr 330px', height: ST_H - 66}}>
					<div style={{borderRight: `1.5px solid ${C.line}`}}>
						{THREADS.map(([name, tone, msg, when], i) => {
							const open = i === 0 && reply > 0.5;
							return (
								<div key={name} style={{display: 'flex', gap: 14, padding: '18px 20px', borderBottom: `1.5px solid ${C.lineLight}`, background: open ? C.brand : 'transparent', color: open ? '#fff' : C.ink, alignItems: 'center'}}>
									<Avatar initials={name.split(' ').map((x) => x[0]).join('')} tone={tone} size={42} />
									<span style={{flex: 1, minWidth: 0}}>
										<b style={{display: 'block', fontSize: 20, fontWeight: 600}}>{name}</b>
										<span style={{display: 'block', fontSize: 17, opacity: 0.75, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{msg}</span>
									</span>
									<span style={{fontSize: 15, opacity: 0.7, alignSelf: 'flex-start'}}>{when}</span>
								</div>
							);
						})}
					</div>
					<div style={{display: 'flex', flexDirection: 'column', gap: 18, padding: '24px 26px'}}>
						<div style={{display: 'flex', alignItems: 'center', gap: 14, paddingBottom: 16, borderBottom: `1.5px solid ${C.lineLight}`}}>
							<Avatar initials="PS" tone="purple" size={46} />
							<span style={{flex: 1}}>
								<b style={{display: 'block', fontSize: 22, fontWeight: 600}}>Priya Shah</b>
								<span style={{fontSize: 17, color: C.faint}}>VP Sales, Lumen Labs</span>
							</span>
							<Logo name="linkedin" size={26} />
						</div>
						<div style={{alignSelf: 'flex-end', maxWidth: '84%', background: C.brandSoft, padding: '14px 18px', borderRadius: 12, fontSize: 20, lineHeight: 1.45}}>Hi Priya, saw your post about hiring SDRs. Happy to share how teams like yours ramp new reps faster. Worth a chat?</div>
						<div style={{alignSelf: 'flex-start', maxWidth: '84%', background: C.hover, padding: '14px 18px', borderRadius: 12, fontSize: 22, lineHeight: 1.45, fontWeight: 500, opacity: reply, scale: `${0.9 + 0.1 * reply}`, transformOrigin: 'left bottom'}}>
							Thanks for reaching out. Tuesday works.
						</div>
					</div>
					<div style={{borderLeft: `1.5px solid ${C.line}`, background: C.tint, padding: '24px 22px', display: 'flex', flexDirection: 'column', gap: 18, opacity: panel, translate: `${(1 - panel) * 60}px 0`}}>
						<div style={{display: 'flex', alignItems: 'center', gap: 12}}>
							<span style={{display: 'inline-flex', width: 42, height: 42, borderRadius: 8, background: C.navy, color: '#fff', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 18}}>L</span>
							<b style={{fontSize: 22, fontWeight: 600}}>Lumen Labs</b>
						</div>
						{[
							['Fit', <Quarters key="q" filled={4} size={26} />],
							['Signal', 'Posted about SDR hiring'],
							['Campaign', 'UK sales leaders'],
							['Owner', 'Maya Chen'],
						].map(([k, v]) => (
							<div key={k as string}>
								<div style={{fontSize: 15, color: C.faint, marginBottom: 4}}>{k}</div>
								<div style={{fontSize: 19, fontWeight: 500}}>{v}</div>
							</div>
						))}
						<div style={{marginTop: 'auto'}}>
							{made ? (
								<Tag tone="green" size={18} style={{scale: `${1 + 0.15 * hit(t, create + 0.15, 8)}`}}>
									✓ Opportunity created
								</Tag>
							) : (
								<Btn size={18} scale={press(t, create)}>
									Create opportunity
								</Btn>
							)}
						</div>
					</div>
				</div>
			</Card>
		</At>
	);
};

