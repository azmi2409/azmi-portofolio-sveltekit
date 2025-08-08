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
			const sections = navItems.map(item => document.getElementById(item.id)).filter(Boolean);
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

<nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {
	isScrolled 
		? 'bg-background/80 backdrop-blur-md border-b border-border shadow-lg' 
		: 'bg-transparent'
}">
	<div class="max-w-6xl mx-auto px-6">
		<div class="flex items-center justify-between h-16">
			<!-- Logo -->
			<a href="#hero" on:click|preventDefault={() => scrollToSection('#hero')} class="text-2xl font-bold text-primary hover:text-primary/80 transition-colors">
				AZMI
			</a>

			<!-- Desktop Navigation -->
			<div class="hidden md:flex items-center space-x-8">
				{#each navItems as item}
					<a 
						href={item.href}
						on:click|preventDefault={() => scrollToSection(item.href)}
						class="relative px-3 py-2 text-sm font-medium transition-all duration-300 {
							activeSection === item.id 
								? 'text-primary' 
								: 'text-muted-foreground hover:text-foreground'
						}"
					>
						{item.name}
						{#if activeSection === item.id}
							<div class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"></div>
						{/if}
					</a>
				{/each}
			</div>

			<!-- Theme Toggle -->
			<div class="hidden md:block">
				<ThemeToggle />
			</div>

			<!-- Mobile controls -->
			<div class="md:hidden flex items-center space-x-2">
				<ThemeToggle />
				<button 
					on:click={toggleMobileMenu}
					class="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
					aria-label="Toggle mobile menu"
				>
					{#if isMobileMenuOpen}
						<X class="w-6 h-6" />
					{:else}
						<Menu class="w-6 h-6" />
					{/if}
				</button>
			</div>
		</div>

		<!-- Mobile Navigation -->
		{#if isMobileMenuOpen}
			<div class="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
				<div class="px-2 pt-2 pb-3 space-y-1">
					{#each navItems as item}
						<a 
							href={item.href}
							on:click|preventDefault={() => scrollToSection(item.href)}
							class="block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 {
								activeSection === item.id 
									? 'text-primary bg-primary/10' 
									: 'text-muted-foreground hover:text-foreground hover:bg-muted'
							}"
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