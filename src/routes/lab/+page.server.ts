import type { PageServerLoad } from './$types';
import { getExperiments } from '$lib/server/notion/experiments';
import { setIsrHeaders } from '$lib/server/isr';

export const load: PageServerLoad = async ({ setHeaders }) => {
	setIsrHeaders(setHeaders);
	return { experiments: await getExperiments() };
};
