import { Page, expect } from '@playwright/test';
import { Core } from '../../../utils/core';
import { logger } from '../../../utils/logger';

export class LoginPage {
  private core: Core;

  constructor(private page: Page) {
    this.core = new Core(page);
  }

  /**
   * Navigates to the login page and verifies that login elements are visible.
   * Example: await loginPage.navigateToLogin();
   */
  async navigateToLogin() {
    logger.info(`Navigating to the login page`);
    await this.core.gotoURL('/');

    logger.info(`Verifying login elements are visible`);
    await this.core.verifyVisible('[class="mat-mdc-card-title"]');
    await this.core.verifyVisible('[placeholder="Email address"]');
    await this.core.verifyVisible('[placeholder="Password"]');
    await this.core.verifyVisible(
      '[class="mdc-button mat-mdc-button-base gmc-button mdc-button--unelevated mat-mdc-unelevated-button gmc-button--large mat-default mat-mdc-button-disabled"]',
    );
  }

  /**
   * Performs login with the provided username and password.
   * @param username - The username to log in.
   * @param password - The password for the account.
   * Example: await loginPage.login('standard_user', 'secret_sauce');
   */
  async login(username: string, password: string) {
    logger.info(`Logging in with username: ${username}`);
    await this.core.typeText('[placeholder="Email address"]', username);
    await this.core.typeText('[placeholder="Password"]', password);
    await this.core.click('[class="gmc-button__label"]');
  }

  /**
   * Verifies if login was successful by checking for elements present in the inventory page.
   * Example: await loginPage.verifyLoginSuccessful();
   */
  async verifyLoginSuccessful() {
    logger.info(`Verifying successful login`);
    await this.core.verifyVisible('[class="gmc-page-header__text"]');
    await this.core.verifyURL('https://dev.getmecover.co.za/dashboard');
  }

  /**
   * Performs login and verifies if login was successful.
   * @param username - The username to log in.
   * @param password - The password for the account.
   * Example: await loginPage.performLoginSuccessful('standard_user', 'secret_sauce');
   */
  async performLoginSuccessful(username: string, password: string) {
    logger.info(`Performing login and verifying success for username: ${username}`);
    await this.login(username, password);
    await this.verifyLoginSuccessful();
  }

  /**
   * clicking on log out button first click on down arrow and then verify view profile and logout button and then click on log out
   */
  async logout() {
    logger.info(`Logging out`);

    logger.info(`Verifying and clicking on the menu button`);
    const profilebar = '[class="cdk-menu-trigger profile-bar__container"]';
    await this.core.click(profilebar);
    await this.page.waitForTimeout(1000);
    await this.page.getByText('Logout', { exact: true }).click();
    /*
//     logger.info(`Verifying and clicking on the logout button`);
//     await this.core.typeText("View Profile");
//     await this.core.click("//span[contains(text(),'View Profile')]");
//     await this.core.verifyVisible("//span[contains(text(),'Logout')]");
//     await this.core.click("//span[contains(text(),'Logout')]");
//     /* Clicked on Dropdown Arrow*/
    //    const dropdownArrow = this.page.locator('[class="profile-bar__arrow"]');
    //    await dropdownArrow.scrollIntoViewIfNeeded();
    //    await dropdownArrow.click();
    //    // triggers the element to appear
    //    /* wait to load the dropdown*/

    //    /* Wa*/
    //    const viewProfile = this.page.locator('[class="profile-bar__arrow"]');
    //    const logout = this.page.locator('[class="mat-mdc-menu-item-text"]');

    // // Wait for them to become visible
    //    await viewProfile.waitFor({ state: 'visible', timeout: 1000 });
    //    await logout.waitFor({ state: 'visible', timeout: 1000 });

    // // Click logout
    // await logout.click();

    // Wait for it to exist and become visible
    //await dynamicElement.waitFor({ state: 'visible', timeout: 10000 });
    //await expect(dynamicElement).toBeVisible(); // now this will pass

    logger.info(`Verifying user is redirected to the login page`);
    await this.page.getByText('Sign in, {exact:True}');
  }
}
