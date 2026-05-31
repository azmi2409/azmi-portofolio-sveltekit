// Check if the page genuinely has no content vs a permissions/API issue
import { Client } from '@notionhq/client';
import 'dotenv/config';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const PAGE_ID = '346d3c21-8f76-800e-a8c1-db902f024ed0';

async function inspect() {
    // Try blocks.children.list with explicit raw response logging
    console.log('=== blocks.children.list (fully raw) ===');
    try {
        const resp = await notion.blocks.children.list({
            block_id: PAGE_ID,
            page_size: 100
        });
        console.log('Full response:', JSON.stringify(resp, null, 2).slice(0, 3000));
    } catch (e) {
        console.error('Error:', e.message, e.code, e.status);
    }
}

inspect();
