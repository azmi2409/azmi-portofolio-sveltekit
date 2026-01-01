import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { posts } from '../src/lib/server/schema.ts';
import 'dotenv/config';

const client = postgres(process.env.DATABASE_URL);
const db = drizzle(client);

async function seedPosts() {
	console.log('🌱 Seeding posts...');

	const now = new Date();
	
    try {
        await db.insert(posts).values({
            slug: 'welcome-to-my-new-blog',
            title: 'Welcome to My New Blog',
            excerpt: 'This is the first post on my new SvelteKit blog powered by Supabase and Drizzle ORM.',
            content: '# Welcome!\n\nThis blog is now running on a real database. \n\n## Features\n- Supabase PostgreSQL\n- Drizzle ORM\n- Markdown support\n- Dark mode compatible',
            featuredImage: 'https://images.unsplash.com/photo-1499750310159-5b600aaf0320?auto=format&fit=crop&q=80&w=2000',
            author: 'Azmi',
            status: 'published',
            categories: ['Tech', 'SvelteKit'],
            tags: ['supabase', 'drizzle', 'webdev'],
            createdAt: now,
            updatedAt: now,
            publishedAt: now
        });
        console.log('✅ Sample post created');
    } catch (e) {
        console.log('ℹ️  Sample post might already exist:', e.message);
    }

	console.log('✨ Post seeding complete!');
	process.exit(0);
}

seedPosts().catch((error) => {
	console.error('❌ Seeding failed:', error);
	process.exit(1);
});
