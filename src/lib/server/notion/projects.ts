import { fallbackProjects } from '$lib/data/fallback';
import type { Project } from '$lib/types/portfolio';
import { canUseNotion, getDataSourceId, notion, NOTION_PROJECTS_DATABASE_ID } from './client';
import { mapPageToProject } from './mappers';

const fallbackBySlug = new Map(fallbackProjects.map((project) => [project.slug, project]));

function addLocalEvidence(project: Project): Project {
	const fallback = fallbackBySlug.get(project.slug);
	if (!fallback) return project;

	return {
		...project,
		ownership: project.ownership.length ? project.ownership : fallback.ownership,
		cover: project.cover ?? fallback.cover,
		coverAlt: project.coverAlt ?? fallback.coverAlt,
		coverCaption: project.coverCaption ?? fallback.coverCaption
	};
}

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

		return response.results
			.map(mapPageToProject)
			.map(addLocalEvidence)
			.filter((project) => project.published);
	} catch {
		return fallbackProjects;
	}
}

export async function getFeaturedProjects(): Promise<Project[]> {
	return (await getProjects())
		.filter((project) => project.featured)
		.sort(
			(a, b) => Number(Boolean(b.cover)) - Number(Boolean(a.cover)) || a.sortOrder - b.sortOrder
		)
		.slice(0, 4);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
	return (await getProjects()).find((project) => project.slug === slug) ?? null;
}
