import { Client } from '@notionhq/client';
import { NOTION_API_KEY, NOTION_BLOG_DATABASE_ID } from '$env/static/private';
import type { BlogPost, NotionBlock } from '$lib/types/blog';

// ---------------------------------------------------------------------------
// Client
// ---------------------------------------------------------------------------

const notion = new Client({ auth: NOTION_API_KEY });

// ---------------------------------------------------------------------------
// In-memory cache (5-minute TTL)
// ---------------------------------------------------------------------------

interface CacheEntry<T> {
	data: T;
	expiresAt: number;
}

const cache = new Map<string, CacheEntry<unknown>>();

/** TTL used for all in-memory entries (10 minutes) */
const CACHE_TTL_MS = 10 * 60 * 1000;

/** Same value in seconds — exported so load() can set Cache-Control headers */
export const CACHE_MAX_AGE_S = CACHE_TTL_MS / 1000;

function getCached<T>(key: string): T | null {
	const entry = cache.get(key) as CacheEntry<T> | undefined;
	if (!entry) return null;
	if (Date.now() > entry.expiresAt) {
		cache.delete(key);
		return null;
	}
	return entry.data;
}

function setCached<T>(key: string, data: T): void {
	// Prune expired entries to prevent unbounded growth in long-running processes
	for (const [k, v] of cache) {
		if (Date.now() > v.expiresAt) cache.delete(k);
	}
	cache.set(key, { data, expiresAt: Date.now() + CACHE_TTL_MS });
}

// ---------------------------------------------------------------------------
// Helpers — map Notion page → BlogPost
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function richTextToPlain(richTexts: any[]): string {
	if (!Array.isArray(richTexts) || richTexts.length === 0) return '';
	return richTexts.map((rt) => rt.plain_text ?? '').join('');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPageToBlogPost(page: any): BlogPost {
	const props = page.properties;

	const title = richTextToPlain(props?.Name?.title ?? []) || 'Untitled';
	const slug = richTextToPlain(props?.Slug?.rich_text ?? []);
	const excerpt = richTextToPlain(props?.Excerpt?.rich_text ?? []);
	const categories: string[] = (props?.Category?.multi_select ?? []).map(
		(s: { name: string }) => s.name
	);
	const tags: string[] = (props?.Tags?.multi_select ?? []).map(
		(s: { name: string }) => s.name
	);
	const statusName: string = props?.Status?.select?.name ?? 'Draft';
	const status: 'draft' | 'published' =
		statusName.toLowerCase() === 'published' ? 'published' : 'draft';
	const publishedAt: string | undefined = props?.['Published Date']?.date?.start ?? undefined;

	// Cover image
	let featuredImage: string | undefined;
	if (page.cover) {
		featuredImage =
			page.cover.type === 'external'
				? page.cover.external?.url
				: page.cover.file?.url;
	}

	return {
		id: page.id,
		notionPageId: page.id,
		slug: slug || page.id,
		title,
		excerpt,
		featuredImage,
		categories,
		tags,
		status,
		publishedAt,
		createdAt: page.created_time,
		updatedAt: page.last_edited_time
	};
}

// ---------------------------------------------------------------------------
// API — get all published posts
// ---------------------------------------------------------------------------

let cachedDataSourceId: string | null = null;

async function getDataSourceId(databaseId: string): Promise<string> {
	if (cachedDataSourceId) return cachedDataSourceId;

	// In v5.x, databases contain data sources. We need the ID of the data source to query.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const database = (await notion.databases.retrieve({ database_id: databaseId })) as any;

	if (!database.data_sources || database.data_sources.length === 0) {
		throw new Error(
			`No data sources found for database ${databaseId}. Ensure your Notion database has at least one data source enabled.`
		);
	}

	cachedDataSourceId = database.data_sources[0].id;
	return cachedDataSourceId as string;
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
	const cacheKey = 'published_posts';
	const cached = getCached<BlogPost[]>(cacheKey);
	if (cached) return cached;

	const dataSourceId = await getDataSourceId(NOTION_BLOG_DATABASE_ID);

	const response = await notion.dataSources.query({
		data_source_id: dataSourceId,
		filter: {
			property: 'Status',
			select: { equals: 'Published' }
		},
		sorts: [{ property: 'Published Date', direction: 'descending' }]
	});

	const posts = response.results.map(mapPageToBlogPost);
	setCached(cacheKey, posts);
	return posts;
}

// ---------------------------------------------------------------------------
// API — get single post by slug
// ---------------------------------------------------------------------------

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
	const cacheKey = `post_slug_${slug}`;
	const cached = getCached<BlogPost>(cacheKey);
	if (cached) return cached;

	const dataSourceId = await getDataSourceId(NOTION_BLOG_DATABASE_ID);

	const response = await notion.dataSources.query({
		data_source_id: dataSourceId,
		filter: {
			property: 'Slug',
			rich_text: { equals: slug }
		}
	});

	if (response.results.length === 0) return null;
	const post = mapPageToBlogPost(response.results[0]);
	setCached(cacheKey, post);
	return post;
}

// ---------------------------------------------------------------------------
// API — get page blocks (recursive, paginated)
// ---------------------------------------------------------------------------

async function fetchBlockChildren(blockId: string): Promise<NotionBlock[]> {
	const blocks: NotionBlock[] = [];
	let cursor: string | undefined;

	do {
		const response = await notion.blocks.children.list({
			block_id: blockId,
			page_size: 100,
			...(cursor ? { start_cursor: cursor } : {})
		});

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const results = response.results as any[];

		for (const block of results) {
			const typedBlock: NotionBlock = {
				id: block.id,
				type: block.type,
				has_children: block.has_children,
				...block
			};

			// Recursively fetch children
			if (block.has_children) {
				typedBlock.children = await fetchBlockChildren(block.id);
			}

			blocks.push(typedBlock);
		}

		cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
	} while (cursor);

	return blocks;
}

export async function getPageBlocks(pageId: string): Promise<NotionBlock[]> {
	const cacheKey = `blocks_${pageId}`;
	const cached = getCached<NotionBlock[]>(cacheKey);
	if (cached) return cached;

	const blocks = await fetchBlockChildren(pageId);
	setCached(cacheKey, blocks);
	return blocks;
}
