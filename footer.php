<?php
// Same columns as FOOTER in src/components/Site.tsx.
$cols = [
	'Product' => [
		'Up next' => home_url('/#up-next'),
		'Meetings' => home_url('/#meetings'),
		'Ask Omniscient' => home_url('/#ask'),
		'Accounts and opportunities' => home_url('/#records'),
		'Fields' => home_url('/#fields'),
		'Agents' => home_url('/#agents'),
	],
	'Developers' => [
		'Context graph' => home_url('/#engineering'),
		'API and MCP' => home_url('/#engineering'),
		'Security' => home_url('/#security'),
		'Compared' => home_url('/#compare'),
	],
	'Company' => [
		'Pricing' => home_url('/#pricing'),
		'Questions' => home_url('/#faq'),
		'Book a demo' => om_demo(),
		'Privacy' => home_url('/privacy'),
		'Terms' => home_url('/terms'),
	],
];
?>
</main>
<footer class="site-footer">
	<div class="wrap site-footer__in">
		<div class="site-footer__brand">
			<?php om_logo(); ?>
			<p>The CRM that fills itself in. For teams who would rather sell than type.</p>
			<p class="site-footer__status"><span class="dot dot--live mk-pulse"></span>All systems running</p>
		</div>
		<?php foreach ($cols as $title => $links) : ?>
			<nav class="site-footer__col" aria-label="<?php echo esc_attr($title); ?>">
				<p class="label-mono"><?php echo esc_html($title); ?></p>
				<ul>
					<?php foreach ($links as $label => $url) : ?>
						<li><a href="<?php echo esc_url($url); ?>"><?php echo esc_html($label); ?></a></li>
					<?php endforeach; ?>
				</ul>
			</nav>
		<?php endforeach; ?>
	</div>
	<div class="site-footer__base">
		<div class="wrap site-footer__base-in">
			<p>© <?php echo esc_html(wp_date('Y')); ?> <?php echo esc_html(OM_COMPANY); ?>. Omniscient is a <?php echo esc_html(OM_COMPANY); ?> product.</p>
			<a href="mailto:<?php echo esc_attr(OM_EMAIL); ?>"><?php echo esc_html(OM_EMAIL); ?></a>
		</div>
	</div>
</footer>
</div>
<?php wp_footer(); ?>
</body>
</html>
