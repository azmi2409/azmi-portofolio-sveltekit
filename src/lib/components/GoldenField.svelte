<script lang="ts">
	import { onMount } from 'svelte';

	// Decorative three.js scene: points laid out on the golden angle (phyllotaxis),
	// breathing in slow waves and rippling away from the pointer. It loads lazily,
	// renders only while visible, follows the active theme, and draws one still
	// frame for reduced-motion users. Without WebGL the CSS backdrop remains.
	let { count = 2400, class: className = '' }: { count?: number; class?: string } = $props();

	let host: HTMLDivElement;
	let ready = $state(false);

	const vertex = /* glsl */ `
		uniform float uTime;
		uniform float uSize;
		uniform vec2 uPointer;
		attribute float aRadius;
		attribute float aSeed;
		varying float vRadius;
		varying float vDepth;
		void main() {
			vec3 p = position;
			float wave = sin(aRadius * 9.0 - uTime * 0.9) * 0.11
				+ sin(aRadius * 23.0 + aSeed * 6.2831 + uTime * 0.6) * 0.025;
			float d = distance(p.xy, uPointer);
			float ripple = exp(-d * d * 7.0) * 0.32;
			p.z += wave + ripple;
			vRadius = aRadius;
			vec4 mv = modelViewMatrix * vec4(p, 1.0);
			vDepth = p.z;
			gl_PointSize = uSize * (0.55 + aSeed * 0.75) * (1.0 + ripple * 2.4) / -mv.z;
			gl_Position = projectionMatrix * mv;
		}
	`;

	const fragment = /* glsl */ `
		uniform vec3 uSignal;
		uniform vec3 uInk;
		uniform float uAlpha;
		varying float vRadius;
		varying float vDepth;
		void main() {
			float d = length(gl_PointCoord - 0.5);
			if (d > 0.5) discard;
			float glow = smoothstep(0.5, 0.0, d);
			vec3 color = mix(uSignal, uInk, smoothstep(0.15, 1.0, vRadius));
			color += clamp(vDepth, 0.0, 0.4) * 0.9;
			float fade = 1.0 - smoothstep(0.72, 1.0, vRadius);
			gl_FragColor = vec4(color, glow * fade * uAlpha);
		}
	`;

	onMount(() => {
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
		const probe = document.createElement('canvas');
		if (!(probe.getContext('webgl2') ?? probe.getContext('webgl'))) return;

		let disposed = false;
		let cleanup = () => {};

		void import('three').then((THREE) => {
			if (disposed) return;
			const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
			renderer.domElement.setAttribute('aria-hidden', 'true');
			host.append(renderer.domElement);

			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 20);
			camera.position.set(0, 0, 3.4);

			// Golden angle ≈ 137.5°; sqrt spacing gives each point equal area.
			const golden = Math.PI * (3 - Math.sqrt(5));
			const positions = new Float32Array(count * 3);
			const radii = new Float32Array(count);
			const seeds = new Float32Array(count);
			for (let i = 0; i < count; i++) {
				const r = Math.sqrt((i + 0.5) / count);
				positions[i * 3] = Math.cos(i * golden) * r * 1.618;
				positions[i * 3 + 1] = Math.sin(i * golden) * r * 1.618;
				radii[i] = r;
				seeds[i] = (Math.sin(i * 12.9898) * 43758.5453) % 1 || 0.5;
				seeds[i] = Math.abs(seeds[i]);
			}
			const geometry = new THREE.BufferGeometry();
			geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
			geometry.setAttribute('aRadius', new THREE.BufferAttribute(radii, 1));
			geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));

			const uniforms = {
				uTime: { value: 0 },
				uSize: { value: 26 * renderer.getPixelRatio() },
				uPointer: { value: new THREE.Vector2(9, 9) },
				uSignal: { value: new THREE.Color() },
				uInk: { value: new THREE.Color() },
				uAlpha: { value: 1 }
			};
			const material = new THREE.ShaderMaterial({
				uniforms,
				vertexShader: vertex,
				fragmentShader: fragment,
				transparent: true,
				depthWrite: false
			});
			const points = new THREE.Points(geometry, material);
			points.rotation.set(-0.95, 0, 0.35);
			scene.add(points);

			function applyTheme() {
				const style = getComputedStyle(host);
				const light = document.documentElement.classList.contains('light');
				uniforms.uSignal.value.set(style.getPropertyValue('--signal').trim() || '#60a5fa');
				uniforms.uInk.value.set(light ? '#3f3f46' : '#d4d4d8');
				uniforms.uAlpha.value = light ? 0.8 : 0.9;
				material.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
				material.needsUpdate = true;
				if (!running) render();
			}

			const pointer = new THREE.Vector2(9, 9);
			const target = new THREE.Vector2(9, 9);
			const ray = new THREE.Raycaster();
			const plane = new THREE.Plane();
			const hit = new THREE.Vector3();
			const tilt = { x: 0, y: 0, tx: 0, ty: 0 };

			function onPointer(event: PointerEvent) {
				if (event.pointerType === 'touch') return;
				const bounds = host.getBoundingClientRect();
				const ndc = new THREE.Vector2(
					((event.clientX - bounds.left) / bounds.width) * 2 - 1,
					-((event.clientY - bounds.top) / bounds.height) * 2 + 1
				);
				tilt.tx = ndc.y * 0.12;
				tilt.ty = ndc.x * 0.18;
				ray.setFromCamera(ndc, camera);
				points.updateMatrixWorld();
				plane.setFromNormalAndCoplanarPoint(
					new THREE.Vector3(0, 0, 1).applyQuaternion(points.quaternion),
					points.position
				);
				if (ray.ray.intersectPlane(plane, hit)) {
					const local = points.worldToLocal(hit.clone());
					target.set(local.x, local.y);
				}
			}
			function onLeave() {
				target.set(9, 9);
				tilt.tx = tilt.ty = 0;
			}
			const pointerHost = host.closest('[data-field-host]') ?? host;
			pointerHost.addEventListener('pointermove', onPointer as EventListener);
			pointerHost.addEventListener('pointerleave', onLeave);

			function resize() {
				const { width, height } = host.getBoundingClientRect();
				if (!width || !height) return;
				renderer.setSize(width, height, false);
				camera.aspect = width / height;
				camera.updateProjectionMatrix();
				if (!running) render();
			}

			const clock = new THREE.Clock();
			let running = false;
			let frame = 0;
			let visible = false;

			function render() {
				renderer.render(scene, camera);
			}
			function tick() {
				const delta = Math.min(clock.getDelta(), 0.05);
				uniforms.uTime.value += delta;
				pointer.lerp(target, 1 - Math.pow(0.002, delta));
				uniforms.uPointer.value.copy(pointer);
				tilt.x += (tilt.tx - tilt.x) * Math.min(1, delta * 3);
				tilt.y += (tilt.ty - tilt.y) * Math.min(1, delta * 3);
				points.rotation.x = -0.95 + tilt.x;
				points.rotation.y = tilt.y;
				points.rotation.z += delta * 0.04;
				render();
				frame = requestAnimationFrame(tick);
			}
			function sync() {
				const shouldRun = visible && !reduced.matches && document.visibilityState === 'visible';
				if (shouldRun === running) return;
				running = shouldRun;
				if (running) {
					clock.getDelta();
					frame = requestAnimationFrame(tick);
				} else {
					cancelAnimationFrame(frame);
					render();
				}
			}

			const resizeObserver = new ResizeObserver(resize);
			resizeObserver.observe(host);
			const visibility = new IntersectionObserver(([entry]) => {
				visible = entry.isIntersecting;
				sync();
			});
			visibility.observe(host);
			const themeObserver = new MutationObserver(applyTheme);
			themeObserver.observe(document.documentElement, {
				attributes: true,
				attributeFilter: ['class', 'data-theme']
			});
			document.addEventListener('visibilitychange', sync);
			reduced.addEventListener('change', sync);

			resize();
			applyTheme();
			uniforms.uTime.value = 2.4;
			render();
			ready = true;

			cleanup = () => {
				running = false;
				cancelAnimationFrame(frame);
				resizeObserver.disconnect();
				visibility.disconnect();
				themeObserver.disconnect();
				document.removeEventListener('visibilitychange', sync);
				reduced.removeEventListener('change', sync);
				pointerHost.removeEventListener('pointermove', onPointer as EventListener);
				pointerHost.removeEventListener('pointerleave', onLeave);
				geometry.dispose();
				material.dispose();
				renderer.dispose();
				renderer.domElement.remove();
			};
		});

		return () => {
			disposed = true;
			cleanup();
		};
	});
</script>

<div bind:this={host} class="golden-field {className}" class:ready aria-hidden="true"></div>

<style>
	.golden-field {
		position: absolute;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
		background: radial-gradient(
			circle at 50% 55%,
			color-mix(in srgb, var(--signal) 16%, transparent),
			transparent 61.8%
		);
	}
	.golden-field :global(canvas) {
		display: block;
		width: 100%;
		height: 100%;
		opacity: 0;
		transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.golden-field.ready :global(canvas) {
		opacity: 1;
	}
</style>
