import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getProjectBySlug } from '$lib/server/projects';
import { setIsrHeaders } from '$lib/server/isr';

export const load: PageServerLoad = async ({ params, setHeaders }) => {
	setIsrHeaders(setHeaders);
	const project = getProjectBySlug(params.slug);
	if (!project) throw error(404, { message: 'Project not found' });
	return { project };
};
