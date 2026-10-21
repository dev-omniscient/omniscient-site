import React from 'react';
import {random} from 'remotion';
import {B, hit, life, money, press, prog, SPRING, useT} from '../lib';
import {DEAL, PHONE, ROW} from '../layout';
import {C, POP, sans} from '../theme';
import {At, Avatar, Btn, Card, Icon, I, Otto, Tag} from './ui';

const BW = 1160;
const BH = 760;

const Section: React.FC<{at: number; style?: React.CSSProperties; children: React.ReactNode}> = ({at, style, children}) => {
	const t = useT();
	const p = prog(t, at, at + 0.45);
	const flash = hit(t, at + 0.2, 3);
	return (
		<div style={{opacity: p, translate: `0 ${(1 - p) * 26}px`, boxShadow: flash > 0.05 ? `0 0 0 ${3 * flash}px ${C.brandHalo}` : 'none', borderRadius: 12, ...style}}>
			{children}
		</div>
	);
};

const TEMPLATES = ['Proposal', 'Mutual plan', 'Business case', 'Security review', 'Kickoff', 'Renewal'];

/** The Deal Room: Otto builds a private site for the deal. */
export const Site: React.FC = () => {
	const t = useT();
	const a = B.deal;
	const fill = B.fill;
	const built = t > fill + 0.2;
	const tplOut = prog(t, fill + 0.1, fill + 0.4);
	const check = t > fill + 3.6;
	return (
		<At p={DEAL} w={BW} h={BH}>
			<Card>
				<div style={{display: 'flex', alignItems: 'center', gap: 14, height: 56, padding: '0 20px', borderBottom: `1.5px solid ${C.line}`, background: C.tint}}>
					<span style={{display: 'flex', gap: 8}}>
						{[0, 1, 2].map((i) => (
							<i key={i} style={{width: 13, height: 13, borderRadius: 999, background: C.lineStrong}} />
						))}
					</span>
					<span style={{flex: 1, maxWidth: 440, margin: '0 auto', textAlign: 'center', fontSize: 18, color: C.muted, background: '#fff', border: `1.5px solid ${C.line}`, borderRadius: 8, padding: '5px 0'}}>deals.acme.com/lumen-labs</span>
				</div>
				{/* Before: pick a template */}
				{tplOut < 1 ? (
					<div style={{position: 'absolute', inset: '56px 0 0 0', padding: 36, opacity: 1 - tplOut}}>
						<div style={{fontSize: 30, fontWeight: 600, letterSpacing: -0.6, marginBottom: 22}}>Templates</div>
						<div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18}}>
							{TEMPLATES.map((n, i) => {
								const pick = i === 0;
								const sc = pick ? press(t, a + 0.6) : 1;
								return (
									<div key={n} style={{border: `1.5px solid ${pick && t > a + 0.6 ? C.brand : C.line}`, borderRadius: 12, overflow: 'hidden', scale: `${sc}`}}>
										<div style={{height: 150, background: i % 2 ? C.tint : C.navy, padding: 18}}>
											<div style={{width: '60%', height: 14, borderRadius: 4, background: i % 2 ? C.lineStrong : 'rgba(255,255,255,0.35)'}} />
											<div style={{width: '40%', height: 10, borderRadius: 4, marginTop: 10, background: i % 2 ? C.line : 'rgba(255,255,255,0.2)'}} />
										</div>
										<div style={{padding: '12px 16px', fontSize: 19, fontWeight: 500}}>{n}</div>
									</div>
								);
							})}
						</div>
					</div>
				) : null}
				{/* After: the site, filled from the deal */}
				{built ? (
					<div style={{position: 'absolute', inset: '56px 0 0 0', fontFamily: sans}}>
						<div style={{display: 'flex', alignItems: 'center', gap: 18, padding: '16px 30px', borderBottom: `1.5px solid ${C.lineLight}`}}>
							<b style={{color: C.brand, fontSize: 22}}>Acme</b>
							<span style={{color: C.faint, fontSize: 16}}>and</span>
							<b style={{fontSize: 22}}>Lumen Labs</b>
							<span style={{marginLeft: 'auto', display: 'flex', gap: 22, fontSize: 18, color: C.muted}}>
								<span>Plan</span>
								<span>Team</span>
								<span>Pricing</span>
							</span>
						</div>
						<div style={{padding: '18px 26px', display: 'flex', flexDirection: 'column', gap: 16}}>
							<Section at={fill + 0.3} style={{background: C.navy, color: '#fff', padding: '30px 30px'}}>
								<div style={{fontSize: 18, color: C.brandOnDark, fontWeight: 500}}>For Priya, Dana and the Lumen Labs team</div>
								<div style={{fontSize: 42, fontWeight: 600, letterSpacing: -1.3, marginTop: 8}}>Your plan to launch in January</div>
							</Section>
							<div style={{display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 16}}>
								<Section at={fill + 1.0} style={{border: `1.5px solid ${C.line}`, padding: '18px 20px'}}>
									<b style={{fontSize: 20, fontWeight: 600}}>Mutual plan</b>
									{[
										['Discovery call', 'Done', true],
										['Security review', 'Nov 7', false],
										['Sign the order form', 'Nov 28', false],
										['Kickoff', 'Dec 3', false],
									].map(([n, d, done]) => (
										<div key={n as string} style={{display: 'flex', alignItems: 'center', gap: 12, padding: '9px 0', fontSize: 18}}>
											<span style={{width: 22, height: 22, borderRadius: 999, border: done ? 'none' : `2px solid ${C.lineStrong}`, background: done ? C.brand : 'transparent', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}>{done ? <Icon d={I.check} size={14} color="#fff" /> : null}</span>
											<span style={{flex: 1}}>{n}</span>
											<span style={{color: C.faint, fontSize: 16}}>{d}</span>
										</div>
									))}
								</Section>
								<div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
									<Section at={fill + 1.6} style={{border: `1.5px solid ${C.line}`, padding: '18px 20px'}}>
										<b style={{fontSize: 20, fontWeight: 600}}>Who's involved</b>
										<div style={{display: 'flex', gap: 10, marginTop: 12}}>
											<Avatar initials="PS" tone="purple" size={44} />
											<Avatar initials="DK" tone="turquoise" size={44} />
											<Avatar initials="MC" tone="sky" size={44} />
										</div>
									</Section>
									<Section at={fill + 2.2} style={{border: `1.5px solid ${C.line}`, padding: '18px 20px'}}>
										<b style={{fontSize: 20, fontWeight: 600}}>Documents</b>
										<div style={{display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, fontSize: 18}}>
											<span style={{color: C.brand}}>
												<Icon d={I.file} size={22} />
											</span>
											SOC 2 report
											<Tag tone="green" size={15} style={{marginLeft: 'auto'}}>
												Ready
											</Tag>
										</div>
									</Section>
								</div>
							</div>
							<Section at={fill + 2.8} style={{border: `1.5px solid ${C.line}`, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16}}>
								<b style={{fontSize: 20, fontWeight: 600}}>Pricing for Lumen Labs</b>
								<span style={{fontSize: 18, color: C.faint}}>$1,200 a seat a year</span>
								<span style={{marginLeft: 'auto'}}>
									<Btn size={17}>Approve</Btn>
								</span>
							</Section>
						</div>
					</div>
				) : null}
			</Card>
			{/* Otto, docked beside the builder */}
			<div style={{position: 'absolute', left: -330, top: 120, width: 300, opacity: life(t, a + 0.9, B.phone + 0.3)}}>
				<Card float style={{position: 'relative', padding: 22, boxShadow: POP}}>
					<div style={{display: 'flex', alignItems: 'center', gap: 12}}>
						<Otto size={44} style={{translate: `0 ${t > fill && t < fill + 3 ? Math.sin(t * 9) * 3 : 0}px`}} />
						<b style={{fontSize: 20, fontWeight: 600}}>Otto</b>
					</div>
					<div style={{fontSize: 18, color: C.muted, margin: '14px 0 16px', lineHeight: 1.45}}>Deal: Lumen Labs, annual plan</div>
					<Btn size={17} scale={press(t, fill - 0.15)}>
						Fill with this deal
					</Btn>
					<div style={{marginTop: 16, opacity: prog(t, fill + 3.2, fill + 3.5)}}>
						<Tag tone={check ? 'green' : 'orange'} size={16}>
							{check ? '✓ Checked before sharing' : 'Check before sharing: 1'}
						</Tag>
					</div>
				</Card>
			</div>
		</At>
	);
};

/** The buyer's phone: the configurator, the slider, Approve. */
export const Phone: React.FC = () => {
	const t = useT();
	const show = prog(t, B.fill + 2.6, B.fill + 3.2);
	const s = prog(t, B.phone + 0.6, B.phone + 2.4, (n) => n * n * (3 - 2 * n));
	const seats = Math.round(10 + 30 * s);
	const approved = t >= B.press + 0.1;
	return (
		<At p={PHONE} w={360} h={720} style={{opacity: show, translate: `0 ${(1 - show) * 40}px`}}>
			<div style={{position: 'absolute', inset: 0, borderRadius: 48, border: `2px solid ${C.lineStrong}`, background: '#fff', boxShadow: POP, padding: '54px 26px 30px', fontFamily: sans, color: C.ink}}>
				<div style={{position: 'absolute', top: 18, left: '50%', width: 90, height: 10, marginLeft: -45, borderRadius: 999, background: C.line}} />
				<div style={{fontSize: 17, color: C.brand, fontWeight: 500}}>Lumen Labs</div>
				<div style={{fontSize: 30, fontWeight: 600, letterSpacing: -0.8, lineHeight: 1.15, marginTop: 6}}>Pricing for Lumen Labs</div>
				<div style={{fontSize: 17, color: C.faint, marginTop: 22}}>Seats</div>
				<div style={{display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4}}>
					<b style={{fontSize: 44, fontWeight: 600, letterSpacing: -1.4}}>{seats}</b>
					<span style={{fontSize: 18, color: C.faint}}>seats</span>
				</div>
				<div style={{position: 'relative', height: 8, borderRadius: 999, background: C.line, marginTop: 14}}>
					<div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${(seats - 5) / 1.45}%`, borderRadius: 999, background: C.brand}} />
					<div style={{position: 'absolute', left: `calc(${(seats - 5) / 1.45}% - 14px)`, top: -10, width: 28, height: 28, borderRadius: 999, background: '#fff', border: `3px solid ${C.brand}`, boxShadow: POP}} />
				</div>
				<div style={{borderTop: `1.5px solid ${C.line}`, marginTop: 34, paddingTop: 18}}>
					<div style={{fontSize: 17, color: C.faint}}>Total a year</div>
					<b style={{display: 'block', fontSize: 46, fontWeight: 600, letterSpacing: -1.6, color: C.brand, marginTop: 4}}>{money(seats * 1200)}</b>
				</div>
				<div style={{position: 'absolute', left: 26, right: 26, bottom: 34}}>
					<div style={{fontSize: 16, color: C.faint, marginBottom: 12, textAlign: 'center'}}>Approve with signature</div>
					<Btn size={22} scale={press(t, B.press)} style={{width: '100%', background: approved ? C.green : C.brand}}>
						{approved ? '✓ Approved' : 'Approve'}
					</Btn>
				</div>
			</div>
			<Burst at={B.press + 0.05} x={180} y={720 - 34 - 23} />
		</At>
	);
};

/** Small blue squares burst from the button, for the big moment only. */
const Burst: React.FC<{at: number; x: number; y: number}> = ({at, x, y}) => {
	const t = useT();
	const p = (t - at) / 1.1;
	if (p <= 0 || p >= 1) return null;
	return (
		<>
			{Array.from({length: 26}, (_, i) => {
				const ang = random(`ang${i}`) * Math.PI * 2;
				const dist = 120 + random(`d${i}`) * 260;
				const e = 1 - Math.pow(1 - p, 3);
				const size = 10 + random(`s${i}`) * 14;
				return (
					<span
						key={i}
						style={{
							position: 'absolute',
							left: x + Math.cos(ang) * dist * e - size / 2,
							top: y + Math.sin(ang) * dist * e - size / 2 + p * p * 60,
							width: size,
							height: size,
							borderRadius: 3,
							background: i % 3 ? C.brand : C.brandHalo,
							opacity: 1 - p,
							rotate: `${random(`r${i}`) * 180 * p}deg`,
						}}
					/>
				);
			})}
		</>
	);
};

/** The email that lands, and the deal turning to Won. */
export const Won: React.FC = () => {
	const t = useT();
	const mail = prog(t, B.press + 0.9, B.press + 1.3, SPRING);
	const won = prog(t, B.won, B.won + 0.4, SPRING);
	const hop = t > B.won + 0.2 ? Math.max(0, Math.sin(Math.min(1, (t - B.won - 0.2) / 0.45) * Math.PI)) * 22 : 0;
	return (
		<>
			<At p={{x: DEAL.x + 330, y: ROW - 470}} w={560} h={110} style={{opacity: mail * (1 - prog(t, B.pullback, B.pullback + 0.5)), scale: `${0.92 + 0.08 * mail}`}}>
				<Card float style={{display: 'flex', alignItems: 'center', gap: 16, padding: '0 24px', boxShadow: POP}}>
					<span style={{display: 'inline-flex', width: 48, height: 48, borderRadius: 10, background: C.brandSoft, color: C.brand, alignItems: 'center', justifyContent: 'center'}}>
						<Icon d={I.mail} size={26} />
					</span>
					<span style={{flex: 1}}>
						<b style={{display: 'block', fontSize: 21, fontWeight: 600}}>Dana Kim</b>
						<span style={{fontSize: 19, color: C.muted}}>Signed. Welcome aboard.</span>
					</span>
					<span style={{fontSize: 16, color: C.faint}}>now</span>
				</Card>
			</At>
			<At p={{x: DEAL.x + 330, y: ROW - 330}} w={560} h={120} style={{opacity: won * (1 - prog(t, B.pullback, B.pullback + 0.5)), scale: `${0.9 + 0.1 * won}`}}>
				<Card float style={{display: 'flex', alignItems: 'center', gap: 18, padding: '0 26px', boxShadow: POP}}>
					<span style={{display: 'inline-flex', width: 56, height: 56, borderRadius: 10, background: C.navy, color: '#fff', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 24}}>L</span>
					<b style={{fontSize: 24, fontWeight: 600, flex: 1}}>Lumen Labs, annual plan</b>
					<Tag tone="green" size={24}>
						Won
					</Tag>
					<Otto size={52} style={{translate: `0 ${-hop}px`}} />
				</Card>
			</At>
		</>
	);
};

