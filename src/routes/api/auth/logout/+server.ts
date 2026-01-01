import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { destroySession } from '$lib/server/auth';

export const POST: RequestHandler = async (event) => {
    destroySession(event);
    return json({ success: true });
};
