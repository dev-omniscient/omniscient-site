import React from 'react';
import {B, prog, useT} from '../lib';
import {DEAL, INBOX, RECORD, ROUTE_X0, ROUTE_X1, ROUTE_Y, SCOUT} from '../layout';
import {C, sans} from '../theme';
import {cameraAt} from '../Camera';

// The route under the stations: it draws itself as the camera travels, and labels itself on the pull-back.
const SECTIONS: [string, number, number][] = [
	['Revenue', SCOUT.x - 600, INBOX.x + 660],
	['CRM', RECORD.x - 680, RECORD.x + 680],
	['Deal Room', DEAL.x - 600, DEAL.x + 1000],
];

export const Route: React.FC = () => {
	const t = useT();
	if (t < B.drop - 0.5) return null;
	const cam = cameraAt(Math.min(t, B.pullback));
	const head = t >= B.pullback ? ROUTE_X1 : Math.max(ROUTE_X0, cam.x + 500);
	const labels = prog(t, B.pullback + 1.0, B.pullback + 1.8);
	const done = prog(t, B.pullback, B.pullback + 1.6);
	const x1 = head + (ROUTE_X1 - head) * done;
	return (
		<svg style={{position: 'absolute', left: ROUTE_X0 - 200, top: ROUTE_Y - 900, overflow: 'visible'}} width={ROUTE_X1 - ROUTE_X0 + 400} height={1200}>
			<g transform={`translate(${-(ROUTE_X0 - 200)} ${-(ROUTE_Y - 900)})`}>
				<line x1={ROUTE_X0} x2={ROUTE_X1} y1={ROUTE_Y} y2={ROUTE_Y} stroke={C.line} strokeWidth={6} strokeLinecap="round" />
				<line x1={ROUTE_X0} x2={x1} y1={ROUTE_Y} y2={ROUTE_Y} stroke={C.brand} strokeWidth={8} strokeLinecap="round" />
				<circle cx={ROUTE_X0} cy={ROUTE_Y} r={16} fill={C.brand} />
				<circle cx={x1} cy={ROUTE_Y} r={16} fill={C.brand} />
				{SECTIONS.map(([name, a, b]) => (
					<g key={name} opacity={labels}>
						<line x1={a} x2={b} y1={ROUTE_Y + 150} y2={ROUTE_Y + 150} stroke={C.brand} strokeWidth={6} />
						<line x1={a} x2={a} y1={ROUTE_Y + 120} y2={ROUTE_Y + 180} stroke={C.brand} strokeWidth={6} />
						<line x1={b} x2={b} y1={ROUTE_Y + 120} y2={ROUTE_Y + 180} stroke={C.brand} strokeWidth={6} />
						<text x={(a + b) / 2} y={ROUTE_Y + 330} textAnchor="middle" fontFamily={sans} fontSize={150} fontWeight={600} letterSpacing={-4} fill={C.ink}>
							{name}
						</text>
					</g>
				))}
			</g>
		</svg>
	);
};
