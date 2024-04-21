import { Page, expect } from '@playwright/test';

class WikipediaAuthenticationPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Navigate to the login page
    async visitLoginPage(): Promise<void> {
        await this.page.goto('https://en.wikipedia.org/wiki/Main_Page');
        await this.page.context().clearCookies();
        await this.page.goto('https://en.wikipedia.org/w/index.php?title=Special:UserLogin&returnto=Main+Page');
    }

    // Authenticate a user with login and password
    async authenticateUser(credentials: {login: string, password: string}): Promise<void> {
        
        await this.page.fill('#wpName1', credentials.login);
        await this.page.fill('#wpPassword1', credentials.password);
        await this.page.click('#wpLoginAttempt');
    }

    // Click the logout button
    async clickLogoutButton(): Promise<void> {
        await this.page.click('#vector-user-links-dropdown-checkbox');
        await this.page.click('#pt-logout');
    }

    // Verify successful login by checking for a user-specific element
    async verifySuccessfulLogin(username: string): Promise<void> {
        await expect(this.page.locator(`#pt-userpage-2`)).toHaveText(username);
    }

    // Verify login failure by checking for an error message
    async verifyFailedLogin(): Promise<void> {
        await this.page.waitForSelector('text=Incorrect username or password entered.');
    }

    // Verify successful logout by checking for the login page
    async verifyLogout(): Promise<void> {
        await expect(this.page).toHaveURL(/title=Special:UserLogout/);
        await expect(this.page.locator('#firstHeading')).toHaveText('Log out');
    }

    // Verify the presence of the user profile link
    async verifyUserProfileLink(): Promise<void> {
        await expect(this.page.locator('#userProfileLink')).toHaveCount(1);
    }
}

export default WikipediaAuthenticationPage;
