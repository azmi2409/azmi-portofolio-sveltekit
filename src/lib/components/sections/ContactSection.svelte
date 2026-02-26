<!--
  ContactSection.svelte
  Displays contact information, social links, availability message, and current interests.
  Uses shadcn Card, Badge, and Button components.
  Uses inview action pattern for scroll-triggered entrance animations.
  Requirements: 7.1, 7.2, 7.3, 7.4
-->

<script lang="ts">
	import { Mail, Linkedin, Github, Globe } from '@lucide/svelte';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { InviewOptions } from '$lib/actions/inview';

	const socialLinks = [
		{
			icon: Mail,
			label: 'Email',
			href: 'mailto:azmimuwahid@gmail.com',
			text: 'azmimuwahid@gmail.com'
		},
		{
			icon: Linkedin,
			label: 'LinkedIn',
			href: 'https://linkedin.com/in/azmimuwahid',
			text: 'LinkedIn'
		},
		{
			icon: Github,
			label: 'GitHub',
			href: 'https://github.com/azmimuwahid',
			text: 'GitHub'
		},
		{
			icon: Globe,
			label: 'Portfolio',
			href: 'https://azmi.web.id',
			text: 'azmi.web.id'
		}
	];

	const interests = ['Advanced system design', 'Kubernetes', 'ML engineering'];

	let headerVisible = $state(false);
	let cardVisible = $state(false);

	/**
	 * Svelte action that wraps IntersectionObserver for scroll-triggered visibility.
	 * Calls the provided callback when the element enters the viewport.
	 */
	function inviewTrigger(
		node: HTMLElement,
		opts: { options?: InviewOptions; onEnter: () => void }
	) {
		const { threshold = 0.15, rootMargin = '0px', once = true } = opts.options ?? {};

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						opts.onEnter();
						if (once) {
							observer.disconnect();
						}
					}
				}
			},
			{ threshold, rootMargin }
		);

		observer.observe(node);

		return {
			destroy() {
				observer.disconnect();
			}
		};
	}
</script>

<section id="contact" class="py-20">
	<div class="mx-auto max-w-4xl px-6">
		<!-- Section header -->
		<div
			class="mb-16 text-center transition-all duration-700"
			use:inviewTrigger={{
				options: { threshold: 0.2 },
				onEnter: () => (headerVisible = true)
			}}
			class:opacity-0={!headerVisible}
			class:translate-y-6={!headerVisible}
			class:opacity-100={headerVisible}
			class:translate-y-0={headerVisible}
		>
			<h2 class="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
				Get In <span class="text-primary">Touch</span>
			</h2>
			<p class="mx-auto max-w-2xl text-lg text-muted-foreground">
				Let's connect and explore how we can work together.
			</p>
		</div>

		<!-- Contact card -->
		<div
			use:inviewTrigger={{
				onEnter: () => (cardVisible = true)
			}}
			class="transition-all duration-700"
			class:opacity-0={!cardVisible}
			class:translate-y-8={!cardVisible}
			class:scale-95={!cardVisible}
			class:opacity-100={cardVisible}
			class:translate-y-0={cardVisible}
			class:scale-100={cardVisible}
		>
			<Card.Root class="p-2">
				<Card.Header class="text-center">
					<Card.Title class="text-2xl">Let's Connect</Card.Title>
					<Card.Description class="text-base leading-relaxed">
						I'm open to opportunities in <span class="font-medium text-foreground">EdTech</span>,
						<span class="font-medium text-foreground">AI</span>, and
						<span class="font-medium text-foreground">full-stack development</span>.
						Feel free to reach out for collaboration or just to say hello.
					</Card.Description>
				</Card.Header>

				<Card.Content class="space-y-8">
					<!-- Social link buttons -->
					<div class="flex flex-wrap justify-center gap-3">
						{#each socialLinks as link}
							{@const Icon = link.icon}
							<Button
								variant="outline"
								href={link.href}
								target={link.href.startsWith('mailto:') ? undefined : '_blank'}
								rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
								aria-label={link.label}
								class="min-h-[44px] min-w-[44px] gap-2"
							>
								<Icon class="h-4 w-4" />
								{link.text}
							</Button>
						{/each}
					</div>

					<!-- Current interests -->
					<div class="text-center">
						<p class="mb-3 text-sm font-medium text-muted-foreground">Currently exploring</p>
						<div class="flex flex-wrap justify-center gap-2">
							{#each interests as interest}
								<Badge variant="secondary">{interest}</Badge>
							{/each}
						</div>
					</div>
				</Card.Content>
			</Card.Root>
		</div>
	</div>
</section>
