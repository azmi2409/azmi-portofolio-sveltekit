import type { Experiment, Project, SiteMetric } from '$lib/types/portfolio';

export const fallbackProjects: Project[] = [
	{
		id: 'codexia-live',
		notionPageId: 'codexia-live',
		name: 'Codexia Live',
		slug: 'codexia-live',
		published: true,
		featured: true,
		year: '2025',
		role: 'Lead Engineer / AI Systems Architect',
		type: 'Real-time AI coaching platform',
		status: 'Shipped MVP',
		stack: ['SvelteKit', 'TypeScript', 'WebSockets', 'Google Cloud Run', 'LLM tool calls'],
		summary:
			'A real-time coding coach that watches friction signals and responds with progressive hints instead of handing over answers.',
		outcome:
			'Converted an open-ended AI tutor idea into a low-latency coaching loop with measurable intervention points.',
		cover: undefined,
		liveUrl: undefined,
		githubUrl: undefined,
		sortOrder: 1,
		problem:
			'Most coding tutors either wait for a prompt or reveal too much. The product needed to detect when a learner was stuck and intervene with the smallest useful hint.',
		constraints: [
			'Keep perceived latency low enough for a live learning session.',
			'Handle partial context, silence, and typing pauses without over-triggering.',
			'Keep the workflow explainable to product and curriculum teams.'
		],
		approach:
			'Modeled the session as an event stream, separated signal detection from response generation, and used staged prompts for nudge, hint, and explanation modes.',
		architecture:
			'SvelteKit UI streams learner events to a Cloud Run service over WebSockets. The orchestration layer scores friction signals, retrieves relevant exercise context, calls tools when needed, and emits coaching responses back to the UI.',
		technicalDecisions: [
			'Used WebSockets for bidirectional session state instead of polling.',
			'Kept intervention policy outside the UI so product rules could evolve independently.',
			'Designed prompts around progressive disclosure to reduce answer leakage.'
		],
		keyFeatures: [
			'Friction-signal detection from typing pauses and silence.',
			'Progressive hints with escalation paths.',
			'Session timeline for debugging agent behavior.'
		],
		result:
			'A credible MVP architecture for live AI coaching, with the system behavior visible enough to tune safely.',
		lessonsLearned:
			'Agentic products need observable policy decisions. Without a readable event timeline, prompt quality becomes guesswork.'
	},
	{
		id: 'futurelab-ai-workflows',
		notionPageId: 'futurelab-ai-workflows',
		name: 'FutureLab AI Workflows',
		slug: 'futurelab-ai-workflows',
		published: true,
		featured: true,
		year: '2023-2025',
		role: 'Senior Full Stack Engineer',
		type: 'B2B mentoring and learning platform',
		status: 'Production',
		stack: ['Ruby on Rails', 'PostgreSQL', 'AWS', 'OpenAI', 'RSpec'],
		summary:
			'AI-assisted transcription, summarization, and workflow automation for mentoring operations and B2B delivery.',
		outcome:
			'Helped product and operations teams turn session data into summaries, follow-ups, and delivery visibility.',
		cover: undefined,
		liveUrl: 'https://futurelab.my',
		githubUrl: undefined,
		sortOrder: 2,
		problem:
			'Mentoring sessions produced valuable context, but too much of it disappeared into manual notes and follow-up work.',
		constraints: [
			'Integrate AI into an existing Rails product without destabilizing core flows.',
			'Keep outputs reviewable for operations teams.',
			'Control cloud and model costs as usage grows.'
		],
		approach:
			'Built service objects around transcription and summarization jobs, added tests around edge cases, and treated AI output as reviewable product data rather than magic text.',
		architecture:
			'Rails workers process recordings and session metadata, call model services, persist generated summaries, and expose review states inside existing admin workflows.',
		technicalDecisions: [
			'Wrapped model calls in tested service boundaries.',
			'Used asynchronous jobs for long-running transcription and summarization.',
			'Optimized AWS resources and database access patterns alongside feature work.'
		],
		keyFeatures: [
			'AI-generated session summaries.',
			'Operational review flow for generated content.',
			'Cost-conscious background processing.'
		],
		result:
			'Introduced practical AI workflows into production while keeping the platform maintainable for a small engineering team.',
		lessonsLearned:
			'The best AI features often look like boring workflow software: queues, retries, review states, and clear ownership.'
	},
	{
		id: 'portfolio-system',
		notionPageId: 'portfolio-system',
		name: 'Portfolio Content System',
		slug: 'portfolio-content-system',
		published: true,
		featured: true,
		year: '2026',
		role: 'Designer / Engineer',
		type: 'Personal knowledge and case-study CMS',
		status: 'Live',
		stack: ['SvelteKit', 'Notion API', 'Server load functions', 'Tailwind CSS'],
		summary:
			'A server-rendered portfolio architecture that keeps project data in Notion while preserving a fast custom frontend.',
		outcome:
			'Creates a maintainable publishing workflow for case studies, experiments, and technical notes without exposing Notion credentials.',
		cover: undefined,
		liveUrl: 'https://azmi.web.id',
		githubUrl: 'https://github.com/azmimuwahid',
		sortOrder: 3,
		problem:
			'The previous one-page portfolio looked polished but did not provide enough depth for senior engineering evaluation.',
		constraints: [
			'Keep SvelteKit and working code.',
			'Keep Notion API calls server-side only.',
			'Avoid heavy animation dependencies and scroll hijacking.'
		],
		approach:
			'Split the site into focused routes, moved content into server-loaded project records, and added a lightweight systems interaction to explain the positioning.',
		architecture:
			'SvelteKit routes call server-only Notion modules. Components render local design, cards, motion, and Notion blocks without exposing tokens to the browser.',
		technicalDecisions: [
			'Use server load functions for CMS access.',
			'Provide local fallback content for reliable builds.',
			'Use CSS/SVG motion instead of heavier 3D.'
		],
		keyFeatures: ['Case-study routes', 'Notion-backed project listings', 'AI Systems Map'],
		result: 'A deeper portfolio structure that is easier to evaluate, edit, and deploy.',
		lessonsLearned:
			'A senior portfolio should show constraints and decisions, not just outcomes and logos.'
	}
];

export const fallbackExperiments: Experiment[] = [
	{
		id: 'agent-timeline-debugger',
		notionPageId: 'agent-timeline-debugger',
		name: 'Agent Timeline Debugger',
		slug: 'agent-timeline-debugger',
		published: true,
		year: '2026',
		status: 'Prototype',
		stack: ['SvelteKit', 'Event streams', 'LLM observability'],
		summary:
			'A small interface pattern for inspecting agent decisions, tool calls, retrieved context, and final output in one timeline.',
		outcome: 'Clarifies why an agent acted before trying to improve prompts.',
		cover: undefined,
		sortOrder: 1
	},
	{
		id: 'voice-latency-budget',
		notionPageId: 'voice-latency-budget',
		name: 'Voice Latency Budget',
		slug: 'voice-latency-budget',
		published: true,
		year: '2025',
		status: 'Research note',
		stack: ['Web Audio', 'Streaming', 'Realtime UX'],
		summary:
			'A practical breakdown of where milliseconds disappear in browser-to-model-to-speaker loops.',
		outcome: 'A checklist for making voice AI feel responsive instead of merely functional.',
		cover: undefined,
		sortOrder: 2
	}
];

export const proofMetrics: SiteMetric[] = [
	{
		value: 'Sub-second',
		label: 'Codexia Live coaching loop target',
		detail: 'Designed around live learner events, not delayed chat-style prompts.'
	},
	{
		value: 'Reviewable',
		label: 'FutureLab AI outputs',
		detail: 'AI summaries enter product workflows with human review states.'
	},
	{
		value: 'Server-only',
		label: 'Portfolio CMS integration',
		detail: 'Notion tokens stay inside SvelteKit load functions and server modules.'
	}
];
