<script lang="ts">
	import { marked } from 'marked';
	import hljs from 'highlight.js/lib/core';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';
	import python from 'highlight.js/lib/languages/python';
	import css from 'highlight.js/lib/languages/css';
	import html from 'highlight.js/lib/languages/xml';
	import bash from 'highlight.js/lib/languages/bash';
	import json from 'highlight.js/lib/languages/json';
	import { onMount } from 'svelte';

	let { content }: { content: string } = $props();

	// Register languages
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	hljs.registerLanguage('python', python);
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('html', html);
	hljs.registerLanguage('bash', bash);
	hljs.registerLanguage('json', json);

	// Configure marked
	marked.setOptions({
		highlight: (code, lang) => {
			if (lang && hljs.getLanguage(lang)) {
				try {
					return hljs.highlight(code, { language: lang }).value;
				} catch (err) {
					console.error('Highlight error:', err);
				}
			}
			return code;
		},
		breaks: true,
		gfm: true
	});

	let renderedContent = $derived(marked(content) as string);

	onMount(() => {
		// Apply syntax highlighting to any code blocks
		document.querySelectorAll('pre code').forEach((block) => {
			hljs.highlightElement(block as HTMLElement);
		});
	});
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css"
	/>
</svelte:head>

<div class="markdown-content">
	{@html renderedContent}
</div>
