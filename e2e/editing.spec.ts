import { test } from '@playwright/test';
import WikipediaSandboxPage from '../pageObjects/WikipediaSandboxPage';

// Describe a group of tests related to editing in Wikipedia's Sandbox.
test.describe('Sandbox Editing', () => {
  let sandboxPage: WikipediaSandboxPage;
  let uniqueText = `Test ${Date.now()}`; // Generate unique text for each test run to ensure uniqueness
  let editSummary = 'Cypress test: summary text'; // Define a standard edit summary for all edits
  let textWith450Symbols = 'abqwertyui'.repeat(45); // Generate a long string of 450 characters

  // Before each test, instantiate the sandbox page object and navigate to and open the editing interface
  test.beforeEach(async ({ page }) => {
    sandboxPage = new WikipediaSandboxPage(page);
    await sandboxPage.visit(); // Navigate to the sandbox page
    await sandboxPage.edit(); // Start editing the page
  });

  // Test adding text with typical characters and verify changes
  test('Edits the sandbox by adding text with characters', async () => {
    await sandboxPage.typeText('Saved TexT'); // Type text into the sandbox editor
    await sandboxPage.saveChanges(editSummary); // Save changes with a summary
    await sandboxPage.assertChangesSaved('Saved TexT'); // Verify that the text was correctly saved
  });

  // Test the functionality of canceling an edit
  test('Cancels editing an article', async () => {
    await sandboxPage.typeText('Test Cancel'); // Type some text
    await sandboxPage.cancelEditing(); // Cancel the editing session
    // The assertion below seems incorrect because it checks for a previous text "Saved TexT" which might not be the expected behavior after cancelling.
    await sandboxPage.assertChangesSaved('Saved TexT');
  });

  // Test adding text that includes numbers and verify changes
  test('Edits the sandbox by adding text with numbers', async () => {
    await sandboxPage.typeText(`1234567890`); // Type numbers into the sandbox editor
    await sandboxPage.saveChanges(editSummary); // Save changes with a summary
    await sandboxPage.assertChangesSaved(`1234567890`); // Verify that the numbers were correctly saved
  });

  // Test adding text with special symbols and verify changes
  test('Edits the sandbox by adding text with special symbols', async () => {
    await sandboxPage.typeText(`&<>"'=`); // Type special symbols into the sandbox editor
    await sandboxPage.saveChanges(editSummary); // Save changes with a summary
    await sandboxPage.assertChangesSaved(`&<>"'=`); // Verify that the symbols were correctly saved
  });

  // Test adding text without providing a summary
  test('Edits the sandbox without summary', async () => {
    await sandboxPage.typeText(uniqueText); // Type unique text into the sandbox editor
    await sandboxPage.saveChanges(); // Save changes without a summary
    await sandboxPage.assertChangesSaved(uniqueText); // Verify that the text was correctly saved
  });

  // Test the maximum text length that can be entered in the summary field
  test('Check maximum text length for summary', async () => {
    // The saveChanges method should be verified if it handles the 'false' second parameter properly,
    // as this might be intended to prevent clicking the "Publish changes" button, which is unclear in the provided context.
    await sandboxPage.saveChanges(textWith450Symbols, false);
    
    // This test expects there to be 50 characters remaining, which implies there's a limit to how many characters can be in the summary.
    await sandboxPage.assertAvailableRemainingDigits('50');
  });
});
