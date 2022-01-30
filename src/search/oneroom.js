import { viewPort } from '../browser.js';
import { getAllPageAdLinks, sendMessage, contactLandlord } from '../ads.js';

const oneRoomSearch = async () => {
    const oneRoomSearchPage = await global.browser.newPage();
    await oneRoomSearchPage.setViewport(viewPort);

    await oneRoomSearchPage.goto(
        'https://www.boligportal.dk/lejeboliger/k%C3%B8benhavn/',
        { waitUntil: 'networkidle2' }
    );

    await setFilters(oneRoomSearchPage);

    // wait to populate data
    await oneRoomSearchPage.waitForTimeout(1000);

    const adLinks = await getAllPageAdLinks(oneRoomSearchPage);
    await oneRoomSearchPage.close();

    for (let i = 0; i < adLinks.length; i++) {
        const adLink = adLinks[i];
        await contactLandlord(adLink);
    }
}

const setFilters = async (oneRoomSearchPage) => {
    await oneRoomSearchPage.click('div[label="Boligtype"] input#rental_room');
    await oneRoomSearchPage.type('div[label="Husleje"] input[type="text"]', '8000');
    await oneRoomSearchPage.type('div[label="Størrelse"] input[type="text"]', '10');
    await oneRoomSearchPage.select('div[label="Værelser"] select', '1');

    const roomNumberSelect = await oneRoomSearchPage.$$('div[label="Værelser"] select');
    roomNumberSelect.map(select => select.select('1'));

    await oneRoomSearchPage.type('div[label="Overtagelsesdato"] input[type="date"]', '05/01/2022');
}


export default oneRoomSearch;