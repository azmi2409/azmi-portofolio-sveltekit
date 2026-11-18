import { getProjects } from '$lib/server/projects';
import { isrHeaders } from '$lib/server/isr';

export async function GET() {
	const base = 'https://azmi.web.id';
	const projects = await getProjects();
	// Last content change, not the request date. Pages edited in the latest update use 2026-11-18.
	// Other project dates are the last commit that changed that case study.
	const projectLastmod: Record<string, string> = {
		'ai-clipper-video': '2026-09-27',
		'ai-mentor-matcher': '2026-09-27',
		'ai-showdown': '2026-09-27',
		aotavatar: '2026-09-27',
		'codexia-live': '2026-09-27',
		'diy-visa': '2026-09-27',
		'gopay-merchant-qris-gateway': '2026-09-27',
		'iscylla-store': '2026-09-27',
		'kilat-host': '2026-11-18',
		'portfolio-content-system': '2026-11-18',
		'rails-ai-gateway': '2026-09-27',
		'rails-crypto-payment': '2026-09-27',
		'rails-mailer-sandbox': '2026-09-27'
	};

	interface SitemapEntry {
		loc: string;
		lastmod: string;
		changefreq: string;
		priority: string;
	}

	const staticPages: SitemapEntry[] = [
		{ loc: '/', lastmod: '2026-11-18', changefreq: 'weekly', priority: '1.0' },
		{ loc: '/projects', lastmod: '2026-11-15', changefreq: 'weekly', priority: '0.9' },
		{ loc: '/about', lastmod: '2026-11-18', changefreq: 'monthly', priority: '0.8' },
		{ loc: '/faq', lastmod: '2026-11-15', changefreq: 'monthly', priority: '0.7' },
		{ loc: '/contact', lastmod: '2026-11-15', changefreq: 'yearly', priority: '0.5' }
	];

	const projectPages: SitemapEntry[] = projects.map((p) => {
		const lastmod = projectLastmod[p.slug];
		if (!lastmod) throw new Error(`Missing sitemap lastmod for project: ${p.slug}`);
		return {
			loc: `/projects/${p.slug}`,
			lastmod,
			changefreq: 'monthly',
			priority: '0.7'
		};
	});

	const allEntries = [...staticPages, ...projectPages];

	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${allEntries.map((e) => `<url><loc>${base}${e.loc}</loc><lastmod>${e.lastmod}</lastmod><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`).join('')}</urlset>`,
		{ headers: { 'content-type': 'application/xml', ...isrHeaders } }
	);
}
