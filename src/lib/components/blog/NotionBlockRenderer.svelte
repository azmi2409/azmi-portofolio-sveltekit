<script lang="ts">
	import type { NotionBlock, NotionRichText } from '$lib/types/blog';
	import hljs from 'highlight.js/lib/core';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';
	import python from 'highlight.js/lib/languages/python';
	import css from 'highlight.js/lib/languages/css';
	import html from 'highlight.js/lib/languages/xml';
	import bash from 'highlight.js/lib/languages/bash';
	import json from 'highlight.js/lib/languages/json';
	import rust from 'highlight.js/lib/languages/rust';
	import sql from 'highlight.js/lib/languages/sql';

	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('js', javascript);
	hljs.registerLanguage('typescript', typescript);
	hljs.registerLanguage('ts', typescript);
	hljs.registerLanguage('python', python);
	hljs.registerLanguage('py', python);
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('html', html);
	hljs.registerLanguage('bash', bash);
	hljs.registerLanguage('sh', bash);
	hljs.registerLanguage('json', json);
	hljs.registerLanguage('rust', rust);
	hljs.registerLanguage('sql', sql);

	let { blocks }: { blocks: NotionBlock[] } = $props();

	// ── Rich text → HTML ─────────────────────────────────────────────────────

	function richTextToHtml(richTexts: NotionRichText[]): string {
		if (!Array.isArray(richTexts)) return '';
		return richTexts
			.map((rt) => {
				let text = escapeHtml(rt.plain_text ?? '');
				const ann = rt.annotations;
				if (ann?.code) text = `<code class="inline-code">${text}</code>`;
				if (ann?.bold) text = `<strong>${text}</strong>`;
				if (ann?.italic) text = `<em>${text}</em>`;
				if (ann?.strikethrough) text = `<s>${text}</s>`;
				if (ann?.underline) text = `<u>${text}</u>`;
				if (ann?.color && ann.color !== 'default') {
					const colorClass = getColorClass(ann.color);
					text = `<span class="${colorClass}">${text}</span>`;
				}
				if (rt.href) {
					text = `<a href="${rt.href}" target="_blank" rel="noopener noreferrer" class="notion-link">${text}</a>`;
				}
				return text;
			})
			.join('');
	}

	function escapeHtml(str: string): string {
		return str
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;');
	}

	function getColorClass(color: string): string {
		const colorMap: Record<string, string> = {
			gray: 'text-zinc-400',
			brown: 'text-amber-700',
			orange: 'text-orange-500',
			yellow: 'text-yellow-500',
			green: 'text-emerald-500',
			blue: 'text-blue-500',
			purple: 'text-purple-500',
			pink: 'text-pink-500',
			red: 'text-red-500',
			gray_background: 'bg-zinc-800/60 px-1 rounded',
			brown_background: 'bg-amber-900/30 px-1 rounded',
			orange_background: 'bg-orange-900/30 px-1 rounded',
			yellow_background: 'bg-yellow-900/30 px-1 rounded',
			green_background: 'bg-emerald-900/30 px-1 rounded',
			blue_background: 'bg-blue-900/30 px-1 rounded',
			purple_background: 'bg-purple-900/30 px-1 rounded',
			pink_background: 'bg-pink-900/30 px-1 rounded',
			red_background: 'bg-red-900/30 px-1 rounded'
		};
		return colorMap[color] ?? '';
	}

	// ── Code highlighting ─────────────────────────────────────────────────────

	function highlightCode(code: string, lang?: string): string {
		if (lang && hljs.getLanguage(lang)) {
			try {
				return hljs.highlight(code, { language: lang }).value;
			} catch {
				// fallback
			}
		}
		return escapeHtml(code);
	}

	// ── Block → HTML ──────────────────────────────────────────────────────────

	function renderBlock(block: NotionBlock): string {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const b = block as any;
		const type = block.type;
		const blockData = b[type];

		switch (type) {
			// Paragraphs
			case 'paragraph': {
				const inner = richTextToHtml(blockData?.rich_text ?? []);
				if (!inner.trim()) return '<div class="mb-4 h-4"></div>';
				return `<p class="mb-5 leading-relaxed text-zinc-300">${inner}</p>`;
			}

			// Headings
			case 'heading_1':
				return `<h2 class="notion-h1 mt-10 mb-4 text-3xl font-bold tracking-tight text-zinc-100">${richTextToHtml(blockData?.rich_text ?? [])}</h2>`;
			case 'heading_2':
				return `<h3 class="notion-h2 mt-8 mb-3 text-2xl font-semibold tracking-tight text-zinc-100">${richTextToHtml(blockData?.rich_text ?? [])}</h3>`;
			case 'heading_3':
				return `<h4 class="notion-h3 mt-6 mb-2 text-xl font-semibold text-zinc-200">${richTextToHtml(blockData?.rich_text ?? [])}</h4>`;

			// Lists
			case 'bulleted_list_item': {
				const children = block.children ? renderBlocks(block.children) : '';
				return `<li class="mb-1.5 leading-relaxed text-zinc-300 marker:text-zinc-500">${richTextToHtml(blockData?.rich_text ?? [])}${children ? `<div class="mt-2 ml-4">${children}</div>` : ''}</li>`;
			}
			case 'numbered_list_item': {
				const children = block.children ? renderBlocks(block.children) : '';
				return `<li class="mb-1.5 leading-relaxed text-zinc-300">${richTextToHtml(blockData?.rich_text ?? [])}${children ? `<div class="mt-2 ml-4">${children}</div>` : ''}</li>`;
			}

			// To-do
			case 'to_do': {
				const checked = blockData?.checked ?? false;
				return `<div class="flex items-start gap-2 mb-2">
					<input type="checkbox" ${checked ? 'checked' : ''} disabled class="mt-1 accent-zinc-400 cursor-not-allowed" />
					<span class="${checked ? 'line-through text-zinc-500' : 'text-zinc-300'} leading-relaxed">${richTextToHtml(blockData?.rich_text ?? [])}</span>
				</div>`;
			}

			// Code
			case 'code': {
				const lang = blockData?.language ?? '';
				const raw = blockData?.rich_text?.map((r: NotionRichText) => r.plain_text).join('') ?? '';
				const highlighted = highlightCode(raw, lang);
				const caption = richTextToHtml(blockData?.caption ?? []);
				return `<div class="my-6">
					<div class="relative rounded-xl overflow-hidden border border-white/[0.06]">
						${lang ? `<div class="flex items-center gap-2 px-4 py-2.5 bg-zinc-800/80 border-b border-white/[0.06]"><span class="text-xs font-mono text-zinc-400 uppercase tracking-wider">${escapeHtml(lang)}</span></div>` : ''}
						<pre class="overflow-x-auto p-5 bg-zinc-900/80 text-sm leading-relaxed"><code class="hljs language-${lang} font-mono">${highlighted}</code></pre>
					</div>
					${caption ? `<p class="mt-2 text-center text-xs text-zinc-500 italic">${caption}</p>` : ''}
				</div>`;
			}

			// Quote
			case 'quote':
				return `<blockquote class="my-6 border-l-2 border-zinc-600 pl-5 italic text-zinc-400 leading-relaxed">${richTextToHtml(blockData?.rich_text ?? [])}</blockquote>`;

			// Callout
			case 'callout': {
				const icon = blockData?.icon?.emoji ?? blockData?.icon?.external?.url ?? '💡';
				const colorBg = getColorClass((blockData?.color ?? 'gray') + '_background');
				return `<div class="my-6 flex gap-3 rounded-xl border border-white/[0.06] bg-zinc-800/50 p-4 ${colorBg}">
					<span class="mt-0.5 text-xl flex-shrink-0" aria-hidden="true">${typeof icon === 'string' && icon.length <= 4 ? icon : '💡'}</span>
					<div class="leading-relaxed text-zinc-300">${richTextToHtml(blockData?.rich_text ?? [])}</div>
				</div>`;
			}

			// Toggle
			case 'toggle': {
				const summary = richTextToHtml(blockData?.rich_text ?? []);
				const inner = block.children
					? `<div class="mt-2 ml-4">${renderBlocks(block.children)}</div>`
					: '';
				return `<details class="my-4 rounded-xl border border-white/[0.06] bg-zinc-900/40">
					<summary class="cursor-pointer px-4 py-3 font-medium text-zinc-200 hover:text-white transition-colors duration-200 select-none list-none flex items-center gap-2">
						<svg class="h-4 w-4 flex-shrink-0 text-zinc-500 transition-transform duration-200 details-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
						${summary}
					</summary>
					<div class="px-4 pb-4 pt-1">${inner}</div>
				</details>`;
			}

			// Divider
			case 'divider':
				return `<hr class="my-8 border-0 h-px bg-gradient-to-r from-transparent via-zinc-700/60 to-transparent" />`;

			// Image
			case 'image': {
				const url =
					blockData?.type === 'external' ? blockData?.external?.url : blockData?.file?.url;
				const caption = richTextToHtml(blockData?.caption ?? []);
				if (!url) return '';
				return `<figure class="my-8">
					<img src="${url}" alt="${richTextToHtml(blockData?.caption ?? [])}" loading="lazy"
						class="w-full rounded-xl border border-white/[0.06] object-cover" />
					${caption ? `<figcaption class="mt-2 text-center text-sm text-zinc-500 italic">${caption}</figcaption>` : ''}
				</figure>`;
			}

			// Video embed
			case 'video': {
				const url =
					blockData?.type === 'external' ? blockData?.external?.url : blockData?.file?.url;
				if (!url) return '';
				// YouTube embed
				const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
				if (ytMatch) {
					return `<div class="my-8 aspect-video overflow-hidden rounded-xl border border-white/[0.06]">
						<iframe src="https://www.youtube.com/embed/${ytMatch[1]}" title="Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="h-full w-full"></iframe>
					</div>`;
				}
				return `<div class="my-8"><a href="${url}" target="_blank" rel="noopener noreferrer" class="notion-link">View video →</a></div>`;
			}

			// Embed / bookmark
			case 'embed':
			case 'bookmark': {
				const url = blockData?.url ?? '';
				const caption = richTextToHtml(blockData?.caption ?? []);
				if (!url) return '';
				return `<div class="my-6">
					<a href="${url}" target="_blank" rel="noopener noreferrer"
						class="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-zinc-900/40 px-4 py-3 transition-all duration-200 hover:border-white/10 hover:bg-zinc-800/60">
						<svg class="h-4 w-4 flex-shrink-0 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/></svg>
						<span class="text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors duration-200 truncate">${escapeHtml(url)}</span>
					</a>
					${caption ? `<p class="mt-2 text-xs text-zinc-500">${caption}</p>` : ''}
				</div>`;
			}

			// Table
			case 'table': {
				const children = block.children ?? [];
				const hasHeader = blockData?.has_column_header ?? false;
				const rows = children.map((row: NotionBlock, i: number) => {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					const cells = ((row as any)?.table_row?.cells ?? []) as NotionRichText[][];
					const tag = hasHeader && i === 0 ? 'th' : 'td';
					const cellsHtml = cells
						.map(
							(cell) =>
								`<${tag} class="border border-white/[0.06] px-4 py-2 text-sm text-zinc-300">${richTextToHtml(cell)}</${tag}>`
						)
						.join('');
					return `<tr class="${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/10'}">${cellsHtml}</tr>`;
				});
				return `<div class="my-6 overflow-x-auto rounded-xl border border-white/[0.06]">
					<table class="w-full border-collapse">${rows.join('')}</table>
				</div>`;
			}

			// Column layout
			case 'column_list': {
				const cols = block.children ?? [];
				const colHtml = cols
					.map((col: NotionBlock) => {
						const inner = col.children ? renderBlocks(col.children) : '';
						return `<div class="flex-1 min-w-0">${inner}</div>`;
					})
					.join('');
				return `<div class="my-4 flex gap-6 flex-wrap md:flex-nowrap">${colHtml}</div>`;
			}

			// Fallback — unsupported block type
			default:
				return '';
		}
	}

	// ── Group consecutive list items ─────────────────────────────────────────

	function renderBlocks(blks: NotionBlock[]): string {
		const parts: string[] = [];
		let i = 0;
		while (i < blks.length) {
			const block = blks[i];
			if (block.type === 'bulleted_list_item') {
				const items: string[] = [];
				while (i < blks.length && blks[i].type === 'bulleted_list_item') {
					items.push(renderBlock(blks[i]));
					i++;
				}
				parts.push(
					`<ul class="my-4 ml-5 list-disc space-y-1 marker:text-zinc-500">${items.join('')}</ul>`
				);
			} else if (block.type === 'numbered_list_item') {
				const items: string[] = [];
				while (i < blks.length && blks[i].type === 'numbered_list_item') {
					items.push(renderBlock(blks[i]));
					i++;
				}
				parts.push(`<ol class="my-4 ml-5 list-decimal space-y-1">${items.join('')}</ol>`);
			} else {
				parts.push(renderBlock(block));
				i++;
			}
		}
		return parts.join('');
	}

	let renderedBlocks = $derived(renderBlocks(blocks));
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css"
	/>
</svelte:head>

<div class="notion-content">
	{@html renderedBlocks}
</div>

<style>
	.notion-content :global(.notion-h1),
	.notion-content :global(.notion-h2),
	.notion-content :global(.notion-h3) {
		font-family: var(--font-heading);
		letter-spacing: -0.02em;
	}

	.notion-content :global(.inline-code) {
		font-family: var(--font-mono);
		font-size: 0.875em;
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 4px;
		padding: 0.1em 0.4em;
		color: #e2e8f0;
	}

	.notion-content :global(.notion-link) {
		color: #a1a1aa;
		text-decoration: underline;
		text-decoration-color: rgba(161, 161, 170, 0.4);
		text-underline-offset: 3px;
		transition:
			color 200ms,
			text-decoration-color 200ms;
	}
	.notion-content :global(.notion-link:hover) {
		color: #fafafa;
		text-decoration-color: rgba(250, 250, 250, 0.5);
	}

	/* Toggle chevron rotation */
	.notion-content :global(details[open] .details-chevron) {
		transform: rotate(90deg);
	}
</style>
