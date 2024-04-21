import { Page, expect } from '@playwright/test';

class WikipediaMainPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async visit() {
        await this.page.goto('https://en.wikipedia.org/wiki/Main_Page');
    }

    async searchFor(term: string) {
        await this.page.fill('#searchInput', term);
        await this.page.click('.cdx-search-input .cdx-button');
    }

    async urlShouldInclude(path: string) {
        await expect(this.page).toHaveURL(new RegExp(`.*${path}.*`));
    }

    async firstHeadingShouldContain(text: string) {
        await expect(this.page.locator('h1')).toContainText(text);
    }

    async searchResultsShouldExist() {
        await expect(this.page.locator('.searchresults')).toBeVisible();
    }

    async pageDoesNotExistMessageShouldExist() {
        // await this.page.waitForTimeout(100000)
        const messageLocator = this.page.locator('#mw-content-text');
        await expect(messageLocator).toContainText('does not exist');
    }

    async navigateByTitle(title: string) {
        await this.page.click(`a[title="${title}"]`);
    }

    async assertCorrectPageTitle(title: string) {
        await expect(this.page.locator('.mw-page-title-main')).toHaveText(title);
    }

    async clickOnLogo() {
        await this.page.click('.mw-logo-container');
    }

    async clickOnViewSource() {
        await this.page.click('#ca-viewsource');
    }

    async clickOnViewHistory() {
        await this.page.click('#ca-history');
    }

    async switchLanguage(languageCode: string, selectLanguage: boolean = true) {
        if ((await this.page.$$('#p-lang-btn-checkbox')).length !== 0) {
            await this.page.click('#p-lang-btn-checkbox');
            if ((await this.page.$$('.grid.uls-wide')).length !== 0) {
                await this.page.click('#p-lang-btn-checkbox');
            }
            await this.page.fill('[data-clear="uls-languagefilter-clear"]', languageCode, {force:true});
        }
        
        if (selectLanguage) {
            const languageElements = await this.page.$$(`[lang="${languageCode}"]`);
            if (languageElements.length > 0) {
                if (languageCode !== 'de') {
                    await languageElements[0].click();
                } else {
                    // Проверка наличия второго элемента для языка 'de'
                    if (languageElements.length > 1) {
                        await languageElements[1].click();
                    } else {
                        console.error("Второй элемент языка 'de' не найден");
                    }
                }
            } else {
                console.error("Элементы выбранного языка не найдены");
            }
        }
    
    }

    async verifyArticleDoesNotExist() {
        const messageLocator = this.page.locator('text="This page is not available in the language you searched for."');
        await expect(messageLocator).toHaveText('This page is not available in the language you searched for.');
    }
}

export default WikipediaMainPage;
