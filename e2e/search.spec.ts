import { test } from '@playwright/test';
import WikipediaMainPage from '../pageObjects/WikipediaMainPage';

// Describes a test suite for article search functionality on Wikipedia.
test.describe('Article Search', () => {
    let wikipediaMainPage: WikipediaMainPage;

    // Setup before each test: navigate to the Wikipedia main page.
    test.beforeEach(async ({ page }) => {
        wikipediaMainPage = new WikipediaMainPage(page);
        await wikipediaMainPage.visit();
    });

    // Test searching for an article in English and verify navigation and content.
    test('Searches for an article in English', async () => {
        await wikipediaMainPage.searchFor('Cat'); // Perform a search for "Cat".
        await wikipediaMainPage.urlShouldInclude('/wiki/Cat'); // Check if the URL includes the expected path.
        await wikipediaMainPage.firstHeadingShouldContain('Cat'); // Verify the first heading of the page contains "Cat".
    });

    // Test searching for a non-English article and expect an error message indicating non-existence.
    test('Searches for an article in a non-English language', async () => {
        await wikipediaMainPage.searchFor('Кот'); // Perform a search for "Кот" (Cat in Russian).
        await wikipediaMainPage.pageDoesNotExistMessageShouldExist(); // Verify the page shows a message indicating the page does not exist.
    });

    // Test handling of very long search queries.
    test('Handles a very long search query', async () => {
        const longQuery = 'a'.repeat(300); // Create a long string of 300 characters.
        await wikipediaMainPage.searchFor(longQuery); // Perform the search with the long string.
        await wikipediaMainPage.searchResultsShouldExist(); // Check if the search results page is displayed.
    });

    // Test searching with special characters.
    test('Searches with special characters', async () => {
        await wikipediaMainPage.searchFor('%^&*'); // Perform a search using special characters.
        await wikipediaMainPage.pageDoesNotExistMessageShouldExist(); // Expect that no valid page exists for these characters.
    });

    // Test searching using numbers and verify results.
    test('Searches using numbers', async () => {
        await wikipediaMainPage.searchFor('12345'); // Perform a search for "12345".
        await wikipediaMainPage.urlShouldInclude('/wiki/12345'); // Check if the URL is correct.
        await wikipediaMainPage.firstHeadingShouldContain('12345'); // Verify the heading contains "12345".
    });

    // Test searching using a mix of letters, numbers, and special characters.
    test('Searches using a mix of letters, numbers, and special characters', async () => {
        await wikipediaMainPage.searchFor('Cats 123!@'); // Perform a search for a mixed string.
        await wikipediaMainPage.searchResultsShouldExist(); // Verify that search results are displayed.
    });
});
