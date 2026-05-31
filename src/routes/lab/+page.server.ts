import type { PageServerLoad } from './$types';
import { getExperiments } from '$lib/server/notion/experiments';

export const load: PageServerLoad = async () => ({ experiments: await getExperiments() });
