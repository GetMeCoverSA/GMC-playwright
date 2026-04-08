import { APIRequestContext, APIResponse, Page, expect } from '@playwright/test';
import { logger } from '../utils/logger';

export class Core {
  constructor(
    private page: Page,
    private request?: APIRequestContext,
  ) {}

  /**
   * Navigates to a given URL.
   * @param path - Relative path to navigate.
   * Example: `await core.gotoURL('/inventory.html');`
   */
  async gotoURL(path: string = '') {
    const baseURL = process.env.BASE_URL || 'https://dev.getmecover.co.za/login';
    const url = `${baseURL}${path}`;
    logger.info(`Navigating to: ${url}`);
    await this.page.goto(url, { waitUntil: 'load' });
  }

  // ---------------- INTERACTION METHODS ----------------

  /**
   * Clicks on an element.
   * @param selector - CSS/XPath selector of the element.
   * Example: `await core.click('[data-test="login-button"]');`
   */
  async click(selector: string) {
    logger.info(`Clicking on element: ${selector}`);
    await this.page.locator(selector).click();
  }

  /**
   * Performs a double-click on an element.
   * Example: `await core.dblclick('[data-test="some-button"]');`
   */
  async dblclick(selector: string) {
    logger.info(`Double-clicking on element: ${selector}`);
    await this.page.locator(selector).dblclick();
  }

  /**
   * Hovers over an element.
   * Example: `await core.hover('[data-test="menu"]');`
   */
  async hover(selector: string) {
    logger.info(`Hovering over element: ${selector}`);
    await this.page.locator(selector).hover();
  }

  /**
   * Fills an input field with text.
   * Example: `await core.fill('[data-test="username"]', 'standard_user');`
   */
  async fill(selector: string, value: string) {
    logger.info(`Filling input: ${selector} with value: ${value}`);
    await this.page.locator(selector).fill(value);
  }

  /**
   * Types text character by character.
   * Example: `await core.typeText('[data-test="password"]', 'secret_sauce');`
   */
  async typeText(selector: string, text: string) {
    logger.info(`Typing text: '${text}' in ${selector}`);
    await this.page.locator(selector).type(text);
  }

  /**
   * Simulates pressing a keyboard key.
   * Example: `await core.pressKey('[data-test="password"]', 'Enter');`
   */
  async pressKey(selector: string, key: string) {
    logger.info(`Pressing key '${key}' on ${selector}`);
    await this.page.locator(selector).press(key);
  }

  /**
   * Selects an option from a dropdown.
   * Example: `await core.selectOption('[data-test="product_sort_container"]', 'lohi');`
   */
  async selectOption(selector: string, value: string) {
    logger.info(`Selecting option '${value}' from dropdown: ${selector}`);
    await this.page.locator(selector).selectOption(value);
  }

  /**
   * Checks a checkbox or radio button.
   * Example: `await core.check('[data-test="checkbox-terms"]');`
   */
  async check(selector: string) {
    logger.info(`Checking checkbox: ${selector}`);
    await this.page.locator(selector).check();
  }

  /**
   * Unchecks a checkbox.
   * Example: `await core.uncheck('[data-test="checkbox-terms"]');`
   */
  async uncheck(selector: string) {
    logger.info(`Unchecking checkbox: ${selector}`);
    await this.page.locator(selector).uncheck();
  }

  /**
   * Clears an input field.
   * Example: `await core.clear('[data-test="username"]');`
   */
  async clear(selector: string) {
    logger.info(`Clearing input field: ${selector}`);
    await this.page.locator(selector).clear();
  }

  // ---------------- ASSERTION METHODS ----------------

  /**
   * Verifies an element is visible.
   * Example: `await core.verifyVisible('[data-test="login-button"]');`
   */
  async verifyVisible(selector: string) {
    logger.info(`Verifying element is visible: ${selector}`);
    await expect(this.page.locator(selector)).toBeVisible();
  }
  // ... (remaining assertion methods with comments and examples)

  // ---------------- NAVIGATION METHODS ----------------

  /**
   * Reloads the current page.
   * Example: `await core.reloadPage();`
   */
  async reloadPage() {
    logger.info(`Reloading current page`);
    await this.page.reload();
  }

  /**
   * Navigates back in browser history.
   * Example: `await core.goBack();`
   */
  async goBack() {
    logger.info(`Navigating back in browser history`);
    await this.page.goBack();
  }

  // ---------------- MOUSE & KEYBOARD ACTIONS ----------------

  /**
   * Moves the mouse to a specific position.
   * Example: `await core.mouseMove(100, 200);`
   */
  async mouseMove(x: number, y: number) {
    logger.info(`Moving mouse to position (${x}, ${y})`);
    await this.page.mouse.move(x, y);
  }

  // ---------------- API REQUEST METHODS ----------------

  /**
   * Sends a GET request.
   * @param url - API endpoint.
   * Example: `let response = await core.getRequest('/users');`
   */
  async getRequest(url: string): Promise<APIResponse> {
    if (!this.request) {
      logger.error('APIRequestContext is not initialized.');
      throw new Error('APIRequestContext is not initialized.');
    }
    logger.info(`Sending GET request to: ${url}`);
    return await this.request.get(url);
  }

  /**
   * Sends a POST request with a JSON payload.
   * @param url - API endpoint.
   * @param data - JSON payload.
   * Example: `let response = await core.postRequest('/login', { username: 'test', password: '1234' });`
   */
  async postRequest(url: string, data: object): Promise<APIResponse> {
    if (!this.request) {
      logger.error('APIRequestContext is not initialized.');
      throw new Error('APIRequestContext is not initialized.');
    }
    logger.info(`Sending POST request to: ${url} with data: ${JSON.stringify(data)}`);
    return await this.request.post(url, { data });
  }

  /**
   * Sends a PUT request with a JSON payload.
   * @param url - API endpoint.
   * @param data - JSON payload.
   * Example: `let response = await core.putRequest('/users/123', { name: 'Updated Name' });`
   */
  async putRequest(url: string, data: object): Promise<APIResponse> {
    if (!this.request) {
      logger.error('APIRequestContext is not initialized.');
      throw new Error('APIRequestContext is not initialized.');
    }
    logger.info(`Sending PUT request to: ${url} with data: ${JSON.stringify(data)}`);
    return await this.request.put(url, { data });
  }

  /**
   * Sends a DELETE request.
   * @param url - API endpoint.
   * Example: `await core.deleteRequest('/users/123');`
   */
  async deleteRequest(url: string): Promise<APIResponse> {
    if (!this.request) {
      logger.error('APIRequestContext is not initialized.');
      throw new Error('APIRequestContext is not initialized.');
    }
    logger.info(`Sending DELETE request to: ${url}`);
    return await this.request.delete(url);
  }

  /**
   * Retrieves the status code of an API response.
   * @param response - APIResponse object.
   * Example: `let status = await core.getResponseStatus(response);`
   */
  async getResponseStatus(response: APIResponse): Promise<number> {
    const status = response.status();
    logger.info(`API Response Status: ${status}`);
    return status;
  }

  /**
   * Parses the API response as JSON.
   * @param response - APIResponse object.
   * Example: `let jsonData = await core.getResponseJson(response);`
   */
  async getResponseJson<T>(response: APIResponse): Promise<T> {
    logger.info(`Parsing API response as JSON`);
    return await response.json();
  }
  /*URL */
  async verifyURL(url: string) {
    console.log(`🔍 Navigating to: ${url}`);

    const response = await this.page.goto(url, { waitUntil: 'domcontentloaded' });

    console.log(`✅ Status: ${response?.status()}`);

    expect(response?.status()).toBe(200);
    await expect(this.page).toHaveURL(url);
  }
}
