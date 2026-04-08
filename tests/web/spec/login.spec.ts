import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { logger } from '../../../utils/logger';

test('User should be able to login and logout', async ({ page }) => {
  const loginPage = new LoginPage(page);

  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;

  if (!username || !password) {
    logger.error('USERNAME or PASSWORD is missing from environment variables!');
    throw new Error('USERNAME or PASSWORD is missing from environment variables!');
  }

  logger.info(`Using credentials: ${username} / ********`);

  logger.info(`Starting login test`);
  await loginPage.navigateToLogin();
  await loginPage.login(username, password);
  await loginPage.verifyLoginSuccessful();

  logger.info(`User logged in successfully. Proceeding to logout.`);
  await loginPage.logout();

  logger.info(`User logged out successfully. Test completed.`);
});