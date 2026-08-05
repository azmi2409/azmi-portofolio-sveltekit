import type { PageServerLoad } from './$types';
import { proofMetrics } from '$lib/data/fallback';
import { getExperiments } from '$lib/server/notion/experiments';
import { getFeaturedProjects } from '$lib/server/notion/projects';
import { setIsrHeaders } from '$lib/server/isr';

export const load: PageServerLoad = async ({ setHeaders }) => {
	setIsrHeaders(setHeaders);
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
