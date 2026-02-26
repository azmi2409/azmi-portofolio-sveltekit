# Implementation Plan: Portfolio Revamp

## Overview

Replace the existing portfolio sections (Hero, About, Portfolio, Contact) with new purpose-built sections using shadcn-svelte throughout. Upgrade the theme store to tri-state (auto/light/dark), add GitHub stats via server-side load, integrate GTM, implement a lazy-loaded Three.js 3D hero with device capability detection, and ensure performance/accessibility targets are met. Tasks are ordered for incremental progress: shared utilities first, then core sections, then integration and polish.

## Tasks

- [x] 1. Install shadcn-svelte components and set up shared utilities
  - [x] 1.1 Install required shadcn-svelte components (card, badge, sheet, separator, toggle, tooltip) via `npx shadcn-svelte@latest add`
    - Button is already installed; add the remaining components
    - _Requirements: Design decision — shadcn-svelte everywhere_

  - [x] 1.2 Create the `inview` Svelte action for scroll-triggered animations
    - Create `src/lib/actions/inview.ts` implementing an IntersectionObserver-based action
    - Support `threshold`, `rootMargin`, and `once` options
    - Dispatch a custom `inview` event when the element enters the viewport
    - _Requirements: 4.3, 13.1_

  - [x] 1.3 Create the device capability detection utility
    - Create `src/lib/utils/device.ts` with `isWebGLAvailable()`, `isLowEndDevice()`, and `detectCapabilities()` functions
    - Low-end threshold: `hardwareConcurrency <= 2` OR `deviceMemory <= 2`
    - Handle undefined `deviceMemory` (Chrome-only API) gracefully
    - _Requirements: 11.5, 11.6_

  - [ ]* 1.4 Write property test for low-end device detection
    - **Property 9: Low-end device detection**
    - Generate random `hardwareConcurrency` (0–32) and `deviceMemory` (undefined, 0.25–8) values
    - Verify `isLowEndDevice()` returns true iff `hardwareConcurrency <= 2` OR `deviceMemory <= 2`
    - Verify the function never throws regardless of input
    - **Validates: Requirements 11.6**

- [x] 2. Upgrade theme store and ThemeToggle to tri-state
  - [x] 2.1 Rewrite the theme store for tri-state mode (auto/light/dark)
    - Modify `src/lib/stores/theme.ts` to support `ThemeMode` ('auto' | 'light' | 'dark') and `ResolvedTheme` ('light' | 'dark')
    - Implement `cycleMode()`: auto → light → dark → auto
    - Default to 'auto' mode; resolve via `matchMedia('(prefers-color-scheme: dark)')`
    - Add/remove matchMedia listener when entering/leaving auto mode
    - Persist mode to `localStorage` key `'theme-mode'`; restore on load
    - Handle corrupted localStorage values by defaulting to 'auto'
    - Handle missing `matchMedia` (SSR) by resolving to 'light'
    - Apply resolved theme via `document.documentElement.classList.toggle('dark', ...)`
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

  - [ ]* 2.2 Write property test for theme mode cycle determinism
    - **Property 1: Theme mode cycle is deterministic**
    - For any starting mode and N toggles, result equals `cycle[(startIndex + N) % 3]`
    - Toggling 3 times returns to the same mode
    - **Validates: Requirements 3.1, 3.2**

  - [ ]* 2.3 Write property test for theme persistence round-trip
    - **Property 2: Theme mode persistence round-trip**
    - For any mode, `load(persist(mode)) === mode`
    - **Validates: Requirements 3.5, 3.6**

  - [ ]* 2.4 Write property test for auto mode OS preference resolution
    - **Property 3: Auto mode resolves to OS preference**
    - For any OS preference (light|dark), `resolveTheme('auto', osPreference) === osPreference`
    - **Validates: Requirements 3.3**

  - [x] 2.5 Update ThemeToggle component for tri-state with icons and accessibility
    - Modify `src/lib/components/ThemeToggle.svelte` to use the new store's `cycleMode()`
    - Display Sun icon for light, Moon icon for dark, Monitor icon for auto
    - Add `aria-live="polite"` region to announce theme mode changes to screen readers
    - Add `aria-label` describing current mode on the toggle button
    - _Requirements: 3.8, 10.1, 10.4_

  - [ ]* 2.6 Write property test for theme icon matching mode
    - **Property 4: Theme icon matches mode**
    - For any mode, verify the correct icon is rendered; no two modes share the same icon
    - **Validates: Requirements 3.8**

- [x] 3. Update layout with SEO meta tags and GTM integration
  - [x] 3.1 Update `+layout.svelte` with SEO and Open Graph meta tags
    - Add `<title>Azmi Muwahid — Senior Full Stack Engineer</title>`
    - Add `<meta name="description">` with portfolio description
    - Add Open Graph tags: `og:title`, `og:description`, `og:url` (https://azmi.web.id)
    - Initialize the new tri-state theme store (replace old theme init logic)
    - Use semantic HTML: ensure `<header>`, `<nav>`, `<main>`, `<footer>` structure
    - _Requirements: 9.2, 9.3, 9.4_

  - [x] 3.2 Create GTM integration component and wire into layout
    - Create `src/lib/components/GtmScript.svelte` that reads `PUBLIC_GTM_ID` from `$env/static/public`
    - If ID is set and non-empty: inject async GTM `<script>` in `<svelte:head>` and `<noscript>` iframe fallback
    - If ID is empty/undefined/whitespace: render nothing, no errors
    - Add the GTM noscript iframe to `src/app.html` after `<body>` opening tag (or via layout)
    - Include `GtmScript` in `+layout.svelte`
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_

  - [ ]* 3.3 Write property test for GTM script omission on empty ID
    - **Property 10: GTM script omitted when ID is empty**
    - For any falsy/whitespace-only GTM ID, verify no `<script>` or `<noscript>` tags are rendered
    - **Validates: Requirements 12.5**

- [ ] 4. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Implement server-side GitHub stats loading
  - [x] 5.1 Create `+page.server.ts` with GitHub API load function
    - Create `src/routes/+page.server.ts`
    - Fetch from `https://api.github.com/users/azmimuwahid` in the `load()` function
    - Transform response to `GitHubStats` interface (`publicRepos`, `followers`, `following`, `avatarUrl`)
    - Wrap fetch in try-catch; return `{ githubStats: null }` on any failure
    - Never let GitHub API failures prevent page rendering
    - _Requirements: 5.1, 5.3, 5.4_

  - [ ]* 5.2 Write property test for GitHub stats display completeness
    - **Property 5: GitHub stats display completeness**
    - For any valid `GitHubStats` with arbitrary non-negative integers, verify all three values appear in rendered output
    - **Validates: Requirements 5.2**

- [x] 6. Implement Navigation with mobile Sheet menu
  - [x] 6.1 Rewrite Navigation component with shadcn Sheet for mobile
    - Modify `src/lib/components/Navigation.svelte`
    - Use shadcn `Button` (variant="ghost") for desktop nav links
    - Use shadcn `Sheet` for mobile hamburger menu (triggered below 768px viewport)
    - Nav items: Home (#hero), Tech Stack (#tech-stack), GitHub (#github-stats), Projects (#projects), Contact (#contact)
    - Implement smooth-scroll on link click via `element.scrollIntoView({ behavior: 'smooth' })`
    - Keep sticky positioning at top of viewport
    - Integrate ThemeToggle in the nav bar
    - Ensure keyboard navigability (Tab + Enter)
    - Ensure all icon-only elements have `aria-label`
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 8.4, 10.1, 10.2_

- [x] 7. Implement HeroSection with 3D element and fallback
  - [x] 7.1 Create HeroFallback component
    - Create `src/lib/components/sections/HeroFallback.svelte`
    - Static visual: CSS gradient or SVG pattern, no JS dependencies
    - Lightweight fallback for when WebGL is unavailable or device is low-end
    - _Requirements: 11.5, 11.6_

  - [x] 7.2 Create Hero3DElement component (lazy-loaded)
    - Create `src/lib/components/sections/Hero3DElement.svelte`
    - Use `@threlte/core` (`Canvas`, `T`) with Three.js for animated 3D geometric/particle scene
    - Respond to mouse position via `mousemove` event listener
    - Target ≥30fps using `requestAnimationFrame`
    - Render as overlay within hero (`position: absolute`, `pointer-events: none`)
    - Clean up Three.js resources on component destroy
    - This component is only loaded via dynamic `import()`
    - _Requirements: 11.1, 11.2, 11.3, 11.7_

  - [x] 7.3 Create HeroSection component replacing Hero.svelte
    - Create `src/lib/components/sections/HeroSection.svelte` (replaces `Hero.svelte`)
    - Display: "Azmi Muwahid", "Senior Full Stack Engineer", tagline about AI-powered EdTech at FutureLab.my
    - Display achievement highlights (B2B sales increase, AWS cost reduction, mentorship) using shadcn `Badge`
    - CTA buttons using shadcn `Button`: "View Projects" → #projects, "Get in Touch" → #contact
    - Social links (LinkedIn, GitHub, Email) with `aria-label` on each icon link
    - Check device capabilities via `detectCapabilities()`
    - Lazy-load `Hero3DElement.svelte` via dynamic `import()` when WebGL available and not low-end
    - Show `HeroFallback.svelte` otherwise; also show fallback if dynamic import fails (try-catch)
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 11.4, 11.5, 11.6, 13.4_

  - [ ]* 7.4 Write property test for accessible icon labels
    - **Property 7: Icon-only interactive elements have accessible labels**
    - Render HeroSection, query all icon-only interactive elements (buttons/anchors with only icon children)
    - Verify each has a non-empty `aria-label`
    - **Validates: Requirements 10.1**

- [x] 8. Implement content sections (TechStack, GitHubStats, Projects, Contact, Footer)
  - [x] 8.1 Create TechStackSection component replacing About.svelte
    - Create `src/lib/components/sections/TechStackSection.svelte` (replaces `About.svelte`)
    - Use shadcn `Card` + `Badge` for each skill category
    - Categories with exact skills: Languages (TypeScript, JavaScript, Ruby, Go), Frontend (React, Next.js, Vue.js, Redux, Tailwind, Svelte), Backend (Rails, Node.js, Express), Cloud & DevOps (AWS, Docker, Terraform, GitHub Actions), Database (PostgreSQL, MongoDB, Redis), AI/ML (OpenAI)
    - Use shadcn `Separator` between category groups
    - Apply `inview` action for scroll-triggered entrance animations
    - _Requirements: 4.1, 4.2, 4.3_

  - [x] 8.2 Create GitHubStatsSection component
    - Create `src/lib/components/sections/GitHubStatsSection.svelte`
    - Accept `stats: GitHubStats | null` prop
    - Use shadcn `Card` for each stat (repos, followers, following)
    - When stats is null: show placeholder values (0) and "Data currently unavailable" message
    - Apply `inview` action for scroll animation
    - _Requirements: 5.2, 5.3_

  - [x] 8.3 Create ProjectsSection component replacing Portfolio.svelte
    - Create `src/lib/components/sections/ProjectsSection.svelte` (replaces `Portfolio.svelte`)
    - Use shadcn `Card` for project cards, `Badge` for tech tags, `Button` for links
    - Include AI-powered mentorship platform at FutureLab.my as featured project
    - Each card: title, description, tech badges, optional live/source links
    - Links open in new tab with `target="_blank"` + `rel="noopener noreferrer"`
    - Apply `inview` action for scroll animation
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [ ]* 8.4 Write property test for project card rendering completeness
    - **Property 6: Project card rendering completeness**
    - For any valid Project object, verify title, description, and all tech tags appear
    - If liveUrl/sourceUrl present, verify link has `target="_blank"` and `rel="noopener noreferrer"`
    - **Validates: Requirements 6.2, 6.4**

  - [x] 8.5 Create ContactSection component replacing Contact.svelte
    - Create `src/lib/components/sections/ContactSection.svelte` (replaces `Contact.svelte`)
    - Use shadcn `Card` for container, `Button` for social links, `Badge` for interests
    - Display: email link (azmimuwahid@gmail.com), LinkedIn, GitHub, portfolio URL (azmi.web.id)
    - Show availability message for EdTech, AI, full-stack opportunities
    - Show current interests: Advanced system design, Kubernetes, ML engineering
    - Remove the contact form (not in requirements)
    - Apply `inview` action for scroll animation
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

  - [x] 8.6 Create Footer component
    - Create `src/lib/components/sections/Footer.svelte`
    - Simple footer with copyright and quick links
    - Use shadcn `Separator` for visual divider
    - Use `<footer>` semantic HTML element
    - _Requirements: 9.4_

- [x] 9. Wire everything together in +page.svelte
  - [x] 9.1 Update `+page.svelte` to use new section components
    - Replace imports: Hero → HeroSection, About → TechStackSection, Portfolio → ProjectsSection, Contact → ContactSection
    - Add GitHubStatsSection (pass `data.githubStats` from server load) and Footer
    - Update `<svelte:head>` title to "Azmi Muwahid — Senior Full Stack Engineer"
    - Update meta description
    - Add section `id` attributes for navigation anchors: hero, tech-stack, github-stats, projects, contact
    - Ensure semantic `<main>` wrapper with `<section>` elements
    - _Requirements: 1.1, 2.2, 9.1, 9.2, 9.4_

- [ ] 10. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 11. Responsive layout and performance optimization
  - [x] 11.1 Implement responsive layout across all sections
    - Single-column layout below 768px, multi-column at 768px+
    - Ensure text readable without horizontal scroll at 320px
    - Ensure all interactive elements have minimum 44x44px touch targets on mobile
    - Use Tailwind responsive utilities throughout
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

  - [x] 11.2 Apply performance optimizations
    - Ensure all `<img>` elements have explicit `width`, `height`, and `loading="lazy"` attributes (hero images may use `loading="eager"`)
    - Verify font-face declarations use `font-display: swap` in `src/app.css`
    - Verify Three.js is excluded from initial bundle (dynamic import only)
    - Serve images in WebP/AVIF formats where applicable
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 13.7_

  - [ ]* 11.3 Write property test for image optimization attributes
    - **Property 11: Image elements have optimization attributes**
    - Query all `<img>` elements in rendered output
    - Verify each has `width`, `height`, and `loading` attributes
    - **Validates: Requirements 13.5**

  - [x] 11.4 Ensure color contrast compliance in both themes
    - Verify text/background color pairs meet 4.5:1 WCAG contrast ratio in both light and dark themes
    - Adjust Tailwind theme colors if needed
    - _Requirements: 10.3, 14.2_

- [ ] 12. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- The design uses TypeScript/Svelte — all code examples use this stack
- Existing section components (Hero.svelte, About.svelte, Portfolio.svelte, Contact.svelte) are replaced by new components; old files can be removed after wiring is complete
