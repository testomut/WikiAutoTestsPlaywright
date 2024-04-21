import { test } from '@playwright/test';
import WikipediaSandboxPage from './pageObjects/WikipediaSandboxPage';

test.describe('Sandbox Editing', () => {
  let sandboxPage: WikipediaSandboxPage;
  let uniqueText = `Test ${Date.now()}`; // Generate unique text for each test run
  let editSummary = 'Cypress test: summary text';
  let textWith450Symbols = 'abqwertyui'.repeat(45);

  test.beforeEach(async ({ page }) => {
    sandboxPage = new WikipediaSandboxPage(page);
    await sandboxPage.visit();
    await sandboxPage.edit();
  });

  test('Edits the sandbox by adding text with characters', async () => {
    await sandboxPage.typeText('Saved TexT');
    await sandboxPage.saveChanges(editSummary);
    await sandboxPage.assertChangesSaved('Saved TexT');
  });

  test('Cancels editing an article', async () => {
    await sandboxPage.typeText('Test Cancel');
    await sandboxPage.cancelEditing();
    await sandboxPage.assertChangesSaved('Saved TexT');
  });

  test('Edits the sandbox by adding text with numbers', async () => {
    await sandboxPage.typeText(`1234567890`);
    await sandboxPage.saveChanges(editSummary);
    await sandboxPage.assertChangesSaved(`1234567890`);
  });

  test('Edits the sandbox by adding text with special symbols', async () => {
    await sandboxPage.typeText(`&<>"'=`); 
    await sandboxPage.saveChanges(editSummary);
    await sandboxPage.assertChangesSaved(`&<>"'=`); 
  });

  test('Edits the sandbox without summary', async () => {
    await sandboxPage.typeText(uniqueText);
    await sandboxPage.saveChanges();
    await sandboxPage.assertChangesSaved(uniqueText);
  });

  test('Check maximum text length for summary', async () => {
    // We don't want to push to "Publish changes" button, that's why we type false in the second argument
    await sandboxPage.saveChanges(textWith450Symbols, false);
    
    await sandboxPage.assertAvailableRemainingDigits('50');
  });
});
