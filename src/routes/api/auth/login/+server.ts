import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { validateCredentials, createSession } from '$lib/server/auth';

export const POST: RequestHandler = async (event) => {
    const { username, password } = await event.request.json();

    if (!username || !password) {
        return json({ error: 'Username and password are required' }, { status: 400 });
    }

    const isValid = await validateCredentials(username, password);

    if (!isValid) {
        return json({ error: 'Invalid credentials' }, { status: 401 });
    }

    createSession(event);

    return json({ success: true });
};
