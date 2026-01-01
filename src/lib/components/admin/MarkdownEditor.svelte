<script lang="ts">
	import { Bold, Italic, Link, Code, List, ListOrdered, Image, Eye } from '@lucide/svelte';
	import MarkdownRenderer from '$lib/components/blog/MarkdownRenderer.svelte';
	import ImageUploader from './ImageUploader.svelte';

	let {
		content = $bindable(),
		showPreview = $bindable(false)
	}: {
		content: string;
		showPreview?: boolean;
	} = $props();

	let textarea: HTMLTextAreaElement;
	let showImageUploader = $state(false);

	function insertMarkdown(before: string, after: string = '') {
		const start = textarea.selectionStart;
		const end = textarea.selectionEnd;
		const selectedText = content.substring(start, end);
		const newText =
			content.substring(0, start) + before + selectedText + after + content.substring(end);
		content = newText;

		// Set cursor position
		setTimeout(() => {
			textarea.focus();
			textarea.setSelectionRange(
				start + before.length,
				start + before.length + selectedText.length
			);
		}, 0);
	}

	function insertHeading() {
		insertMarkdown('## ', '');
	}

	function insertBold() {
		insertMarkdown('**', '**');
	}

	function insertItalic() {
		insertMarkdown('*', '*');
	}

	function insertLink() {
		insertMarkdown('[', '](url)');
	}

	function insertCode() {
		insertMarkdown('`', '`');
	}

	function insertCodeBlock() {
		insertMarkdown('\n```\n', '\n```\n');
	}

	function insertList() {
		insertMarkdown('\n- ', '');
	}

	function insertOrderedList() {
		insertMarkdown('\n1. ', '');
	}

	function handleImageUpload(url: string) {
		insertMarkdown(`![Image](${url})`, '');
		showImageUploader = false;
	}
</script>

<div class="space-y-4">
	<!-- Toolbar -->
	<div
		class="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-card p-2  bg-muted"
	>
		<button
			type="button"
			onclick={insertHeading}
			class="rounded p-2 transition hover:bg-muted hover:bg-muted"
			title="Heading"
		>
			<span class="text-sm font-bold">H</span>
		</button>
		<button
			type="button"
			onclick={insertBold}
			class="rounded p-2 transition hover:bg-muted hover:bg-muted"
			title="Bold"
		>
			<Bold class="h-4 w-4" />
		</button>
		<button
			type="button"
			onclick={insertItalic}
			class="rounded p-2 transition hover:bg-muted hover:bg-muted"
			title="Italic"
		>
			<Italic class="h-4 w-4" />
		</button>
		<button
			type="button"
			onclick={insertLink}
			class="rounded p-2 transition hover:bg-muted hover:bg-muted"
			title="Link"
		>
			<Link class="h-4 w-4" />
		</button>
		<button
			type="button"
			onclick={insertCode}
			class="rounded p-2 transition hover:bg-muted hover:bg-muted"
			title="Inline Code"
		>
			<Code class="h-4 w-4" />
		</button>
		<button
			type="button"
			onclick={insertCodeBlock}
			class="rounded p-2 transition hover:bg-muted hover:bg-muted"
			title="Code Block"
		>
			<span class="font-mono text-xs">{'{ }'}</span>
		</button>
		<button
			type="button"
			onclick={insertList}
			class="rounded p-2 transition hover:bg-muted hover:bg-muted"
			title="Bullet List"
		>
			<List class="h-4 w-4" />
		</button>
		<button
			type="button"
			onclick={insertOrderedList}
			class="rounded p-2 transition hover:bg-muted hover:bg-muted"
			title="Numbered List"
		>
			<ListOrdered class="h-4 w-4" />
		</button>
		<button
			type="button"
			onclick={() => (showImageUploader = !showImageUploader)}
			class="rounded p-2 transition hover:bg-muted hover:bg-muted"
			title="Insert Image"
		>
			<Image class="h-4 w-4" />
		</button>

		<div class="ml-auto flex items-center gap-2">
			<button
				type="button"
				onclick={() => (showPreview = !showPreview)}
				class="flex items-center gap-2 rounded px-3 py-2 text-sm font-medium transition {showPreview
					? 'bg-primary/10 text-primary bg-primary/10 text-primary'
					: 'hover:bg-muted hover:bg-muted'}"
			>
				<Eye class="h-4 w-4" />
				Preview
			</button>
		</div>
	</div>

	<!-- Image Uploader -->
	{#if showImageUploader}
		<ImageUploader onUpload={handleImageUpload} />
	{/if}

	<!-- Editor / Preview -->
	<div class="grid gap-4 {showPreview ? 'md:grid-cols-2' : ''}">
		<!-- Editor -->
		<div>
			<textarea
				bind:this={textarea}
				bind:value={content}
				placeholder="Write your content in Markdown..."
				class="min-h-[500px] w-full rounded-lg border border-border bg-card p-4 font-mono text-sm text-foreground transition focus:border-primary focus:ring-2 focus:ring-ring/20 focus:outline-none  bg-muted text-foreground"
			></textarea>
		</div>

		<!-- Preview -->
		{#if showPreview}
			<div
				class="rounded-lg border border-border bg-card p-4  bg-muted"
			>
				<div class="mb-2 text-sm font-semibold text-muted-foreground">Preview</div>
				<div class="prose prose-sm dark:prose-invert max-w-none">
					<MarkdownRenderer {content} />
				</div>
			</div>
		{/if}
	</div>
</div>
