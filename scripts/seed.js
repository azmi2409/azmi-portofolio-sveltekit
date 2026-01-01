import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import bcrypt from 'bcryptjs';
import { users } from '../src/lib/server/schema.ts';
import 'dotenv/config';

const client = postgres(process.env.DATABASE_URL);
const db = drizzle(client);

async function seed() {
	console.log('🌱 Seeding database...');

	// Create admin user
	const passwordHash = await bcrypt.hash('admin123', 10);
	
	try {
		await db.insert(users).values({
			username: 'admin',
			passwordHash,
			email: 'admin@example.com'
		});
		console.log('✅ Admin user created (username: admin, password: admin123)');
	} catch (error) {
		console.log('ℹ️  Admin user already exists or error:', error.message);
	}

	console.log('✨ Seeding complete!');
	process.exit(0);
}

seed().catch((error) => {
	console.error('❌ Seeding failed:', error);
	process.exit(1);
});
