<!--
  Footer.svelte
  Simple footer with copyright, quick links, and tagline.
  Uses shadcn Separator for visual divider and semantic <footer> element.
  Requirements: 9.4
-->

<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import { Linkedin, Github, Mail } from '@lucide/svelte';

	const currentYear = new Date().getFullYear();

	const quickLinks = [
		{
			icon: Linkedin,
			label: 'LinkedIn',
			href: 'https://linkedin.com/in/azmimuwahid'
		},
		{
			icon: Github,
			label: 'GitHub',
			href: 'https://github.com/azmimuwahid'
		},
		{
			icon: Mail,
			label: 'Email',
			href: 'mailto:azmimuwahid@gmail.com'
		}
	];
</script>

<footer class="pb-8 pt-4">
	<div class="mx-auto max-w-4xl px-6">
		<Separator class="mb-8" />

		<div class="flex flex-col items-center gap-4 text-center">
			<!-- Social links -->
			<div class="flex items-center gap-3">
				{#each quickLinks as link}
					{@const Icon = link.icon}
					<a
						href={link.href}
						target={link.href.startsWith('mailto:') ? undefined : '_blank'}
						rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
						aria-label={link.label}
						class="inline-flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
					>
						<Icon class="h-4 w-4" />
					</a>
				{/each}
			</div>

			<!-- Copyright and tagline -->
			<div class="space-y-1 text-sm text-muted-foreground">
				<p>&copy; {currentYear} Azmi Muwahid. All rights reserved.</p>
				<p>Built with SvelteKit &amp; Tailwind CSS</p>
			</div>
		</div>
	</div>
</footer>
