import bcrypt from 'bcryptjs';
import type { RequestEvent } from '@sveltejs/kit';
import { getUserByUsername } from './db';

export async function hashPassword(password: string): Promise<string> {
	return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
	return bcrypt.compare(password, hash);
}

export async function validateCredentials(username: string, password: string): Promise<boolean> {
	const user = await getUserByUsername(username);
	
	if (!user) {
		return false;
	}

	return verifyPassword(password, user.passwordHash);
}

export function createSession(event: RequestEvent): void {
	event.cookies.set('admin_session', 'authenticated', {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 7 // 7 days
	});
}

export function destroySession(event: RequestEvent): void {
	event.cookies.delete('admin_session', { path: '/' });
}

export function isAuthenticated(event: RequestEvent): boolean {
	return event.cookies.get('admin_session') === 'authenticated';
}

export function requireAuth(event: RequestEvent): void {
	if (!isAuthenticated(event)) {
		throw new Error('Unauthorized');
	}
}
