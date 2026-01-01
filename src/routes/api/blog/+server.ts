import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getAllPosts, createPost } from '$lib/server/db';
import { isAuthenticated } from '$lib/server/auth';
import type { BlogPostInput } from '$lib/types/blog';

export const GET: RequestHandler = async ({ url }) => {
    const status = url.searchParams.get('status') as 'draft' | 'published' | null;
    const category = url.searchParams.get('category');
    const tag = url.searchParams.get('tag');
    const search = url.searchParams.get('search');

    const posts = getAllPosts({
        status: status || undefined,
        category: category || undefined,
        tag: tag || undefined,
        search: search || undefined
    });

    return json(posts);
};

export const POST: RequestHandler = async (event) => {
    if (!isAuthenticated(event)) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const input: BlogPostInput = await event.request.json();

        // Validate required fields
        if (!input.title || !input.content || !input.excerpt) {
            return json({ error: 'Title, content, and excerpt are required' }, { status: 400 });
        }

        const post = createPost(input);
        return json(post, { status: 201 });
    } catch (error) {
        console.error('Error creating post:', error);
        return json({ error: 'Failed to create post' }, { status: 500 });
    }
};
