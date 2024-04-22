import { test } from '@playwright/test';
import WikipediaMainPage from '../pageObjects/WikipediaMainPage';

// Describe a suite of tests focused on navigation within the Wikipedia site.
test.describe('Category Navigation', () => {
    let wikipediaMainPage: WikipediaMainPage;

    // Before each test, instantiate the main page object and navigate to the Wikipedia homepage.
    test.beforeEach(async ({ page }) => {
        wikipediaMainPage = new WikipediaMainPage(page);
        await wikipediaMainPage.visit();
    });

    // Test navigation to the Wikipedia article from the homepage.
    test('Navigate to Wikipedia from the homepage', async () => {
        await wikipediaMainPage.navigateByTitle('Wikipedia'); // Clicks on a link that has 'Wikipedia' as the title.
        await wikipediaMainPage.urlShouldInclude('/wiki/Wikipedia'); // Checks if the URL contains the correct path.
        await wikipediaMainPage.assertCorrectPageTitle('Wikipedia'); // Verifies that the page title is correct.
    });

    // Test navigation to the Main Page using the Wikipedia logo.
    test('Navigate to the Home page by the logo link', async () => {
        await wikipediaMainPage.clickOnLogo(); // Clicks on the Wikipedia logo.
        await wikipediaMainPage.urlShouldInclude('/wiki/Main_Page'); // Checks if the URL correctly redirects to the Main Page.
        await wikipediaMainPage.assertCorrectPageTitle('Main Page'); // Verifies that the title of the Main Page is correctly displayed.
    });

    // Test navigation to the View Source page of the Main Page.
    test('Navigate to View source for Main Page from the homepage', async () => {
        await wikipediaMainPage.clickOnViewSource(); // Clicks the "View source" tab for the current page.
        await wikipediaMainPage.urlShouldInclude('title=Main_Page&action=edit'); // Ensures the URL indicates the edit action.
        await wikipediaMainPage.clickOnLogo(); // Returns to the Main Page by clicking the logo, useful for resetting the state.
    });

    // Test navigation to the Revision History page of the Main Page.
    test('Navigate to Main Page: Revision history from the homepage', async () => {
        await wikipediaMainPage.clickOnViewHistory(); // Clicks the "View history" tab.
        await wikipediaMainPage.urlShouldInclude('title=Main_Page&action=history'); // Checks if the URL indicates the history action.
        await wikipediaMainPage.clickOnLogo(); // Returns to the Main Page by clicking the logo, useful for resetting the state.
    });
});
