import { test } from '@playwright/test';
import WikipediaAuthenticationPage from '../pageObjects/WikipediaAuthenticationPage';

// Describes a test suite for testing OAuth functionality on Wikipedia.
test.describe('Oauth Functionality', () => {
    let authPage;
    let context;
    let page;
    const userLogin = process.env.USERNAME_WIKI;  // Load the Wikipedia username from environment variables
    const userPassword = process.env.PASSWORD_WIKI; // Load the Wikipedia password from environment variables

    // Setup for each test: creates a new browser context and page, then navigates to the login page.
    test.beforeEach(async ({ browser }) => {
        context = await browser.newContext();  // Create a new browser context for isolation
        page = await context.newPage();  // Open a new page within the browser context
        authPage = new WikipediaAuthenticationPage(page);  // Instantiate the authentication page object
        await authPage.visitLoginPage();  // Navigate to the Wikipedia login page
    });

    // Cleanup after each test: closes the browser context to free resources.
    test.afterEach(async () => {
        await context.close();  // Close the browser context after each test
    });

    // Tests that a user can successfully log in with the correct credentials.
    test('Successfully logs in with correct credentials', async () => {
        console.log(userLogin, userPassword);  // Output the username and password to console (useful for debugging)
        await authPage.authenticateUser({
            login: userLogin,
            password: userPassword
        });
        await authPage.verifySuccessfulLogin(userLogin);  // Verify that the login was successful
    });

    // Tests that login fails when incorrect credentials are used.
    test('Fails to log in with incorrect credentials', async () => {
        await authPage.authenticateUser({
            login: 'wrongUser',
            password: 'wrongPassword'
        });
        await authPage.verifyFailedLogin();  // Verify that the login failed as expected
    });

    // Tests that login fails with a correct username but incorrect password.
    test('Fails to log in with correct username and incorrect password', async () => {
        await authPage.authenticateUser({
            login: userLogin,
            password: 'wrongPassword'
        });
        await authPage.verifyFailedLogin();  // Ensure the login process fails with the wrong password
    });

    // Tests that a user can successfully log out after logging in.
    test('Successfully logs out', async () => {
        await authPage.authenticateUser({
            login: userLogin,
            password: userPassword
        });
        await authPage.clickLogoutButton();  // Click the logout button
        await authPage.verifyLogout();  // Verify that the logout was successful
    });
});
