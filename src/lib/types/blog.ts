export interface BlogPost {
	id: string; // Notion page ID
	notionPageId: string;
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

// Rich text annotation object from Notion
export interface NotionAnnotations {
	bold: boolean;
	italic: boolean;
	strikethrough: boolean;
	underline: boolean;
	code: boolean;
	color: string;
}

// A single rich text span from Notion
export interface NotionRichText {
	type: 'text' | 'mention' | 'equation';
	text?: { content: string; link: { url: string } | null };
	annotations: NotionAnnotations;
	plain_text: string;
	href: string | null;
}

// A single Notion block
export interface NotionBlock {
	id: string;
	type: string;
	has_children: boolean;
	children?: NotionBlock[];
	// Block-type content indexed by type
	[key: string]: unknown;
}

export interface BlogPostFilter {
	status?: 'draft' | 'published';
	category?: string;
	tag?: string;
	search?: string;
}
