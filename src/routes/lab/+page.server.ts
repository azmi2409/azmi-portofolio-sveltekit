import type { PageServerLoad } from './$types';
import { experiments } from '$lib/data/experiments';
import { setIsrHeaders } from '$lib/server/isr';

export const load: PageServerLoad = async ({ setHeaders }) => {
	setIsrHeaders(setHeaders);
	return { experiments };
};
