import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getProjectBySlug, getProjects } from '$lib/server/projects';
import { setIsrHeaders } from '$lib/server/isr';

export const load: PageServerLoad = async ({ params, setHeaders }) => {
	setIsrHeaders(setHeaders);
	const project = getProjectBySlug(params.slug);
	if (!project) throw error(404, { message: 'Project not found' });
	const projects = getProjects();
	const index = projects.findIndex((item) => item.slug === project.slug);
	const neighbour = (offset: number) => {
		const item = projects[(index + offset + projects.length) % projects.length];
		return { slug: item.slug, name: item.name, type: item.type, cover: item.cover };
	};
	return { project, previous: neighbour(-1), next: neighbour(1) };
};
