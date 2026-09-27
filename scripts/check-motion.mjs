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
	await page.waitForTimeout(1400);
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
	await card.hover({ position: { x: 60, y: 60 } });
	await page.waitForFunction(() =>
		document.querySelector('.project-card').style.getPropertyValue('--pointer-x')
	);
	await page.emulateMedia({ reducedMotion: 'reduce' });
	assert.equal(await card.evaluate((el) => el.style.getPropertyValue('--pointer-x')), '');
	await page.waitForFunction(() => document.getAnimations().length === 0);
	await page.reload();
	await page.waitForTimeout(800);
	assert.equal(await page.evaluate(() => window.motionCalls), 0);
	assert.equal(await portrait.evaluate((el) => getComputedStyle(el).transform), 'none');

	for (const width of [375, 768, 1024, 1440]) {
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
		'/lab'
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
	assert.deepEqual(errors, []);
	console.log(
		'PASS: reveals, pointer reset, live reduced motion, four widths, both themes, navigation, no-JS content.'
	);
} finally {
	await browser.close();
}
