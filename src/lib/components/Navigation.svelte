<script lang="ts">
	import { page } from '$app/state';
	import { Menu, X } from '@lucide/svelte';

	const navItems = [
		{ name: 'Home', href: '/' },
		{ name: 'Projects', href: '/projects' },
		{ name: 'About', href: '/about' },
		{ name: 'Lab', href: '/lab' },
		{ name: 'Blog', href: '/blog' },
		{ name: 'Contact', href: '/contact' }
	];

	let mobileOpen = $state(false);
	const pathname = $derived(page.url.pathname);

	function isActive(href: string) {
		if (href === '/') return pathname === '/';
		return pathname === href || pathname.startsWith(`${href}/`);
	}
</script>

<header
	class="fixed left-1/2 top-4 z-50 -translate-x-1/2 px-4"
	style="width: min(calc(100vw - 2rem), 900px);"
>
	<nav
		class="rounded-2xl border border-white/[0.08] bg-zinc-950/80 px-4 py-3 shadow-2xl shadow-black/40 backdrop-blur-2xl"
		aria-label="Main navigation"
	>
		<div class="flex items-center justify-between gap-4">
			<a href="/" class="flex items-center gap-3" aria-label="Azmi Muwahid home">
				<img src="/logo.png" alt="" class="h-9 w-9 rounded-xl" />
				<span class="hidden text-sm font-black tracking-tight text-white sm:inline"
					>Azmi Muwahid</span
				>
			</a>

			<div class="hidden items-center gap-1 md:flex">
				{#each navItems as item}
					<a
						href={item.href}
						class="rounded-xl px-3.5 py-2 text-sm font-semibold transition {isActive(item.href)
							? 'bg-white/[0.08] text-white'
							: 'text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-200'}"
					>
						{item.name}
					</a>
				{/each}
			</div>

			<a
				href="mailto:azmimuwahid@gmail.com"
				class="hidden rounded-xl bg-white px-4 py-2 text-sm font-bold text-zinc-950 transition hover:bg-zinc-200 md:inline-flex"
			>
				Hire me
			</a>

			<button
				class="rounded-xl border border-white/[0.08] p-2 text-zinc-200 md:hidden"
				onclick={() => (mobileOpen = !mobileOpen)}
				aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={mobileOpen}
			>
				{#if mobileOpen}<X class="h-5 w-5" />{:else}<Menu class="h-5 w-5" />{/if}
			</button>
		</div>

		{#if mobileOpen}
			<div class="mt-3 border-t border-white/[0.06] pt-3 md:hidden">
				{#each navItems as item}
					<a
						href={item.href}
						onclick={() => (mobileOpen = false)}
						class="block rounded-xl px-3 py-3 text-sm font-semibold {isActive(item.href)
							? 'bg-white/[0.08] text-white'
							: 'text-zinc-400'}"
					>
						{item.name}
					</a>
				{/each}
			</div>
		{/if}
	</nav>
</header>
