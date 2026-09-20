export interface BlogPost {
	id: string;
	readingTime: number;
	slug: string;
	title: string;
	excerpt: string;
	featuredImage?: string;
	categories: string[];
	tags: string[];
	status: 'draft' | 'published';
	publishedAt?: string;
	createdAt: string;
	updatedAt: string;
}

export interface BlogPostFilter {
	status?: 'draft' | 'published';
	category?: string;
	tag?: string;
	search?: string;
}
