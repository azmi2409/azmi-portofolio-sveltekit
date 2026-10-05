<script lang="ts">
	import { onMount } from 'svelte';

	let { class: className = '' }: { class?: string } = $props();
	const format = new Intl.DateTimeFormat('en-GB', {
		hour: '2-digit',
		minute: '2-digit',
		timeZone: 'Asia/Jakarta'
	});
	// Rendered client-side only so server and client markup always agree.
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
	<time class="tabular-nums">{time || '--:--'}</time> GMT+7
</span>
