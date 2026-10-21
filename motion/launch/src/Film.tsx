import React from 'react';
import {AbsoluteFill, staticFile} from 'remotion';
import {Audio} from '@remotion/media';
import {CameraMotionBlur} from '@remotion/motion-blur';
import {BLUR, World} from './Camera';
import {Close} from './Close';
import {Counter, Headline, Sections} from './Hud';
import {B, prog, useT} from './lib';
import {C} from './theme';
import {Turn} from './Turn';
import {Invoice, Legacy} from './world/Act1';
import {Record} from './world/Crm';
import {Phone, Site, Won} from './world/DealRoom';
import {Inbox, Outreach, Scout} from './world/Revenue';
import {Route} from './world/Route';
import tl from './timeline.json';

const GRID = 48;

/** A dot grid in faint brand blue across the whole map. In the opening it's grey and tired. */
const Dots: React.FC = () => {
	const t = useT();
	const blue = prog(t, B.drop - 0.5, B.drop + 0.5);
	return (
		<svg style={{position: 'absolute', left: -6000, top: -3000}} width={22000} height={9000}>
			<defs>
				<pattern id="dots" width={GRID} height={GRID} patternUnits="userSpaceOnUse">
					<circle cx={2} cy={2} r={2} fill={blue > 0.5 ? C.brand : '#7a8597'} opacity={0.16} />
				</pattern>
			</defs>
			<rect width={22000} height={9000} fill="url(#dots)" />
		</svg>
	);
};

const Scene: React.FC = () => (
	<World>
		<Dots />
		<Invoice />
		<Legacy />
		<Route />
		<Scout />
		<Outreach />
		<Inbox />
		<Record />
		<Site />
		<Phone />
		<Won />
	</World>
);

export const Film: React.FC = () => {
	const t = useT();
	const blur = BLUR.some(([a, b]) => t > a && t < b);
	const bg = t < B.turn ? C.oldBg : C.tint;
	return (
		<AbsoluteFill style={{background: bg}}>
			{blur ? (
				<CameraMotionBlur shutterAngle={200} samples={8}>
					<AbsoluteFill style={{background: bg}}>
						<Scene />
					</AbsoluteFill>
				</CameraMotionBlur>
			) : (
				<Scene />
			)}
			<Sections />
			<Counter />
			<Headline />
			<Turn />
			<Close />
			{tl.audio ? <Audio src={staticFile('audio/mix.m4a')} /> : null}
		</AbsoluteFill>
	);
};
