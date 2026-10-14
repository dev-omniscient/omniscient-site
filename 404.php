<?php
// Most unknown paths go to the app first (OM_SEND_404_TO_APP in functions.php). Missing files land here.
get_header();
?>
<div class="reading reading--center">
	<p class="fig">// 404</p>
	<h1 class="reading__title">This page does not exist.</h1>
	<a class="btn btn--ink btn--lg" href="<?php echo esc_url(home_url('/')); ?>">Go home</a>
</div>
<?php get_footer();
