import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getPageBlocks } from '$lib/server/notion/blocks';
import { getProjectBySlug } from '$lib/server/notion/projects';

const notionIdPattern =
	/^[0-9a-f]{32}$|^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const load: PageServerLoad = async ({ params }) => {
	const project = await getProjectBySlug(params.slug);
	if (!project) throw error(404, { message: 'Project not found' });

	const blocks = notionIdPattern.test(project.notionPageId)
		? await getPageBlocks(project.notionPageId)
		: [];

	return { project, blocks };
};
