import type { Component } from 'svelte';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

const studies = import.meta.glob<{ default: Component }>('/src/content/projects/*.mdx');

export const load: PageLoad = async ({ data }) => {
	const study = studies[`/src/content/projects/${data.project.slug}.mdx`];
	if (!study) error(404, 'Project not found');
	return { ...data, Content: (await study()).default };
};
