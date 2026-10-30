# Writes the three product pages: product/linkedin-outbound, product/crm and product/deal-room.
# Each page: hero with the email field and the main product shot, feature rows with a shot each, what's included,
# questions, the other two products and a closing band. Shots reuse the home page's product-shot styles (home.css).
# Run: python3 tools/products/gen.py && node tools/layout.mjs
import html, json, os

ROOT = os.path.join(os.path.dirname(__file__), "..", "..")
P = "/assets/img/people/"
L = "/assets/logos/"


def face(n, s=28):
    return f'<img class="av" src="{P}{n}.jpg" alt="" width="{s}" height="{s}" style="width:{s}px;height:{s}px">'


def logo(n, s=16, alt=""):
    ext = "jpg" if n == "outlook" else "svg"
    return f'<img class="lg" src="{L}{n}.{ext}" alt="{alt}" width="{s}" height="{s}">'


OWL = '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="3" width="20" height="18" fill="#0a0a0a"/><circle cx="8.5" cy="11" r="3" fill="#fff"/><circle cx="15.5" cy="11" r="3" fill="#fff"/><circle cx="8.5" cy="11" r="1.3" fill="#0a0a0a"/><circle cx="15.5" cy="11" r="1.3" fill="#0a0a0a"/></svg>'
CK = '<svg width="11" height="11" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 5 5 9-10" fill="none" stroke="currentColor" stroke-width="2.6"/></svg>'


def shot(inner, band="b-blue", title=None):
    head = f'<div class="ph">{title}</div>' if title else ""
    return f'<div class="band {band} p-shot" data-anim><div class="app" style="grid-template-columns:minmax(0,1fr)"><div class="main">{head}{inner}</div></div></div>'


def row(c):  # one lead row for small tables
    n, f, fit, sig, co = c
    q = "".join("<i></i>" if i < (4 if fit == 8 else 3) else '<i class="off"></i>' for i in range(4))
    return f'<tr><td><span class="who">{face(f)}{n}</span></td><td><span class="fit"><span class="q">{q}</span>{fit}/8</span></td><td><span class="sig"><i></i>{sig}</span></td><td class="hide-s">{co}</td></tr>'


LEADS = [("Jordan Blake", "jordan", 8, "Commented on a CRM post", "Tallyfin"), ("Rina Sato", "rina", 8, "Hiring 3 sales reps", "Pallet Cloud"), ("Diego Marín", "diego", 7, "New in role", "Shiftwise"), ("Amara Kofi", "amara", 8, "Posted about pipeline", "Ledgerly")]

# ---- Outbound LinkedIn shots ----
LI_HERO = shot(
    '<div class="canvas"><div class="dots">'
    f'<div class="step"><span class="si">{logo("linkedin", 14)}</span><span><b>Send an invite</b><small>With a short, personal note</small></span></div><div class="wait">Wait 2 days</div>'
    '<div class="step" style="flex-direction:column;align-items:stretch"><span style="display:flex;gap:10px;align-items:center"><span class="si"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 5h14v10H9l-4 4z"/></svg></span><span><b>Message with lead magnet</b><small>After they accept</small></span></span><span class="magnet"><span class="pdf">PDF</span><span><b>Sales handoff benchmark</b><small>Made for Pallet Cloud</small></span></span></div><div class="wait">Wait 3 days</div>'
    '<div class="step"><span class="si"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 5h14v10H9l-4 4z"/></svg></span><span><b>Follow up</b><small>Stops when they reply</small></span></div></div>'
    '<div class="people"><div class="hd"><span>People <span class="sub mono">250</span></span><span class="ui-btn pri" style="height:26px">Approve 250</span></div>'
    + "".join(f'<div class="pr">{face(f)}<span class="nm"><b>{n}</b><span>{co}</span></span><span class="tag t-gray">Needs approval</span></div>' for n, f, _, _, co in LEADS)
    + "</div></div>",
    "b-lav",
    '<span class="sub mono crumb">Campaigns /</span><b>US SaaS founders</b><span class="tag t-gray" style="margin-left:6px">Draft</span><span class="grow"></span><span class="ui-btn pri">Go live</span>',
)
LI = [
    ("Find leads with buying intent", "Type who you want to reach. Scout searches people and companies and gives each lead a fit score against your rules.",
     shot('<div class="sentence" style="font-size:18px">Founders in <u>United States</u> at <u>software</u> companies with <u>11 to 200 people</u></div><div class="scroll-x"><table class="tb"><thead><tr><th>Name</th><th>Fit</th><th>Signal</th><th class="hide-s">Company</th></tr></thead><tbody class="rows">' + "".join(row(c) for c in LEADS) + "</tbody></table></div>", "b-sand")),
    ("See why each lead fits", "Each lead shows the rules it matches and the signals behind the score: posts, comments, new roles and hiring.",
     shot(f'<div class="rec"><div class="top2">{face("rina", 40)}<div><h4>Rina Sato</h4><span class="sub">Co-founder &amp; CEO, Pallet Cloud</span></div></div>'
          '<div class="tl"><div><span class="tag t-green">Match</span>Role: Founder or CEO<span class="when">Profile</span></div><div><span class="tag t-green">Match</span>Company size: 38 people<span class="when">Profile</span></div><div><span class="tag t-purple">Signal</span>Hiring 3 sales reps<span class="when">2d ago</span></div><div><span class="tag t-purple">Signal</span>Commented on a CRM post<span class="when">5d ago</span></div></div></div>', "b-blue")),
    ("Write a personal message for every lead", "Omniscient writes each message from the lead's profile and recent activity. Edit it or approve it as it is.",
     shot(f'<div class="msgs"><div class="bub me"><div class="m" style="display:flex;align-items:center;gap:6px">{OWL}Written by Omniscient</div>Rina, I saw Pallet Cloud is hiring three sales reps. I put together a short benchmark on how teams your size hand leads from marketing to sales. Want a copy?</div></div><div class="bulk"><span class="sub">Message 1 of 3</span><span class="grow"></span><span class="ui-btn">Edit</span><span class="ui-btn pri">Approve</span></div>', "b-pink")),
    ("Attach a lead magnet", "Open the conversation with something useful: a benchmark, a guide or a short audit made for the lead's company.",
     shot('<div style="padding:18px;display:grid;gap:10px"><span class="magnet" style="margin:0"><span class="pdf">PDF</span><span><b>Sales handoff benchmark</b><small>Made for Pallet Cloud, 6 pages</small></span></span><span class="magnet" style="margin:0"><span class="pdf">PDF</span><span><b>Pipeline review checklist</b><small>Made for Tallyfin, 2 pages</small></span></span><span class="magnet" style="margin:0"><span class="pdf">WEB</span><span><b>CRM audit</b><small>Made for Ledgerly, 5 questions</small></span></span></div>', "b-cream")),
    ("Run LinkedIn sequences safely", "Invites, messages and follow-ups go out within daily limits that protect your account. A sequence stops as soon as the lead replies.",
     shot('<div style="padding:16px;display:grid;gap:10px"><div class="facts"><div><small>Invites a day</small>20 of 25</div><div><small>Messages a day</small>40 of 50</div><div><small>Working hours</small>9:00 to 17:00</div></div><div class="tl"><div><span class="tag t-green">Sent</span>Invite to Jordan Blake<span class="when">9:12</span></div><div><span class="tag t-green">Sent</span>Message 1 to Rina Sato<span class="when">9:40</span></div><div><span class="tag t-gray">Stopped</span>Amara Kofi replied<span class="when">10:05</span></div></div></div>', "b-peach")),
    ("Answer every reply in one inbox", "Replies from all campaigns go to one inbox, sorted into Needs reply, Interested and Later, with an answer drafted for each.",
     shot(f'<div class="tabs3"><span class="on">All</span><span>Needs reply</span><span>Interested</span></div><div class="th on"><span class="un"></span><span><b>Rina Sato</b><span class="sub">Thanks for the benchmark. What would a trial look like?</span></span></div><div class="th"><span class="un"></span><span><b>Jordan Blake</b><span class="sub">Next Tuesday works for a call.</span></span></div><div class="th"><span style="width:6px"></span><span><b>Amara Kofi</b><span class="sub">Looping in our head of sales.</span></span></div>', "b-lav", '<b>Inbox <span>5 to answer</span></b>')),
    ("Track campaign results", "See invites accepted, replies and meetings booked for each campaign, week by week.",
     shot('<div class="facts" style="margin:14px"><div><small>Accepted</small>41%</div><div><small>Replied</small>21%</div><div><small>Meetings</small>12</div></div><div class="learn" style="border-top:1px solid var(--ink)"><span class="mono" style="color:var(--ink-2)">Reply rate, last 4 weeks</span><span class="bars"><i style="--h:40%"></i><i style="--h:52%"></i><i style="--h:66%"></i><i style="--h:84%"></i></span><span class="big">21%</span></div>', "b-blue")),
]

# ---- CRM shots ----
CRM_HERO = shot(
    '<div class="scroll-x"><table class="tb"><thead><tr><th>Company</th><th>Stage</th><th class="hide-s">Source</th><th>Last touch</th><th class="hide-s">Pipeline</th></tr></thead><tbody class="rows">'
    + "".join(f'<tr{" class=open" if o else ""}><td><span class="who"><span class="av" style="background:{bg}">{i}</span>{n}</span></td><td><span class="tag {t}">{st}</span></td><td class="hide-s sub">{src}</td><td class="sub">{lt}</td><td class="hide-s">{v}</td></tr>'
              for n, i, bg, t, st, src, lt, v, o in [
                  ("Northwind Health", "NW", "#efe3ff", "t-green", "Customer", "Inbound form", "Email, 2h ago", "$84,000", 0),
                  ("Harbor &amp; Pine", "HP", "#dbeafe", "t-yellow", "Proposal", "Event", "Call, yesterday", "$126,500", 1),
                  ("Pallet Cloud", "PC", "#fde68a", "t-blue", "Discovery", f'<span style="display:inline-flex;align-items:center;gap:6px">{logo("linkedin", 14)}LinkedIn campaign</span>', "LinkedIn, 3d ago", "$42,000", 0),
                  ("Verda Robotics", "VR", "#d1fae5", "t-purple", "Meeting set", "Scout", "Meeting, 4d ago", "$61,000", 0),
                  ("Atlas Cargo", "AC", "#fee2e2", "t-gray", "Lead", f'<span style="display:inline-flex;align-items:center;gap:6px">{logo("hubspot", 14)}HubSpot import</span>', "Email, 1w ago", "$18,000", 0)])
    + "</tbody></table></div>",
    "b-cream",
    '<b>Companies <span>1,284</span></b><span class="grow"></span><span class="ui-btn pri">+ New company</span>',
)
CRM = [
    ("Emails and meetings recorded for you", "Connect Gmail or Outlook and your calendar. Every email and meeting is added to the right person, company and deal.",
     shot(f'<div class="srcs" style="border:0;background:none;padding:18px">' + "".join(f'<div class="src">{k}<span><b>{t}</b><small>{d}</small></span></div>' for k, t, d in [(f'<span class="k">{logo("gmail", 14)}</span>', "Gmail", "1,240 emails added this month"), (f'<span class="k">{logo("outlook", 14)}</span>', "Outlook", "Connected for 2 teammates"), (f'<span class="k">{logo("meet", 14)}</span>', "Google Calendar", "86 meetings added this month")]) + "</div>", "b-blue")),
    ("One record for every lead", "Leads from website forms, LinkedIn campaigns, events and imports are matched by email, LinkedIn and company domain. Each person gets one record with their full history.",
     shot(f'<div class="rec"><div class="top2">{face("rina", 40)}<div><h4>Rina Sato</h4><span class="sub">Co-founder &amp; CEO, Pallet Cloud</span></div></div><div class="tl"><div><span class="tag t-gray">Event</span>Scanned at SaaS Connect<span class="when">Oct 14</span></div><div><span class="tag t-purple">LinkedIn</span>Replied to a campaign<span class="when">Oct 9</span></div><div><span class="tag t-blue">Email</span>Asked for pricing<span class="when">Oct 3</span></div><div><span class="tag t-green">Inbound</span>Filled the pricing form<span class="when">Oct 2</span></div></div></div>', "b-cream")),
    ("Call notes written for you", "Omniscient reads the transcripts from Google Meet, Zoom and Teams and writes notes, next steps and key facts with quotes.",
     shot('<div style="padding:14px;display:grid;gap:10px"><div class="card"><div class="ch">Notes<span class="mono">32 min</span></div><div class="cb">Rina wants one place for inbound and outbound leads before January. She will bring Marcus from finance to the next call.</div></div><div class="card"><div class="fact"><span class="tag t-green">Budget</span><span>About $30,000 a year<q>We set aside roughly thirty thousand.</q></span></div><div class="fact"><span class="tag t-yellow">Timeline</span><span>Live before January 15<q>It has to work before the new region opens.</q></span></div></div></div>', "b-peach", f'<span style="display:flex;align-items:center;gap:8px">{logo("meet", 16)}<b>Pallet Cloud discovery call</b></span>')),
    ("Deal updates you approve", "When a call or email changes a deal, Omniscient suggests the update with its source. Accept it or skip it. Values your team typed are never changed.",
     shot(f'<div class="upd"><span>Amount <s>$18,000</s> $30,000</span><span class="ok">{CK}</span><span class="no">×</span></div><div class="upd"><span>Close date: Jan 15</span><span class="ok">{CK}</span><span class="no">×</span></div><div class="upd"><span>Next step: call with Marcus</span><span class="ok">{CK}</span><span class="no">×</span></div><div class="upd" style="border-bottom:0"><span>Decision maker: Marcus Lee, CFO</span><span class="ok">{CK}</span><span class="no">×</span></div>', "b-pink", '<b>Deal updates to review <span>4</span></b>')),
    ("Ask Omniscient about any account", "Ask a question in plain English. The answer links to the emails, calls and notes it came from.",
     shot(f'<div class="thread2" style="padding:16px"><div class="ask">What is blocking the Pallet Cloud deal?</div><div class="ans">{OWL}<div class="body">The CFO has not been involved yet.<ul><li><span>Marcus Lee signs anything over $20,000.<span class="cite">Call, Oct 21</span></span></li><li><span>They need it live before January 15.<span class="cite">Call, Oct 21</span></span></li></ul></div></div></div>', "b-lav", f'<span style="display:flex;align-items:center;gap:8px">{OWL}<b>Ask Omniscient</b></span>')),
    ("Pipeline and forecast", "See every open deal by stage, with amounts, close dates and next steps. The forecast adds them up by month.",
     shot('<div class="facts" style="margin:14px;grid-template-columns:repeat(4,1fr)"><div><small>Discovery</small>$186,000</div><div><small>Proposal</small>$248,500</div><div><small>Negotiation</small>$94,000</div><div><small>Won this month</small>$61,000</div></div><div class="tl" style="margin:0 14px 14px"><div><span class="tag t-yellow">Proposal</span>Harbor &amp; Pine<span class="when">$126,500</span></div><div><span class="tag t-blue">Discovery</span>Pallet Cloud<span class="when">$30,000</span></div><div><span class="tag t-purple">Negotiation</span>Verda Robotics<span class="when">$61,000</span></div></div>', "b-sand", '<b>Pipeline <span>Q4</span></b>')),
    ("Switch from your CRM in one click", "Sign in to HubSpot, Salesforce, Attio or Pipedrive and bring your accounts, contacts, deals and notes over. You can run both side by side first.",
     shot('<div class="works" style="padding:16px"><div class="row" style="grid-template-columns:repeat(2,1fr)">' + "".join(f'<span class="wl">{logo(k, 20, n)}{n}</span>' for k, n in [("hubspot", "HubSpot"), ("salesforce", "Salesforce")]) + '</div></div><div class="bulk"><span class="sub">Accounts, contacts, deals and notes</span><span class="grow"></span><span class="ui-btn pri">Connect HubSpot</span></div>', "b-blue")),
]

# ---- Deal Room shots ----
def tiles(rows):
    return "".join(f'<div class="rowt">{t} <span>{s}</span></div><div class="tiles">' + "".join(f'<div class="tile t{i % 5 + 1}"><b>{n}</b><small>{k}</small></div>' for i, (n, k) in enumerate(items)) + "</div>" for t, s, items in rows)


PROP = (f'<div class="prop"><div class="pnav"><b>Lumen Labs × Pallet Cloud</b><span class="on">For you</span><span>Plan</span><span>Pricing</span><span>Security</span><span class="grow"></span><span class="mono" style="font-size:10.5px;display:flex;align-items:center;gap:8px">{face("rina", 22)}Prepared for Rina Sato</span></div>'
        '<div class="billboard"><small>YOUR PROPOSAL</small><h4>One lead pipeline before the new region opens</h4><p>Inbound, outbound and event leads in one place by January 15, for a team of 25.</p><span class="play">▶ Watch the 3-minute overview</span><span class="play2">See the plan</span></div>'
        + tiles([("For Rina", "Your goals", [("Inbound and outbound in one timeline", "VIDEO 3:40"), ("How Northwind unified 4 lead sources", "CASE STUDY"), ("Your rollout, week by week", "PLAN"), ("Event leads, captured at the booth", "VIDEO 1:30"), ("Orbit Mills: live in 3 weeks", "CASE STUDY")]),
                 ("For Marcus", "Finance", [("Pricing for 25 seats", "PRICING"), ("Cost of the tools it replaces", "CALCULATOR"), ("Payment terms", "PAGE"), ("Return in the first year", "BUSINESS CASE"), ("Contract, ready to sign", "APPROVAL")])])
        + '<div class="pad"></div></div>')
DR_HERO = f'<div class="band b-lav p-shot" data-anim>{PROP}</div>'
DR = [
    ("Keep your sales content in one library", "Import your website, case studies, decks and videos. Omniscient tags each item by industry, use case and objection.",
     shot('<div class="lib" style="grid-template-columns:repeat(3,1fr)">' + "".join(f'<div class="item{" match" if m else ""}"><div class="thumb" style="background:{bg}">{k}</div><div class="ib"><b>{n}</b><div class="tags">{"".join(f"<span>{t}</span>" for t in tg)}</div></div></div>' for k, n, tg, bg, m in [("CASE STUDY", "How Northwind unified 4 lead sources", ["Logistics", "Lead handoff"], "var(--band-blue)", 1), ("VIDEO 3:40", "Inbound and outbound in one timeline", ["Demo"], "var(--band-lav)", 1), ("GUIDE", "Security and data handling", ["IT review"], "var(--band-pink)", 0)]) + "</div>", "b-sand", '<b>Library <span>148</span></b><span class="grow"></span><span class="ui-btn">Import</span>')),
    ("Build a proposal for each deal", "Pick a deal. Omniscient builds the proposal from the deal, your calls and your Library, in your brand, one tab at a time.",
     shot(f'<div class="msgs"><div class="bub me" style="align-self:flex-end">A proposal for Pallet Cloud, 25 seats</div><div class="bub"><div class="m" style="display:flex;align-items:center;gap:6px">{OWL}Omniscient</div>Building 5 tabs: Overview, Your goals, Plan, Pricing, Next steps.</div></div><div class="tl" style="margin:0 14px 14px"><div><span class="tag t-green">Done</span>Overview<span class="when">6 facts used</span></div><div><span class="tag t-green">Done</span>Your goals<span class="when">4 facts used</span></div><div><span class="tag t-yellow">Building</span>Plan<span class="when"></span></div></div>', "b-blue", f'<span style="display:flex;align-items:center;gap:8px">{OWL}<b>Ask Omniscient</b></span>')),
    ("Netflix-style rows for each stakeholder", "The top of the proposal shows the buyer's goals and your plan. Below are rows of videos, case studies and documents for each person on the buying team.",
     f'<div class="band b-pink p-shot" data-anim><div class="prop" style="min-height:0">' + tiles([("For Marcus", "Finance", [("Pricing for 25 seats", "PRICING"), ("Return in the first year", "BUSINESS CASE"), ("Payment terms", "PAGE")]), ("For Dana", "IT", [("Security and data handling", "GUIDE"), ("Single sign-on setup", "VIDEO 2:10"), ("Data processing terms", "PAGE")])]).replace('class="tiles"', 'class="tiles" style="grid-template-columns:repeat(3,1fr)"') + '<div class="pad"></div></div></div>'),
    ("Your prices, or a quote after a call", "Omniscient uses your saved price list. If it has no prices, it asks you once how you price and saves the answer. You can also choose to quote after a call.",
     shot('<div style="padding:16px;display:grid;gap:10px"><div class="card"><div class="ch">How do you price this?</div><div class="cb" style="display:flex;flex-wrap:wrap;gap:6px"><span class="ui-btn pri">Per seat</span><span class="ui-btn">Fixed fee</span><span class="ui-btn">Quote after a call</span></div></div><div class="facts"><div><small>Method</small>Per seat</div><div><small>Price</small>$49 a month</div><div><small>Saved for</small>Every proposal</div></div></div>', "b-cream", '<b>Your prices</b>')),
    ("Send it from your own inbox", "Send the proposal link from Gmail or Outlook. Each person gets their own link, so you know who opened it.",
     shot(f'<div class="mail"><div class="f"><span>To</span><span>Rina Sato, Marcus Lee</span></div><div class="f"><span>Subject</span><span>Your proposal for the January rollout</span></div><div class="bodytx">Here is the proposal we discussed. Marcus, pricing and payment terms are in the row made for you.</div><div class="linkcard"><span class="lt">L × P</span><span class="lb"><b>Lumen Labs × Pallet Cloud</b><small>Prepared for Rina and Marcus</small></span></div><div class="sendrow">{logo("gmail", 16, "Gmail")}<span class="sub">Sending from sam@lumenlabs.com</span><span class="grow"></span><span class="ui-btn pri">Send</span></div></div>', "b-peach")),
    ("See who watched what", "See which person opened the proposal, which videos they watched and which pages they read. Get an alert by email or Slack when the buying team is active.",
     shot('<div class="feed" style="border:0">' + "".join(f'<div class="ev">{face(f, 22)}<span>{t}<small>{w}</small></span></div>' for f, t, w in [("rina", "Rina watched the overview", "Mon, 9:31"), ("marcus", "Marcus opened Pricing, 3 times", "Mon, 14:10"), ("marcus", "Marcus shared it with Dana, IT", "Tue, 10:05")]) + "</div>", "b-lav", '<b>Activity</b><span class="grow"></span><span class="sub mono">Live</span>')),
    ("Approve on the page", "Buyers approve the proposal on the page. The deal moves to Won and the team gets an alert.",
     shot(f'<div class="feed" style="border:0"><div class="ev">{face("marcus", 22)}<span>Marcus approved the contract<small>Thu, 16:48</small></span></div><div class="won" style="margin-top:0"><span class="sub">Stage</span><span class="tag t-green">Won</span><span class="grow"></span><span class="sub mono">$30,000</span></div></div>', "b-blue", '<b>Pallet Cloud, 25 seats</b>')),
]

PAGES = [
    {
        "slug": "linkedin-outbound", "name": "Outbound LinkedIn", "band": "b-blue",
        "title": "Outbound LinkedIn: find leads and message them on LinkedIn | Omniscient",
        "desc": "Find leads with buying intent, write a personal message for each one, attach a lead magnet and run LinkedIn sequences you approve.",
        "h1": 'Find leads and message them on LinkedIn.', "h1b": "You approve every message.",
        "lede": "Search for leads, get a personal message written for each one, and run LinkedIn sequences with safe daily limits.",
        "hero": LI_HERO, "feats": LI,
        "list": ["Lead search in plain English", "Fit score with reasons", "Intent signals", "Personal messages for each lead", "Lead magnets per company", "Invites, messages and follow-ups", "Approval before sending", "Safe daily limits", "One inbox for all replies", "Campaign results by week"],
        "faq": [
            ("Does Omniscient send LinkedIn messages on its own?", "No. Omniscient writes each message, and nothing is sent until someone on your team approves it."),
            ("Is it safe for my LinkedIn account?", "Sending stays within daily limits for invites and messages, only during your working hours. You can lower the limits in the campaign's settings."),
            ("Where do the leads come from?", "Scout searches people and companies by role, company, size and location, and finds people who engaged with posts on your topic."),
            ("What happens when a lead replies?", "The sequence stops for that lead, and the reply goes to your inbox with a drafted answer."),
            ("Can I use my own lists?", "Yes. Add people from your CRM or from a saved Scout list to any campaign."),
        ],
    },
    {
        "slug": "crm", "name": "Omniscient CRM", "band": "b-cream",
        "title": "Omniscient CRM: emails, calls and leads in one place | Omniscient",
        "desc": "A CRM that records your emails, meetings and calls, keeps one record per lead, writes your call notes and answers questions about any account.",
        "h1": "A CRM that fills itself in.", "h1b": "Emails, calls and leads in one place.",
        "lede": "Omniscient records your emails, meetings and calls, keeps one record for every lead, and answers questions about any account.",
        "hero": CRM_HERO, "feats": CRM,
        "list": ["Email and calendar capture", "One record per lead", "Inbound, outbound and event leads", "Call notes from transcripts", "Facts with quotes", "Deal updates you approve", "Ask Omniscient", "Pipeline and forecast", "Custom fields and views", "One-click import"],
        "faq": [
            ("Do I have to leave my current CRM?", "No. Connect your email and calendar and run both side by side. When you are ready, import from HubSpot, Salesforce, Attio or Pipedrive in one click."),
            ("Does a bot join my calls?", "Only if you want one. Omniscient reads the transcripts Google Meet, Zoom and Teams already create. The call recording add-on sends a bot when you would rather Omniscient record the call."),
            ("Who can see my emails?", "You choose per inbox: share everything, share only that a conversation happened, or keep it private."),
            ("What if Omniscient gets a fact wrong?", "Every fact shows the quote it came from. Deal updates wait for you to accept or skip them, and values your team typed are never changed."),
            ("Do you train AI models on my data?", "No. Your emails and calls are never used to train models."),
        ],
    },
    {
        "slug": "deal-room", "name": "Deal Room", "band": "b-lav",
        "title": "Deal Room: Netflix-style proposals for every deal | Omniscient",
        "desc": "Build a proposal for each deal from your content, in your brand, with rows for each stakeholder. Send it from your inbox and see who watched what.",
        "h1": "Netflix-style proposals for every deal.", "h1b": "Built from your content.",
        "lede": "Keep your sales content in one library, build a proposal for each deal in your brand, send it from your inbox and see who watched what.",
        "hero": DR_HERO, "feats": DR,
        "list": ["Content library", "Tags by industry and objection", "Proposals built from the deal", "Your brand and colors", "Rows for each stakeholder", "Your prices or a quote after a call", "Send from Gmail or Outlook", "Views per person and page", "Email and Slack alerts", "Approval on the page"],
        "faq": [
            ("What is a Deal Room proposal?", "A web page for one deal, in your brand. The top shows the buyer's goals, your plan and the price. Below are rows of videos, case studies and documents for each person on the buying team."),
            ("Where does the content come from?", "From your Library: your website, case studies, decks and videos. Omniscient only uses facts from the deal, your calls and your Library."),
            ("What does a proposal cost?", "A proposal uses 40 proposal credits and an edit uses 2. Every paid seat adds credits each month. A proposal that fails to build is refunded."),
            ("Can I edit the proposal?", "Yes. Change any text, section or style in the builder before you send it."),
            ("How do buyers approve?", "On the proposal page. The deal moves to Won and your team gets an alert."),
        ],
    },
]


ICON = {"linkedin-outbound": '<path d="M4 12 20 4l-6 16-3-7z"/>', "crm": '<rect x="4" y="4" width="16" height="16"/><path d="M4 10h16M10 10v10"/>', "deal-room": '<rect x="3" y="5" width="18" height="12"/><path d="M10 9l4 2-4 2z"/>'}


def page(p):
    others = [o for o in PAGES if o is not p]
    feats = "".join(
        f'''
    <section class="p-feat{" p-feat--flip" if i % 2 else ""}">
      <div class="p-feat__shot">{s}</div>
      <div class="p-feat__text"><span class="mono br p-num">{i + 1:02d}</span><h2>{html.escape(t)}</h2><p>{html.escape(d)}</p></div>
    </section>'''
        for i, (t, d, s) in enumerate(p["feats"]))
    included = "".join(f"<li>{html.escape(x)}</li>" for x in p["list"])
    faq = "".join(f"<details><summary>{html.escape(q)}</summary><p>{html.escape(a)}</p></details>" for q, a in p["faq"])
    cards = "".join(f'<a class="p-other" href="/product/{o["slug"]}/"><span class="p-other__tile {o["band"]}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">{ICON[o["slug"]]}</svg></span><b>{o["name"]}</b><small>{html.escape(o["h1"])}</small><span class="mono">Learn more →</span></a>' for o in others)
    ld = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in p["faq"]]}
    form = '<form class="signup" action="https://app.tryomniscient.com/" method="get"><input type="email" name="email" placeholder="Work email" aria-label="Work email" autocomplete="email"><button class="btn btn--primary" type="submit">Start free trial</button></form>'
    url = f'https://tryomniscient.com/product/{p["slug"]}/'
    return f'''<!doctype html>
<html lang="en-US">
<head>
<!-- head:start -->
<!-- head:end -->
<title>{html.escape(p["title"])}</title>
<meta name="description" content="{html.escape(p["desc"])}">
<link rel="canonical" href="{url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Omniscient">
<meta property="og:title" content="{html.escape(p["title"])}">
<meta property="og:description" content="{html.escape(p["desc"])}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="https://tryomniscient.com/assets/brand/omniscient-app-icon-512.png">
<meta name="twitter:card" content="summary">
<link rel="stylesheet" href="/assets/home.css">
<link rel="stylesheet" href="/assets/product.css">
<script type="application/ld+json">{json.dumps(ld)}</script>
<script src="/assets/product.js" defer></script>
</head>
<body class="om om-home om-product">
<!-- header:start -->
<!-- header:end -->
<main id="main" class="site-main">
  <section class="p-hero wrap">
    <div class="kicker mono"><i></i><span class="br">{p["name"]}</span></div>
    <h1>{html.escape(p["h1"])} <span>{html.escape(p["h1b"])}</span></h1>
    <p class="lede">{html.escape(p["lede"])}</p>
    {form}
    <p class="note mono">14 days free. No credit card required.</p>
  </section>
  <section class="wrap p-heroshot">{p["hero"]}</section>
  <div class="wrap p-feats">{feats}
  </div>
  <section class="wrap p-included">
    <div class="p-sechead"><span class="mono br">Included</span><h2>Everything in {p["name"]}</h2></div>
    <ul>{included}</ul>
  </section>
  <section class="wrap faq" id="faq">
    <div><div class="mono br chev-cap">Questions</div><h2>Questions</h2><p style="color:var(--ink-2)">Something else? <a href="mailto:hello@tryomniscient.com" style="text-decoration:underline">hello@tryomniscient.com</a></p></div>
    <div>{faq}</div>
  </section>
  <section class="wrap p-others">
    <div class="p-sechead"><span class="mono br">Also in Omniscient</span><h2>The rest of the platform</h2></div>
    <div class="p-others__grid">{cards}</div>
  </section>
  <section class="closing wrap">
    <div class="band {p["band"]}">
      <h2>Try {p["name"]} free for 14 days.</h2>
      {form}
      <p class="note mono">No credit card required.</p>
    </div>
  </section>
</main>
<!-- footer:start -->
<!-- footer:end -->
</body>
</html>
'''


for p in PAGES:
    d = os.path.join(ROOT, "product", p["slug"])
    os.makedirs(d, exist_ok=True)
    open(os.path.join(d, "index.html"), "w").write(page(p))
print("wrote", len(PAGES), "pages")
