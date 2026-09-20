import type { PageServerLoad } from './$types';
import { proofMetrics } from '$lib/data/fallback';
import { getFeaturedProjects } from '$lib/server/projects';
import { setIsrHeaders } from '$lib/server/isr';

const homepageMetrics = proofMetrics.map((metric) =>
	metric.label === 'Working globally' ? { ...metric, value: 'Jakarta, Indonesia · remote' } : metric
);

export const load: PageServerLoad = async ({ setHeaders }) => {
	setIsrHeaders(setHeaders);
	const featuredProjects = getFeaturedProjects();

	return {
		featuredProjects,
		proofMetrics: homepageMetrics
	};
};
