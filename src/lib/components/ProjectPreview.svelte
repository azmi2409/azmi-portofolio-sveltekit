<script lang="ts">
	import { ImageOff } from '@lucide/svelte';
	let {
		slug,
		name,
		cover,
		coverAlt,
		liveUrl
	}: { slug: string; name: string; cover?: string; coverAlt?: string; liveUrl?: string } = $props();
</script>

<figure class="preview">
	<div class="browser-bar" aria-hidden="true">
		<i></i><i></i><i></i><span>{liveUrl ?? name}</span>
	</div>
	{#if cover}
		<img
			src={cover}
			alt={coverAlt ?? `${name} product interface`}
			loading="lazy"
			decoding="async"
		/>
		<figcaption>
			{slug === 'futurelab-ai-workflows'
				? 'Public company website · not the private AI workflow'
				: liveUrl
					? 'Public website screenshot'
					: 'Real project image'}
		</figcaption>
	{:else}
		<div class="unavailable">
			<ImageOff class="h-6 w-6" />
			<strong>No public product image</strong>
			<p>
				{name} is private, unavailable, or not publicly deployed. No substitute interface is shown.
			</p>
		</div>
	{/if}
</figure>

<style>
	.preview {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: #10141b;
		color: #f8fafc;
	}
	.browser-bar {
		height: 2.25rem;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		gap: 0.35rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.09);
		padding: 0 0.8rem;
		background: #171c25;
	}
	.browser-bar i {
		width: 0.42rem;
		height: 0.42rem;
		border-radius: 50%;
		background: #596273;
	}
	.browser-bar span {
		overflow: hidden;
		margin-left: 0.35rem;
		color: #9ba6b4;
		font: 0.55rem var(--font-mono);
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	img {
		width: 100%;
		height: 100%;
		flex: 1;
		display: block;
		aspect-ratio: 144 / 100;
		object-fit: cover;
		object-position: top;
	}
	figcaption {
		position: absolute;
		bottom: 0.65rem;
		left: 0.65rem;
		border: 1px solid rgba(255, 255, 255, 0.16);
		border-radius: 999px;
		background: rgba(9, 13, 20, 0.82);
		padding: 0.35rem 0.55rem;
		color: #d8dee8;
		font-size: 0.55rem;
		backdrop-filter: blur(8px);
	}
	.unavailable {
		min-height: 16rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		color: #9ba6b4;
		text-align: center;
	}
	.unavailable strong {
		margin-top: 0.8rem;
		color: #f4f6f8;
		font-family: var(--font-heading);
	}
	.unavailable p {
		max-width: 25rem;
		margin-top: 0.5rem;
		font-size: 0.7rem;
		line-height: 1.6;
	}
</style>
