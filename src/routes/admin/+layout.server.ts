import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { isAuthenticated } from '$lib/server/auth';

export const load: LayoutServerLoad = async (event) => {
    // Allow access to login page without authentication
    if (event.url.pathname === '/admin/login') {
        return {};
    }

    // Check authentication for all other admin pages
    if (!isAuthenticated(event)) {
        throw redirect(302, '/admin/login');
    }

    return {
        isAuthenticated: true
    };
};
