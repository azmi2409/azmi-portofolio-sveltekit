import type { NotionBlock } from './blog';

export interface Project {
	id: string;
	notionPageId: string;
	name: string;
	slug: string;
	published: boolean;
	featured: boolean;
	year: string;
	role: string;
	type: string;
	status: string;
	stack: string[];
	summary: string;
	outcome: string;
	cover?: string;
	liveUrl?: string;
	githubUrl?: string;
	sortOrder: number;
	problem: string;
	constraints: string[];
	approach: string;
	architecture: string;
	technicalDecisions: string[];
	keyFeatures: string[];
	result: string;
	lessonsLearned: string;
	blocks?: NotionBlock[];
}

export interface Experiment {
	id: string;
	notionPageId: string;
	name: string;
	slug: string;
	published: boolean;
	year: string;
	status: string;
	stack: string[];
	summary: string;
	outcome: string;
	cover?: string;
	sortOrder: number;
}

export interface SiteMetric {
	value: string;
	label: string;
	detail: string;
}
