export interface Project {
	id: string;
	name: string;
	slug: string;
	published: boolean;
	featured: boolean;
	year: string;
	role: string;
	ownership: string[];
	type: string;
	status: string;
	stack: string[];
	summary: string;
	outcome: string;
	cover?: string;
	coverAlt?: string;
	coverCaption?: string;
	liveUrl?: string;
	githubUrl?: string;
	sortOrder: number;
}

export interface Experiment {
	id: string;
	name: string;
	slug: string;
	published: boolean;
	year: string;
	status: string;
	stack: string[];
	summary: string;
	outcome: string;
	cover?: string;
	coverAlt?: string;
	liveUrl?: string;
	githubUrl?: string;
	sortOrder: number;
}

export interface SiteMetric {
	value: string;
	label: string;
	detail: string;
}
