import { Client } from '@notionhq/client';
const notion = new Client({ auth: 'test' });
console.log('Notion root keys:', Object.keys(notion));
console.log('Notion.databases keys:', Object.keys(notion.databases || {}));
console.log('Notion.blocks keys:', Object.keys(notion.blocks || {}));
console.log('Notion.pages keys:', Object.keys(notion.pages || {}));
