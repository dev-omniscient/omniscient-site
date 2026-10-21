// Where everything sits on the one big map. World pixels; the camera flies over them.
import type {Pt} from './world/ui';

// ---------- The problem (top row) ----------
export const INVOICE: Pt = {x: 0, y: 0};
export const INVOICE_W = 820;
export const INVOICE_H = 660;
export const LEGACY: Pt = {x: 1500, y: 0};
export const LEGACY_W = 1260;
export const LEGACY_H = 760;
/** The empty Notes field the camera pushes into, relative to the legacy window's center. */
export const NOTES_FIELD: Pt = {x: 1500 + 365, y: 0 + 198};

// ---------- The better way (bottom row) ----------
export const ROW = 2200;
export const SCOUT: Pt = {x: 0, y: ROW};
export const OUTREACH: Pt = {x: 1750, y: ROW};
export const INBOX: Pt = {x: 3550, y: ROW};
export const RECORD: Pt = {x: 5400, y: ROW};
export const DEAL: Pt = {x: 7300, y: ROW};
export const PHONE: Pt = {x: 7980, y: ROW + 70};
export const ST_W = 1200;
export const ST_H = 740;
/** The route under the stations, from first hello to closed deal. */
export const ROUTE_Y = ROW + 520;
export const ROUTE_X0 = -700;
export const ROUTE_X1 = 8300;
