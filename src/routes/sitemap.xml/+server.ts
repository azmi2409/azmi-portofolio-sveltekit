import { getProjects } from '$lib/server/notion/projects';
import { getPublishedPosts } from '$lib/server/notion/blog';
import { isrHeaders } from '$lib/server/isr';

export async function GET() {
	const base = 'https://azmi.web.id';
	const today = new Date().toISOString().split('T')[0];
	const [projects, posts] = await Promise.all([getProjects(), getPublishedPosts()]);

	interface SitemapEntry {
		loc: string;
		lastmod: string;
		changefreq: string;
		priority: string;
	}

	const staticPages: SitemapEntry[] = [
		{ loc: '/', lastmod: today, changefreq: 'weekly', priority: '1.0' },
		{ loc: '/projects', lastmod: today, changefreq: 'weekly', priority: '0.9' },
		{ loc: '/about', lastmod: today, changefreq: 'monthly', priority: '0.8' },
		{ loc: '/blog', lastmod: today, changefreq: 'weekly', priority: '0.9' },
		{ loc: '/lab', lastmod: today, changefreq: 'monthly', priority: '0.6' },
		{ loc: '/contact', lastmod: today, changefreq: 'yearly', priority: '0.5' }
	];

	const projectPages: SitemapEntry[] = projects.map((p) => ({
		loc: `/projects/${p.slug}`,
		lastmod: today,
		changefreq: 'monthly',
		priority: '0.7'
	}));

	const blogPages: SitemapEntry[] = posts.map((p) => ({
		loc: `/blog/${p.slug}`,
		lastmod: (p.updatedAt ?? p.publishedAt ?? p.createdAt).split('T')[0],
		changefreq: 'monthly',
		priority: '0.7'
	}));

	const allEntries = [...staticPages, ...projectPages, ...blogPages];

	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${allEntries.map((e) => `<url><loc>${base}${e.loc}</loc><lastmod>${e.lastmod}</lastmod><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`).join('')}</urlset>`,
		{ headers: { 'content-type': 'application/xml', ...isrHeaders } }
	);
}
