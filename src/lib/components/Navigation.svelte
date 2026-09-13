<script lang="ts">
	import { page } from '$app/state';
	import { Mail, Menu, X } from '@lucide/svelte';
	import ThemeToggle from './ThemeToggle.svelte';

	const navItems = [
		{ name: 'Work', href: '/projects' },
		{ name: 'About', href: '/about' },
		{ name: 'Lab', href: '/lab' },
		{ name: 'Writing', href: '/blog' },
		{ name: 'Contact', href: '/contact' }
	];
	let mobileOpen = $state(false);
	const pathname = $derived(page.url.pathname);
	function isActive(href: string) {
		return pathname === href || pathname.startsWith(`${href}/`);
	}
</script>

<header class="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
	<nav class="nav-shell mx-auto max-w-7xl" aria-label="Main navigation">
		<a href="/" class="brand" aria-label="Azmi Muwahid home">
			<span class="brand-icon"><img src="/assets/azmi-logo.webp" alt="" /></span>
			<span><strong>Azmi Muwahid</strong><small>AI & Automation Consultant</small></span>
		</a>

		<div class="hidden items-center gap-1 lg:flex">
			{#each navItems as item}
				<a
					href={item.href}
					aria-current={isActive(item.href) ? 'page' : undefined}
					class:active={isActive(item.href)}
					class="nav-link">{item.name}</a
				>
			{/each}
		</div>

		<div class="flex items-center gap-2">
			<div class="hidden sm:block"><ThemeToggle /></div>
			<a href="mailto:azmimuwahid@gmail.com" class="nav-cta hidden sm:inline-flex"
				><Mail class="h-4 w-4" /> Let’s talk</a
			>
			<button
				type="button"
				class="menu-button lg:hidden"
				onclick={() => (mobileOpen = !mobileOpen)}
				aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={mobileOpen}
				aria-controls="mobile-navigation"
			>
				{#if mobileOpen}<X class="h-5 w-5" />{:else}<Menu class="h-5 w-5" />{/if}
			</button>
		</div>

		{#if mobileOpen}
			<div id="mobile-navigation" class="mobile-menu">
				{#each navItems as item}<a
						href={item.href}
						onclick={() => (mobileOpen = false)}
						aria-current={isActive(item.href) ? 'page' : undefined}
						class:active={isActive(item.href)}>{item.name}</a
					>{/each}
				<div class="mt-2 flex items-center justify-between border-t border-border pt-3 sm:hidden">
					<ThemeToggle /><a href="mailto:azmimuwahid@gmail.com" class="nav-cta"
						><Mail class="h-4 w-4" /> Let’s talk</a
					>
				</div>
			</div>
		{/if}
	</nav>
</header>

<style>
	.nav-shell {
		position: relative;
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		gap: 1rem;
		min-height: 4.25rem;
		padding: 0.5rem;
		border: 1px solid var(--border);
		border-radius: 1rem;
		background: color-mix(in srgb, var(--background) 88%, transparent);
		box-shadow: 0 16px 45px -24px rgba(0, 0, 0, 0.45);
		backdrop-filter: blur(18px);
	}
	.brand {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		min-width: 0;
		width: fit-content;
	}
	.brand-icon {
		display: grid;
		width: 3rem;
		height: 3rem;
		flex: none;
		place-items: center;
		border-radius: 0.7rem;
		background: #111827;
		color: white;
	}
	.brand-icon img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
	.brand span:last-child {
		display: grid;
		line-height: 1.15;
	}
	.brand strong {
		font-family: var(--font-heading);
		font-size: 0.88rem;
	}
	.brand small {
		margin-top: 0.25rem;
		color: var(--muted-foreground);
		font-family: var(--font-mono);
		font-size: 0.56rem;
		letter-spacing: 0.04em;
	}
	.nav-link {
		position: relative;
		min-height: 2.75rem;
		display: inline-flex;
		align-items: center;
		border-radius: 0.65rem;
		padding: 0 0.85rem;
		color: var(--muted-foreground);
		font-size: 0.8rem;
		font-weight: 650;
		transition:
			color 180ms,
			background 180ms;
	}
	.nav-link:hover,
	.nav-link.active {
		background: var(--accent);
		color: var(--foreground);
	}
	.nav-link.active::after {
		content: '';
		position: absolute;
		right: 0.8rem;
		bottom: 0.35rem;
		left: 0.8rem;
		height: 2px;
		border-radius: 2px;
		background: var(--signal);
	}
	.nav-cta {
		min-height: 2.75rem;
		align-items: center;
		gap: 0.45rem;
		border-radius: 0.65rem;
		background: var(--foreground);
		padding: 0 1rem;
		color: var(--background);
		font-size: 0.8rem;
		font-weight: 700;
		transition: opacity 180ms;
	}
	.nav-cta:hover {
		opacity: 0.82;
	}
	.menu-button {
		display: grid;
		width: 2.75rem;
		height: 2.75rem;
		cursor: pointer;
		place-items: center;
		border: 1px solid var(--border);
		border-radius: 0.65rem;
		color: var(--foreground);
	}
	.mobile-menu {
		position: absolute;
		top: calc(100% + 0.5rem);
		right: 0;
		left: 0;
		display: grid;
		gap: 0.2rem;
		padding: 0.6rem;
		border: 1px solid var(--border);
		border-radius: 1rem;
		background: var(--background);
		box-shadow: 0 24px 50px -20px rgba(0, 0, 0, 0.5);
	}
	.mobile-menu > a {
		min-height: 2.75rem;
		display: flex;
		align-items: center;
		border-radius: 0.65rem;
		padding: 0 0.8rem;
		color: var(--muted-foreground);
		font-weight: 650;
	}
	.mobile-menu > a.active {
		background: var(--accent);
		color: var(--foreground);
	}
	@media (min-width: 1024px) {
		.menu-button,
		.mobile-menu {
			display: none;
		}
		.nav-shell {
			grid-template-columns: 1fr auto 1fr;
		}
		.nav-shell > :last-child {
			justify-self: end;
		}
	}
</style>
