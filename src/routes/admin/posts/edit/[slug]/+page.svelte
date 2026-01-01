<script lang="ts">
	import { goto } from '$app/navigation';
	import { Save, ArrowLeft, Trash2 } from '@lucide/svelte';
	import MarkdownEditor from '$lib/components/admin/MarkdownEditor.svelte';
	import ImageUploader from '$lib/components/admin/ImageUploader.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let title = $state(data.post.title);
	let excerpt = $state(data.post.excerpt);
	let content = $state(data.post.content);
	let featuredImage = $state(data.post.featuredImage || '');
	let author = $state(data.post.author);
	let status = $state(data.post.status);
	let categories = $state(data.post.categories.join(', '));
	let tags = $state(data.post.tags.join(', '));
	let showPreview = $state(false);

	let saving = $state(false);
	let error = $state('');

	async function handleSave() {
		if (!title || !excerpt || !content) {
			error = 'Please fill in all required fields';
			return;
		}

		saving = true;
		error = '';

		try {
			const response = await fetch(`/api/blog/${data.post.slug}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					title,
					excerpt,
					content,
					featuredImage: featuredImage || undefined,
					author,
					status,
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
				throw new Error('Failed to update post');
			}

			goto('/admin/posts');
		} catch (err) {
			error = 'Failed to save post. Please try again.';
		} finally {
			saving = false;
		}
	}

	async function handleDelete() {
		if (!confirm(`Are you sure you want to delete "${data.post.title}"?`)) {
			return;
		}

		try {
			const response = await fetch(`/api/blog/${data.post.slug}`, {
				method: 'DELETE'
			});

			if (response.ok) {
				goto('/admin/posts');
			} else {
				alert('Failed to delete post');
			}
		} catch (err) {
			alert('An error occurred while deleting the post');
		}
	}
</script>

<svelte:head>
	<title>Edit Post - Admin</title>
</svelte:head>

<div>
	<div class="mb-8">
		<a
			href="/admin/posts"
			class="mb-4 inline-flex items-center gap-2 text-muted-foreground transition hover:text-foreground dark:hover:text-white"
		>
			<ArrowLeft class="h-5 w-5" />
			Back to Posts
		</a>
		<h1 class="text-3xl font-bold text-foreground">Edit Post</h1>
	</div>

	{#if error}
		<div class="mb-6 rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
			{error}
		</div>
	{/if}

	<form onsubmit={(e) => e.preventDefault()} class="space-y-6">
		<!-- Title -->
		<div>
			<label for="title" class="mb-2 block text-sm font-medium text-foreground"> Title * </label>
			<input
				id="title"
				type="text"
				bind:value={title}
				required
				class="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground transition focus:border-primary focus:ring-2 focus:ring-ring/20 focus:outline-none"
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
				class="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground transition focus:border-primary focus:ring-2 focus:ring-ring/20 focus:outline-none"
				placeholder="Brief description of the post"
			></textarea>
		</div>

		<!-- Featured Image -->
		<div>
			<label class="mb-2 block text-sm font-medium text-foreground"> Featured Image </label>
			{#if featuredImage}
				<div class="mb-4">
					<img src={featuredImage} alt="Featured" class="h-48 w-full rounded-lg object-cover" />
					<button
						type="button"
						onclick={() => (featuredImage = '')}
						class="mt-2 text-sm text-destructive hover:text-destructive/80"
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
			<label class="mb-2 block text-sm font-medium text-foreground"> Content * </label>
			<MarkdownEditor bind:content bind:showPreview />
		</div>

		<!-- Metadata -->
		<div class="grid gap-6 md:grid-cols-2">
			<div>
				<label for="author" class="mb-2 block text-sm font-medium text-foreground"> Author </label>
				<input
					id="author"
					type="text"
					bind:value={author}
					class="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground transition focus:border-primary focus:ring-2 focus:ring-ring/20 focus:outline-none"
				/>
			</div>

			<div>
				<label for="status" class="mb-2 block text-sm font-medium text-foreground"> Status </label>
				<select
					id="status"
					bind:value={status}
					class="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground transition focus:border-primary focus:ring-2 focus:ring-ring/20 focus:outline-none"
				>
					<option value="draft">Draft</option>
					<option value="published">Published</option>
				</select>
			</div>

			<div>
				<label for="categories" class="mb-2 block text-sm font-medium text-foreground">
					Categories (comma-separated)
				</label>
				<input
					id="categories"
					type="text"
					bind:value={categories}
					class="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground transition focus:border-primary focus:ring-2 focus:ring-ring/20 focus:outline-none"
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
					class="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground transition focus:border-primary focus:ring-2 focus:ring-ring/20 focus:outline-none"
					placeholder="svelte, javascript, tutorial"
				/>
			</div>
		</div>

		<!-- Actions -->
		<div class="flex items-center justify-between">
			<button
				type="button"
				onclick={handleDelete}
				class="flex items-center gap-2 rounded-lg border border-destructive bg-card px-6 py-3 font-semibold text-destructive transition hover:bg-destructive/10"
			>
				<Trash2 class="h-5 w-5" />
				Delete Post
			</button>

			<button
				type="button"
				onclick={handleSave}
				disabled={saving}
				class="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-primary dark:hover:bg-primary"
			>
				<Save class="h-5 w-5" />
				{saving ? 'Saving...' : 'Save Changes'}
			</button>
		</div>
	</form>
</div>
