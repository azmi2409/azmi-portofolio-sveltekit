import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { isAuthenticated } from '$lib/server/auth';
import { writeFileSync } from 'fs';
import { join } from 'path';

export const POST: RequestHandler = async (event) => {
    if (!isAuthenticated(event)) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const formData = await event.request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return json({ error: 'No file provided' }, { status: 400 });
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            return json({ error: 'Invalid file type. Only images are allowed.' }, { status: 400 });
        }

        // Generate unique filename
        const timestamp = Date.now();
        const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const filename = `${timestamp}-${originalName}`;

        // Save file
        const uploadPath = join(process.cwd(), 'static', 'uploads', filename);
        const buffer = Buffer.from(await file.arrayBuffer());
        writeFileSync(uploadPath, buffer);

        // Return URL
        const url = `/uploads/${filename}`;
        return json({ url });
    } catch (error) {
        console.error('Error uploading file:', error);
        return json({ error: 'Failed to upload file' }, { status: 500 });
    }
};
