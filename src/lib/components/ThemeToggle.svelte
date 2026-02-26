<script lang="ts">
	import { Sun, Moon, Monitor } from '@lucide/svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { mode, cycleMode } from '$lib/stores/theme';

	const MODE_LABELS: Record<string, string> = {
		auto: 'Auto (system)',
		light: 'Light',
		dark: 'Dark'
	};

	function handleToggle() {
		document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
		cycleMode();
		setTimeout(() => {
			document.documentElement.style.transition = '';
		}, 300);
	}
</script>

<div class="relative">
	<Button
		variant="outline"
		size="icon"
		onclick={handleToggle}
		aria-label="Theme: {MODE_LABELS[$mode]}. Click to cycle theme."
	>
		<Sun
			class="h-5 w-5 transition-all duration-300 {$mode === 'light'
				? 'scale-100 rotate-0 opacity-100'
				: 'absolute scale-0 rotate-90 opacity-0'}"
		/>
		<Moon
			class="h-5 w-5 transition-all duration-300 {$mode === 'dark'
				? 'scale-100 rotate-0 opacity-100'
				: 'absolute scale-0 -rotate-90 opacity-0'}"
		/>
		<Monitor
			class="h-5 w-5 transition-all duration-300 {$mode === 'auto'
				? 'scale-100 rotate-0 opacity-100'
				: 'absolute scale-0 rotate-90 opacity-0'}"
		/>
	</Button>
	<span class="sr-only" aria-live="polite">
		Theme set to {MODE_LABELS[$mode]}
	</span>
</div>
