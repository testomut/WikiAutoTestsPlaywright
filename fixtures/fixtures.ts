// tests/fixtures.ts
import { test as baseTest } from '@playwright/test';
import WikipediaMainPage from '../pageObjects/WikipediaMainPage';
import WikipediaAuthenticationPage from '../pageObjects/WikipediaAuthenticationPage';
import WikipediaSandboxPage from '../pageObjects/WikipediaSandboxPage';

type TestFixtures = {
    mainPage: WikipediaMainPage;
    authPage: WikipediaAuthenticationPage;
    sandboxPage: WikipediaSandboxPage;
};

export const test = baseTest.extend<TestFixtures>({
    mainPage: async ({ page }, use) => {
        const mainPage = new WikipediaMainPage(page);
        await mainPage.visit();
        await use(mainPage);
    },
    authPage: async ({ page }, use) => {
        const authPage = new WikipediaAuthenticationPage(page);
        await authPage.visitLoginPage();
        await use(authPage);
    },
    sandboxPage: async ({ page }, use) => {
        const sandboxPage = new WikipediaSandboxPage(page);
        await sandboxPage.visit();
        await use(sandboxPage);
    }
});
