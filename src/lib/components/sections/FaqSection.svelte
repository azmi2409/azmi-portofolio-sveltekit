<script lang="ts">
	import { faqItems, faqPageSchema } from '$lib/data/faq';
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(faqPageSchema())}<\/script>`}
</svelte:head>

<section id="faq" class="border-t border-border px-6 py-24 sm:py-32" aria-labelledby="faq-heading">
	<div class="mx-auto max-w-7xl">
		<p class="section-index mb-8"><b>(05)</b> Questions</p>
		<h2
			id="faq-heading"
			class="max-w-3xl text-4xl leading-[1.02] font-semibold tracking-[-0.045em] sm:text-6xl"
		>
			Answers, in <span class="accent-serif text-muted-foreground">plain language.</span>
		</h2>
		<p class="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
			Who Azmi is, what KilatBot is, who it is for, and how to get in touch.
		</p>
		<div class="mt-12 divide-y divide-border border-y border-border">
			{#each faqItems as item (item.question)}
				<article class="grid gap-3 py-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-12">
					<h3 class="text-xl leading-snug font-semibold tracking-[-0.03em]">{item.question}</h3>
					<p class="leading-7 text-muted-foreground">
						{#each item.answer as part, index (index)}
							{#if part.href}
								<a
									href={part.href}
									class="link-sweep text-foreground"
									target={part.href.startsWith('mailto:') ? undefined : '_blank'}
									rel={part.href.startsWith('mailto:') ? undefined : 'noreferrer'}>{part.text}</a
								>
							{:else}
								{part.text}
							{/if}
						{/each}
					</p>
				</article>
			{/each}
		</div>
	</div>
</section>
