<script>
	import '../app.css';
	import 'animate.css';
	import Pointer from '../components/Pointer.svelte';
	import Sidebar from '../components/Sidebar.svelte';
	import { drawerChecked } from '../stores/drawerStore';
	import { themes } from '../stores/themeStore';
	import Content from '../components/Layout/Content.svelte';
	import ThemeToggle from '../components/Layout/ThemeToggle.svelte';
</script>

<main class="Container" data-theme={$themes}>
	<ThemeToggle />
	<Pointer />
	<Content>
		<slot />
	</Content>
	{#if $drawerChecked}
		<Sidebar />
	{/if}
</main>
