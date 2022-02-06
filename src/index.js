import { initBrowser, closeBrowser } from './browser.js';
import login from './login.js';
import { search } from './ads.js';
import dotenv from "dotenv"
import fs from 'fs';

dotenv.config()

const setSearchdata = async () => {
    let searchData = await fs.readFileSync('./src/data/search.json');
    searchData = JSON.parse(searchData);
    global.searchData = searchData;
}

const start = async () => {
    await setSearchdata();
    await initBrowser();
    await login();
    await search();
    await closeBrowser();
};

start();