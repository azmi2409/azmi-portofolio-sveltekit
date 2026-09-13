<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
	import type { SiteMetric } from '$lib/types/portfolio';
	let { metrics = [] }: { metrics?: SiteMetric[] } = $props();
</script>

<section id="hero" class="px-6 pt-32 pb-12 sm:pt-40 sm:pb-16">
	<div class="mx-auto max-w-7xl">
		<div class="grid items-center gap-10 lg:grid-cols-[1.35fr_0.8fr] lg:gap-20">
			<div>
				<p class="eyebrow mb-6">Azmi Muwahid · AI & Automation Consultant</p>
				<h1 class="text-[clamp(2.8rem,5.7vw,5.5rem)] leading-[1.02] font-black tracking-[-0.055em]">
					Less busywork.<br />More room to
					<span class="text-[var(--signal)]">grow your business.</span>
				</h1>
				<p class="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
					I help you use AI and practical software to automate repetitive work, reduce operating
					costs, and serve customers better. From finding the right opportunity to building a
					solution your team can use every day.
				</p>
				<p class="mt-5 flex items-start gap-3 text-sm text-muted-foreground">
					<span class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--signal)]"></span>
					Available for remote consulting and hands-on delivery.
				</p>
				<div class="mt-7 flex flex-wrap gap-3">
					<a class="button-primary" href="#projects"
						>See solutions in action <ArrowRight class="h-4 w-4" /></a
					>
					<a class="button-secondary" href="#contact">Discuss your business</a>
				</div>
				<div class="mt-5 flex flex-wrap gap-x-6 text-sm font-semibold">
					<a
						class="inline-flex min-h-11 items-center hover:underline"
						href="https://linkedin.com/in/azmimuwahid"
						target="_blank"
						rel="noreferrer">LinkedIn</a
					>
					<a
						class="inline-flex min-h-11 items-center hover:underline"
						href="https://github.com/azmi2409"
						target="_blank"
						rel="noreferrer">GitHub</a
					>
					<a
						class="inline-flex min-h-11 items-center hover:underline"
						href="mailto:azmimuwahid@gmail.com?subject=R%C3%A9sum%C3%A9%20request">Request résumé</a
					>
				</div>
			</div>
			<figure class="mx-auto w-full max-w-sm lg:max-w-none">
				<img
					src="/assets/profile.webp"
					alt="Azmi Muwahid outside the Amazon Spheres in Seattle"
					width="819"
					height="1024"
					fetchpriority="high"
					class="aspect-[4/5] w-full rounded-2xl object-cover"
				/>
				<figcaption class="mt-4 flex justify-between gap-4 text-xs text-muted-foreground">
					<span>Business first. Technology with a purpose.</span><span>Seattle, WA</span>
				</figcaption>
			</figure>
		</div>
		<dl class="mt-12 grid gap-6 border-y border-border py-6 sm:grid-cols-3">
			{#each metrics as metric}
				<div>
					<dt class="text-sm text-muted-foreground">{metric.label}</dt>
					<dd class="mt-2 font-semibold">{metric.value}</dd>
				</div>
			{/each}
		</dl>
	</div>
</section>
