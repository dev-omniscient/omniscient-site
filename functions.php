<?php
/**
 * Omniscient theme.
 *
 * The front page always uses pages/home. A WordPress page whose slug matches a folder in pages/
 * uses that folder's <slug>.php and <slug>.css. Privacy and Terms come from inc/legal.php.
 * Everything else uses the plain templates (index.php, page.php, single.php, 404.php).
 */

if (!defined('ABSPATH')) exit;

const OM_APP = 'https://app.tryomniscient.com';
/** Who runs Omniscient. Same values as src/lib/legal.ts in the app. Change both together. */
const OM_COMPANY = 'Perceptric';
const OM_EMAIL = 'hello@tryomniscient.com';
/** The site description. Same as the description in the app's src/app/layout.tsx. */
const OM_DESCRIPTION = 'The CRM that fills itself in.';
/** The mark: four quarters of one circle around a single point. Same as MARK_PATH in src/components/Logo.tsx. */
const OM_MARK = 'M30 30H4A26 26 0 0 1 30 4ZM34 30V4A26 26 0 0 1 60 30ZM34 34H60A26 26 0 0 1 34 60ZM30 34V60H4V34Z';
/** Links in the top bar. Same as NAV in src/components/Site.tsx. */
const OM_NAV = ['Product' => '/#product', 'Meetings' => '/#meetings', 'Agents' => '/#agents', 'Customize' => '/#fields', 'Developers' => '/#engineering', 'Pricing' => '/#pricing'];
/** Like the app's src/proxy.ts: a path with no page here goes to the same path on the app. */
const OM_SEND_404_TO_APP = true;

require_once __DIR__ . '/inc/legal.php';

add_action('after_setup_theme', function () {
	add_theme_support('title-tag');
	add_theme_support('post-thumbnails');
	add_theme_support('html5', ['search-form', 'gallery', 'caption', 'style', 'script']);
	add_theme_support('responsive-embeds');
});

/** The request path with no slashes at the ends, like "privacy". */
function om_path(): string {
	return trim((string) ($GLOBALS['wp']->request ?? ''), '/');
}

/** The folder in pages/ for this request, or null. */
function om_page_key(): ?string {
	if (is_front_page()) return 'home';
	if (is_page()) {
		$slug = get_post_field('post_name', get_queried_object_id());
		if ($slug && is_file(get_theme_file_path("pages/$slug/$slug.php"))) return $slug;
	}
	return null;
}

/** A link into the app. */
function om_app(string $path = ''): string {
	return OM_APP . $path;
}

/** The "Book a demo" link. */
function om_demo(): string {
	return 'mailto:' . OM_EMAIL . '?subject=Omniscient%20demo';
}

/** Cache-busting version: the file's last change time. */
function om_ver(string $rel): string {
	$file = get_theme_file_path($rel);
	return is_file($file) ? (string) filemtime($file) : '1';
}

/** The Omniscient mark as inline SVG. */
function om_mark(int $size = 22, string $class = 'mark'): string {
	return '<svg class="' . esc_attr($class) . '" width="' . $size . '" height="' . $size . '" viewBox="0 0 64 64" aria-hidden="true"><path d="' . OM_MARK . '"/></svg>';
}

/** The logo: the mark and the wordmark. */
function om_logo(): void {
	echo '<span class="logo">' . om_mark() . '<span class="logo__word">Omniscient</span></span>';
}

add_filter('template_include', fn($template) => ($key = om_page_key()) ? get_theme_file_path("pages/$key/$key.php") : $template, 99);

add_filter('body_class', function ($classes) {
	$classes[] = 'om';
	if ($key = om_page_key()) $classes[] = "om-$key";
	return $classes;
});

// Titles: "Omniscient" on the home page, "Page · Omniscient" elsewhere.
add_filter('document_title_separator', fn() => '·');
add_filter('pre_get_document_title', fn($t) => is_front_page() ? 'Omniscient' : $t);

add_action('wp_enqueue_scripts', function () {
	wp_enqueue_style('om-fonts', 'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap', [], null);
	wp_enqueue_style('om-base', get_theme_file_uri('assets/base.css'), ['om-fonts'], om_ver('assets/base.css'));

	$key = om_page_key();
	if ($key) {
		foreach (['css', 'js'] as $ext) {
			$rel = "pages/$key/$key.$ext";
			if (!is_file(get_theme_file_path($rel))) continue;
			$ext === 'css'
				? wp_enqueue_style("om-$key", get_theme_file_uri($rel), ['om-base'], om_ver($rel))
				: wp_enqueue_script("om-$key", get_theme_file_uri($rel), [], om_ver($rel), ['in_footer' => true, 'strategy' => 'defer']);
		}
	}
	// Hand-built pages and the legal pages never use block content, so skip the block styles.
	if ($key || om_legal_key()) {
		wp_dequeue_style('wp-block-library');
		wp_dequeue_style('wp-block-library-theme');
		wp_dequeue_style('global-styles');
		wp_dequeue_style('classic-theme-styles');
	}
}, 20);

// Fewer extras in <head>.
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action('wp_head', 'wp_generator');

/** True when an SEO plugin writes the description and share tags. */
function om_has_seo_plugin(): bool {
	return defined('WPSEO_VERSION') || class_exists('RankMath') || defined('AIOSEO_VERSION') || defined('SEOPRESS_VERSION');
}

/**
 * Meta tags and icons. Same as the app's layout.tsx: description, application name, theme color,
 * favicon.ico, icon.svg and the apple icon. WordPress's own Site Icon wins if one is set.
 * Canonical and share tags are extra (the Next.js site had none). An SEO plugin's tags win over ours.
 */
function om_head(): void {
	$b = fn($f) => esc_url(get_theme_file_uri("assets/brand/$f"));
	if (!has_site_icon()) {
		echo '<link rel="icon" href="' . $b('favicon.ico') . '" sizes="32x32">' . "\n";
		echo '<link rel="icon" href="' . $b('icon.svg') . '" type="image/svg+xml" sizes="any">' . "\n";
		echo '<link rel="apple-touch-icon" href="' . $b('apple-icon.png') . '" type="image/png" sizes="180x180">' . "\n";
	}
	echo '<meta name="application-name" content="Omniscient">' . "\n";
	echo '<meta name="theme-color" content="#0943b0">' . "\n";
	if (om_has_seo_plugin()) return;

	$desc = OM_DESCRIPTION;
	if (is_singular() && !is_front_page() && has_excerpt()) $desc = wp_strip_all_tags(get_the_excerpt());
	printf('<meta name="description" content="%s">' . "\n", esc_attr($desc));

	// WordPress prints a canonical link on posts and pages. The home page and legal pages get ours.
	$url = null;
	if (is_front_page()) $url = home_url('/');
	elseif ($legal = om_legal_key()) $url = home_url("/$legal");
	if ($url) printf('<link rel="canonical" href="%s">' . "\n", esc_url($url));

	printf('<meta property="og:type" content="%s">' . "\n", is_singular('post') ? 'article' : 'website');
	echo '<meta property="og:site_name" content="Omniscient">' . "\n";
	printf('<meta property="og:title" content="%s">' . "\n", esc_attr(wp_get_document_title()));
	printf('<meta property="og:description" content="%s">' . "\n", esc_attr($desc));
	printf('<meta property="og:url" content="%s">' . "\n", esc_url($url ?? home_url(add_query_arg([], om_path()))));
	printf('<meta property="og:image" content="%s">' . "\n", $b('omniscient-app-icon-512.png'));
	echo '<meta name="twitter:card" content="summary">' . "\n";
}

// Browsers ask for /favicon.ico on their own. WordPress would send its own logo, so send ours.
add_action('do_faviconico', function () {
	if (has_site_icon()) return;
	wp_redirect(get_theme_file_uri('assets/brand/favicon.ico'), 302);
	exit;
});

// Like the app's src/proxy.ts: a path with no page on this site goes to the same path on app.tryomniscient.com.
// Files (a path ending in .png, .js and so on) still get a normal 404.
add_action('template_redirect', function () {
	if (!OM_SEND_404_TO_APP || !is_404() || om_legal_key()) return;
	$uri = (string) wp_unslash($_SERVER['REQUEST_URI'] ?? '/');
	$path = (string) parse_url($uri, PHP_URL_PATH);
	if ($path === '' || $path === '/' || $path[0] !== '/' || preg_match('/\.[a-zA-Z0-9]+$/', $path)) return;
	wp_redirect(om_app($uri), 308);
	exit;
}, 1);
