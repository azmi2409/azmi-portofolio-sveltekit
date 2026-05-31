import type { PageServerLoad } from './$types';
import { getProjects } from '$lib/server/notion/projects';

export const load: PageServerLoad = async () => ({ projects: await getProjects() });
