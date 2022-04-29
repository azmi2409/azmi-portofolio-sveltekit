<script>
	import '../app.css';
	import Pointer from '../components/Pointer.svelte';
	import Sidebar from '../components/Sidebar.svelte';
	import { drawerChecked } from '../stores/drawerStore';
	import { fly } from 'svelte/transition';
	import { handleDrawerChecked } from '$lib/helper';
	import Icon from '@iconify/svelte';
	import 'animate.css';
	import { themes,randomThemes } from '../stores/themeStore';
	import { onMount } from 'svelte';

	onMount(() => {
		const theme = localStorage.getItem('theme');
		if (theme) {
			themes.set(theme);
		}
	});

	export let title = 'Azmi Muwahid Website';
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<main class="Container" data-theme={$themes}>
	<div class="absolute h-16 z-50 top-0 right-0 px-5 py-2 w-16 mr-2">
		<button on:click={() => randomThemes()} class="btn btn-primary">
			<Icon icon="material-symbols:magic-button" width="24" height="36"/>
		</button>
	</div>
	<Pointer />
	<input id="drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content relative">
		<label
			on:click={() => handleDrawerChecked(true)}
			for="drawer"
			class="drawer-button btn btn-primary absolute top-0 left-0 m-2 z-50 {$drawerChecked
				? 'md:hidden'
				: ''} ease-in-out duration-200 transition-all"
		>
			<Icon icon="material-symbols:arrow-forward" class="w-5 h-5" />
		</label>
		<slot />
	</div>
	{#if $drawerChecked}
		<div
			in:fly={{ x: 20, y: 20, duration: 500 }}
			out:fly={{ x: -20, y: -20, duration: 500 }}
			class="drawer-side transition-all duration-200"
		>
			<Sidebar />
		</div>
	{/if}
</main>
