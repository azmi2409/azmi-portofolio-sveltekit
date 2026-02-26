<script lang="ts">
	import { onMount } from 'svelte';
	import { Menu } from '@lucide/svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import ThemeToggle from './ThemeToggle.svelte';

	interface NavItem {
		name: string;
		href: string;
		sectionId: string;
	}

	const NAV_ITEMS: NavItem[] = [
		{ name: 'Home', href: '#hero', sectionId: 'hero' },
		{ name: 'Tech Stack', href: '#tech-stack', sectionId: 'tech-stack' },
		{ name: 'GitHub', href: '#github-stats', sectionId: 'github-stats' },
		{ name: 'Projects', href: '#projects', sectionId: 'projects' },
		{ name: 'Contact', href: '#contact', sectionId: 'contact' }
	];

	let isScrolled = $state(false);
	let activeSection = $state('hero');
	let sheetOpen = $state(false);

	function scrollToSection(sectionId: string) {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
		sheetOpen = false;
	}

	function handleNavClick(e: MouseEvent | KeyboardEvent, item: NavItem) {
		e.preventDefault();
		scrollToSection(item.sectionId);
	}

	onMount(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 50;

			const scrollPosition = window.scrollY + 120;

			for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
				const section = document.getElementById(NAV_ITEMS[i].sectionId);
				if (section && section.offsetTop <= scrollPosition) {
					activeSection = NAV_ITEMS[i].sectionId;
					break;
				}
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<header>
	<nav
		class="fixed top-0 right-0 left-0 z-50 transition-all duration-300 {isScrolled
			? 'border-b border-border bg-background/80 shadow-lg backdrop-blur-md'
			: 'bg-transparent'}"
		aria-label="Main navigation"
	>
		<div class="mx-auto max-w-6xl px-6">
			<div class="flex h-16 items-center justify-between">
				<!-- Logo -->
				<a
					href="#hero"
					onclick={(e) => { e.preventDefault(); scrollToSection('hero'); }}
					class="group flex items-center gap-2.5 transition-transform duration-300 hover:scale-[1.03]"
					aria-label="Go to top"
				>
					<div class="relative">
						<!-- Glow effect on hover -->
						<div class="absolute -inset-1 rounded-xl bg-primary/0 blur-md transition-all duration-500 group-hover:bg-primary/20"></div>
						<svg
							width="38"
							height="38"
							viewBox="0 0 120 120"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							class="relative"
						>
							<defs>
								<linearGradient id="logo-grad" x1="60" y1="10" x2="60" y2="90" gradientUnits="userSpaceOnUse">
									<stop offset="0%" class="[stop-color:var(--primary)]" stop-opacity="1" />
									<stop offset="100%" class="[stop-color:var(--primary)]" stop-opacity="0.6" />
								</linearGradient>
								<filter id="logo-shadow" x="-10%" y="-10%" width="120%" height="130%">
									<feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.15" />
								</filter>
							</defs>
							<!-- Outer triangle with rounded feel via stroke -->
							<polygon
								points="60,14 106,88 14,88"
								fill="url(#logo-grad)"
								stroke="var(--primary)"
								stroke-width="2"
								stroke-linejoin="round"
								filter="url(#logo-shadow)"
							/>
							<!-- Subtle inner triangle outline for depth -->
							<polygon
								points="60,30 92,80 28,80"
								fill="none"
								stroke="var(--primary-foreground)"
								stroke-width="1"
								stroke-linejoin="round"
								opacity="0.15"
							/>
							<!-- Letter A -->
							<text
								x="60"
								y="79"
								font-family="'Inter', 'Montserrat', system-ui, sans-serif"
								font-size="42"
								font-weight="800"
								text-anchor="middle"
								letter-spacing="-1"
								class="fill-primary-foreground"
							>A</text>
						</svg>
					</div>
					<div class="flex flex-col leading-none">
						<span class="text-[17px] font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary uppercase">
							Azmi
						</span>
						<span class="text-[10px] font-medium tracking-[0.15em] text-muted-foreground/70 uppercase">
							engineer
						</span>
					</div>
				</a>

				<!-- Desktop Navigation (hidden below md/768px) -->
				<div class="hidden items-center gap-1 md:flex">
					{#each NAV_ITEMS as item}
						<Button
							variant="ghost"
							href={item.href}
							onclick={(e) => handleNavClick(e, item)}
							class="relative text-sm font-medium {activeSection === item.sectionId
								? 'text-primary'
								: 'text-muted-foreground'}"
						>
							{item.name}
							{#if activeSection === item.sectionId}
								<span class="absolute right-2 bottom-0 left-2 h-0.5 rounded-full bg-primary"></span>
							{/if}
						</Button>
					{/each}
				</div>

				<!-- Desktop ThemeToggle (hidden below md) -->
				<div class="hidden md:block">
					<ThemeToggle />
				</div>

				<!-- Mobile controls (visible below md) -->
				<div class="flex items-center gap-2 md:hidden">
					<ThemeToggle />
					<Sheet.Root bind:open={sheetOpen}>
						<Sheet.Trigger>
							{#snippet child({ props })}
								<Button variant="ghost" size="icon" aria-label="Open navigation menu" class="min-h-[44px] min-w-[44px]" {...props}>
									<Menu class="h-5 w-5" />
								</Button>
							{/snippet}
						</Sheet.Trigger>
						<Sheet.Content side="right">
							<Sheet.Header>
								<Sheet.Title>Navigation</Sheet.Title>
							</Sheet.Header>
							<nav class="flex flex-col gap-1 px-2" aria-label="Mobile navigation">
								{#each NAV_ITEMS as item}
									<Button
										variant="ghost"
										href={item.href}
										onclick={(e) => handleNavClick(e, item)}
										class="min-h-[44px] justify-start text-base font-medium {activeSection === item.sectionId
											? 'bg-primary/10 text-primary'
											: 'text-muted-foreground'}"
									>
										{item.name}
									</Button>
								{/each}
							</nav>
						</Sheet.Content>
					</Sheet.Root>
				</div>
			</div>
		</div>
	</nav>
</header>

<!-- Spacer to prevent content from hiding behind fixed nav -->
<div class="h-16"></div>
