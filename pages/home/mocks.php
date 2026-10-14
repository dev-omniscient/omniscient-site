<?php
/**
 * Sample screens for the home page, drawn in HTML so they stay sharp and load with the page.
 * Same as src/components/marketing/HeroMock.tsx and Mocks.tsx in the app. Every one shows made-up companies and people.
 */

if (!defined('ABSPATH')) exit;

/** The big picture of the app under the hero. */
function om_hero_mock(): void {
	$today = [
		['Reply owed', 'warn', 'Ruth Prater · Box of Rain', 'Asked for the security review doc', '2d'],
		['Meeting 2:00 PM', 'brand', 'Dire Wolf Mountain', 'Prep brief ready: budget approved, legal next', 'today'],
		['Draft ready', 'ok', 'Cumberland Adventure', "Follow-up from yesterday's demo", '1h'],
		['Going cold', 'danger', 'Althea Labs', 'Champion quiet for 14 days', '14d'],
	];
	$nav = ['Up next', 'Accounts', 'Opportunities', 'Contacts', 'Meetings'];
	?>
	<div class="hm">
		<div class="hm__win frame">
			<div class="hm__bar">
				<span class="fig">// fig. 01 — up next</span>
				<span class="hm__url">app.tryomniscient.com/up-next</span>
			</div>
			<div class="hm__body">
				<aside class="hm__side">
					<div class="hm__search">Search <span>⌘K</span></div>
					<?php foreach ($nav as $i => $n) : ?>
						<div class="hm__nav<?php echo $i === 0 ? ' is-on' : ''; ?>"><?php echo esc_html($n); ?><?php if ($i === 0) : ?><span class="dot dot--fire"></span><?php endif; ?></div>
					<?php endforeach; ?>
				</aside>
				<div class="hm__main">
					<div class="hm__head">
						<p>Up next</p>
						<p>4 things need you</p>
					</div>
					<ul class="rows">
						<?php foreach ($today as [$tag, $tone, $who, $what, $when]) : ?>
							<li class="hm__row">
								<span class="tag tag--<?php echo $tone; ?> hm__tag"><?php echo esc_html($tag); ?></span>
								<div class="grow">
									<p class="t-name"><?php echo esc_html($who); ?></p>
									<p class="t-sub"><?php echo esc_html($what); ?></p>
								</div>
								<span class="t-when"><?php echo esc_html($when); ?></span>
							</li>
						<?php endforeach; ?>
					</ul>
				</div>
			</div>
		</div>

		<div class="hm__suggest">
			<p class="label-mono hm__suggest-label"><span class="dot mk-pulse"></span> Suggested update</p>
			<p class="hm__suggest-what">Dire Wolf Mountain · Amount</p>
			<p class="hm__suggest-change"><s>empty</s> → <b>$42,000</b></p>
			<p class="hm__quote">“We have $42k set aside for this in Q1.” — Oct 9 email</p>
			<div class="hm__suggest-btns">
				<span class="mini mini--ink">Accept</span>
				<span class="mini mini--line">Skip</span>
			</div>
		</div>

		<div class="hm__ask">
			<p class="hm__ask-fig">// ask</p>
			<p class="hm__ask-q">Which deals slipped this week?</p>
			<p class="hm__ask-a">2 deals moved their close date: <span>Althea Labs</span> (Oct → Nov) and <span>Box of Rain</span> (legal review).</p>
			<p class="hm__ask-src">3 sources</p>
		</div>
	</div>
	<?php
}

/** Up next: the morning list, ranked. */
function om_upnext_mock(): void {
	$rows = [
		['Reply owed', 'warn', 'Ruth Prater · Box of Rain', 'Asked for the security review doc', '2d'],
		['Meeting 2:00', 'brand', 'Dire Wolf Mountain', 'Prep brief ready: budget approved, legal next', 'today'],
		['Draft ready', 'ok', 'Cumberland Adventure', "Follow-up from yesterday's demo", '1h'],
		['Quiet 14d', 'danger', 'Althea Labs', 'Champion has gone quiet', '14d'],
	];
	?>
	<div class="mock">
		<div class="mock__head"><span class="fig">// up next</span><span class="mock__aside">4 things need you</span></div>
		<ul class="rows">
			<?php foreach ($rows as [$t, $tone, $who, $what, $when]) : ?>
				<li class="mock__row">
					<span class="tag tag--<?php echo $tone; ?> w-92"><?php echo esc_html($t); ?></span>
					<span class="grow">
						<span class="t-name"><?php echo esc_html($who); ?></span>
						<span class="t-sub"><?php echo esc_html($what); ?></span>
					</span>
					<span class="t-when"><?php echo esc_html($when); ?></span>
				</li>
			<?php endforeach; ?>
		</ul>
	</div>
	<?php
}

/** A meeting: the transcript goes in, notes and record updates come out. */
function om_meeting_mock(): void {
	$updates = [
		['Budget', '$60,000', 'Loom – SEO Retainer', true],
		['Buying role', 'Economic buyer', 'Mark Lee', true],
		['Close date', 'Nov 30, 2026', 'Loom – SEO Retainer', false],
		['Task', 'Send content plan by Fri', 'You', false],
	];
	?>
	<div class="mock-stack">
		<div class="mock">
			<div class="mock__head"><span class="fig">// transcript</span><span class="mock__aside">Google Meet · 31 min</span></div>
			<div class="transcript">
				<p><span>Sarah</span> We set aside about $60,000 for the first year.</p>
				<p><span>Sarah</span> Anything above $75k needs our CFO, Mark, to sign off.</p>
				<p><span>Vincent</span> I'll send a sample content plan by Friday.</p>
				<p><span>Sarah</span> We'd like to sign by November 30.</p>
			</div>
		</div>
		<div class="mock">
			<div class="mock__head"><span class="fig">// record updates</span><span class="tag tag--brand push">4 to review</span></div>
			<ul class="divide">
				<?php foreach ($updates as [$k, $v, $on, $auto]) : ?>
					<li class="upd">
						<span class="upd__k"><?php echo esc_html($k); ?></span>
						<span class="upd__v"><?php echo esc_html($v); ?></span>
						<span class="upd__on"><?php echo esc_html($on); ?></span>
						<span class="tag <?php echo $auto ? 'tag--ok' : 'tag--gray'; ?>"><?php echo $auto ? 'Filled' : 'Review'; ?></span>
					</li>
				<?php endforeach; ?>
			</ul>
		</div>
	</div>
	<?php
}

/** Ask: a question across the pipeline, with sources. */
function om_ask_mock(): void {
	?>
	<div class="mock">
		<div class="mock__head"><span class="fig">// ask omniscient</span><span class="mock__chip push">Opportunities · 16</span></div>
		<div class="ask">
			<p class="ask__q">Which of these are at risk, and why?</p>
			<div class="ask__a">
				<?php echo om_mark(18); ?>
				<div class="grow ask__text">
					Three. <b>Notion</b> is 10 days past its close date. <b>Althea Labs</b> has had no reply in 14 days. <b>Ramp</b> named Profound as a cheaper option on the Oct 8 call.
					<p class="ask__src">
						<?php foreach (['Oct 8 call', 'Oct 3 email', '3 records'] as $s) : ?><span><?php echo esc_html($s); ?></span><?php endforeach; ?>
					</p>
				</div>
			</div>
			<div class="ask__task">
				<p class="label-mono">Task</p>
				<p class="ask__task-name">Call Althea's champion before Friday</p>
				<p class="ask__task-btns"><span class="mini mini--ink">Confirm</span><span class="mini mini--line mini--plain">Dismiss</span></p>
			</div>
		</div>
	</div>
	<?php
}

/** Accounts: a grouped table with header sorting. */
function om_list_mock(): void {
	$money = fn($n) => '$' . number_format($n);
	$rows = [
		['Customer', 'Retool', 'At risk', 340000, 0],
		['Customer', 'Vercel', 'Healthy', 260000, 0],
		['Prospect', 'Notion', 'Watch', 0, 113000],
		['Prospect', 'Figma', 'Watch', 0, 124000],
	];
	$tone = ['Healthy' => 'ok', 'Watch' => 'warn', 'At risk' => 'danger'];
	$filled = ['Healthy' => 5, 'Watch' => 3, 'At risk' => 1];
	?>
	<div class="mock list">
		<div class="list__grid list__th"><span>Account</span><span>Health</span><span class="r on">ARR ↓</span><span class="r">Pipeline</span></div>
		<?php foreach (['Customer', 'Prospect'] as $g) : $in = array_values(array_filter($rows, fn($r) => $r[0] === $g)); ?>
			<div>
				<div class="list__group">
					<span class="faint">▾</span>
					<b><?php echo esc_html($g); ?></b>
					<span class="list__count">[<?php echo count($in); ?>]</span>
					<span class="list__total"><?php echo esc_html($money(array_sum(array_column($in, 3)))); ?></span>
				</div>
				<?php foreach ($in as [, $name, $h, $arr, $pipe]) : ?>
					<div class="list__grid list__row">
						<span class="list__name"><span class="logo-box"><?php echo esc_html($name[0]); ?></span><?php echo esc_html($name); ?></span>
						<span class="list__health">
							<span class="segs"><?php for ($i = 1; $i <= 5; $i++) : ?><i class="<?php echo $i <= $filled[$h] ? 'seg--' . $tone[$h] : ''; ?>"></i><?php endfor; ?></span>
							<?php echo esc_html($h); ?>
						</span>
						<span class="r"><?php echo $arr ? esc_html($money($arr)) : '—'; ?></span>
						<span class="r"><?php echo $pipe ? esc_html($money($pipe)) : '—'; ?></span>
					</div>
				<?php endforeach; ?>
			</div>
		<?php endforeach; ?>
	</div>
	<?php
}

/** Fields: your own fields, each with a rule the AI follows. */
function om_fields_mock(): void {
	$rows = [
		['Budget', 'Currency', 'Fill when empty', 'The amount they said they can spend this year.'],
		['Decision process', 'Text', 'Suggest', 'The steps and people between now and a signed contract.'],
		['Competitor', 'Choice', 'Suggest', 'Other vendors they are talking to.'],
		['Buying role', 'Choice', 'Fill when empty', 'Economic buyer signs. Champion pushes for us.'],
	];
	?>
	<div class="mock fields">
		<div class="mock__head"><span class="fig">// fields · opportunities</span><span class="mock__aside">6 filled by AI</span></div>
		<div class="fields__grid fields__th"><span>Field</span><span>Type</span><span>AI fills it</span><span class="sm-only">What to look for</span></div>
		<?php foreach ($rows as [$f, $t, $m, $hint]) : ?>
			<div class="fields__grid fields__row">
				<b><?php echo esc_html($f); ?></b>
				<span class="muted"><?php echo esc_html($t); ?></span>
				<span class="tag <?php echo $m === 'Suggest' ? 'tag--gray' : 'tag--ok'; ?> w-fit"><?php echo esc_html($m); ?></span>
				<span class="sm-only muted trunc"><?php echo esc_html($hint); ?></span>
			</div>
		<?php endforeach; ?>
		<div class="fields__packs">
			<span class="label-mono">Packs</span>
			<?php foreach (['MEDDIC', 'Agency and services', 'Renewals', 'Buying group'] as $p) : ?><span class="fields__pack"><?php echo esc_html($p); ?></span><?php endforeach; ?>
		</div>
	</div>
	<?php
}

/** Agents: runs waiting for a yes. */
function om_agents_mock(): void {
	$runs = [
		['Meeting prep', 'Dire Wolf Mountain · brief sent 30 min before', 'Done', 'ok'],
		['Follow-up', 'Cumberland Adventure · draft ready', 'Needs your yes', 'warn'],
		['Deal keeper', 'Box of Rain · stage → Negotiation', 'Done', 'ok'],
		['Digest', 'Weekly pipeline · 14 deals', 'Mon 8:00', 'brand'],
	];
	?>
	<div class="mock">
		<div class="mock__head"><span class="fig">// agent runs</span><span class="mock__live push"><span class="dot dot--ok mk-pulse"></span>Live</span></div>
		<ul class="divide">
			<?php foreach ($runs as [$name, $what, $status, $tone]) : ?>
				<li class="mock__row">
					<span class="initials"><?php echo esc_html(strtoupper(substr($name, 0, 2))); ?></span>
					<span class="grow">
						<span class="t-name"><?php echo esc_html($name); ?></span>
						<span class="t-sub"><?php echo esc_html($what); ?></span>
					</span>
					<span class="tag tag--<?php echo $tone; ?>"><?php echo esc_html($status); ?></span>
				</li>
			<?php endforeach; ?>
		</ul>
	</div>
	<?php
}

/** One fact with its receipt. */
function om_proof_mock(): void {
	?>
	<div class="proof frame">
		<p class="label-mono">Close date · set by AI</p>
		<p class="proof__value">Nov 30, 2026</p>
		<p class="proof__quote">“We'd like to sign by November 30 so we can start in December.”</p>
		<p class="proof__src"><span>Discovery call with Loom · Oct 13 · 14:12</span><span class="proof__score">0.96</span></p>
	</div>
	<?php
}

/** The four layers of the context graph. */
function om_graph_mock(): void {
	$layers = [
		['Raw record', 'Every email, meeting, transcript and note, as it came in', '2,418'],
		['Links', 'Who is connected to what, since when, and the message that proves it', '9,102'],
		['Facts', 'Budgets, next steps, objections and promises, each with a quote', '1,377'],
		['Search', 'Word search and meaning search over all of it', '100%'],
	];
	?>
	<div class="graph">
		<div class="graph__head">// context graph · acme</div>
		<ol class="rows">
			<?php foreach ($layers as $i => [$name, $what, $n]) : ?>
				<li class="graph__row">
					<span class="graph__n">0<?php echo $i + 1; ?></span>
					<span class="grow">
						<span class="graph__name"><?php echo esc_html($name); ?></span>
						<span class="graph__what"><?php echo esc_html($what); ?></span>
					</span>
					<span class="graph__count"><?php echo esc_html($n); ?></span>
				</li>
			<?php endforeach; ?>
		</ol>
	</div>
	<?php
}
