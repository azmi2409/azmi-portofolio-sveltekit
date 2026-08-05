<script lang="ts">
	import { page } from '$app/state';
	import { ArrowUpRight, Menu, X } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import ThemeToggle from './ThemeToggle.svelte';

	const navItems = [
		{ name: 'Home', href: '/' },
		{ name: 'Projects', href: '/projects' },
		{ name: 'About', href: '/about' },
		{ name: 'Lab', href: '/lab' },
		{ name: 'Blog', href: '/blog' },
		{ name: 'Contact', href: '/contact' }
	];

	let mobileOpen = $state(false);
	let scrolled = $state(false);
	const pathname = $derived(page.url.pathname);

	onMount(() => {
		const update = () => (scrolled = window.scrollY > 24);
		update();
		window.addEventListener('scroll', update, { passive: true });
		return () => window.removeEventListener('scroll', update);
	});

	function isActive(href: string) {
		if (href === '/') return pathname === '/';
		return pathname === href || pathname.startsWith(`${href}/`);
	}
</script>

<header
	class="fixed top-3 left-1/2 z-50 -translate-x-1/2 px-3 transition-[width] duration-300 sm:top-4 {scrolled
		? 'w-[min(48rem,calc(100vw-1.5rem))]'
		: 'w-[min(60rem,calc(100vw-1.5rem))]'}"
>
	<nav class="nav-shell" aria-label="Main navigation">
		<div class="flex items-center justify-between gap-4">
			<a href="/" class="group flex items-center gap-2.5" aria-label="Azmi Muwahid home">
				<span class="brand-mark">AM</span>
				<span class="hidden text-sm font-bold tracking-[-0.02em] text-zinc-100 sm:inline"
					>Azmi Muwahid</span
				>
			</a>

			<div class="hidden items-center gap-0.5 md:flex">
				{#each navItems as item}
					<a
						href={item.href}
						aria-current={isActive(item.href) ? 'page' : undefined}
						class="nav-link {isActive(item.href) ? 'is-active' : ''}"
					>
						{item.name}
					</a>
				{/each}
			</div>

			<div class="hidden items-center gap-2 md:flex">
				<ThemeToggle />
				<a href="mailto:azmimuwahid@gmail.com" class="nav-cta">
					Let’s talk <ArrowUpRight class="h-3.5 w-3.5" />
				</a>
			</div>

			<div class="flex items-center gap-2 md:hidden">
				<ThemeToggle />
				<button
					class="grid h-9 w-9 place-items-center rounded-full border border-white/[0.09] text-zinc-200"
					onclick={() => (mobileOpen = !mobileOpen)}
					aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
					aria-expanded={mobileOpen}
					aria-controls="mobile-navigation"
				>
					{#if mobileOpen}<X class="h-4 w-4" />{:else}<Menu class="h-4 w-4" />{/if}
				</button>
			</div>
		</div>

		{#if mobileOpen}
			<div id="mobile-navigation" class="mt-3 border-t border-white/[0.07] pt-3 md:hidden">
				<div class="grid grid-cols-2 gap-1">
					{#each navItems as item}
						<a
							href={item.href}
							onclick={() => (mobileOpen = false)}
							aria-current={isActive(item.href) ? 'page' : undefined}
							class="rounded-xl px-3 py-3 text-sm font-semibold {isActive(item.href)
								? 'bg-white/[0.08] text-white'
								: 'text-zinc-400'}"
						>
							{item.name}
						</a>
					{/each}
				</div>
				<a href="mailto:azmimuwahid@gmail.com" class="nav-cta mt-2 flex w-full justify-center">
					Let’s talk <ArrowUpRight class="h-3.5 w-3.5" />
				</a>
			</div>
		{/if}
	</nav>
</header>

<style>
	.nav-shell {
		padding: 0.55rem;
		border: 1px solid rgba(255, 255, 255, 0.09);
		border-radius: 1.15rem;
		background: rgba(9, 9, 11, 0.76);
		box-shadow:
			0 16px 50px -20px rgba(0, 0, 0, 0.85),
			inset 0 1px rgba(255, 255, 255, 0.03);
		backdrop-filter: blur(22px) saturate(125%);
		-webkit-backdrop-filter: blur(22px) saturate(125%);
	}

	.brand-mark {
		display: grid;
		width: 2rem;
		height: 2rem;
		place-items: center;
		border: 1px solid rgba(157, 229, 213, 0.24);
		border-radius: 0.7rem;
		background: linear-gradient(145deg, rgba(142, 222, 205, 0.18), rgba(255, 255, 255, 0.035));
		font-family: var(--font-heading);
		font-size: 0.6rem;
		font-weight: 800;
		letter-spacing: -0.03em;
		color: #c5f0e7;
		transition: transform 180ms ease;
	}

	.group:hover .brand-mark {
		transform: rotate(-4deg) scale(1.04);
	}

	.nav-link {
		position: relative;
		border-radius: 0.7rem;
		padding: 0.55rem 0.72rem;
		font-size: 0.76rem;
		font-weight: 600;
		color: #71717a;
		transition:
			color 160ms ease,
			background-color 160ms ease;
	}

	.nav-link:hover {
		background: rgba(255, 255, 255, 0.035);
		color: #d4d4d8;
	}

	.nav-link.is-active {
		background: rgba(255, 255, 255, 0.065);
		color: #fafafa;
	}

	.nav-link.is-active::after {
		position: absolute;
		left: 50%;
		bottom: 0.22rem;
		width: 3px;
		height: 3px;
		border-radius: 50%;
		background: #8cdfcc;
		content: '';
		transform: translateX(-50%);
		box-shadow: 0 0 7px #8cdfcc;
	}

	.nav-cta {
		align-items: center;
		gap: 0.35rem;
		min-height: 2.15rem;
		border-radius: 999px;
		background: #f4f4f5;
		padding: 0.5rem 0.85rem;
		font-size: 0.72rem;
		font-weight: 700;
		color: #09090b;
		transition:
			transform 160ms ease,
			background-color 160ms ease;
	}

	.nav-cta:hover {
		transform: translateY(-1px);
		background: #fff;
	}

	:global(html.light) .nav-shell {
		border-color: rgba(24, 24, 27, 0.12);
		background: rgba(250, 250, 250, 0.78);
		box-shadow:
			0 16px 50px -20px rgba(24, 24, 27, 0.18),
			inset 0 1px rgba(255, 255, 255, 0.72);
	}

	:global(html.light) .nav-link {
		color: #71717a;
	}

	:global(html.light) .nav-link:hover,
	:global(html.light) .nav-link.is-active {
		background: rgba(24, 24, 27, 0.055);
		color: #18181b;
	}
</style>
