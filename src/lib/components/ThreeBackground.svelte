<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { Canvas } from '@threlte/core';
	import { T } from '@threlte/core';

	let mouseX = 0;
	let mouseY = 0;
	let time = 0;
	let mounted = false;

	// Glyph dither effect configuration
	const PARTICLE_COUNT = 1000;
	const GLYPH_SIZE = 5.0; // Increased size for visibility

	// Generate particle data
	let positions: Float32Array;
	let colors: Float32Array;
	let sizes: Float32Array;

	onMount(() => {
		mounted = true;
		generateParticles();
		startAnimation();
		addEventListeners();

		return () => {
			removeEventListeners();
		};
	});

	// Generate particle data
	function generateParticles() {
		positions = new Float32Array(PARTICLE_COUNT * 3);
		colors = new Float32Array(PARTICLE_COUNT * 3);
		sizes = new Float32Array(PARTICLE_COUNT);


		for (let i = 0; i < PARTICLE_COUNT; i++) {
			const i3 = i * 3;
			
			// Position with dither pattern - closer to camera
			positions[i3] = (Math.random() - 0.5) * 10;
			positions[i3 + 1] = (Math.random() - 0.5) * 10;
			positions[i3 + 2] = (Math.random() - 0.5) * 5;

			// Enhanced color variation with multiple hue ranges
			let hue;
			const colorType = Math.random();
			
			if (colorType < 0.4) {
				// Blue-cyan range
				hue = Math.random() * 0.2 + 0.5; // 0.5-0.7 (blue to cyan)
			} else if (colorType < 0.7) {
				// Purple-magenta range
				hue = Math.random() * 0.15 + 0.75; // 0.75-0.9 (purple to magenta)
			} else {
				// Orange-red range
				hue = Math.random() * 0.1 + 0.05; // 0.05-0.15 (orange to red)
			}
			
			const saturation = Math.random() * 0.3 + 0.7; // 0.7-1.0 for vibrant colors
			const lightness = Math.random() * 0.3 + 0.4; // 0.4-0.7 for good visibility
			
			const color = new THREE.Color().setHSL(hue, saturation, lightness);
			colors[i3] = color.r;
			colors[i3 + 1] = color.g;
			colors[i3 + 2] = color.b;

			// Random sizes for dither effect - larger for visibility
			sizes[i] = Math.random() * GLYPH_SIZE + 2.0;
		}

	}

	// Animation loop
	function startAnimation() {
		function animate() {
			time = Date.now() * 0.001;

			requestAnimationFrame(animate);
		}
		animate();

	}

	// Event handlers
	function handleMouseMove(event: MouseEvent) {
		mouseX = (event.clientX / window.innerWidth) * 2 - 1;
		mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
	}

	function addEventListeners() {
		window.addEventListener('mousemove', handleMouseMove);
	}

	function removeEventListeners() {
		window.removeEventListener('mousemove', handleMouseMove);
	}

	// Shader uniforms with enhanced color controls
	$: uniforms = {
		uTime: { value: time },
		uMouse: { value: new THREE.Vector2(mouseX, mouseY) },
		uResolution: { value: new THREE.Vector2(typeof window !== 'undefined' ? window.innerWidth : 1920, typeof window !== 'undefined' ? window.innerHeight : 1080) },
		uColorShift: { value: 0.1 }, // Controls color shifting intensity
		uColorSpeed: { value: 0.5 }, // Controls color animation speed
		uSaturationBoost: { value: 1.2 } // Enhances color saturation
	};

	// Enhanced vertex shader with dynamic color effects
	const vertexShader = `
		attribute float size;
		varying vec3 vColor;
		varying float vSize;
		varying float vColorShift;
		varying float vMouseEffect;
		uniform float uTime;
		uniform vec2 uMouse;
		uniform float uColorShift;
		uniform float uColorSpeed;
		
		void main() {
			vColor = color;
			vSize = size;
			
			vec3 pos = position;
			
			// Mouse interaction effect
			float mouseDistance = distance(pos.xy, uMouse * 0.01);
			float mouseEffect = 1.0 / (1.0 + mouseDistance * 2.0);
			vMouseEffect = mouseEffect;
			
			// Dynamic color shifting based on position and time
			float colorShift = sin(pos.x * 0.1 + pos.y * 0.1 + uTime * uColorSpeed) * uColorShift;
			vColorShift = colorShift;
			
			// Enhanced wave effects
			pos.z += sin(pos.x * 0.5 + uTime) * 0.5 * mouseEffect;
			pos.y += cos(pos.x * 0.3 + uTime * 0.7) * 0.3 * mouseEffect;
			
			gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
			gl_PointSize = size * (300.0 / -gl_Position.z) * (1.0 + mouseEffect * 0.5);
		}
	`;

	// Enhanced fragment shader with dynamic color effects
	const fragmentShader = `
		varying vec3 vColor;
		varying float vSize;
		varying float vColorShift;
		varying float vMouseEffect;
		uniform float uSaturationBoost;
		uniform float uTime;
		
		// HSL to RGB conversion
		vec3 hsl2rgb(vec3 c) {
			vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0), 6.0)-3.0)-1.0, 0.0, 1.0);
			return c.z + c.y * (rgb-0.5)*(1.0-abs(2.0*c.z-1.0));
		}
		
		// RGB to HSL conversion
		vec3 rgb2hsl(vec3 c) {
			float h = 0.0;
			float s = 0.0;
			float l = 0.0;
			float r = c.r;
			float g = c.g;
			float b = c.b;
			float minVal = min(min(r, g), b);
			float maxVal = max(max(r, g), b);
			float delta = maxVal - minVal;
			l = (maxVal + minVal) / 2.0;
			if (delta == 0.0) {
				h = 0.0;
				s = 0.0;
			} else {
				s = l < 0.5 ? delta / (maxVal + minVal) : delta / (2.0 - maxVal - minVal);
				if (maxVal == r) {
					h = (g - b) / delta + (g < b ? 6.0 : 0.0);
				} else if (maxVal == g) {
					h = (b - r) / delta + 2.0;
				} else {
					h = (r - g) / delta + 4.0;
				}
				h /= 6.0;
			}
			return vec3(h, s, l);
		}
		
		void main() {
			// Create enhanced glyph-like circular pattern
			vec2 center = gl_PointCoord - 0.5;
			float dist = length(center);
			
			// Enhanced dither pattern with mouse interaction
			float pattern = step(0.3, dist) * step(dist, 0.5);
			pattern += step(0.1, dist) * step(dist, 0.2) * 0.7;
			pattern *= (1.0 + vMouseEffect * 0.3); // Mouse interaction brightening
			
			// Dynamic color enhancement
			vec3 hsl = rgb2hsl(vColor);
			
			// Apply color shifting
			hsl.x = mod(hsl.x + vColorShift, 1.0);
			
			// Boost saturation
			hsl.y = min(hsl.y * uSaturationBoost, 1.0);
			
			// Add subtle brightness variation
			hsl.z = hsl.z * (1.0 + vMouseEffect * 0.2);
			
			vec3 enhancedColor = hsl2rgb(hsl);
			
			// Enhanced alpha with glow effect
			float alpha = pattern * (1.0 - smoothstep(0.0, 0.5, dist));
			alpha *= (0.8 + vMouseEffect * 0.4); // Mouse interaction alpha boost
			
			gl_FragColor = vec4(enhancedColor, alpha);
		}
	`;
</script>

{#if mounted && positions}
	<div class="absolute inset-0 w-full h-full pointer-events-none" style="z-index: 1; opacity: 0.7; mix-blend-mode: screen;">
		<Canvas>
			<T.PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
			<T.Points
				rotation.x={Math.sin(time * 0.3) * 0.1}
				rotation.y={time * 0.1}
				rotation.z={0}
			>
				<T.BufferGeometry
					on:create={({ ref: geometry }) => {
						geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
						geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
						geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
	
					}}
				/>
				<T.ShaderMaterial
					uniforms={uniforms}
					vertexShader={vertexShader}
					fragmentShader={fragmentShader}
					transparent={true}
					blending={THREE.AdditiveBlending}
					vertexColors={true}
				/>
			</T.Points>
		</Canvas>
	</div>
{/if}