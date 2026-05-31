import type { PageServerLoad } from './$types';
import { getPostBySlug, CACHE_MAX_AGE_S } from '$lib/server/notion/blog';
import { getPageBlocks } from '$lib/server/notion/blocks';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, setHeaders }) => {
	const post = await getPostBySlug(params.slug);

	if (!post) {
		throw error(404, { message: 'Post not found' });
	}

	const blocks = await getPageBlocks(post.notionPageId);

	// Blog post content changes infrequently — cache for 10 min,
	// allow CDN/browser to serve stale instantly while revalidating.
	setHeaders({
		'Cache-Control': `public, max-age=${CACHE_MAX_AGE_S}, stale-while-revalidate=60`
	});

	return { post, blocks };
};
