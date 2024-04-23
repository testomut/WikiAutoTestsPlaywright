import { test } from '../fixtures/fixtures';

// Describes a test suite for testing OAuth functionality on Wikipedia.
test.describe('Oauth Functionality', () => {
    const userLogin = process.env.USERNAME_WIKI as string;;  // Load the Wikipedia username from environment variables
    const userPassword = process.env.PASSWORD_WIKI as string;; // Load the Wikipedia password from environment variables

    // Tests that a user can successfully log in with the correct credentials.
    test('Successfully logs in with correct credentials', async ({ authPage }) => {
        console.log(userLogin, userPassword);  // Output the username and password to console (useful for debugging)
        await authPage.authenticateUser({
            login: userLogin,
            password: userPassword
        });
        await authPage.verifySuccessfulLogin(userLogin);  // Verify that the login was successful
    });

    // Tests that login fails when incorrect credentials are used.
    test('Fails to log in with incorrect credentials', async ({ authPage }) => {
        await authPage.authenticateUser({
            login: 'wrongUser',
            password: 'wrongPassword'
        });
        await authPage.verifyFailedLogin();  // Verify that the login failed as expected
    });

    // Tests that login fails with a correct username but incorrect password.
    test('Fails to log in with correct username and incorrect password', async ({ authPage }) => {
        await authPage.authenticateUser({
            login: userLogin,
            password: 'wrongPassword'
        });
        await authPage.verifyFailedLogin();  // Ensure the login process fails with the wrong password
    });

    // Tests that a user can successfully log out after logging in.
    test('Successfully logs out', async ({ authPage }) => {
        await authPage.authenticateUser({
            login: userLogin,
            password: userPassword
        });
        await authPage.clickLogoutButton();  // Click the logout button
        await authPage.verifyLogout();  // Verify that the logout was successful
    });
});
