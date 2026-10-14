<?php
// Privacy or Terms, rendered from legal/<slug>.md. See inc/legal.php.
$key = om_legal_key();
$md = (string) file_get_contents(get_theme_file_path("legal/$key.md"));
// The file's own "# Title" becomes the page heading.
$md = preg_replace('/^#\s+.*\R/', '', $md, 1);
get_header();
?>
<div class="reading">
	<h1 class="reading__title"><?php echo esc_html(OM_LEGAL[$key]); ?></h1>
	<p class="reading__meta">Last updated: <?php echo esc_html(OM_LEGAL_UPDATED); ?></p>
	<div class="prose"><?php echo om_md($md); ?></div>
</div>
<?php get_footer();
