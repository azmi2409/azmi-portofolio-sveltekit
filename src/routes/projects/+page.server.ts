import type { PageServerLoad } from './$types';
import { getProjects } from '$lib/server/notion/projects';
import { setIsrHeaders } from '$lib/server/isr';

export const load: PageServerLoad = async ({ setHeaders }) => {
	setIsrHeaders(setHeaders);
	return { projects: await getProjects() };
};
