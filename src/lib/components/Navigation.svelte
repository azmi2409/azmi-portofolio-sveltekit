<script lang="ts">
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { ArrowUpRight } from '@lucide/svelte';
	import ThemeToggle from './ThemeToggle.svelte';
	import LocalTime from './LocalTime.svelte';

	const navItems = [
		{ name: 'Projects', href: '/projects' },
		{ name: 'About', href: '/about' },
		{ name: 'Contact', href: '/contact' }
	];
	let mobileOpen = $state(false);
	let scrolled = $state(false);
	let tucked = $state(false);
	let header: HTMLElement;
	let mobileMenu: HTMLDivElement;
	let pill: HTMLDivElement;
	// Sliding highlight behind the hovered (or current) desktop link.
	let indicator = $state({ x: 0, width: 0, visible: false });
	const pathname = $derived(page.url.pathname);

	afterNavigate(() => {
		mobileMenu?.hidePopover();
		requestAnimationFrame(settleIndicator);
	});

	onMount(() => {
		const desktop = window.matchMedia('(min-width: 1024px)');
		const closeOnDesktop = () => {
			if (desktop.matches) mobileMenu.hidePopover();
			settleIndicator();
		};
		desktop.addEventListener('change', closeOnDesktop);

		let lastY = scrollY;
		let frame = 0;
		const onScroll = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => {
				const y = Math.max(0, scrollY);
				const max = document.documentElement.scrollHeight - innerHeight;
				header.style.setProperty('--scroll-progress', String(max > 0 ? Math.min(1, y / max) : 0));
				scrolled = y > 24;
				// Tuck away while reading downward; return on any upward scroll.
				if (Math.abs(y - lastY) > 6) {
					tucked = y > 240 && y > lastY && !header.contains(document.activeElement);
					lastY = y;
				}
			});
		};
		onScroll();
		addEventListener('scroll', onScroll, { passive: true });
		return () => {
			cancelAnimationFrame(frame);
			desktop.removeEventListener('change', closeOnDesktop);
			removeEventListener('scroll', onScroll);
		};
	});

	function isActive(href: string) {
		return pathname === href || pathname.startsWith(`${href}/`);
	}

	function moveIndicator(link: HTMLElement | null | undefined) {
		if (!link) return void (indicator.visible = false);
		indicator = { x: link.offsetLeft, width: link.offsetWidth, visible: true };
	}

	function settleIndicator() {
		moveIndicator(pill?.querySelector<HTMLElement>('[aria-current="page"]'));
	}
</script>

<header
	bind:this={header}
	class="site-header fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4"
	class:scrolled
	class:tucked={tucked && !mobileOpen}
	class:menu-open={mobileOpen}
	onfocusin={() => (tucked = false)}
>
	<div class="scroll-progress" aria-hidden="true"></div>
	<nav class="nav-shell mx-auto max-w-7xl" aria-label="Main navigation">
		<a href="/" class="brand" aria-label="Azmi Muwahid home">
			<span class="brand-icon"><img src="/assets/azmi-logo.webp" alt="" /></span>
			<span class="brand-name">Azmi Muwahid</span>
		</a>

		<div
			class="nav-pill hidden lg:flex"
			role="presentation"
			bind:this={pill}
			onpointerleave={settleIndicator}
			onfocusout={settleIndicator}
		>
			<span
				class="nav-indicator"
				class:visible={indicator.visible}
				style:--x="{indicator.x}px"
				style:--w="{indicator.width}px"
				aria-hidden="true"
			></span>
			{#each navItems as item}
				<a
					href={item.href}
					aria-current={isActive(item.href) ? 'page' : undefined}
					class:active={isActive(item.href)}
					class="nav-link"
					onpointerenter={(event) => moveIndicator(event.currentTarget)}
					onfocus={(event) => moveIndicator(event.currentTarget)}
					><span class="roll"><span>{item.name}</span></span></a
				>
			{/each}
		</div>

		<div class="nav-actions flex items-center gap-2">
			<span class="availability hidden xl:inline-flex"><i></i> Available for projects</span>
			<div class="hidden sm:block"><ThemeToggle /></div>
			<a href="mailto:azmimuwahid@gmail.com" class="nav-cta magnetic hidden sm:inline-flex"
				>Let’s talk <span class="nav-cta-icon"><ArrowUpRight class="h-3.5 w-3.5" /></span></a
			>
			<button
				type="button"
				class="menu-button lg:hidden"
				class:open={mobileOpen}
				popovertarget="mobile-navigation"
				aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
				aria-controls="mobile-navigation"
			>
				<span aria-hidden="true"></span><span aria-hidden="true"></span>
			</button>
		</div>

		<div
			id="mobile-navigation"
			class="mobile-menu"
			bind:this={mobileMenu}
			popover="auto"
			ontoggle={(event) => (mobileOpen = event.newState === 'open')}
		>
			{#each navItems as item, index}<a
					href={item.href}
					class="mobile-link"
					style:--i={index}
					onclick={() => mobileMenu.hidePopover()}
					aria-current={isActive(item.href) ? 'page' : undefined}
					class:active={isActive(item.href)}
					><small aria-hidden="true">0{index + 1}</small>{item.name}<ArrowUpRight
						class="mobile-link-arrow"
					/></a
				>{/each}
			<div class="mobile-foot">
				<LocalTime
					class="font-mono text-[0.65rem] tracking-[0.08em] text-muted-foreground uppercase"
				/>
				<div class="flex items-center justify-between gap-3">
					<ThemeToggle /><a href="mailto:azmimuwahid@gmail.com" class="nav-cta"
						>Let’s talk <span class="nav-cta-icon"><ArrowUpRight class="h-3.5 w-3.5" /></span></a
					>
				</div>
			</div>
		</div>
	</nav>
</header>

<style>
	.site-header {
		view-transition-name: site-nav;
		transition: translate 500ms cubic-bezier(0.16, 1, 0.3, 1);
	}
	.site-header.tucked {
		translate: 0 calc(-100% - 1rem);
	}
	.scroll-progress {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 2px;
		transform-origin: left;
		scale: var(--scroll-progress, 0) 1;
		background: linear-gradient(90deg, transparent, var(--signal));
		pointer-events: none;
	}

	/* Transparent over the hero; becomes a frosted bar once the page scrolls. */
	.nav-shell {
		position: relative;
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		gap: 1rem;
		min-height: 4rem;
		padding: 0.5rem 0.5rem 0.5rem 0.75rem;
		border: 1px solid transparent;
		border-radius: 1.25rem;
		transition:
			min-height 400ms cubic-bezier(0.16, 1, 0.3, 1),
			background-color 400ms ease,
			border-color 400ms ease,
			box-shadow 400ms ease;
	}
	.scrolled .nav-shell,
	.menu-open .nav-shell {
		min-height: 3.6rem;
		border-color: var(--border);
		background: color-mix(in srgb, var(--background) 74%, transparent);
		box-shadow: 0 20px 50px -28px rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(18px) saturate(1.4);
	}

	.brand {
		display: flex;
		align-items: center;
		gap: 0.7rem;
		width: fit-content;
		min-width: 0;
	}
	.brand-icon {
		display: grid;
		width: 2.4rem;
		height: 2.4rem;
		flex: none;
		place-items: center;
		overflow: hidden;
		border-radius: 0.7rem;
		background: #111827;
		transition: rotate 600ms cubic-bezier(0.16, 1, 0.3, 1);
	}
	.brand:hover .brand-icon {
		rotate: -8deg;
	}
	.brand-icon img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
	.brand-name {
		font-family: var(--font-heading);
		font-size: 0.95rem;
		font-weight: 600;
		letter-spacing: -0.02em;
		white-space: nowrap;
	}

	.nav-pill {
		position: relative;
		align-items: center;
		padding: 0.3rem;
		border: 1px solid var(--border);
		border-radius: 999px;
		background: color-mix(in srgb, var(--card) 70%, transparent);
		backdrop-filter: blur(14px);
	}
	.nav-indicator {
		position: absolute;
		top: 0.3rem;
		bottom: 0.3rem;
		left: 0;
		width: var(--w);
		translate: var(--x) 0;
		border-radius: 999px;
		background: color-mix(in srgb, var(--signal) 14%, var(--accent));
		box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--signal) 22%, transparent);
		opacity: 0;
		transition:
			translate 500ms cubic-bezier(0.16, 1, 0.3, 1),
			width 500ms cubic-bezier(0.16, 1, 0.3, 1),
			opacity 250ms ease;
	}
	.nav-indicator.visible {
		opacity: 1;
	}
	.nav-link {
		position: relative;
		display: inline-flex;
		min-height: 2.5rem;
		align-items: center;
		padding: 0 1.1rem;
		border-radius: 999px;
		color: var(--muted-foreground);
		font-size: 0.82rem;
		font-weight: 650;
		transition: color 200ms;
	}
	.nav-link:hover,
	.nav-link:focus-visible,
	.nav-link.active {
		color: var(--foreground);
	}
	.nav-link.active::after {
		content: '';
		position: absolute;
		bottom: 0.3rem;
		left: 50%;
		width: 4px;
		height: 4px;
		margin-left: -2px;
		border-radius: 50%;
		background: var(--signal);
	}
	.roll {
		display: inline-block;
		height: 1.3em;
		overflow: hidden;
		line-height: 1.3em;
	}
	.roll > span {
		display: block;
		text-shadow: 0 1.3em currentColor;
		transition: translate 450ms cubic-bezier(0.16, 1, 0.3, 1);
	}
	.nav-link:hover .roll > span {
		translate: 0 -1.3em;
	}

	.availability {
		align-items: center;
		gap: 0.5rem;
		margin-right: 0.35rem;
		color: var(--muted-foreground);
		font-family: var(--font-mono);
		font-size: 0.62rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}
	.availability i {
		width: 0.45rem;
		height: 0.45rem;
		border-radius: 50%;
		background: #34d399;
		box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.15);
	}
	@media (prefers-reduced-motion: no-preference) {
		.availability i {
			animation: breathe 2.6s ease-in-out infinite;
		}
	}
	@keyframes breathe {
		50% {
			box-shadow: 0 0 0 6px rgba(52, 211, 153, 0);
		}
	}

	.nav-cta {
		display: inline-flex;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		gap: 0.55rem;
		min-height: 2.75rem;
		padding: 0 0.4rem 0 1.1rem;
		border-radius: 999px;
		background: var(--foreground);
		color: var(--background);
		font-size: 0.82rem;
		font-weight: 700;
		white-space: nowrap;
	}
	.nav-cta.hidden {
		display: none;
	}
	@media (min-width: 640px) {
		.nav-cta.sm\:inline-flex {
			display: inline-flex;
		}
	}
	.nav-cta-icon {
		display: grid;
		width: 2rem;
		height: 2rem;
		place-items: center;
		border-radius: 50%;
		background: var(--signal);
		color: #fff;
		transition: rotate 500ms cubic-bezier(0.16, 1, 0.3, 1);
	}
	.nav-cta:hover .nav-cta-icon {
		rotate: 45deg;
	}

	/* Two-bar burger that folds into an X. */
	.menu-button {
		position: relative;
		width: 2.75rem;
		height: 2.75rem;
		cursor: pointer;
		border: 1px solid var(--border);
		border-radius: 999px;
		background: color-mix(in srgb, var(--card) 70%, transparent);
		color: var(--foreground);
	}
	.menu-button span {
		position: absolute;
		left: 50%;
		width: 1.1rem;
		height: 1.5px;
		margin-left: -0.55rem;
		border-radius: 2px;
		background: currentColor;
		transition:
			translate 400ms cubic-bezier(0.16, 1, 0.3, 1),
			rotate 400ms cubic-bezier(0.16, 1, 0.3, 1);
	}
	.menu-button span:first-child {
		top: calc(50% - 3.5px);
	}
	.menu-button span:last-child {
		top: calc(50% + 2.5px);
	}
	.menu-button.open span:first-child {
		translate: 0 3px;
		rotate: 45deg;
	}
	.menu-button.open span:last-child {
		translate: 0 -3px;
		rotate: -45deg;
	}

	.mobile-menu {
		position: fixed;
		top: 5rem;
		right: 0.75rem;
		left: 0.75rem;
		display: none;
		width: auto;
		max-height: calc(100dvh - 6rem);
		margin: 0;
		overflow-y: auto;
		padding: 0.75rem 1.25rem 1.25rem;
		border: 1px solid var(--border);
		border-radius: 1.25rem;
		background: var(--background);
		box-shadow: 0 30px 60px -24px rgba(0, 0, 0, 0.6);
		color: var(--foreground);
	}
	.mobile-menu:popover-open {
		display: grid;
	}
	@media (min-width: 640px) {
		.mobile-menu {
			top: 5.5rem;
			right: 1.5rem;
			left: 1.5rem;
		}
	}
	.mobile-link {
		display: flex;
		align-items: baseline;
		gap: 1rem;
		padding: 0.9rem 0;
		border-bottom: 1px solid var(--border);
		font-family: var(--font-heading);
		font-size: clamp(2rem, 9vw, 3rem);
		font-weight: 600;
		letter-spacing: -0.045em;
		line-height: 1;
	}
	.mobile-link small {
		color: var(--signal);
		font-family: var(--font-mono);
		font-size: 0.7rem;
		font-weight: 400;
		letter-spacing: 0;
	}
	.mobile-link :global(.mobile-link-arrow) {
		width: 1.5rem;
		height: 1.5rem;
		margin-left: auto;
		align-self: center;
		color: var(--muted-foreground);
		transition: rotate 400ms cubic-bezier(0.16, 1, 0.3, 1);
	}
	.mobile-link.active,
	.mobile-link:hover {
		color: var(--signal);
	}
	.mobile-link:hover :global(.mobile-link-arrow) {
		rotate: 45deg;
	}
	.mobile-foot {
		display: grid;
		gap: 1rem;
		padding-top: 1.25rem;
	}
	@media (prefers-reduced-motion: no-preference) {
		.mobile-menu:popover-open {
			animation: menu-reveal 400ms cubic-bezier(0.16, 1, 0.3, 1);
		}
		.mobile-menu:popover-open .mobile-link {
			animation: link-in 600ms cubic-bezier(0.16, 1, 0.3, 1) both;
			animation-delay: calc(var(--i) * 60ms + 80ms);
		}
	}
	@keyframes menu-reveal {
		from {
			opacity: 0;
			clip-path: inset(0 0 100% 0 round 1.25rem);
		}
		to {
			opacity: 1;
			clip-path: inset(0 0 0 0 round 1.25rem);
		}
	}
	@keyframes link-in {
		from {
			opacity: 0;
			translate: 0 1.25rem;
		}
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
