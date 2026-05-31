import type { BlogPost } from '$lib/types/blog';
import { canUseNotion, getDataSourceId, notion, NOTION_BLOG_DATABASE_ID } from './client';
import { mapPageToBlogPost } from './mappers';

export const CACHE_MAX_AGE_S = 600;

export async function getPublishedPosts(): Promise<BlogPost[]> {
	if (!canUseNotion(NOTION_BLOG_DATABASE_ID) || !notion) return [];

	try {
		const dataSourceId = await getDataSourceId(NOTION_BLOG_DATABASE_ID);
		const response = await notion.dataSources.query({
			data_source_id: dataSourceId,
			filter: { property: 'Status', select: { equals: 'Published' } },
			sorts: [{ property: 'Published Date', direction: 'descending' }]
		});
		return response.results.map(mapPageToBlogPost);
	} catch {
		return [];
	}
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
	return (await getPublishedPosts()).find((post) => post.slug === slug) ?? null;
}
