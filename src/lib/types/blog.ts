export interface BlogPost {
	id: string;
	slug: string;
	title: string;
	excerpt: string;
	content: string;
	featuredImage?: string;
	author: string;
	status: 'draft' | 'published';
	categories: string[];
	tags: string[];
	createdAt: string;
	updatedAt: string;
	publishedAt?: string;
}

export interface BlogPostInput {
	title: string;
	excerpt: string;
	content: string;
	featuredImage?: string;
	author: string;
	status: 'draft' | 'published';
	categories: string[];
	tags: string[];
}

export interface BlogPostFilter {
	status?: 'draft' | 'published';
	category?: string;
	tag?: string;
	search?: string;
}
