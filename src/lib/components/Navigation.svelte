<script lang="ts">
	import { onMount } from 'svelte';
	import { Menu, X } from '@lucide/svelte';
	import ThemeToggle from './ThemeToggle.svelte';

	let isScrolled = false;
	let isMobileMenuOpen = false;
	let activeSection = 'hero';

	const navItems = [
		{ name: 'Home', href: '#hero', id: 'hero' },
		{ name: 'About', href: '#about', id: 'about' },
		{ name: 'Portfolio', href: '#portfolio', id: 'portfolio' },
		{ name: 'Contact', href: '#contact', id: 'contact' }
	];

	onMount(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 50;

			// Update active section based on scroll position
			const sections = navItems.map((item) => document.getElementById(item.id)).filter(Boolean);
			const scrollPosition = window.scrollY + 100;

			for (let i = sections.length - 1; i >= 0; i--) {
				const section = sections[i];
				if (section && section.offsetTop <= scrollPosition) {
					activeSection = navItems[i].id;
					break;
				}
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	const scrollToSection = (href: string) => {
		const targetId = href.replace('#', '');
		const element = document.getElementById(targetId);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
		isMobileMenuOpen = false;
	};

	const toggleMobileMenu = () => {
		isMobileMenuOpen = !isMobileMenuOpen;
	};
</script>

<nav
	class="fixed top-0 right-0 left-0 z-50 transition-all duration-300 {isScrolled
		? 'border-b border-border bg-background/80 shadow-lg backdrop-blur-md'
		: 'bg-transparent'}"
>
	<div class="mx-auto max-w-6xl px-6">
		<div class="flex h-16 items-center justify-between">
			<!-- Logo -->
			<a
				href="#hero"
				on:click|preventDefault={() => scrollToSection('#hero')}
				class="text-2xl font-bold text-primary transition-colors hover:text-primary/80"
			>
				Azmi
			</a>

			<!-- Desktop Navigation -->
			<div class="hidden items-center space-x-8 md:flex">
				{#each navItems as item}
					<a
						href={item.href}
						on:click|preventDefault={() => scrollToSection(item.href)}
						class="relative px-3 py-2 text-sm font-medium transition-all duration-300 {activeSection ===
						item.id
							? 'text-primary'
							: 'text-muted-foreground hover:text-foreground'}"
					>
						{item.name}
						{#if activeSection === item.id}
							<div class="absolute right-0 bottom-0 left-0 h-0.5 rounded-full bg-primary"></div>
						{/if}
					</a>
				{/each}
			</div>

			<!-- Theme Toggle -->
			<div class="hidden md:block">
				<ThemeToggle />
			</div>

			<!-- Mobile controls -->
			<div class="flex items-center space-x-2 md:hidden">
				<ThemeToggle />
				<button
					on:click={toggleMobileMenu}
					class="rounded-lg bg-muted p-2 transition-colors hover:bg-muted/80"
					aria-label="Toggle mobile menu"
				>
					{#if isMobileMenuOpen}
						<X class="h-6 w-6" />
					{:else}
						<Menu class="h-6 w-6" />
					{/if}
				</button>
			</div>
		</div>

		<!-- Mobile Navigation -->
		{#if isMobileMenuOpen}
			<div class="border-t border-border bg-background/95 backdrop-blur-md md:hidden">
				<div class="space-y-1 px-2 pt-2 pb-3">
					{#each navItems as item}
						<a
							href={item.href}
							on:click|preventDefault={() => scrollToSection(item.href)}
							class="block rounded-md px-3 py-2 text-base font-medium transition-all duration-300 {activeSection ===
							item.id
								? 'bg-primary/10 text-primary'
								: 'text-muted-foreground hover:bg-muted hover:text-foreground'}"
						>
							{item.name}
						</a>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</nav>

<!-- Spacer to prevent content from hiding behind fixed nav -->
<div class="h-16"></div>
