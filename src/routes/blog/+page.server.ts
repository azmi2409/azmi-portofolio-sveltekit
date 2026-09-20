import type { PageServerLoad } from './$types';
import { getPublishedPosts } from '$lib/server/blog';
import { setIsrHeaders } from '$lib/server/isr';

export const load: PageServerLoad = async ({ setHeaders }) => {
	setIsrHeaders(setHeaders);
	const posts = await getPublishedPosts();

	return { posts };
};
