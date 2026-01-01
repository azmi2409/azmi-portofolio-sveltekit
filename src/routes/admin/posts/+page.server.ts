import type { PageServerLoad } from './$types';
import { getAllPosts } from '$lib/server/db';

export const load: PageServerLoad = async ({ url }) => {
    const search = url.searchParams.get('search') || undefined;
    const status = url.searchParams.get('status') as 'draft' | 'published' | null;

    const posts = await getAllPosts({
        search,
        status: status || undefined
    });

    return { posts, filters: { search, status } };
};
