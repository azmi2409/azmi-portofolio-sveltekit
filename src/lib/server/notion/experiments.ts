import { fallbackExperiments } from '$lib/data/fallback';
import type { Experiment } from '$lib/types/portfolio';
import { canUseNotion, getDataSourceId, notion, NOTION_EXPERIMENTS_DATABASE_ID } from './client';
import { mapPageToExperiment } from './mappers';

export async function getExperiments(): Promise<Experiment[]> {
	if (!canUseNotion(NOTION_EXPERIMENTS_DATABASE_ID) || !notion) return fallbackExperiments;

	try {
		const dataSourceId = await getDataSourceId(NOTION_EXPERIMENTS_DATABASE_ID);
		const response = await notion.dataSources.query({
			data_source_id: dataSourceId,
			filter: { property: 'Published', checkbox: { equals: true } },
			sorts: [{ property: 'Sort Order', direction: 'ascending' }]
		});

		return response.results.map(mapPageToExperiment).filter((experiment) => experiment.published);
	} catch {
		return fallbackExperiments;
	}
}
