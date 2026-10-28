#!/usr/bin/env python3
"""Writes the 11 animated feature drawings for home v2 into assets/img/. 320 x 180, thin black lines, one emerald thing
moving. Each loops on its own and stops with reduced motion."""
import math, os, random, sys
OUT = sys.argv[1]
os.makedirs(OUT, exist_ok=True)
INK, LINE, FAINT, SIG, SOFT, PANEL = '#0a0a0a', '#d4d4d0', '#a3a3a3', '#0c8c5e', '#e8f5ef', '#ffffff'
BASE = f'''.e{{fill:none;stroke:{LINE};stroke-width:1}} .k{{fill:none;stroke:{INK};stroke-width:1}} .s{{fill:none;stroke:{SIG};stroke-width:1.2}}
.sq{{fill:{PANEL};stroke:{INK};stroke-width:1}} .n{{fill:{LINE}}} .ni{{fill:{INK}}} .ns{{fill:{SIG}}} .t{{font:500 9px ui-monospace,Menlo,monospace;letter-spacing:.06em;fill:{FAINT}}}
@media (prefers-reduced-motion:reduce){{*{{animation:none!important}}}}'''

def svg(name, body, css=''):
    open(os.path.join(OUT, f'feat-{name}.svg'), 'w').write(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180" width="320" height="180"><style>{BASE}{css}</style>{body}</svg>\n')

# Scout: lead scouting. A field, a scan line, fits turning emerald as it passes.
random.seed(5)
nodes, css = [], ''
for j in range(5):
    for i in range(11):
        x, y = 40 + i * 24, 42 + j * 24
        if random.random() < 0.22:
            d = (x - 30) / 270 * 4
            nodes.append(f'<circle class="n fit" cx="{x}" cy="{y}" r="3" style="animation-delay:{d:.2f}s"/>')
        else:
            nodes.append(f'<circle class="n" cx="{x}" cy="{y}" r="2.5"/>')
svg('lead-scouting', '<rect class="scan" x="16" y="26" width="18" height="128" fill="%s" opacity=".12"/>' % SIG + ''.join(nodes),
    '.scan{animation:scan 5s linear infinite}@keyframes scan{from{transform:translateX(0)}to{transform:translateX(280px)}}'
    f'.fit{{animation:fit 5s linear infinite}}@keyframes fit{{0%{{fill:{LINE}}}4%,80%{{fill:{SIG}}}90%,100%{{fill:{LINE}}}}}')

# Scout: LinkedIn outreach. Four squares in a chain, a dot walks it, each square fills when passed.
sq = ''.join(f'<rect class="sq st" x="{40 + i * 76}" y="78" width="24" height="24" rx="5" style="animation-delay:{i * 0.9:.1f}s"/>' for i in range(4))
svg('linkedin-outreach', f'<path class="e" d="M64 90 H268"/><path class="s run" pathLength="1" d="M52 90 H280"/>{sq}<circle class="ns walk" r="4" cx="52" cy="90"/>'
    '<text class="t" x="40" y="124">INVITE</text><text class="t" x="116" y="124">WAIT</text><text class="t" x="188" y="124">MESSAGE</text><text class="t" x="268" y="124">VIEW</text>',
    '.run{stroke-dasharray:1;stroke-dashoffset:1;animation:run 3.6s linear infinite}@keyframes run{90%,100%{stroke-dashoffset:0}}'
    '.walk{animation:walk 3.6s linear infinite}@keyframes walk{from{transform:translateX(0)}90%,100%{transform:translateX(228px)}}'
    f'.st{{animation:st 3.6s linear infinite}}@keyframes st{{0%,10%{{fill:{PANEL}}}14%,90%{{fill:{SOFT}}}100%{{fill:{PANEL}}}}}')

# Scout: unified inbox. Rows slide in from three channels into one list.
rows = ''.join(f'<g class="row" style="animation-delay:{i * 0.8:.1f}s"><rect class="sq" x="120" y="{40 + i * 28}" width="160" height="22" rx="4"/><circle class="ni" cx="132" cy="{51 + i * 28}" r="4"/><path class="e" d="M142 {51 + i * 28} H{230 - i * 12}"/></g>' for i in range(4))
svg('unified-inbox', f'<rect class="sq" x="36" y="44" width="28" height="20" rx="4"/><rect class="sq" x="36" y="80" width="28" height="20" rx="4"/><rect class="sq" x="36" y="116" width="28" height="20" rx="4"/>'
    '<path class="e" d="M64 54 C92 54 92 90 120 90 M64 90 H120 M64 126 C92 126 92 90 120 90"/>' + rows,
    '.row{opacity:0;animation:row 3.2s ease-out infinite}@keyframes row{0%{opacity:0;transform:translateX(-12px)}12%,85%{opacity:1;transform:none}100%{opacity:0}}')

# Unify: single source of truth. Six nodes wire into one record square, edges light in turn.
cx, cy = 160, 90
spokes = []
for i in range(6):
    a = i * math.pi / 3 + math.pi / 6
    x, y = cx + math.cos(a) * 70, cy + math.sin(a) * 58
    spokes.append(f'<path class="e" d="M{x:.0f} {y:.0f} L{cx} {cy}"/><path class="s sp" pathLength="1" d="M{x:.0f} {y:.0f} L{cx} {cy}" style="animation-delay:{i * 0.5:.1f}s"/><circle class="ni" cx="{x:.0f}" cy="{y:.0f}" r="4"/>')
svg('single-source-of-truth', ''.join(spokes) + f'<rect class="sq" x="{cx - 14}" y="{cy - 14}" width="28" height="28"/><circle class="ns" cx="{cx}" cy="{cy}" r="4"/>',
    '.sp{stroke-dasharray:1;stroke-dashoffset:1;animation:sp 3s ease-out infinite}@keyframes sp{0%{stroke-dashoffset:1;opacity:1}30%{stroke-dashoffset:0;opacity:1}60%,100%{stroke-dashoffset:0;opacity:0}}')

# Unify: call and meeting intelligence. A waveform turns into lines of notes.
bars = ''.join(f'<rect class="wv" x="{40 + i * 7}" y="70" width="3" height="40" rx="1.5" fill="{INK}" style="animation-delay:{(i % 7) * 0.12:.2f}s"/>' for i in range(14))
lines = ''.join(f'<path class="k ln" pathLength="1" d="M190 {62 + i * 16} H{280 - (i % 2) * 30}" style="animation-delay:{0.5 + i * 0.4:.1f}s"/>' for i in range(4))
svg('call-meeting-intelligence', bars + '<path class="e" d="M146 90 H178"/><circle class="ns mv" cx="146" cy="90" r="3.5"/>' + lines,
    '.wv{transform-box:fill-box;transform-origin:center;animation:wv 1s ease-in-out infinite alternate}@keyframes wv{from{transform:scaleY(.25)}to{transform:scaleY(1)}}'
    '.mv{animation:mv 1.2s linear infinite}@keyframes mv{to{transform:translateX(32px)}}'
    '.ln{stroke-dasharray:1;stroke-dashoffset:1;animation:ln 3.6s ease-out infinite}@keyframes ln{0%{stroke-dashoffset:1}20%,85%{stroke-dashoffset:0}100%{stroke-dashoffset:0;opacity:0}}')

# Unify: self-driving CRM. Three fields; the old value strikes out and the new one arrives from a quote.
f = []
for i, (o, n) in enumerate([('Demo', 'Proposal'), ('$40k', '$48k'), ('Dec 15', 'Nov 28')]):
    y = 52 + i * 34
    d = i * 1.1
    f.append(f'<text x="40" y="{y + 4}" font-size="11" fill="{FAINT}" font-family="system-ui">{["Stage", "Amount", "Close"][i]}</text>'
             f'<g class="old" style="animation-delay:{d}s"><text x="120" y="{y + 4}" font-size="12" fill="{INK}" font-family="system-ui">{o}</text></g>'
             f'<g class="new" style="animation-delay:{d}s"><rect x="114" y="{y - 10}" width="70" height="20" rx="4" fill="{SOFT}"/><text x="120" y="{y + 4}" font-size="12" fill="{INK}" font-family="system-ui">{n}</text></g>'
             f'<path class="s q" pathLength="1" d="M290 {y} C250 {y} 230 {y} 190 {y}" style="animation-delay:{d}s"/><rect class="sq" x="284" y="{y - 6}" width="12" height="12"/>')
svg('self-driving-crm', ''.join(f),
    '.old,.new{animation:3.3s ease-out infinite}.old{animation-name:old}.new{opacity:0;animation-name:nw}'
    '@keyframes old{0%,30%{opacity:1}36%,90%{opacity:0}100%{opacity:1}}@keyframes nw{0%,30%{opacity:0}36%,90%{opacity:1}100%{opacity:0}}'
    '.q{stroke-dasharray:1;stroke-dashoffset:1;animation:q 3.3s ease-out infinite}@keyframes q{0%{stroke-dashoffset:1;opacity:1}30%{stroke-dashoffset:0;opacity:1}40%,100%{opacity:0;stroke-dashoffset:0}}')

# Unify: data model. Squares linked as a graph; a new object pops in and wires up.
svg('data-model', '<path class="e" d="M70 60 H160 M160 60 V120 M70 60 V120 M70 120 H160"/>'
    '<rect class="sq" x="56" y="46" width="28" height="28"/><rect class="sq" x="146" y="46" width="28" height="28"/><rect class="sq" x="56" y="106" width="28" height="28"/><rect class="sq" x="146" y="106" width="28" height="28"/>'
    '<path class="s w" pathLength="1" d="M174 120 H236"/><g class="nw"><rect x="236" y="106" width="28" height="28" fill="%s" stroke="%s"/><circle class="ns" cx="250" cy="120" r="4"/></g>'
    '<text class="t" x="236" y="152">CUSTOM</text>' % (SOFT, SIG),
    '.nw{transform-box:fill-box;transform-origin:center;animation:nw 3s cubic-bezier(.34,1.56,.64,1) infinite}@keyframes nw{0%,30%{opacity:0;transform:scale(.4)}45%,85%{opacity:1;transform:none}100%{opacity:0}}'
    '.w{stroke-dasharray:1;stroke-dashoffset:1;animation:w 3s ease-out infinite}@keyframes w{0%,40%{stroke-dashoffset:1}55%,85%{stroke-dashoffset:0}100%{stroke-dashoffset:0;opacity:0}}')

# Unify: reporting and forecasts. Bars grow, a line draws over them and ends on an emerald point.
bars = ''.join(f'<rect class="br" x="{48 + i * 36}" y="{140 - h}" width="18" height="{h}" fill="{INK if i < 6 else SIG}" style="animation-delay:{i * 0.12:.2f}s"/>' for i, h in enumerate([34, 46, 40, 58, 66, 78, 94]))
svg('reporting-forecasts', '<path class="e" d="M40 140 H290"/>' + bars + '<path class="k ln" pathLength="1" d="M57 98 L93 86 L129 92 L165 74 L201 66 L237 54 L273 38"/><circle class="ns pt" cx="273" cy="38" r="4"/>',
    '.br{transform-box:fill-box;transform-origin:bottom;animation:br 3.6s cubic-bezier(.22,1,.36,1) infinite}@keyframes br{0%{transform:scaleY(0)}25%,90%{transform:scaleY(1)}100%{transform:scaleY(0)}}'
    '.ln{stroke-dasharray:1;stroke-dashoffset:1;animation:ln 3.6s ease-out infinite}@keyframes ln{0%,20%{stroke-dashoffset:1}50%,90%{stroke-dashoffset:0}100%{opacity:0}}'
    '.pt{animation:pt 3.6s infinite}@keyframes pt{0%,48%{opacity:0}52%,90%{opacity:1}100%{opacity:0}}')

# Close: deal room. A link sends a dot to a stack of pages; the top page lifts.
svg('deal-room', '<rect class="sq" x="36" y="80" width="80" height="20" rx="10"/><circle class="ns" cx="48" cy="90" r="4"/><path class="e" d="M58 90 H104"/>'
    '<path class="e" d="M116 90 H190"/><circle class="ns mv" cx="116" cy="90" r="3.5"/>'
    '<rect class="sq" x="206" y="58" width="76" height="80" rx="4" transform="translate(8 8)"/><rect class="sq" x="206" y="58" width="76" height="80" rx="4" transform="translate(4 4)"/>'
    '<g class="pg"><rect class="sq" x="206" y="58" width="76" height="80" rx="4"/><path class="k" d="M218 74 H262"/><path class="e" d="M218 88 H270 M218 100 H254"/><rect x="218" y="114" width="30" height="12" rx="6" fill="%s"/></g>' % INK,
    '.mv{animation:mv 2.4s ease-in infinite}@keyframes mv{0%{transform:translateX(0);opacity:1}60%{transform:translateX(74px);opacity:1}61%,100%{opacity:0}}'
    '.pg{animation:pg 2.4s ease-out infinite}@keyframes pg{0%,58%{transform:none}70%,90%{transform:translate(-4px,-6px)}100%{transform:none}}')

# Close: content experiences. A path of nodes through four pages, progress fills along it.
pts = [(52, 120), (124, 60), (196, 120), (268, 60)]
pp = ''.join(f'<rect class="sq" x="{x - 18}" y="{y - 22}" width="36" height="44" rx="4"/><path class="e" d="M{x - 10} {y - 8} H{x + 10} M{x - 10} {y + 2} H{x + 6}"/>' for x, y in pts)
d = 'M52 120 C88 120 88 60 124 60 C160 60 160 120 196 120 C232 120 232 60 268 60'
svg('content-experiences', f'<path class="e" d="{d}" stroke-dasharray="2 4"/><path class="s pr" pathLength="1" d="{d}"/>' + pp + '<text class="t" x="34" y="160">4 OF 4 FINISHED</text>',
    '.pr{stroke-dasharray:1;stroke-dashoffset:1;animation:pr 4s ease-in-out infinite}@keyframes pr{80%,95%{stroke-dashoffset:0}100%{stroke-dashoffset:0;opacity:0}}')

# Close: interactive proposals. Two tiers; a seat slider moves and the price follows.
svg('proposals', '<rect class="sq" x="40" y="40" width="110" height="64" rx="6"/><rect x="170" y="40" width="110" height="64" rx="6" fill="%s" stroke="%s"/>'
    '<path class="e" d="M52 58 H90"/><path class="e" d="M182 58 H220"/><rect class="pa" x="52" y="72" width="60" height="14" rx="3" fill="%s"/><rect class="pb" x="182" y="72" width="78" height="14" rx="3" fill="%s"/>'
    '<path class="e" d="M52 136 H268"/><path class="s fill" d="M52 136 H268"/><circle class="kn" cx="52" cy="136" r="7" fill="%s" stroke="%s"/><text class="t" x="52" y="160">SEATS</text>'
    % (SOFT, SIG, LINE, INK, PANEL, INK),
    '.kn{animation:kn 3.6s ease-in-out infinite}@keyframes kn{0%,10%{transform:translateX(0)}55%,80%{transform:translateX(150px)}100%{transform:translateX(0)}}'
    '.fill{stroke-dasharray:216;stroke-dashoffset:216;animation:fl 3.6s ease-in-out infinite}@keyframes fl{0%,10%{stroke-dashoffset:216}55%,80%{stroke-dashoffset:66}100%{stroke-dashoffset:216}}'
    '.pb{transform-box:fill-box;transform-origin:left;animation:pb 3.6s ease-in-out infinite}@keyframes pb{0%,10%{transform:scaleX(.5)}55%,80%{transform:scaleX(1)}100%{transform:scaleX(.5)}}')
print('ok', len(os.listdir(OUT)))
