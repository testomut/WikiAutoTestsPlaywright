import { test } from '../fixtures/fixtures';

test.describe('Category Navigation', () => {
    // Test navigation to the Wikipedia article from the homepage.
    test('Navigate to Wikipedia from the homepage', async ({ mainPage }) => {
        await mainPage.navigateByTitle('Wikipedia'); // Clicks on a link that has 'Wikipedia' as the title.
        await mainPage.urlShouldInclude('/wiki/Wikipedia'); // Checks if the URL contains the correct path.
        await mainPage.assertCorrectPageTitle('Wikipedia'); // Verifies that the page title is correct.
    });

    // Test navigation to the Main Page using the Wikipedia logo.
    test('Navigate to the Home page by the logo link', async ({ mainPage }) => {
        await mainPage.clickOnLogo(); // Clicks on the Wikipedia logo.
        await mainPage.urlShouldInclude('/wiki/Main_Page'); // Checks if the URL correctly redirects to the Main Page.
        await mainPage.assertCorrectPageTitle('Main Page'); // Verifies that the title of the Main Page is correctly displayed.
    });

    // Test navigation to the View Source page of the Main Page.
    test('Navigate to View source for Main Page from the homepage', async ({ mainPage }) => {
        await mainPage.clickOnViewSource(); // Clicks the "View source" tab for the current page.
        await mainPage.urlShouldInclude('title=Main_Page&action=edit'); // Ensures the URL indicates the edit action.
        await mainPage.clickOnLogo(); // Returns to the Main Page by clicking the logo, useful for resetting the state.
    });

    // Test navigation to the Revision History page of the Main Page.
    test('Navigate to Main Page: Revision history from the homepage', async ({ mainPage }) => {
        await mainPage.clickOnViewHistory(); // Clicks the "View history" tab.
        await mainPage.urlShouldInclude('title=Main_Page&action=history'); // Checks if the URL indicates the history action.
        await mainPage.clickOnLogo(); // Returns to the Main Page by clicking the logo, useful for resetting the state.
    });
});
