import type { Component } from 'svelte';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

const articles = import.meta.glob<{ default: Component }>('/src/content/blog/*.mdx');

export const load: PageLoad = async ({ data }) => {
	const article = articles[`/src/content/blog/${data.post.slug}.mdx`];
	if (!article) error(404, 'Post not found');
	return { ...data, Content: (await article()).default };
};
