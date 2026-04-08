import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { logger } from '../../../utils/logger';

test('User should be able to add product to cart and complete purchase', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;

  if (!username || !password) {
    logger.error('USERNAME or PASSWORD is missing from environment variables!');
    throw new Error('USERNAME or PASSWORD is missing from environment variables!');
  }

  logger.info(`Using credentials: ${username} / ********`);

  // **Step 1: Login**
  logger.info('Starting login process');
  await loginPage.navigateToLogin();
  await loginPage.performLoginSuccessful(username, password);
  logger.info('User logged in successfully');

  // **Step 2: Sort Products by Price (Low to High)**
  logger.info('Sorting products by price (Low to High)');
  await cartPage.sortByPriceLowToHigh();

  // **Step 3: Add "Sauce Labs Bike Light" to Cart**
  logger.info('Adding "Sauce Labs Bike Light" to cart');
  await cartPage.addToCart('Sauce Labs Bike Light');
  await cartPage.verifyCartItem('Sauce Labs Bike Light');
  logger.info('"Sauce Labs Bike Light" successfully added to cart');

  // **Step 4: Proceed to Checkout**
  logger.info('Navigating to cart and proceeding to checkout');
  await cartPage.goToCart();
  await checkoutPage.checkout('Akshay', 'Deol', '547852');
  logger.info('Checkout process completed');

  // **Step 5: Verify Order Completion**
  logger.info('Verifying order success');
  await checkoutPage.verifyOrderSuccess();
  logger.info('Order completed successfully');

  // **Step 6: Logout**
  logger.info('Logging out user');
  await loginPage.logout();
  logger.info('User logged out successfully. Test completed.');
});
