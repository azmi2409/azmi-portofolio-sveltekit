import pkg from '@notionhq/client';
console.log('Package keys:', Object.keys(pkg || {}));
if (pkg && pkg.Client) {
    console.log('Client found in default export');
}

import { Client } from '@notionhq/client';
console.log('Named Client:', typeof Client);
if (Client) {
    try {
        const notion = new Client({ auth: 'test' });
        console.log('Notion object created');
        console.log('notion.databases:', typeof notion.databases);
        if (notion.databases) {
            console.log('notion.databases.query:', typeof notion.databases.query);
        }
    } catch (e) {
        console.log('Error creating client:', e.message);
    }
}
