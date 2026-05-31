// Diagnostic: try retrieveMarkdown and other v5 ways to get page content
import { Client } from '@notionhq/client';
import 'dotenv/config';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const PAGE_ID = '346d3c21-8f76-800e-a8c1-db902f024ed0'; // From first test

async function inspect() {
	// Test 1: pages.retrieveMarkdown
	console.log('=== TEST 1: pages.retrieveMarkdown ===');
	try {
		const md = await notion.pages.retrieveMarkdown({ page_id: PAGE_ID });
		console.log('Keys:', Object.keys(md));
		console.log('Type:', typeof md.markdown);
		if (md.markdown) {
			console.log('Markdown preview:', md.markdown.slice(0, 500));
		} else {
			console.log('Full result:', JSON.stringify(md, null, 2).slice(0, 500));
		}
	} catch (e) {
		console.error('retrieveMarkdown error:', e.message);
	}

	// Test 2: pages.retrieve to see if there's content embedded
	console.log('\n=== TEST 2: pages.retrieve ===');
	try {
		const page = await notion.pages.retrieve({ page_id: PAGE_ID });
		console.log('Page keys:', Object.keys(page));
	} catch (e) {
		console.error('pages.retrieve error:', e.message);
	}
}

inspect();
