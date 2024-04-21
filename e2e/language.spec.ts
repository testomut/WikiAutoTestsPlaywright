import { test } from '@playwright/test';
import WikipediaMainPage from './pageObjects/WikipediaMainPage';

test.describe('Change Language Functionality', () => {
    let wikipediaMainPage: WikipediaMainPage;

    test.beforeEach(async ({ page }) => {
        wikipediaMainPage = new WikipediaMainPage(page);
        await wikipediaMainPage.visit();
    });

    test('Switch to a language with a full version of the article', async () => {
        // Spanish
        await wikipediaMainPage.switchLanguage('es');
        await wikipediaMainPage.urlShouldInclude('es');
    });

    test('Switch to a language where the article does not exist', async () => {
        // Welsh
        await wikipediaMainPage.switchLanguage('cy', false);
        await wikipediaMainPage.verifyArticleDoesNotExist();
    });

    test('Verify articles availability in most popular languages', async () => {
        // English
        await wikipediaMainPage.switchLanguage('en');
        await wikipediaMainPage.urlShouldInclude('en');
    
        // German
        await wikipediaMainPage.switchLanguage('de');
        await wikipediaMainPage.urlShouldInclude('de');
    
        // French
        await wikipediaMainPage.switchLanguage('fr');
        await wikipediaMainPage.urlShouldInclude('fr');
    });

    test('Switch to a language and switch back to check if the original context is preserved', async () => {
        // English
        await wikipediaMainPage.switchLanguage('en');
        await wikipediaMainPage.urlShouldInclude('en');

        // French
        await wikipediaMainPage.switchLanguage('fr');
        await wikipediaMainPage.urlShouldInclude('fr');

        // Returns to English
        await wikipediaMainPage.switchLanguage('en');
        await wikipediaMainPage.urlShouldInclude('en');
    });
});
