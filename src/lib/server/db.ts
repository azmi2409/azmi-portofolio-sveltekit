import { db } from './drizzle';
import { posts, users } from './schema';
import type { BlogPost, BlogPostInput, BlogPostFilter } from '$lib/types/blog';
import slugify from 'slugify';
import { eq, and, or, like, desc, sql } from 'drizzle-orm';

function generateSlug(title: string): string {
	return slugify(title, { lower: true, strict: true });
}

export async function getAllPosts(filter?: BlogPostFilter): Promise<BlogPost[]> {
	let query = db.select().from(posts);

	// Build where conditions
	const conditions = [];

	if (filter?.status) {
		conditions.push(eq(posts.status, filter.status));
	}

	if (filter?.category) {
		conditions.push(sql`${filter.category} = ANY(${posts.categories})`);
	}

	if (filter?.tag) {
		conditions.push(sql`${filter.tag} = ANY(${posts.tags})`);
	}

	if (filter?.search) {
		const searchPattern = `%${filter.search}%`;
		conditions.push(
			or(
				like(posts.title, searchPattern),
				like(posts.excerpt, searchPattern),
				like(posts.content, searchPattern)
			)
		);
	}

	if (conditions.length > 0) {
		query = query.where(and(...conditions)) as any;
	}

	const result = await query.orderBy(desc(posts.createdAt));

	return result.map((post) => ({
		id: post.id,
		slug: post.slug,
		title: post.title,
		excerpt: post.excerpt,
		content: post.content,
		featuredImage: post.featuredImage || undefined,
		author: post.author,
		status: post.status as 'draft' | 'published',
		categories: post.categories || [],
		tags: post.tags || [],
		createdAt: post.createdAt.toISOString(),
		updatedAt: post.updatedAt.toISOString(),
		publishedAt: post.publishedAt?.toISOString()
	}));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
	const result = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1);

	if (result.length === 0) {
		return null;
	}

	const post = result[0];
	return {
		id: post.id,
		slug: post.slug,
		title: post.title,
		excerpt: post.excerpt,
		content: post.content,
		featuredImage: post.featuredImage || undefined,
		author: post.author,
		status: post.status as 'draft' | 'published',
		categories: post.categories || [],
		tags: post.tags || [],
		createdAt: post.createdAt.toISOString(),
		updatedAt: post.updatedAt.toISOString(),
		publishedAt: post.publishedAt?.toISOString()
	};
}

export async function getPostById(id: string): Promise<BlogPost | null> {
	const result = await db.select().from(posts).where(eq(posts.id, id)).limit(1);

	if (result.length === 0) {
		return null;
	}

	const post = result[0];
	return {
		id: post.id,
		slug: post.slug,
		title: post.title,
		excerpt: post.excerpt,
		content: post.content,
		featuredImage: post.featuredImage || undefined,
		author: post.author,
		status: post.status as 'draft' | 'published',
		categories: post.categories || [],
		tags: post.tags || [],
		createdAt: post.createdAt.toISOString(),
		updatedAt: post.updatedAt.toISOString(),
		publishedAt: post.publishedAt?.toISOString()
	};
}

export async function createPost(input: BlogPostInput): Promise<BlogPost> {
	const slug = generateSlug(input.title);
	const now = new Date();

	const result = await db
		.insert(posts)
		.values({
			slug,
			title: input.title,
			excerpt: input.excerpt,
			content: input.content,
			featuredImage: input.featuredImage,
			author: input.author,
			status: input.status,
			categories: input.categories,
			tags: input.tags,
			createdAt: now,
			updatedAt: now,
			publishedAt: input.status === 'published' ? now : null
		})
		.returning();

	const post = result[0];
	return {
		id: post.id,
		slug: post.slug,
		title: post.title,
		excerpt: post.excerpt,
		content: post.content,
		featuredImage: post.featuredImage || undefined,
		author: post.author,
		status: post.status as 'draft' | 'published',
		categories: post.categories || [],
		tags: post.tags || [],
		createdAt: post.createdAt.toISOString(),
		updatedAt: post.updatedAt.toISOString(),
		publishedAt: post.publishedAt?.toISOString()
	};
}

export async function updatePost(id: string, input: Partial<BlogPostInput>): Promise<BlogPost | null> {
	const existingPost = await getPostById(id);
	if (!existingPost) {
		return null;
	}

	const now = new Date();
	const wasPublished = existingPost.status === 'published';
	const isNowPublished = input.status === 'published';

	const updateData: any = {
		...input,
		updatedAt: now,
		slug: input.title ? generateSlug(input.title) : existingPost.slug
	};

	// Set publishedAt if transitioning from draft to published
	if (!wasPublished && isNowPublished) {
		updateData.publishedAt = now;
	} else if (!isNowPublished) {
		updateData.publishedAt = null;
	}

	const result = await db.update(posts).set(updateData).where(eq(posts.id, id)).returning();

	if (result.length === 0) {
		return null;
	}

	const post = result[0];
	return {
		id: post.id,
		slug: post.slug,
		title: post.title,
		excerpt: post.excerpt,
		content: post.content,
		featuredImage: post.featuredImage || undefined,
		author: post.author,
		status: post.status as 'draft' | 'published',
		categories: post.categories || [],
		tags: post.tags || [],
		createdAt: post.createdAt.toISOString(),
		updatedAt: post.updatedAt.toISOString(),
		publishedAt: post.publishedAt?.toISOString()
	};
}

export async function deletePost(id: string): Promise<boolean> {
	const result = await db.delete(posts).where(eq(posts.id, id)).returning();
	return result.length > 0;
}

// User management functions
export async function getUserByUsername(username: string) {
	const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
	return result.length > 0 ? result[0] : null;
}

export async function createUser(username: string, passwordHash: string, email?: string) {
	const result = await db
		.insert(users)
		.values({
			username,
			passwordHash,
			email
		})
		.returning();
	return result[0];
}
