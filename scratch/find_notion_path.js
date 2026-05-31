import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
try {
	const path = require.resolve('@notionhq/client');
	console.log('Path to @notionhq/client:', path);
} catch (e) {
	console.log('Error resolving @notionhq/client:', e.message);
}
