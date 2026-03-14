<!--
  Navigation.svelte — Floating glass pill navbar
-->

<script lang="ts">
	import { onMount } from 'svelte';
	import { Menu, X } from '@lucide/svelte';

	interface NavItem {
		name: string;
		href: string;
		sectionId: string;
	}

	const NAV_ITEMS: NavItem[] = [
		{ name: 'Home', href: '#hero', sectionId: 'hero' },
		{ name: 'Stack', href: '#tech-stack', sectionId: 'tech-stack' },
		{ name: 'GitHub', href: '#github-stats', sectionId: 'github-stats' },
		{ name: 'Projects', href: '#projects', sectionId: 'projects' },
		{ name: 'Contact', href: '#contact', sectionId: 'contact' }
	];

	let isScrolled = $state(false);
	let activeSection = $state('hero');
	let mobileOpen = $state(false);
	let mounted = $state(false);

	function scrollToSection(sectionId: string) {
		document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
		mobileOpen = false;
	}

	function handleNavClick(e: MouseEvent | KeyboardEvent, item: NavItem) {
		e.preventDefault();
		scrollToSection(item.sectionId);
	}

	onMount(() => {
		mounted = true;
		const handleScroll = () => {
			isScrolled = window.scrollY > 60;
			const scrollPos = window.scrollY + 120;
			for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
				const el = document.getElementById(NAV_ITEMS[i].sectionId);
				if (el && el.offsetTop <= scrollPos) {
					activeSection = NAV_ITEMS[i].sectionId;
					break;
				}
			}
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<!-- Floating nav pill -->
<header
	class="fixed top-4 left-1/2 z-50 -translate-x-1/2 transition-all duration-500"
	style="
		width: min(calc(100vw - 2rem), 880px);
		opacity: {mounted ? 1 : 0};
		transform: translateX(-50%) translateY({mounted ? 0 : -12}px);
	"
>
	<nav
		class="rounded-2xl px-4 py-2.5 transition-all duration-300"
		style="
			background: {isScrolled ? 'rgba(15,23,42,0.85)' : 'rgba(15,23,42,0.6)'};
			backdrop-filter: blur(20px);
			-webkit-backdrop-filter: blur(20px);
			border: 1px solid rgba(255,255,255,{isScrolled ? '0.1' : '0.06'});
			box-shadow: {isScrolled ? '0 8px 32px rgba(0,0,0,0.4)' : '0 4px 16px rgba(0,0,0,0.2)'};
		"
		aria-label="Main navigation"
	>
		<div class="flex items-center justify-between">
			<!-- Logo -->
			<a
				href="#hero"
				onclick={(e) => { e.preventDefault(); scrollToSection('hero'); }}
				class="group flex items-center gap-2.5 cursor-pointer"
				aria-label="Go to top"
			>
				<div
					class="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-black transition-all duration-200 group-hover:scale-105"
					style="background: #fafafa; color: #09090b; font-family: var(--font-heading); box-shadow: 0 0 12px rgba(255,255,255,0.25);"
				>
					A
				</div>
				<div class="flex flex-col leading-tight">
					<span
						class="text-[15px] font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-zinc-300"
						style="font-family: var(--font-heading);"
					>Azmi</span>
					<span class="text-[10px] font-medium tracking-[0.14em] uppercase" style="color: #a1a1aa;">
						engineer
					</span>
				</div>
			</a>

			<!-- Desktop nav -->
			<div class="hidden items-center gap-1 md:flex">
				{#each NAV_ITEMS as item}
					<a
						href={item.href}
						onclick={(e) => handleNavClick(e, item)}
						class="relative cursor-pointer rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200"
						style="
							color: {activeSection === item.sectionId ? '#fafafa' : '#a1a1aa'};
							background: {activeSection === item.sectionId ? 'rgba(255,255,255,0.08)' : 'transparent'};
						"
						onmouseenter={(e) => {
							if (activeSection !== item.sectionId) {
								(e.currentTarget as HTMLElement).style.color = '#f4f4f5';
								(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
							}
						}}
						onmouseleave={(e) => {
							if (activeSection !== item.sectionId) {
								(e.currentTarget as HTMLElement).style.color = '#a1a1aa';
								(e.currentTarget as HTMLElement).style.background = 'transparent';
							}
						}}
					>
						{item.name}
						{#if activeSection === item.sectionId}
							<span
								class="absolute bottom-1 left-1/2 h-0.5 w-3 -translate-x-1/2 rounded-full"
								style="background: #fafafa;"
							></span>
						{/if}
					</a>
				{/each}
			</div>

			<!-- Desktop CTA -->
			<div class="hidden md:block">
				<a
					href="#contact"
					onclick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
					class="cursor-pointer rounded-xl px-4 py-2 text-sm font-bold transition-all duration-200"
					style="background: #fafafa; color: #09090b;"
					onmouseenter={(e) => {
						(e.currentTarget as HTMLElement).style.boxShadow = '0 0 16px rgba(255,255,255,0.2)';
						(e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
					}}
					onmouseleave={(e) => {
						(e.currentTarget as HTMLElement).style.boxShadow = 'none';
						(e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
					}}
				>
					Hire Me
				</a>
			</div>

			<!-- Mobile hamburger -->
			<button
				class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl transition-all duration-200 md:hidden"
				style="background: rgba(255,255,255,0.05); color: #e2e8f0; border: 1px solid rgba(255,255,255,0.1);"
				onclick={() => (mobileOpen = !mobileOpen)}
				aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={mobileOpen}
			>
				{#if mobileOpen}
					<X class="h-5 w-5" />
				{:else}
					<Menu class="h-5 w-5" />
				{/if}
			</button>
		</div>

		<!-- Mobile dropdown -->
		{#if mobileOpen}
			<div
				class="mt-2 flex flex-col gap-1 border-t pt-2 md:hidden"
				style="border-color: rgba(255,255,255,0.07);"
			>
				{#each NAV_ITEMS as item}
					<a
						href={item.href}
						onclick={(e) => handleNavClick(e, item)}
						class="cursor-pointer rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200"
						style="
							color: {activeSection === item.sectionId ? '#fafafa' : '#a1a1aa'};
							background: {activeSection === item.sectionId ? 'rgba(255,255,255,0.08)' : 'transparent'};
						"
					>
						{item.name}
					</a>
				{/each}
				<a
					href="#contact"
					onclick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
					class="mt-1 cursor-pointer rounded-xl px-4 py-3 text-center text-sm font-bold transition-all duration-200"
					style="background: #fafafa; color: #09090b;"
				>
					Hire Me
				</a>
			</div>
		{/if}
	</nav>
</header>

<!-- Spacer for the floating header height -->
<div class="h-20"></div>
