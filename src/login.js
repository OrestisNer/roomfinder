const login = async () => {
    const loginPage = await global.browser.newPage();
    await loginPage.setViewport({ width: 1366, height: 768 });
    await loginPage.goto('https://www.boligportal.dk', { waitUntil: 'networkidle2' });
    await loginPage.click('button[aria-label="Tillad alle"]');
    await loginPage.click('a[data-test-id="frontpageLogin"]');

    await loginPage.type('input[data-test-id="loginUsername"]', process.env.EMAIL);
    await loginPage.type('input[data-test-id="loginPassword"]', process.env.PASSWORD);

    await loginPage.click('button[data-test-id="loginSubmit"]');
    await loginPage.waitForTimeout(1000);
    await loginPage.close();

}


export default login;