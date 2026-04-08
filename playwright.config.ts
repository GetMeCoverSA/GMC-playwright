import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';

// Ensure dotenv overrides system environment variables
const envFile = `.env.${process.env.TEST_ENV || 'test'}`;
dotenv.config({ path: path.resolve(__dirname, envFile), override: true });

export default defineConfig({
  globalSetup: path.resolve(__dirname, 'globalSetup.ts'), // Loads correct .env file
  testDir: './tests/web/spec',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.WORKERS ? parseInt(process.env.WORKERS) : 5,

  /* Configure reporting */
  reporter: [
    ['list'],
    ['json', { outputFile: 'test-results/report.json' }],
    ['html', { open: 'never' }],
    ['allure-playwright'],
  ],

  /* Global test setup */
use: {
  baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
  headless: true,
  viewport: null, 
  launchOptions: { args: ['--window-size=1920,1080'] }, 
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
  trace: 'on-first-retry',
  actionTimeout: 15000, // Increase timeout for stability
  navigationTimeout: 15000, // Ensure page loads properly
},

/* Define browser configurations */
projects: [
  {
    name: 'chromium',
    use: { 
      ...devices['Desktop Chrome'],
      viewport: { width: 1920, height: 1080 }, // Set a fixed resolution
      deviceScaleFactor: undefined, 
    },
  },
  // {
  //   name: 'firefox',
  //   use: { 
  //     ...devices['Desktop Firefox'],
  //     viewport: { width: 1920, height: 1080 },
  //     deviceScaleFactor: undefined,
  //   },
  // },
  // {
  //   name: 'webkit',
  //   use: { 
  //     ...devices['Desktop Safari'],
  //     viewport: { width: 1920, height: 1080 },
  //     deviceScaleFactor: undefined,
  //   },
  // },
  // {
  //   name: 'msedge',
  //   use: { 
  //     ...devices['Desktop Edge'], 
  //     channel: 'msedge',
  //     viewport: { width: 1920, height: 1080 },
  //     deviceScaleFactor: undefined,
  //   },
  // },
],

  /* Test execution based on environment selection */
  expect: {
    timeout: 5000,
  },

  /* Output directory for test artifacts */
  outputDir: 'test-results/',
});