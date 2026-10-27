const { chromium } = require('playwright');
const path = require('path');

(async () => {
  console.log('Launching Playwright Chromium...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1200, height: 1300 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Wait for all 3 cards to be rendered
  await page.waitForSelector('[data-testid="stay-card"]');
  await page.waitForSelector('[data-testid="experience-card"]');
  await page.waitForSelector('[data-testid="food-card"]');

  // Small delay for animations
  await page.waitForTimeout(1000);

  const screenshotPath = path.join(__dirname, 'screenshot.png');
  await page.screenshot({ path: screenshotPath });
  console.log('✅ Screenshot captured successfully at:', screenshotPath);

  await browser.close();
  process.exit(0);
})().catch(err => {
  console.error('❌ Error capturing screenshot:', err);
  process.exit(1);
});
