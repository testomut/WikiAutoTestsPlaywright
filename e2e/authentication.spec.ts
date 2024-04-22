import { test } from '@playwright/test';
import WikipediaAuthenticationPage from '../pageObjects/WikipediaAuthenticationPage';

test.describe('Oauth Functionality', () => {
    let authPage;
    let context;
    let page;
    const userLogin = process.env.USERNAME_WIKI; // Используйте переменные окружения Playwright
    const userPassword = process.env.PASSWORD_WIKI;

    test.beforeEach(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        authPage = new WikipediaAuthenticationPage(page);
        await authPage.visitLoginPage();
    });

    test.afterEach(async () => {
        await context.close();
    });

    test('Successfully logs in with correct credentials', async () => {
        console.log(userLogin,userPassword);
        await authPage.authenticateUser({
            login: userLogin,
            password: userPassword
        });
        await authPage.verifySuccessfulLogin(userLogin);
    });

    test('Fails to log in with incorrect credentials', async () => {
        await authPage.authenticateUser({
            login: 'wrongUser',
            password: 'wrongPassword'
        });
        await authPage.verifyFailedLogin();
    });

    test('Fails to log in with correct username and incorrect password', async () => {
        await authPage.authenticateUser({
            login: userLogin,
            password: 'wrongPassword'
        });
        await authPage.verifyFailedLogin();
    });

    test('Successfully logs out', async () => {
        await authPage.authenticateUser({
            login: userLogin,
            password: userPassword
        });
        await authPage.clickLogoutButton();
        await authPage.verifyLogout();
    });
});
