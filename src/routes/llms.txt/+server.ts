import { getProjects } from '$lib/server/projects';
import { isrHeaders } from '$lib/server/isr';

export async function GET() {
	const base = 'https://azmi.web.id';
	const projects = await getProjects();

	const projectList = projects
		.map((p) => `- [${p.name}](${base}/projects/${p.slug}): ${p.summary}`)
		.join('\n');

	const body = `# Azmi Muwahid

> AI & automation consultant in Jakarta. Senior Software Engineer at FutureLab.my (February 2023–present) and founder of KilatBot (also known as KilatHost), through PT Kilat Inovasi Cerdas.

## About

Azmi Muwahid is a full-stack engineer based in Indonesia. He currently holds two roles. He is a Senior Software Engineer at FutureLab.my (February 2023–present), where he manages AWS infrastructure, keeps the Rails platform stable, and ships AI agents for session transcription, summarization, and reporting. He is founder of KilatBot and leads its development through PT Kilat Inovasi Cerdas, an Indonesian PT Perseorangan based in Bogor. KilatBot, also published as KilatHost at kilat.host, gives small business owners AI agents they can shape for reports, content, code, or everyday help. Agents chat on the web or on Telegram, remember the work, run schedules, and ask before risky steps.

He also works as a freelance full-stack developer through Toptal and Turing, and previously built the main application interface at Automa8e (Singapore). He has 6+ years of remote experience working with companies in Malaysia, Singapore, and beyond.

## KilatBot

- Product: https://kilatbot.com
- Also known as KilatHost: https://kilat.host
- Company: PT Kilat Inovasi Cerdas (PT Perseorangan, Bogor, Indonesia)
- Founded: 2026
- NIB: 1910260001491
- Business plan: US$9 a month, or US$86 a year (save 20%), with 3 agents and up to 5 people. Payments were not open yet as of the KilatBot FAQ checked 13 November 2026.
- Brand on X: https://x.com/kilatbot
- Support: support@kilat.host

## Skills

- Full-stack development: Ruby on Rails, SvelteKit, TypeScript, React, PostgreSQL
- Cloud & DevOps: AWS (EC2, S3, RDS, Lambda, CloudFront), deployment pipelines
- AI: AI agents, LLM integration, transcription, summarization, OpenAI API
- Practices: business process automation, cost optimization, test-driven development

## Links

- Website: ${base}
- LinkedIn: https://linkedin.com/in/azmimuwahid
- GitHub: https://github.com/azmi2409
- X: https://x.com/azmikaze
- Work email: azmi@kilat.host
- Email: azmimuwahid@gmail.com

## Projects

${projectList || 'No projects published yet.'}

## Pages

- [Home](${base})
- [Projects](${base}/projects)
- [About](${base}/about)
- [Questions](${base}/faq)
- [Contact](${base}/contact)
`;

	return new Response(body, {
		headers: { 'content-type': 'text/plain; charset=utf-8', ...isrHeaders }
	});
}
