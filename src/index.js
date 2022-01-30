const puppeteer = require('puppeteer');

const start = async () => {

    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 250,
        args: [
            '--start-maximized'
        ]
    });
    const page = await browser.newPage();

    await page.setViewport({ width: 1366, height: 768 });
    await page.goto('https://www.boligportal.dk', { waitUntil: 'networkidle2' });
    await page.click('button[aria-label="Tillad alle"]');
    await page.click('a[data-test-id="frontpageLogin"]');
    await page.screenshot({ path: 'boligportal.png' });
    await browser.close();
};

start();