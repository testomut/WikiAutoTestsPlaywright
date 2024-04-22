import { Page, expect } from '@playwright/test';

class WikipediaAuthenticationPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Navigate to the login page.
     * Clears cookies and navigates to Wikipedia's login page via a direct URL.
     */
    async visitLoginPage(): Promise<void> {
        await this.page.goto('https://en.wikipedia.org/wiki/Main_Page');
        await this.page.context().clearCookies();  // Clear cookies to ensure no previous session exists
        await this.page.goto('https://en.wikipedia.org/w/index.php?title=Special:UserLogin&returnto=Main+Page');
    }

    /**
     * Authenticate a user with login and password.
     * Fills in the username and password fields and submits the login form.
     * @param credentials An object containing 'login' and 'password' strings.
     */
    async authenticateUser(credentials: { login: string, password: string }): Promise<void> {
        await this.page.fill('#wpName1', credentials.login);
        await this.page.fill('#wpPassword1', credentials.password);
        await this.page.click('#wpLoginAttempt');
    }

    /**
     * Click the logout button.
     * Opens the user dropdown and clicks the logout link.
     */
    async clickLogoutButton(): Promise<void> {
        await this.page.click('#vector-user-links-dropdown-checkbox');  // Open the user dropdown menu
        await this.page.click('#pt-logout');  // Click the logout option
    }

    /**
     * Verify successful login by checking for a user-specific element.
     * Asserts that the username displayed on the page matches the expected username.
     * @param username The username to verify.
     */
    async verifySuccessfulLogin(username: string): Promise<void> {
        await expect(this.page.locator('#pt-userpage-2')).toHaveText(username);
    }

    /**
     * Verify login failure by checking for an error message.
     * Waits for and verifies the presence of the login error message.
     */
    async verifyFailedLogin(): Promise<void> {
        await this.page.waitForSelector('text=Incorrect username or password entered.');
    }

    /**
     * Verify successful logout by checking for the login page.
     * Asserts that the URL and page content confirm a successful logout.
     */
    async verifyLogout(): Promise<void> {
        await expect(this.page).toHaveURL(/title=Special:UserLogout/);
        await expect(this.page.locator('#firstHeading')).toHaveText('Log out');
    }

    /**
     * Verify the presence of the user profile link.
     * Ensures that the user profile link is present, indicating a logged-in state.
     */
    async verifyUserProfileLink(): Promise<void> {
        await expect(this.page.locator('#userProfileLink')).toHaveCount(1);
    }
}

export default WikipediaAuthenticationPage;
