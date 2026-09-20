import type { Experiment } from '$lib/types/portfolio';

export const experiments: Experiment[] = [
	{
		id: 'ai-showdown',
		name: 'AI Showdown',
		slug: 'ai-showdown',
		published: true,
		year: '2026',
		status: 'Open source',
		stack: ['React', 'TypeScript', 'Express', 'SSE', 'Chess.js', 'LLM tool calls'],
		summary:
			'A live chess arena for comparing model strategy, tool use, latency, recovery behavior, and tournament performance.',
		outcome:
			'Runs model-versus-model duels, knockout and round-robin tournaments, PGN export, telemetry inspection, and dynamic Elo ratings.',
		cover: '/images/projects/ai-showdown.webp',
		coverAlt: 'AI Showdown lightning crest artwork from the open-source project.',
		githubUrl: 'https://github.com/azmi2409/ai-showdown',
		sortOrder: 1
	},
	{
		id: 'agent-timeline-debugger',
		name: 'Agent Timeline Debugger',
		slug: 'agent-timeline-debugger',
		published: true,
		year: '2026',
		status: 'Prototype',
		stack: ['SvelteKit', 'Event streams', 'LLM observability'],
		summary:
			'A small interface pattern for inspecting agent decisions, tool calls, retrieved context, and final output in one timeline.',
		outcome: 'Clarifies why an agent acted before trying to improve prompts.',
		cover: '/images/projects/agent-timeline.webp',
		coverAlt:
			'Generated visualization of an agent timeline with context, policy, tool call, response, and telemetry stages.',
		sortOrder: 2
	},
	{
		id: 'voice-latency-budget',
		name: 'Voice Latency Budget',
		slug: 'voice-latency-budget',
		published: true,
		year: '2025',
		status: 'Research note',
		stack: ['Web Audio', 'Streaming', 'Realtime UX'],
		summary:
			'A practical breakdown of where milliseconds disappear in browser-to-model-to-speaker loops.',
		outcome: 'A checklist for making voice AI feel responsive instead of merely functional.',
		cover: '/images/projects/voice-latency.webp',
		coverAlt:
			'Generated visualization of a voice latency analyzer with audio waveform and processing waterfall.',
		sortOrder: 3
	}
];
