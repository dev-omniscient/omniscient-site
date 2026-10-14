<?php
/**
 * Privacy and Terms at /privacy and /terms (with or without the trailing slash).
 * The text lives in legal/<slug>.md, copied from src/app/privacy/page.tsx and src/app/terms/page.tsx in the app repo.
 * These pages work with no WordPress page behind them. Google's OAuth review checks them, so keep the URLs.
 */

if (!defined('ABSPATH')) exit;

const OM_LEGAL = ['privacy' => 'Privacy Policy', 'terms' => 'Terms of Service'];

/** Same as LEGAL_UPDATED in src/lib/legal.ts. */
const OM_LEGAL_UPDATED = 'October 12, 2026';

/** The legal page for this request, or null. */
function om_legal_key(): ?string {
	$slug = om_path();
	return isset(OM_LEGAL[$slug]) ? $slug : null;
}

/** Code, bold, links and the contact email inside one line. Escapes everything else. */
function om_md_inline(string $t): string {
	$t = esc_html($t);
	$t = preg_replace('/`([^`]+)`/', '<code>$1</code>', $t);
	$t = preg_replace('/\*\*(.+?)\*\*/', '<strong>$1</strong>', $t);
	$t = preg_replace_callback('/\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]*)\)/', function ($m) {
		$href = html_entity_decode($m[2]);
		if ($href[0] === '/') return '<a href="' . esc_url(home_url($href)) . '">' . $m[1] . '</a>';
		return '<a href="' . esc_url($href) . '" target="_blank" rel="noreferrer">' . $m[1] . '</a>';
	}, $t);
	$t = str_replace(OM_EMAIL, '<a href="mailto:' . OM_EMAIL . '">' . OM_EMAIL . '</a>', $t);
	return $t;
}

/** The small set of Markdown the legal files use: headings, paragraphs, lists and tables. */
function om_md(string $md): string {
	$md = str_replace(['[COMPANY]', '[EMAIL]'], [OM_COMPANY, OM_EMAIL], $md);
	$lines = preg_split('/\r?\n/', $md);
	$out = '';
	$n = count($lines);
	for ($i = 0; $i < $n;) {
		$l = $lines[$i];
		if (trim($l) === '') { $i++; continue; }
		if (preg_match('/^(#{2,4})\s+(.*)$/', $l, $m)) {
			$lvl = strlen($m[1]);
			$out .= "<h$lvl>" . om_md_inline($m[2]) . "</h$lvl>\n";
			$i++;
			continue;
		}
		if (str_starts_with(ltrim($l), '|')) {
			$rows = [];
			while ($i < $n && str_starts_with(ltrim($lines[$i]), '|')) {
				if (!preg_match('/^\s*\|?\s*:?-{2,}/', $lines[$i])) $rows[] = array_map('trim', explode('|', trim(trim($lines[$i]), '|')));
				$i++;
			}
			$head = array_shift($rows);
			$out .= '<table><thead><tr>' . implode('', array_map(fn($c) => '<th>' . om_md_inline($c) . '</th>', $head)) . '</tr></thead>';
			$out .= '<tbody>' . implode('', array_map(fn($r) => '<tr>' . implode('', array_map(fn($c) => '<td>' . om_md_inline($c) . '</td>', $r)) . '</tr>', $rows)) . "</tbody></table>\n";
			continue;
		}
		if (preg_match('/^\s*-\s+/', $l)) {
			$out .= '<ul>';
			while ($i < $n && preg_match('/^\s*-\s+(.*)$/', $lines[$i], $mm)) { $out .= '<li>' . om_md_inline($mm[1]) . '</li>'; $i++; }
			$out .= "</ul>\n";
			continue;
		}
		$para = [];
		while ($i < $n && trim($lines[$i]) !== '' && !preg_match('/^(#{2,4}\s|\s*\||\s*-\s)/', $lines[$i])) $para[] = trim($lines[$i++]);
		$out .= '<p>' . om_md_inline(implode(' ', $para)) . "</p>\n";
	}
	return $out;
}

// Serve the legal pages even when no WordPress page has that slug.
add_filter('template_include', function ($template) {
	if (!om_legal_key()) return $template;
	if (is_404()) {
		global $wp_query;
		if ($wp_query) $wp_query->is_404 = false;
		status_header(200);
	}
	return get_theme_file_path('legal/legal.php');
}, 100);

add_filter('pre_get_document_title', fn($t) => ($k = om_legal_key()) ? OM_LEGAL[$k] . ' · Omniscient' : $t);

// WordPress would otherwise try to send an unknown /terms to a post with a similar name.
add_filter('do_redirect_guess_404_permalink', fn($guess) => om_legal_key() ? false : $guess);
