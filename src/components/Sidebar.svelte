<script>
	import { handleDrawerChecked, scrollTo } from '$lib/helper';
	import NavLine from './NavLine.svelte';
	import Icon from '@iconify/svelte';
	import Logo from './Logo.svelte';
	import { menus } from '$lib/menus';
</script>

<label on:click={() => handleDrawerChecked(false)} for="drawer" class="drawer-overlay" />
<aside class="Sidebar">
	<div class="Sidebar-Wrapper">
		<div class="Sidebar-Title">
			<a href="/">
				<Logo />
			</a>
		</div>
		<div class="Sidebar-Nav">
			<ul class="Sidebar-Nav-Menus">
				{#each $menus as menu}
					<li
						on:click={() => scrollTo(menu.id)}
						class="Sidebar-Nav-Item {menu.intersecting ? 'Active' : ''}"
					>
						<span>{menu.name}</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>
	<label
		on:click={() => handleDrawerChecked(false)}
		for="drawer"
		class="btn btn-primary absolute top-0 right-0 z-10 drawer-button mt-2"
	>
		<Icon icon="material-symbols:arrow-back" class="w-5 h-5" />
	</label>
	<NavLine />
</aside>
