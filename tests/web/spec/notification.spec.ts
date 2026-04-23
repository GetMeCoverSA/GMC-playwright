import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { NotificationPage } from '../pages/notification.page';
import { logger } from '../../../utils/logger';

test('user should be able to see the notification as per the filter options', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const notificationPage = new NotificationPage(page);

  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;

  if (!username || !password) {
    logger.error('USERNAME or PASSWORD is missing!');
    throw new Error('USERNAME or PASSWORD is missing!');
  }

  logger.info(`Using credentials: ${username} / ********`);

  // Step 1: Login
  logger.info('Starting login process');
  await loginPage.navigateToLogin();
  await loginPage.performLoginSuccessful(username, password);
  logger.info('User logged in successfully');

  // Step 2: Navigate to Notifications
  logger.info('Opening Notifications page');
  await notificationPage.clickNotificationMenu();
  await notificationPage.verifyNotificationPageVisible();

  // Step 3: Apply Filters
  // logger.info('Applying filters for All dropdown options');
  // await notificationPage.clickAllOptionsDropdown();

  //step4: Appy filter for newest to first drop options
  // logger.info('Applying filters for visibility new first/ old first');
  // await notificationPage.clickdefaultDropdown();

  //step5: Apply filter on date range and check all notifications
  // logger.info('Applying filters for visibility new first/ old first');
  // await notificationPage.clickDaterangeDropdown();
  //step6: Apply search on the search bar and see the results
  //1. Enter the the text on serach bar
  await notificationPage.clickSearchbar();
});
