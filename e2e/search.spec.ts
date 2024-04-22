import { test } from '@playwright/test';
import WikipediaMainPage from '../pageObjects/WikipediaMainPage';

test.describe('Article Search', () => {
    let wikipediaMainPage: WikipediaMainPage;

    test.beforeEach(async ({ page }) => {
        wikipediaMainPage = new WikipediaMainPage(page);
        await wikipediaMainPage.visit();
    });

    test('Searches for an article in English', async () => {
        await wikipediaMainPage.searchFor('Cat');
        await wikipediaMainPage.urlShouldInclude('/wiki/Cat');
        await wikipediaMainPage.firstHeadingShouldContain('Cat');
    });

    test('Searches for an article in a non-English language', async () => {
        await wikipediaMainPage.searchFor('Кот');
        await wikipediaMainPage.pageDoesNotExistMessageShouldExist();
    });

    test('Handles a very long search query', async () => {
        const longQuery = 'a'.repeat(300);
        await wikipediaMainPage.searchFor(longQuery);
        await wikipediaMainPage.searchResultsShouldExist();
    });

    test('Searches with special characters', async () => {
        await wikipediaMainPage.searchFor('%^&*');
        await wikipediaMainPage.pageDoesNotExistMessageShouldExist();
    });

    test('Searches using numbers', async () => {
        await wikipediaMainPage.searchFor('12345');
        await wikipediaMainPage.urlShouldInclude('/wiki/12345');
        await wikipediaMainPage.firstHeadingShouldContain('12345');
    });

    test('Searches using a mix of letters, numbers, and special characters', async () => {
        await wikipediaMainPage.searchFor('Cats 123!@');
        await wikipediaMainPage.searchResultsShouldExist();
    });
});
