import type { Project } from '$lib/types/portfolio';

const files = import.meta.glob<Record<string, unknown>>('/src/content/projects/*.mdx', {
	eager: true,
	import: 'metadata'
});

const projects: Project[] = Object.entries(files)
	.map(([path, metadata]) => {
		const slug = path
			.split('/')
			.pop()!
			.replace(/\.mdx$/, '');
		const strings = ['name', 'year', 'role', 'type', 'status', 'summary', 'outcome'];
		const lists = ['ownership', 'stack'];
		if (
			!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ||
			strings.some((key) => typeof metadata[key] !== 'string' || !metadata[key].trim()) ||
			lists.some(
				(key) =>
					!Array.isArray(metadata[key]) ||
					!metadata[key].every((item: unknown) => typeof item === 'string')
			) ||
			typeof metadata.published !== 'boolean' ||
			typeof metadata.featured !== 'boolean' ||
			!['Web App', 'OS Library', 'API / Gateway'].includes(metadata.category as string) ||
			typeof metadata.sortOrder !== 'number' ||
			!Number.isFinite(metadata.sortOrder) ||
			['liveUrl', 'githubUrl'].some(
				(key) =>
					metadata[key] !== undefined &&
					(typeof metadata[key] !== 'string' || !/^https:\/\//.test(metadata[key]))
			) ||
			(metadata.cover !== undefined &&
				(typeof metadata.cover !== 'string' ||
					!/^\/(?!\/)/.test(metadata.cover) ||
					typeof metadata.coverAlt !== 'string')) ||
			(metadata.coverCaption !== undefined && typeof metadata.coverCaption !== 'string')
		) {
			throw new Error(`Invalid project frontmatter: ${path}`);
		}
		return { ...metadata, id: slug, slug } as unknown as Project;
	})
	.sort((a, b) => a.sortOrder - b.sortOrder);

export function getProjects() {
	return projects.filter((project) => project.published);
}

export function getFeaturedProjects() {
	return getProjects().filter((project) => project.featured);
}

export function getProjectBySlug(slug: string) {
	return getProjects().find((project) => project.slug === slug) ?? null;
}
