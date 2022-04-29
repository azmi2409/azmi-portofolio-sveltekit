<script>
	import Grid from '../components/Grid.svelte';
	import IntersectionObserver from 'svelte-intersection-observer';
	import { menus } from '$lib/menus';
	import Icon from '@iconify/svelte';
	import { scrollTo } from '$lib/helper';

	const findNextId = (id) => {
		const menu = $menus.findIndex((v) => v.id === id);
		if (menu > -1) {
			const result = $menus[menu + 1].id;
			return result;
		}
		return 0;
	};
</script>

<Grid>
	{#each $menus as section (section.id)}
		<IntersectionObserver
			element={section.element}
			bind:intersecting={section.intersecting}
			on:intersect={(e) => {
				const target = e.detail.target;
				setTimeout(() => {
					target.classList.add('animate__animated', 'animate__fadeInRight', 'animate__faster');
				}, 100);
			}}
			threshold={0.35}
		>
			<section
				bind:this={section.element}
				class="min-h-screen relative after:content-[''] after:absolute after:w-full after:bottom-2 after:right-4 after:border-2 p-5 after:border-base-content after:rounded-md ease-in-out transition-all duration-300 opacity-0"
				id={section.id}
			>
				{#if section.component}
					<svelte:component this={section.component} />
				{/if}
				<button
					on:click={() => scrollTo(findNextId(section.id))}
					class="absolute btn btn-primary bottom-0 right-0 m-2 translate-y-5 z-20"
				>
					<Icon icon="material-symbols:arrow-downward" />
				</button>
			</section>
		</IntersectionObserver>
	{/each}
</Grid>
