<script>
	import { handleDrawerChecked } from '$lib/helper';
	import { drawerChecked } from '../../stores/drawerStore';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { themes } from '../../stores/themeStore';

	onMount(() => {
		const theme = localStorage.getItem('theme');
		if (theme) {
			themes.set(theme);
		}
	});
</script>

<input id="drawer" type="checkbox" class="drawer-toggle" />
<div class="drawer-content relative w-full overflow-x-hidden">
	<label
		on:click={() => handleDrawerChecked(true)}
		for="drawer"
		class="drawer-button btn btn-primary absolute top-0 left-0 m-2 z-50 {$drawerChecked
			? 'hidden'
			: 'hidden md:flex'}"
	>
		<Icon icon="material-symbols:arrow-forward" class="w-5 h-5" />
	</label>
	<slot />
</div>
