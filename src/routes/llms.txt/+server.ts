import { getProjects } from '$lib/server/projects';
import { isrHeaders } from '$lib/server/isr';

export async function GET() {
	const base = 'https://azmi.web.id';
	const projects = await getProjects();

	const projectList = projects
		.map((p) => `- [${p.name}](${base}/projects/${p.slug}): ${p.summary}`)
		.join('\n');


	const body = `# Azmi Muwahid

> Senior Software Engineer at FutureLab.my and AI consultant based in Bogor, Indonesia.

## About

Azmi Muwahid is a senior software engineer who owns cloud infrastructure and deployments, maintains production codebases, and builds AI agents that enhance mentoring sessions, automated reporting, and operational insights. He has 6+ years of remote experience working with companies in Malaysia, Singapore, and beyond.

Currently working at FutureLab.my, where he manages AWS infrastructure, keeps the Rails platform stable, and ships AI agents for session transcription, summarization, and reporting.

He also works as a freelance full-stack developer through Toptal and Turing, and previously built the main application interface at Automa8e (Singapore).

## Skills

- Full-stack development: Ruby on Rails, SvelteKit, TypeScript, React, PostgreSQL
- Cloud & DevOps: AWS (EC2, S3, RDS, Lambda, CloudFront), deployment pipelines
- AI: AI agents, LLM integration, transcription, summarization, OpenAI API
- Practices: business process automation, cost optimization, test-driven development

## Links

- Website: ${base}
- LinkedIn: https://linkedin.com/in/azmimuwahid
- GitHub: https://github.com/azmi2409
- Email: azmimuwahid@gmail.com

## Projects

${projectList || 'No projects published yet.'}

## Pages

- [Home](${base})
- [Projects](${base}/projects)
- [About](${base}/about)
- [Contact](${base}/contact)
`;

	return new Response(body, {
		headers: { 'content-type': 'text/plain; charset=utf-8', ...isrHeaders }
	});
}
