import { Locator, Page } from '@playwright/test';
import { Core } from '../../../utils/core';
import { logger } from '../../../utils/logger';
import { exceptions } from 'winston';

export class NotificationPage {
  private core: Core;

  constructor(private page: Page) {
    this.core = new Core(page);
  }

  // Click notification menu
  async clickNotificationMenu() {
    const notificationMenu = '[class="main-sidenav__notification-indicator"]';

    logger.info('Clicking on Notification menu');
    await this.core.verifyVisible(notificationMenu);
    await this.core.click(notificationMenu), { timeout: 50000 };
  }

  // Verify notification page loaded
  async verifyNotificationPageVisible() {
    const header = '[class="gmc-page-header__text--title"]';

    logger.info('Verifying Notification page');
    await this.core.verifyVisible(header);
    console.log('Notification page is visible');
  }

  // Handle dropdown filters first click on all,brokerage,client,clientcase,syst
  //for each option cature read unread and archived
  async clickAllOptionsDropdown() {
    const all_dropdown = '[placeholder="Select category"]';
    await this.core.verifyVisible(all_dropdown);
    logger.info('All option dropdown is visible');
    await this.core.click(all_dropdown);
    logger.info('Clicked on All option dropdown');
    await this.page.waitForLoadState('networkidle');
    // click on All option and and then click on read unread archived
    await this.page.getByRole('menuitem', { name: 'All' }).click();
    logger.info('Clicked on All option');
    await this.page.getByRole('button', { name: 'Read', exact: true }).click();
    logger.info('Clicked on Read option');
    await this.page.waitForLoadState('networkidle');
    await this.page.getByRole('button', { name: 'Unread', exact: true }).click();
    logger.info('Clicked on Unread option');
    await this.page.waitForLoadState('networkidle');
    await this.page.getByRole('button', { name: 'Archived', exact: true }).click();
    logger.info('Clicked on Archived option');
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForLoadState('networkidle');
    //click on Brokerage option and check read ,unread ,archved notifications for it
    const all_dropdown_arrow = '[id="filter-dropdown"]';
    await this.core.verifyVisible(all_dropdown_arrow);
    await this.core.click(all_dropdown_arrow);
    await this.page.waitForLoadState('networkidle');
    await this.page.getByRole('menuitem', { name: 'Brokerage', exact: true }).click();
    logger.info('Brokerage option dropdown is visible');
    logger.info('Clicked on Brokerage option dropdown');
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(500);
    // click on All option and and then click on read unread archived
    await this.page.getByText('All', { exact: true }).click();
    logger.info('Clicked on All option');
    await this.page.waitForLoadState('networkidle');
    await this.page.getByRole('button', { name: 'Read', exact: true }).click();
    logger.info('Clicked on Read option');
    await this.page.waitForLoadState('networkidle');
    await this.page.getByRole('button', { name: 'Unread', exact: true }).click();
    logger.info('Clicked on Unread option');
    await this.page.waitForLoadState('networkidle');
    await this.page.getByRole('button', { name: 'Archived', exact: true }).click();
    logger.info('Clicked on Archived option');
    //click on client and check read unread and archived notifications for it
    await this.core.verifyVisible(all_dropdown_arrow);
    await this.core.click(all_dropdown_arrow);
    await this.page.waitForTimeout(500);
    await this.page.getByText('Client', { exact: true }).click();
    logger.info('Clicked on Client option dropdown');
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForLoadState('networkidle');
    // click on All option and and then click on read unread archived
    await this.page.getByRole('button', { name: 'All', exact: true }).click();
    logger.info('Clicked on All option');
    await this.page.waitForLoadState('networkidle');
    await this.page.getByRole('button', { name: 'Read', exact: true }).click();
    logger.info('Clicked on Read option');
    await this.page.waitForLoadState('networkidle');
    await this.page.getByRole('button', { name: 'Unread', exact: true }).click();
    logger.info('Clicked on Unread option');
    await this.page.waitForLoadState('networkidle');
    await this.page.getByRole('button', { name: 'Archived', exact: true }).click();
    logger.info('Clicked on Archived option');
    await this.page.waitForLoadState('networkidle');
    //await this.page.waitForTimeout(1000);
    //click on clientcase and check read unread and archived notifications for it
    await this.core.click(all_dropdown_arrow);
    await this.page.waitForLoadState('networkidle');
    await this.page.getByText('Client case', { exact: true }).click();
    logger.info('Clicked on Client case option dropdown');
    await this.page.waitForLoadState('networkidle');
    // click on All option and and then click on read unread archived
    await this.page.getByRole('button', { name: 'All', exact: true }).click();
    logger.info('Clicked on All option');
    await this.page.waitForLoadState('networkidle');
    await this.page.getByRole('button', { name: 'Read', exact: true }).click();
    logger.info('Clicked on Read option');
    await this.page.waitForLoadState('networkidle');
    await this.page.getByRole('button', { name: 'Unread', exact: true }).click();
    logger.info('clicked on Unread option');
    await this.page.waitForLoadState('networkidle');
    await this.page.getByRole('button', { name: 'Archived', exact: true }).click();
    logger.info('Clicked on Archived option');
    await this.page.waitForLoadState('networkidle');

    //system options
    await this.core.click(all_dropdown_arrow);
    await this.page.getByText('System', { exact: true }).click();
    logger.info('Clicked on system option');
    await this.page.waitForLoadState('networkidle');
    //All options for system click on read,unread and archived
    await this.page.getByText('All', { exact: true }).click();
    logger.info('Clicked on All option');
    await this.page.waitForLoadState('networkidle');
    await this.page.getByText('Read', { exact: true }).click();
    logger.info('Clicked on Read option');
    await this.page.waitForLoadState('networkidle');
    await this.page.getByText('Unread', { exact: true }).click();
    logger.info('Clicked on Unread option');
    await this.page.waitForLoadState('networkidle');
    await this.page.getByText('Archived', { exact: true }).click();
    logger.info('Clicked on Archived option');
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForLoadState('networkidle');
    await this.core.click(all_dropdown_arrow);
    await this.page.getByRole('button', { name: 'All', exact: true }).click();
  }

  async clickdefaultDropdown() {
    await this.page.getByRole('button', { name: 'Default', exact: true }).click();
    logger.info('Clicked on default dropdown');
    await this.page.waitForTimeout(1000);
    await this.page.getByText('Newest First', { exact: true }).click();
    const notificationPage = new NotificationPage(this.page);
    await notificationPage.clickAllOptionsDropdown();
    await this.page.waitForLoadState('networkidle');
    await this.page.getByText('Newest First', { exact: true }).click();
    logger.info('Clicked on default dropdown');
    await this.page.waitForLoadState('networkidle');
    await this.page.getByText('Oldest First', { exact: true }).click();
    await notificationPage.clickAllOptionsDropdown();
    await this.page.waitForTimeout(1000);
    await this.page.getByText('All', { exact: true }).click();
  }

  async clickDaterangeDropdown() {
    await this.page.getByRole('button', { name: 'Date range', exact: true }).click();
    logger.info('Clicked on default dropdown');
    await this.page.waitForTimeout(1000);
    await this.page.getByText('Today', { exact: true }).click();
    const notificationPage1 = new NotificationPage(this.page);
    await notificationPage1.clickAllOptionsDropdown();
    await this.page.getByText('Today', { exact: true }).click();
    await notificationPage1.clickAllOptionsDropdown();
  }

  async clickSearchbar() {
    const searchText = 'poonam';
    await this.page.getByRole('textbox').fill(searchText);
    await this.page.waitForTimeout(1000);
    const notifications = this.page.locator('.notification-item');
    const count = await notifications.count();
    if (count > 0) {
      // ✅ notifications found
      await this.page.locator('.mdc-checkbox').first().click();
      console.log('Checkbox selected');
      this.selectCheckbox('text:string');
      this.clickSelectAll();
      await this.page.waitForTimeout(100);
      this.archiveNotification('text:string');
      await this.page.waitForTimeout(200);
      await this.page.locator('gmc-filter-button-group').getByText('Archived').click();
      await this.page.waitForTimeout(400);
      this.selectCheckbox('text:string');
      await this.page.waitForTimeout(200);
      this.clickSelectAll();
      await this.page.waitForTimeout(200);
      this.unarchiveNotification('text:string');
      await this.page.locator('gmc-filter-button-group').getByText('unarchive').click();
      await this.page.waitForTimeout(100);
    } else {
      // ❌ no notifications
      await this.page.locator('.empty-state-title').waitFor();
      console.log('No notifications found');
    }
  }

  async selectCheckbox(text: string) {
    await this.page.locator('.mdc-checkbox').first().click();
    logger.info(`Selected checkbox for notification: ${text}`);
  }

  async clickSelectAll() {
    await this.page.getByText('Select all').click();
    logger.info('Clicked on Select All');
  }

  async markAllAsUnread() {
    await this.page.getByText('Mark all as unread').click();
    logger.info('Marked all as unread');
  }
  async archiveNotification(text: string) {
    await this.page.waitForTimeout(200);
    await this.page.locator('gmc-notifications-list-actions').getByText('Archive').first().click();
    logger.info(`Archived notification: ${text}`);
    await this.page.waitForLoadState('networkidle');
  }
  async unarchiveNotification(text: string) {
    await this.page
      .locator('gmc-notifications-list-actions')
      .getByText('Unarchive')
      .first()
      .click();
    logger.info(`Unarchived notification: ${text}`);
    await this.page.waitForLoadState('networkidle');
  }
}
