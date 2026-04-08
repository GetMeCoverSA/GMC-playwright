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
    await this.core.verifyVisible('[data-test="username"]');
    await this.core.verifyVisible('[data-test="password"]');
    await this.core.verifyVisible('[data-test="login-button"]');
  }

  /**
   * Performs login with the provided username and password.
   * @param username - The username to log in.
   * @param password - The password for the account.
   * Example: await loginPage.login('standard_user', 'secret_sauce');
   */
  async login(username: string, password: string) {
    logger.info(`Logging in with username: ${username}`);
    await this.core.typeText('[data-test="username"]', username);
    await this.core.typeText('[data-test="password"]', password);
    await this.core.click('[data-test="login-button"]');
  }

  /**
   * Verifies if login was successful by checking for elements present in the inventory page.
   * Example: await loginPage.verifyLoginSuccessful();
   */
  async verifyLoginSuccessful() {
    logger.info(`Verifying successful login`);
    await this.core.verifyVisible('[data-test="shopping-cart-link"]');
    await this.core.verifyVisible('[data-test="title"]');
    await this.core.verifyVisible('[data-test="inventory-container"]');
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
   * Logs out the user from the application.
   * Example: await loginPage.logout();
   */
  async logout() {
    logger.info(`Logging out`);

    logger.info(`Verifying and clicking on the menu button`);
    await this.core.verifyVisible('#react-burger-menu-btn');
    await this.core.click('#react-burger-menu-btn');

    logger.info(`Verifying and clicking on the logout button`);
    await this.core.verifyVisible('[data-test="logout-sidebar-link"]');
    await this.core.click('[data-test="logout-sidebar-link"]');

    logger.info(`Verifying user is redirected to the login page`);
    await this.core.verifyVisible('[data-test="login-button"]');
  }
}
