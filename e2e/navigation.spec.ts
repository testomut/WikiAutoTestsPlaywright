import { test } from '@playwright/test';
import WikipediaMainPage from '../pageObjects/WikipediaMainPage';

test.describe('Category Navigation', () => {
    let wikipediaMainPage: WikipediaMainPage;

    test.beforeEach(async ({ page }) => {
        wikipediaMainPage = new WikipediaMainPage(page);
        await wikipediaMainPage.visit();
    });

    test('Navigate to Wikipedia from the homepage', async () => {
        await wikipediaMainPage.navigateByTitle('Wikipedia');
        await wikipediaMainPage.urlShouldInclude('/wiki/Wikipedia');
        await wikipediaMainPage.assertCorrectPageTitle('Wikipedia');
    });

    test('Navigate to the Home page by the logo link', async () => {
        await wikipediaMainPage.clickOnLogo();
        await wikipediaMainPage.urlShouldInclude('/wiki/Main_Page');
        await wikipediaMainPage.assertCorrectPageTitle('Main Page');
    });

    test('Navigate to View source for Main Page from the homepage', async () => {
        await wikipediaMainPage.clickOnViewSource();
        await wikipediaMainPage.urlShouldInclude('title=Main_Page&action=edit');
        await wikipediaMainPage.clickOnLogo(); // Предполагается, что это возвращает на главную страницу
    });

    test('Navigate to Main Page: Revision history from the homepage', async () => {
        await wikipediaMainPage.clickOnViewHistory();
        await wikipediaMainPage.urlShouldInclude('title=Main_Page&action=history');
        await wikipediaMainPage.clickOnLogo(); // Предполагается, что это возвращает на главную страницу
    });
});
