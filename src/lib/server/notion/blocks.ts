import { notion } from './client';
import type { NotionBlock } from '$lib/types/blog';

async function fetchBlockChildren(blockId: string): Promise<NotionBlock[]> {
	if (!notion) return [];
	const blocks: NotionBlock[] = [];
	let cursor: string | undefined;

	do {
		const response = await notion.blocks.children.list({
			block_id: blockId,
			page_size: 100,
			...(cursor ? { start_cursor: cursor } : {})
		});

		for (const block of response.results as any[]) {
			const typedBlock: NotionBlock = {
				id: block.id,
				type: block.type,
				has_children: block.has_children,
				...block
			};

			if (block.has_children) typedBlock.children = await fetchBlockChildren(block.id);
			blocks.push(typedBlock);
		}

		cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
	} while (cursor);

	return blocks;
}

export async function getPageBlocks(pageId: string): Promise<NotionBlock[]> {
	return fetchBlockChildren(pageId);
}
