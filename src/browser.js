import puppeteer from 'puppeteer';

export const initBrowser = async () => {
    global.browser = await puppeteer.launch({
        headless: false,
        args: [
            '--start-maximized'
        ]
    });
};

export const closeBrowser = async () => {
    await global.browser.close();
}

export const viewPort = {
    width: 1366,
    height: 768
}