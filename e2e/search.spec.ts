import { test } from '../fixtures/fixtures';

test.describe('Article Search', () => {
    // Test searching for an article in English and verify navigation and content.
    test('Searches for an article in English', async ({ mainPage }) => {
        await mainPage.searchFor('Cat'); // Perform a search for "Cat".
        await mainPage.urlShouldInclude('/wiki/Cat'); // Check if the URL includes the expected path.
        await mainPage.firstHeadingShouldContain('Cat'); // Verify the first heading of the page contains "Cat".
    });

    // Test searching for a non-English article and expect an error message indicating non-existence.
    test('Searches for an article in a non-English language', async ({ mainPage }) => {
        await mainPage.searchFor('Кот'); // Perform a search for "Кот" (Cat in Russian).
        await mainPage.pageDoesNotExistMessageShouldExist(); // Verify the page shows a message indicating the page does not exist.
    });

    // Test handling of very long search queries.
    test('Handles a very long search query', async ({ mainPage }) => {
        const longQuery = 'a'.repeat(300); // Create a long string of 300 characters.
        await mainPage.searchFor(longQuery); // Perform the search with the long string.
        await mainPage.searchResultsShouldExist(); // Check if the search results page is displayed.
    });

    // Test searching with special characters.
    test('Searches with special characters', async ({ mainPage }) => {
        await mainPage.searchFor('%^&*'); // Perform a search using special characters.
        await mainPage.pageDoesNotExistMessageShouldExist(); // Expect that no valid page exists for these characters.
    });

    // Test searching using numbers and verify results.
    test('Searches using numbers', async ({ mainPage }) => {
        await mainPage.searchFor('12345'); // Perform a search for "12345".
        await mainPage.urlShouldInclude('/wiki/12345'); // Check if the URL is correct.
        await mainPage.firstHeadingShouldContain('12345'); // Verify the heading contains "12345".
    });

    // Test searching using a mix of letters, numbers, and special characters.
    test('Searches using a mix of letters, numbers, and special characters', async ({ mainPage }) => {
        await mainPage.searchFor('Cats 123!@'); // Perform a search for a mixed string.
        await mainPage.searchResultsShouldExist(); // Verify that search results are displayed.
    });
});
