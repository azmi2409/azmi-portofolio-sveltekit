<script lang="ts">
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Mail, Menu, X } from '@lucide/svelte';
	import ThemeToggle from './ThemeToggle.svelte';

	const navItems = [
		{ name: 'Projects', href: '/projects' },
		{ name: 'About', href: '/about' },
		{ name: 'Contact', href: '/contact' }
	];
	let mobileOpen = $state(false);
	let mobileMenu: HTMLDivElement;
	const pathname = $derived(page.url.pathname);
	afterNavigate(() => mobileMenu?.hidePopover());
	onMount(() => {
		const desktop = window.matchMedia('(min-width: 1024px)');
		const closeOnDesktop = () => {
			if (desktop.matches) mobileMenu.hidePopover();
		};
		desktop.addEventListener('change', closeOnDesktop);
		return () => desktop.removeEventListener('change', closeOnDesktop);
	});
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

		<div class="nav-actions flex items-center gap-2">
			<div class="hidden sm:block"><ThemeToggle /></div>
			<a href="mailto:azmimuwahid@gmail.com" class="nav-cta hidden sm:inline-flex"
				><Mail class="h-4 w-4" /> Let’s talk</a
			>
			<button
				type="button"
				class="menu-button lg:hidden"
				popovertarget="mobile-navigation"
				aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
				aria-controls="mobile-navigation"
			>
				{#if mobileOpen}<X class="h-5 w-5" />{:else}<Menu class="h-5 w-5" />{/if}
			</button>
		</div>

		<div
			id="mobile-navigation"
			class="mobile-menu"
			bind:this={mobileMenu}
			popover="auto"
			ontoggle={(event) => (mobileOpen = event.newState === 'open')}
		>
			{#each navItems as item}<a
					href={item.href}
					onclick={() => mobileMenu.hidePopover()}
					aria-current={isActive(item.href) ? 'page' : undefined}
					class:active={isActive(item.href)}>{item.name}</a
				>{/each}
			<div class="mt-2 flex items-center justify-between border-t border-border pt-3 sm:hidden">
				<ThemeToggle /><a href="mailto:azmimuwahid@gmail.com" class="nav-cta"
					><Mail class="h-4 w-4" /> Let’s talk</a
				>
			</div>
		</div>
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
		display: inline-flex;
		align-items: center;
		justify-content: center;
		white-space: nowrap;
		flex-shrink: 0;
		min-height: 2.75rem;
		gap: 0.45rem;
		border-radius: 0.65rem;
		background: var(--foreground);
		padding: 0 1rem;
		color: var(--background);
		font-size: 0.8rem;
		font-weight: 700;
		transition: opacity 180ms;
	}
	.nav-cta.hidden {
		display: none;
	}
	@media (min-width: 640px) {
		.nav-cta.sm\:inline-flex {
			display: inline-flex;
		}
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
		position: fixed;
		top: 5.5rem;
		right: 0.75rem;
		left: 0.75rem;
		display: none;
		width: auto;
		max-height: calc(100dvh - 6.5rem);
		margin: 0;
		overflow-y: auto;
		gap: 0.2rem;
		padding: 0.6rem;
		border: 1px solid var(--border);
		border-radius: 1rem;
		background: var(--background);
		box-shadow: 0 24px 50px -20px rgba(0, 0, 0, 0.5);
	}
	.mobile-menu:popover-open {
		display: grid;
	}
	@media (min-width: 640px) {
		.mobile-menu {
			top: 5.75rem;
			right: 1.5rem;
			left: 1.5rem;
		}
	}
	@media (prefers-reduced-motion: no-preference) {
		.mobile-menu:popover-open {
			animation: menu-reveal 180ms ease-out;
		}
	}
	@keyframes menu-reveal {
		from {
			opacity: 0;
			translate: 0 -8px;
		}
		to {
			opacity: 1;
			translate: 0 0;
		}
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
	.mobile-menu > a.active,
	.mobile-menu > a:hover,
	.mobile-menu > a:focus-visible {
		background: var(--accent);
		color: var(--foreground);
	}
	@media (min-width: 1024px) {
		.menu-button,
		.mobile-menu:popover-open {
			display: none;
		}
		.nav-shell {
			grid-template-columns: 1fr auto 1fr;
		}
		.nav-actions {
			justify-self: end;
		}
	}
</style>
