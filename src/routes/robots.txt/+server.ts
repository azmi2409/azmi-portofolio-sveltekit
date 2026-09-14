export function GET() {
	const body = `User-agent: *
Allow: /
Sitemap: https://azmi.web.id/sitemap.xml

# LLM context file
# https://llmstxt.org
User-agent: *
# llms.txt: https://azmi.web.id/llms.txt

# AI crawlers — allow indexing for AI overview and citation
User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Anthropic-ai
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Bytespider
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Cohere-ai
Allow: /
`;
	return new Response(body, {
		headers: { 'content-type': 'text/plain' }
	});
}
