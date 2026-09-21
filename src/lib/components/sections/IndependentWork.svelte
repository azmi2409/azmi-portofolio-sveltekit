<script lang="ts">
	const projects = [
		{
			name: 'Rails AI Gateway',
			kind: 'Open-source gem · AI infrastructure',
			href: 'https://github.com/azmi2409/rails-ai-gateway',
			cover: '/images/projects/rails-ai-gateway.webp',
			coverAlt:
				'Generated visualization of Rails AI Gateway showing model routes, fallbacks, and token metrics.',
			description:
				'Mount one OpenAI-compatible endpoint inside Rails with ordered model fallbacks, encrypted provider keys, streaming, and built-in usage tracking.',
			link: 'Explore repository'
		},
		{
			name: 'Rails Mailer Sandbox',
			kind: 'Free tool · Email testing',
			href: 'https://github.com/azmi2409/rails-mailer-sandbox',
			cover: '/images/projects/rails-mailer-sandbox.webp',
			coverAlt:
				'Generated visualization of Rails Mailer Sandbox email preview and delivery metadata.',
			description:
				'Help teams check customer emails before sending them. Preview messages and attachments locally, without paying for a separate email-testing service.',
			link: 'Explore repository'
		},
		{
			name: 'GoPay Merchant QRIS Gateway',
			kind: 'Open-source tool · Payment operations',
			href: 'https://github.com/azmi2409/gopay-merchant-qris-gateway',
			cover: '/images/projects/qris-gateway.webp',
			coverAlt:
				'Generated visualization of a QRIS payment, transaction matching, and order status dashboard.',
			description:
				'Connect QRIS payment requests, payment matching, and order updates so teams have less payment information to reconcile by hand. Unofficial and not affiliated with or endorsed by GoPay.',
			link: 'Explore repository'
		}
	];
</script>

<section class="px-6 py-20" aria-labelledby="independent-work-heading">
	<div class="mx-auto max-w-7xl">
		<p class="eyebrow mb-5">Beyond client work</p>
		<h2 id="independent-work-heading" class="text-4xl font-black tracking-tight">
			Useful tools I share with other teams.
		</h2>
		<div class="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
			{#each projects as project}
				<article class="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
					<div class="aspect-[16/9] overflow-hidden border-b border-border bg-zinc-950">
						<img
							src={project.cover}
							alt={project.coverAlt}
							loading="lazy"
							width="1024"
							height="1024"
							class="h-full w-full object-cover"
						/>
					</div>
					<div class="flex flex-1 flex-col p-6">
						<p class="text-sm text-muted-foreground">{project.kind}</p>
						<h3 class="mt-4 text-2xl font-bold">{project.name}</h3>
						<p class="mt-4 flex-1 leading-7 text-muted-foreground">{project.description}</p>
						<a
							class="mt-5 inline-flex min-h-11 items-center font-semibold underline underline-offset-4"
							href={project.href}
							target="_blank"
							rel="noreferrer"
							aria-label={`${project.link}: ${project.name}`}>{project.link} ↗</a
						>
					</div>
				</article>
			{/each}
		</div>
		<a
			class="mt-6 inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4"
			href="https://github.com/azmi2409"
			target="_blank"
			rel="noreferrer">More projects on GitHub · @azmi2409</a
		>
	</div>
</section>
