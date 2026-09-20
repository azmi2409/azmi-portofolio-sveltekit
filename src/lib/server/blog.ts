import type { BlogPost } from '$lib/types/blog';

const metadata = import.meta.glob<Record<string, unknown>>('/src/content/blog/*.mdx', {
	eager: true,
	import: 'metadata'
});
const sources = import.meta.glob<string>('/src/content/blog/*.mdx', {
	eager: true,
	query: '?raw',
	import: 'default'
});

const posts: BlogPost[] = Object.entries(metadata)
	.map(([path, meta]) => {
		const slug = path
			.split('/')
			.pop()!
			.replace(/\.mdx$/, '');
		if (
			!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ||
			typeof meta.title !== 'string' ||
			!meta.title.trim() ||
			typeof meta.excerpt !== 'string' ||
			!['draft', 'published'].includes(String(meta.status)) ||
			typeof meta.publishedAt !== 'string' ||
			!Number.isFinite(Date.parse(meta.publishedAt)) ||
			!Array.isArray(meta.categories) ||
			!meta.categories.every((item) => typeof item === 'string') ||
			!Array.isArray(meta.tags) ||
			!meta.tags.every((item) => typeof item === 'string') ||
			(meta.updatedAt !== undefined &&
				(typeof meta.updatedAt !== 'string' || !Number.isFinite(Date.parse(meta.updatedAt)))) ||
			(meta.featuredImage !== undefined &&
				(typeof meta.featuredImage !== 'string' ||
					!/^(https:\/\/|\/(?!\/))/.test(meta.featuredImage)))
		) {
			throw new Error(`Invalid blog frontmatter: ${path}`);
		}
		const body = sources[path].replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '');
		return {
			id: slug,
			slug,
			title: meta.title,
			excerpt: meta.excerpt,
			status: meta.status as BlogPost['status'],
			publishedAt: meta.publishedAt,
			createdAt: meta.publishedAt,
			updatedAt: (meta.updatedAt as string | undefined) ?? meta.publishedAt,
			categories: meta.categories as string[],
			tags: meta.tags as string[],
			featuredImage: meta.featuredImage as string | undefined,
			readingTime: Math.max(1, Math.ceil((body.match(/\S+/g)?.length ?? 0) / 200))
		};
	})
	.sort((a, b) => Date.parse(b.publishedAt!) - Date.parse(a.publishedAt!));

export function getPublishedPosts() {
	return posts.filter((post) => post.status === 'published');
}

export function getPostBySlug(slug: string) {
	return getPublishedPosts().find((post) => post.slug === slug) ?? null;
}
