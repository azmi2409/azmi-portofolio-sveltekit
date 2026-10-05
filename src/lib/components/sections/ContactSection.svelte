<script lang="ts">
	import { ArrowUpRight, Check, Copy, Mail } from '@lucide/svelte';

	// Standalone /contact page renders the heading as its h1 and drops the home-page index.
	let { standalone = false }: { standalone?: boolean } = $props();
	const email = 'azmimuwahid@gmail.com';
	let copied = $state(false);
	let timer: ReturnType<typeof setTimeout>;

	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(email);
			copied = true;
			clearTimeout(timer);
			timer = setTimeout(() => (copied = false), 2000);
		} catch {
			// Clipboard can be blocked; the address stays selectable below.
		}
	}
</script>

<section id="contact" class="contact border-t border-border px-6 py-24 sm:py-32">
	<div class="mx-auto max-w-7xl">
		<p class="section-index mb-10">
			{#if !standalone}<b>(05)</b>{/if} Let’s talk
		</p>
		<div class="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-end">
			<div>
				<svelte:element
					this={standalone ? 'h1' : 'h2'}
					class="max-w-4xl text-4xl leading-[1.02] font-semibold tracking-[-0.045em] sm:text-6xl"
				>
					What is taking more time or money <span class="accent-serif text-[var(--signal)]"
						>than it should?</span
					>
				</svelte:element>
				<p class="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
					Tell me what your team does manually, where customers get stuck, or which costs keep
					growing. We can work out whether AI, automation, or a simpler process would help.
				</p>
			</div>
			<div class="rounded-2xl border border-border bg-card p-6 sm:p-8">
				<p class="mb-6 leading-7 text-muted-foreground">
					Available for remote consulting and hands-on delivery. Share your current process, goals,
					and rough timeline. Based in Southeast Asia, working globally.
				</p>
				<div class="flex flex-wrap items-center gap-3">
					<a class="button-primary" href="mailto:{email}"><Mail class="h-4 w-4" /> Email Azmi</a>
					<button type="button" class="button-secondary" onclick={copyEmail} aria-live="polite">
						{#if copied}<Check class="h-4 w-4 text-[var(--signal)]" /> Copied{:else}<Copy
								class="h-4 w-4"
							/> Copy address{/if}
					</button>
				</div>
				<div class="mt-6 flex flex-wrap gap-x-6 text-sm font-semibold">
					<a
						class="inline-flex min-h-11 items-center gap-2"
						href="https://linkedin.com/in/azmimuwahid"
						target="_blank"
						rel="noreferrer"
						><span class="link-sweep">LinkedIn</span> <ArrowUpRight class="h-4 w-4" /></a
					>
					<a
						class="inline-flex min-h-11 items-center"
						href="mailto:{email}?subject=R%C3%A9sum%C3%A9%20request"
						><span class="link-sweep">Request résumé</span></a
					>
				</div>
			</div>
		</div>
		<a class="big-email group" href="mailto:{email}">
			<span class="big-email-text select-all">{email}</span>
			<span class="big-email-arrow" aria-hidden="true"><ArrowUpRight /></span>
		</a>
	</div>
</section>

<style>
	.big-email {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		margin-top: clamp(3rem, 8vw, 6rem);
		padding-bottom: 1.25rem;
		border-bottom: 1px solid var(--border);
	}

	.big-email::after {
		content: '';
		position: absolute;
		bottom: -1px;
		left: 0;
		width: 100%;
		height: 1px;
		background: var(--signal);
		transform-origin: right;
		scale: 0 1;
		transition: scale 800ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.big-email:hover::after,
	.big-email:focus-visible::after {
		transform-origin: left;
		scale: 1 1;
	}

	.big-email-text {
		min-width: 0;
		white-space: nowrap;
		font-family: var(--font-heading);
		/* sized so the full address stays on one line from 320px up */
		font-size: clamp(1rem, 7.3vw, 6.25rem);
		font-weight: 600;
		letter-spacing: -0.05em;
		line-height: 1;
		transition: color 400ms ease;
	}

	@media (max-width: 639px) {
		.big-email .big-email-arrow {
			display: none;
		}
	}

	@media (min-width: 640px) {
		.big-email-text {
			font-size: 6vw;
		}
	}

	@media (min-width: 768px) {
		.big-email-text {
			font-size: clamp(2rem, 6.6vw, 6.25rem);
		}
	}

	.big-email:hover .big-email-text {
		color: var(--signal);
	}

	.big-email-arrow {
		display: grid;
		flex: none;
		width: clamp(3rem, 7vw, 6rem);
		height: clamp(3rem, 7vw, 6rem);
		place-items: center;
		border: 1px solid var(--border);
		border-radius: 50%;
		transition:
			rotate 600ms cubic-bezier(0.16, 1, 0.3, 1),
			background-color 300ms ease,
			color 300ms ease,
			border-color 300ms ease;
	}

	.big-email-arrow :global(svg) {
		width: 40%;
		height: 40%;
	}

	.big-email:hover .big-email-arrow {
		rotate: 45deg;
		border-color: var(--signal);
		background: var(--signal);
		color: var(--background);
	}
</style>
