// Run: node scripts/check-motion.mjs /path/to/playwright/index.mjs [base-url]
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';

const { chromium } = await import(pathToFileURL(process.argv[2]).href);
const base = process.argv[3] ?? 'http://localhost:5173';
const browser = await chromium.launch();
const errors = [];
try {
	const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
	page.on('pageerror', (error) => errors.push(error.message));
	await page.addInitScript(() => {
		window.motionCalls = 0;
		const animate = Element.prototype.animate;
		Element.prototype.animate = function (...args) {
			window.motionCalls++;
			return animate.apply(this, args);
		};
	});
	await page.goto(base);
	await page.waitForFunction(() => window.motionCalls > 0);
	const heroAction = page.locator('#hero .button-primary');
	await heroAction.focus();
	assert.equal(
		await heroAction.evaluate((el) => getComputedStyle(el.parentElement).opacity),
		'1',
		'Keyboard focus must reveal the active entrance immediately'
	);
	await page.waitForTimeout(1400);
	assert.equal(
		await page
			.locator('.hero-copy')
			.evaluate((el) => getComputedStyle(el, '::before').animationName),
		'none',
		'Hero background stays static'
	);
	const portrait = page.locator('.hero-portrait');
	await portrait.hover({ position: { x: 30, y: 30 } });
	await page.waitForFunction(() =>
		document.querySelector('.hero-portrait').style.getPropertyValue('--tilt-x')
	);
	await page.mouse.move(0, 0);
	assert.equal(await portrait.evaluate((el) => el.style.getPropertyValue('--tilt-x')), '');

	const card = page.locator('.project-card').first();
	await card.scrollIntoViewIfNeeded();
	await page.waitForTimeout(1100);
	const preview = card.locator('.preview-image');
	assert.equal(await preview.evaluate((el) => getComputedStyle(el).overflow), 'hidden');
	assert(
		await card.locator('.browser-bar').evaluate((el) => {
			const { left, top, width, height } = el.getBoundingClientRect();
			return el.contains(document.elementFromPoint(left + width / 2, top + height / 2));
		}),
		'Project image must not cover preview chrome'
	);
	assert.equal(
		await preview.locator('img').evaluate((el) => getComputedStyle(el).animationName),
		'none'
	);
	assert.equal(
		await preview.locator('img').evaluate((el) => getComputedStyle(el).translate),
		'none'
	);
	assert.equal(await preview.locator('img').evaluate((el) => getComputedStyle(el).scale), 'none');
	await card.hover({ position: { x: 60, y: 60 } });
	await page.waitForFunction(() =>
		document.querySelector('.project-card').style.getPropertyValue('--pointer-x')
	);
	await page.emulateMedia({ reducedMotion: 'reduce' });
	assert.equal(await card.evaluate((el) => el.style.getPropertyValue('--pointer-x')), '');
	await page.waitForFunction(() => document.getAnimations().length === 0);
	assert.equal(await preview.locator('img').evaluate((el) => getComputedStyle(el).scale), 'none');
	assert.equal(
		await page
			.locator('.hero-copy')
			.evaluate((el) => getComputedStyle(el, '::before').animationName),
		'none'
	);
	await page.reload();
	await page.waitForTimeout(800);
	assert.equal(await page.evaluate(() => window.motionCalls), 0);
	assert.equal(await portrait.evaluate((el) => getComputedStyle(el).transform), 'none');

	for (const width of [320, 375, 768, 1024, 1440]) {
		await page.setViewportSize({ width, height: 1000 });
		for (const theme of ['light', 'dark']) {
			await page.evaluate((theme) => {
				document.documentElement.classList.remove('light', 'dark');
				document.documentElement.classList.add(theme);
			}, theme);
			assert(await page.locator('h1').isVisible());
			assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
		}
	}
	await page.setViewportSize({ width: 375, height: 812 });
	await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
	await page.emulateMedia({ reducedMotion: 'no-preference' });
	assert.equal(
		await page
			.locator('.hero-copy')
			.evaluate((el) => getComputedStyle(el, '::before').animationName),
		'none',
		'Mobile background stays static'
	);
	const menu = page.locator('#mobile-navigation');
	const toggle = page.locator('.menu-button');
	await toggle.focus();
	await page.keyboard.press('Enter');
	await menu.waitFor({ state: 'visible' });
	await page.keyboard.press('Tab');
	assert(await menu.evaluate((el) => el.contains(document.activeElement)));
	await page.keyboard.press('Escape');
	await menu.waitFor({ state: 'hidden' });
	assert(await toggle.evaluate((el) => el === document.activeElement));
	await toggle.click();
	await menu.getByRole('button', { name: 'Use light theme' }).click();
	assert.equal(await page.locator('html').getAttribute('data-theme'), 'light');
	const menuBounds = await menu.boundingBox();
	await page.mouse.click(5, menuBounds.y + menuBounds.height + 10);
	await menu.waitFor({ state: 'hidden' });
	await toggle.click();
	await page.setViewportSize({ width: 1440, height: 1000 });
	await page.waitForFunction(
		() => !document.querySelector('#mobile-navigation').matches(':popover-open')
	);
	assert.equal(
		await page
			.getByRole('button', { name: 'Use light theme', exact: true })
			.first()
			.getAttribute('aria-pressed'),
		'true'
	);
	await page.setViewportSize({ width: 375, height: 812 });
	await toggle.click();
	await menu.getByRole('link', { name: 'About', exact: true }).click();
	await page.waitForURL('**/about');
	await menu.waitFor({ state: 'hidden' });
	await page.goBack();
	await portrait.waitFor();
	await page.setViewportSize({ width: 1440, height: 1000 });
	await page.emulateMedia({ reducedMotion: 'no-preference' });
	await page.locator('a[href="/about"]').last().click();
	await page.waitForURL('**/about');
	await page.goBack();
	await portrait.waitFor();
	await page.waitForTimeout(1400);
	await portrait.hover({ position: { x: 30, y: 30 } });
	await page.waitForFunction(() =>
		document.querySelector('.hero-portrait').style.getPropertyValue('--tilt-x')
	);
	for (const path of [
		'/projects',
		'/projects/codexia-live',
		'/projects/ai-clipper-video',
		'/projects/aotavatar',
		'/projects/diy-visa',
		'/about',
		'/contact'
	]) {
		const response = await page.goto(`${base}${path}`);
		assert.equal(response?.status(), 200, path);
		assert(await page.locator('h1').isVisible(), path);
		assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), path);
	}
	const staticPage = await browser.newPage({ javaScriptEnabled: false });
	await staticPage.goto(base);
	assert(await staticPage.locator('h1').isVisible());
	assert.equal(await staticPage.locator('h1').evaluate((el) => getComputedStyle(el).opacity), '1');
	await staticPage.setViewportSize({ width: 375, height: 812 });
	await staticPage.getByRole('button', { name: 'Open menu' }).click();
	assert(
		await staticPage.locator('#mobile-navigation').isVisible(),
		'Native menu works without JS'
	);
	await staticPage.keyboard.press('Escape');
	await staticPage.keyboard.press('Shift+Tab');
	await staticPage.getByRole('link', { name: 'Skip to content' }).focus();
	await staticPage.keyboard.press('Enter');
	assert(await staticPage.locator('main').evaluate((el) => el === document.activeElement));
	const blockedStorage = await browser.newPage();
	blockedStorage.on('pageerror', (error) => errors.push(error.message));
	await blockedStorage.addInitScript(() => {
		Object.defineProperty(window, 'localStorage', {
			get() {
				throw new Error('Storage blocked');
			}
		});
	});
	await blockedStorage.goto(base);
	await blockedStorage.waitForFunction(() => document.documentElement.dataset.theme);
	await blockedStorage.getByRole('button', { name: 'Use light theme' }).first().click();
	assert.equal(await blockedStorage.locator('html').getAttribute('data-theme'), 'light');
	await blockedStorage.getByRole('button', { name: 'Use dark theme' }).first().click();
	assert.equal(await blockedStorage.locator('html').getAttribute('data-theme'), 'dark');
	assert.deepEqual(errors, []);
	console.log(
		'PASS: static backgrounds and imagery, clipped previews, focus, pointer reset, reduced motion, five widths, themes, mobile menu, navigation, no-JS content, blocked storage.'
	);
} finally {
	await browser.close();
}
