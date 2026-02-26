# Requirements Document

## Introduction

Complete redesign of the portfolio website at azmi.web.id using the existing SvelteKit 2 + Svelte 5 + Tailwind CSS 4 stack. The revamp replaces the current page sections with a modern, single-page portfolio showcasing Azmi Muwahid's profile as a Senior Full Stack Engineer specializing in AI-powered EdTech solutions. The site is deployed on Netlify and must remain a static/SSR SvelteKit application.

## Glossary

- **Portfolio_App**: The SvelteKit web application serving the portfolio at azmi.web.id
- **Hero_Section**: The top-of-page introductory section displaying name, title, tagline, and call-to-action links
- **Tech_Stack_Section**: The section displaying categorized technical skills (languages, frontend, backend, cloud, database, AI/ML)
- **GitHub_Stats_Section**: The section that fetches and displays public GitHub profile statistics using the GitHub REST API
- **Projects_Section**: The section showcasing featured projects with descriptions, tech tags, and links
- **Contact_Section**: The section providing social links, email, and a way to connect
- **Navigation**: The fixed/sticky top navigation bar with section links and theme toggle
- **Theme_Toggle**: The UI control that cycles between auto, light, and dark color schemes
- **Theme_Mode**: One of three theme states: auto (follows OS preference), light, or dark
- **Auto_Theme**: The theme mode that detects and follows the operating system color scheme preference via the CSS `prefers-color-scheme` media query
- **GitHub_API**: The public GitHub REST API (api.github.com) used to fetch user profile and repository data
- **Visitor**: A person viewing the portfolio website in a browser
- **Hero_3D_Element**: An animated Three.js 3D visual element displayed in the Hero_Section that responds to mouse movement
- **WebGL**: The browser API used by Three.js to render 3D graphics; may be unavailable on some devices
- **GTM**: Google Tag Manager, a tag management system for deploying analytics and tracking scripts
- **GTM_Container_ID**: The unique identifier for a GTM container, configured via environment variable
- **Core_Web_Vitals**: Google's set of user-centric performance metrics: Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS)
- **LCP**: Largest Contentful Paint, the time it takes for the largest visible content element to render
- **FID**: First Input Delay, the time from first user interaction to browser response
- **CLS**: Cumulative Layout Shift, the total of unexpected layout shifts during the page lifecycle

## Requirements

### Requirement 1: Hero Section Display

**User Story:** As a visitor, I want to see a prominent introduction when I land on the page, so that I immediately understand who Azmi is and what he does.

#### Acceptance Criteria

1. WHEN the Portfolio_App loads, THE Hero_Section SHALL display the name "Azmi Muwahid" and the title "Senior Full Stack Engineer"
2. WHEN the Portfolio_App loads, THE Hero_Section SHALL display a tagline describing AI-powered EdTech focus and current role at FutureLab.my
3. THE Hero_Section SHALL display recent achievement highlights including B2B sales increase, AWS cost reduction, and mentorship program
4. THE Hero_Section SHALL provide navigation links to the Contact_Section and the Projects_Section
5. THE Hero_Section SHALL display social links to LinkedIn, GitHub, and email

### Requirement 2: Navigation

**User Story:** As a visitor, I want a persistent navigation bar, so that I can jump to any section of the portfolio at any time.

#### Acceptance Criteria

1. THE Navigation SHALL remain visible at the top of the viewport while the Visitor scrolls the page
2. THE Navigation SHALL contain links to each major section: Hero_Section, Tech_Stack_Section, GitHub_Stats_Section, Projects_Section, and Contact_Section
3. WHEN a Visitor clicks a Navigation link, THE Portfolio_App SHALL smooth-scroll to the corresponding section
4. THE Navigation SHALL include the Theme_Toggle control
5. WHEN the viewport width is below 768px, THE Navigation SHALL collapse into a mobile-friendly hamburger menu

### Requirement 3: Theme Toggle

**User Story:** As a visitor, I want to switch between light, dark, and auto themes, so that I can view the portfolio in my preferred color scheme or have it follow my system preference.

#### Acceptance Criteria

1. THE Theme_Toggle SHALL support three Theme_Mode values: auto, light, and dark
2. WHEN a Visitor activates the Theme_Toggle, THE Theme_Toggle SHALL cycle through modes in the order: auto → light → dark → auto
3. WHEN the Theme_Mode is set to auto, THE Portfolio_App SHALL detect the operating system color scheme preference via the CSS `prefers-color-scheme` media query and apply the matching color scheme
4. WHILE the Theme_Mode is set to auto, THE Portfolio_App SHALL update the applied color scheme when the operating system preference changes
5. WHEN a Visitor activates the Theme_Toggle, THE Portfolio_App SHALL persist the selected Theme_Mode in localStorage
6. WHEN the Portfolio_App loads, THE Theme_Toggle SHALL restore the previously selected Theme_Mode from localStorage
7. IF no Theme_Mode preference is stored, THEN THE Portfolio_App SHALL default to the auto Theme_Mode
8. THE Theme_Toggle SHALL display a distinct icon for each Theme_Mode: a sun/moon icon for light/dark, and a system/monitor icon for auto

### Requirement 4: Tech Stack Showcase

**User Story:** As a visitor, I want to see Azmi's technical skills organized by category, so that I can understand his expertise areas.

#### Acceptance Criteria

1. THE Tech_Stack_Section SHALL display skills grouped into categories: Languages, Frontend, Backend, Cloud & DevOps, Database, and AI/ML
2. THE Tech_Stack_Section SHALL display the following skills per category:
   - Languages: TypeScript, JavaScript, Ruby, Go
   - Frontend: React, Next.js, Vue.js, Redux, Tailwind, Svelte
   - Backend: Rails, Node.js, Express
   - Cloud & DevOps: AWS, Docker, Terraform, GitHub Actions
   - Database: PostgreSQL, MongoDB, Redis
   - AI/ML: OpenAI
3. WHEN a Visitor scrolls the Tech_Stack_Section into view, THE Tech_Stack_Section SHALL animate the skill items into view

### Requirement 5: GitHub Stats Integration

**User Story:** As a visitor, I want to see live GitHub statistics, so that I can gauge Azmi's open-source activity and coding presence.

#### Acceptance Criteria

1. WHEN the Portfolio_App loads, THE GitHub_Stats_Section SHALL fetch public profile data from the GitHub_API for the user "azmimuwahid"
2. THE GitHub_Stats_Section SHALL display the public repository count, follower count, and following count
3. IF the GitHub_API request fails, THEN THE GitHub_Stats_Section SHALL display fallback placeholder values and a message indicating data is unavailable
4. THE GitHub_Stats_Section SHALL cache the fetched GitHub data for the duration of the page session to avoid redundant API calls

### Requirement 6: Featured Projects

**User Story:** As a visitor, I want to see highlighted projects, so that I can understand the kind of work Azmi has done.

#### Acceptance Criteria

1. THE Projects_Section SHALL display a list of featured project cards
2. THE Projects_Section SHALL display for each project card: a title, a description, a list of technology tags, and optional links to a live demo or source repository
3. THE Projects_Section SHALL include the AI-powered mentorship platform at FutureLab.my as a featured project
4. WHEN a Visitor clicks a project link, THE Portfolio_App SHALL open the link in a new browser tab

### Requirement 7: Contact and Connect Section

**User Story:** As a visitor, I want to find ways to reach out to Azmi, so that I can connect for opportunities or collaboration.

#### Acceptance Criteria

1. THE Contact_Section SHALL display an email link to azmimuwahid@gmail.com
2. THE Contact_Section SHALL display links to LinkedIn (https://linkedin.com/in/azmimuwahid), GitHub (https://github.com/azmimuwahid), and the portfolio URL (https://azmi.web.id)
3. THE Contact_Section SHALL display a message indicating openness to opportunities in EdTech, AI, and full-stack development
4. THE Contact_Section SHALL display current interests: Advanced system design, Kubernetes, and ML engineering

### Requirement 8: Responsive Layout

**User Story:** As a visitor, I want the portfolio to look good on any device, so that I can browse it on my phone, tablet, or desktop.

#### Acceptance Criteria

1. THE Portfolio_App SHALL render a single-column layout on viewports narrower than 768px
2. THE Portfolio_App SHALL render a multi-column layout on viewports 768px and wider
3. THE Portfolio_App SHALL ensure all text remains readable without horizontal scrolling on viewports as narrow as 320px
4. THE Portfolio_App SHALL ensure all interactive elements have a minimum touch target size of 44x44 CSS pixels on mobile viewports

### Requirement 9: Performance and SEO

**User Story:** As a visitor, I want the portfolio to load fast and be discoverable by search engines, so that the experience is smooth and the site ranks well.

#### Acceptance Criteria

1. THE Portfolio_App SHALL render the initial page content via server-side rendering using SvelteKit
2. THE Portfolio_App SHALL include a descriptive `<title>` tag and `<meta name="description">` tag on the main page
3. THE Portfolio_App SHALL include Open Graph meta tags (og:title, og:description, og:url) for social media sharing
4. THE Portfolio_App SHALL use semantic HTML elements (header, nav, main, section, footer) for the page structure

### Requirement 10: Accessibility

**User Story:** As a visitor using assistive technology, I want the portfolio to be navigable and understandable, so that I can access all content.

#### Acceptance Criteria

1. THE Portfolio_App SHALL provide descriptive `aria-label` attributes on all icon-only interactive elements
2. THE Navigation SHALL be keyboard-navigable using Tab and Enter keys
3. THE Portfolio_App SHALL maintain a color contrast ratio of at least 4.5:1 for normal text against its background in both light and dark themes
4. THE Theme_Toggle SHALL announce the current theme state to screen readers when activated


### Requirement 11: Hero 3D Element

**User Story:** As a visitor, I want to see an eye-catching 3D visual element in the hero section, so that the portfolio feels modern and visually impressive like award-winning websites.

#### Acceptance Criteria

1. THE Hero_Section SHALL display a Hero_3D_Element rendered using Three.js
2. THE Hero_3D_Element SHALL consist of an animated 3D geometric shape, particle system, or abstract visual art
3. WHEN a Visitor moves the mouse cursor, THE Hero_3D_Element SHALL respond to the cursor position with a corresponding visual transformation
4. THE Hero_3D_Element SHALL load via lazy loading so that the Three.js library does not block the initial page render
5. IF WebGL is not available in the Visitor's browser, THEN THE Hero_Section SHALL display a static fallback visual instead of the Hero_3D_Element
6. IF the Visitor's device is detected as low-end (via hardware concurrency or device memory API), THEN THE Hero_3D_Element SHALL reduce visual complexity or display the static fallback
7. THE Hero_3D_Element SHALL maintain a frame rate of at least 30 frames per second on mid-range devices

### Requirement 12: Google Tag Manager Integration

**User Story:** As the portfolio owner, I want Google Tag Manager integrated into the site, so that I can track visitor behavior and measure reach analytics.

#### Acceptance Criteria

1. THE Portfolio_App SHALL load the GTM script using the GTM_Container_ID
2. THE Portfolio_App SHALL read the GTM_Container_ID from an environment variable named `PUBLIC_GTM_ID`
3. THE Portfolio_App SHALL load the GTM script asynchronously so that the script does not block page rendering
4. THE Portfolio_App SHALL include the GTM noscript fallback iframe immediately after the opening `<body>` tag
5. IF the `PUBLIC_GTM_ID` environment variable is not set or is empty, THEN THE Portfolio_App SHALL skip loading the GTM script entirely without causing errors

### Requirement 13: Web Performance and Core Web Vitals

**User Story:** As a visitor, I want the portfolio to load quickly and feel responsive, so that I have a smooth browsing experience regardless of my connection speed.

#### Acceptance Criteria

1. THE Portfolio_App SHALL achieve a Largest Contentful Paint (LCP) of less than 2.5 seconds on a simulated mobile connection
2. THE Portfolio_App SHALL achieve a First Input Delay (FID) of less than 100 milliseconds
3. THE Portfolio_App SHALL achieve a Cumulative Layout Shift (CLS) of less than 0.1
4. THE Portfolio_App SHALL lazy-load the Three.js library and Hero_3D_Element so that the initial JavaScript bundle excludes Three.js
5. THE Portfolio_App SHALL serve images in modern formats (WebP or AVIF) with appropriate `width`, `height`, and `loading="lazy"` attributes
6. THE Portfolio_App SHALL use a font loading strategy that prevents layout shift by specifying `font-display: swap` or preloading critical fonts
7. THE Portfolio_App SHALL split the JavaScript bundle so that only code required for the initial viewport is loaded on first paint

### Requirement 14: Lighthouse Score Targets

**User Story:** As the portfolio owner, I want the site to achieve good Lighthouse audit scores, so that the portfolio demonstrates professional-grade web development quality.

#### Acceptance Criteria

1. THE Portfolio_App SHALL achieve a Lighthouse Performance score of 90 or above on mobile
2. THE Portfolio_App SHALL achieve a Lighthouse Accessibility score of 90 or above
3. THE Portfolio_App SHALL achieve a Lighthouse Best Practices score of 90 or above
4. THE Portfolio_App SHALL achieve a Lighthouse SEO score of 90 or above
