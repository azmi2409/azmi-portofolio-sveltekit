import { fallbackProjects } from '$lib/data/fallback';
import type { Project } from '$lib/types/portfolio';
import { canUseNotion, getDataSourceId, notion, NOTION_PROJECTS_DATABASE_ID } from './client';
import { mapPageToProject } from './mappers';

export async function getProjects(): Promise<Project[]> {
	if (!canUseNotion(NOTION_PROJECTS_DATABASE_ID) || !notion) {
		return [...fallbackProjects].sort((a, b) => a.sortOrder - b.sortOrder);
	}

	try {
		const dataSourceId = await getDataSourceId(NOTION_PROJECTS_DATABASE_ID);
		const response = await notion.dataSources.query({
			data_source_id: dataSourceId,
			filter: { property: 'Published', checkbox: { equals: true } },
			sorts: [{ property: 'Sort Order', direction: 'ascending' }]
		});

		return response.results.map(mapPageToProject).filter((project) => project.published);
	} catch {
		return fallbackProjects;
	}
}

export async function getFeaturedProjects(): Promise<Project[]> {
	return (await getProjects()).filter((project) => project.featured).slice(0, 4);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
	return (await getProjects()).find((project) => project.slug === slug) ?? null;
}
