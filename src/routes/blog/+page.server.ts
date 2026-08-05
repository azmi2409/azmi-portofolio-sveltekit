import type { PageServerLoad } from './$types';
import { getPublishedPosts } from '$lib/server/notion/blog';
import { setIsrHeaders } from '$lib/server/isr';

export const load: PageServerLoad = async ({ setHeaders }) => {
	setIsrHeaders(setHeaders);
	const posts = await getPublishedPosts();

	return { posts };
};
