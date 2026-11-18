import { redirect, type Handle } from '@sveltejs/kit';

/** The one host every canonical, sitemap entry, and internal link uses. */
const CANONICAL_HOST = 'azmi.web.id';

/** Retired URLs that now live elsewhere on the site. */
const MOVED: Record<string, string> = {
	'/projects/kilat-store': '/projects/kilat-host'
};

export const handle: Handle = async ({ event, resolve }) => {
	const { url } = event;
	const moved = MOVED[url.pathname.replace(/\/$/, '')];
	const wrongHost = url.hostname === `www.${CANONICAL_HOST}`;

	if (moved || wrongHost) {
		const target = new URL(moved ?? url.pathname, `https://${CANONICAL_HOST}`);
		target.search = url.search;
		redirect(301, target.href);
	}

	return resolve(event);
};
