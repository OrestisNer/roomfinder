import { initBrowser, closeBrowser } from './browser.js';
import login from './login.js';
import oneRoomSearch from './search/oneroom.js';
import dotenv from "dotenv"

dotenv.config()

const start = async () => {
    await initBrowser();
    await login();
    await oneRoomSearch();
    await closeBrowser();
};

start();