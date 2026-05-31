import type { BlogPost, NotionRichText } from '$lib/types/blog';
import type { Experiment, Project } from '$lib/types/portfolio';

type NotionPage = any;

export function richTextToPlain(richTexts: NotionRichText[] | any[] | undefined): string {
	if (!Array.isArray(richTexts) || richTexts.length === 0) return '';
	return richTexts.map((rt) => rt.plain_text ?? '').join('');
}

function checkbox(value: unknown): boolean {
	return Boolean((value as any)?.checkbox);
}

function numberValue(value: unknown): number {
	return Number((value as any)?.number ?? 0);
}

function text(value: unknown): string {
	const prop = value as any;
	return richTextToPlain(prop?.rich_text ?? prop?.title ?? []) || prop?.select?.name || '';
}

function dateText(value: unknown): string {
	return (value as any)?.date?.start ?? text(value);
}

function url(value: unknown): string | undefined {
	return (value as any)?.url || undefined;
}

function fileUrl(value: unknown): string | undefined {
	const file = (value as any)?.files?.[0];
	if (!file) return undefined;
	return file.type === 'external' ? file.external?.url : file.file?.url;
}

function multiSelect(value: unknown): string[] {
	return ((value as any)?.multi_select ?? []).map((item: { name: string }) => item.name);
}

function cover(page: NotionPage): string | undefined {
	if (!page.cover) return undefined;
	return page.cover.type === 'external' ? page.cover.external?.url : page.cover.file?.url;
}

function listFromText(value: string): string[] {
	return value
		.split('\n')
		.map((item) => item.trim())
		.filter(Boolean);
}

export function mapPageToProject(page: NotionPage): Project {
	const props = page.properties ?? {};
	const slug = text(props.Slug) || page.id;

	return {
		id: page.id,
		notionPageId: page.id,
		name: text(props.Name) || 'Untitled project',
		slug,
		published: checkbox(props.Published),
		featured: checkbox(props.Featured),
		year: dateText(props.Year) || '',
		role: text(props.Role),
		type: text(props.Type),
		status: text(props.Status),
		stack: multiSelect(props.Stack),
		summary: text(props.Summary),
		outcome: text(props.Outcome),
		cover: cover(page) || fileUrl(props.Cover) || url(props.Cover),
		liveUrl: url(props['Live URL']),
		githubUrl: url(props['GitHub URL']),
		sortOrder: numberValue(props['Sort Order']),
		problem: text(props.Problem),
		constraints: listFromText(text(props.Constraints)),
		approach: text(props.Approach),
		architecture: text(props.Architecture),
		technicalDecisions: listFromText(text(props['Technical Decisions'])),
		keyFeatures: listFromText(text(props['Key Features'])),
		result: text(props.Result),
		lessonsLearned: text(props['Lessons Learned'])
	};
}

export function mapPageToExperiment(page: NotionPage): Experiment {
	const props = page.properties ?? {};

	return {
		id: page.id,
		notionPageId: page.id,
		name: text(props.Name) || 'Untitled experiment',
		slug: text(props.Slug) || page.id,
		published: checkbox(props.Published),
		year: dateText(props.Year) || '',
		status: text(props.Status),
		stack: multiSelect(props.Stack),
		summary: text(props.Summary),
		outcome: text(props.Outcome),
		cover: cover(page) || fileUrl(props.Cover) || url(props.Cover),
		sortOrder: numberValue(props['Sort Order'])
	};
}

export function mapPageToBlogPost(page: NotionPage): BlogPost {
	const props = page.properties ?? {};
	const title = richTextToPlain(props?.Name?.title ?? []) || 'Untitled';
	const slug = richTextToPlain(props?.Slug?.rich_text ?? []);
	const statusName: string = props?.Status?.select?.name ?? 'Draft';

	return {
		id: page.id,
		notionPageId: page.id,
		slug: slug || page.id,
		title,
		excerpt: richTextToPlain(props?.Excerpt?.rich_text ?? []),
		featuredImage: cover(page),
		categories: (props?.Category?.multi_select ?? []).map((s: { name: string }) => s.name),
		tags: (props?.Tags?.multi_select ?? []).map((s: { name: string }) => s.name),
		status: statusName.toLowerCase() === 'published' ? 'published' : 'draft',
		publishedAt: props?.['Published Date']?.date?.start ?? undefined,
		createdAt: page.created_time,
		updatedAt: page.last_edited_time
	};
}
