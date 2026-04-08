import { Page, expect } from '@playwright/test';
import { Core } from '../../../utils/core';
import { logger } from '../../../utils/logger';

export class CartPage {
  private core: Core;

  constructor(private page: Page) {
    this.core = new Core(page);
  }

  /**
   * Sorts products by price from low to high.
   * Example: await cartPage.sortByPriceLowToHigh();
   */
  async sortByPriceLowToHigh() {
    const sortDropdown = '[data-test="product-sort-container"]';
    logger.info(`Verifying visibility of sort dropdown: ${sortDropdown}`);
    await this.core.verifyVisible(sortDropdown);

    await this.page.waitForTimeout(1000); // Stability buffer
    logger.info(`Selecting 'Price (low to high)' option`);
    await this.page.selectOption(sortDropdown, 'lohi');
  }

  /**
   * Adds a product to the cart.
   * @param productName - Name of the product to add.
   * Example: await cartPage.addToCart('Sauce Labs Backpack');
   */
  async addToCart(productName: string) {
    const addToCartButton = `[data-test="add-to-cart-${productName.toLowerCase().replace(/ /g, '-')}"]`;
    logger.info(`Verifying visibility of add-to-cart button for '${productName}'`);
    await this.core.verifyVisible(addToCartButton);

    logger.info(`Clicking on add-to-cart button for '${productName}'`);
    await this.core.click(addToCartButton);
  }

  /**
   * Verifies if a product is present in the cart.
   * @param productName - Name of the product.
   * Example: await cartPage.verifyCartItem('Sauce Labs Backpack');
   */
  async verifyCartItem(productName: string) {
    const cartItem = `[data-test="remove-${productName.toLowerCase().replace(/ /g, '-')}"]`;
    logger.info(`Verifying cart item presence for '${productName}'`);
    await this.core.verifyVisible(cartItem);
  }

  /**
   * Navigates to the cart page.
   * Example: await cartPage.goToCart();
   */
  async goToCart() {
    const cartLink = '[data-test="shopping-cart-link"]';
    logger.info(`Verifying visibility of shopping cart link: ${cartLink}`);
    await this.core.verifyVisible(cartLink);

    logger.info(`Clicking on shopping cart link`);
    await this.core.click(cartLink);
  }
}
