<script lang="ts">
	import { page } from '$app/stores';
	import Sidebar from '$lib/components/admin/Sidebar.svelte';

	let { children } = $props();

	// Don't show sidebar on login page
	const isLoginPage = $derived($page.url.pathname === '/admin/login');
</script>

{#if isLoginPage}
	{@render children?.()}
{:else}
	<div class="flex min-h-screen bg-background">
		<Sidebar />

		<main class="flex-1 overflow-auto lg:ml-64">
			<div class="p-8">
				{@render children?.()}
			</div>
		</main>
	</div>
{/if}
