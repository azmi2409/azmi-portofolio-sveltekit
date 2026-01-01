<script lang="ts">
	import { Search, Edit, Trash2, Eye, EyeOff, PlusCircle } from '@lucide/svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import { format } from 'date-fns';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let searchQuery = $state(data.filters.search || '');
	let statusFilter = $state(data.filters.status || '');

	function handleSearch() {
		const params = new URLSearchParams();
		if (searchQuery) params.set('search', searchQuery);
		if (statusFilter) params.set('status', statusFilter);

		const queryString = params.toString();
		goto(`/admin/posts${queryString ? '?' + queryString : ''}`);
	}

	async function handleDelete(slug: string, title: string) {
		if (!confirm(`Are you sure you want to delete "${title}"?`)) {
			return;
		}

		try {
			const response = await fetch(`/api/blog/${slug}`, {
				method: 'DELETE'
			});

			if (response.ok) {
				invalidateAll();
			} else {
				alert('Failed to delete post');
			}
		} catch (error) {
			alert('An error occurred while deleting the post');
		}
	}

	async function toggleStatus(slug: string, currentStatus: string) {
		const newStatus = currentStatus === 'published' ? 'draft' : 'published';

		try {
			const response = await fetch(`/api/blog/${slug}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ status: newStatus })
			});

			if (response.ok) {
				invalidateAll();
			} else {
				alert('Failed to update post status');
			}
		} catch (error) {
			alert('An error occurred while updating the post');
		}
	}
</script>

<svelte:head>
	<title>Manage Posts - Admin</title>
</svelte:head>

<div>
	<div class="mb-8 flex items-center justify-between">
		<h1 class="text-3xl font-bold text-foreground">Manage Posts</h1>
		<a
			href="/admin/posts/new"
			class="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-white transition hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary"
		>
			<PlusCircle class="h-5 w-5" />
			New Post
		</a>
	</div>

	<!-- Filters -->
	<div class="mb-6 flex flex-col gap-4 md:flex-row">
		<div class="relative flex-1">
			<Search class="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
			<input
				type="text"
				bind:value={searchQuery}
				onkeydown={(e) => e.key === 'Enter' && handleSearch()}
				placeholder="Search posts..."
				class="w-full rounded-lg border border-border bg-card bg-muted py-2 pr-4 pl-10 text-foreground placeholder-gray-500 transition focus:border-primary focus:ring-2 focus:ring-ring/20 focus:outline-none dark:placeholder-gray-400"
			/>
		</div>

		<select
			bind:value={statusFilter}
			onchange={handleSearch}
			class="rounded-lg border border-border bg-card bg-muted px-4 py-2 text-foreground transition focus:border-primary focus:ring-2 focus:ring-ring/20 focus:outline-none"
		>
			<option value="">All Status</option>
			<option value="published">Published</option>
			<option value="draft">Draft</option>
		</select>
	</div>

	<!-- Posts Table -->
	<div class="overflow-hidden rounded-xl border border-border bg-card">
		{#if data.posts.length > 0}
			<div class="overflow-x-auto">
				<table class="w-full">
					<thead class="border-b border-border bg-muted bg-muted/30">
						<tr>
							<th
								class="px-6 py-3 text-left text-xs font-medium tracking-wider text-muted-foreground uppercase"
							>
								Title
							</th>
							<th
								class="px-6 py-3 text-left text-xs font-medium tracking-wider text-muted-foreground uppercase"
							>
								Status
							</th>
							<th
								class="px-6 py-3 text-left text-xs font-medium tracking-wider text-muted-foreground uppercase"
							>
								Updated
							</th>
							<th
								class="px-6 py-3 text-right text-xs font-medium tracking-wider text-muted-foreground uppercase"
							>
								Actions
							</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-border">
						{#each data.posts as post}
							<tr class="transition hover:bg-muted/50">
								<td class="px-6 py-4">
									<div>
										<div class="font-medium text-foreground">{post.title}</div>
										<div class="mt-1 text-sm text-muted-foreground">
											{post.excerpt.substring(0, 80)}...
										</div>
									</div>
								</td>
								<td class="px-6 py-4">
									<span
										class="inline-flex rounded-full px-3 py-1 text-xs font-medium {post.status ===
										'published'
											? 'bg-primary/10 text-primary'
											: 'bg-muted text-muted-foreground'}"
									>
										{post.status}
									</span>
								</td>
								<td class="px-6 py-4 text-sm text-muted-foreground">
									{format(new Date(post.updatedAt), 'MMM dd, yyyy')}
								</td>
								<td class="px-6 py-4">
									<div class="flex justify-end gap-2">
										<button
											onclick={() => toggleStatus(post.slug, post.status)}
											class="rounded p-2 text-muted-foreground transition hover:bg-muted"
											title={post.status === 'published' ? 'Unpublish' : 'Publish'}
										>
											{#if post.status === 'published'}
												<EyeOff class="h-4 w-4" />
											{:else}
												<Eye class="h-4 w-4" />
											{/if}
										</button>
										<a
											href="/admin/posts/edit/{post.slug}"
											class="rounded p-2 text-primary transition hover:bg-primary/10"
											title="Edit"
										>
											<Edit class="h-4 w-4" />
										</a>
										<button
											onclick={() => handleDelete(post.slug, post.title)}
											class="rounded p-2 text-destructive transition hover:bg-destructive/10"
											title="Delete"
										>
											<Trash2 class="h-4 w-4" />
										</button>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{:else}
			<div class="p-8 text-center text-muted-foreground">
				No posts found. {#if data.filters.search}Try adjusting your search.{/if}
			</div>
		{/if}
	</div>
</div>
