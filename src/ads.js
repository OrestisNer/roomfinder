import { getNextButton, getTotalPages } from './paging.js';
import { viewPort } from './browser.js';

const setSearchFilters = async (page, filters) => {
    // type of room. Available options rental_room, rental_apartment, rental_house and rental_townhouse
    await page.click(`div[label="Boligtype"] input#${filters.type}`);

    // Max price
    await page.type('div[label="Husleje"] input[type="text"]', filters.max_price);

    // Min square metes
    await page.type('div[label="Størrelse"] input[type="text"]', filters.min_m2);

    // Min and max number of rooms
    const roomNumberSelect = await page.$$('div[label="Værelser"] select');

    // min
    roomNumberSelect[0].select(filters.min_no_rooms);
    // max
    roomNumberSelect[1].select(filters.max_no_rooms);

    // Takeover date
    await page.type('div[label="Overtagelsesdato"] input[type="date"]', filters.takeover_date);
}


export const search = async () => {
    const searchData = global.searchData;

    for (const data of searchData) {
        const searchPage = await global.browser.newPage();
        await searchPage.setViewport(viewPort);

        await searchPage.goto(
            'https://www.boligportal.dk/lejeboliger/k%C3%B8benhavn/',
            { waitUntil: 'networkidle2' }
        );

        await setSearchFilters(searchPage, data.filters);

        // wait to populate data
        await searchPage.waitForTimeout(1000);

        const adLinks = await getAllPageAdLinks(searchPage);
        await searchPage.close();

        for (let i = 0; i < adLinks.length; i++) {
            const adLink = adLinks[i];
            await contactLandlord(adLink, data.message);
        }
    }
}


export const getAllPageAdLinks = async (page) => {
    let adsLinks = [];

    const totalPages = await getTotalPages(page);
    const nextButton = await getNextButton(page);
    for (let i = 0; i < totalPages; i++) {
        const currentPageAdLinks = await getHrefs(page, '#app > div > div:first-child a.AdCardSrp__Link');
        adsLinks.push(...currentPageAdLinks);

        if (i != totalPages - 1) {
            await nextButton.click();
            await page.waitForTimeout(1000);
        }
    }

    return [...new Set(adsLinks)];
}


export const contactLandlord = async (adUrl, message = process.env.DEFAULT_CONTACT_MESSAGE) => {
    const adPage = await global.browser.newPage();
    await adPage.setViewport(viewPort);

    await adPage.goto(
        adUrl,
        { waitUntil: 'networkidle2' }
    );

    await adPage.click('button[data-test-id="contactCTAButton"]');

    try {
        await adPage.waitForSelector('#modal-root textarea', {
            timeout: 2000
        });
        await adPage.type('#modal-root textarea', message);
    } catch (err) { }

    await adPage.waitForTimeout(3000);
    await adPage.close();
}

const getHrefs = async (page, selector) => {
    return await page.$$eval(selector, anchors => [].map.call(anchors, a => a.href));
}