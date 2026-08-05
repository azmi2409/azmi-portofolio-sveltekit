<script lang="ts">
	import { Monitor, Moon, Sun } from '@lucide/svelte';
	import { onMount } from 'svelte';

	type ThemePreference = 'light' | 'dark' | 'system';

	let preference = $state<ThemePreference>('system');

	function isThemePreference(value: string | null): value is ThemePreference {
		return value === 'light' || value === 'dark' || value === 'system';
	}

	function applyTheme(value: ThemePreference) {
		const resolved =
			value === 'system'
				? window.matchMedia('(prefers-color-scheme: dark)').matches
					? 'dark'
					: 'light'
				: value;
		const root = document.documentElement;

		root.classList.toggle('light', resolved === 'light');
		root.classList.toggle('dark', resolved === 'dark');
		root.dataset.theme = value;
		root.style.colorScheme = resolved;
		document
			.querySelector('meta[name="theme-color"]')
			?.setAttribute('content', resolved === 'dark' ? '#09090b' : '#f7f7f5');
	}

	function setPreference(value: ThemePreference) {
		preference = value;
		localStorage.setItem('theme-preference', value);
		applyTheme(value);
	}

	onMount(() => {
		const saved = localStorage.getItem('theme-preference');
		if (isThemePreference(saved)) preference = saved;
		applyTheme(preference);

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleSystemChange = () => {
			if (preference === 'system') applyTheme(preference);
		};
		mediaQuery.addEventListener('change', handleSystemChange);
		return () => mediaQuery.removeEventListener('change', handleSystemChange);
	});
</script>

<div class="theme-toggle" role="group" aria-label="Color theme">
	<button
		type="button"
		class:active={preference === 'system'}
		aria-pressed={preference === 'system'}
		aria-label="Use system theme"
		title="System theme"
		onclick={() => setPreference('system')}
	>
		<Monitor class="h-3.5 w-3.5" aria-hidden="true" />
	</button>
	<button
		type="button"
		class:active={preference === 'light'}
		aria-pressed={preference === 'light'}
		aria-label="Use light theme"
		title="Light theme"
		onclick={() => setPreference('light')}
	>
		<Sun class="h-3.5 w-3.5" aria-hidden="true" />
	</button>
	<button
		type="button"
		class:active={preference === 'dark'}
		aria-pressed={preference === 'dark'}
		aria-label="Use dark theme"
		title="Dark theme"
		onclick={() => setPreference('dark')}
	>
		<Moon class="h-3.5 w-3.5" aria-hidden="true" />
	</button>
</div>

<style>
	.theme-toggle {
		display: inline-flex;
		align-items: center;
		gap: 0.1rem;
		min-height: 2.15rem;
		border: 1px solid rgba(255, 255, 255, 0.09);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.035);
		padding: 0.16rem;
		transition:
			border-color 160ms ease,
			background-color 160ms ease;
	}

	.theme-toggle:hover {
		border-color: rgba(157, 229, 213, 0.3);
	}

	button {
		display: grid;
		width: 1.75rem;
		height: 1.75rem;
		place-items: center;
		border: 0;
		border-radius: 999px;
		background: transparent;
		color: #71717a;
		cursor: pointer;
		transition:
			background-color 160ms ease,
			color 160ms ease,
			box-shadow 160ms ease;
	}

	button:hover {
		color: #d4d4d8;
	}

	button.active {
		background: rgba(157, 229, 213, 0.13);
		box-shadow: inset 0 0 0 1px rgba(157, 229, 213, 0.16);
		color: #9be5d5;
	}

	:global(html.light) .theme-toggle {
		border-color: rgba(24, 24, 27, 0.13);
		background: rgba(24, 24, 27, 0.035);
	}

	:global(html.light) .theme-toggle:hover {
		border-color: rgba(42, 115, 100, 0.38);
	}

	:global(html.light) button {
		color: #71717a;
	}

	:global(html.light) button:hover {
		color: #18181b;
	}

	:global(html.light) button.active {
		background: rgba(42, 115, 100, 0.11);
		box-shadow: inset 0 0 0 1px rgba(42, 115, 100, 0.14);
		color: #2a7364;
	}
</style>
