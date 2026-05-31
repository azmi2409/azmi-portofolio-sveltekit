import { Client } from '@notionhq/client';
const notion = new Client({ auth: 'test' });
console.log('Notion.dataSources keys:', Object.keys(notion.dataSources || {}));
