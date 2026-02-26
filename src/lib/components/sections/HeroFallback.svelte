<!--
  HeroFallback.svelte
  Static visual fallback for when WebGL is unavailable or device is low-end.
  Pure CSS gradient + SVG geometric pattern. No JavaScript dependencies.
  Requirements: 11.5, 11.6
-->

<div class="hero-fallback" aria-hidden="true">
	<!-- Animated gradient layer -->
	<div class="hero-fallback__gradient"></div>

	<!-- SVG geometric grid pattern overlay -->
	<svg
		class="hero-fallback__pattern"
		xmlns="http://www.w3.org/2000/svg"
		width="100%"
		height="100%"
	>
		<defs>
			<pattern id="hero-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
				<circle cx="30" cy="30" r="1.5" fill="currentColor" opacity="0.15" />
				<line x1="0" y1="30" x2="60" y2="30" stroke="currentColor" stroke-width="0.3" opacity="0.06" />
				<line x1="30" y1="0" x2="30" y2="60" stroke="currentColor" stroke-width="0.3" opacity="0.06" />
			</pattern>
			<radialGradient id="hero-vignette" cx="50%" cy="50%" r="70%">
				<stop offset="0%" stop-color="transparent" />
				<stop offset="100%" stop-opacity="0.4" />
			</radialGradient>
		</defs>
		<rect width="100%" height="100%" fill="url(#hero-grid)" />
		<rect width="100%" height="100%" fill="url(#hero-vignette)" />
	</svg>

	<!-- Floating accent orbs (pure CSS) -->
	<div class="hero-fallback__orb hero-fallback__orb--1"></div>
	<div class="hero-fallback__orb hero-fallback__orb--2"></div>
	<div class="hero-fallback__orb hero-fallback__orb--3"></div>
</div>

<style>
	.hero-fallback {
		position: absolute;
		inset: 0;
		overflow: hidden;
		z-index: 0;
		pointer-events: none;
	}

	/* Slow-moving gradient background */
	.hero-fallback__gradient {
		position: absolute;
		inset: -50%;
		width: 200%;
		height: 200%;
		background: conic-gradient(
			from 0deg at 50% 50%,
			var(--background) 0deg,
			var(--muted) 90deg,
			var(--background) 180deg,
			var(--accent) 270deg,
			var(--background) 360deg
		);
		animation: hero-gradient-rotate 30s linear infinite;
		opacity: 0.5;
	}

	/* SVG pattern layer */
	.hero-fallback__pattern {
		position: absolute;
		inset: 0;
		color: var(--foreground);
	}

	/* Floating orbs — soft, blurred accent shapes */
	.hero-fallback__orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		opacity: 0.12;
		will-change: transform;
	}

	.hero-fallback__orb--1 {
		width: 400px;
		height: 400px;
		top: -10%;
		right: -5%;
		background: var(--primary);
		animation: hero-orb-float-1 20s ease-in-out infinite;
	}

	.hero-fallback__orb--2 {
		width: 300px;
		height: 300px;
		bottom: -5%;
		left: -5%;
		background: var(--accent);
		animation: hero-orb-float-2 25s ease-in-out infinite;
	}

	.hero-fallback__orb--3 {
		width: 200px;
		height: 200px;
		top: 40%;
		left: 50%;
		background: var(--chart-2);
		animation: hero-orb-float-3 18s ease-in-out infinite;
	}

	@keyframes hero-gradient-rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes hero-orb-float-1 {
		0%, 100% {
			transform: translate(0, 0) scale(1);
		}
		33% {
			transform: translate(-30px, 40px) scale(1.1);
		}
		66% {
			transform: translate(20px, -20px) scale(0.95);
		}
	}

	@keyframes hero-orb-float-2 {
		0%, 100% {
			transform: translate(0, 0) scale(1);
		}
		33% {
			transform: translate(40px, -30px) scale(1.05);
		}
		66% {
			transform: translate(-20px, 20px) scale(0.9);
		}
	}

	@keyframes hero-orb-float-3 {
		0%, 100% {
			transform: translate(0, 0) scale(1);
		}
		50% {
			transform: translate(-40px, 30px) scale(1.15);
		}
	}

	/* Reduce motion for accessibility */
	@media (prefers-reduced-motion: reduce) {
		.hero-fallback__gradient {
			animation: none;
			opacity: 0.3;
		}

		.hero-fallback__orb {
			animation: none;
		}
	}
</style>
