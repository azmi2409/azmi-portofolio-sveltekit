<script>
	import { tabs } from '$lib/tabs';
	export let active = 1;
	export let content = tabs[active - 1].content;
</script>

<div>
	<ul class="tabs tabs-boxed">
		{#each tabs as tab}
			<li
				on:click={() => {
					active = tab.id;
					content = tab.content;
				}}
				class="tab tab-lg text-2xl font-bold {tab.id === active ? 'tab-active' : ''}"
			>
				{tab.name}
			</li>
		{/each}
	</ul>
</div>
<div>
	<svelte:component this={content} />
</div>
