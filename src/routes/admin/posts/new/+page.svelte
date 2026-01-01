<script lang="ts">
	import { goto } from '$app/navigation';
	import { Save, ArrowLeft } from '@lucide/svelte';
	import MarkdownEditor from '$lib/components/admin/MarkdownEditor.svelte';
	import ImageUploader from '$lib/components/admin/ImageUploader.svelte';

	let title = $state('');
	let excerpt = $state('');
	let content = $state('');
	let featuredImage = $state('');
	let author = $state('AZMI');
	let status = $state<'draft' | 'published'>('draft');
	let categories = $state('');
	let tags = $state('');
	let showPreview = $state(false);

	let saving = $state(false);
	let error = $state('');

	async function handleSave(publishNow: boolean = false) {
		if (!title || !excerpt || !content) {
			error = 'Please fill in all required fields';
			return;
		}

		saving = true;
		error = '';

		try {
			const response = await fetch('/api/blog', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					title,
					excerpt,
					content,
					featuredImage: featuredImage || undefined,
					author,
					status: publishNow ? 'published' : status,
					categories: categories
						.split(',')
						.map((c) => c.trim())
						.filter(Boolean),
					tags: tags
						.split(',')
						.map((t) => t.trim())
						.filter(Boolean)
				})
			});

			if (!response.ok) {
				throw new Error('Failed to create post');
			}

			const post = await response.json();
			goto('/admin/posts');
		} catch (err) {
			error = 'Failed to save post. Please try again.';
		} finally {
			saving = false;
		}
	}
</script>

<svelte:head>
	<title>New Post - Admin</title>
</svelte:head>

<div>
	<div class="mb-8">
		<a
			href="/admin/posts"
			class="mb-4 inline-flex items-center gap-2 text-muted-foreground transition hover:text-foreground  dark:hover:text-white"
		>
			<ArrowLeft class="h-5 w-5" />
			Back to Posts
		</a>
		<h1 class="text-3xl font-bold text-foreground">Create New Post</h1>
	</div>

	{#if error}
		<div
			class="mb-6 rounded-lg bg-destructive/10 p-4 text-sm text-destructive bg-destructive/10 text-destructive"
		>
			{error}
		</div>
	{/if}

	<form onsubmit={(e) => e.preventDefault()} class="space-y-6">
		<!-- Title -->
		<div>
			<label for="title" class="mb-2 block text-sm font-medium text-foreground">
				Title *
			</label>
			<input
				id="title"
				type="text"
				bind:value={title}
				required
				class="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground transition focus:border-primary focus:ring-2 focus:ring-ring/20 focus:outline-none  bg-muted text-foreground"
				placeholder="Enter post title"
			/>
		</div>

		<!-- Excerpt -->
		<div>
			<label for="excerpt" class="mb-2 block text-sm font-medium text-foreground">
				Excerpt *
			</label>
			<textarea
				id="excerpt"
				bind:value={excerpt}
				required
				rows="3"
				class="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground transition focus:border-primary focus:ring-2 focus:ring-ring/20 focus:outline-none  bg-muted text-foreground"
				placeholder="Brief description of the post"
			></textarea>
		</div>

		<!-- Featured Image -->
		<div>
			<label class="mb-2 block text-sm font-medium text-foreground">
				Featured Image
			</label>
			{#if featuredImage}
				<div class="mb-4">
					<img src={featuredImage} alt="Featured" class="h-48 w-full rounded-lg object-cover" />
					<button
						type="button"
						onclick={() => (featuredImage = '')}
						class="mt-2 text-sm text-destructive hover:text-destructive text-destructive"
					>
						Remove Image
					</button>
				</div>
			{:else}
				<ImageUploader onUpload={(url) => (featuredImage = url)} />
			{/if}
		</div>

		<!-- Content -->
		<div>
			<label class="mb-2 block text-sm font-medium text-foreground">
				Content *
			</label>
			<MarkdownEditor bind:content bind:showPreview />
		</div>

		<!-- Metadata -->
		<div class="grid gap-6 md:grid-cols-2">
			<div>
				<label for="author" class="mb-2 block text-sm font-medium text-foreground">
					Author
				</label>
				<input
					id="author"
					type="text"
					bind:value={author}
					class="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground transition focus:border-primary focus:ring-2 focus:ring-ring/20 focus:outline-none  bg-muted text-foreground"
				/>
			</div>

			<div>
				<label for="status" class="mb-2 block text-sm font-medium text-foreground">
					Status
				</label>
				<select
					id="status"
					bind:value={status}
					class="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground transition focus:border-primary focus:ring-2 focus:ring-ring/20 focus:outline-none  bg-muted text-foreground"
				>
					<option value="draft">Draft</option>
					<option value="published">Published</option>
				</select>
			</div>

			<div>
				<label
					for="categories"
					class="mb-2 block text-sm font-medium text-foreground"
				>
					Categories (comma-separated)
				</label>
				<input
					id="categories"
					type="text"
					bind:value={categories}
					class="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground transition focus:border-primary focus:ring-2 focus:ring-ring/20 focus:outline-none  bg-muted text-foreground"
					placeholder="Web Development, Tutorial"
				/>
			</div>

			<div>
				<label for="tags" class="mb-2 block text-sm font-medium text-foreground">
					Tags (comma-separated)
				</label>
				<input
					id="tags"
					type="text"
					bind:value={tags}
					class="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground transition focus:border-primary focus:ring-2 focus:ring-ring/20 focus:outline-none  bg-muted text-foreground"
					placeholder="svelte, javascript, tutorial"
				/>
			</div>
		</div>

		<!-- Actions -->
		<div class="flex gap-4">
			<button
				type="button"
				onclick={() => handleSave(false)}
				disabled={saving}
				class="flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 font-semibold text-muted-foreground transition hover:bg-muted/30 disabled:cursor-not-allowed disabled:opacity-50hover:bg-muted"
			>
				<Save class="h-5 w-5" />
				{saving ? 'Saving...' : 'Save as Draft'}
			</button>

			<button
				type="button"
				onclick={() => handleSave(true)}
				disabled={saving}
				class="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-primary dark:hover:bg-primary"
			>
				<Save class="h-5 w-5" />
				{saving ? 'Publishing...' : 'Publish Now'}
			</button>
		</div>
	</form>
</div>
