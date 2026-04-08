import { Page, expect } from '@playwright/test';
import { Core } from '../../../utils/core';
import { logger } from '../../../utils/logger';

export class CheckoutPage {
  private core: Core;

  constructor(private page: Page) {
    this.core = new Core(page);
  }

  /**
   * Completes the checkout process.
   * @param firstName - First name of the customer.
   * @param lastName - Last name of the customer.
   * @param zip - Postal code of the customer.
   * Example: await checkoutPage.checkout('John', 'Doe', '12345');
   */
  async checkout(firstName: string, lastName: string, zip: string) {
    logger.info(`Initiating checkout process`);

    logger.info(`Clicking on checkout button`);
    await this.core.click('[data-test="checkout"]');

    logger.info(`Entering first name: ${firstName}`);
    await this.core.typeText('[data-test="firstName"]', firstName);

    logger.info(`Entering last name: ${lastName}`);
    await this.core.typeText('[data-test="lastName"]', lastName);

    logger.info(`Entering postal code: ${zip}`);
    await this.core.typeText('[data-test="postalCode"]', zip);

    logger.info(`Clicking continue to proceed with checkout`);
    await this.core.click('[data-test="continue"]');

    logger.info(`Clicking finish to complete order`);
    await this.core.click('[data-test="finish"]');
  }

  /**
   * Verifies if the order is successfully placed.
   * Example: await checkoutPage.verifyOrderSuccess();
   */
  async verifyOrderSuccess() {
    logger.info(`Verifying order success by checking order completion elements`);
    await this.core.verifyVisible('[data-test="pony-express"]');
    await this.core.verifyVisible('[data-test="complete-header"]');
  }
}
