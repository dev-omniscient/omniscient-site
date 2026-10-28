#!/usr/bin/env python3
"""Builds the home v2 stages (Scout, Unify, Close), the hero Triangle and the Spine as HTML snippets.
Output: stages.html (fragments keyed by name) used by the lab page and later index.html."""
import json, math, random, sys

OUT = sys.argv[1]

ICONS = {
 'home': '<path d="M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z"/>',
 'ask': '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
 'scout': '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
 'send': '<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4z"/>',
 'inbox': '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5.1 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.9A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.7 1.1z"/>',
 'building': '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/>',
 'user': '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
 'target': '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
 'cal': '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
 'layout': '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
 'book': '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/>',
 'filter': '<path d="M3 6h18M7 12h10M10 18h4"/>',
 'sliders': '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
 'plus': '<path d="M12 5v14M5 12h14"/>',
 'check': '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
 'eye': '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
 'link': '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
 'user-plus': '<circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0M19 8v6M16 11h6"/>',
 'msg': '<path d="M4 4h16v12H8l-4 4z"/>',
 'clock': '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 'dollar': '<path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
 'flag': '<path d="M4 22V4h12l-2 4 2 4H4"/>',
 'grid': '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
}
def sprite():
    out = ['<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>']
    for k, v in ICONS.items():
        out.append(f'<symbol id="i-{k}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">{v}</symbol>')
    out.append('</defs></svg>')
    return ''.join(out)
def ic(k): return f'<svg aria-hidden="true"><use href="#i-{k}"/></svg>'

# Sample companies get plain geometric marks in black on white, so no real brand is implied.
SHAPE = {
 'Northwind': '<path d="M10 3 17 16H3z"/>',
 'Brightline': '<rect x="3" y="4" width="14" height="3"/><rect x="3" y="9" width="14" height="3"/><rect x="3" y="14" width="9" height="3"/>',
 'Quarry': '<rect x="3" y="3" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"/><rect x="7.5" y="7.5" width="5" height="5"/>',
 'Copperleaf': '<path d="M3 13a7 7 0 0 1 14 0z"/>',
 'Initech': '<circle cx="6" cy="6" r="2.5"/><circle cx="14" cy="6" r="2.5"/><circle cx="6" cy="14" r="2.5"/><circle cx="14" cy="14" r="2.5"/>',
 'Globex': '<circle cx="10" cy="10" r="6.5" fill="none" stroke="currentColor" stroke-width="2.4"/>',
 'Lumen Labs': '<circle cx="10" cy="10" r="4"/><path d="M10 1.5v3M10 15.5v3M1.5 10h3M15.5 10h3" stroke="currentColor" stroke-width="1.8"/>',
 'Acme': '<path d="M10 2 18 10 10 18 2 10z"/>',
}
def lg(name): return f'<i class="lg"><svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">{SHAPE[name]}</svg></i>'
MARK = '<svg class="side__mark" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8.2" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="10" cy="10" r="2.8" fill="var(--signal)"/></svg>'
def av(ini): return f'<span class="av">{ini}</span>'
def at(a, off=None, i=None):
    s = f' data-at="{a}"'
    if off is not None: s += f' data-off="{off}"'
    if i is not None: s += f' style="--i:{i}"'
    return s

def side(cur, overrides=None):
    """cur: key of the current item. overrides: {key: (at, off)} for items that become current while the stage plays."""
    overrides = overrides or {}
    groups = [(None, [('home', 'Today'), ('ask', 'Ask')]),
              ('Outreach', [('scout', 'Scout'), ('send', 'Campaigns'), ('inbox', 'Inbox')]),
              ('CRM', [('building', 'Companies'), ('user', 'People'), ('target', 'Opportunities')]),
              ('Activity', [('cal', 'Meetings')]),
              ('Deal Room', [('layout', 'Experiences'), ('book', 'Library')])]
    h = [f'<div class="side"><div class="side__ws">{MARK}Orbit<span class="side__plan">Pro</span></div>']
    for lab, items in groups:
        if lab: h.append(f'<div class="side__lab">{lab}</div>')
        for k, name in items:
            if k in overrides:
                a, o = overrides[k]
                h.append(f'<div class="side__i"{at(a, o)}>{ic(k)}{name}</div>')
            else:
                h.append(f'<div class="side__i{" cur" if k == cur else ""}">{ic(k)}{name}</div>')
    h.append('</div>')
    return ''.join(h)

def path_c(x1, y1, x2, y2, bend='h'):
    if bend == 'h':
        mx = (x1 + x2) / 2
        return f'M{x1:.0f} {y1:.0f} C{mx:.0f} {y1:.0f} {mx:.0f} {y2:.0f} {x2:.0f} {y2:.0f}'
    my = (y1 + y2) / 2
    return f'M{x1:.0f} {y1:.0f} C{x1:.0f} {my:.0f} {x2:.0f} {my:.0f} {x2:.0f} {y2:.0f}'

def fly(d, a, off=None, cls='fly'):
    o = off if off is not None else round(a + 0.45, 2)
    return f'<span class="dot6 {cls}"{at(a, o)} style="offset-path:path(\'{d}\')"></span>'

def steps(items, length):
    b = ''.join(f'<button type="button" data-go="{a}"><span>{i+1:02d}</span><b>{n}</b></button>' for i, (n, a) in enumerate(items))
    return f'<div class="steps" style="--len:{length}"><span class="steps__fill"></span>{b}</div>'

CURSOR = ('<svg class="cursor" viewBox="0 0 18 22" data-root="canvas" data-guide=\'{stops}\' aria-hidden="true">'
          '<path d="M2 2 L2 17 L6 13 L9 20 L12 19 L9 12 L15 12 Z" fill="#0a0a0a" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/></svg>')

def guides(win, focus, cursor):
    """win: (x, y, w, h) of the app window in the canvas. focus and cursor: lists of [at, selector]; [at] hides.
    demo.js measures the elements each frame, so the spotlight and the cursor always sit on what they point at."""
    x, y, w, h = win
    f = (f'<div class="focus-clip" style="left:{x}px;top:{y}px;width:{w}px;height:{h}px">'
         f'<span class="focus" data-root="win" data-guide=\'{json.dumps(focus)}\'></span></div>')
    c = CURSOR.format(stops=json.dumps(cursor)) if cursor else ''
    return f + c

def stage(key, length, eyebrow, title, step_items, canvas, w, h, crop, caps):
    marks = [a for _, a in step_items] + [length]
    cap = ''.join(f'<p class="cap fade"{at(marks[i], marks[i + 1] if i < len(caps) - 1 else None)}><b>{i + 1:02d}</b>{c}</p>' for i, c in enumerate(caps))
    return f'''<section class="dstage" data-stage="{key}" id="{key}" style="--len:{length}">
  <div class="stage__pin wrap">
    <div class="stage__top">
      <div class="stage__title"><p class="eyebrow">{eyebrow}</p><h2 class="h2">{title}</h2></div>
      <div class="stage__side">{steps(step_items, length)}<div class="caps" aria-live="polite">{cap}</div></div>
    </div>
    <div class="canvas-wrap" aria-hidden="true"><div class="canvas" data-canvas data-w="{w}" data-h="{h}" data-crop="{crop}" style="width:{w}px;height:{h}px">{canvas}</div></div>
  </div>
</section>'''

# ─────────────────────────── SCOUT ───────────────────────────
def scout():
    O = 20  # window offset in the canvas
    W, H = 880, 540
    vx, vy = 176, 48  # view origin in the window
    random.seed(7)
    # The market: 15 x 7 nodes in the field, inside the view at (0, 96)
    fy0 = 96
    cols, rows = 15, 7
    pts = [(34 + 46 * i, 26 + 46 * j) for j in range(rows) for i in range(cols)]
    fit = sorted(random.sample(range(len(pts)), 18))
    nodes = []
    for n, (x, y) in enumerate(pts):
        if n in fit:
            a = round(1.85 + (x / 704) * 1.0, 2)
            nodes.append(f'<circle class="fnode" cx="{x}" cy="{y}" r="3"{at(a)}/>')
        else:
            nodes.append(f'<circle class="fnode" cx="{x}" cy="{y}" r="3"/>')
    field = (f'<svg class="abs fade" id="sc-field" style="left:0;top:{fy0}px" width="704" height="340" viewBox="0 0 704 340"{at(1.6, 3)}>'
             f'<rect class="scan" x="-40" y="0" width="40" height="340" data-scrub="1.7,2.9" style="transform:translateX(calc(var(--t,0) * 744px))"/>'
             + ''.join(nodes) + '</svg>')

    people = [('PS', 'Priya Shah', 'VP Sales', 'Northwind', 5, 96, 'Hiring 6 SDRs', True),
              ('TO', 'Tom Okafor', 'Head of Sales', 'Brightline', 4, 91, 'Comment on ramp time', False),
              ('LM', 'Lena Moreau', 'Sales Director', 'Quarry', 4, 88, 'New CRO', False),
              ('DK', 'Dev Kapoor', 'Head of Revenue', 'Copperleaf', 3, 79, 'Series B', False),
              ('AR', 'Ana Ruiz', 'VP Sales', 'Initech', 3, 74, 'Moved off HubSpot', False),
              ('SL', 'Sam Lee', 'RevOps Lead', 'Globex', 2, 62, 'Hiring RevOps', False)]
    cols_t = 'grid-template-columns:1.7fr 1.1fr 1fr 1.3fr'
    rows_h = [f'<div class="tb__h fade" style="{cols_t}"{at(3)}><span>{ic("user")}Person</span><span>{ic("building")}Company</span><span>{ic("target")}Fit</span><span>{ic("flag")}Signal</span></div>']
    for i, (ini, nm, ti, co, f, sc, sig, hot) in enumerate(people):
        score = ''.join(f'<i class="{"y" if k < f else ""}"></i>' for k in range(5))
        inner = (f'<div class="who">{av(ini)}<span><b>{nm}</b><small>{ti}</small></span></div>'
                 f'<div class="co">{lg(co)}{co}</div><div><span class="score">{score}</span><span class="mono mut">{sc}</span></div>'
                 f'<div><span class="tagx{" tagx--sig" if hot else ""}">{sig}</span></div>')
        if hot:
            rows_h.append(f'<div class="rise"{at(3.05, i=i)}><div class="tb__r openable" id="sc-priya" style="{cols_t}"{at(3.6)}>{inner}</div></div>')
        else:
            rows_h.append(f'<div class="rise"{at(3.05, i=i)}><div class="tb__r" style="{cols_t}">{inner}</div></div>')
    table = f'<div class="abs" id="sc-table" style="left:0;right:0;top:{fy0}px">' + ''.join(rows_h) + '</div>'

    panel = f'''<div class="panel slide" id="sc-panel" style="width:300px;padding:18px"{at(3.9, 5)}>
      <div class="who" style="margin-bottom:16px">{av('PS')}<span><b>Priya Shah</b><small>VP Sales, Northwind</small></span></div>
      <p class="fnt" style="font-size:11px;margin-bottom:8px">Why she fits</p>
      <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:16px">
        <span class="who" style="gap:8px"><svg style="width:14px;height:14px;color:var(--signal)"><use href="#i-check"/></svg>Runs a 14 person sales team</span>
        <span class="who" style="gap:8px"><svg style="width:14px;height:14px;color:var(--signal)"><use href="#i-check"/></svg>Series B in August</span>
        <span class="who" style="gap:8px"><svg style="width:14px;height:14px;color:var(--signal)"><use href="#i-check"/></svg>Posted about SDR hiring</span>
      </div>
      <div style="border:1px solid var(--line);border-radius:10px;padding:12px;display:flex;flex-direction:column;gap:8px">
        <span class="who" style="gap:8px"><img src="/assets/logos/linkedin.svg" width="14" height="14" alt=""><small style="font-size:12px">Priya Shah, 2 days ago</small></span>
        <span style="font-size:12.5px;line-height:18px">We're hiring 6 SDRs this quarter. Ramp time is the part I worry about most.</span>
        <span><span class="tagx tagx--sig">Good time to reach out</span></span>
      </div>
      <div style="margin-top:16px"><span class="btnx">Add to campaign</span></div>
    </div>'''

    # Flights from fit nodes to the first rows (canvas coords)
    fl = []
    targets = [(0, fit[3]), (1, fit[8]), (2, fit[12]), (3, fit[15])]
    for r, n in targets:
        x1, y1 = pts[n]
        x1 += O + vx; y1 += O + vy + fy0
        x2 = O + vx + 22; y2 = O + vy + fy0 + 34 + 44 * r + 22
        fl.append(fly(path_c(x1, y1, x2, y2, 'v'), 2.95, 3.4))

    viewA = f'''<div class="view abs" style="left:{vx}px;top:{vy}px;right:0;bottom:0"{at(0, 5)}>
      <p class="typing" id="sc-sent" data-type="0.1,1.4" style="padding:18px 20px 0;font-size:19px;line-height:27px;font-weight:500;letter-spacing:-0.02em;color:var(--faint);max-width:640px">Heads of <span class="dcrit"{at(0.55)}>RevOps</span> in the <span class="dcrit"{at(0.8)}>United States</span> at <span class="dcrit"{at(1.05)}>B2B software</span> companies with <span class="dcrit"{at(1.3)}>51 to 500 people</span>, hiring in sales</p>
      {field}{table}{panel}
    </div>'''

    chain = [('user-plus', 'Invite with a note', 'Day 1', '0,96,5.1,5.4', 'sent'),
             ('clock', 'Wait for them to accept', 'Up to 14 days', '0,41,5.3,5.6', 'accepted'),
             ('msg', 'Send a message', 'Once they accept', '0,38,5.5,5.8', 'sent'),
             ('eye', 'View their profile', 'After 5 days', '0,12,5.7,5.95', 'waiting')]
    ch = []
    for i, (k, t, sub, cnt, lab) in enumerate(chain):
        y = 92 + i * 64
        ch.append(f'<div class="abs who sc-chain" style="left:24px;top:{y}px;width:300px;gap:12px"><span style="width:32px;height:32px;border:1px solid var(--ink);border-radius:8px;display:grid;place-items:center;background:var(--panel)"><svg style="width:15px;height:15px"><use href="#i-{k}"/></svg></span><span style="flex:1"><b>{t}</b><small>{sub}</small></span><span class="mono" style="font-size:12px"><span data-count="{cnt}">0</span> <span class="mut">{lab}</span></span></div>')
    chain_line = (f'<svg class="abs" style="left:24px;top:92px" width="40" height="230"><path class="edge" d="M16 32 V224" />'
                  f'<path class="edge edge--sig wire-t" pathLength="1" d="M16 32 V224" data-scrub="5.1,5.95"/></svg>')
    approval = f'''<div class="card card--pop rise" id="sc-appr" style="left:370px;top:96px;width:310px;padding:14px;display:flex;flex-direction:column;gap:10px"{at(5.9)}>
      <div class="who" style="justify-content:space-between"><span class="who">{av('PS')}<b>Priya Shah</b></span><span class="swap"{at(6.5)}><span class="swap__old tagx tagx--warn">Needs approval</span><span class="swap__new tagx tagx--sig">Approved</span></span></div>
      <p style="font-size:12.5px;line-height:19px">Hi Priya, saw your post about hiring 6 SDRs. Teams your size often lose a month to ramp time. Worth a short call next week?</p>
      <p class="fnt" style="font-size:11.5px">Drafted from her post and Northwind's Series B</p>
      <div style="display:flex;gap:8px;justify-content:flex-end"><span class="btnx btnx--ghost">Skip</span><span class="btnx press" id="sc-approve"{at(6.4)}>Approve</span></div>
    </div>'''
    viewB = f'''<div class="view abs" style="left:{vx}px;top:{vy}px;right:0;bottom:0"{at(5, 7)}>
      <div class="abs" style="left:24px;top:20px;right:24px;display:flex;gap:28px">
        <span><small class="fnt" style="font-size:11px">Enrolled</small><br><b class="mono" style="font-size:20px;font-weight:400">128</b></span>
        <span><small class="fnt" style="font-size:11px">Accepted</small><br><b class="mono" style="font-size:20px;font-weight:400" data-count="0,41,5.3,5.6">0</b></span>
        <span><small class="fnt" style="font-size:11px">Replies</small><br><b class="mono" style="font-size:20px;font-weight:400" data-count="0,9,5.6,6.9">0</b></span>
      </div>
      {chain_line}{''.join(ch)}{approval}
    </div>'''

    inbox_rows = [('TO', 'Tom Okafor', 'Thanks, can you send pricing first?', '1h'),
                  ('LM', 'Lena Moreau', "I'm out until the 27th.", '3h'),
                  ('DK', 'Dev Kapoor', 'Who else uses this in fintech?', '1d')]
    ir = [f'<div class="abs rise" id="sc-row" style="left:0;top:40px;width:300px;height:62px;padding:12px 16px;border-bottom:1px solid var(--line-light);display:flex;gap:10px"{at(7.2)}><span class="hl" style="position:absolute;inset:0"{at(7.3)}></span><span class="who" style="position:relative;align-items:flex-start;flex:1">{av("PS")}<span style="flex:1"><b>Priya Shah</b><small>Happy to talk. Tuesday at 10 works.</small></span></span><span class="pop" style="position:relative"{at(7.45)}><span class="tagx tagx--sig">Replied</span></span></div>']
    for i, (ini, nm, txt, t) in enumerate(inbox_rows):
        ir.append(f'<div class="abs" style="left:0;top:{102 + 62 * i}px;width:300px;height:62px;padding:12px 16px;border-bottom:1px solid var(--line-light);display:flex;gap:10px"><span class="who" style="align-items:flex-start;flex:1">{av(ini)}<span><b>{nm}</b><small>{txt}</small></span></span><span class="mono fnt" style="font-size:11px">{t}</span></div>')
    thread = f'''<div class="abs" style="left:300px;top:0;right:0;bottom:0;border-left:1px solid var(--line-light);padding:16px 20px;display:flex;flex-direction:column;gap:12px">
      <div class="who">{av('PS')}<span><b>Priya Shah</b><small>VP Sales, Northwind</small></span><img src="/assets/logos/linkedin.svg" width="14" height="14" alt="" style="margin-left:auto"></div>
      <p style="align-self:flex-end;max-width:78%;background:var(--hover);border-radius:12px;padding:8px 12px;font-size:12.5px;line-height:18px">Hi Priya, saw your post about hiring 6 SDRs. Teams your size often lose a month to ramp time. Worth a short call next week?</p>
      <p class="rise" id="sc-reply" style="align-self:flex-start;max-width:78%;border:1px solid var(--line);border-radius:12px;padding:8px 12px;font-size:12.5px;line-height:18px"{at(7.35)}>Happy to talk. Tuesday at 10 works.</p>
      <div class="pop" id="sc-deal" style="margin-top:auto;border:1px solid var(--signal-line);background:var(--signal-soft);border-radius:10px;padding:10px 12px;display:flex;align-items:center;gap:10px"{at(7.7)}>{lg('Northwind')}<span style="flex:1"><b style="font-weight:500">Northwind</b><small class="mut" style="display:block;font-size:11.5px">Added to Opportunities with the whole thread</small></span><span class="tagx tagx--sig">New deal</span></div>
    </div>'''
    viewC = f'''<div class="view view--last abs" style="left:{vx}px;top:{vy}px;right:0;bottom:0"{at(7)}>
      <div class="abs" style="left:0;top:0;width:300px;height:40px;padding:0 16px;display:flex;align-items:center;gap:8px;border-bottom:1px solid var(--line-light)"><b style="font-weight:500">All replies</b><span class="tagx">6 new</span></div>
      {''.join(ir)}{thread}
    </div>'''

    bar = f'''<div class="bar"><span class="bar__crumb fade"{at(0, 5)}>Scout / <b>US RevOps leaders</b></span><span class="bar__crumb fade abs" style="left:16px"{at(5, 7)}>Campaigns / <b>US RevOps leaders</b></span><span class="bar__crumb fade abs" style="left:16px"{at(7)}>Inbox / <b>All replies</b></span><span class="bar__sp"></span>
      <span class="fade"{at(1.6, 5)}><span class="tagx tagx--sig"><span data-count="0,128,1.8,2.9">0</span>&nbsp;found</span></span>
      <span class="chip">{ic('filter')}Filter</span><span class="chip chip--ink">{ic('plus')}Add to campaign</span></div>'''

    sidebar = side('scout', {'scout': (0, 5), 'send': (5, 7), 'inbox': (7, None)})
    win = f'<div class="win" style="left:{O}px;top:{O}px;width:{W}px;height:{H}px">{sidebar}{bar}{viewA}{viewB}{viewC}</div>'
    # Hand-off: from Priya's inbox row down to the canvas bottom
    hand = fly(path_c(O + vx + 300, O + vy + 40 + 31, O + 460, O + H + 22, 'v'), 7.75, 99)
    status = f'<div class="abs card fade" style="left:{O + 196}px;top:{O + H - 52}px;padding:8px 12px;display:flex;align-items:center;gap:10px;box-shadow:var(--shadow-pop)"{at(1.6, 3)}><span class="ldr"><i></i><i></i><i></i><i></i></span><b style="font-weight:500">Searching 2.4M people</b><span class="mut">Reading fit and signals</span></div>'
    focus = [[0, "#sc-sent"], [1.6, "#sc-field"], [3, "#sc-table"], [3.85, "#sc-panel"], [5, ".sc-chain"], [5.85, "#sc-appr"],
             [7], [7.18, "#sc-row"], [7.3, "#sc-reply"], [7.65, "#sc-deal"]]
    cursor = [[0], [3.3, "#sc-priya"], [5.5, "#sc-approve"], [7.0]]
    canvas = f'<div class="ground"></div>{win}{status}' + ''.join(fl) + hand + guides((O, O, W, H), focus, cursor)
    return stage('scout', 8, 'Scout 1.0', 'Find the buyers<br><span class="two">worth your time.</span>',
                 [('Describe', 0), ('Search', 1.6), ('List', 3), ('Campaign', 5), ('Reply', 7)], canvas, W + 2 * O, H + 2 * O, O + 176,
                 ['Describe who you sell to in one sentence.',
                  'Scout searches 2.4M people and lights up the ones who fit.',
                  'Each match comes with the reason and the post behind it.',
                  'Add them to a LinkedIn campaign. Nothing sends until you approve.',
                  'Replies land in one inbox. A yes becomes a new deal.'])

# ─────────────────────────── UNIFY ───────────────────────────
def unify():
    R = 100; O = 20  # rail width, top offset
    W, H = 880, 540
    cx = lambda x: R + x
    cy = lambda y: O + y
    srcs = [('gmail.svg', 'Gmail'), ('calendar.svg', 'Calendar'), ('meet.svg', 'Meet'), ('zoom.svg', 'Zoom')]
    rail = ['<span class="abs mono fnt" style="left:20px;top:118px;font-size:10px;letter-spacing:.08em">SOURCES</span>']
    port = (cx(0), cy(388))
    wires, streams = [], []
    for i, (f, n) in enumerate(srcs):
        y = 150 + i * 80
        rail.append(f'<span class="abs un-src" style="left:20px;top:{y}px;width:44px;height:44px;border:1px solid var(--line-strong);border-radius:12px;background:var(--panel);display:grid;place-items:center;box-shadow:var(--shadow-pop)"><img src="/assets/logos/{f}" width="20" height="20" alt="{n}"></span>')
        d = path_c(64, y + 22, port[0], port[1])
        wires.append(f'<path class="edge edge--ink wire" pathLength="1" d="{d}"{at(1.2 + i * 0.1)}/>')
        streams.append(f'<span class="dot6 stream" style="offset-path:path(\'{d}\');--i:{i}"{at(1.4, 3)}></span>')
    over = f'<svg class="over" width="{R + W + 40}" height="{H + 2 * O}">' + ''.join(wires) + '</svg>'

    deals = [('Globex', 'Negotiation', '$72,000', 'Nov 14', 'Legal review', 'MC'),
             ('Initech', 'Demo', '$31,000', 'Dec 2', 'Send case study', 'JR'),
             ('Lumen Labs', 'Proposal', '$26,500', 'Nov 21', 'Pricing call', 'MC'),
             ('Acme', 'Discovery', '$18,000', 'Jan 9', 'Book discovery', 'JR'),
             ('Quarry', 'Demo', '$14,000', 'Dec 12', 'Demo with IT', 'AK')]
    tone = {'Discovery': '', 'Demo': '', 'Proposal': 'tagx--ink', 'Negotiation': 'tagx--ink'}
    cols_t = 'grid-template-columns:1.3fr 1fr .9fr .8fr 1.5fr .5fr'
    rows = [f'<div class="tb__h" style="{cols_t}"><span>{ic("building")}Account</span><span>{ic("flag")}Stage</span><span>{ic("dollar")}Amount</span><span>{ic("cal")}Close</span><span>{ic("check")}Next step</span><span>{ic("user")}</span></div>']
    for co, stg, amt, cl, nx, ow in deals:
        rows.append(f'<div class="tb__r" style="{cols_t}"><div class="co">{lg(co)}{co}</div><div><span class="tagx {tone[stg]}">{stg}</span></div><div class="mono">{amt}</div><div class="mut">{cl}</div><div class="mut">{nx}</div><div>{av(ow)}</div></div>')
    nw = (f'<div class="rise"{at(0.45)}><div class="tb__r flash" id="un-row" style="{cols_t}"{at(0.45)}><div class="co">{lg("Northwind")}Northwind</div>'
          f'<div><span class="swap"{at(5.1)}><span class="swap__old tagx">Discovery</span><span class="swap__new tagx tagx--ink">Proposal</span></span></div>'
          f'<div class="mono"><span class="swap"{at(5.15)}><span class="swap__old">$40,000</span><span class="swap__new">$48,000</span></span></div>'
          f'<div class="mut"><span class="swap"{at(5.2)}><span class="swap__old">Dec 15</span><span class="swap__new">Nov 28</span></span></div>'
          f'<div class="mut"><span class="swap"{at(5.25)}><span class="swap__old">Book discovery</span><span class="swap__new">Send proposal by Fri</span></span></div><div>{av("PS")}</div></div></div>')
    table = f'<div class="tb" style="top:112px">' + ''.join(rows) + nw + '</div>'

    pipe = f'''<div class="abs" id="un-pipe" style="left:176px;right:0;top:48px;height:64px;padding:12px 16px;display:flex;align-items:center;gap:24px;border-bottom:1px solid var(--line-light)">
      <span><small class="fnt" style="font-size:11px;display:block">Pipeline</small><b class="mono" style="font-size:20px;font-weight:400" data-count="1.21,1.25,5.1,5.6,m">$1.21M</b></span>
      <span style="flex:1;display:flex;flex-direction:column;gap:6px">
        <span style="display:flex;height:8px;gap:2px;border-radius:4px;overflow:hidden"><i style="flex:22;background:var(--line-strong)"></i><i style="flex:30;background:var(--faint)"></i><i style="flex:26;background:var(--ink-2)"></i><i class="pop" style="flex:4;background:var(--signal);transform-origin:left"{at(5.1)}></i><i style="flex:18;background:var(--ink)"></i></span>
        <span class="fnt" style="display:flex;gap:16px;font-size:11px"><span>Discovery</span><span>Demo</span><span>Proposal</span><span>Negotiation</span></span>
      </span>
      <span class="chip">This quarter</span></div>'''

    toast = f'''<div class="card card--pop rise" id="un-toast" style="left:196px;bottom:16px;width:340px;padding:10px 12px;display:flex;align-items:center;gap:10px"{at(2.2, 3)}>
      <img src="/assets/logos/meet.svg" width="18" height="18" alt=""><span style="flex:1"><b style="font-weight:500">Pricing review with Northwind</b><small class="mut" style="display:block;font-size:11.5px">Google Meet, 32 min, 4 people</small></span><span class="ldr"><i></i><i></i><i></i><i></i></span></div>'''

    fields = [('Stage', 'Discovery', 'Proposal', 4.65, 'Pricing review, 18:31'),
              ('Amount', '$40,000', '$48,000', 4.35, 'Pricing review, 12:04'),
              ('Close date', 'Dec 15', 'Nov 28', 4.95, 'Pricing review, 27:12'),
              ('Owner', 'Priya Shah', None, None, None)]
    fh = []
    for i, (lab, old, new, a, src) in enumerate(fields):
        y = 64 + i * 44
        if new:
            val = f'<span class="swap"{at(a)}><s>{old}</s><span class="swap__old">{old}</span><span class="swap__new">{new}</span></span>'
            srcl = f'<small class="abs fade" style="left:120px;top:{y + 22}px;font-size:11px;color:var(--signal-text)"{at(a)}>{src}</small>'
        else:
            val, srcl = f'<span class="who" style="gap:6px">{av("PS")}{old}</span>', ''
        fh.append(f'<span class="abs fnt un-f" style="left:20px;top:{y}px">{lab}</span><span class="abs{" un-f" if new else ""}" style="left:120px;top:{y}px">{val}</span>{srcl}')
    lines = [('12:04', 'Dana', 'Growth looks right for us, around 40 seats.', 3.3),
             ('14:40', 'Sam', 'We need SSO before IT signs off.', None),
             ('18:31', 'Dana', "Send over the proposal and we'll review it Friday.", 3.6),
             ('22:10', 'Priya', "I'll loop in our IT lead.", None),
             ('27:12', 'Dana', "We'd like to sign before the end of November.", 3.9)]
    lh = []
    for i, (t, who, txt, a) in enumerate(lines):
        y = 262 + i * 46
        hl = f' hl"{at(a)}' if a else '"'
        lh.append(f'<div class="abs un-line{hl} style="left:12px;right:12px;top:{y}px;height:40px;padding:4px 8px;display:flex;gap:10px"><span class="mono fnt" style="font-size:11px;width:34px;flex-shrink:0">{t}</span><span style="font-size:12.5px;line-height:16px"><b style="font-weight:500">{who}</b> {txt}</span></div>')
    PW = 400
    panel = f'''<div class="panel slide" style="width:{PW}px"{at(3, 5)}>
      <div class="abs who" style="left:20px;top:16px">{lg('Northwind')}<b style="font-size:15px">Northwind</b><span class="tagx">Opportunity</span></div>
      {''.join(fh)}
      <span class="abs fnt" style="left:20px;top:236px;font-size:11px">Pricing review, Oct 14, transcript</span>
      {''.join(lh)}
    </div>'''
    # Quote to field flights (canvas coords). Panel left edge in the window:
    px = W - PW
    def fl_q(line_i, field_i, a):
        y1 = cy(262 + line_i * 46 + 20); y2 = cy(64 + field_i * 44 + 9)
        x1 = cx(px + 60); x2 = cx(px + 116)
        d = f'M{x1} {y1} C{x1 - 70} {y1} {x2 - 90} {y2} {x2} {y2}'
        return fly(d, a, round(a + 0.3, 2))
    qfl = fl_q(0, 1, 4.1) + fl_q(2, 0, 4.4) + fl_q(4, 2, 4.7)

    bar = f'<div class="bar"><span class="bar__crumb">Opportunities / <b>All</b></span><span class="bar__sp"></span><span class="chip">{ic("filter")}Filter</span><span class="chip">{ic("sliders")}Display</span><span class="chip chip--ink">{ic("plus")}New</span></div>'
    win = f'<div class="win" style="left:{R}px;top:{O}px;width:{W}px;height:{H}px">{side("target")}{bar}{pipe}{table}{toast}{panel}</div>'
    arrive = fly(f'M{cx(560)} -12 C{cx(560)} 200 {cx(200)} {cy(388)} {cx(196)} {cy(388)}', 0.05, 0.5)
    leave = fly(f'M{cx(196)} {cy(388)} C{cx(150)} {cy(388)} {cx(480)} {cy(470)} {cx(440)} {cy(H) + 22}', 5.65, 99)
    focus = [[0, "#un-row"], [1.2], [2.15, "#un-toast"], [3, ".un-line"], [4, ".un-f"], [5, "#un-pipe"], [5.35, "#un-row"]]
    rail_focus = [[0], [1.2, ".un-src"], [2.15]]
    rf = (f'<span class="focus focus--ring" data-root="canvas" data-guide=\'{json.dumps(rail_focus)}\'></span>')
    canvas = (f'<div class="ground"></div>{over}' + ''.join(rail) + win + ''.join(streams) + qfl + arrive + leave
              + guides((R, O, W, H), focus, None) + rf)
    return stage('unify', 6, 'Unify 2.0', 'Remember everything.<br><span class="two">The CRM fills itself.</span>',
                 [('Arrive', 0), ('Sources', 1.2), ('Listen', 3), ('Update', 4), ('Roll up', 5)], canvas, R + W + 20, H + 2 * O, R + 176,
                 ["Priya's reply arrives as a new deal. No one types it in.",
                  'Gmail, Calendar, Meet and Zoom feed every deal on their own.',
                  'Omniscient reads the meeting and finds what changed.',
                  'Each fact moves into its field, with the quote as proof.',
                  'The pipeline updates itself. Northwind moves on to Close.'])

# ─────────────────────────── CLOSE ───────────────────────────
def close():
    O = 20; W, H = 880, 540
    c = lambda x, y: (O + x, O + y)
    pages = ['Plan', 'Pricing', 'Security', 'Team']
    bp = [f'<div class="side"><div class="side__ws">{MARK}Northwind room</div><div class="side__lab">Pages</div>']
    for i, p in enumerate(pages):
        bp.append(f'<div class="side__i{" cur" if i == 0 else ""}">{ic("layout")}{p}</div>')
    bp.append('<div class="side__lab">Elements</div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;padding:4px 8px">')
    for k in range(9):
        bp.append('<span style="aspect-ratio:1;border:1px solid var(--line-strong);border-radius:5px"></span>')
    bp.append('</div></div>')
    bar = f'''<div class="bar"><span class="bar__crumb">Deal Room / <b>Northwind</b></span><span class="chip" style="margin-left:8px">{ic("link")}rooms.tryomniscient.com/northwind</span><span class="bar__sp"></span>
      <span class="swap cl-live"{at(2.3)}><span class="swap__old tagx">Draft</span><span class="swap__new tagx tagx--sig">Live</span></span><span class="chip cl-live">{ic("eye")}Preview</span><span class="btnx press cl-live" id="cl-golive"{at(2.2)}>Go live</span></div>'''
    # Page with block slots (x 196..636)
    PX, PW = 196, 440
    slots = [(76, 70), (156, 112), (278, 74), (362, 70)]
    slot_h = ''.join(f'<span class="abs" style="left:{PX + 16}px;top:{y}px;width:{PW - 32}px;height:{h}px;border:1px dashed var(--line-strong);border-radius:8px"></span>' for y, h in slots)
    blocks = [
        f'<div class="abs drop" style="left:{PX + 16}px;top:76px;width:{PW - 32}px;height:70px;padding:12px 14px;border-radius:8px;background:var(--panel);border:1px solid var(--line)"{at(0.55)}><span class="mono fnt" style="font-size:10px;letter-spacing:.08em">NORTHWIND AND ORBIT</span><p style="font-size:19px;line-height:24px;font-weight:500;letter-spacing:-.02em">Your rollout plan <span class="fnt">signed by Nov 28</span></p></div>',
        f'<div class="abs drop" id="cl-price" style="left:{PX + 16}px;top:156px;width:{PW - 32}px;height:112px;padding:12px 14px;border-radius:8px;background:var(--panel);border:1px solid var(--line);display:grid;grid-template-columns:1fr 1fr auto;gap:10px;align-items:end"{at(0.95)}><span style="border:1px solid var(--line);border-radius:8px;padding:8px 10px"><small class="mut">Team</small><b class="mono" style="display:block;font-size:18px;font-weight:400">$24,000</b><small class="fnt">per year</small></span><span style="border:1px solid var(--ink);border-radius:8px;padding:8px 10px"><small class="mut">Business</small><b class="mono" style="display:block;font-size:18px;font-weight:400">$48,000</b><small class="fnt">per year</small></span><span class="btnx press" id="cl-accept"{at(4.6)}>Accept plan</span></div>',
        f'<div class="abs drop" style="left:{PX + 16}px;top:278px;width:{PW - 32}px;height:74px;padding:12px 14px;border-radius:8px;background:var(--panel);border:1px solid var(--line)"{at(1.35)}><svg width="380" height="50" viewBox="0 0 380 50"><path class="edge edge--ink" d="M10 14 H370"/><rect class="sq" x="4" y="8" width="12" height="12"/><rect class="sq" x="184" y="8" width="12" height="12"/><rect x="364" y="8" width="12" height="12" fill="var(--signal)"/><text x="4" y="40" font-size="11" fill="var(--muted)">Today</text><text x="150" y="40" font-size="11" fill="var(--muted)">Security review, Nov 7</text><text x="300" y="40" font-size="11" fill="var(--muted)">Go live, Nov 28</text></svg></div>',
        f'<div class="abs drop" style="left:{PX + 16}px;top:362px;width:{PW - 32}px;height:70px;padding:12px 14px;border-radius:8px;background:var(--panel);border:1px solid var(--line);display:flex;gap:20px"{at(1.75)}><span class="who">{av("DR")}<span><b>Dana Ruiz</b><small>CFO</small></span></span><span class="who">{av("SP")}<span><b>Sam Patel</b><small>IT</small></span></span><span class="who">{av("PS")}<span><b>Priya Shah</b><small>VP Sales</small></span></span></div>',
    ]
    page = f'<span class="abs" id="cl-page" style="left:{PX}px;top:60px;width:{PW}px;height:{H - 76}px;border:1px solid var(--line);border-radius:10px;background-image:radial-gradient(var(--line) 1px,transparent 1px);background-size:8px 8px"></span>' + slot_h + ''.join(blocks)
    RX = 656
    rec_items = [('Stakeholders', 'Dana, Sam, Priya'), ('Amount', '$48,000'), ('Close date', 'Nov 28'), ('Stage', 'Proposal')]
    rec = [f'<div class="abs fade" id="cl-rec" style="left:{RX}px;top:60px;width:208px"{at(0, 3)}><p class="fnt" style="font-size:11px;margin-bottom:10px">From the record</p><div class="co" style="margin-bottom:12px">{lg("Northwind")}Northwind</div>']
    for i, (k, v) in enumerate(rec_items):
        rec.append(f'<div style="display:flex;justify-content:space-between;height:34px;align-items:center;border-top:1px solid var(--line-light)"><span class="fnt">{k}</span><span>{v}</span></div>')
    rec.append('</div>')
    # record lines: y = 60 + 22 + 32 + 17 + 34*i  (within window)
    rec_y = [60 + 70 + 34 * i for i in range(4)]
    targets = [(rec_y[0], 397, 1.6), (rec_y[1], 212, 0.8), (rec_y[2], 315, 1.2), (rec_y[3], 111, 0.4)]
    fl = []
    for y1, y2, a in targets:
        x1, yy1 = c(RX - 4, y1); x2, yy2 = c(PX + PW - 16, y2)
        fl.append(fly(f'M{x1} {yy1} C{x1 - 30} {yy1} {x2 + 30} {yy2} {x2} {yy2}', a, round(a + 0.4, 2)))
    readers = [('PS', 'Priya Shah', 'Opened the room', 3.2, 111, False),
               ('DR', 'Dana Ruiz', 'Opened Pricing 3 times', 3.45, 212, True),
               ('SP', 'Sam Patel', 'Read Security, 6 min', 3.7, 397, False)]
    rd = [f'<div class="abs fade cl-reader" style="left:{RX}px;top:60px;width:208px"{at(3)}><p class="fnt" style="font-size:11px">Who read what</p></div>']
    wires = []
    for i, (ini, nm, what, a, ty, hot) in enumerate(readers):
        y = 92 + i * 56
        rd.append(f'<div class="abs rise who cl-reader" style="left:{RX}px;top:{y}px;width:208px;height:48px;border-bottom:1px solid var(--line-light)"{at(a)}>{av(ini)}<span style="flex:1"><b>{nm}</b><small>{what}</small></span>{"<span class=dot6 style=position:static;margin:0></span>" if hot else ""}</div>')
        x1, y1 = c(RX - 4, y + 24); x2, y2 = c(PX + PW - 16, ty)
        n = 3 if hot else 1
        for k in range(n):
            off = (k - 1) * 6 if hot else 0
            wires.append(f'<path class="edge {"edge--sig" if hot else "edge--ink"} wire" pathLength="1" d="M{x1} {y1} C{x1 - 24} {y1} {x2 + 24} {y2 + off} {x2} {y2 + off}"{at(round(a + 0.1 + k * 0.12, 2))}/>')
    signed = f'''<div class="abs card card--pop pop" id="cl-signed" style="left:{RX}px;top:290px;width:208px;padding:12px;display:flex;flex-direction:column;gap:6px"{at(4.8)}>
      <span class="co">{lg('Northwind')}Northwind</span>
      <span class="who" style="gap:6px"><s class="fnt">Proposal</s><span class="tagx tagx--sig">Closed won</span></span>
      <b class="mono" style="font-weight:400;font-size:18px;color:var(--signal-text)">$48,000</b></div>'''
    loop = f'''<div class="abs card card--pop rise" id="cl-loop" style="left:{RX}px;top:420px;width:208px;padding:10px 12px;display:flex;gap:10px;align-items:flex-start"{at(5.75)}>
      <svg width="15" height="15" style="flex-shrink:0;margin-top:2px"><use href="#i-scout"/></svg><span><b style="font-weight:500">Scout</b><small class="mut" style="display:block;font-size:11.5px;line-height:15px">Find the CTO at Northwind next. Sam read Security twice.</small></span></div>'''
    # Burst from the Go live button (window x ~ 836, y 24)
    bx, by = c(836, 24)
    bits = ''.join(f'<i style="--dx:{math.cos(a) * r:.0f}px;--dy:{math.sin(a) * r:.0f}px"></i>' for a, r in [(k * math.pi / 6 + 0.2, 36 + (k % 3) * 14) for k in range(12)])
    burst = f'<span class="abs burst" style="left:{bx}px;top:{by}px"{at(2.25, 3)}>{bits}</span>'
    up = fly(f'M{c(RX - 4, 92 + 2 * 56 + 24)[0]} {c(0, 92 + 2 * 56 + 24)[1]} C{c(560, 0)[0]} {c(0, 200)[1]} {c(460, 0)[0]} 120 {c(460, 0)[0]} -14', 5.5, 99)
    arrive = fly(f'M{O + 440} -12 C{O + 440} 40 {O + RX + 40} 20 {O + RX + 40} {O + 80}', 0.0, 0.35)
    win = f'<div class="win" style="left:{O}px;top:{O}px;width:{W}px;height:{H}px">{"".join(bp)}{bar}{page}{"".join(rec)}{"".join(rd)}{signed}{loop}</div>'
    over = f'<svg class="over" width="{W + 2 * O}" height="{H + 2 * O}">' + ''.join(wires) + '</svg>'
    focus = [[0, "#cl-rec"], [0.4, "#cl-page"], [2, ".cl-live"], [3, ".cl-reader"], [4.5, "#cl-price"], [4.75, "#cl-signed"], [5.5, "#cl-loop"]]
    cursor = [[0], [1.8, "#cl-golive"], [2.6], [4.2, "#cl-accept"], [4.9]]
    canvas = '<div class="ground"></div>' + win + over + ''.join(fl) + burst + up + arrive + guides((O, O, W, H), focus, cursor)
    return stage('close', 6.2, 'Close 3.0', 'Close with one link.<br><span class="two">See who read what.</span>',
                 [('Build', 0), ('Go live', 2), ('Readers', 3), ('Signed', 4.5), ('Loop', 5.5)], canvas, W + 2 * O, H + 2 * O, O + 176,
                 ['The room builds itself from the record.',
                  'One click and the room is live.',
                  'See who opened it, what they read and for how long.',
                  'Dana accepts the plan. The deal closes in the CRM.',
                  "Sam's reads tell Scout who to find next."])

# ─────────────────────────── HERO TRIANGLE ───────────────────────────
def hero_tri():
    cxp, cyp, r = 260, 260, 200
    A = (260, 60); B = (260 - r * math.cos(math.pi / 6), 260 + r * 0.5); C = (260 + r * math.cos(math.pi / 6), 260 + r * 0.5)
    def inside(x, y):
        def s(p1, p2, p3): return (p1[0] - p3[0]) * (p2[1] - p3[1]) - (p2[0] - p3[0]) * (p1[1] - p3[1])
        d1, d2, d3 = s((x, y), A, B), s((x, y), B, C), s((x, y), C, A)
        neg = d1 < 0 or d2 < 0 or d3 < 0; pos = d1 > 0 or d2 > 0 or d3 > 0
        return not (neg and pos)
    pts = []
    for yy in range(84, 360, 24):
        for xx in range(84, 440, 24):
            if inside(xx, yy) and math.hypot(xx - cxp, yy - cyp) > 34:
                pts.append((xx, yy))
    random.seed(3)
    drift = random.sample(range(len(pts)), min(16, len(pts)))
    nodes = []
    for i, (x, y) in enumerate(pts):
        if i in drift:
            k = drift.index(i)
            nodes.append(f'<circle class="drift" cx="{x}" cy="{y}" r="2.5" fill="var(--line-strong)" style="--i:{k};--dx:{cxp - x}px;--dy:{cyp - y}px"/>')
        else:
            nodes.append(f'<circle cx="{x}" cy="{y}" r="2" fill="var(--line-strong)"/>')
    def corner(p, name, dy):
        return f'<rect class="sq" x="{p[0] - 8:.1f}" y="{p[1] - 8:.1f}" width="16" height="16"/><text x="{p[0]:.1f}" y="{p[1] + dy:.1f}" text-anchor="middle" font-size="16" font-weight="500" fill="var(--ink)" letter-spacing="-0.3">{name}</text>'
    return f'''<svg class="htri" viewBox="0 0 520 600" data-vscrub role="img" aria-label="Scout, Unify and Close around one record">
  <circle cx="260" cy="260" r="200" fill="none" stroke="var(--line-strong)"/>
  <circle cx="260" cy="260" r="120" fill="none" stroke="var(--light)" stroke-dasharray="2 4"/>
  <path d="M{A[0]} {A[1]} L{B[0]:.1f} {B[1]:.1f} L{C[0]:.1f} {C[1]:.1f}Z" fill="none" stroke="var(--ink)"/>
  {''.join(nodes)}
  <g class="core"><rect x="250" y="250" width="20" height="20" fill="var(--panel)" stroke="var(--ink)"/><circle cx="260" cy="260" r="4.5" fill="var(--signal)"/></g>
  {corner(A, 'Scout', -18)}{corner(B, 'Unify', 32)}{corner(C, 'Close', 32)}
  <path class="tail" pathLength="1" d="M260 460 V600" fill="none" stroke="var(--ink)"/>
</svg>'''

def spine(label):
    return f'''<div class="spine" data-vscrub aria-hidden="true">
  <svg viewBox="0 0 240 200" preserveAspectRatio="none"><path d="M120 0 V200" stroke="var(--line-strong)" fill="none"/><path class="wire-t" pathLength="1" d="M120 0 V200" stroke="var(--signal)" fill="none"/>
  <rect class="sq" x="114" y="94" width="12" height="12"/><text class="spine__lab" x="136" y="104">{label}</text></svg>
  <span class="spine__dot"><span class="dot6"></span></span>
</div>'''

json.dump({'sprite': sprite(), 'scout': scout(), 'unify': unify(), 'close': close(), 'hero': hero_tri(),
           'spine_scout': spine('SCOUT'), 'spine_unify': spine('UNIFY'), 'spine_close': spine('CLOSE')}, open(OUT, 'w'))
print('ok')
