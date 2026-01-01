<script lang="ts">
	import { goto } from '$app/navigation';
	import { LogIn } from '@lucide/svelte';

	let username = $state('');
	let password = $state('');
	let error = $state('');
	let loading = $state(false);

	async function handleLogin(e: Event) {
		e.preventDefault();
		error = '';
		loading = true;

		try {
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password })
			});

			const data = await response.json();

			if (!response.ok) {
				error = data.error || 'Login failed';
				return;
			}

			// Redirect to admin dashboard
			goto('/admin');
		} catch (err) {
			error = 'An error occurred. Please try again.';
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Admin Login - AZMI</title>
</svelte:head>

<div
	class="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-950"
>
	<div class="w-full max-w-md">
		<div class="rounded-2xl bg-card p-8 shadow-2xl bg-card">
			<!-- Header -->
			<div class="mb-8 text-center">
				<div class="mb-4 flex justify-center">
					<div class="rounded-full bg-primary/10 p-4 bg-primary/10">
						<LogIn class="h-8 w-8 text-primary dark:text-primary" />
					</div>
				</div>
				<h1 class="text-3xl font-bold text-foreground">Admin Login</h1>
				<p class="mt-2 text-muted-foreground">Sign in to manage your blog</p>
			</div>

			<!-- Error Message -->
			{#if error}
				<div
					class="mb-6 rounded-lg bg-destructive/10 p-4 text-sm text-destructive bg-destructive/10 text-destructive"
				>
					{error}
				</div>
			{/if}

			<!-- Login Form -->
			<form onsubmit={handleLogin} class="space-y-6">
				<div>
					<label
						for="username"
						class="mb-2 block text-sm font-medium text-foreground"
					>
						Username
					</label>
					<input
						id="username"
						type="text"
						bind:value={username}
						required
						class="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground transition focus:border-primary focus:ring-2 focus:ring-ring/20 focus:outline-none  bg-muted text-foreground"
						placeholder="Enter your username"
					/>
				</div>

				<div>
					<label
						for="password"
						class="mb-2 block text-sm font-medium text-foreground"
					>
						Password
					</label>
					<input
						id="password"
						type="password"
						bind:value={password}
						required
						class="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground transition focus:border-primary focus:ring-2 focus:ring-ring/20 focus:outline-none  bg-muted text-foreground"
						placeholder="Enter your password"
					/>
				</div>

				<button
					type="submit"
					disabled={loading}
					class="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-primary dark:hover:bg-primary"
				>
					{loading ? 'Signing in...' : 'Sign In'}
				</button>
			</form>

			<!-- Info -->
			<div
				class="mt-6 rounded-lg bg-primary/5 p-4 text-sm text-primary bg-primary/10 text-primary"
			>
				<p class="font-medium">Default credentials:</p>
				<p class="mt-1">Username: admin</p>
				<p>Password: admin123</p>
				<p class="mt-2 text-xs">Change these in production!</p>
			</div>
		</div>
	</div>
</div>
