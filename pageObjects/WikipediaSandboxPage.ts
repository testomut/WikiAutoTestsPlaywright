import { Page, expect } from '@playwright/test';

class WikipediaSandboxPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Navigates to the Wikipedia Sandbox page.
     */
    async visit() {
        await this.page.goto('https://en.wikipedia.org/wiki/Wikipedia:Sandbox');
    }

    /**
     * Clicks the 'Edit source' button to start editing the sandbox.
     * Waits briefly after opening the editor to handle potential dialogues.
     */
    async edit() {
        await this.page.click('#ca-edit');
        await this.page.locator(".oo-ui-messageDialog-actions .oo-ui-buttonElement-button").last().click();
        await this.page.waitForTimeout(1000); // Wait briefly to ensure the editor is ready
    }

    /**
     * Types or replaces text in the standard textarea editor.
     * @param text The text to be typed into the sandbox editor.
     */
    async typeText(text: string) {
        await this.page.waitForSelector("#wpTextbox1"); // Ensure the text box is available
        await this.page.fill('#wpTextbox1', text);
    }

    /**
     * Saves the changes made in the editor, optionally including an edit summary.
     * @param summary The summary of the edits made, if any.
     * @param saveButton Whether to click the save button after entering the summary.
     */
    async saveChanges(summary?: string, saveButton: boolean = true) {
        if (summary) {
            await this.page.type('#wpSummary', summary); // Type a summary if provided
        }
        if (saveButton) {
            await this.page.click('#wpSave'); // Click the save button if desired
        }
    }

    /**
     * Clicks the preview button to view the changes without saving them.
     */
    async previewChanges() {
        await this.page.click('#wpPreview');
    }

    /**
     * Asserts that changes were successfully saved by checking for the edit summary in the page content.
     * @param summary The summary expected to appear on the page to confirm save.
     */
    async assertChangesSaved(summary: string) {
        await expect(this.page.locator(`#mw-content-text`)).toContainText(summary);
    }

    /**
     * Cancels editing and handles the confirmation dialog if it appears.
     */
    async cancelEditing() {
        await this.page.click('#mw-editform-cancel');
        this.page.on('dialog', async (dialog) => {
            await dialog.accept(); // Automatically accept any confirmation dialogs
        });
    }

    /**
     * Asserts that no changes were saved by checking the absence of the summary text.
     * @param summary The summary text that should not be present.
     */
    async assertChangesCanceled(summary: string) {
        await expect(this.page.locator(`text=${summary}`)).not.toHaveText(summary);
    }

    /**
     * Asserts the number of remaining characters that can still be typed into the edit summary input.
     * @param expectedNumbers The expected number of remaining characters.
     */
    async assertAvailableRemainingDigits(expectedNumbers: string) {
        await this.page.waitForFunction(([selector, expected]) => {
            const element = document.querySelector(selector);
            return element?.textContent?.trim() === expected;
        }, ['#wpSummaryWidget .oo-ui-labelElement-label', expectedNumbers]);
    }
}

export default WikipediaSandboxPage;
