import { Client } from '@notionhq/client';
import { env } from '$env/dynamic/private';

export const NOTION_TOKEN = env.NOTION_TOKEN || env.NOTION_API_KEY || '';
export const NOTION_PROJECTS_DATABASE_ID = env.NOTION_PROJECTS_DATABASE_ID || '';
export const NOTION_EXPERIMENTS_DATABASE_ID = env.NOTION_EXPERIMENTS_DATABASE_ID || '';
export const NOTION_BLOG_DATABASE_ID = env.NOTION_BLOG_DATABASE_ID || '';

export const notion = NOTION_TOKEN ? new Client({ auth: NOTION_TOKEN }) : null;

const dataSourceCache = new Map<string, string>();

export async function getDataSourceId(databaseId: string): Promise<string> {
	if (!notion) throw new Error('NOTION_TOKEN is not configured.');
	if (!databaseId) throw new Error('Notion database ID is not configured.');

	const cached = dataSourceCache.get(databaseId);
	if (cached) return cached;

	const database = (await notion.databases.retrieve({ database_id: databaseId })) as any;
	const dataSourceId = database.data_sources?.[0]?.id ?? databaseId;
	dataSourceCache.set(databaseId, dataSourceId);
	return dataSourceId;
}

export function canUseNotion(databaseId?: string): boolean {
	return Boolean(notion && databaseId);
}
