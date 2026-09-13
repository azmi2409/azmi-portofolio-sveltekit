<script lang="ts">
	import IndependentWork from '$lib/components/sections/IndependentWork.svelte';
	let { data } = $props();
</script>

<svelte:head>
	<title>Lab — Azmi Muwahid</title>
	<meta
		name="description"
		content="Practical experiments in making everyday work easier: clearer AI assistance, faster feedback, and useful tools."
	/>
	<link rel="canonical" href="https://azmi.web.id/lab" />
	<meta property="og:title" content="Lab — Azmi Muwahid" />
	<meta
		property="og:description"
		content="Practical experiments in making everyday work easier: clearer AI assistance, faster feedback, and useful tools."
	/>
	<meta property="og:url" content="https://azmi.web.id/lab" />
	<meta property="og:image" content="https://azmi.web.id/assets/profile.webp" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Lab — Azmi Muwahid" />
	<meta name="twitter:image" content="https://azmi.web.id/assets/profile.webp" />
</svelte:head>

<section class="px-6 py-32">
	<div class="mx-auto max-w-6xl">
		<p class="mb-4 text-xs font-semibold tracking-[0.28em] text-zinc-500 uppercase">Lab</p>
		<h1 class="max-w-4xl text-5xl font-black tracking-tight text-zinc-50 sm:text-7xl">
			Testing better ways to get work done.
		</h1>
		<div class="mt-14 grid gap-5 md:grid-cols-2">
			{#each data.experiments as experiment}
				<article class="rounded-[2rem] border border-white/[0.08] bg-white/[0.03] p-6">
					<p class="text-xs font-semibold tracking-[0.24em] text-zinc-600 uppercase">
						{experiment.status} / {experiment.year}
					</p>
					<h2 class="mt-4 text-2xl font-black text-zinc-50">{experiment.name}</h2>
					<p class="mt-4 leading-7 text-zinc-400">{experiment.summary}</p>
					<p
						class="mt-5 rounded-2xl border border-white/[0.06] p-4 text-sm leading-6 text-zinc-300"
					>
						{experiment.outcome}
					</p>
					<div class="mt-5 flex flex-wrap gap-2">
						{#each experiment.stack as item}<span
								class="rounded-full border border-white/[0.08] px-3 py-1 text-xs text-zinc-500"
								>{item}</span
							>{/each}
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>
<IndependentWork />
