import { test } from '../fixtures/fixtures';

test.describe('Sandbox Editing', () => {
  let uniqueText = `Test ${Date.now()}`; // Generate unique text for each test run to ensure uniqueness
  let editSummary = 'Cypress test: summary text'; // Define a standard edit summary for all edits
  let textWith450Symbols = 'abqwertyui'.repeat(45); // Generate a long string of 450 characters

  // Test adding text with typical characters and verify changes
  test('Edits the sandbox by adding text with characters', async ({ sandboxPage }) => {
    await sandboxPage.typeText('Saved TexT'); // Type text into the sandbox editor
    await sandboxPage.saveChanges(editSummary); // Save changes with a summary
    await sandboxPage.assertChangesSaved('Saved TexT'); // Verify that the text was correctly saved
  });

  // Test the functionality of canceling an edit
  test('Cancels editing an article', async ({ sandboxPage }) => {
    await sandboxPage.typeText('Test Cancel'); // Type some text
    await sandboxPage.cancelEditing(); // Cancel the editing session
    await sandboxPage.assertChangesCanceled('Test Cancel'); // Verify that changes were not saved
  });

  // Test adding text that includes numbers and verify changes
  test('Edits the sandbox by adding text with numbers', async ({ sandboxPage }) => {
    await sandboxPage.typeText(`1234567890`); // Type numbers into the sandbox editor
    await sandboxPage.saveChanges(editSummary); // Save changes with a summary
    await sandboxPage.assertChangesSaved(`1234567890`); // Verify that the numbers were correctly saved
  });

  // Test adding text with special symbols and verify changes
  test('Edits the sandbox by adding text with special symbols', async ({ sandboxPage }) => {
    await sandboxPage.typeText(`&<>"'=`); // Type special symbols into the sandbox editor
    await sandboxPage.saveChanges(editSummary); // Save changes with a summary
    await sandboxPage.assertChangesSaved(`&<>"'=`); // Verify that the symbols were correctly saved
  });

  // Test adding text without providing a summary
  test('Edits the sandbox without summary', async ({ sandboxPage }) => {
    await sandboxPage.typeText(uniqueText); // Type unique text into the sandbox editor
    await sandboxPage.saveChanges(); // Save changes without a summary
    await sandboxPage.assertChangesSaved(uniqueText); // Verify that the text was correctly saved
  });

  // Test the maximum text length that can be entered in the summary field
  test('Check maximum text length for summary', async ({ sandboxPage }) => {
    await sandboxPage.saveChanges(textWith450Symbols, false); // Save changes with a lengthy text, not pressing the "Publish changes" button
    await sandboxPage.assertAvailableRemainingDigits('50'); // Check the number of remaining characters
  });
});
