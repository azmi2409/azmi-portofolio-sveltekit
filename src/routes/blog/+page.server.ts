import type { PageServerLoad } from './$types';
import { getPublishedPosts, CACHE_MAX_AGE_S } from '$lib/server/notion/blog';

export const load: PageServerLoad = async ({ setHeaders }) => {
	const posts = await getPublishedPosts();

	// Tell the browser / Netlify CDN to cache for 10 min,
	// but serve stale immediately while revalidating in background.
	setHeaders({
		'Cache-Control': `public, max-age=${CACHE_MAX_AGE_S}, stale-while-revalidate=60`
	});

	return { posts };
};
