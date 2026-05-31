import type { PageServerLoad } from './$types';
import { proofMetrics } from '$lib/data/fallback';
import { getExperiments } from '$lib/server/notion/experiments';
import { getFeaturedProjects } from '$lib/server/notion/projects';

export const load: PageServerLoad = async () => {
	const [featuredProjects, experiments] = await Promise.all([
		getFeaturedProjects(),
		getExperiments()
	]);

	return {
		featuredProjects,
		experiments: experiments.slice(0, 2),
		proofMetrics
	};
};
