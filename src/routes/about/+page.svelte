<svelte:head>
	<title>About Azmi — Full-Stack Engineer & KilatBot Founder</title>
	<meta
		name="description"
		content="Azmi Muwahid is a full-stack engineer in Indonesia. He founded KilatBot (KilatHost), AI agents for small business owners, through PT Kilat Inovasi Cerdas."
	/>
	<link rel="canonical" href="https://azmi.web.id/about" />
	<meta property="og:title" content="About Azmi — Full-Stack Engineer & KilatBot Founder" />
	<meta
		property="og:description"
		content="Full-stack engineer in Indonesia and founder of KilatBot, AI agents for small business owners."
	/>
	<meta property="og:url" content="https://azmi.web.id/about" />
	<meta property="og:type" content="profile" />
	<meta property="og:image" content="https://azmi.web.id/assets/profile.webp" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="About Azmi — Full-Stack Engineer & KilatBot Founder" />
	<meta
		name="twitter:description"
		content="Full-stack engineer in Indonesia and founder of KilatBot, AI agents for small business owners."
	/>
	<meta name="twitter:image" content="https://azmi.web.id/assets/profile.webp" />

	<!-- JSON-LD: ProfilePage + BreadcrumbList -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'ProfilePage',
		name: 'About Azmi Muwahid',
		url: 'https://azmi.web.id/about',
		description:
			'Full-stack engineer in Indonesia. Founded KilatBot in 2026 and leads it through PT Kilat Inovasi Cerdas. Also a senior software engineer at FutureLab.my.',
		mainEntity: {
			'@type': 'Person',
			name: 'Azmi Muwahid',
			url: 'https://azmi.web.id'
		},
		breadcrumb: {
			'@type': 'BreadcrumbList',
			itemListElement: [
				{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://azmi.web.id' },
				{ '@type': 'ListItem', position: 2, name: 'About', item: 'https://azmi.web.id/about' }
			]
		}
	})}<\/script>`}
</svelte:head>

<section class="px-6 py-32">
	<div class="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
		<div>
			<p class="eyebrow mb-4">About Azmi</p>
			<h1 class="text-5xl font-semibold tracking-tight sm:text-6xl">
				Technology should make your work easier.
			</h1>
			<figure class="mt-8">
				<img
					src="/assets/profile.webp"
					alt="Azmi Muwahid outside the Amazon Spheres in Seattle"
					width="819"
					height="1024"
					class="w-full rounded-2xl"
				/>
				<figcaption class="mt-3 text-sm text-muted-foreground">Seattle, Washington.</figcaption>
			</figure>
		</div>
		<div class="space-y-6 text-lg leading-8 text-muted-foreground">
			<p>
				I help businesses apply AI and software where it makes a practical difference: less manual
				admin, clearer customer journeys, and better control over day-to-day costs.
			</p>
			<p>
				I founded
				<a
					href="https://kilatbot.com"
					target="_blank"
					rel="noreferrer"
					class="link-sweep text-foreground">KilatBot</a
				>
				in 2026 and lead its development through PT Kilat Inovasi Cerdas, an Indonesian PT Perseorangan
				based in Bogor. KilatBot, also known as
				<a
					href="https://kilat.host"
					target="_blank"
					rel="noreferrer"
					class="link-sweep text-foreground">KilatHost</a
				>, gives small business owners AI agents they can shape to their own work, on the web or
				Telegram, without running the servers themselves.
			</p>
			<p>
				My background is in senior software engineering. That means I can help you choose what to
				improve and do the hands-on work to make it happen. You get one partner from the first
				conversation through building, testing, and putting the solution to use.
			</p>
			<h2 class="pt-4 text-2xl font-bold text-foreground">Start with your business, not a tool.</h2>
			<p>
				We look at how work gets done today, where time or money is lost, and what your team needs.
				Sometimes AI helps. Sometimes connecting existing tools or simplifying a process is the
				better answer.
			</p>
			<h2 class="pt-4 text-2xl font-bold text-foreground">Make progress you can see.</h2>
			<p>
				Before building, we agree on a starting point and what to measure: time spent per task, cost
				per order, fewer missed follow-ups, or faster customer responses. Then we test a focused
				improvement before expanding it.
			</p>
			<p>
				Before software, I studied fisheries. Understanding how changes affect a whole ecosystem
				shaped how I work today: consider people, processes, and consequences together.
			</p>
			<p>
				Based in Jakarta, Indonesia, I have 6+ years of remote experience working with companies in
				Malaysia, Singapore, and beyond.
			</p>
			<h2 class="pt-4 text-2xl font-bold text-foreground">Experience behind the advice</h2>
			<div
				class="grid grid-cols-2 gap-3 sm:grid-cols-4"
				aria-label="Companies I work or have worked with"
			>
				<a
					href="https://futurelab.my"
					target="_blank"
					rel="noreferrer"
					class="flex min-h-24 items-center justify-center rounded-xl border border-border bg-white p-4"
					><img src="/assets/futurelab-logo.webp" alt="FutureLab" class="max-h-10 max-w-full" /></a
				>
				<a
					href="https://www.toptal.com"
					target="_blank"
					rel="noreferrer"
					class="flex min-h-24 items-center justify-center rounded-xl border border-border bg-white p-4"
					><img src="/assets/toptal-logo.webp" alt="Toptal" class="max-h-10 max-w-full" /></a
				>
				<a
					href="https://www.turing.com"
					target="_blank"
					rel="noreferrer"
					class="flex min-h-24 items-center justify-center rounded-xl border border-border bg-white p-4"
					><img src="/assets/turing-logo.webp" alt="Turing" class="max-h-8 max-w-full" /></a
				>
				<a
					href="https://automa8e.com/sg"
					target="_blank"
					rel="noreferrer"
					class="flex min-h-24 items-center justify-center rounded-xl border border-border bg-white p-4"
					><img
						src="/assets/automa8e-wordmark.webp"
						alt="Automa8e"
						class="max-h-10 max-w-full"
					/></a
				>
			</div>
			<ul class="space-y-4">
				<li>
					<strong class="text-foreground">PT Kilat Inovasi Cerdas · Founder</strong><br
					/>2026–present. Building KilatBot, also known as KilatHost: AI agents for small business
					owners. The company is an Indonesian PT Perseorangan based in Bogor.
				</li>
				<li>
					<strong class="text-foreground">FutureLab.my · Senior Software Engineer</strong><br
					/>February 2023–present. Own the cloud and deployment pipeline, keep the platform codebase
					running smoothly, and build AI agents that improve how mentoring sessions are captured,
					reported, and turned into actionable insights.
				</li>
				<li>
					<strong class="text-foreground">Toptal · Freelance Full Stack Developer</strong><br
					/>October 2025–present. Working with global clients through the Toptal talent network.
				</li>
				<li>
					<strong class="text-foreground">Turing · Freelance Full Stack Developer</strong><br
					/>2023–present. Delivering full-stack solutions for international clients through the
					Turing network.
				</li>
				<li>
					<strong class="text-foreground">Automa8e · React Developer</strong><br />July
					2022–February 2025. Built the main application interface for a Singapore-based company.
				</li>
				<li>
					<strong class="text-foreground">Embreo · Full Stack Developer</strong><br />June
					2022–February 2023. Turned client requirements into web applications and managed the
					testing and release environment.
				</li>
				<li>
					<strong class="text-foreground">Revogamers · Co-Founder</strong><br />January 2011–January
					2017. Managed a community gaming platform with over 1,000 concurrent users.
				</li>
			</ul>
			<h2 class="pt-4 text-2xl font-bold text-foreground">Education & perspective</h2>
			<p>
				Studied at Institut Pertanian Bogor (IPB), 2012–2018, and studied Permaculture and Natural
				Building at Rak Tamachat Permaculture Institute, July 2017–September 2018. My background
				connects technology with the practical question of how people and resources work together.
			</p>
			<a href="/contact" class="button-primary">Tell me what you want to improve</a>
		</div>
	</div>
</section>
