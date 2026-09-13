import { fallbackProjects } from '$lib/data/fallback';
import type { Project } from '$lib/types/portfolio';
import { canUseNotion, getDataSourceId, notion, NOTION_PROJECTS_DATABASE_ID } from './client';
import { mapPageToProject } from './mappers';

const fallbackBySlug = new Map(fallbackProjects.map((project) => [project.slug, project]));

function addLocalEvidence(project: Project): Project {
	const fallback = fallbackBySlug.get(project.slug);
	if (!fallback) return project;
	// Reviewed local case studies keep client-facing copy consistent with CMS-backed pages.
	return {
		...project,
		...fallback,
		id: project.id,
		notionPageId: project.notionPageId,
		published: project.published,
		cover: fallback.cover ?? project.cover,
		coverAlt: fallback.cover ? fallback.coverAlt : project.coverAlt,
		coverCaption: fallback.cover ? fallback.coverCaption : project.coverCaption
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

		const projects = response.results
			.map(mapPageToProject)
			.map(addLocalEvidence)
			.filter((project) => project.published);
		const slugs = new Set(projects.map((project) => project.slug));
		return [
			...projects,
			...fallbackProjects.filter(
				(project) => project.slug === 'iscylla-store' && !slugs.has(project.slug)
			)
		].sort((a, b) => a.sortOrder - b.sortOrder);
	} catch {
		return fallbackProjects;
	}
}

export async function getFeaturedProjects(): Promise<Project[]> {
	const projects = await getProjects();
	return ['futurelab-ai-workflows', 'kilat-store', 'codexia-live', 'iscylla-store'].flatMap(
		(slug) => projects.filter((project) => project.slug === slug)
	);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
	return (await getProjects()).find((project) => project.slug === slug) ?? null;
}
