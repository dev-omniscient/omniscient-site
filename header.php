<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<?php om_head(); ?>
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="skip" href="#main">Skip to content</a>
<div class="site">
<header class="site-header">
	<div class="wrap site-header__in">
		<a class="site-header__logo" href="<?php echo esc_url(home_url('/')); ?>" aria-label="Omniscient home"><?php om_logo(); ?></a>
		<nav class="site-nav" aria-label="Main">
			<?php foreach (OM_NAV as $label => $href) : ?>
				<a href="<?php echo esc_url(home_url($href)); ?>"><?php echo esc_html($label); ?></a>
			<?php endforeach; ?>
		</nav>
		<div class="site-actions">
			<a class="site-actions__signin" href="<?php echo esc_url(om_app('/today')); ?>">Sign in</a>
			<a class="btn btn--outline btn--sm site-actions__demo" href="<?php echo esc_url(om_demo()); ?>">Book a demo</a>
			<a class="btn btn--ink btn--sm site-actions__start" href="<?php echo esc_url(om_app('/today')); ?>">Start free <span class="nudge" aria-hidden="true">→</span></a>
		</div>
	</div>
</header>
<main id="main" class="site-main">
