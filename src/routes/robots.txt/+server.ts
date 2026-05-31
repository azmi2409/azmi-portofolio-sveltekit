export function GET() {
	return new Response('User-agent: *\nAllow: /\nSitemap: https://azmi.web.id/sitemap.xml\n', {
		headers: { 'content-type': 'text/plain' }
	});
}
