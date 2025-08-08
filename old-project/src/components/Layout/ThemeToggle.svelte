<script>
	import Icon from '@iconify/svelte';
	import { themes, randomThemes } from '../../stores/themeStore';
</script>

<div class="absolute h-16 z-50 top-0 right-0 px-5 py-2 w-16 mr-2">
	<button on:click={() => randomThemes()} class="btn btn-primary">
		<Icon icon="material-symbols:magic-button" width="24" height="36" />
	</button>
</div>
