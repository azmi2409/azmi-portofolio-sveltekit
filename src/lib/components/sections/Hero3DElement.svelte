<!--
  Hero3DElement.svelte
  Animated 3D geometric/particle scene using raw Three.js.
  Loaded only via dynamic import() to keep Three.js out of the initial bundle.
  Requirements: 11.1, 11.2, 11.3, 11.7
-->

<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as THREE from 'three';

	let canvas: HTMLCanvasElement;
	let animationId: number;
	let renderer: THREE.WebGLRenderer | null = null;
	let scene: THREE.Scene | null = null;
	let camera: THREE.PerspectiveCamera | null = null;

	// Mouse tracking (normalized -1 to 1)
	let mouseX = 0;
	let mouseY = 0;
	let targetMouseX = 0;
	let targetMouseY = 0;

	function handleMouseMove(e: MouseEvent) {
		targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
		targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
	}

	function getThemeColor(varName: string, fallback: string): THREE.Color {
		if (typeof document === 'undefined') return new THREE.Color(fallback);
		const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
		if (!value) return new THREE.Color(fallback);
		// oklch values from CSS — parse to approximate hex
		try {
			const temp = document.createElement('div');
			temp.style.color = value;
			document.body.appendChild(temp);
			const computed = getComputedStyle(temp).color;
			document.body.removeChild(temp);
			return new THREE.Color(computed);
		} catch {
			return new THREE.Color(fallback);
		}
	}

	onMount(() => {
		if (!canvas) return;

		const width = canvas.clientWidth;
		const height = canvas.clientHeight;

		// Detect if we're in light mode to adjust blending and opacity
		const isDark = document.documentElement.classList.contains('dark');

		// Read theme colors — use foreground-based colors in light mode for visibility
		const primaryColor = getThemeColor('--primary', isDark ? '#7c7c7c' : '#4a4a4a');
		const accentColor = getThemeColor(isDark ? '--accent' : '--muted-foreground', isDark ? '#5e5e5e' : '#666666');
		const chartColor = getThemeColor('--chart-2', '#4a8a8a');

		// --- Renderer ---
		renderer = new THREE.WebGLRenderer({
			canvas,
			alpha: true,
			antialias: true,
			powerPreference: 'high-performance'
		});
		renderer.setSize(width, height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setClearColor(0x000000, 0);

		// --- Scene ---
		scene = new THREE.Scene();

		// --- Camera ---
		camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
		camera.position.z = 5;

		// --- Wireframe Icosahedron ---
		const icoGeometry = new THREE.IcosahedronGeometry(1.6, 1);
		const wireframeMaterial = new THREE.MeshBasicMaterial({
			color: primaryColor,
			wireframe: true,
			transparent: true,
			opacity: isDark ? 0.25 : 0.4
		});
		const icosahedron = new THREE.Mesh(icoGeometry, wireframeMaterial);
		scene.add(icosahedron);

		// --- Inner glowing sphere ---
		const innerGeometry = new THREE.IcosahedronGeometry(1.2, 2);
		const innerMaterial = new THREE.MeshBasicMaterial({
			color: chartColor,
			wireframe: true,
			transparent: true,
			opacity: isDark ? 0.08 : 0.15
		});
		const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
		scene.add(innerMesh);

		// --- Particle field ---
		const particleCount = 300;
		const particlePositions = new Float32Array(particleCount * 3);
		const particleSizes = new Float32Array(particleCount);
		const particleAlphas = new Float32Array(particleCount);

		for (let i = 0; i < particleCount; i++) {
			// Distribute in a sphere shell
			const radius = 2 + Math.random() * 4;
			const theta = Math.random() * Math.PI * 2;
			const phi = Math.acos(2 * Math.random() - 1);

			particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
			particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
			particlePositions[i * 3 + 2] = radius * Math.cos(phi);

			particleSizes[i] = 1.5 + Math.random() * 3;
			particleAlphas[i] = 0.2 + Math.random() * 0.6;
		}

		const particleGeometry = new THREE.BufferGeometry();
		particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

		const particleMaterial = new THREE.PointsMaterial({
			color: accentColor,
			size: isDark ? 0.03 : 0.04,
			transparent: true,
			opacity: isDark ? 0.5 : 0.7,
			sizeAttenuation: true,
			blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
			depthWrite: false
		});

		const particles = new THREE.Points(particleGeometry, particleMaterial);
		scene.add(particles);

		// --- Orbiting ring particles ---
		const ringCount = 120;
		const ringPositions = new Float32Array(ringCount * 3);
		for (let i = 0; i < ringCount; i++) {
			const angle = (i / ringCount) * Math.PI * 2;
			const r = 2.5 + (Math.random() - 0.5) * 0.3;
			ringPositions[i * 3] = Math.cos(angle) * r;
			ringPositions[i * 3 + 1] = (Math.random() - 0.5) * 0.2;
			ringPositions[i * 3 + 2] = Math.sin(angle) * r;
		}

		const ringGeometry = new THREE.BufferGeometry();
		ringGeometry.setAttribute('position', new THREE.BufferAttribute(ringPositions, 3));

		const ringMaterial = new THREE.PointsMaterial({
			color: primaryColor,
			size: isDark ? 0.02 : 0.03,
			transparent: true,
			opacity: isDark ? 0.6 : 0.8,
			sizeAttenuation: true,
			blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
			depthWrite: false
		});

		const ringParticles = new THREE.Points(ringGeometry, ringMaterial);
		scene.add(ringParticles);

		// --- Animation loop ---
		const clock = new THREE.Clock();

		function animate() {
			animationId = requestAnimationFrame(animate);

			const elapsed = clock.getElapsedTime();

			// Smooth mouse interpolation
			mouseX += (targetMouseX - mouseX) * 0.05;
			mouseY += (targetMouseY - mouseY) * 0.05;

			// Rotate icosahedron
			icosahedron.rotation.x = elapsed * 0.15 + mouseY * 0.3;
			icosahedron.rotation.y = elapsed * 0.2 + mouseX * 0.3;

			// Counter-rotate inner mesh
			innerMesh.rotation.x = -elapsed * 0.1 + mouseY * 0.2;
			innerMesh.rotation.y = -elapsed * 0.15 + mouseX * 0.2;

			// Subtle breathing scale
			const breathe = 1 + Math.sin(elapsed * 0.8) * 0.05;
			icosahedron.scale.setScalar(breathe);
			innerMesh.scale.setScalar(breathe * 0.95);

			// Rotate particle field with mouse influence
			particles.rotation.y = elapsed * 0.05 + mouseX * 0.15;
			particles.rotation.x = mouseY * 0.1;

			// Orbit ring rotation
			ringParticles.rotation.y = elapsed * 0.3;
			ringParticles.rotation.x = 0.3 + mouseY * 0.15;

			// Camera parallax
			if (camera) {
				camera.position.x = mouseX * 0.5;
				camera.position.y = mouseY * 0.3;
				camera.lookAt(0, 0, 0);
			}

			if (renderer && scene && camera) {
				renderer.render(scene, camera);
			}
		}

		animate();

		// --- Resize handler ---
		function handleResize() {
			if (!canvas || !renderer || !camera) return;
			const w = canvas.clientWidth;
			const h = canvas.clientHeight;
			renderer.setSize(w, h);
			camera.aspect = w / h;
			camera.updateProjectionMatrix();
		}

		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('resize', handleResize);

		// Store cleanup refs
		(canvas as any).__hero3d_cleanup = () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('resize', handleResize);

			if (animationId) cancelAnimationFrame(animationId);

			// Dispose geometries
			icoGeometry.dispose();
			innerGeometry.dispose();
			particleGeometry.dispose();
			ringGeometry.dispose();

			// Dispose materials
			wireframeMaterial.dispose();
			innerMaterial.dispose();
			particleMaterial.dispose();
			ringMaterial.dispose();

			// Dispose renderer
			if (renderer) {
				renderer.dispose();
				renderer.forceContextLoss();
				renderer = null;
			}

			scene = null;
			camera = null;
		};
	});

	onDestroy(() => {
		if (canvas && (canvas as any).__hero3d_cleanup) {
			(canvas as any).__hero3d_cleanup();
		} else {
			// Fallback cleanup
			if (animationId) cancelAnimationFrame(animationId);
			if (renderer) {
				renderer.dispose();
				renderer.forceContextLoss();
				renderer = null;
			}
			scene = null;
			camera = null;
		}
	});
</script>

<canvas
	bind:this={canvas}
	class="hero-3d-canvas"
	aria-hidden="true"
></canvas>

<style>
	.hero-3d-canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 1;
	}

	/* Reduce motion: hide the 3D canvas entirely */
	@media (prefers-reduced-motion: reduce) {
		.hero-3d-canvas {
			display: none;
		}
	}
</style>
