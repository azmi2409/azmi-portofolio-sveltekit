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
		sortOrder: 2,
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
		featured: false,
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
		sortOrder: 5,
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
		featured: false,
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
		sortOrder: 6,
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
	},
	{
		id: 'kilat-store',
		notionPageId: 'kilat-store',
		name: 'Kilat.store',
		slug: 'kilat-store',
		published: true,
		featured: true,
		year: '2024-2025',
		role: 'Full Stack Engineer & AI Integrator',
		type: 'AI-Powered Website Builder',
		status: 'Production-ready',
		stack: ['Next.js 15', 'Puck Editor', 'Astro 4', 'Ruby on Rails 8', 'Terraform', 'Alibaba Cloud'],
		summary:
			'An AI-powered website builder allowing Indonesian small-medium businesses (UMKMs) to construct their business landing pages in 60 seconds.',
		outcome:
			'Successfully built a multi-tenant platform with visual editor capabilities and automated generation pipelines, lowering the digital commerce entry barrier.',
		cover: undefined,
		liveUrl: 'https://kilat.store',
		githubUrl: undefined,
		sortOrder: 1,
		problem:
			'Indonesian MSMEs lack the technical resources to design and build websites, while generic builders are too complex or expensive.',
		constraints: [
			'Must run smoothly on low-end mobile devices.',
			'Generation and editing flow must feel instantaneous under volatile cellular networks.',
			'Maintain extremely low hosting costs for client landing pages.'
		],
		approach:
			'Designed a modular, JSON-based SSoT (Single Source of Truth) block schema shared between the Next.js visual editor and the backend AI generation pipeline.',
		architecture:
			'A monorepo comprising an Astro marketing site, Next.js editor UI powered by Puck Editor, Vite admin portal, and Ruby on Rails 8 REST API handling background jobs (Solid Queue/Solid Cache) for DashScope/BytePlus AI pipelines. Wildcard client domains map to static HTML via DCDN.',
		technicalDecisions: [
			'Shared blocks.json registry as single source of truth.',
			'Asynchronous AI generation via Rails Solid Queue to prevent timeouts.',
			'Utilized Terraform to provision Alibaba Cloud ECI and DCDN for static site delivery.'
		],
		keyFeatures: [
			'60-second AI landing page generation.',
			'Interactive block-based Puck Editor canvas.',
			'Automatic publishing to *.kilat.my.id subdomains.'
		],
		result:
			'Enabled seamless generation of high-quality landing pages with microsecond rendering speeds across Indonesia.',
		lessonsLearned:
			'Sharing block specifications between the AI prompt templates and editor schema simplifies synchronization when introducing new UI modules.'
	},
	{
		id: 'openai-embedding',
		notionPageId: 'openai-embedding',
		name: 'AI Mentor Matcher',
		slug: 'ai-mentor-matcher',
		published: true,
		featured: false,
		year: '2024',
		role: 'AI Developer',
		type: 'Semantic search & matching engine',
		status: 'Prototype',
		stack: ['Next.js', 'OpenAI API', 'Prisma', 'PostgreSQL', 'pgvector'],
		summary:
			'An intelligent matchmaking platform pairing mentors and mentees based on professional goals, industry experience, and skill profiles.',
		outcome:
			'Developed a dual-mode search engine combining traditional keyword searches with high-dimensional vector embeddings for superior semantic relevance.',
		cover: undefined,
		liveUrl: undefined,
		githubUrl: undefined,
		sortOrder: 7,
		problem:
			'Traditional keyword matching fails when mentors and mentees use different terminology for similar concepts or career aspirations.',
		constraints: [
			'Keep response latency low for live searches.',
			'Prisma-compatible vector storage and similarity scoring.',
			'Mitigate API cost overhead of generating search query embeddings.'
		],
		approach:
			'Leveraged PostgreSQL pgvector plugin to calculate cosine similarity (<=>) between high-dimensional vector embeddings generated by OpenAI.',
		architecture:
			'A serverless Next.js App Router project querying a PostgreSQL database using Prisma ORM. Search queries are mapped to embeddings on-the-fly and processed in-database via pgvector.',
		technicalDecisions: [
			'Utilized text-embedding-ada-002 for robust and cost-effective embeddings.',
			'Implemented raw SQL similarity queries via Prisma $queryRaw for precise similarity control.',
			'Created a hybrid approach fallback using full-text search when database connections or API rates limit vector queries.'
		],
		keyFeatures: [
			'High-dimensional vector embedding search.',
			'Semantic similarity threshold controls.',
			'Full-text keyword fallback match queries.'
		],
		result:
			'Highly accurate mentor matching that surfaces relevant mentors even without exact phrase matches.',
		lessonsLearned:
			'Direct vector math on the database layer significantly outperforms in-memory comparisons as the dataset grows.'
	},
	{
		id: 'video-clipper',
		notionPageId: 'video-clipper',
		name: 'AIClipper.video',
		slug: 'ai-clipper-video',
		published: true,
		featured: true,
		year: '2025',
		role: 'Full Stack Engineer',
		type: 'Automated video cropping platform',
		status: 'Shipped Beta',
		stack: [
			'Next.js 15',
			'Tailwind CSS v4',
			'AWS Lambda',
			'AWS Step Functions',
			'DynamoDB',
			'Groq Whisper',
			'FFmpeg'
		],
		summary:
			'An automated serverless SaaS platform converting long-form YouTube videos into viral vertical Shorts, optimized for mixed-language regional audiences.',
		outcome:
			'Delivered a fully automated media rendering pipeline that transcribes, isolates viral hooks, and crops landscape videos into portrait formats.',
		cover: undefined,
		liveUrl: undefined,
		githubUrl: undefined,
		sortOrder: 4,
		problem:
			'Content creators spend hours manually transcription-cropping videos for vertical formats, struggle with local slang transcriptions, and face high compute bills.',
		constraints: [
			'Serverless execution limits on Lambda (max 15 mins for heavy processing).',
			'High accuracy transcription of mixed Indonesian-English-Slang expressions.',
			'Interactive subtitle synchronization.'
		],
		approach:
			'Decoupled video processing into a serverless orchestrator using AWS Step Functions, dividing audio extraction, transcription, AI curation, and rendering into individual steps.',
		architecture:
			'A pnpm monorepo containing a Next.js 15 client authenticated by AWS Cognito, and a backend built on Serverless Framework with AWS Lambda, Step Functions, DynamoDB, Python, Groq Whisper API, DeepSeek curation model, and FFmpeg.',
		technicalDecisions: [
			'Used Groq Whisper API for lightning-fast word-level timestamped transcriptions.',
			'Selected DeepSeek via BytePlus/ModelArk to analyze transcript timelines and identify viral segments.',
			'Used Python (yt-dlp) and FFmpeg to segment and crop the original video stream efficiently.'
		],
		keyFeatures: [
			'AI-driven viral hook segment detection.',
			'Word-level timestamped dynamic subtitles.',
			'Fully serverless orchestration pipeline.'
		],
		result:
			'Reduced video editing workflow time from 30 minutes to under 2 minutes per clip.',
		lessonsLearned:
			'Decoupling compute-heavy FFmpeg tasks into independent AWS Step Functions prevents monolithic Lambda timeout errors and allows targeted resource scaling.'
	},
	{
		id: 'the-beddo-crm',
		notionPageId: 'the-beddo-crm',
		name: 'The Beddo AI-CRM',
		slug: 'the-beddo-crm',
		published: true,
		featured: true,
		year: '2026',
		role: 'Lead Full Stack & AI Engineer',
		type: 'Agentic B2B CRM',
		status: 'Active Beta',
		stack: ['Next.js 16', 'tRPC v11', 'Better Auth', 'Drizzle ORM', 'Stitch MCP', 'Hermes AI Agent'],
		summary:
			'An agentic B2B CRM for the mattress and bedding industry that balances autonomous AI customer interactions with transparent telemetry.',
		outcome:
			'Engineered a next-generation CRM inbox where human operators oversee autonomous lead extraction agents via live Model Context Protocol streams.',
		cover: undefined,
		liveUrl: undefined,
		githubUrl: undefined,
		sortOrder: 3,
		problem:
			'CRMs require excessive manual data entry, while AI automation lacks transparency, resulting in lost user trust when agents make mistakes.',
		constraints: [
			'Requires Node.js ^24.14.1 for modern V8 engine characteristics.',
			'Real-time visualization of agent tool calls without freezing the thread.',
			'Strict data integrity on customer record extraction.'
		],
		approach:
			'Adopted the "Cognitive Timber" design philosophy, focusing on agent transparency by embedding live telemetry logs directly in the user inbox UI.',
		architecture:
			'Next.js 16 app built in a pnpm monorepo using tRPC v11, Better Auth, and Drizzle ORM. The Hermes AI Agent acts via Stitch Model Context Protocol (MCP) to access tools like `extractLeadInfo`.',
		technicalDecisions: [
			'Implemented Stitch MCP design paradigm for modular and reusable agent tools.',
			'Switched to Drizzle ORM with postgres.js client to resolve local server pooling stability.',
			'Exposed raw agent telemetry (tool calling outputs) directly inside the workspace UI.'
		],
		keyFeatures: [
			'Stitch MCP Inbox for agentic interactions.',
			'Hermes AI Agent lead information extractor.',
			'Cognitive Timber interface with low mental friction.'
		],
		result:
			'Improved CRM data logging accuracy by 40% while maintaining operator confidence through visible tool-calling telemetry.',
		lessonsLearned:
			'Users trust autonomous agents when they can inspect the tools the agent selected and why. Transparency is a feature, not just a log.'
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
