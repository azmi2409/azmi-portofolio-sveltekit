// Diagnostic: log what dataSources.query returns for a result object
// and what blocks.children.list returns for a page
import { Client } from '@notionhq/client';
import 'dotenv/config';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const DATABASE_ID = process.env.NOTION_BLOG_DATABASE_ID;

async function inspect() {
	try {
		// Step 1: get data_source_id
		const database = await notion.databases.retrieve({ database_id: DATABASE_ID });
		console.log('Database keys (top-level):', Object.keys(database));
		console.log('data_sources:', JSON.stringify(database.data_sources, null, 2));

		if (!database.data_sources || database.data_sources.length === 0) {
			console.error('No data sources found!');
			return;
		}

		const dataSourceId = database.data_sources[0].id;
		console.log('\nUsing dataSourceId:', dataSourceId);

		// Step 2: query
		const response = await notion.dataSources.query({
			data_source_id: dataSourceId,
			page_size: 1
		});

		console.log('\nQuery results count:', response.results.length);
		if (response.results.length > 0) {
			const first = response.results[0];
			console.log('\nFirst result keys:', Object.keys(first));
			console.log('First result object:', JSON.stringify(first, null, 2).slice(0, 2000));

			// Step 3: try fetching blocks
			console.log('\n--- Attempting to fetch blocks with id:', first.id);
			try {
				const blocks = await notion.blocks.children.list({ block_id: first.id, page_size: 5 });
				console.log('Blocks found:', blocks.results.length);
				if (blocks.results.length > 0) {
					console.log('First block:', JSON.stringify(blocks.results[0], null, 2));
				}
			} catch (e) {
				console.error('Error fetching blocks:', e.message);
				console.error('Error code:', e.code);
			}
		}
	} catch (e) {
		console.error('Error:', e.message);
		console.error('Stack:', e.stack);
	}
}

inspect();
