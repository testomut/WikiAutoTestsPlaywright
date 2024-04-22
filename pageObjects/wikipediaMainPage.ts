import { Page, expect } from '@playwright/test';

class WikipediaMainPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Navigates to the Wikipedia main page.
     */
    async visit() {
        await this.page.goto('https://en.wikipedia.org/wiki/Main_Page');
    }

    /**
     * Performs a search on the main page using the provided search term.
     * @param term The search term to enter in the search box.
     */
    async searchFor(term: string) {
        await this.page.fill('#searchInput', term);
        await this.page.click('.cdx-search-input .cdx-button');
    }

    /**
     * Verifies that the URL contains the specified path.
     * @param path The path that should be included in the URL.
     */
    async urlShouldInclude(path: string) {
        await expect(this.page).toHaveURL(new RegExp(`.*${path}.*`));
    }

    /**
     * Checks that the first heading on the page contains the specified text.
     * @param text The text expected within the first heading.
     */
    async firstHeadingShouldContain(text: string) {
        await expect(this.page.locator('h1')).toContainText(text);
    }

    /**
     * Ensures that search results are visible on the page.
     */
    async searchResultsShouldExist() {
        await expect(this.page.locator('.searchresults')).toBeVisible();
    }

    /**
     * Verifies that a message indicating the page does not exist is present.
     */
    async pageDoesNotExistMessageShouldExist() {
        const messageLocator = this.page.locator('#mw-content-text');
        await expect(messageLocator).toContainText('does not exist');
    }

    /**
     * Navigates to a different page by clicking a link with the specified title.
     * @param title The title attribute of the link to click.
     */
    async navigateByTitle(title: string) {
        await this.page.click(`a[title="${title}"]`);
    }

    /**
     * Asserts that the page title is correct as specified.
     * @param title The expected title of the page.
     */
    async assertCorrectPageTitle(title: string) {
        await expect(this.page.locator('.mw-page-title-main')).toHaveText(title);
    }

    /**
     * Clicks on the Wikipedia logo to return to the main page.
     */
    async clickOnLogo() {
        await this.page.click('.mw-logo-container');
    }

    /**
     * Clicks on the "View source" tab of the current page.
     */
    async clickOnViewSource() {
        await this.page.click('#ca-viewsource');
    }

    /**
     * Clicks on the "View history" tab of the current page.
     */
    async clickOnViewHistory() {
        await this.page.click('#ca-history');
    }

    /**
     * Attempts to switch the language of the page. If the language switcher is available and a specific language is selectable, it will attempt to select it.
     * @param languageCode The ISO language code to switch to.
     * @param selectLanguage If true, tries to select the language after opening the language switcher.
     */
    async switchLanguage(languageCode: string, selectLanguage: boolean = true) {
        if ((await this.page.$$('#p-lang-btn-checkbox')).length !== 0) {
            await this.page.click('#p-lang-btn-checkbox');
            if ((await this.page.$$('.grid.uls-wide')).length !== 0) {
                await this.page.click('#p-lang-btn-checkbox');
            }
            await this.page.fill('[data-clear="uls-languagefilter-clear"]', languageCode, {force: true});
        }
        
        if (selectLanguage) {
            const languageElements = await this.page.$$(`[lang="${languageCode}"]`);
            if (languageElements.length > 0) {
                if (languageCode !== 'de') {
                    await languageElements[0].click();
                } else {
                    if (languageElements.length > 1) {
                        await languageElements[1].click();
                    } else {
                        console.error("The second element for the 'de' language was not found.");
                    }
                }
            } else {
                console.error("Elements for the selected language were not found.");
            }
        }
    }

    /**
     * Verifies that an article does not exist in the selected language by checking for a specific message.
     */
    async verifyArticleDoesNotExist() {
        const messageLocator = this.page.locator('text="This page is not available in the language you searched for."');
        await expect(messageLocator).toHaveText('This page is not available in the language you searched for.');
    }
}

export default WikipediaMainPage;
