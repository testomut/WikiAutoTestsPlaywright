import { test } from '../fixtures/fixtures';

test.describe('Change Language Functionality', () => {
    test('Switch to a language with a full version of the article', async ({ mainPage }) => {
        // Switching to Spanish
        await mainPage.switchLanguage('es');
        await mainPage.urlShouldInclude('es');
    });

    test('Switch to a language where the article does not exist', async ({ mainPage }) => {
        // Switching to Welsh, expecting no article
        await mainPage.switchLanguage('cy', false);
        await mainPage.verifyArticleDoesNotExist();
    });

    test('Verify articles availability in most popular languages', async ({ mainPage }) => {
        // Checking multiple languages starting with English
        await mainPage.switchLanguage('en');
        await mainPage.urlShouldInclude('en');
    
        // Checking German
        await mainPage.switchLanguage('de');
        await mainPage.urlShouldInclude('de');
    
        // Checking French
        await mainPage.switchLanguage('fr');
        await mainPage.urlShouldInclude('fr');
    });

    test('Switch to a language and switch back to check if the original context is preserved', async ({ mainPage }) => {
        // Switching to English, then to French, and back to English
        await mainPage.switchLanguage('en');
        await mainPage.urlShouldInclude('en');

        await mainPage.switchLanguage('fr');
        await mainPage.urlShouldInclude('fr');

        await mainPage.switchLanguage('en');
        await mainPage.urlShouldInclude('en');
    });
});
