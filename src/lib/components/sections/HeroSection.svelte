<script lang="ts">
	import { ArrowRight, Mail } from '@lucide/svelte';
	import { socialLinks, emailLink } from '$lib/config/socialLinks';
	import type { SiteMetric } from '$lib/types/portfolio';

	let { metrics = [] }: { metrics?: SiteMetric[] } = $props();
</script>

<section id="hero" class="relative overflow-hidden px-6 pb-20 pt-28 sm:pb-28 sm:pt-36">
	<div class="pointer-events-none absolute inset-0 editorial-grid opacity-60"></div>
	<div
		class="pointer-events-none absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-white/[0.035] blur-3xl"
	></div>

	<div class="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
		<div>
			<p
				class="mb-6 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400"
			>
				AI systems engineer / full stack product builder
			</p>
			<h1
				class="max-w-4xl text-5xl font-black leading-[0.92] tracking-[-0.06em] text-zinc-50 sm:text-7xl lg:text-8xl"
			>
				I build AI workflows that survive real product constraints.
			</h1>
			<p class="mt-8 max-w-2xl text-lg leading-8 text-zinc-400 sm:text-xl">
				I'm Azmi Muwahid, a senior full stack engineer focused on agentic workflows, RAG, tool
				calling, and real-time interfaces. My work sits where product UX, backend reliability, and
				model behavior have to line up.
			</p>

			<div class="mt-10 flex flex-col gap-3 sm:flex-row">
				<a
					class="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-50 px-6 py-3 text-sm font-bold text-zinc-950 shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
					href="/projects"
				>
					View case studies
					<ArrowRight class="h-4 w-4" />
				</a>
				<a
					class="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-zinc-200 transition hover:border-white/25 hover:bg-white/[0.04]"
					href="/contact"
				>
					Start a conversation
				</a>
			</div>

			<div class="mt-10 flex flex-wrap items-center gap-3 text-zinc-500">
				{#each socialLinks as social}
					{@const Icon = social.icon}
					<a
						href={social.href}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={social.label}
						class="rounded-full p-2 transition-all duration-200 hover:bg-white/[0.06] hover:text-zinc-200 hover:scale-110"
					>
						<Icon class="h-5 w-5" />
					</a>
				{/each}
				<a
					href={emailLink.href}
					aria-label={emailLink.label}
					class="rounded-full p-2 transition-all duration-200 hover:bg-white/[0.06] hover:text-zinc-200 hover:scale-110"
				>
					<Mail class="h-5 w-5" />
				</a>
			</div>
		</div>

		<div
			class="rounded-[2rem] border border-white/[0.08] bg-zinc-950/60 p-5 shadow-2xl shadow-black/40 backdrop-blur"
		>
			<div class="mb-5 flex items-center justify-between border-b border-white/[0.06] pb-4">
				<p class="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
					Proof, not hype
				</p>
				<span class="relative flex h-2 w-2">
					<span
						class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"
					></span>
					<span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
				</span>
			</div>
			<div class="space-y-4">
				{#each metrics as metric, i}
					<article
						class="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05] hover:-translate-y-0.5"
						style="animation: fadeSlideUp 0.5s ease {i * 100 + 200}ms both;"
					>
						<p class="text-2xl font-black tracking-tight text-zinc-50">{metric.value}</p>
						<h2 class="mt-1 text-sm font-semibold text-zinc-300">{metric.label}</h2>
						<p class="mt-2 text-sm leading-6 text-zinc-500">{metric.detail}</p>
					</article>
				{/each}
			</div>
		</div>
	</div>
</section>
