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

	function updatePreference() {
		localStorage.setItem('theme-preference', preference);
		applyTheme(preference);
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

<label class="theme-control">
	<span class="sr-only">Color theme</span>
	<span class="theme-icon" aria-hidden="true">
		{#if preference === 'light'}
			<Sun class="h-3.5 w-3.5" />
		{:else if preference === 'dark'}
			<Moon class="h-3.5 w-3.5" />
		{:else}
			<Monitor class="h-3.5 w-3.5" />
		{/if}
	</span>
	<select bind:value={preference} onchange={updatePreference} aria-label="Color theme">
		<option value="system">System</option>
		<option value="light">Light</option>
		<option value="dark">Dark</option>
	</select>
</label>

<style>
	.theme-control {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		min-height: 2.15rem;
		border: 1px solid rgba(255, 255, 255, 0.09);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.035);
		padding: 0 0.55rem;
		color: #d4d4d8;
		transition:
			border-color 160ms ease,
			background-color 160ms ease;
	}

	.theme-control:hover {
		border-color: rgba(157, 229, 213, 0.3);
		background: rgba(255, 255, 255, 0.06);
	}

	.theme-icon {
		display: grid;
		place-items: center;
		color: #9be5d5;
	}

	select {
		max-width: 5.25rem;
		appearance: none;
		border: 0;
		background: transparent;
		padding: 0.1rem 0.1rem 0.1rem 0;
		font: 600 0.7rem/1 var(--font-sans);
		color: inherit;
		cursor: pointer;
	}

	select:focus {
		outline: none;
	}

	:global(html.light) .theme-control {
		border-color: rgba(24, 24, 27, 0.13);
		background: rgba(24, 24, 27, 0.035);
		color: #3f3f46;
	}

	:global(html.light) .theme-control:hover {
		border-color: rgba(42, 115, 100, 0.38);
		background: rgba(24, 24, 27, 0.06);
	}
</style>
