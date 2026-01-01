import type { PageServerLoad } from './$types';
import { getAllPosts } from '$lib/server/db';

export const load: PageServerLoad = async () => {
    const allPosts = await getAllPosts();
    const publishedPosts = allPosts.filter((p) => p.status === 'published');
    const draftPosts = allPosts.filter((p) => p.status === 'draft');

    return {
        stats: {
            total: allPosts.length,
            published: publishedPosts.length,
            drafts: draftPosts.length
        },
        recentPosts: allPosts.slice(0, 5)
    };
};
