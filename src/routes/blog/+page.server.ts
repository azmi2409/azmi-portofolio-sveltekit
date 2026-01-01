import type { PageServerLoad } from './$types';
import { getAllPosts } from '$lib/server/db';

export const load: PageServerLoad = async ({ url }) => {
    const search = url.searchParams.get('search') || undefined;
    const category = url.searchParams.get('category') || undefined;
    const tag = url.searchParams.get('tag') || undefined;

    const posts = await getAllPosts({
        status: 'published',
        search,
        category,
        tag
    });

    // Get all unique categories and tags
    const allPosts = await getAllPosts({ status: 'published' });
    const categories = [...new Set(allPosts.flatMap((post) => post.categories))];
    const tags = [...new Set(allPosts.flatMap((post) => post.tags))];

    return {
        posts,
        categories,
        tags,
        filters: { search, category, tag }
    };
};
