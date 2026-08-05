import type { PageServerLoad } from './$types';
import { getPostBySlug } from '$lib/server/notion/blog';
import { getPageBlocks } from '$lib/server/notion/blocks';
import { setIsrHeaders } from '$lib/server/isr';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, setHeaders }) => {
	setIsrHeaders(setHeaders);
	const post = await getPostBySlug(params.slug);

	if (!post) {
		throw error(404, { message: 'Post not found' });
	}

	const blocks = await getPageBlocks(post.notionPageId);
	return { post, blocks };
};
