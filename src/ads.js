import { getNextButton, getTotalPages } from './paging.js';

export const adsPerPage = process.env.ADS_PER_PAGE || 18;


export const getAllPageAdLinks = async (page) => {
    let adsLinks = [];

    const totalPages = await getTotalPages(page);
    const nextButton = await getNextButton(page);
    for (let i = 0; i < totalPages; i++) {
        const currentPageAdLinks = await getHrefs(page, '#app > div > div:first-child a.AdCardSrp__Link');
        adsLinks.push(...currentPageAdLinks);
        await nextButton.click();
        await page.waitForTimeout(1000);
    }

    return [...new Set(adsLinks)];
}


export const contactLandlord = async (adUrl) => {

}

const getHrefs = async (page, selector) => {
    return await page.$$eval(selector, anchors => [].map.call(anchors, a => a.href));
}