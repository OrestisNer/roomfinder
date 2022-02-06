const adsPerPage = process.env.ADS_PER_PAGE || 18;

export const getNextButton = async (page) => {
    const buttons = await page.$$('button.temporaryButtonClassname');

    let nextButton = null;

    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        const spanText = await button.$eval('span', (el) => el.innerText);
        if (spanText === 'Næste') {
            nextButton = button;
            break;
        }
    }

    return nextButton;
}

export const getTotalPages = async (oneRoomSearchPage) => {
    const totalAds = await getTotalAds(oneRoomSearchPage);
    return Math.ceil(totalAds / adsPerPage);
}

const getTotalAds = async (page) => {
    const totalAds = await page.$eval('div.SRP__ResultsCounter', (el) => el.innerText);
    return totalAds.split(' ')[0];
}