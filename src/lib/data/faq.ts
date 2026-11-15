/**
 * Visible FAQ copy and the source for FAQPage JSON-LD.
 * Answer text is the concatenation of each part, so the structured data matches the HTML.
 */

export interface FaqPart {
	text: string;
	href?: string;
}

export interface FaqItem {
	question: string;
	answer: FaqPart[];
}

export const faqItems: FaqItem[] = [
	{
		question: 'Who is Azmi Muwahid?',
		answer: [
			{
				text: 'Azmi Muwahid is a full-stack engineer based in Indonesia. He builds KilatBot, AI agents for small business owners, and helps businesses automate repetitive work with practical software. KilatBot is also known as KilatHost.'
			}
		]
	},
	{
		question: 'What does Azmi Muwahid build?',
		answer: [
			{ text: 'He builds ' },
			{ text: 'KilatBot', href: 'https://kilatbot.com' },
			{
				text: ', also published at '
			},
			{ text: 'kilat.host', href: 'https://kilat.host' },
			{
				text: '. A business starts from a template for reports, content, code, or everyday help, then changes the agent’s role, skills, schedules, and tools. People chat with the agent in the browser or on Telegram.'
			}
		]
	},
	{
		question: 'What is KilatBot?',
		answer: [
			{
				text: 'KilatBot is a managed service for AI agents shaped to a business. It is also known as KilatHost. Agents remember the work, run schedules, and ask before risky steps. They start on Kilat AI, so a separate model API key is not required, and an owner can add their own provider key instead. There is no self-hosted edition.'
			}
		]
	},
	{
		question: 'Who is KilatBot for?',
		answer: [
			{
				text: 'KilatBot is for small business owners who want agents for day-to-day work without running servers or hiring an engineering team. The Business workspace includes 3 agents and up to 5 people.'
			}
		]
	},
	{
		question: 'Are KilatBot and KilatHost the same product?',
		answer: [
			{ text: 'Yes. KilatBot is also known as KilatHost. The same product is published at ' },
			{ text: 'kilatbot.com', href: 'https://kilatbot.com' },
			{ text: ' and ' },
			{ text: 'kilat.host', href: 'https://kilat.host' },
			{ text: '. It is operated by PT Kilat Inovasi Cerdas.' }
		]
	},
	{
		question: 'What company operates KilatBot?',
		answer: [
			{
				text: 'PT Kilat Inovasi Cerdas, an Indonesian PT Perseorangan based in Bogor. Azmi Muwahid founded KilatBot in 2026 and leads its development through that company. Its NIB is 1910260001491. It is a member of the NVIDIA Inception program, and it is not affiliated with CloudKilat or PT Infinys System Indonesia.'
			}
		]
	},
	{
		question: 'How much does KilatBot cost?',
		answer: [
			{
				text: 'Business is US$9 a month, or US$86 a year, which saves 20%. The plan includes 3 agents, up to 5 people, and monthly Kilat AI usage. Prices can show in rupiah in Indonesia and in US dollars elsewhere. On the KilatBot pricing and FAQ pages, payments were not open yet (FAQ last checked 13 November 2026). Invited people can use a code for Business free for a set time.'
			}
		]
	},
	{
		question: 'Does KilatBot replace ChatGPT?',
		answer: [
			{
				text: 'No. KilatBot works beside an assistant you already use, such as ChatGPT, Claude, or Gemini. The assistant helps you think and write. KilatBot agents keep business work going: they remember it, run schedules, and reply on Telegram.'
			}
		]
	},
	{
		question: 'How can I contact Azmi Muwahid?',
		answer: [
			{ text: 'Email him at work at ' },
			{ text: 'azmi@kilat.host', href: 'mailto:azmi@kilat.host' },
			{ text: ', or at ' },
			{ text: 'azmimuwahid@gmail.com', href: 'mailto:azmimuwahid@gmail.com' },
			{ text: '. He is on X as ' },
			{ text: '@azmikaze', href: 'https://x.com/azmikaze' },
			{
				text: ', and on LinkedIn and GitHub. For KilatBot account or billing help, the company lists support@kilat.host. The KilatBot brand account on X is '
			},
			{ text: '@kilatbot', href: 'https://x.com/kilatbot' },
			{ text: '.' }
		]
	},
	{
		question: 'Where is Azmi Muwahid based?',
		answer: [
			{
				text: 'He is based in Indonesia. The company behind KilatBot, PT Kilat Inovasi Cerdas, is based in Bogor, West Java.'
			}
		]
	}
];

export function faqAnswerText(item: FaqItem): string {
	return item.answer.map((part) => part.text).join('');
}

export function faqPageSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqItems.map((item) => ({
			'@type': 'Question',
			name: item.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: faqAnswerText(item)
			}
		}))
	};
}
