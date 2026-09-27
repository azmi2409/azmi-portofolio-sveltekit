import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';

const { chromium } = await import(pathToFileURL(process.argv[2]).href);
const browser = await chromium.launch();
try {
	const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, hasTouch: true });
	await page.goto(process.argv[3] ?? 'http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
	const tabs = page.locator('.domino-tab');
	const panels = page.locator('.domino-deck .project-panel:visible');
	const clipper = tabs.filter({ hasText: 'AIClipper.video' });
	await clipper.hover();
	await page.waitForFunction(() => [...document.querySelectorAll('.domino-tab')].some(el => el.textContent.includes('AIClipper.video') && el.getAttribute('aria-expanded') === 'true'));
	assert.equal(await panels.count(), 1);
	assert.match(await panels.textContent(), /AIClipper/);
	await page.setViewportSize({ width: 390, height: 844 });
	await tabs.filter({ hasText: 'AotAvatar' }).tap();
	await page.waitForFunction(() => [...document.querySelectorAll('.domino-tab')].some(el => el.textContent.includes('AotAvatar') && el.getAttribute('aria-expanded') === 'true'));
	assert.match(await panels.textContent(), /AotAvatar/);
	await tabs.nth(1).focus();
	await page.waitForFunction(() => document.querySelectorAll('.domino-tab')[1].getAttribute('aria-expanded') === 'true');
	assert.equal(await panels.count(), 1);
	assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
	await page.emulateMedia({ reducedMotion: 'reduce' });
	assert.equal(await page.locator('.domino-deck .project-card').first().evaluate(el => getComputedStyle(el).transitionDuration), '0s');
	console.log('Project deck: hover, touch, keyboard, overflow, reduced motion passed.');
} finally {
	await browser.close();
}
