<script lang="ts">
	import { onMount } from 'svelte';

	let { class: className = '' }: { class?: string } = $props();
	const format = new Intl.DateTimeFormat('en-GB', {
		hour: '2-digit',
		minute: '2-digit',
		timeZone: 'Asia/Jakarta'
	});
	// Client-side only: pages are cached, so a server-rendered time would be stale.
	// Until it mounts, the label reads "Bogor, ID · GMT+7" with no placeholder.
	let time = $state('');

	onMount(() => {
		const tick = () => (time = format.format(new Date()));
		tick();
		const timer = setInterval(tick, 15_000);
		return () => clearInterval(timer);
	});
</script>

<span class={className}>
	Bogor, ID <span aria-hidden="true">·</span>
	{#if time}<time class="tabular-nums">{time}</time>{/if} GMT+7
</span>
