<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { LayoutDashboard, FileText, LogOut, Menu, X, PlusCircle, Home } from '@lucide/svelte';

	let mobileMenuOpen = $state(false);

	const navItems = [
		{ href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
		{ href: '/admin/posts', label: 'Posts', icon: FileText },
		{ href: '/admin/posts/new', label: 'New Post', icon: PlusCircle }
	];

	async function handleLogout() {
		await fetch('/api/auth/logout', { method: 'POST' });
		goto('/admin/login');
	}

	function isActive(href: string) {
		return $page.url.pathname === href;
	}
</script>

<!-- Mobile Menu Button -->
<button
	onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
	class="fixed top-4 left-4 z-50 rounded-lg bg-card p-2 shadow-lg lg:hidden bg-card"
>
	{#if mobileMenuOpen}
		<X class="h-6 w-6 text-foreground" />
	{:else}
		<Menu class="h-6 w-6 text-foreground" />
	{/if}
</button>

<!-- Sidebar -->
<aside
	class="fixed inset-y-0 left-0 z-40 w-64 transform border-r border-border bg-card transition-transform lg:translate-x-0 border-border bg-card {mobileMenuOpen
		? 'translate-x-0'
		: '-translate-x-full'}"
>
	<div class="flex h-full flex-col">
		<!-- Header -->
		<div class="border-b border-border p-6 border-border">
			<h2 class="text-2xl font-bold text-foreground">Admin Panel</h2>
			<p class="mt-1 text-sm text-muted-foreground">Manage your blog</p>
		</div>

		<!-- Navigation -->
		<nav class="flex-1 space-y-1 p-4">
			{#each navItems as item}
				<a
					href={item.href}
					onclick={() => (mobileMenuOpen = false)}
					class="flex items-center gap-3 rounded-lg px-4 py-3 text-muted-foreground transition  {isActive(
						item.href
					)
						? 'bg-primary/5 text-primary bg-primary/10 dark:text-primary'
						: 'hover:bg-muted'}"
				>
					<svelte:component this={item.icon} class="h-5 w-5" />
					<span class="font-medium">{item.label}</span>
				</a>
			{/each}

			<div class="my-4 border-t border-border"></div>

			<a
				href="/"
				class="flex items-center gap-3 rounded-lg px-4 py-3 text-muted-foreground transition hover:bg-muted  hover:bg-muted"
			>
				<Home class="h-5 w-5" />
				<span class="font-medium">View Site</span>
			</a>
		</nav>

		<!-- Logout Button -->
		<div class="border-t border-border p-4 border-border">
			<button
				onclick={handleLogout}
				class="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-destructive transition hover:bg-destructive/10 text-destructive hover:bg-destructive/10"
			>
				<LogOut class="h-5 w-5" />
				<span class="font-medium">Logout</span>
			</button>
		</div>
	</div>
</aside>

<!-- Overlay for mobile -->
{#if mobileMenuOpen}
	<div
		class="fixed inset-0 z-30 bg-black/50 lg:hidden"
		onclick={() => (mobileMenuOpen = false)}
	></div>
{/if}
