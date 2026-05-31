import { getProjects } from '$lib/server/notion/projects';

export async function GET() {
	const base = 'https://azmi.web.id';
	const projects = await getProjects();
	const urls = [
		'/',
		'/projects',
		'/about',
		'/lab',
		'/contact',
		'/blog',
		...projects.map((project) => `/projects/${project.slug}`)
	];

	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((url) => `<url><loc>${base}${url}</loc></url>`).join('')}</urlset>`,
		{ headers: { 'content-type': 'application/xml' } }
	);
}
