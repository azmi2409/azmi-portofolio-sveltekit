<svelte:head>
	<title>About — Azmi Muwahid</title>
	<meta
		name="description"
		content="About Azmi Muwahid, a senior full stack engineer focused on practical AI systems, agentic workflows, RAG, and realtime product interfaces."
	/>
	<link rel="canonical" href="https://azmi.web.id/about" />
	<meta property="og:title" content="About — Azmi Muwahid" />
	<meta property="og:description" content="About Azmi Muwahid, a senior full stack engineer focused on practical AI systems, agentic workflows, RAG, and realtime product interfaces." />
	<meta property="og:url" content="https://azmi.web.id/about" />
	<meta property="og:image" content="https://azmi.web.id/logo.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="About — Azmi Muwahid" />
	<meta name="twitter:image" content="https://azmi.web.id/logo.png" />
</svelte:head>

<section class="px-6 py-32">
	<div class="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
		<div>
			<p class="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">About</p>
			<h1 class="text-5xl font-black tracking-tight text-zinc-50 sm:text-7xl">
				I work best at the seam between product and systems.
			</h1>
		</div>
		<div class="space-y-6 text-lg leading-8 text-zinc-400">
			<p>
				I’m a senior full stack engineer with a background in Rails, TypeScript, SvelteKit, cloud
				infrastructure, and AI product workflows. I care about the unglamorous parts that make AI
				features reliable: queues, retries, latency budgets, eval loops, and human review states.
			</p>
			<p>
				My recent work focuses on agentic workflows, RAG-backed interfaces, low-latency audio
				interactions, and product UI that makes model behavior understandable instead of mysterious.
			</p>
			<p>
				Before software, I studied fisheries and ecosystem thinking. That bias still shows up in how
				I approach systems: map the feedback loops, reduce hidden failure modes, and make the
				important signals visible.
			</p>
		</div>
	</div>
	<div class="mx-auto mt-16 grid max-w-6xl gap-5 md:grid-cols-3">
		{#each ['AI workflow architecture', 'Full stack product delivery', 'Readable technical tradeoffs'] as item}
			<div class="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.03] p-6 text-zinc-200">
				{item}
			</div>
		{/each}
	</div>
</section>
