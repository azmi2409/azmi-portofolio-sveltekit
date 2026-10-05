<script lang="ts">
	const words = [
		'AI agents',
		'Workflow automation',
		'Cloud cost control',
		'Customer journeys',
		'Hands-on delivery'
	];
</script>

<section class="marquee-wrapper overflow-hidden py-10 sm:py-14" aria-label="Capabilities">
	<div class="marquee-band animate-marquee">
		{#each [false, true] as duplicate}
			<div aria-hidden={duplicate ? 'true' : undefined}>
				{#each words as word, index}
					<span class="marquee-word" class:stroke={index % 2 === 1}>{word}</span>
					<svg class="marquee-star" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
						<path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
					</svg>
				{/each}
			</div>
		{/each}
	</div>
</section>

<style>
	section {
		mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
	}

	.animate-marquee {
		animation-duration: 40s;
	}
</style>
