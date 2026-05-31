<script lang="ts">
	import { marked } from 'marked';

	let { content }: { content: string } = $props();
	let renderedContent = $derived(marked(content) as string);
</script>

<div class="markdown-content prose prose-invert max-w-none">
	{@html renderedContent}
</div>
