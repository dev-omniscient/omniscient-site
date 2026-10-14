<?php
// Plain pages written in the WordPress editor. Key pages use pages/<slug>/ instead.
get_header();
while (have_posts()) : the_post();
?>
<article class="reading">
	<h1 class="reading__title"><?php the_title(); ?></h1>
	<div class="prose"><?php the_content(); ?></div>
</article>
<?php
endwhile;
get_footer();
