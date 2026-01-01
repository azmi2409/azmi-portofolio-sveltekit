import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { DATABASE_URL } from '$env/static/private';

// Create postgres connection
const client = postgres(DATABASE_URL);

// Create drizzle instance
export const db = drizzle(client, { schema });
