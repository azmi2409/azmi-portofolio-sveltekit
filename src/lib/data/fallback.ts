import type { Experiment, Project, SiteMetric } from '$lib/types/portfolio';

const projectRecords: Project[] = [
	{
		id: 'codexia-live',
		notionPageId: 'codexia-live',
		name: 'Codexia Live',
		slug: 'codexia-live',
		published: true,
		featured: true,
		year: '2025',
		role: 'Lead Engineer / AI Systems Architect',
		ownership: [
			'Designed the event-driven coaching loop and WebSocket session flow.',
			'Built the intervention policy around staged nudges, hints, and explanations.',
			'Made agent behavior inspectable through a session timeline.'
		],
		type: 'Real-time AI coaching platform',
		status: 'Shipped MVP',
		stack: ['SvelteKit', 'TypeScript', 'WebSockets', 'Google Cloud Run', 'LLM tool calls'],
		summary:
			'A real-time coding coach that watches friction signals and responds with progressive hints instead of handing over answers.',
		outcome:
			'Built an event-driven coaching MVP that detects learner friction and delivers staged hints through a WebSocket session.',
		cover: undefined,
		coverAlt: 'No public Codexia Live product image is available.',
		liveUrl: undefined,
		githubUrl: undefined,
		sortOrder: 3,
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
		year: 'February 2023–present',
		role: 'Senior Software Engineer at FutureLab.my',
		ownership: [
			'Built the Rails service boundaries and background jobs for transcription and summarization.',
			'Integrated review states into existing operations workflows.',
			'Added test coverage around AI edge cases and failure paths.'
		],
		type: 'B2B mentoring and learning platform',
		status: 'Production',
		stack: ['Ruby on Rails', 'PostgreSQL', 'AWS', 'OpenAI', 'RSpec'],
		summary:
			'AI-assisted transcription, summarization, and workflow automation for mentoring operations and B2B delivery.',
		outcome:
			'Integrated asynchronous transcription and summarization into the existing Rails product, giving operations teams reviewable session insights without blocking mentoring workflows.',
		cover: '/images/projects/futurelab.webp',
		coverAlt:
			'FutureLab mentoring platform homepage showing its business mentoring and coaching product.',
		coverCaption: 'FutureLab’s live mentoring platform for organizations in Southeast Asia.',
		liveUrl: 'https://futurelab.my',
		githubUrl: undefined,
		sortOrder: 1,
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
		ownership: [
			'Designed and built the portfolio experience end to end.',
			'Implemented the server-only Notion content layer and local fallback data.',
			'Configured ISR caching and the Vercel deployment.'
		],
		type: 'Personal knowledge and case-study CMS',
		status: 'Live',
		stack: ['SvelteKit', 'Notion API', 'Server load functions', 'Tailwind CSS'],
		summary:
			'A server-rendered portfolio architecture that keeps project data in Notion while preserving a fast custom frontend.',
		outcome:
			'Creates a maintainable publishing workflow for case studies, experiments, and technical notes without exposing Notion credentials.',
		cover: '/images/projects/portfolio.webp',
		coverAlt:
			'Azmi Muwahid portfolio homepage with the AI systems headline and interactive system model.',
		coverCaption: 'The live portfolio interface and its interactive AI systems model.',
		liveUrl: 'https://azmi.web.id',
		githubUrl: 'https://github.com/azmi2409/azmi-portofolio-sveltekit',
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
		ownership: [
			'Designed the shared block schema used by the editor and AI generation pipeline.',
			'Built the visual editing flow and the Rails background-generation path.',
			'Provisioned the Alibaba Cloud delivery infrastructure with Terraform.'
		],
		type: 'AI website builder for Indonesian F&B',
		status: 'Free MVP',
		stack: [
			'Next.js 15',
			'Puck Editor',
			'Astro 4',
			'Ruby on Rails 8',
			'Terraform',
			'Alibaba Cloud'
		],
		summary:
			'An AI website builder for Indonesian cafes, warung, bakeries, restaurants, and local food brands.',
		outcome:
			'Built one flow from business brief to an editable, responsive F&B storefront with menu blocks, WhatsApp calls to action, and an instant Kilat subdomain.',
		cover: '/images/projects/kilat-store.webp',
		coverAlt: 'Live Kilat.store homepage showing its F&B website generator.',
		coverCaption: 'Captured from kilat.store in September 2026.',
		liveUrl: 'https://kilat.store',
		githubUrl: undefined,
		sortOrder: 2,
		problem:
			'Indonesian F&B merchants often rely on social media alone, while generic website builders make menu setup, mobile ordering, and publishing harder than necessary.',
		constraints: [
			'Must run smoothly on low-end mobile devices.',
			'Generation must still produce an editable starter when AI is slow or unavailable.',
			'The free MVP must keep publishing and ordering simple without paid-plan complexity.'
		],
		approach:
			'Designed a canonical JSON block schema shared by the AI generator, visual editor, and production renderer, then focused generation recipes on F&B menus and WhatsApp ordering.',
		architecture:
			'A monorepo combines the marketing site, Next.js editor powered by Puck, and a Rails API with background jobs for AI generation. Published storefronts use the same canonical block contracts shown in the editor and receive a shareable kill.lat subdomain.',
		technicalDecisions: [
			'Used one canonical block registry across generation, editing, and rendering.',
			'Moved AI generation to Rails background jobs to avoid request timeouts.',
			'Added a safe fallback F&B template instead of leaving merchants with a blank screen.'
		],
		keyFeatures: [
			'AI drafts grounded in business type, menu, location, audience, and visual style.',
			'Visual editing for copy, images, colors, and responsive content blocks.',
			'Menu, reservation, ordering, QR menu, and WhatsApp action blocks.',
			'Immediate publishing to a Kilat subdomain.'
		],
		result:
			'Launched a free MVP with public registration. Merchants can generate one F&B website, edit it visually, publish it to a kill.lat subdomain, and receive customer inquiries through WhatsApp.',
		lessonsLearned:
			'Sharing block specifications between the AI prompt templates and editor schema simplifies synchronization when introducing new UI modules.'
	},
	{
		id: 'iscylla-store',
		notionPageId: 'iscylla-store',
		name: 'iScylla Shop',
		slug: 'iscylla-store',
		published: true,
		featured: true,
		year: '2026',
		role: 'Founder / Full-Stack Engineer',
		ownership: [
			'Designed and built the bilingual digital-product storefront and customer account flows.',
			'Integrated QRIS checkout with tracked payment and order states.',
			'Built product catalog, inventory visibility, order history, receipts, and order-linked support.'
		],
		type: 'Digital commerce platform',
		status: 'Live',
		stack: ['Ruby on Rails', 'Tailwind CSS', 'QRIS', 'Cloudflare R2'],
		summary:
			'A bilingual Indonesian storefront for selected AI tools, productivity software, subscriptions, and other digital products.',
		outcome:
			'Launched a live commerce flow with transparent Rupiah pricing, product-level stock, QRIS payment, tracked orders, receipts, and support tied to each order.',
		cover: '/images/projects/iscylla-store.webp',
		coverAlt:
			'Live iScylla Shop homepage showing its digital product catalog and QRIS buying experience.',
		coverCaption: 'Captured from iscylla.web.id in September 2026.',
		liveUrl: 'https://iscylla.web.id',
		githubUrl: undefined,
		sortOrder: 4,
		problem:
			'Digital-product buyers need clear product terms, delivery methods, warranty information, payment status, and support after checkout instead of an informal chat-only purchase flow.',
		constraints: [
			'Keep checkout familiar for Indonesian buyers through QRIS and Rupiah pricing.',
			'Make stock, delivery method, duration, and warranty visible before purchase.',
			'Keep receipts, delivered access, and support context available in one customer account.'
		],
		approach:
			'Built the store around explicit product and order states: customers inspect terms, sign in, pay the exact QRIS amount, then follow fulfillment and support from their account.',
		architecture:
			'A Ruby on Rails storefront serves localized catalog and account flows. Product media is delivered through Cloudflare R2, while checkout connects QRIS confirmation to persisted order, receipt, delivery, and support records.',
		technicalDecisions: [
			'Required customer accounts so orders, receipts, and delivered access remain recoverable.',
			'Modeled support around an order to preserve purchase context.',
			'Placed stock, warranty, and delivery details on product pages before checkout.'
		],
		keyFeatures: [
			'Indonesian and English storefronts.',
			'Category browsing and visible inventory.',
			'QRIS payment with tracked order status.',
			'Order history, receipts, warranty information, and linked support.'
		],
		result:
			'Live at iscylla.web.id with a populated catalog and end-to-end customer purchase journey. Sales volume and payment conversion are not published.',
		lessonsLearned:
			'Commerce trust comes from explicit states and durable records: what is sold, what was paid, what gets delivered, and where support continues.'
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
		ownership: [
			'Designed the hybrid semantic and full-text matching strategy.',
			'Implemented pgvector similarity queries through Prisma.',
			'Added fallback behavior for API and database limits.'
		],
		type: 'Semantic search & matching engine',
		status: 'Prototype',
		stack: ['Next.js', 'OpenAI API', 'Prisma', 'PostgreSQL', 'pgvector'],
		summary:
			'An intelligent matchmaking platform pairing mentors and mentees based on professional goals, industry experience, and skill profiles.',
		outcome:
			'Built semantic mentor search with a full-text fallback so matching can use career context beyond exact keywords.',
		cover: '/images/projects/mentor-matcher.webp',
		coverAlt: 'Live AI Mentor Matcher prototype comparing keyword search with semantic search.',
		coverCaption: 'Captured from the public prototype in September 2026.',
		liveUrl: 'https://openai-embedding.vercel.app',
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
			'Implemented vector similarity queries and a keyword fallback. A comparative ranking evaluation is not published yet.',
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
		ownership: [
			'Designed the Step Functions workflow for extraction, transcription, curation, and rendering.',
			'Built the Next.js product flow and timestamped subtitle experience.',
			'Implemented the Lambda, DynamoDB, and FFmpeg processing path.'
		],
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
		sortOrder: 5,
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
			'Built a beta pipeline for transcription, segment selection, subtitles, and portrait rendering. Processing-time and cost benchmarks are not published.',
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
		ownership: [
			'Built the application foundation across authentication, tRPC, and the data layer.',
			'Designed the MCP lead-extraction tools and agent workflow.',
			'Implemented the inbox telemetry that exposes tool activity to operators.'
		],
		type: 'Agentic B2B CRM',
		status: 'Active Beta',
		stack: [
			'Next.js 16',
			'tRPC v11',
			'Better Auth',
			'Drizzle ORM',
			'Stitch MCP',
			'Hermes AI Agent'
		],
		summary:
			'An agentic B2B CRM for the mattress and bedding industry that balances autonomous AI customer interactions with transparent telemetry.',
		outcome:
			'Engineered a next-generation CRM inbox where human operators oversee autonomous lead extraction agents via live Model Context Protocol streams.',
		cover: undefined,
		liveUrl: undefined,
		githubUrl: undefined,
		sortOrder: 4,
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
			'Built an active beta where operators can inspect lead-extraction tool activity inside the inbox. Accuracy measurements and approval-policy details are not published.',
		lessonsLearned:
			'Users trust autonomous agents when they can inspect the tools the agent selected and why. Transparency is a feature, not just a log.'
	}
];

// Client-facing summaries keep the original implementation details available for due diligence.
const solutions: Record<
	string,
	Pick<
		Project,
		'type' | 'summary' | 'outcome' | 'ownership' | 'approach' | 'result' | 'lessonsLearned'
	>
> = {
	'futurelab-ai-workflows': {
		type: 'Less administration after mentoring sessions',
		summary:
			'Helped mentoring operations turn session recordings into useful notes and follow-ups without adding another manual task.',
		outcome:
			'CV-reported results at FutureLab: 30% higher B2B conversions through AI transcription features and 50% lower cloud costs through AWS optimization.',
		ownership: [
			'Built the recording-to-summary process.',
			'Connected the results to the existing team review process.',
			'Managed cloud infrastructure and optimized operating costs.',
			'Led a mentorship program for five junior developers.'
		],
		approach:
			'Prepare notes automatically after a session, give the team a clear review step, and keep the work inside their existing process.',
		result:
			'My CV reports a 30% increase in B2B conversions through AI transcription features and a 50% reduction in cloud costs through AWS optimization. These are separate outcomes from my broader work at FutureLab, not two measurements of the same feature. Measurement periods and baselines are not specified in the CV.',
		lessonsLearned:
			'Automation is useful when people can check the result and know what needs their attention.'
	},
	'kilat-store': {
		type: 'Help food businesses get online',
		summary:
			'Help cafes, restaurants, and local food brands create a website, display their menu, and receive inquiries through WhatsApp.',
		outcome:
			'Business owners can describe their business, edit a prepared website, and publish a shareable link without learning to code.',
		ownership: [
			'Connected website generation, visual editing, and publishing.',
			'Built a process that prepares pages without making owners wait on a frozen screen.',
			'Set up delivery designed to keep website hosting inexpensive.'
		],
		approach:
			'Focus on what a food business needs first: a menu, business details, and a clear way to order. If AI is unavailable, provide an editable starter instead of a blank page.',
		result:
			'A free first release is publicly available with one website, visual editing, a kill.lat address, and WhatsApp contact. Custom domains and paid upgrades are planned, not included in the current offer.',
		lessonsLearned:
			'A focused service that gets a business online is more useful than a long list of features owners have to figure out.'
	},
	'codexia-live': {
		type: 'Help learners get unstuck',
		summary:
			'Built a coding coach that offers small hints when learners struggle, rather than giving away the answer.',
		outcome:
			'Delivered an early working product that provides staged guidance and lets the team review when and why help appeared.',
		ownership: [
			'Built live communication between the learner and coach.',
			'Designed guidance that starts small and becomes more detailed when needed.',
			'Created a readable history of coaching activity.'
		],
		approach:
			'Look for signs that a learner may be stuck, offer a gentle nudge, and let the team inspect the coaching history to improve the experience.',
		result:
			'An initial working product demonstrates timely, progressive coaching. Learner impact and response-time benchmarks are not published.',
		lessonsLearned: 'Good assistance helps people take the next step without taking over the task.'
	},
	'iscylla-store': {
		type: 'A clearer online buying experience',
		summary:
			'A digital-product shop that brings browsing, payment, order updates, and after-sales support into one place.',
		outcome:
			'Customers can see prices and stock, pay by QRIS, and return to their account for receipts, delivery information, and order-related help.',
		ownership: [
			'Built the bilingual storefront and customer accounts.',
			'Connected payment to order tracking.',
			'Brought product availability, receipts, and support into the buying journey.'
		],
		approach:
			'Make each step clear before asking customers to pay: what they are buying, how it is delivered, what the warranty covers, and where to get help.',
		result:
			'The shop is live with a populated catalog and customer purchase journey. Sales and conversion measurements are not published.',
		lessonsLearned:
			'A clear buying process and accessible order records help customers understand what happens next.'
	},
	'the-beddo-crm': {
		type: 'Less manual customer information entry',
		summary:
			'Help a bedding business organize customer inquiries with AI assistance that staff can inspect from their inbox.',
		outcome:
			'An early trial brings lead information extraction and a visible activity history into the same workspace as customer conversations.',
		ownership: [
			'Built the shared customer workspace.',
			'Connected AI assistance to customer information capture.',
			'Made assistant activity visible to staff.'
		],
		approach:
			'Help staff collect information from conversations while showing what the assistant did, so people can inspect its work.',
		result:
			'An active trial lets operators inspect information-capture activity inside the inbox. Accuracy improvements are not quantified here.',
		lessonsLearned: 'People need to see what automation did before they can confidently rely on it.'
	},
	'ai-clipper-video': {
		type: 'Repurpose video with less manual editing',
		summary:
			'Turn long videos into short vertical clips with suggested moments and subtitles, helping creators prepare content for another format.',
		outcome:
			'Delivered an early version that connects transcription, clip selection, subtitles, and vertical video preparation in one process.',
		ownership: [
			'Connected the steps from source video to finished clip.',
			'Built the subtitle and clip preparation experience.',
			'Split heavy processing into manageable steps.'
		],
		approach:
			'Prepare the transcript, identify candidate moments, and create subtitled vertical clips through a repeatable process.',
		result:
			'A working trial automates several video-preparation tasks. Time saved and cost per clip have not been published.',
		lessonsLearned:
			'Breaking a long task into separate steps makes problems easier to find and recover from.'
	},
	'ai-mentor-matcher': {
		type: 'Help people find relevant mentors',
		summary:
			'Help mentees search by their career goals, even when a mentor describes their experience using different words.',
		outcome:
			'Built a search prototype that considers meaning as well as exact keywords and keeps an alternative search path available.',
		ownership: [
			'Designed matching around career context.',
			'Built the mentor search process.',
			'Added an alternative when the main search service is unavailable.'
		],
		approach:
			'Compare what a mentee needs with the experience mentors describe, rather than relying only on matching words.',
		result:
			'A prototype supports context-based mentor search. A comparison of recommendation quality has not been published.',
		lessonsLearned:
			'Useful recommendations need to be evaluated against what people actually find helpful.'
	},
	'portfolio-content-system': {
		type: 'Simpler website publishing',
		summary:
			'A publishing process that makes case studies and articles easier to maintain without editing the website for every update.',
		outcome:
			'Content can be managed separately from the website design, with backup content available if the publishing service cannot be reached.',
		ownership: [
			'Designed and built the website.',
			'Connected content management to published pages.',
			'Set up hosting and backup content.'
		],
		approach:
			'Separate everyday content updates from website development so publishing does not require rebuilding each page by hand.',
		result: 'A working publishing process for project stories, experiments, and articles.',
		lessonsLearned: 'A good website should be easy to keep useful, not just easy to launch.'
	}
};

export const fallbackProjects: Project[] = projectRecords.map((project) => ({
	...project,
	...solutions[project.slug]
}));

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
		value: '50% lower cloud costs',
		label: 'FutureLab · reported in my CV',
		detail: 'Designed around live learner events, not delayed chat-style prompts.'
	},
	{
		value: '30% higher B2B conversions',
		label: 'AI transcription · reported in my CV',
		detail: 'AI summaries enter product workflows with human review states.'
	},
	{
		value: 'Bogor, Indonesia · remote',
		label: 'Working globally',
		detail: 'Notion tokens stay inside SvelteKit load functions and server modules.'
	}
];
