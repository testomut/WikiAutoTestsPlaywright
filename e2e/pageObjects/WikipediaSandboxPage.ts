import { Page, expect } from '@playwright/test';

class WikipediaSandboxPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Method to navigate to the Wikipedia Sandbox page
    async visit() {
        await this.page.goto('https://en.wikipedia.org/wiki/Wikipedia:Sandbox');
    }

    // Method to click the 'Edit source' button to start editing
  async edit() {
    await this.page.click('#ca-edit');
    // Дождитесь появления диалогового окна, если оно есть, и нажмите кнопку 'Start editing'
    // await this.page.waitForTimeout(1000000);
    await this.page.locator(".oo-ui-messageDialog-actions .oo-ui-buttonElement-button").last().click();
    // const element = await this.page.$(".oo-ui-window-content");
    // if (element !== null) {
    // const buttons = await this.page.$$('.oo-ui-window-content .oo-ui-buttonElement-button');
    // if (buttons.length > 0) {
    //     await buttons[buttons.length - 1].click();
    // }
    await this.page.waitForTimeout(1000)
    // }
  }


    // Method to type or replace text in the standard textarea editor
    async typeText(text: string) {
        await this.page.waitForSelector("#wpTextbox1");
        await this.page.fill('#wpTextbox1', text);
    }

    // Method to save changes with a provided edit summary
    async saveChanges(summary?: string, saveButton: boolean = true) {
        if (summary) {
            await this.page.type('#wpSummary', summary);
        }
        if (saveButton) {
            await this.page.click('#wpSave');
        }
    }

    // Method to preview changes without saving them
    async previewChanges() {
        await this.page.click('#wpPreview');
    }

    // Method to assert that changes were saved successfully by checking for the edit summary
    async assertChangesSaved(summary: string) {
        await expect(this.page.locator(`#mw-content-text`)).toContainText(summary);
    }

    // Method to cancel editing and assert no changes were saved
    async cancelEditing() {
        await this.page.click('#mw-editform-cancel');
        // Playwright can handle confirmation dialogs natively
        this.page.on('dialog', async (dialog) => {
            await dialog.accept();
        });
    }

    // Method to assert that no changes were saved
    async assertChangesCanceled(summary: string) {
        await expect(this.page.locator(`text=${summary}`)).not.toHaveText(summary);
    }

    // Method that checks the number of remaining available characters
    async assertAvailableRemainingDigits(expectedNumbers: string) {
      await this.page.waitForFunction(([selector, expected]) => {
        const element = document.querySelector(selector);
        return element?.textContent?.trim() === expected;
      }, ['#wpSummaryWidget .oo-ui-labelElement-label', expectedNumbers]);
    }
    
}

export default WikipediaSandboxPage;
