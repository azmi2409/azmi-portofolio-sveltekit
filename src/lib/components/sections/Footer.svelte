<!--
  Footer.svelte
  Enhanced dark footer: brand column, nav links, social icons, CTA, legal strip.
-->

<script lang="ts">
	import { socialLinks, emailLink } from '$lib/config/socialLinks';
	import { Mail } from '@lucide/svelte';

	const currentYear = new Date().getFullYear();

	const navLinks = [
		{ href: '/', label: 'Home' },
		{ href: '/projects', label: 'Projects' },
		{ href: '/about', label: 'About' },
		{ href: '/lab', label: 'Lab' },
		{ href: '/blog', label: 'Blog' },
		{ href: '/contact', label: 'Contact' }
	];
</script>

<footer class="relative overflow-hidden bg-zinc-950">
	<!-- Top gradient separator -->
	<div
		class="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent"
	></div>

	<!-- Ambient glow -->
	<div
		class="pointer-events-none absolute left-1/2 top-0 h-[20rem] w-[40rem] -translate-x-1/2 rounded-full bg-white/[0.015] blur-3xl"
	></div>

	<div class="relative z-10 mx-auto max-w-6xl px-6">
		<!-- Main footer grid -->
		<div class="grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-8">

			<!-- Brand column -->
			<div class="flex flex-col gap-6">
				<a href="/" class="group flex items-center gap-3 w-fit">
					<div
						class="flex h-10 w-10 items-center justify-center rounded-xl text-lg font-black transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_0_24px_rgba(255,255,255,0.3)]"
						style="background: #fafafa; color: #09090b; font-family: var(--font-heading);"
					>
						A
					</div>
					<span
						class="text-xl font-bold tracking-tight text-white transition-colors group-hover:text-zinc-300"
						style="font-family: var(--font-heading);"
					>
						Azmi Muwahid
					</span>
				</a>

				<p class="max-w-xs text-sm leading-7 text-zinc-500">
					Senior full stack engineer building agentic workflows, RAG systems, and real-time AI
					product interfaces. Based in South East Asia, available globally.
				</p>

				<!-- Availability badge -->
				<div class="flex items-center gap-2 w-fit rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5">
					<span class="relative flex h-2 w-2">
						<span
							class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60"
						></span>
						<span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
					</span>
					<span class="text-xs font-medium text-emerald-400">Available for new projects</span>
				</div>

				<!-- Social icons -->
				<div class="flex flex-wrap gap-2.5">
					{#each socialLinks as social}
						{@const Icon = social.icon}
						<a
							href={social.href}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={social.label}
							class="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-500 transition-all duration-200 {social.hoverColor} hover:scale-110 hover:border-transparent"
						>
							<Icon class="h-4 w-4" />
						</a>
					{/each}
					<a
						href={emailLink.href}
						aria-label="Email"
						class="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-500 transition-all duration-200 hover:bg-zinc-50 hover:text-zinc-900 hover:scale-110 hover:border-transparent"
					>
						<Mail class="h-4 w-4" />
					</a>
				</div>
			</div>

			<!-- Navigation column -->
			<div>
				<h3 class="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
					Navigation
				</h3>
				<nav class="flex flex-col gap-3">
					{#each navLinks as link}
						<a
							href={link.href}
							class="text-sm text-zinc-400 transition-colors hover:text-zinc-200 w-fit"
						>
							{link.label}
						</a>
					{/each}
				</nav>
			</div>

			<!-- Contact / CTA column -->
			<div>
				<h3 class="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
					Get in Touch
				</h3>
				<div class="flex flex-col gap-4">
					<p class="text-sm leading-6 text-zinc-500">
						Have a project in mind? I'd love to hear about it.
					</p>
					<a
						href="/contact"
						class="group inline-flex w-fit items-center gap-2 rounded-full bg-zinc-50 px-5 py-2.5 text-sm font-bold text-zinc-900 shadow-[0_0_16px_rgba(255,255,255,0.1)] transition-all hover:bg-white hover:shadow-[0_0_24px_rgba(255,255,255,0.2)]"
					>
						Start a conversation
						<span class="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
					</a>
					<a
						href={emailLink.href}
						class="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
					>
						azmimuwahid@gmail.com
					</a>
				</div>
			</div>
		</div>

		<!-- Bottom legal strip -->
		<div
			class="flex flex-col items-center justify-between gap-4 border-t border-zinc-800/60 py-6 sm:flex-row"
		>
			<p class="text-xs text-zinc-600">
				© {currentYear} Azmi Muwahid. All rights reserved.
			</p>
			<p class="text-xs text-zinc-700">
				Built with <span class="text-zinc-500">SvelteKit</span> ·
				<span class="text-zinc-500">Tailwind CSS</span> ·
				<span class="text-zinc-500">Deployed on Netlify</span>
			</p>
		</div>
	</div>
</footer>
