import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getPostBySlug, updatePost, deletePost } from '$lib/server/db';
import { isAuthenticated } from '$lib/server/auth';
import type { BlogPostInput } from '$lib/types/blog';

export const GET: RequestHandler = async ({ params }) => {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        return json({ error: 'Post not found' }, { status: 404 });
    }

    return json(post);
};

export const PUT: RequestHandler = async (event) => {
    if (!isAuthenticated(event)) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const post = await getPostBySlug(event.params.slug);
        if (!post) {
            return json({ error: 'Post not found' }, { status: 404 });
        }

        const input: Partial<BlogPostInput> = await event.request.json();
        const updatedPost = await updatePost(post.id, input);

        if (!updatedPost) {
            return json({ error: 'Failed to update post' }, { status: 500 });
        }

        return json(updatedPost);
    } catch (error) {
        console.error('Error updating post:', error);
        return json({ error: 'Failed to update post' }, { status: 500 });
    }
};

export const DELETE: RequestHandler = async (event) => {
    if (!isAuthenticated(event)) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const post = await getPostBySlug(event.params.slug);
        if (!post) {
            return json({ error: 'Post not found' }, { status: 404 });
        }

        const success = await deletePost(post.id);

        if (!success) {
            return json({ error: 'Failed to delete post' }, { status: 500 });
        }

        return json({ success: true });
    } catch (error) {
        console.error('Error deleting post:', error);
        return json({ error: 'Failed to delete post' }, { status: 500 });
    }
};
