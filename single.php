<?php
// One post.
get_header();
while (have_posts()) : the_post();
?>
<article class="reading">
	<h1 class="reading__title"><?php the_title(); ?></h1>
	<p class="reading__meta"><?php echo esc_html(get_the_date('M j, Y')); ?></p>
	<div class="prose"><?php the_content(); ?></div>
</article>
<?php
endwhile;
get_footer();
