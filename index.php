<?php
// The post list, search results and anything without its own template.
get_header();
if (is_search()) $title = 'Search: ' . get_search_query();
elseif (is_home()) $title = single_post_title('', false) ?: 'Posts';
else $title = wp_strip_all_tags(get_the_archive_title());
?>
<div class="reading">
	<h1 class="reading__title"><?php echo esc_html($title); ?></h1>
	<?php if (have_posts()) : ?>
		<ul class="post-list">
			<?php while (have_posts()) : the_post(); ?>
				<li>
					<a href="<?php the_permalink(); ?>"><h2><?php the_title(); ?></h2></a>
					<p class="reading__meta"><?php echo esc_html(get_the_date('M j, Y')); ?></p>
					<?php if (has_excerpt() || get_the_content()) : ?><p><?php echo esc_html(wp_strip_all_tags(get_the_excerpt())); ?></p><?php endif; ?>
				</li>
			<?php endwhile; ?>
		</ul>
		<?php the_posts_pagination(['prev_text' => '←', 'next_text' => '→']); ?>
	<?php else : ?>
		<p class="reading__meta">Nothing here yet.</p>
	<?php endif; ?>
</div>
<?php get_footer();
