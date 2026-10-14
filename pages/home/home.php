<?php
/**
 * Home page. Same sections and words as src/app/page.tsx in the app.
 */

require_once __DIR__ . '/mocks.php';

$start = om_app('/today');

$integrations = ['Gmail', 'Google Calendar', 'Google Meet', 'Zoom', 'Slack', 'CSV import', 'API and MCP'];

$before = ['Inbox', 'Calendar', 'Call recorder', 'Spreadsheet', 'Notes doc'];
$after = ['Up next', 'Accounts', 'Opportunities', 'Contacts', 'Meetings', 'Ask', 'Agents', 'Fields'];

$beliefs = [
	['Capture first. Structure later.', 'A CRM that asks you to fill in forms will always be empty. Omniscient reads what already happened, then fits it into your fields.'],
	['Every fact shows its receipt.', 'Each value the AI writes carries the exact quote, the call or email it came from, and how sure it was. Hover to see it.'],
	['People decide. Agents type.', 'Nothing leaves the building without your yes. Fields fill on their own only when the rule says so and the AI is sure.'],
	['Private stays private.', 'Your inbox is yours. Share everything, share only that a conversation happened, or share nothing. The database enforces it.'],
];

$features = [
	[
		'id' => 'up-next',
		'eyebrow' => 'Up next',
		'title' => 'Start the day with what needs you',
		'body' => 'Replies you owe, meetings to prep, drafts waiting for a yes, and deals going quiet. Ranked, every morning, with the reason next to each one.',
		'points' => ['Replies you owe, with how long they have waited', 'A prep brief 30 minutes before every customer meeting', 'Follow-ups drafted the moment a meeting ends', 'Deals and champions that have gone quiet'],
		'sample' => 'om_upnext_mock',
	],
	[
		'id' => 'meetings',
		'eyebrow' => 'Meetings',
		'title' => 'Every call updates the record',
		'body' => 'The transcript from Google Meet or Zoom becomes notes, tasks and record updates. Budget, buying role, close date and your own fields fill in, each with the quote behind it.',
		'points' => ['Notes a busy rep can skim in 20 seconds', 'Promises your side made become tasks', 'Record updates to review, or filled on their own when the rule says so', 'No bot joins the call. Paste a transcript for calls that had none.'],
		'sample' => 'om_meeting_mock',
		'flip' => true,
	],
	[
		'id' => 'ask',
		'eyebrow' => 'Ask Omniscient',
		'title' => 'Ask the whole pipeline a question',
		'body' => 'Plain questions on any page, about the record or the list in front of you. Answers cite the email, the call and the record they came from, and can do things with one click.',
		'points' => ['Works on every page, with that page attached', 'Every answer links to its sources', 'Creates tasks, updates fields and drafts emails, after your yes', 'Each question becomes a chat you can come back to'],
		'sample' => 'om_ask_mock',
	],
	[
		'id' => 'records',
		'eyebrow' => 'Accounts, opportunities, contacts',
		'title' => 'Lists that work like a sheet',
		'body' => 'Click a column to sort. Tick values to filter. Group by stage, relationship or buying role with totals on each group. Ready-made tabs like Late, Quiet 30+ days and Renewing in 90 days.',
		'points' => ['One-click sort and filter from every header', 'Grouped tables with totals', 'Saved views for your Monday forecast call', 'A pipeline board and a table of the same deals'],
		'sample' => 'om_list_mock',
		'flip' => true,
	],
	[
		'id' => 'fields',
		'eyebrow' => 'Fields',
		'title' => 'Your fields. Your rules.',
		'body' => 'Add the fields your business runs on, then tell the AI in plain words what to look for. From then on every meeting and email fills them. Start from a pack: MEDDIC, agency and services, renewals, buying group.',
		'points' => ['Any field: text, number, money, date, choice, link, checkbox', 'A rule per field: off, suggest, or fill when empty', 'A hint in plain words, like “the amount they can spend this year”', 'Packs that set up a whole method in one click'],
		'sample' => 'om_fields_mock',
	],
	[
		'id' => 'agents',
		'eyebrow' => 'Agents',
		'title' => 'Work that happens while you sleep',
		'body' => 'Agents run on every meeting, email and schedule. They prep, draft and keep deals current, then wait for your yes on anything that leaves the building.',
		'points' => ['Meeting prep brief before every call', 'Follow-up drafted after the meeting ends', 'Deal keeper moves stages and chases quiet deals', 'A Monday pipeline digest in Slack or email'],
		'sample' => 'om_agents_mock',
		'flip' => true,
	],
];

$proof = ['The quote, word for word', 'The source: which email, which call, which minute', 'A confidence score, so you know what to double-check', 'A warning when a quote does not back up its fact'];

$engineering = [
	['Provenance', 'Who or what set every field, and why'],
	['Row-level security', 'Private stays private, down to the database'],
	['Event log', 'Every change recorded and undoable'],
	['API and MCP', 'Use your data from Claude or your own code'],
];

$compare_head = ['Omniscient', 'Classic CRM (HubSpot, Salesforce)', 'Modern CRM (Attio, folk)', 'AI-native CRM (Lightfield, Day AI)'];
$compare = [
	['How records get filled', ['From every email, meeting and call', 'You type them in', 'You type them in, AI helps', 'From calls and email']],
	['Quote behind every AI value', ['Always, with the source and a score', 'No', 'Sometimes', 'Yes']],
	['Your own fields, filled by your own rules', ['Yes, with a plain-words hint per field', 'No', 'No', 'Varies']],
	['Meeting notes without a bot on the call', ['Yes, from Meet and Zoom transcripts', 'Add-on', 'Add-on', 'Varies']],
	['Lists that sort and filter from the header', ['Yes, like a sheet', 'Partly', 'Yes', 'Partly']],
	['Teammates who only add data', ['Free', 'Paid seat', 'Paid seat', 'Paid seat']],
	['AI included in the price', ['Yes', 'Credits', 'Credits', 'Yes']],
	['Starting price per seat', ['$19 a month', 'From about $20, AI extra', 'From about $30', 'Varies']],
];

$security = [
	['Read-only', 'Omniscient never sends, deletes or changes anything in your Google account.'],
	['Encrypted twice', 'Data is encrypted at rest, and Google tokens get a second layer of AES-256 encryption.'],
	['Never used for training', "Your emails and calls are never used to train AI models. Google's Limited Use rules apply."],
	['Gone when you leave', 'Disconnect any time and the emails and meetings we stored get deleted.'],
];

// Prices match src/lib/plans.ts (yearly billing). Change both together.
$plans = [
	['name' => 'Free', 'price' => '$0', 'note' => 'for teammates', 'items' => ['Gmail and Calendar capture', 'Search, view and share', 'Activity timeline'], 'cta' => 'Add your team'],
	['name' => 'Starter', 'price' => '$19', 'note' => 'per seat / month', 'items' => ['Record pages, notes and tasks', 'Meeting notes from transcripts', 'Follow-up drafts', 'Ask Omniscient'], 'cta' => 'Start free'],
	['name' => 'Pro', 'price' => '$49', 'note' => 'per seat / month', 'items' => ['Pipeline board and forecast', 'Your own fields, filled by rules', 'Meeting prep briefs', 'Saved views and field packs', '5 agents'], 'cta' => 'Start a free trial', 'featured' => true],
	['name' => 'Business', 'price' => '$99', 'note' => 'per seat / month', 'items' => ['Manager mode and coaching', 'MEDDIC from every call', 'Dashboards from a sentence', 'Admin controls and SSO'], 'cta' => 'Talk to us'],
];

$faq = [
	['Do I have to leave my current CRM?', 'No. Connect Google and run both for a week. Omniscient fills itself in while your old CRM stays as it is. Import a CSV when you are ready to switch.'],
	['Does a bot join my calls?', 'No. Omniscient reads the transcripts Google Meet and Zoom already make, or a transcript you paste or upload. Nobody sees a stranger on the call.'],
	['What happens when the AI gets something wrong?', "Every value the AI writes shows its quote and its source. Fields fill on their own only when the field's rule allows it, the field was empty, and the AI was sure. Everything else waits for you to accept or skip. Values a person typed are never changed."],
	['Who can see my emails?', 'You choose per inbox: share everything, share only that a conversation happened, or keep it private. The rule is enforced in the database, so a teammate cannot work around it from the app.'],
	['Do you train AI models on my data?', "No. Your emails and calls are never used to train models. Google's Limited Use rules apply to everything Omniscient reads."],
	['How much AI do I get?', 'It is included in the seat price. There are no credits to buy. Heavy use of the deepest model is capped per day so no one gets a surprise bill.'],
];

$steps = [
	['01', 'Connect', 'Sign in with Google. Omniscient gets read-only access to Gmail and Calendar. About a minute.'],
	['02', 'Capture', '90 days of email and meetings come in. People and companies get matched by domain. Newsletters and robots get skipped.'],
	['03', 'Understand', 'AI reads each thread and call, then pulls out budgets, next steps, objections and promises, each with a quote as proof.'],
	['04', 'Act', 'Up next fills with replies you owe, meetings to prep and follow-ups already drafted. You just decide.'],
];

/** A "// label" above a heading. */
$eyebrow = fn(string $t, bool $dark = false) => '<p class="fig' . ($dark ? ' fig--dark' : '') . '">// ' . esc_html($t) . '</p>';

/** The check mark in lists. */
$check = fn(bool $light = false) => '<svg class="check' . ($light ? ' check--light' : '') . '" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

/** The sample under each "How it works" step. */
$step_sample = function (string $n): void {
	if ($n === '01') : ?>
		<div class="s-connect">
			<span class="logo-box logo-box--lg">G</span>
			<span class="grow">
				<span class="s-connect__who">vincent@perceptric.com</span>
				<span class="s-connect__note">Read only · never sends or deletes</span>
			</span>
			<span class="tag tag--ok">Synced</span>
		</div>
	<?php elseif ($n === '02') : ?>
		<div class="s-stats">
			<?php foreach ([['258', 'accounts'], ['1,204', 'contacts'], ['41', 'deals']] as [$v, $l]) : ?>
				<div><p class="s-stats__n"><?php echo esc_html($v); ?></p><p class="s-stats__l"><?php echo esc_html($l); ?></p></div>
			<?php endforeach; ?>
		</div>
	<?php elseif ($n === '03') : ?>
		<div class="s-fact">
			<span class="tag tag--danger">Objection</span>
			<p class="s-fact__t">Worried results take more than 90 days</p>
			<p class="s-fact__q">“We tried an agency last year and saw nothing for six months.”</p>
		</div>
	<?php else : ?>
		<div class="s-todo">
			<?php foreach ([['Reply owed', 'Ruth · Box of Rain'], ['Draft ready', 'Cumberland Adventure']] as [$t, $w]) : ?>
				<div><span class="s-todo__t"><?php echo esc_html($t); ?></span><span class="s-todo__w"><?php echo esc_html($w); ?></span></div>
			<?php endforeach; ?>
		</div>
	<?php endif;
};

get_header();
?>

<!-- Hero -->
<section class="hero">
	<div class="dot-grid"></div>
	<div class="wrap hero__in">
		<div class="hero__copy mk-fade">
			<a class="hero__new" href="#fields"><span class="tag tag--brand tag--lg">New</span>Your own fields, filled from every meeting<span class="faint" aria-hidden="true">→</span></a>
			<h1 class="hero__title">The CRM that<br><span class="brand">fills itself in.</span></h1>
			<p class="hero__lead">Omniscient reads your email, calendar and calls, then keeps every account, opportunity and contact current. Each change comes with the quote that proves it.</p>
			<div class="hero__ctas">
				<a class="btn btn--ink btn--lg" href="<?php echo esc_url($start); ?>">Start free with Google</a>
				<a class="btn btn--outline btn--lg" href="<?php echo esc_url(om_demo()); ?>">Book a demo</a>
			</div>
			<p class="hero__note">Free for teammates · No card needed · Read-only Google access · No bot on your calls</p>
		</div>
		<div class="hero__shot mk-fade" style="animation-delay:120ms">
			<?php om_hero_mock(); ?>
		</div>
	</div>
</section>

<!-- Works with -->
<section class="band">
	<div class="wrap works">
		<p class="label-mono">Works with</p>
		<ul class="works__list">
			<?php foreach ($integrations as $i) : ?><li><?php echo esc_html($i); ?></li><?php endforeach; ?>
		</ul>
	</div>
</section>

<!-- Before and after -->
<section id="product" class="anchor">
	<div class="wrap sec">
		<div class="ba">
			<div>
				<?php echo $eyebrow('Today'); ?>
				<h2 class="h-mid">Five places that never talk to each other…</h2>
				<ul class="ba__before">
					<?php foreach ($before as $b) : ?><li><span class="dot dot--gray"></span><?php echo esc_html($b); ?></li><?php endforeach; ?>
				</ul>
			</div>
			<div class="ba__arrow">→</div>
			<div>
				<?php echo $eyebrow('With Omniscient'); ?>
				<h2 class="h-mid">…become one place that knows.</h2>
				<ul class="ba__after frame">
					<?php foreach ($after as $a) : ?><li><span class="dot"></span><?php echo esc_html($a); ?></li><?php endforeach; ?>
				</ul>
				<p class="ba__note">One context graph of every conversation your team has ever had, built on its own. Records, lists, meetings, answers and agents all read from it.</p>
			</div>
		</div>
	</div>
</section>

<!-- Beliefs -->
<section class="band">
	<div class="wrap sec">
		<div class="intro">
			<?php echo $eyebrow('What we believe'); ?>
			<h2 class="h-big">A CRM should know. Not ask.</h2>
			<p class="lead">Every CRM so far has run on a person typing in what already happened. Software can watch it happen now. That changes what a CRM owes you.</p>
		</div>
		<div class="cells cells--2 beliefs">
			<?php foreach ($beliefs as [$t, $d]) : ?>
				<div>
					<h3><?php echo esc_html($t); ?></h3>
					<p><?php echo esc_html($d); ?></p>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<!-- Features -->
<section class="wrap sec">
	<div class="intro">
		<?php echo $eyebrow('The product'); ?>
		<h2 class="h-big">Everything a deal needs, filled in.</h2>
		<p class="lead">The speed and polish of a modern CRM. An AI that does the typing. Proof behind every value.</p>
	</div>
	<div class="features">
		<?php foreach ($features as $f) : ?>
			<div id="<?php echo esc_attr($f['id']); ?>" class="feature<?php echo empty($f['flip']) ? '' : ' feature--flip'; ?>">
				<div>
					<?php echo $eyebrow($f['eyebrow']); ?>
					<h3 class="feature__title"><?php echo esc_html($f['title']); ?></h3>
					<p class="feature__body"><?php echo esc_html($f['body']); ?></p>
					<ul class="checks">
						<?php foreach ($f['points'] as $p) : ?><li><?php echo $check(); ?><?php echo esc_html($p); ?></li><?php endforeach; ?>
					</ul>
				</div>
				<div class="feature__sample"><?php $f['sample'](); ?></div>
			</div>
		<?php endforeach; ?>
	</div>
</section>

<!-- Proof -->
<section class="band">
	<div class="wrap sec proof-sec">
		<div>
			<?php echo $eyebrow('Proof'); ?>
			<h2 class="h-big">Every fact shows its receipt.</h2>
			<p class="lead">An AI CRM is only useful if you can trust it. So every value Omniscient writes carries the quote, the call or email it came from, and how sure the AI was. Click through to the moment it was said.</p>
			<ul class="checks checks--loose">
				<?php foreach ($proof as $p) : ?><li><?php echo $check(); ?><?php echo esc_html($p); ?></li><?php endforeach; ?>
			</ul>
		</div>
		<?php om_proof_mock(); ?>
	</div>
</section>

<!-- How it works -->
<section id="how" class="anchor">
	<div class="wrap sec">
		<div class="intro">
			<?php echo $eyebrow('How it works'); ?>
			<h2 class="h-big">From inbox to forecast in four steps.</h2>
			<p class="lead">No import project. No setup week. Connect Google and the CRM builds itself while you finish your coffee.</p>
		</div>
		<ol class="cells cells--4 steps frame">
			<?php foreach ($steps as [$n, $title, $body]) : ?>
				<li>
					<p class="fig">// step <?php echo esc_html($n); ?> of 04</p>
					<h3><?php echo esc_html($title); ?></h3>
					<p class="steps__body"><?php echo esc_html($body); ?></p>
					<div class="steps__sample"><?php $step_sample($n); ?></div>
				</li>
			<?php endforeach; ?>
		</ol>
	</div>
</section>

<!-- Context graph, dark -->
<section id="engineering" class="anchor dark">
	<div class="mk-dots"></div>
	<div class="wrap sec dark__in">
		<div class="eng">
			<div>
				<?php echo $eyebrow('Under the hood', true); ?>
				<h2 class="h-big">One context graph. Every answer traced.</h2>
				<p class="lead">Every email, meeting, transcript and note is kept as it came in. Links say who is connected to what and since when. Facts carry their quotes. Search covers all of it. Records, lists, Ask and agents are views on top.</p>
				<dl class="eng__list">
					<?php foreach ($engineering as [$t, $d]) : ?>
						<div><dt><?php echo esc_html($t); ?></dt><dd><?php echo esc_html($d); ?></dd></div>
					<?php endforeach; ?>
				</dl>
			</div>
			<div class="eng__side">
				<?php om_graph_mock(); ?>
				<div class="code">
					<pre><code><span class="c-dim">{</span> <span class="c-key">"kind"</span>: <span class="c-str">"budget"</span>, <span class="c-key">"value"</span>: <span class="c-num">60000</span>,
  <span class="c-key">"quote"</span>: <span class="c-str">"We set aside about $60,000 for the first year."</span>,
  <span class="c-key">"source"</span>: <span class="c-str">"call:discovery-loom"</span>, <span class="c-key">"confidence"</span>: <span class="c-num">0.96</span> <span class="c-dim">}</span></code></pre>
					<div class="code__cmd"><span class="c-key">$</span> omniscient ask <span class="c-str">"deals with budget approved"</span></div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Comparison -->
<section id="compare" class="anchor">
	<div class="wrap sec">
		<div class="intro">
			<?php echo $eyebrow('Compared'); ?>
			<h2 class="h-big">More CRM. Less typing.</h2>
		</div>
		<div class="compare">
			<table>
				<thead>
					<tr>
						<th class="compare__corner"></th>
						<?php foreach ($compare_head as $i => $h) : ?>
							<th class="<?php echo $i === 0 ? 'is-us' : ''; ?>"><?php if ($i === 0) : ?><span class="compare__us"><span class="dot"></span><?php echo esc_html($h); ?></span><?php else : echo esc_html($h); endif; ?></th>
						<?php endforeach; ?>
					</tr>
				</thead>
				<tbody>
					<?php foreach ($compare as [$row, $cells]) : ?>
						<tr>
							<td class="compare__row"><?php echo esc_html($row); ?></td>
							<?php foreach ($cells as $i => $c) : ?><td class="<?php echo $i === 0 ? 'is-us' : ''; ?>"><?php echo esc_html($c); ?></td><?php endforeach; ?>
						</tr>
					<?php endforeach; ?>
				</tbody>
			</table>
		</div>
		<p class="small-note">From public pages in October 2026. Features and prices change; check each vendor.</p>
	</div>
</section>

<!-- Security -->
<section id="security" class="anchor band">
	<div class="wrap sec">
		<div class="intro intro--center">
			<?php echo $eyebrow('Security'); ?>
			<h2 class="h-big">Your inbox is sacred. We treat it that way.</h2>
		</div>
		<div class="cells cells--4 security">
			<?php foreach ($security as [$t, $d]) : ?>
				<div>
					<span class="security__icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"/><path d="M9 12l2 2 4-4"/></svg></span>
					<h3><?php echo esc_html($t); ?></h3>
					<p><?php echo esc_html($d); ?></p>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<!-- Pricing -->
<section id="pricing" class="anchor">
	<div class="wrap sec">
		<div class="intro intro--center">
			<?php echo $eyebrow('Pricing'); ?>
			<h2 class="h-big">AI included. No credit math.</h2>
			<p class="lead">Teammates who only add data are free. Pay for the people who sell. Prices shown billed yearly.</p>
		</div>
		<div class="plans">
			<?php foreach ($plans as $p) : $hot = !empty($p['featured']); ?>
				<div class="plan<?php echo $hot ? ' plan--hot frame' : ''; ?>">
					<div class="plan__head">
						<p><?php echo esc_html($p['name']); ?></p>
						<?php if ($hot) : ?><span class="tag tag--brand tag--lg">Most popular</span><?php endif; ?>
					</div>
					<p class="plan__price"><?php echo esc_html($p['price']); ?></p>
					<p class="plan__note"><?php echo esc_html($p['note']); ?></p>
					<ul class="plan__items">
						<?php foreach ($p['items'] as $i) : ?><li><?php echo $check($hot); ?><?php echo esc_html($i); ?></li><?php endforeach; ?>
					</ul>
					<a class="plan__cta" href="<?php echo esc_url($start); ?>"><?php echo esc_html($p['cta']); ?></a>
				</div>
			<?php endforeach; ?>
		</div>
		<p class="small-note small-note--center">Call recording add-on: $25 per seat. Volume discounts from 21 seats.</p>
	</div>
</section>

<!-- FAQ -->
<section id="faq" class="anchor band band--top">
	<div class="wrap sec faq">
		<div>
			<?php echo $eyebrow('Questions'); ?>
			<h2 class="h-big">Good questions, straight answers.</h2>
			<p class="faq__more">Something else? <a href="mailto:<?php echo esc_attr(OM_EMAIL); ?>"><?php echo esc_html(OM_EMAIL); ?></a></p>
		</div>
		<div class="faq__list">
			<?php foreach ($faq as [$q, $a]) : ?>
				<details>
					<summary><span><?php echo esc_html($q); ?></span><span class="faq__plus" aria-hidden="true">+</span></summary>
					<p><?php echo esc_html($a); ?></p>
				</details>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<!-- Final call to action -->
<section class="dark">
	<div class="mk-dots"></div>
	<div class="dark__in final">
		<h2>Stop typing. Start selling.</h2>
		<p>Connect Google and watch your CRM build itself in the next few minutes.</p>
		<div class="final__ctas">
			<a class="btn btn--white btn--lg" href="<?php echo esc_url($start); ?>">Start free with Google</a>
			<a class="btn btn--ghost-white btn--lg" href="<?php echo esc_url(om_demo()); ?>">Book a demo</a>
		</div>
	</div>
</section>

<?php get_footer();
